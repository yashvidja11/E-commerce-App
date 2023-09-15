import { createSlice } from "@reduxjs/toolkit";
interface searchProduct {
  search: string;
}
const initialState: searchProduct = {
  search: "",
};
const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState,
  reducers: {
    searchInfo: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { searchInfo } = searchProductSlice.actions;
export default searchProductSlice.reducer;
