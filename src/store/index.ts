import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import userSlice from "./userSlice";
import postsSlice from "./postsSlice"
import commentsSlice from "./commentsSlice"

const store = configureStore({
  reducer: {
    main: mainReducer,
    userData: userSlice,
    postsData: postsSlice,
    commentsData: commentsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
