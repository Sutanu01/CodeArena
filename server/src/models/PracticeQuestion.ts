import mongoose, { Schema, Document } from "mongoose";

export type TestCase = {
  input: string;
  output: string;
};
export type QuestionType = "syntax_fix" | "implementation";
export type Difficulty = "easy" | "medium" | "hard";



export interface PracticeQuestion extends Document {
  questionId: string;
  questionName: string;
  question_type: QuestionType;
  description: string;
  tags?: string[];
  code_snippet: string;
  test_cases: TestCase[];
  difficulty?: Difficulty;
}

const PracticeQuestionSchema: Schema = new Schema({
  questionId: { type: String, required: true, unique: true },
  questionName: { type: String, required: true },
  question_type: {
    type: String,
    enum: ["syntax_fix", "implementation"],
    required: true,
  },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  code_snippet: { type: String, required: true },
  test_cases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
});


const PracticeQuestionModel =
  mongoose.models.PracticeQuestion as mongoose.Model<PracticeQuestion> ||
  mongoose.model<PracticeQuestion>("PracticeQuestion", PracticeQuestionSchema);

export default PracticeQuestionModel;
