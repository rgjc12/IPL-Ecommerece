import { createSlice } from "@reduxjs/toolkit";

const kkrproductsSlice = createSlice({
    name: "kkrproducts",
    initialState: {
        kkrproducts:[]
    },
    reducers: {
        getKkrproducts: (state, action) => {
            state.kkrproducts = action.payload;
        }
    }
})

export const { getKkrproducts } = kkrproductsSlice.actions;
export default kkrproductsSlice.reducer;
