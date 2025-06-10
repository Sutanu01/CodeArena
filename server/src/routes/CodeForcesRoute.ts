import express from "express";
import {
  getUnsolvedQuestionLink,
  updateCodeforcesInfo,
  getSubmissionStatus,
} from "../controllers/codeforces.js";
const router = express.Router();

router.get("/get-status", getSubmissionStatus);

router.post("/update-info", updateCodeforcesInfo);

router.get("/get-contest-question", getUnsolvedQuestionLink);

export default router;
