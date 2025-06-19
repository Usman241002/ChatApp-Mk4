import { createSlice } from "@reduxjs/toolkit";
import type { MessageHistoryState } from "../../../shared/types";

const initialState: MessageHistoryState = {};

const messageHistorySlice = createSlice({
  name: "messageHistory",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { id, message, userDetails, unreadStatus } = action.payload;
      if (!state[id]) {
        state[id] = {
          user: userDetails,
          messages: [],
          unreadStatus: false,
        };
      }
      state[id].messages.push(message);
      state[id].unreadStatus = unreadStatus;
    },
    readMessage: (state, action) => {
      const { id } = action.payload;
      if (state[id]) {
        state[id].unreadStatus = false;
      }
    },
  },
});

export const { addMessage, readMessage } = messageHistorySlice.actions;

export default messageHistorySlice.reducer;
