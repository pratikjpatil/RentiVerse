import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productsReducer from "./productsSlice" 
import sidebarReducer from "./sidebarSlice" 
import searchReducer from "./searchSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        sidebar: sidebarReducer,
        search: searchReducer
    }
})

export default store;