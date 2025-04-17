import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { Si4Chan } from "react-icons/si";
import { BsBoxSeamFill, BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";

const BuyerSidebar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  // const wishlist = useSelector((state) => state.wishlist);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);

  const getUserById = async () => {
    const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
    setUser(res.data.data);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const naviagte = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    naviagte("/");
  };

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden lg:hidden text-gray-700 fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={24} className="text-gray-600" />
        </button>
      )}
      <aside
        className={`w-64 bg-gray-700 min-h-screen p-4 fixed top-0 left-0 h-full transition-all duration-300 ease-in-out lg:block space-y-6 py-7 px-2 shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 z-40`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gray-300 bg-clip-text text-transparent">
            Buyer Dashboard
          </h2>
          <button
            className="md:hidden text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          <Link
            to="/buyer"
            className="flex items-center py-3 px-4 rounded-lg text-gray-100 hover:bg-gradient-to-r from-green-50 to-green-100 hover:text-green-600 transition-all group"
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-3 group-hover:scale-110 transition-transform">
              <Si4Chan className="text-pink-400" />
            </span>
            <span className="font-medium">All Products</span>
          </Link>
          <Link
            to="cart"
            className="flex items-center py-3 px-4 rounded-lg text-gray-100 hover:bg-gradient-to-r from-green-50 to-green-100 hover:text-green-600 transition-all group"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <div className="flex flex-col">
                {/* {cartTotalQuantity > 0 && ( */}
                <span className=" bg-green-700 rounded-full flex ml-1 h-4 w-4 justify-center items-center text-green-100 font-bold text-xs">
                  {totalQuantity}
                </span>
                {/* )} */}

                <span className="mr-3 group-hover:scale-110 text-xl transition-transform">
                  <BsCart4 />
                </span>
              </div>

              <span className="font-medium">Cart</span>
            </div>
          </Link>
          <Link
            to="wishlist"
            className="flex items-center py-3 px-4 rounded-lg text-gray-100 hover:bg-gradient-to-r from-green-50 to-green-100 hover:text-green-600 transition-all group"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="mr-3 group-hover:scale-110 text-xl transition-transform">
                  <FaHeart className="text-red-600" />
                </span>
              </div>

              <span className="font-medium">Wishlist</span>
            </div>
          </Link>

          <Link
            to="mypurchase"
            className="flex items-center py-3 px-4 rounded-lg text-gray-100 hover:bg-gradient-to-r from-green-50 to-green-100 hover:text-green-600 transition-all group"
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-3 group-hover:scale-110 transition-transform">
              <BsBoxSeamFill className="text-orange-400" />
            </span>
            <span className="font-medium">My Purchases</span>
          </Link>

          <div
            onClick={handleLogout}
            className="flex items-center py-3 px-4 rounded-lg text-gray-100 hover:bg-gradient-to-r from-red-50 to-red-100 hover:text-red-500 transition-all group cursor-pointer"
          >
            <TbLogout2 className="mr-3 text-lg group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </div>
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="flex items-center pl-3">
            <Link to={"/profile"}>
              <div className="h-10 w-10 rounded-full bg-green-300 flex items-center justify-center text-green-900 font-medium">
                {user.firstName?.slice(0, 1)}
                {user.lastName?.slice(0, 1)}
              </div>
            </Link>
            <div className="ml-3">
              <Link to={"/profile"}>
                <p className="text-sm font-medium text-gray-100">
                  {user.firstName}&nbsp;{user.lastName}
                </p>
              </Link>
              {/* <span className="text-xs text-gray-500">{user.roleId}</span> */}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BuyerSidebar;

// import React, { useState } from "react";
// import { FaHeart, FaTimes } from "react-icons/fa";
// import { FaBars } from "react-icons/fa6";
// import { TbLogout2 } from "react-icons/tb";
// import { Link, useNavigate } from "react-router-dom";
// import { Si4Chan } from "react-icons/si";
// import { BsBoxSeam, BsCart3 } from "react-icons/bs";
// import { useSelector } from "react-redux";

// const BuyerSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState("dashboard");
//   const navigate = useNavigate();

//   // const state = useSelector((state) => state);
//   // console.log("state", state.cart.cart);

//   const handleLogout = () => {
//     localStorage.removeItem("id");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   // const handleLinkClick = (link) => {
//   //   setActiveLink(link);
//   //   setIsOpen(false);
//   // };

//   return (
//     <>
//       {!isOpen && (
//         <button
//           className="md:hidden lg:hidden fixed top-6 left-6 z-50 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all"
//           onClick={() => setIsOpen(true)}
//         >
//           <FaBars size={24} className="text-gray-700" />
//         </button>
//       )}

//       <aside
//         className={`w-72 min-h-screen fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-40 bg-gradient-to-b from-white to-gray-50 shadow-xl ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:translate-x-0`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="p-6 flex justify-between items-center border-b border-gray-200">
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//               Buyer Dashboard
//             </h2>
//             <button
//               className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
//               onClick={() => setIsOpen(false)}
//             >
//               <FaTimes size={20} className="text-gray-500" />
//             </button>
//           </div>

//           <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//             <Link
//               to="/buyer"
//               className={`flex items-center p-3 rounded-xl transition-all ${
//                 activeLink === "dashboard"
//                   ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//               onClick={() => handleLinkClick("dashboard")}
//             >
//               <span className="mr-3">📊</span>
//               Dashboard
//             </Link>

//             <Link
//               to="/buyer/allproducts"
//               className={`flex items-center p-3 rounded-xl transition-all ${
//                 activeLink === "products"
//                   ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//               // onClick={() => handleLinkClick("products")}
//             >
//               <Si4Chan className="text-pink-600 mr-3" size={20} />
//               All Products
//             </Link>

//             <Link
//               to="/buyer/cart"
//               className={`flex items-center p-3 rounded-xl transition-all ${
//                 activeLink === "cart"
//                   ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//               // onClick={() => handleLinkClick("cart")}
//             >
//               <BsCart3 className="mr-3" size={20} />
//               Cart
//             </Link>

//             <Link
//               to="/buyer"
//               className={`flex items-center p-3 rounded-xl transition-all ${
//                 activeLink === "wishlist"
//                   ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//               // onClick={() => handleLinkClick("wishlist")}
//             >
//               <FaHeart className="text-red-500 mr-3" size={20} />
//               Wishlist
//             </Link>

//             <Link
//               to="/buyer/purchases"
//               className={`flex items-center p-3 rounded-xl transition-all ${
//                 activeLink === "purchases"
//                   ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//               // onClick={() => handleLinkClick("purchases")}
//             >
//               <BsBoxSeam className="mr-3" size={20} />
//               My Purchases
//             </Link>
//           </nav>

//           <div className="p-4 border-t border-gray-200">
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center justify-center p-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
//             >
//               <TbLogout2 className="mr-3 text-red-500" size={20} />
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default BuyerSidebar;
