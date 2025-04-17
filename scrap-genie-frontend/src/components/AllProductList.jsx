import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidCategory } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/WishlistSlice";
import Loader from "./common/Loader";
import { productsFetch } from "../redux/products/ProductsSlice";
import { addItem } from "../redux/cart/CartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllProductList = () => {
  const [userName, setUserName] = useState("");

  const getUserById = async () => {
    const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
    setUserName(res.data.data);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const dispatch = useDispatch();
  const { items: allProducts, status } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length > 0) {
      setFilteredProducts(allProducts);
    }
  }, [allProducts]);

  const isLoading = status === "pending";
  const error = status === "rejected";

  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist);
  const isWhishlist = wishlist.wishlistItems.map((item) => item._id);

  const toggleWishlist = (product) => {
    if (isWhishlist.includes(product._id)) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    navigate("/buyer/cart");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const { register, watch } = useForm();
  const searchTerm = watch("search", "").toLowerCase();

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {isLoading == true ? (
        <Loader />
      ) : error ? (
        <p>An Error Occured</p>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        
        <div className="flex">
          <h1 className="text-3xl mt-8 lg:mt-4 lg:text-4xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-green-600">
              {userName.firstName}&nbsp;{userName.lastName}
            </span>{" "}
            👋
          </h1>
          {/* Search Bar */}
          <div className="max-w-2xl ml-96 mt-2 mx-auto relative">
            <input
              type="text"
              placeholder="Search products..."
              {...register("search")}
              className="w-full px-6 py-4 border-0 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 text-gray-700 placeholder-gray-400"
            />
            <IoSearchSharp className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
          <h1 className="text-3xl font-bold text-gray-600 text-center py-6">
            Discover Amazing Products
          </h1>

          

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  {product.status == "Available" ? (
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-2 right-3 z-10 p-2 bg-violet-100 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {isWhishlist.includes(product._id) ? (
                        <FaHeart className="text-red-600 text-xl" />
                      ) : (
                        <FaRegHeart className="text-gray-600 text-xl" />
                      )}
                    </button>
                  ) : (
                    ""
                  )}

                  <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.productName}
                      </h2>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <BiSolidCategory className="mr-2" />
                      <span className="text-sm">{product.category}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide ${
                          product.status == "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {product.status == "Available" ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-4 w-full bg-gradient-to-r flex cursor-not-allowed justify-center from-gray-300 to-gray-400 text-black font-medium py-3 px-4 rounded-lg shadow-md">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block p-2 bg-gray-100 rounded-full">
                <HiOutlineEmojiSad className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any products matching your search. Try
                different keywords or check back later.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProductList;
