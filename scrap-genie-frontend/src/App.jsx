import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/common/Signup";
import axios from "axios";
import Login from "./components/common/Login";
import SellerDashboard from "./components/seller/SellerDashboard";
import BuyerDashboard from "./components/buyer/BuyerDashboard";
import HomePage from "./components/HomePage";
import ScrapProductList from "./components/seller/ScrapProductList";
import Profile from "./components/Profile";
import Message from "./components/Message";
import Payment from "./components/Payment";
import Review from "./components/Review";
import AddScrapProduct from "./components/seller/AddScrapProduct";
import SellerDashboardLayout from "./layouts/SellerDashboardLayout";
import PrivateRoute from "./hooks/PrivateRoute";
import UpdateProduct from "./components/seller/UpdateProduct";
import AllProductList from "./components/AllProductList";
import Loader from "./components/common/Loader";
import BuyerDashboardLayout from "./layouts/BuyerDashboardLayout";
import AddCart from "./components/buyer/AddCart";
import ForgotPassword from "./components/common/ForgotPassword";
import CreateNewPassword from "./components/common/CreateNewPassword";
// import SavedProduct from "./components/buyer/SavedProduct";
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
        {/* <Route path="/loader" element={<Loader />} /> */}
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
            <Route index element={<BuyerDashboard />} />
            <Route path="cart" element={<AddCart />} />
            <Route path="allproducts" element={<AllProductList />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="mypurchase" element={<MyPurchase />} />
            {/* <Route path="savedproducts" element={<SavedProduct />} /> */}
          </Route>
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/message" element={<Message />} /> */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/review" element={<Review />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
