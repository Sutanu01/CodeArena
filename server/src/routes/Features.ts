import express from "express";
import { requireAuth } from "@clerk/express";
import { dailyUpdate, getLeaderboardInfo } from "../controllers/features.js";
import { createExpressRateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();


const leaderboardLimiter = createExpressRateLimiter({
  keyPrefix: "codearena:ratelimit:leaderboard",
  limit: 20,
  windowMs: 60_000,
});


const dailyUpdateLimiter = createExpressRateLimiter({
  keyPrefix: "codearena:ratelimit:daily",
  limit: 10,
  windowMs: 60_000,
});

router.get("/leaderboard", requireAuth(), leaderboardLimiter, getLeaderboardInfo);

router.post("/daily-update", requireAuth(), dailyUpdateLimiter, dailyUpdate);

export default router;
