import mongoose, { Schema, Document } from "mongoose";

export type Verdict = {
  success: boolean;
  message: string;
};
export interface Submission {
  userId: string;
  verdict: Verdict;
  submittedAt: Date;
}

export interface Submissions extends Document {
  questionId: string;
  submissions: Submission[];
}

const submissionSchema = new Schema<Submission>({
  userId: { type: String, required: true },
  verdict: {
    type: {
      success: { type: Boolean, required: true },
      message: { type: String, required: true },
    },
    required: true,
  },
  submittedAt: { type: Date, required: true },
});

const SubmissionsSchema = new Schema<Submissions>({
  questionId: { type: String, required: true, unique: true },
  submissions: { type: [submissionSchema], default: [] },
});

const SubmissionsModel =
  (mongoose.models.Submissions as mongoose.Model<Submissions>) ||
  mongoose.model<Submissions>("Submissions", SubmissionsSchema);

export default SubmissionsModel;
