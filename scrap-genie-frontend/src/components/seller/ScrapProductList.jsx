import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidCategory, BiTrash, BiEdit, BiMap } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";

const ScrapProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllMyProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "/scrapProduct/getallscrapproductbyuserid/" + localStorage.getItem("id")
      );
      setProducts(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProductById = async (id) => {
    try {
      await axios.delete("/scrapProduct/deleteproductbyid/" + id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    getAllMyProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Scrap Listings
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Manage your posted scrap items
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-sm inline-block">
              <h3 className="text-lg font-medium text-gray-900">
                No scrap listings found
              </h3>
              <p className="mt-2 text-gray-600">
                You haven't posted any scrap items yet.
              </p>
              <Link
                to="/seller/addproduct"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add New Scrap Item
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-4">
                  <div className="flex items-center justify-center bg-gray-100 rounded-lg h-64">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {product.productName}
                      </h3>
                      <div>
                        <span className="text-lg font-bold text-green-600">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <strong>Qty :</strong>&nbsp;{product.quantity}
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <BiSolidCategory className="flex-shrink-0 mr-1 text-black" />
                      <span>{product.category}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <BiMap className="flex-shrink-0 mr-1 text-black" />
                      <span>
                        {product.stateId.name || "Location not specified"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-evenly">
                  <Link
                    to={`/seller/updateproduct/${product._id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <BiEdit className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProductById(product._id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <BiTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrapProductList;
