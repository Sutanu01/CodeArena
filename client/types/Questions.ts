export type InitialSourceCode = {
  lang_id: string;
  code: string;
};

export type Example = {
  input: string;
  output: string;
  explanation: string;
};

export type Question = {
  id: number;
  question_title: string;
  description: string;
  hints: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  initial_sourcecode: InitialSourceCode[];
  example: Example[];
};

export type QuestionList = {
  questions: Question[];
};
