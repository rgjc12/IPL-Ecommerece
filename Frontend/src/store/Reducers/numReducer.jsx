import { createSlice } from "@reduxjs/toolkit";

const numSlice = createSlice({
    name: "num",
    initialState: {
        num:(localStorage.getItem('iplTeamNumber')||0),
    },
    reducers: {
        getNum: (state, action) => {
            state.num = action.payload;
        },        
    }
})

export const { getNum} = numSlice.actions;
export default numSlice.reducer;
 