import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import socketReducer from "../features/socketSlice";
import messageHistoryReducer from "../features/messageHistorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    messageHistory: messageHistoryReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
