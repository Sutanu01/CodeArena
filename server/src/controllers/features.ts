import { Request, Response } from "express";
import UserModel from "../models/User.js";
import { sendResponse, TryCatch } from "../utils/features.js";

const getLeaderboardInfo = TryCatch(
  async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 50 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const totalUsers = await UserModel.countDocuments({});
    const totalPages = Math.ceil(totalUsers / limitNumber);
    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      sendResponse(400, false, "Invalid pagination parameters", res);
      return;
    }
    if (pageNumber > totalPages) {
      sendResponse(404, false, "Page not found", res);
      return;
    }
    const skipCount = (pageNumber - 1) * limitNumber;
    const users = await UserModel.find({})
      .sort({ total_wins: -1, total_matches: 1 })
      .skip(skipCount)
      .limit(limitNumber)
      .select("username avatar total_matches total_wins")
      .lean();

    const leaderboard = users.map((user,index) => ({
      rank: skipCount + index + 1,
      username: user.username,
      avatar: user.avatar,
      total_matches: user.total_matches,
      total_wins: user.total_wins,
    }));
    sendResponse(200, true, "Leaderboard fetched successfully", res, {
      leaderboard,
      totalUsers,
      totalPages,
      currentPage: pageNumber,
    });
    return;
  }
);


//idk cron need to be set up on server side also hook need to be changged for this to work
const dailyUpdate = TryCatch(
  async (req: Request, res: Response): Promise<any> => {
    const { userId,didLogin } = req.body;
    if (!userId) {
      sendResponse(400, false, "User ID is required", res);
      return;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      sendResponse(404, false, "User not found", res);
      return;
    }
    if(didLogin){
      user.currentStreak += 1;
      user.maxStreak = Math.max(user.maxStreak, user.currentStreak);
      user.login_data = user.login_data.slice(1).concat(true);
    }
    else{
      user.currentStreak = 0;
      user.login_data = user.login_data.slice(1).concat(false);
    }
    await user.save();
    sendResponse(200, true, "Daily streak updated successfully", res, {
      currentStreak: user.currentStreak,
      maxStreak: user.maxStreak,
      login_data: user.login_data,
    });
    return;
  }
);

export { dailyUpdate, getLeaderboardInfo };
