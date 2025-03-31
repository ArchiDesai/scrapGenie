import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  // const [messages, setMessages] = useState([]);
  // const [selectedChat, setSelectedChat] = useState(null);

  const getUserByUserId = async () => {
    const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
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
  };

  const calculateTotalSales = () => {
    return products
      .filter((product) => product.status === "Sold") // Filter sold products
      .reduce((total, product) => total + product.price, 0); // Sum their prices
  };

  // Calculate active listings
  const activeListings = () => {
    return products.filter((product) => product.status === "Active").length; // Count active products
  };

  // Calculate pending orders
  const pendingOrders = () => {
    return products.filter((product) => product.status === "Pending").length; // Count pending products
  };

  // const getAllMessages = async () => {
  //   const res = await axios.get(
  //     "/communication/getallmessagesbyuserid/" + localStorage.getItem("id")
  //   );
  //   console.log(res.data);
  //   setMessages(res.data.data);
  // };

  // const handleViewChat = (buyerId) => {
  //   setSelectedChat(buyerId);
  // };

  useEffect(() => {
    getUserByUserId();
    getAllMyProducts();
    // getAllMessages();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Main Dashboard */}
      <main className="flex-1 p-6 mt-7 min-h-full overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Welcome, {userName.firstName}&nbsp;
          {userName.lastName}👋
        </h1>
        <p className="text-gray-600">
          Here is an overview of your scrap sales and activities.
        </p>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 md:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Total Sales</h3>
            <p className="text-xl md:text-2xl font-semibold text-green-600">
              ${calculateTotalSales()}
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Active Listings</h3>
            <p className="text-xl md:text-2xl font-semibold text-blue-600">
              {activeListings()}{" "}
            </p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Pending Orders</h3>
            <p className="text-xl md:text-2xl font-semibold text-yellow-600">
              {pendingOrders()}
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
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => {
                return (
                  <tr key={product._id} className="border-b">
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">{product.price}</td>
                    <td className="p-2 text-green-600">{product.status}</td>
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

        {/* Recent Messages */}
        {/* <h2 className="text-xl md:text-2xl font-semibold mt-6">📩 Messages</h2>
  <div className="bg-white p-4 mt-4 rounded shadow-md">
    {Array.isArray(messages) &&
      messages?.map((msg) => (
        <div key={msg._id} className="flex justify-between">
          <p className="text-gray-700">
            Buyer: <span className="font-bold">{msg.buyerName}</span>
          </p>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => handleViewChat(msg.buyerId)}
          >
            View Chat
          </button>
        </div>
      ))}
  </div> */}

        {/* {selectedChat && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 md:p-6 rounded-lg w-full md:w-1/3 mx-4">
        <h3 className="text-lg md:text-xl font-bold">Chat with Buyer</h3>
        <p>Chat content for buyer ID: {selectedChat}</p>
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => setSelectedChat(null)}
        >
          Close
        </button>
      </div>
    </div>
  )} */}
      </main>
    </div>
  );
};

export default SellerDashboard;
