import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/common/Signup";
import axios from "axios";
import Login from "./components/common/Login";
import SellerDashboard from "./components/seller/SellerDashboard";
import HomePage from "./components/HomePage";
import ScrapProductList from "./components/seller/ScrapProductList";
import Profile from "./components/Profile";
import Payment from "./components/Payment";
import AddScrapProduct from "./components/seller/AddScrapProduct";
import SellerDashboardLayout from "./layouts/SellerDashboardLayout";
import PrivateRoute from "./hooks/PrivateRoute";
import UpdateProduct from "./components/seller/UpdateProduct";
import AllProductList from "./components/AllProductList";
import BuyerDashboardLayout from "./layouts/BuyerDashboardLayout";
import AddCart from "./components/buyer/Cart";
import ForgotPassword from "./components/common/ForgotPassword";
import CreateNewPassword from "./components/common/CreateNewPassword";
import Wishlist from "./components/buyer/Wishlist";
import MyPurchase from "./components/buyer/MyPurchase";

const App = () => {
  axios.defaults.baseURL = "http://localhost:3000";
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route
          path="/createnewpassword/:token"
          element={<CreateNewPassword />}
        />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/seller" element={<SellerDashboardLayout />}>
            <Route index element={<SellerDashboard />} />
            <Route path="addproduct" element={<AddScrapProduct />} />
            <Route path="scrapproductlist" element={<ScrapProductList />} />
            <Route path="updateproduct/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="/buyer" element={<BuyerDashboardLayout />}>
            <Route index element={<AllProductList />} />
            <Route path="cart" element={<AddCart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="mypurchase" element={<MyPurchase />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
