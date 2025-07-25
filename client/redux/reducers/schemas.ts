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

export interface CustomRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface RatingBracketSelectorProps {
  selectedRating: string;
  onRatingSelect: (rating: string) => void;
}
export interface QuestionTypeSelectorProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}
export interface PlayerCardProps {
  isUser: boolean;
  isJoined: boolean;
  isReady: boolean;
  User: User | null;
}
export interface RoomCodeDisplayProps {
  roomCode: string;
  onCopyCode: () => void;
  copied: boolean;
}

export interface MatchSpecificationsProps {
  selectedRating: string;
  selectedTypes: string[];
}

export interface JoinCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinRoom: (code: string) => void;
}

export type matchType = {
  lowerRating?: number;
  upperRating?: number;
  tags?: string[];
  mode: "10" | "25" | "40";
}