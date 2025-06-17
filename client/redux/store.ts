import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import matchSlice from "./reducers/match";
const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [matchSlice.name]: matchSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;