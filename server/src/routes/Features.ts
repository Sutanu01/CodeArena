import express from "express";
import { dailyUpdate, getLeaderboardInfo } from "../controllers/features.js";
const router = express.Router();

router.get("/leaderboard", getLeaderboardInfo);

router.post("/daily-update", dailyUpdate);

export default router;
