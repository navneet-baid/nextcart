import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: { rate: number; count: number };
}

interface ProductsState {
    allItems: Product[];
    filteredItems: Product[];
    categories: string[];
    filters: {
        category: string;
        rating: number;
        sort: string;
        search: string;
    };
    loading: boolean;
}

const initialState: ProductsState = {
    allItems: [],
    filteredItems: [],
    categories: [],
    filters: {
        category: "",
        rating: 0,
        sort: "",
        search: "",
    },
    loading: false,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com/products");
    const data = await res.json();
    return data as Product[];
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.filters.category = action.payload;
            applyFilters(state);
        },
        setRating(state, action: PayloadAction<number>) {
            state.filters.rating = action.payload;
            applyFilters(state);
        },
        setSort(state, action: PayloadAction<string>) {
            state.filters.sort = action.payload;
            applyFilters(state);
        },
        setSearch(state, action: PayloadAction<string>) {
            state.filters.search = action.payload;
            applyFilters(state);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.allItems = action.payload;
            state.categories = Array.from(new Set(action.payload.map(p => p.category)));
            applyFilters(state);
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loading = false;
        });
    },
});

function applyFilters(state: ProductsState) {
    let items = [...state.allItems];

    if (state.filters.category) {
        items = items.filter(p => p.category === state.filters.category);
    }

    if (state.filters.rating) {
        items = items.filter(p => p.rating.rate >= state.filters.rating);
    }

    if (state.filters.search) {
        const query = state.filters.search.toLowerCase();
        items = items.filter(p => p.title.toLowerCase().includes(query));
    }

    if (state.filters.sort === "price-asc") items.sort((a, b) => a.price - b.price);
    else if (state.filters.sort === "price-desc") items.sort((a, b) => b.price - a.price);
    else if (state.filters.sort === "rating") items.sort((a, b) => b.rating.rate - a.rating.rate);

    state.filteredItems = items;
}

export const { setCategory, setRating, setSort, setSearch } = productsSlice.actions;
export default productsSlice.reducer;
