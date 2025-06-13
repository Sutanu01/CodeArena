import { createSlice } from "@reduxjs/toolkit";
import {User} from "./schemas"
//please put these types in a separate file
const initialState = {
    UserData : null as User | null,
    isCodeforcesVerified: false,
}

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
export const { setUserData, setCodeforcesVerified, resetUserData,setCodeforcesHandle } = userSlice.actions;