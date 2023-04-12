import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type RootState = {
  commentText: string;
  token: string | null;
}

const initialState: RootState = {
  commentText: '',
  token: null,
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateComment(state, action: PayloadAction<string>) {
      // state.commentText = action.payload;
      return {
        ...state,
        commentText: action.payload,
      };
    },
    setToken(state, action: PayloadAction<string | null>) {
      // state.token = action.payload;
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { updateComment, setToken } = mainSlice.actions;

export default mainSlice.reducer;