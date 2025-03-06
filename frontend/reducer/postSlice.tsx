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
      console.log("postData.token", postData.token);
      const response = await axios.post(
        `${client.defaults.baseURL}/post`,
        postData,
        {
          headers: {
            authorization: `Bearer ${postData.token}`,
          },
        }
      );

      console.log("response", response.data);

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
}

const initialState: PostState = {
  post: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
  },
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        console.error("Post creation failed:", action.payload);
      });
  },
});
