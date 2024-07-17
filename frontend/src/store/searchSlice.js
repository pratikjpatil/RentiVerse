import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  prevSearchText: "",
  debouncedTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setDebouncedTerm: (state, action) => {
      state.debouncedTerm = action.payload;
    },
    setPrevSearchText: (state, action) => {
      state.prevSearchText = action.payload;
    },
  },
});

export const { setSearchText, setDebouncedTerm, setPrevSearchText } = searchSlice.actions;

export default searchSlice.reducer;
