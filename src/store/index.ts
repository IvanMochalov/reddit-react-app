import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "./authorizationSlice";
import commentsSlice from "./commentsSlice";
import postsSlice from "./postsSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    userData: userSlice,
    postsData: postsSlice,
    commentsData: commentsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
