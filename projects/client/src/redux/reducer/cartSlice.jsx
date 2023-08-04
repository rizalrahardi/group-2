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
      state.totalHarga += action.payload.harga_produk;
    },
    deleteFromCart: (state, action) => {
      const { id } = action.payload;
      const existCart = state.cart.findIndex((item) => item.id === id);
      if (existCart !== -1) {
        console.log("=>", state.cart[existCart].quantity);
        if (state.cart[existCart].quantity > 0) {
          state.cart[existCart].quantity -= 1;
          state.totalHarga -= action.payload.harga_produk;
        }
      }
    },
    deleteCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const payment = (totalPrice, toast) => {
  return async () => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/transaction`,
        { totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Transaction Success",
        status: "success",
        description: "Data has been save in database",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const { addToCart, deleteFromCart, deleteCart } = ProductReducer.actions;
export default ProductReducer.reducer;