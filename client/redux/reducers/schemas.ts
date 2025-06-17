export interface Question{
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
export interface User{
  _id: string;
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
  currentStreak: number;
  match_history?: Array<Match>;
}

export type MoreInfoType = {
  winrate: number;
  losses: number;
  ratingData: { rating: number; contestNumber: number }[];
};

export type SubmissionType={
    userId: string;
    verdict: string;
    programmingLanguage: string;
    submission_time: string;
    passedTestCount: number;
    timeTaken: number;
    memoryUsed: number;
}

export type questionType = {
  contestId: number;
  index: string;
  link: string;
};