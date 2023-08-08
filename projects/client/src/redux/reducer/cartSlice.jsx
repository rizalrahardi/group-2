import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  cart: [],
  totalHarga: 0,
};
export const ProductReducer = createSlice({
  name: "ProductReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      console.log("?", action.payload);
      const existCart = state.cart.findIndex((item) => item.id === id);
      if (existCart !== -1) {
        state.cart[existCart].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalHarga += action.payload.price;
    },
    decreaseCartProduct: (state, action) => {
      const { id } = action.payload;
      const existCart = state.cart.findIndex((item) => item.id === id);
      if (existCart !== -1) {
        console.log("=>", state.cart[existCart].quantity);
        if (state.cart[existCart].quantity > 0) {
          state.cart[existCart].quantity -= 1;
          state.totalHarga -= action.payload.price;
        }
        if (state.cart[existCart].quantity === 0) {
          state.cart.splice(existCart, 1);
        }
      }
    },
    increaseCartProduct: (state, action) => {
      const { id } = action.payload;
      const existCart = state.cart.findIndex((item) => item.id === id);
      if (existCart !== -1) {
        state.cart[existCart].quantity += 1;
        state.totalHarga += action.payload.price;
      }
    },

    deleteCart: (state, action) => {
      const { id } = action.payload;
      const existCart = state.cart.findIndex((item) => item.id === id);
      if (existCart !== -1) {
        const deletedProduct = state.cart[existCart];
        state.cart.splice(existCart, 1);
        state.totalHarga -= deletedProduct.price * deletedProduct.quantity;
      }
    },
    deleteAllCart: (state, action) => {
      state.cart = [];
      state.totalHarga = 0;
    }
  },

});


export const { addToCart, increaseCartProduct, decreaseCartProduct, deleteAllCart, deleteCart } = ProductReducer.actions;
export default ProductReducer.reducer;