import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/addtocart/cartSlice"; 
import wishListSlice from "./features/wishlist/wishListSlice";
import searchProductSlice from "./features/searchProduct/searchProductSlice";
import addressSlice from "./features/address/addressSlice";
import orderDataSlice from "./features/ordersData/orderDataSlice";
import authSlice from "./features/userAuth/authSlice";
import dropDownSlice from "./features/dropdown/dropDownSlice";
const store = configureStore({
  reducer: {
    auth : authSlice,
    cartData: cartReducer, 
    searchProduct: searchProductSlice,
    wishListProduct : wishListSlice,
    addressData  : addressSlice,
    ordersData : orderDataSlice,
    dropdDown : dropDownSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
