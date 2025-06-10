import QuestionModel from "../models/Question.js";
import { Request, Response } from "express";
import { sendResponse, TryCatch } from "../utils/features.js";
import UserModel from "../models/User.js";

const getSubmissionStatus = TryCatch(async (req: Request, res: Response) => {
  const { userId, contestid, index } = req.body;
  if (!userId || !contestid || !index) {
    return sendResponse(400, false, "Missing required fields", res);
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    return sendResponse(404, false, "User not found", res);
  }
  const codeforcesId = user.codeforces_info?.username;
  if (!codeforcesId) {
    return sendResponse(400, false, "Codeforces ID not verified of user", res);
  }
  const response = await fetch(
    `https://codeforces.com/api/user.status?handle=${codeforcesId}&from=1`
  );
  const data = await response.json();
  if (data.status !== "OK") {
    return sendResponse(400, false, "Failed to fetch submissions", res);
  }
  const submissions = data.result
    .filer((s: any) => {
      return (
        s.problem.contestId === contestid &&
        s.problem.index === index &&
        s.verdict
      );
    })
    .map((s: any) => {
      return {
        verdict: s.verdict == "OK" ? "ACCEPTED" : s.verdict,
        programmingLanguage: s.programmingLanguage,
        submission_time: new Date(s.creationTimeSeconds * 1000).toUTCString(),
        passedTestCount: s.passedTestCount,
        timeTakne: s.timeConsumedMillis,
        memoryUsed: s.memoryConsumedBytes,
      };
    });

  sendResponse(200, true, "Submission status fetched successfully", res, {
    submissions,
  });
});

const updateCodeforcesInfo = TryCatch(async (req: Request, res: Response) => {
  const { userId, codeforcesId } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    return sendResponse(404, false, "User not found", res);
  }
  if (!codeforcesId) {
    return sendResponse(400, false, "Codeforces ID is required", res);
  }
  const response = await fetch(
    `https://codeforces.com/api/user.info?handles=${codeforcesId}`
  );
  const data = await response.json();
  if (data.status !== "OK") {
    return sendResponse(400, false, "Invalid Codeforces ID", res);
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
    return sendResponse(400, false, "Failed to fetch submissions", res);
  }

  const solvedSet = new Set<string>();
  user.codeforces_info.solved_ques = submissionsData.result
    .filter((submission: any) => submission.verdict === "OK")
    .filter((submission: any) => {
      const key = submission.problem.contestId + submission.problem.index;
      if (solvedSet.has(key)) return false;
      solvedSet.add(key);
      return true;
    })
    .map((submission: any) => ({
      contestId: submission.problem.contestId,
      name: submission.problem.name,
      questionId: submission.problem.contestId + submission.problem.index,
      index: submission.problem.index,
      rating: submission.problem.rating,
      tags: submission.problem.tags,
    }));

  await user.save();
  const ratingChangesResponse = await fetch(
    `https://codeforces.com/api/user.rating?handle=${codeforcesId}`
  );
  const ratingChangesData = await ratingChangesResponse.json();
  if (ratingChangesData.status !== "OK") {
    return sendResponse(400, false, "Failed to fetch rating changes", res);
  }
  user.codeforces_info.rating_changes = [0].concat(
    ratingChangesData.result.map((change: any) => change.newRating)
  );
  await user.save();
});

const getUnsolvedQuestionLink = TryCatch(
  async (req: Request, res: Response) => {
    const { userId1, userId2, lowerRating, upperRating, tags } = req.body;
    if (!userId1 || !userId2 || !lowerRating || !upperRating) {
      return sendResponse(400, false, "Missing required fields", res);
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
      return sendResponse(404, false, "User not found", res);
    }
    const unsolvedQuestions = await QuestionModel.find({
      ...query,
      questionId: {
        $nin: [
          ...solvedByUser1.codeforces_info.solved_ques.map(
            (solved_que: any) => solved_que.questionId
          ),
          ...solvedByUser2.codeforces_info.solved_ques.map(
            (solved_que: any) => solved_que.questionId
          ),
        ],
      },
    });
    if (unsolvedQuestions.length === 0) {
      return sendResponse(
        404,
        false,
        "No Questions found with the required tags and rating",
        res
      );
    }
    const randomIndex = Math.floor(Math.random() * unsolvedQuestions.length);
    const question = unsolvedQuestions[randomIndex];
    return sendResponse(200, true, "Question found", res, {
      questions: `https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`,
    });
  }
);

export { getUnsolvedQuestionLink, getSubmissionStatus, updateCodeforcesInfo };
