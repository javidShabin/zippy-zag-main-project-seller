import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "../redux/features/sellerSlice";

export const store = configureStore({
  reducer: {
    seller: sellerReducer,
  },
});
