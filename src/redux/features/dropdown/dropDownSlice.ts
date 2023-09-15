import { createSlice } from "@reduxjs/toolkit";
interface searchProduct {
    isDropdownOpen: boolean;
}
const initialState: searchProduct = {
    isDropdownOpen: false,
};
const dropDownSlice = createSlice({
  name: "searchProduct",
  initialState,
  reducers: {
    dropdownInfo: (state, action) => {
      state.isDropdownOpen = action.payload;
    },
  },
});

export const { dropdownInfo } = dropDownSlice.actions;
export default dropDownSlice.reducer;
