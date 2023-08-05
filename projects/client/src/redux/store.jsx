import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./reducer/cartSlice";
export const store = configureStore({
	reducer: { ProductReducer },
});
