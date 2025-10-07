// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
