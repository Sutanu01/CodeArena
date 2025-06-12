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
    const users = await UserModel.find({})
      .sort({ total_wins: -1, total_matches: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .select("username avatar total_matches total_wins")
      .lean();

    const leaderboard = users.map((user) => ({
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
  }
);

const getDailyStreakData = TryCatch(
  async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.body;
    if (!userId) {
      sendResponse(400, false, "User ID is required", res);
      return;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      sendResponse(404, false, "User not found", res);
      return;
    }
    const data = {
      login_data: user.login_data,
      maxStreak: user.maxStreak,
      currentStreak: user.currentStreak,
    };
    sendResponse(
      200,
      true,
      "Daily streak data fetched successfully",
      res,
      data
    );
  }
);

const dailyUpdate = TryCatch(
  async (req: Request, res: Response): Promise<any> => {
    //it means user logged in toady ,dont do api call if not logged obv
    const { userId } = req.body;
    if (!userId) {
      sendResponse(400, false, "User ID is required", res);
      return;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      sendResponse(404, false, "User not found", res);
      return;
    }
    user.currentStreak += 1;
    user.maxStreak = Math.max(user.maxStreak, user.currentStreak);
    user.login_data = user.login_data.slice(1).concat(true);
    await user.save();
    sendResponse(200, true, "Daily streak updated successfully", res, {
      currentStreak: user.currentStreak,
      maxStreak: user.maxStreak,
      login_data: user.login_data,
    });
  }
);

export { dailyUpdate, getDailyStreakData, getLeaderboardInfo };
