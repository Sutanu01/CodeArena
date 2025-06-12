import express from 'express';
import { dailyUpdate, getDailyStreakData, getLeaderboardInfo } from '../controllers/features.js';
const router = express.Router();



router.get('/leaderboard',getLeaderboardInfo);
router.get('/daily-streak-data',getDailyStreakData);
router.post('/daily-update',dailyUpdate)


export default router;