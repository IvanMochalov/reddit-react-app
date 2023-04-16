import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RootState = {
  token: string | null;
}

const initialState: RootState = {
  token: null,
}

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { setToken } = authorizationSlice.actions;

export default authorizationSlice.reducer;