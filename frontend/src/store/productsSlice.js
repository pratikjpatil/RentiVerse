import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        homePageProducts:[],
        listedProducts:[],
        givenOnRent:[],
        takenOnRent:[],
        draftProducts: []
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addHomepageProducts: (state, action) => {
            state.homePageProducts = action.payload;
        },
        addListedProducts: (state, action) => {
            state.listedProducts = action.payload;
        },
        addGivenOnRentProducts: (state, action) => {
            state.givenOnRent = action.payload;
        },
        addTakenOnRentProducts: (state, action) => {
            state.takenOnRent = action.payload;
        },
        addDraftProducts: (state, action) => {
            state.draftProducts = action.payload;
        }
    }
})

export const {addHomepageProducts, addListedProducts, addGivenOnRentProducts, addTakenOnRentProducts, addDraftProducts} = productsSlice.actions;

export default productsSlice.reducer;