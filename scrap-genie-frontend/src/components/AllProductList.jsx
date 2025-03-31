import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidCategory } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { MdSell } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const AllProductList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const role = localStorage.getItem("role");

  const getAllProducts = async () => {
    if (role == "Seller" || role == "Buyer") {
      const res = await axios.get("/scrapProduct/all");
      console.log(res.data);
      setAllProducts(res.data.data);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Mock product data
  const { register, watch } = useForm();
  // const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Watch the search input value
  // const searchTerm = watch("search", "");

  // Filter products based on search term

  // const filtered = allProducts.filter((product) =>
  //   product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Scrap Selling Online
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="px-3 py-2 text-gray-700 hover:text-green-600">
            <div className="flex gap-1 items-center">
              <IoIosHome />
              Home
            </div>
          </Link>
          <Link
            to="/allproducts"
            className="px-3 py-2 text-gray-700 hover:text-green-600"
          >
            <div className="flex gap-1 items-center">
              <FaListUl />
              Listings
            </div>
          </Link>
          <Link
            to="/seller/addproduct"
            className="px-3 py-2 text-gray-700 hover:text-green-600"
          >
            <div className="flex gap-1 items-center">
              <MdSell />
              Sell Scrap
            </div>
          </Link>
          <Link
            to="/login"
            className="px-3 py-2 text-gray-700 hover:text-white hover:bg-green-900 rounded-md "
          >
            <div className="flex gap-1 items-center">
              <FaShoppingCart /> Cart
            </div>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-2">
          <Link
            to="/"
            className="block px-4 py-2 text-green-900 hover:bg-green-900 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/allproducts"
            className="block px-4 py-2 text-green-900 hover:bg-green-900 hover:text-white"
          >
            Listings
          </Link>
          <Link
            to="/seller/addproduct"
            className="block px-4 py-2 text-green-900 hover:bg-green-900 hover:text-white"
          >
            Sell Scrap
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 text-green-900 hover:bg-green-900 hover:text-white"
          >
            Login
          </Link>
        </div>
      )}

      <h1 className="text-3xl mt-6 font-bold text-center mb-6">All Products</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8 px-4">
        <input
          type="text"
          placeholder="Search products..."
          {...register("search")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 px-10 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-48 sm:h-56 md:h-64 overflow-hidden mb-4">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-lg md:text-xl font-semibold mb-2 line-clamp-2">
                {product.productName}
              </h2>
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {product.description}
              </p>
              <div className="flex items-center text-gray-600 mb-2">
                <BiSolidCategory className="mr-1" />
                <span className="text-sm">{product.category}</span>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-gray-900 font-bold">{product.status}</p>
                <p className="text-gray-600 font-semibold">₹{product.price}</p>
              </div>
            </div>
            <Link
              to={`/buyer/cart`}
              className="block bg-green-600 text-white text-center py-2 mt-4 rounded hover:bg-green-700 transition-colors"
            >
              Add
            </Link>
          </div>
        ))}
      </div>

      {/* No Products Found Message */}
      {allProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </div>
  );
};

export default AllProductList;
