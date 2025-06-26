import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { sendResponse, TryCatch } from "../utils/features.js";
import type { TestCase, TestCaseList } from "../types/TC-type.js";
import { testcases } from "../Data/TestCases.js";
import SubmissionsModel, { Submission } from "../models/Submissions.js";
import UserModel from "../models/User.js";

dotenv.config();

const JUDGE0_URL: string = process.env.JUDGE0_API_URL!;
const JUDGE0_KEY: string = process.env.JUDGE0_API_KEY!;

type LanguageId =
  | "C++"
  | "Java"
  | "Python"
  | "JavaScript"
  | "Rust"
  | "TypeScript";

const LANG_MAP: Record<string, number> = {
  "C++": 54,
  Java: 62,
  Python: 71,
  JavaScript: 63,
  Rust: 73,
  TypeScript: 74,
};

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

interface Judge0Result {
  stdout: string;
  stderr: string;
  status: string;
}

interface TestResult {
  testCaseIndex: number;
  pass: boolean;
  expected: string;
  got: string;
  status: string;
  error: string | null;
}

async function runSubmission(
  sourceCode: string,
  languageId: number,
  stdin: string
): Promise<Judge0Result> {
  try {
    const payload = {
      source_code: Buffer.from(sourceCode).toString("base64"),
      stdin: Buffer.from(stdin).toString("base64"),
      language_id: languageId,
    };

    const postResp = await fetch(
      `${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`,
      {
        method: "POST",
        headers: {
          "X-RapidAPI-Key": JUDGE0_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!postResp.ok) {
      const errorText = await postResp.text();
      console.error("Judge0 error response:", errorText);
      throw new Error(
        `Failed to submit code: ${postResp.status} ${postResp.statusText} - ${errorText}`
      );
    }

    const postData = await postResp.json();
    const token: string = postData.token;

    if (!token) {
      console.error("No token in response:", postData);
      throw new Error("No token received from Judge0");
    }
    let attempts = 0;
    const maxAttempts = 50;
    while (attempts < maxAttempts) {
      const getResp = await fetch(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=true`,
        {
          headers: {
            "X-RapidAPI-Key": JUDGE0_KEY,
            "X-RapidAPI-Host": new URL(JUDGE0_URL).host,
          },
        }
      );
      if (!getResp.ok) {
        const errorText = await getResp.text();
        console.error("Judge0 get error:", errorText);
        throw new Error(
          `Failed to get submission result: ${getResp.status} ${getResp.statusText}`
        );
      }
      const data = await getResp.json();
      if (data.status.id >= 3) {
        return {
          stdout: data.stdout
            ? Buffer.from(data.stdout, "base64").toString()
            : "",
          stderr: data.stderr
            ? Buffer.from(data.stderr, "base64").toString()
            : "",
          status: data.status.description,
        };
      }
      await delay(200);
      attempts++;
    }
    throw new Error("Submission timed out");
  } catch (error) {
    console.error("Error in runSubmission:", error);
    throw error;
  }
}

const SubmitCode = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    interface Body {
      userId: string;
      questionId: string;
      source_code: string;
      language: LanguageId;
    }
    const { questionId, source_code, language, userId } = req.body as Body;

    if (!questionId || !source_code || !language || !userId) {
      return sendResponse(
        400,
        false,
        "Missing required fields: questionId, source_code, and language",
        res,
        null
      );
    }

    const languageId = LANG_MAP[language];
    if (!languageId) {
      return sendResponse(400, false, "Unsupported language", res, null);
    }

    const allCases: TestCaseList = testcases;
    const questionTestCase: TestCase | undefined = allCases.testcases.find(
      (tc) => tc.id === questionId
    );

    if (!questionTestCase) {
      return sendResponse(404, false, "Question not found", res, null);
    }

    try {
      const results: TestResult[] = [];

      for (let i = 0; i < questionTestCase.stdin.length; i++) {
        const input = questionTestCase.stdin[i];
        const expected = questionTestCase.stdout[i];

        try {
          const result = await runSubmission(source_code, languageId, input);
          const gotTrimmed = result.stdout.trim();
          const expectedTrimmed = expected.trim();
          const pass = gotTrimmed === expectedTrimmed;
          results.push({
            testCaseIndex: i + 1,
            pass,
            expected: expectedTrimmed,
            got: gotTrimmed,
            status: result.status,
            error: result.stderr || null,
          });

          if (i < questionTestCase.stdin.length - 1) {
            await delay(100);
          }
        } catch (error) {
          console.error(`Error running test case ${i + 1}:`, error);
          results.push({
            testCaseIndex: i + 1,
            pass: false,
            expected: expected.trim(),
            got: "",
            status: "Runtime Error",
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      const totalTests = results.length;
      const passedTests = results.filter((r) => r.pass).length;
      const allPassed = passedTests === totalTests;
      const newSubmission: Submission = {
        userId,
        verdict: {
          success: allPassed,
          message: allPassed
            ? "All test cases passed"
            : `${totalTests - passedTests} test cases failed`,
        },
        submittedAt: new Date(),
      };
      if(allPassed){
        await UserModel.findByIdAndUpdate(userId,{$set:{daily_login:true}});
      }
      await SubmissionsModel.findOneAndUpdate(
        { questionId },
        { $push: { submissions: newSubmission } },
        { upsert: true, new: true }
      );

      sendResponse(200, true, "Submission completed", res, {
        questionId,
        summary: {
          total: totalTests,
          passed: passedTests,
          failed: totalTests - passedTests,
          allPassed,
        },
        results,
      });
      return;
    } catch (error) {
      console.error("Error processing submission:", error);
      sendResponse(500, false, "Failed to process submission", res, null);
      return;
    }
  }
);

const getSubmissions = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, questionId } = req.query;
    if (!userId || typeof userId !== "string") {
      sendResponse(400, false, "userId is required", res);
      return;
    }
    if (!questionId || typeof questionId !== "string") {
      sendResponse(400, false, "questionId is required", res);
      return;
    }
    const submissions = await SubmissionsModel.findOne({
      questionId,
    });
    const filteredSubmissions = {
      questionId: submissions?.questionId,
      submissions: submissions?.submissions.filter(
        (submission) => submission.userId === userId
      ),
    }
    sendResponse(
      200,
      true,
      "Submissions fetched successfully",
      res,
      filteredSubmissions
    );
    return;
  }
);

export { getSubmissions, SubmitCode };
