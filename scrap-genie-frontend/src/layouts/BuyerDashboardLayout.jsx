import React from "react";
import BuyerSidebar from "../components/buyer/BuyerSidebar";
import { Outlet } from "react-router-dom";

const BuyerDashboardLayout = () => {
  return (
    <div className="flex">
      <div className="fixed">
        <BuyerSidebar />
      </div>
      <div className="flex-1 sm:ml-0 md:ml-64 lg:ml-64 xl:ml-64 2xl:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerDashboardLayout;
