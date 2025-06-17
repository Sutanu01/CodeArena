import { createSlice } from "@reduxjs/toolkit";
import { questionType, User } from "./schemas";

const initialState = {
  you: null as User | null,
  opponent: null as User | null,
  opponentSocketId: null as string | null,
  matchType: "10" as "10" | "25" | "40",
  question: null as questionType | null,
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setMatch(state, action) {
      state.you = action.payload.you;
      state.opponent = action.payload.opponent;
      state.opponentSocketId = action.payload.opponentSocketId;
      state.matchType = action.payload.matchType;
      state.question = action.payload.question;
    },
    deleteMatch(state) {
      state.you = null;
      state.opponent = null;
      state.opponentSocketId = null;
      state.matchType = "10";
      state.question = null;
    },
  },
});
export default matchSlice;
export const { setMatch, deleteMatch } = matchSlice.actions;
