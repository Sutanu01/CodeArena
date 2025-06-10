import QuestionModel from "../models/Question.js";

const fetchAndStoreQuestions = async () => {
  const response = await fetch(
    "https://codeforces.com/api/problemset.problems"
  );
  const data = await response.json();
  if (data.status === "OK") {
    const problems = data.result.problems;
    for (const problem of problems) {
      const question = {
        contestId: problem.contestId.toString(),
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
  const week = (7 * 24 * 60 * 60 * 1000);
  setInterval(fetchAndStoreQuestions, week);
};


export { fetchAndStoreQuestionsWeekly };

