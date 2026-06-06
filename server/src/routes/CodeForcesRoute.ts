import express from "express";
import { requireAuth } from "@clerk/express";
import {
  updateCodeforcesInfo,
  getSubmissionStatus,
} from "../controllers/codeforces.js";
const router = express.Router();

router.post("/get-status", requireAuth(), getSubmissionStatus);

router.post("/update-info", requireAuth(), updateCodeforcesInfo);

export default router;
