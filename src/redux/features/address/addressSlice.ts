import { createSlice } from "@reduxjs/toolkit";
interface searchProduct {
    address: any;
}
const initialState: searchProduct = {
  address: [],
};
const addressSlice = createSlice({
  name: "addressData",
  initialState,
  reducers: {
    addressInfo: (state, action) => {
      state.address.push( action.payload);
    },
  },
});

export const { addressInfo } = addressSlice.actions;
export default addressSlice.reducer;
