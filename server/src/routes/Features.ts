import express from "express";
import { requireAuth } from "@clerk/express";
import { dailyUpdate, getLeaderboardInfo } from "../controllers/features.js";
const router = express.Router();

router.get("/leaderboard", requireAuth(), getLeaderboardInfo);

router.post("/daily-update", requireAuth(), dailyUpdate);

export default router;
