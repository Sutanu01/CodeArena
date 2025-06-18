import { createSlice } from "@reduxjs/toolkit";
import { matchType, questionType, User } from "./schemas";

const initialState = {
  roomId: null as string | null,
  you: null as User | null,
  opponent: null as User | null,
  opponentSocketId: null as string | null,
  matchType: null as matchType | null,
  question: null as questionType | null,
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setMatch(state, action) {
      state.roomId = action.payload.roomId;
      state.you = action.payload.you;
      state.opponent = action.payload.opponent;
      state.opponentSocketId = action.payload.opponentSocketId;
      state.matchType = action.payload.matchType;
      state.question = action.payload.question;
    },
    deleteMatch(state) {
      state.roomId = null;
      state.you = null;
      state.opponent = null;
      state.opponentSocketId = null;
      state.matchType = null;
      state.question = null;
    },
  },
});
export default matchSlice;
export const { setMatch, deleteMatch } = matchSlice.actions;
