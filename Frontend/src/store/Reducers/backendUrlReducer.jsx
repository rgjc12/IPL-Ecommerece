import { createSlice } from "@reduxjs/toolkit";

const backendUrlSlice = createSlice({
    name: "backendUrl",
    initialState: {
        backendUrl: import.meta.env.VITE_BACKEND
    },
    reducers: {}
})

export default backendUrlSlice.reducer;
