import axios from "axios";
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
import { addItem } from "../redux/cart/CartSlice";

const AllProductList = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  // const [isWhishlist, setIsWhishlist] = useState([]);
  const role = localStorage.getItem("role");

  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWhishlist = wishlistItems.map((item) => item._id);

  const getAllProducts = async () => {
    if (role == "Seller" || role == "Buyer") {
      const res = await axios.get("/scrapProduct/all");
      setAllProducts(res.data.data);
    }
  };

  const setProductToCart = async () => {
    const res = await axios.post("/myproduct/add");
    console.log(res.data);
  };

  useEffect(() => {
    getAllProducts();
    setProductToCart();
  }, []);

  const toggleWishlist = (product) => {
    if (isWhishlist.includes(product._id)) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // const toggleWishlist = (id) => {
  //   if (isWhishlist.includes(id)) {
  //     setIsWhishlist(isWhishlist.filter((productId) => productId !== id));
  //   } else {
  //     setIsWhishlist([...isWhishlist, id]);
  //   }
  // };

  const handleAdd = (product) => {
    dispatch(addItem(product));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const { register, watch } = useForm();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center py-12">
          Discover Amazing Products
        </h1>

        {/* Search Bar */}
        {/* <div className="max-w-2xl mx-auto mb-12 relative">
          <input
            type="text"
            placeholder="Search products..."
            {...register("search")}
            className="w-full px-6 py-4 border-0 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 text-gray-700 placeholder-gray-400"
          />
          <IoSearchSharp className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
        </div> */}

        {/* Products Grid */}
        {allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
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

                  <button
                    onClick={() => handleAdd(product)}
                    className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Add to Cart
                  </button>

                  {/* <button
                    onClick={handleAdd}
                    className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Add to Cart
                  </button> */}
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
              We couldn't find any products matching your search. Try different
              keywords or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductList;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   FiArrowLeft,
//   FiChevronDown,
//   FiChevronRight,
//   FiMenu,
//   FiShoppingCart,
//   FiX,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addItem } from "../redux/cart/CartSlice";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../redux/wishlist/WishlistSlice";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// export const AllProductList = () => {
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const role = localStorage.getItem("role");

//   const wishlistItems = useSelector((state) => state.wishlist.items);
//   const isWhishlist = wishlistItems.map((item) => item._id);

//   const colors = {
//     primary: "bg-indigo-600",
//     primaryHover: "hover:bg-indigo-700",
//     secondary: "bg-pink-500",
//     secondaryHover: "hover:bg-pink-600",
//     textPrimary: "text-gray-900",
//     textSecondary: "text-gray-600",
//     cardBg: "bg-white",
//     cardBorder: "border-gray-200",
//   };

//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       if (role == "Seller" || role == "Buyer") {
//         const res = await axios.get("/scrapProduct/all");
//         setAllProducts(res.data.data);
//       }
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("Failed to load products. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   const toggleWishlist = (product) => {
//     if (isWhishlist.includes(product._id)) {
//       dispatch(removeFromWishlist(product._id));
//     } else {
//       dispatch(addToWishlist(product));
//     }
//   };

//   const handleAddToCart = (product) => {
//     dispatch(
//       addItem({
//         id: product._id,
//         name: product.productName,
//         price: product.price,
//         image: product.imageUrl,
//       })
//     );
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 font-sans">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`md:hidden fixed top-6 left-6 z-50 ${
//           colors.primary
//         } text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
//           isOpen ? "rotate-90" : ""
//         }`}
//       >
//         {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//       </button>

//       {/* Sidebar - Simplified for All Products */}
//       <div
//         className={`fixed md:relative top-0 left-0 h-screen w-72 bg-white shadow-xl p-6 space-y-8 overflow-y-auto transition-all duration-300 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         } md:block z-40 border-r border-gray-100`}
//       >
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
//             <span className={`w-2 h-6 ${colors.primary} rounded-full`}></span>
//             All Products
//           </h2>
//         </div>

//         <div className="space-y-4">
//           <h3 className="font-medium text-gray-700">Categories</h3>
//           <ul className="ml-4 space-y-3">
//             {[...new Set(allProducts.map((product) => product.category))].map(
//               (category, index) => (
//                 <li
//                   key={index}
//                   className="text-gray-600 hover:text-indigo-500 cursor-pointer py-1.5 transition-all duration-200 pl-3 border-l-2 border-gray-200 hover:border-indigo-400"
//                 >
//                   {category}
//                 </li>
//               )
//             )}
//           </ul>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col p-6 ml-0 md:ml-72 transition-all duration-300">
//         <div className="w-full max-w-7xl mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             All Products
//           </h1>
//           <p className="text-gray-500 mb-8">
//             Browse our complete product collection
//           </p>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//             </div>
//           ) : error ? (
//             <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center text-red-500">
//               {error}
//             </div>
//           ) : allProducts.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {allProducts.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
//                 >
//                   <div className="relative h-48 w-full bg-gray-100">
//                     <img
//                       src={product.imageUrl}
//                       alt={product.productName}
//                       className="w-full h-full object-contain p-4"
//                     />
//                     <button
//                       onClick={() => toggleWishlist(product)}
//                       className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
//                     >
//                       {isWhishlist.includes(product._id) ? (
//                         <FaHeart className="text-red-500 text-lg" />
//                       ) : (
//                         <FaRegHeart className="text-gray-400 text-lg" />
//                       )}
//                     </button>
//                   </div>
//                   <div className="p-5">
//                     <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
//                       {product.productName}
//                     </h3>
//                     <p className="text-sm text-gray-500 mb-3 line-clamp-2">
//                       {product.description}
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg font-bold text-indigo-600">
//                         {formatPrice(product.price)}
//                       </span>
//                       <span
//                         className={`text-xs px-2 py-1 rounded-full ${
//                           product.status === "Available"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {product.status}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className={`mt-4 w-full ${colors.primary} ${colors.primaryHover} text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2`}
//                     >
//                       <FiShoppingCart size={16} /> Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
//               <p className="text-gray-500">No products available</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProductList;
