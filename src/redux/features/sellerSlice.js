import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSellerExist: false,
  seller: {},
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    saveSeller: (state, action) => {
      (state.isSellerExist = true), (state.seller = action.payload);
    },
    clearSeller: (state) => {
      (state.isSellerExist = false), (state.seller = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveSeller, clearSeller } = sellerSlice.actions;

export default sellerSlice.reducer;
