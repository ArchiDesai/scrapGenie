import axios from "axios";
import React, { useEffect, useState } from "react";

const BuyerDashboard = () => {
  const [userName, setUserName] = useState("");

  const getUserById = async () => {
    const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
    console.log(res.data);
    setUserName(res.data.data);
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Main Dashboard */}
      <main className="flex-1 p-6 mt-7 min-h-full lg:p-6 overflow-y-auto">
        <h1 className="text-2xl lg:text-3xl font-semibold">
         Welcome, {userName.firstName}&nbsp;{userName.lastName}👋
        </h1>
        <p className="text-gray-600">
          Track your purchases, bids, and saved scrap materials.
        </p>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 lg:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Total Spent</h3>
            <p className="text-2xl font-semibold text-green-600">$680</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Active Bids</h3>
            <p className="text-2xl font-semibold text-blue-600">2 Bids</p>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Pending Orders</h3>
            <p className="text-2xl font-semibold text-yellow-600">3 Orders</p>
          </div>
        </div>

        {/* Recent Purchases */}
        <h2 className="text-xl lg:text-2xl font-semibold mt-6">
          🛒 My Purchases
        </h2>
        <div className="bg-white p-4 mt-4 rounded shadow-md overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Item</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Electronic Waste</td>
                <td className="p-2">E-Waste</td>
                <td className="p-2">$120</td>
                <td className="p-2 text-green-600">Delivered</td>
                <td className="p-2">
                  <button className="text-blue-600 hover:underline">
                    View Invoice
                  </button>
                  <button className="text-yellow-600 hover:underline ml-2">
                    Track Order
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Metal Sheets</td>
                <td className="p-2">Metal</td>
                <td className="p-2">$300</td>
                <td className="p-2 text-yellow-600">Processing</td>
                <td className="p-2">
                  <button className="text-yellow-600 hover:underline">
                    Track Order
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Saved Listings */}
        <h2 className="text-xl lg:text-2xl font-semibold mt-6">
          ⭐ Saved Listings
        </h2>
        <div className="bg-white p-4 mt-4 rounded shadow-md">
          <div className="flex justify-between">
            <p className="text-gray-700">Plastic Bottles - $30/kg</p>
            <button className="text-red-600 hover:underline">Remove</button>
          </div>
          <p className="text-gray-500 mt-2">
            Seller: John Doe | Location: New York
          </p>
        </div>

        {/* Messages */}
        <h2 className="text-xl lg:text-2xl font-semibold mt-6">💬 Messages</h2>
        <div className="bg-white p-4 mt-4 rounded shadow-md">
          <div className="flex justify-between">
            <p className="text-gray-700">
              Seller: <span className="font-bold">John Doe</span>
            </p>
            <button className="text-blue-600 hover:underline">View Chat</button>
          </div>
          <p className="text-gray-500 mt-2">
            "I can offer a discount for bulk purchase. Let me know!"
          </p>
        </div>

        {/* Payments & Transactions */}
        <h2 className="text-xl lg:text-2xl font-semibold mt-6">💰 Payments</h2>
        <div className="bg-white p-4 mt-4 rounded shadow-md">
          <p className="text-gray-700">
            Last Payment:{" "}
            <span className="text-green-600 font-bold">$300 via UPI</span>
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
            View Transaction History
          </button>
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
