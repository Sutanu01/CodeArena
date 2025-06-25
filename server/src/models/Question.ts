import mongoose, { Schema, Document } from "mongoose";

export interface Question extends Document {
  contestId: number;
  name: string;
  questionId: string;
  index: string;
  rating: number;
  tags: string[];
}

const QuestionSchema: Schema<Question> = new Schema({
  contestId: { type: Number, required: true },
  name: { type: String, required: true },
  questionId: { type: String, required: true, unique: true },
  index: { type: String, required: true },
  rating: { type: Number, default: 9999 },
  tags: { type: [String], default: [] },
});

const QuestionModel =
  (mongoose.models.Question as mongoose.Model<Question>) ||
  mongoose.model<Question>("Question", QuestionSchema);

export default QuestionModel;
