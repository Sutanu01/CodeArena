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
  console.log(data)
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
    console.log(submissions);
  sendResponse(200, true, "Submission status fetched successfully", res, { submissions });
  return;
});

const updateCodeforcesInfo = TryCatch(async (req: Request, res: Response): Promise<void> => {
  const { userId, codeforcesId } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) {
    sendResponse(404, false, "User not found", res);
    return;
  }

  if (!codeforcesId) {
    sendResponse(400, false, "Codeforces ID is required", res);
    return;
  }

  const response = await fetch(
    `https://codeforces.com/api/user.info?handles=${codeforcesId}`
  );
  const data = await response.json();

  if (data.status !== "OK") {
    sendResponse(400, false, "Invalid Codeforces ID", res);
    return;
  }

  user.codeforces_info = {
    username: codeforcesId,
    rating: data.result[0].rating,
    maxRating: data.result[0].maxRating,
    maxRank: data.result[0].maxRank,
    rank: data.result[0].rank,
    solved_ques: [],
    rating_changes: [],
  };
  await user.save();

  const submissionsResponse = await fetch(
    `https://codeforces.com/api/user.status?handle=${codeforcesId}&from=1`
  );
  const submissionsData = await submissionsResponse.json();

  if (submissionsData.status !== "OK") {
    sendResponse(400, false, "Failed to fetch submissions", res);
    return;
  }

  const solvedSet = new Set<string>();
  user.codeforces_info.solved_ques = submissionsData.result
    .filter((s: any) => s.verdict === "OK")
    .filter((s: any) => {
      const key = String(s.problem.contestId) + s.problem.index;
      if (solvedSet.has(key)) return false;
      solvedSet.add(key);
      return true;
    })
    .map((s: any) => ({
      contestId: s.problem.contestId,
      name: s.problem.name,
      questionId: String(s.problem.contestId) + s.problem.index,
      index: s.problem.index,
      rating: s.problem.rating,
      tags: s.problem.tags,
    }));

  const ratingChangesResponse = await fetch(
    `https://codeforces.com/api/user.rating?handle=${codeforcesId}`
  );
  const ratingChangesData = await ratingChangesResponse.json();

  if (ratingChangesData.status !== "OK") {
    sendResponse(400, false, "Failed to fetch rating changes", res);
    return;
  }

  user.codeforces_info.rating_changes = [0].concat(
    ratingChangesData.result.map((change: any) => change.newRating)
  );

  await user.save();
  sendResponse(200, true, "Codeforces info updated successfully", res);
  return;
});

const getUnsolvedQuestionLink = TryCatch(async (req: Request, res: Response): Promise<void> => {
  const { userId1, userId2, lowerRating, upperRating, tags } = req.body;

  if (!userId1 || !userId2 || !lowerRating || !upperRating) {
    sendResponse(400, false, "Missing required fields", res);
    return;
  }

  const query: any = {
    rating: { $gte: lowerRating, $lte: upperRating },
  };

  if (tags && Array.isArray(tags) && tags.length > 0) {
    query.tags = { $in: tags };
  }

  const solvedByUser1 = await UserModel.findById(userId1);
  const solvedByUser2 = await UserModel.findById(userId2);

  if (!solvedByUser1 || !solvedByUser2) {
    sendResponse(404, false, "User not found", res);
    return;
  }

  const unsolvedQuestions = await QuestionModel.find({
    ...query,
    questionId: {
      $nin: [
        ...solvedByUser1.codeforces_info.solved_ques.map((q: any) => q.questionId),
        ...solvedByUser2.codeforces_info.solved_ques.map((q: any) => q.questionId),
      ],
    },
  });

  if (unsolvedQuestions.length === 0) {
    sendResponse(404, false, "No Questions found with the required tags and rating", res);
    return;
  }

  const randomIndex = Math.floor(Math.random() * unsolvedQuestions.length);
  const question = unsolvedQuestions[randomIndex];

  sendResponse(200, true, "Question found", res, {
    contestId: question.contestId,
    index: question.index,
    question_link: `https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`,
  });
  return;
});


export { getUnsolvedQuestionLink, getSubmissionStatus, updateCodeforcesInfo };
