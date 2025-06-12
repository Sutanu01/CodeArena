import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isCodeforcesVerified: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setCodeforcesVerified: (state, action) => {
            state.isCodeforcesVerified = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
            state.isCodeforcesVerified = false;
        },
    },
});
export default userSlice;
export const { setUser, setCodeforcesVerified, resetUser } = userSlice.actions;