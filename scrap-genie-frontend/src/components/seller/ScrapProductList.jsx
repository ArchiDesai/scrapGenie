import axios from "axios";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { BiSolidCategory } from "react-icons/bi";
import { Link } from "react-router-dom";

const ScrapProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const getAllMyProducts = async () => {
    const res = await axios.get(
      "/scrapProduct/getallscrapproductbyuserid/" + localStorage.getItem("id")
    );
    setProducts(res.data.data);
  };

  const deleteProductById = async (id) => {
    const res = await axios.delete("/scrapProduct/deleteproductbyid/" + id);
    setProducts(
      products.filter((product) => {
        product._id !== id;
      })
    );
  };

  // const applyFilter = () => {
  //   let filtered = products;

  //   if (category !== "All Categories") {
  //     filtered = filtered.filter((product) => product.category === category);
  //   }
  //   if (location) {
  //     filtered = filtered.filter((product) =>
  //       product.location.toLowerCase().includes(location.toLowerCase())
  //     );
  //   }
  //   if (price) {
  //     const [minPrice, maxPrice] = price.split("-").map(Number);
  //     filtered = filtered.filter(
  //       (product) => product.price >= minPrice && product.price <= maxPrice
  //     );
  //   }
  //   setProducts(filtered);
  // };

  useEffect(() => {
    getAllMyProducts();
  }, [deleteProductById]);

  // useEffect(() => {
  //   applyFilter();
  // }, [category, location, price]);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Available Scrap Listings
        </h2>

        {/* <!-- Filters --> */}
        {/* <div className="flex flex-wrap justify-center gap-4 mt-4">
          <select
            className="border p-2 rounded w-full sm:w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Metal</option>
            <option>Plastic</option>
            <option>Paper</option>
            <option>E-Waste</option>
            <option>Vehicle Parts</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded w-full sm:w-auto"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price Range"
            className="border p-2 rounded w-full sm:w-auto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products?.map((product) => {
            return (
              <div
                key={product._id}
                className="bg-white shadow-md p-4 rounded-lg"
              >
                <img
                  src={product.imageUrl}
                  alt="Scrap Item"
                  className="rounded w-full h-72 object-contain"
                />
                <h3 className="text-lg font-semibold mt-2">
                  {product.productName}
                </h3>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-600">
                  <strong> ₹ : {product.price}</strong>
                </p>
                <div className="flex items-center">
                  <BiSolidCategory /> &nbsp;
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <p className="text-gray-900 font-bold">{product.status}</p>
                <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700 transition">
                  <Link to={`/seller/updateproduct/${product._id}`}>
                    Update
                  </Link>
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 mt-2 ml-5 rounded hover:bg-red-700 transition"
                  onClick={() => deleteProductById(product._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrapProductList;
