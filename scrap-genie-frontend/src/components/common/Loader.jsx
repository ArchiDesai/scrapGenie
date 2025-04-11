import React from "react";
// import "../../assets/loader.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
    </div>
  );

  // <div className="loader bg-gray-100"></div>;
};

export default Loader;
