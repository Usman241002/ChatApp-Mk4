import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketId: null,
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socketId = action.payload.socketId;
      state.isConnected = action.payload.isConnected;
    },
    clearSocket(state) {
      state.socketId = null;
      state.isConnected = false;
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
