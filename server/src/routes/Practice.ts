import express from "express";
import { requireAuth } from "@clerk/express";
import { SubmitCode, getSubmissions, getSubmissionStatus } from "../controllers/submitCode.js";
import { createExpressRateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();


const submitLimiter = createExpressRateLimiter({
  keyPrefix: "codearena:ratelimit:submit",
  limit: 5,
  windowMs: 60_000,
});

router.post("/submit", requireAuth(), submitLimiter, SubmitCode);

router.get("/status/:jobId", requireAuth(), getSubmissionStatus);

router.get("/get-submissions", requireAuth(), getSubmissions);

export default router;
