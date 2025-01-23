import { createSlice } from "@reduxjs/toolkit";


const storedToken = localStorage.getItem("token") || "";

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        token: storedToken,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        }
    }
})

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;


