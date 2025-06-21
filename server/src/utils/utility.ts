import QuestionModel from "../models/Question.js";
import UserModel from "../models/User.js";
import { TryCatch } from "./features.js";

const fetchAndStoreQuestions = async () => {
  const response = await fetch(
    "https://codeforces.com/api/problemset.problems"
  );
  const data = await response.json();
  if (data.status === "OK") {
    const problems = data.result.problems;
    for (const problem of problems) {
      const question = {
        contestId: problem.contestId,
        name: problem.name,
        questionId: `${problem.contestId}${problem.index}`,
        index: problem.index,
        rating: problem.rating,
        tags: problem.tags,
      };
      try {
        await QuestionModel.updateOne(
          { questionId: question.questionId },
          { $setOnInsert: question },
          { upsert: true }
        );
      } catch (error) {
        console.error("Error saving question to database:", error);
      }
    }
    console.log("Questions fetched and stored successfully");
  } else {
    console.error(
      "Failed to fetch questions from Codeforces API:",
      data.comment
    );
  }
};
const fetchAndStoreQuestionsWeekly = () => {
  const week = 7 * 24 * 60 * 60 * 1000;
  setInterval(fetchAndStoreQuestions, week);
};

type GetQuestionParams = {
  userId1: string;
  userId2: string;
  lowerRating?: number;
  upperRating?: number;
  tags?: string[];
};

export type questionType = {
  contestId: number;
  index: string;
  link: string;
};

const getUnsolvedQuestionLink = async ({
  userId1,
  userId2,
  lowerRating = 800,
  upperRating = 3500,
  tags = [],
}: GetQuestionParams): Promise<questionType | null> => {
  const query: any = {
    rating: { $gte: lowerRating, $lte: upperRating },
  };

  if (tags && Array.isArray(tags) && tags.length > 0) {
    query.tags = { $in: tags };
  }

  const solvedByUser1 = await UserModel.findById(userId1);
  const solvedByUser2 = await UserModel.findById(userId2);

  if (!solvedByUser1 || !solvedByUser2) return null;

  const unsolvedQuestions = await QuestionModel.find({
    ...query,
    questionId: {
      $nin: [
        ...solvedByUser1.codeforces_info.solved_ques.map(
          (q: any) => q.questionId
        ),
        ...solvedByUser2.codeforces_info.solved_ques.map(
          (q: any) => q.questionId
        ),
      ],
    },
  });

  if (unsolvedQuestions.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * unsolvedQuestions.length);
  const question = unsolvedQuestions[randomIndex];
  return {
    contestId: question.contestId,
    index: question.index,
    link: `https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`,
  };
};

const updateMatches = async ({
  userId,
  opponent_name,
  result,
}: {
  userId: string;
  opponent_name: string;
  result: "Win" | "Loss" | "Draw";
}) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      console.error(`User with ${userId}not found while updating match info`);
      return;
    }
    user.total_matches += 1;
    if (result === "Win") {
      user.total_wins += 1;
    }
    user.match_history.push({
      opponent: opponent_name,
      result: result,
      date: new Date(),
    });
    await user.save();
  } catch (error) {
    console.error("Error updating matches : ", error);
  }
};

export { fetchAndStoreQuestionsWeekly, getUnsolvedQuestionLink, updateMatches };
