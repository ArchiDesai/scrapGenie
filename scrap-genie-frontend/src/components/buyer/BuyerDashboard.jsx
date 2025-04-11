// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { IoPersonCircleSharp } from "react-icons/io5";
// import { Link } from "react-router-dom";

// const BuyerDashboard = () => {
//   const [userName, setUserName] = useState("");

//   const getUserById = async () => {
//     const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
//     // console.log(res.data);
//     setUserName(res.data.data);
//   };

//   useEffect(() => {
//     getUserById();
//   }, []);

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       {/* Main Dashboard */}
//       <main className="flex-1 p-6 mt-7 min-h-full lg:p-6 overflow-y-auto">
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-2xl lg:text-3xl font-semibold">
//               Welcome, {userName.firstName}&nbsp;{userName.lastName}👋
//             </h1>
//             <p className="text-gray-600">
//               Track your purchases, bids, and saved scrap materials.
//             </p>
//           </div>
//           <div className="pr-10">
//             <button className="text-5xl">
//               <Link to={"/profile"}> <IoPersonCircleSharp /> </Link>
//             </button>
//           </div>
//         </div>

//         {/* Dashboard Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//           <div className="bg-white p-4 lg:p-6 rounded shadow-md">
//             <h3 className="text-lg font-bold text-gray-800">Total Spent</h3>
//             <p className="text-2xl font-semibold text-green-600">$680</p>
//           </div>
//           <div className="bg-white p-4 lg:p-6 rounded shadow-md">
//             <h3 className="text-lg font-bold text-gray-800">Active Bids</h3>
//             <p className="text-2xl font-semibold text-blue-600">2 Bids</p>
//           </div>
//           <div className="bg-white p-4 lg:p-6 rounded shadow-md">
//             <h3 className="text-lg font-bold text-gray-800">Pending Orders</h3>
//             <p className="text-2xl font-semibold text-yellow-600">3 Orders</p>
//           </div>
//         </div>

//         {/* Recent Purchases */}
//         <h2 className="text-xl lg:text-2xl font-semibold mt-6">
//           🛒 My Purchases
//         </h2>
//         <div className="bg-white p-4 mt-4 rounded shadow-md overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2">Item</th>
//                 <th className="p-2">Category</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Status</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td className="p-2">Electronic Waste</td>
//                 <td className="p-2">E-Waste</td>
//                 <td className="p-2">$120</td>
//                 <td className="p-2 text-green-600">Delivered</td>
//                 <td className="p-2">
//                   <button className="text-blue-600 hover:underline">
//                     View Invoice
//                   </button>
//                   <button className="text-yellow-600 hover:underline ml-2">
//                     Track Order
//                   </button>
//                 </td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-2">Metal Sheets</td>
//                 <td className="p-2">Metal</td>
//                 <td className="p-2">$300</td>
//                 <td className="p-2 text-yellow-600">Processing</td>
//                 <td className="p-2">
//                   <button className="text-yellow-600 hover:underline">
//                     Track Order
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Saved Listings */}
//         <h2 className="text-xl lg:text-2xl font-semibold mt-6">
//           ⭐ Saved Listings
//         </h2>
//         <div className="bg-white p-4 mt-4 rounded shadow-md">
//           <div className="flex justify-between">
//             <p className="text-gray-700">Plastic Bottles - $30/kg</p>
//             <button className="text-red-600 hover:underline">Remove</button>
//           </div>
//           <p className="text-gray-500 mt-2">
//             Seller: John Doe | Location: New York
//           </p>
//         </div>

//         {/* Payments & Transactions */}
//         <h2 className="text-xl lg:text-2xl font-semibold mt-6">💰 Payments</h2>
//         <div className="bg-white p-4 mt-4 rounded shadow-md">
//           <p className="text-gray-700">
//             Last Payment:{" "}
//             <span className="text-green-600 font-bold">$300 via UPI</span>
//           </p>
//           <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
//             View Transaction History
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BuyerDashboard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const BuyerDashboard = () => {
  const [userName, setUserName] = useState("");

  const getUserById = async () => {
    const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
    setUserName(res.data.data);
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
              Welcome back,{" "}
              <span className="text-indigo-600">{userName.firstName}</span> 👋
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-indigo-500">
            <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">$680</p>
            <p className="text-xs text-green-500 mt-2">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500">Active Bids</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">2 Bids</p>
            <p className="text-xs text-blue-500 mt-2">1 ending soon</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-amber-500">
            <h3 className="text-sm font-medium text-gray-500">
              Pending Orders
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">3 Orders</p>
            <p className="text-xs text-amber-500 mt-2">1 requires action</p>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                🛒
              </span>
              My Purchases
            </h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      Electronic Waste
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      E-Waste
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                    $120
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Delivered
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Invoice
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Track
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      Metal Sheets
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                      Metal
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                    $300
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-600 hover:text-gray-900">
                      Track
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Saved Listings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-amber-100 text-amber-800 p-2 rounded-lg mr-3">
                ⭐
              </span>
              Saved Listings
            </h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View All
            </button>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h3 className="font-medium text-gray-900">Plastic Bottles</h3>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">$30/kg</span> • Seller: John Doe
                  • New York
                </p>
              </div>
              <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Payments Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-green-100 text-green-800 p-2 rounded-lg mr-3">
                💰
              </span>
              Payments
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-gray-700">
                  Last Payment:{" "}
                  <span className="font-bold text-green-600">$300 via UPI</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Completed on June 12, 2023
                </p>
              </div>
              <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-sm transition-colors">
                Transaction History
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
