import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const SellerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);

  const getUserById = async () => {
    const res = await axios.get("/getusersbyid/" + localStorage.getItem("id"));
    console.log(res.data.data);
    setUser(res.data.data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/");
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
            Seller Dashboard
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
            to="/seller"
            className="flex items-center py-3 px-4 rounded-lg text-gray-100 hover:bg-gradient-to-r from-green-50 to-green-100 hover:text-green-600 transition-all group"
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-3 group-hover:scale-110 transition-transform">
              📊
            </span>
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            to="addproduct"
            className="flex items-center py-3 px-4 rounded-lg text-gray-100 hover:bg-gradient-to-r from-green-50 to-green-100 hover:text-green-600 transition-all group"
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-3 group-hover:scale-110 transition-transform">
              ➕
            </span>
            <span className="font-medium">Add Product</span>
          </Link>
          <Link
            to="scrapproductlist"
            className="flex items-center py-3 px-4 rounded-lg text-gray-100 hover:bg-gradient-to-r from-green-50 to-green-100 hover:text-green-600 transition-all group"
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-3 group-hover:scale-110 transition-transform">
              📦
            </span>
            <span className="font-medium">Scrap Listing</span>
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

export default SellerSidebar;
