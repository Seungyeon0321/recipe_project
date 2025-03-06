import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import client from "../components/util/client";

export const createPost = createAsyncThunk(
  "post/create",
  async (
    postData: {
      foodTitle: string;
      foodImage: string;
      instructions: {}[];
      ingredients: {}[];
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${client.defaults.baseURL}/post`,
        postData,
        {
          headers: {
            authorization: `Bearer ${postData.token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

interface Post {
  foodTitle: string;
  foodImage: string;
  instructions: {}[];
  ingredients: {}[];
  // 필요한 다른 포스트 필드들도 추가
}

interface PostState {
  post: Post | null;
  success_post: boolean;
}

const initialState: PostState = {
  post: null,
  success_post: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state) => {
      state.success_post = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.success_post = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        console.error("Post creation failed:", action.payload);
      });
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
