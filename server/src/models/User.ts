import mongoose, { Schema, Document } from "mongoose";
interface Question {
  contestId: number;
  name: string;
  questionId: string;
  index: string;
  rating: number;
  tags: string[];
}

export type Match = {
  opponent: string;
  result: "Win" | "Loss" | "Draw";
  date: Date;
};
export interface User extends Document {
  username: string;
  clerkId: string;
  email: string;
  avatar?: string;
  codeforces_info: {
    username: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    solved_ques: Array<Question>;
    rating_changes: Array<number>;
  };
  total_matches: number;
  total_wins: number;
  login_data: Array<boolean>;
  maxStreak: number;
  daily_login : boolean;
  currentStreak: number;
  match_history?: Array<Match>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: null },
  codeforces_info: {
    username: { type: String, default: null },
    rating: { type: Number, default: 0 },
    maxRating: { type: Number, default: 0 },
    rank: { type: String, default: null },
    maxRank: { type: String, default: null },
    solved_ques: [{
      contestId: { type: Number, required: true },
      name: { type: String, required: true },
      questionId: { type: String, required: true},
      index: { type: String, required: true },
      rating: { type: Number, default: 9999 },
      tags: { type: [String], default: [] },
    }],
    rating_changes: [{ type: Number }],
  },
  daily_login: { type: Boolean, default:false},
  total_matches: { type: Number, default: 0 },
  total_wins: { type: Number, default: 0 },
  login_data: { type: [Boolean], default: () => Array(35).fill(false) },
  maxStreak: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  match_history: [
    {
      opponent: { type: String, required: true },
      result: { type: String, enum: ["Win", "Loss", "Draw"], required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

  export default UserModel;