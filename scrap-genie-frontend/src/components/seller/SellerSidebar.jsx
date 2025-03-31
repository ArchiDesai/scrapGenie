import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const SellerSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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
          className="md:hidden lg:hidden text-gray-700 fixed top-4 left-4 z-50"
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={30} />
        </button>
      )}
      <aside
        className={` w-64 min-h-screen p-4 border-r fixed top-0 left-0 h-full transition-transform transform lg:block bg-white space-y-6 py-7 px-2 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="p-4 text-center flex mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Seller Dashboard</h2>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="mt-6">
          <Link
            to="/seller"
            className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            📊 Dashboard
          </Link>
          <Link
            to="addproduct"
            className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            ➕ Add Product
          </Link>
          <Link
            to="scrapproductlist"
            className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            📦Scrap Listing
          </Link>
          {/* <Link
            to="/message"
            className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white"
          >
            📩 Messages
          </Link> */}
          <Link
            to="/"
            className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white"
          >
            🏠Home
          </Link>
          {/* <Link
          to="/"
          className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white"
        >
          <div className="flex items-center" onClick={handleLogout}>
            <TbLogout2 className="text-blue-900 text-xl" />
            Logout
          </div>
        </Link> */}

          <div
            onClick={handleLogout} // Attach the logout function
            className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white cursor-pointer"
          >
            <div className="flex items-center">
              <TbLogout2 className="text-blue-900 text-xl" />
              Logout
            </div>
          </div>

          {/* <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white">💰 Payments</a> */}
          {/* <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white">🚛 Logistics</a> */}
          {/* <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-green-600 hover:text-white">⚙️ Settings</a> */}
        </nav>
      </aside>
    </>
  );
};

export default SellerSidebar;
