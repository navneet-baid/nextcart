import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

// cartSlice.ts
const savedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
const initialState: CartState = savedCart ? JSON.parse(savedCart) : { items: [] };


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const existingItem = state.items.find(item => item.id === action.payload.product.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload.product, quantity: action.payload.quantity });
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCart: state => {
            state.items = [];
            localStorage.removeItem("cart");
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
