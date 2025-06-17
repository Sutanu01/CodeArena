import QuestionModel from "../models/Question.js";
import { Request, Response } from "express";
import { sendResponse, TryCatch } from "../utils/features.js";
import UserModel from "../models/User.js";

const getSubmissionStatus = TryCatch(async (req: Request, res: Response): Promise<void> => {
  const { userId, codeforcesId, contestId, index, count } = req.body;

  if (!userId || !contestId || !index || !codeforcesId) {
    sendResponse(400, false, "Missing required fields", res);
    return;
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    sendResponse(404, false, "User not found", res);
    return;
  }

  if (user.codeforces_info?.username && user.codeforces_info.username !== codeforcesId) {
    sendResponse(400, false, "Invalid Codeforces handle", res);
    return;
  }

  let url = `https://codeforces.com/api/user.status?handle=${codeforcesId}`;
  if (count) { url += `&count=${count}`; }
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") {
    sendResponse(400, false, "Failed to fetch submissions", res);
    return;
  }
  const submissions = data.result
    .filter((s: any) => {
      return (
        s.problem.contestId === contestId &&
        s.problem.index === index &&
        s.verdict
      );
    })
    .map((s: any) => ({
      verdict: s.verdict === "OK" ? "ACCEPTED" : s.verdict,
      programmingLanguage: s.programmingLanguage,
      submission_time: new Date(s.creationTimeSeconds * 1000).toUTCString(),
      passedTestCount: s.passedTestCount,
      timeTaken: s.timeConsumedMillis,
      memoryUsed: s.memoryConsumedBytes,
    }));
  sendResponse(200, true, "Submission status fetched successfully", res, { submissions });
  return;
});

const updateCodeforcesInfo = TryCatch(async (req: Request, res: Response): Promise<void> => {
  const { userId, codeforcesId } = req.body;

  if (!userId || !codeforcesId) {
    sendResponse(400, false, "User ID and Codeforces ID are required", res);
    return;
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    sendResponse(404, false, "User not found", res);
    return;
  }

  const [infoRes, submissionsRes, ratingChangesRes] = await Promise.all([
    fetch(`https://codeforces.com/api/user.info?handles=${codeforcesId}`),
    fetch(`https://codeforces.com/api/user.status?handle=${codeforcesId}&from=1`),
    fetch(`https://codeforces.com/api/user.rating?handle=${codeforcesId}`),
  ]);

  const [infoData, submissionsData, ratingChangesData] = await Promise.all([
    infoRes.json(),
    submissionsRes.json(),
    ratingChangesRes.json(),
  ]);

  if (infoData.status !== "OK") {
    sendResponse(400, false, "Invalid Codeforces ID", res);
    return;
  }
  if (submissionsData.status !== "OK") {
    sendResponse(400, false, "Failed to fetch submissions", res);
    return;
  }
  if (ratingChangesData.status !== "OK") {
    sendResponse(400, false, "Failed to fetch rating changes", res);
    return;
  }

  const info = infoData.result[0];
  user.codeforces_info = {
    username: codeforcesId,
    rating: info.rating,
    maxRating: info.maxRating,
    maxRank: info.maxRank,
    rank: info.rank,
    solved_ques: user.codeforces_info?.solved_ques || [],
    rating_changes: [],
  };

  const solvedQues = submissionsData.result
    .filter((s: any) => s.verdict === "OK")
    .reduce((acc: any[], curr: any) => {
      const questionId = String(curr.problem.contestId) + curr.problem.index;
      if (!acc.find((q: any) => q.questionId === questionId)) {
        acc.push({
          contestId: curr.problem.contestId,
          name: curr.problem.name,
          questionId,
          index: curr.problem.index,
          rating: curr.problem.rating,
          tags: curr.problem.tags,
        });
      }
      return acc;
    }, []);

  const oldCount = user.codeforces_info.solved_ques.length;
  const newCount = solvedQues.length;
  const submissionDiff = newCount - oldCount;

  const newSubmits = solvedQues.slice(0, submissionDiff);
  if (newSubmits.length > 0) {
    for (const submit of newSubmits) {
      user.codeforces_info.solved_ques.push(submit);
    }
  }
  user.codeforces_info.rating_changes = [0, ...ratingChangesData.result.map((r: any) => r.newRating)];

  await user.save();
  sendResponse(200, true, "Codeforces info updated successfully", res);
  return;
});


export { getSubmissionStatus, updateCodeforcesInfo };
