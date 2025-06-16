import { createSlice } from "@reduxjs/toolkit";
import { User } from "./schemas";
//please put these types in a separate file
const initialState = {
  UserData: null as User | null,
  isCodeforcesVerified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.UserData = action.payload;
    },
    setCodeforcesHandle: (state, action) => {
      if (state.UserData) {
        state.UserData.codeforces_info.username = action.payload;
      }
    },
    resetCodeforcesHandle: (state) => {
      if (state.UserData) {
        state.UserData.codeforces_info.username = "";
        state.UserData.codeforces_info.maxRank = "";
        state.UserData.codeforces_info.maxRating = 0;
        state.UserData.codeforces_info.rating = 0;
        state.UserData.codeforces_info.rank = "";
        state.UserData.codeforces_info.rating_changes = [];
        state.UserData.codeforces_info.solved_ques = [];
      }
    },
    setCodeforcesVerified: (state, action) => {
      state.isCodeforcesVerified = action.payload;
    },
    resetUserData: (state) => {
      state.UserData = null;
      state.isCodeforcesVerified = false;
    },
  },
});
export default userSlice;
export const {
  setUserData,
  setCodeforcesVerified,
  setCodeforcesHandle,
  resetUserData,
  resetCodeforcesHandle,
} = userSlice.actions;
