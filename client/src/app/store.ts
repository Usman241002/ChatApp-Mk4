import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import socketReducer from "../features/socketSlice";
import messageHistoryReducer from "../features/messageHistorySlice";
import searchReducer from "../features/searchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    messageHistory: messageHistoryReducer,
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
