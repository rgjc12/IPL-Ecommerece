import { createSlice } from "@reduxjs/toolkit";

const miproductsSlice = createSlice({
    name: "miproducts",
    initialState: {
        miproducts: []
    },
    reducers: {
        getMiproducts: (state, action) => {
            state.miproducts = action.payload;
        }
    }
})

export const { getMiproducts } = miproductsSlice.actions;
export default miproductsSlice.reducer;
