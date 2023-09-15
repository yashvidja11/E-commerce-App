import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "../redux/store";
import HomePage from "../pages/HomePage";
import ProductList from "../pages/ProductList";
import AddToCartPage from "../pages/AddToCartPage";
import MasterLayout from "../layouts/MasterLayout";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import WishlistPage from "../pages/WishListPage";
import CheckoutPage from "../pages/Checkout";
import HelpCenterPage from "../pages/HelpCenterPage";
import SignIn from "../components/SignIn";
import Orderspage from "../pages/OdersPage";
import OrderDetailPage from "../pages/OrderDetailPage";

import {
  signInInfo,
  signupDatalocalstorage,
} from "../redux/features/userAuth/authSlice";
import { decryptData } from "../utils/dataEncryption";
import ProtectedRoute from "../components/ProtectedRoute";
import { orderData } from "../redux/features/ordersData/orderDataSlice";
import Error404Page from "../pages/Error404Page";
import SignUp from "../components/SignUp";
import UserProfile from "../pages/UserProfile";
import { addressInfo } from "../redux/features/address/addressSlice";
import SavedAddress from "../pages/SavedAddress";

const Router: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const existingUser = localStorage.getItem("currentUser");
    const user = existingUser ? JSON.parse(decryptData(existingUser)) : "";
   

    dispatch(signInInfo(user));

    const existinguserData = localStorage.getItem("userSignupData");
    const usersData = existinguserData
      ? JSON.parse(decryptData(existinguserData))
      : [];
    dispatch(signupDatalocalstorage(usersData));
    const ordersData = JSON.parse(localStorage.getItem("orderData") || "[]");

    dispatch(orderData(ordersData));

    const useraddress = localStorage.getItem("address");
    const address = useraddress ? JSON.parse(useraddress) : ""
    dispatch(addressInfo(address))
  }, []);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MasterLayout />}>
              <Route index element={<HomePage />} />
              <Route
                  path="/productsdetails/*"
                  element={<ProductDetailsPage />}
                />
              <Route
                path="/product/:productCategory"
                element={<ProductList />}
              />
              <Route path="/cart" element={<AddToCartPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<ProtectedRoute />}>
               

                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order" element={<Orderspage />} />
                <Route path="/savedaddress" element={<SavedAddress/>}/>
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/helpcenter" element={<HelpCenterPage />} />
                <Route
                  path="/orderdetails/:orderId"
                  element={<OrderDetailPage />}
                />
              </Route>
            </Route>
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default Router;
