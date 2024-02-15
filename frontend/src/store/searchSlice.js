import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: "",
    prevSearchText:""
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setPrevSearchText: (state, action) => {
            state.prevSearchText = action.payload;
        }
    }
})

export const {setSearchText, setPrevSearchText} = searchSlice.actions;

export default searchSlice.reducer;