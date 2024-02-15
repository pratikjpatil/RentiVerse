import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
}
//set sidebar open or close
const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSidebarStatus: (state, action) => {
            state.status = action.payload;
        }
    }
})

export const {setSidebarStatus} = sidebarSlice.actions;

export default sidebarSlice.reducer;