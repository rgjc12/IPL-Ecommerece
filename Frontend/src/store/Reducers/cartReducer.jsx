import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart:(localStorage.getItem("cart")||[]), 
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart=(action.payload); 
    },
    getCart: (state, action) => {
      state.cart = action.payload; 
    },
    updateCart: (state, action) => {
      state.cart = action.payload; 
    },
    deleteCart: (state, action) => {
      state.cart = action.payload; 
    },
    deleteCartAll: (state, action) => {
      state.cart = action.payload; 
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, getCart, updateCart, deleteCart,deleteCartAll } = cartSlice.actions;
