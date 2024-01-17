import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productsReducer from "./productsSlice" 

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer
    }
})

export default store;