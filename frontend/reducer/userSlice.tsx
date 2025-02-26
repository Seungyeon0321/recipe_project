import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import client from "../components/util/client";

export const getUser = createAsyncThunk(
  "user/me",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${client.defaults.baseURL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    credentials: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${client.defaults.baseURL}/user/login`,
        {
          userEmail: credentials.email,
          password: credentials.password,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (
    credentials: {
      email: string;
      password: string;
      username: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${client.defaults.baseURL}/user/signup`,
        {
          userEmail: credentials.email,
          password: credentials.password,
          name: credentials.username,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
