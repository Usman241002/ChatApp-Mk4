import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../../shared/types";

const initialState: User = {
  id: "",
  username: "",
  age: 18,
  gender: "",
  country: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: User, action) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
