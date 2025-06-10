import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { TryCatch,sendResponse } from "../utils/features.js";

const createUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if(!req.auth){
        return sendResponse(401, false, "Unauthorized", res);
    }
    const { username, email, password, avatar } = req.body;
      if (!username) sendResponse(400, false, "Name is required", res);
      if( !email) sendResponse(400, false, "Email is required", res);
      if (!password) sendResponse(400, false, "Password is required", res);

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
        return sendResponse(400, false, "Email already exists", res);
    }
    const existingUserByUsername = await UserModel.findOne({
        username,
    });
    if (existingUserByUsername) {
        return sendResponse(400, false, "Username already exists", res);
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser ={
        username,email,
        password: hashedPassword,
        avatar: avatar || null,
      }
      await UserModel.create(newUser);
      sendResponse(201, true, "User created successfully", res);
    }
);



const getUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const {username} = req.query;
        if(username){
            if (typeof username !== 'string' || !username.trim()) {
                     return sendResponse(400, false, "Invalid username", res);
            }
            const user = await UserModel.findOne({username})
            if (!user) {
                return sendResponse(404, false, "User not found", res);
            }
            return sendResponse(200, true, "User found", res, user);
        }
        else{
            //logic to get the logged-in user
            if(!req.auth || !req.auth.userId){
                return sendResponse(401, false, "Unauthorized", res);
            }
            const user = await UserModel.findOne({ clerkId: req.auth.userId });
            if (!user) {
                return sendResponse(404, false, "User not found", res);
            }
            return sendResponse(200, true, "User found", res, user);
        }
    }
);



const updateUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        if(!req.auth){
            return sendResponse(401, false, "Unauthorized", res);
        }
        const existingUser = await UserModel.findOne({ clerkId: req.auth.userId });
        if (!existingUser) {
            return sendResponse(404, false, "User not found", res);
        }
        const {username,email}=req.body;
        if(existingUser.username !== username){
            return sendResponse(400, false, "Username did not match", res);
        }
        if(existingUser.email !== email){
            return sendResponse(400, false, "Email did not match", res);
        }
        
        //update the user
        existingUser.avatar = req.body.avatar || existingUser.avatar;
        const codeforces = req.body.codeforces_info;
        if (codeforces) {
            existingUser.codeforces_info = {
                username: codeforces.username || existingUser.codeforces_info?.username,
                rating: codeforces.rating || existingUser.codeforces_info?.rating,
                maxRating: codeforces.maxRating || existingUser.codeforces_info?.maxRating,
                rank: codeforces.rank || existingUser.codeforces_info?.rank,
                maxRank: codeforces.maxRank || existingUser.codeforces_info?.maxRank,
                solved_ques: codeforces.solved_ques || existingUser.codeforces_info?.solved_ques,
                rating_changes: codeforces.rating_changes || existingUser.codeforces_info?.rating_changes,
            };
        }
        existingUser.total_matches = req.body.total_matches || existingUser.total_matches;
        existingUser.total_wins = req.body.total_wins || existingUser.total_wins;
        existingUser.login_data = req.body.login_data || existingUser.login_data;
        existingUser.maxStreak = req.body.maxStreak || existingUser.maxStreak;
        existingUser.currentStreak = req.body.currentStreak || existingUser.currentStreak;
        await existingUser.save();
        return sendResponse(200, true, "User updated successfully", res, existingUser);
    }
);

const deleteUser = TryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        if(!req.auth){
        return sendResponse(401, false, "Unauthorized", res);
        }
        //deleting the logged-in user
        const user = await UserModel.findOneAndDelete({ clerkId: req.auth.userId });
        if (!user) {
            return sendResponse(404, false, "User not found", res);
        }
        return sendResponse(200, true, "User deleted successfully", res);
    }
);

export { createUser, getUser, updateUser, deleteUser };
