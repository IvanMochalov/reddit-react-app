import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type TUserData = {
  name?: string;
  icon_img?: string;
}

type TUserState = {
  data: TUserData;
  loading: boolean;
  oauth: boolean;
  error: string | null;
}

const initialState: TUserState = {
  data: {},
  oauth: false,
  loading: false,
  error: null,
}

export const fetchUserData = createAsyncThunk<TUserData, string, {rejectValue: string}>(
  'userData/fetchUserData',
  async function (token, {rejectWithValue}) {
    try {
      const { data: { name, snoovatar_img: icon_img } } = await axios.get('https://oauth.reddit.com/api/v1/me.json', {
        headers: { Authorization: `bearer ${token}` }
      })
      return { name, icon_img }
    } catch (errorLoading: any) {
      console.log(errorLoading);
      return rejectWithValue(errorLoading.message)
    }
  }
);

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state: TUserState) => {
        return {
          ...state,
          loading: true,
          error: null
        }
      })
      .addCase(fetchUserData.fulfilled, (state: TUserState, action: PayloadAction<TUserData>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          oauth: true,
        }
      })
      .addCase(fetchUserData.rejected, (state: any, action: PayloadAction<string|undefined>) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
          oauth: false,
        }
      })
  }
});

export default userSlice.reducer;