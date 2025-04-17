import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";

const SellerDashboard = () => {
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);

  const getUserByUserId = async () => {
    const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
    // console.log(res.data.data);

    setUserName(res.data.data);
  };

  const getAllMyProducts = async () => {
    const res = await axios.get(
      "/scrapProduct/getallscrapproductbyuserid/" + localStorage.getItem("id")
    );
    setProducts(res.data.data);
  };

  const deleteProductById = async (id) => {
    const res = await axios.delete(`/scrapProduct/deleteproductbyid/${id}`);

    setProducts(
      products.filter((product) => {
        product._id !== id;
      })
    );
    getAllMyProducts();
  };

  const calculateTotalSales = () => {
    return products
      .filter((product) => product.status === "Sold") // Filter sold products
      .reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0); // Sum their prices
  };

  // Calculate active listings
  const activeListings = () => {
    return products.filter((product) => product.status === "Available").length; // Count active products
  };

  // Calculate pending orders
  const soldProducts = () => {
    return products.filter((product) => product.status === "Sold").length; // Count pending products
  };

  useEffect(() => {
    getUserByUserId();
    getAllMyProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Main Dashboard */}
      <main className="flex-1 p-6 mt-7 min-h-full overflow-y-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Welcome, {userName.firstName}&nbsp;
              {userName.lastName}👋
            </h1>
            <p className="text-gray-600">
              Here is an overview of your scrap sales and activities.
            </p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-purple-100 p-4 md:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Total Sales</h3>
            <p className="text-xl md:text-2xl font-semibold text-purple-800">
              ${calculateTotalSales()}
            </p>
          </div>
          <div className="bg-green-100 p-4 md:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Active Listings</h3>
            <p className="text-xl md:text-2xl font-semibold text-green-800">
              {activeListings()}
            </p>
          </div>
          <div className="bg-red-100 p-4 md:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Solded Products</h3>
            <p className="text-xl md:text-2xl font-semibold text-red-800">
              {soldProducts()}
            </p>
          </div>
        </div>

        {/* Recent Scrap Listings */}
        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          📦 My Scrap Listings
        </h2>
        <div className="bg-white p-4 mt-4 rounded shadow-md overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Item</th>
                <th className="p-2">Category</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...products]
                .sort((a, b) => {
                  const statusOrder = { Available: 1, Sold: 2 };
                  return statusOrder[a.status] - statusOrder[b.status];
                })
                ?.map((product) => {
                  return (
                    <tr key={product._id} className="border-b ">
                      <td className="p-2">{product.productName}</td>
                      <td className="p-2">{product.category}</td>
                      <td className="p-2">{product.quantity}</td>
                      <td className="p-2">{product.price}</td>
                      <td
                        className={`p-2 ${
                          product.status == "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.status}
                      </td>
                      <td className="p-2">
                        <button className="bg-green-600 text-white px-2 md:px-4 py-1 md:py-2 mt-2 rounded hover:bg-green-700 transition">
                          <Link to={`/seller/updateproduct/${product._id}`}>
                            Edit
                          </Link>
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 md:px-4 py-1 md:py-2 mt-2 ml-2 rounded hover:bg-red-700 transition"
                          onClick={() => deleteProductById(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
