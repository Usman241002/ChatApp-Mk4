import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  ageRange: "",
  gender: "any",
  country: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearSearch: () => initialState,
  },
});

export const { setSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
