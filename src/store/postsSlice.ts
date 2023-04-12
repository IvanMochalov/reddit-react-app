import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type TPostData = {
  id?: string;
  author?: string;
  title?: string;
  rating?: number;
  avatar?: string;
  previewImg?: string;
  datePostUtc?: number;
}

type TPosts = {
  data: TPostData[];
  nextAfter:  string;
}

type TPostsState = {
  posts: TPostData[];
  nextAfter: string,
  loading: boolean;
  error: string | null;
}

const initialState: TPostsState = {
  posts: [],
  nextAfter: '',
  loading: false,
  error: null,
}

type TParamsFetch = {
  token: string;
  nextAfter?: string;
}

export const fetchPostsData = createAsyncThunk<TPosts, TParamsFetch, {rejectValue: string}>(
  'posts/fetchPostsData',
  async function ({token, nextAfter}, {rejectWithValue}) {
    try {
      const { data: { data: { after, children } } } = await axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
        headers: { Authorization: `bearer ${token}` },
        params: {
          limit: 10,
          after: nextAfter,
        }
      })
      // console.log(after);
      // console.log(children);
      return {
        data: children.map(
          (item: { data: any }) => ({
            id: item.data.id,
            author: item.data.author,
            title: item.data.title,
            rating: item.data.ups,
            avatar: item.data.sr_detail.icon_img
              ? item.data.sr_detail.icon_img
              : "https://e7.pngegg.com/pngimages/162/125/png-clipart-internet-of-things-information-digital-marketing-others-miscellaneous-face.png",
            previewImg: item.data.preview
              ? item.data.preview.images?.[0].source.url.replace(
                /(\&amp\;)/g,
                "&"
                )
              : "https://st.depositphoto.com/1000122/2016/i/450/depositphotos_20163697-stock-photo-small-scottish-straight-kitten-walking.jpg",
            datePostUtc: item.data.created_utc,
          })
        ),
        nextAfter: after,
      }
    } catch(errorLoading: any) {
      console.log(errorLoading);
      return rejectWithValue(errorLoading.message)
    }
  }
);

const postsSlice = createSlice({
  name: 'postsData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsData.pending, (state: TPostsState) => {
        return {
          ...state,
          loading: true,
          error: null,
        }
      })
      .addCase(fetchPostsData.fulfilled, (state: TPostsState, action: PayloadAction<TPosts>) => {
        return {
          ...state,
          loading: false,
          nextAfter: action.payload.nextAfter,
          posts: state.posts.concat(...action.payload.data),
        }
      })
      .addCase(fetchPostsData.rejected, (state: any, action: PayloadAction<string|undefined>) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      })
  }
});

export default postsSlice.reducer;