import express from "express";
import {
  updateCodeforcesInfo,
  getSubmissionStatus,
} from "../controllers/codeforces.js";
const router = express.Router();

router.post("/get-status", getSubmissionStatus);

router.post("/update-info", updateCodeforcesInfo);

export default router;
