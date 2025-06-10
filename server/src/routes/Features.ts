import { requireAuth } from '@clerk/express';
import express from 'express';
import { getLeaderboardInfo, getDailyStreakData, dailyUpdate } from '../controllers/features.js';
const router = express.Router();

router.get('/leaderboard',getLeaderboardInfo);

router.use(requireAuth())

router.get('/daily-streak-data',getDailyStreakData);
router.post('/daily-update',dailyUpdate)


export default router;