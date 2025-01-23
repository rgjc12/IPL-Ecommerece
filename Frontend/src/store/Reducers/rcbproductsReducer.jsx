import { createSlice } from "@reduxjs/toolkit";

const rcbproductsSlice = createSlice({
    name: "rcbproducts",
    initialState: {
        rcbproducts: []
    },
    reducers: {
        getRcbproducts: (state, action) => {
            state.rcbproducts = action.payload;
        }
    }
})

export const { getRcbproducts } = rcbproductsSlice.actions;
export default rcbproductsSlice.reducer;
