import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { sendResponse, TryCatch, getAuthUserId } from "../utils/features.js";
import type { TestCaseList } from "../types/TC-type.js";
import { testcases } from "../Data/TestCases.js";
import UserModel from "../models/User.js";
import SubmissionsModel from "../models/Submissions.js";
import { submissionQueue } from "../queues/submission.queue.js";

dotenv.config();

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

    const user = await UserModel.findById(userId);
    if (!user) {
      return sendResponse(404, false, "User not found", res, null);
    }

    const authenticatedClerkId = getAuthUserId(req);
    if (user.clerkId !== authenticatedClerkId) {
      return sendResponse(
        403,
        false,
        "Unauthorized: You cannot submit code as another user",
        res,
        null
      );
    }

    // Validate the question exists before enqueuing
    const allCases: TestCaseList = testcases;
    const questionTestCase = allCases.testcases.find(
      (tc) => tc.id === questionId
    );

    if (!questionTestCase) {
      return sendResponse(404, false, "Question not found", res, null);
    }

    // Enqueue the submission job into BullMQ
    const job = await submissionQueue.add("submit", {
      userId,
      questionId,
      sourceCode: source_code,
      language,
    });

    sendResponse(202, true, "Submission queued for processing", res, {
      jobId: job.id,
    });
    return;
  }
);


const getSubmissionStatus = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.params;

    if (!jobId) {
      sendResponse(400, false, "jobId is required", res);
      return;
    }

    const job = await submissionQueue.getJob(jobId);

    if (!job) {
      sendResponse(404, false, "Job not found", res);
      return;
    }

    const state = await job.getState();
    const progress = job.progress;

    if (state === "completed") {
      sendResponse(200, true, "Submission completed", res, {
        status: "completed",
        result: job.returnvalue,
      });
      return;
    }

    if (state === "failed") {
      sendResponse(200, true, "Submission failed", res, {
        status: "failed",
        error: job.failedReason || "Unknown error",
      });
      return;
    }

    // Job is still in progress (waiting, active, delayed)
    sendResponse(200, true, "Submission in progress", res, {
      status: state,
      progress,
    });
    return;
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
    const user = await UserModel.findById(userId);
    if (!user) {
      sendResponse(404, false, "User not found", res);
      return;
    }
    const authenticatedClerkId = getAuthUserId(req);
    if (user.clerkId !== authenticatedClerkId) {
      sendResponse(403, false, "Unauthorized: You cannot view this user's submissions", res);
      return;
    }
    const submissions = await SubmissionsModel.findOne({
      questionId,
    });
    const filteredSubmissions = {
      questionId: submissions?.questionId || questionId,
      submissions: submissions?.submissions
        ? submissions.submissions.filter((submission) => submission.userId === userId)
        : [],
    };
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

export { getSubmissions, getSubmissionStatus, SubmitCode };
