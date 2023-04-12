import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type TCommentsObject = {
  id?: string;
  author?: string;
  gilded?: string;
  text?: string;
  created?: number;
  replies?: [TCommentsObject];
}

type TPostsComment = {
  data: TCommentsObject[];
  content: TPostContent;
}

type TPostContent = {
  title?: string;
  text?: string;
}

type TCommentsState = {
  comments: TCommentsObject[];
  content: TPostContent;
  loading: boolean;
  error: string | null;
}

const initialState: TCommentsState = {
  comments: [],
  content: {title: '', text: ''},
  loading: false,
  error: null,
}

type TParamsFetch = {
  token: string;
  postId: string | undefined;
}

export const fetchCommentsData = createAsyncThunk<TPostsComment, TParamsFetch, {rejectValue: string}>(
  'comments/fetchCommentsData',
  async function ({token, postId}, {rejectWithValue}) {
    try {
      const { data: [{data: {children: [{data: {title, selftext}}]}}, {data: {children: comments}}] } = await axios.get(`https://oauth.reddit.com/comments/${postId}`, {
        headers: { Authorization: `bearer ${token}` },
        // params: { limit: '10', after: 'afterLoad' }
      })
      // console.log(title, selftext);
      // console.log(comments);
      return  {
        data: comments.map(
          (item: { data: any }) => ({
            id: item.data.id,
            author: item.data.author,
            gilded: item.data.subreddit,
            text: item.data.body,
            created: item.data.created_utc,
            replies: item.data.replies?.data?.children.map(
              (item: { data: any }) => ({
                id: item.data.id,
                author: item.data.author,
                gilded: item.data.subreddit,
                text: item.data.body,
                created: item.data.created_utc,
                replies: item.data.replies?.data?.children.map(
                  (item: { data: any }) => ({
                    id: item.data.id,
                    author: item.data.author,
                    gilded: item.data.subreddit,
                    text: item.data.body,
                    created: item.data.created_utc,
                  }),
                )
              }),
            )
          })
        ),
        content: {
          title: title,
          text: selftext,
        }
      };
    } catch(errorLoading: any) {
      console.log(errorLoading);
      return rejectWithValue(errorLoading.message)
    }
  }
);

const commentsSlice = createSlice({
  name: 'commentsData',
  initialState,
  reducers: {
    deleteCommentData(state: TCommentsState, action: PayloadAction<TPostsComment>) {
      return {
        ...state,
        comments: action.payload.data,
        content: action.payload.content,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsData.pending, (state: TCommentsState) => {
        return {
          ...state,
          loading: true,
          error: null,
        }
      })
      .addCase(fetchCommentsData.fulfilled, (state: TCommentsState, action: PayloadAction<TPostsComment>) => {
        return {
          ...state,
          comments: action.payload.data,
          content: action.payload.content,
          loading: false,
        }
      })
      .addCase(fetchCommentsData.rejected, (state: any, action: PayloadAction<string|undefined>) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      })
  }
});

export const { deleteCommentData } = commentsSlice.actions;

export default commentsSlice.reducer;