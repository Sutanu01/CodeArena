import mongoose, { Schema, Document } from "mongoose";
import { Question } from "./Question.js";

export interface User extends Document {
  username: string;
  clerkId: string;
  email: string;
  password: string;
  avatar?: string;
  codeforces_info: {
    username: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    solved_ques: Array<Question>;
    rating_changes: Array<Number>;
  };
  total_matches: number;
  total_wins: number;
  login_data: Array<boolean>;
  maxStreak: number;
  currentStreak: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null },
  codeforces_info: {
    username: { type: String, default: null },
    rating: { type: Number, default: 0 },
    maxRating: { type: Number, default: 0 },
    rank: { type: String, default: null },
    maxRank: { type: String, default: null },
    solved_ques: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    rating_changes: [{ type: Number }],
  },
  total_matches: { type: Number, default: 0 },
  total_wins: { type: Number, default: 0 },
  login_data: { type: [Boolean], default: () => Array(30).fill(false) },
  maxStreak: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

  export default UserModel;