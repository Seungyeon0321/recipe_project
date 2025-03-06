import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/userSlice";
import postReducer from "../reducer/postSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
