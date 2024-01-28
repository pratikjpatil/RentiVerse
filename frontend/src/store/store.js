import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productsReducer from "./productsSlice" 
import sidebarReducer from "./sidebarSlice" 

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        sidebar: sidebarReducer
    }
})

export default store;