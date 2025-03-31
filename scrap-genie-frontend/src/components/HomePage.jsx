import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaListUl } from "react-icons/fa6";
import { MdSell } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import { FaHandshake, FaAward, FaUsers, FaBullseye } from "react-icons/fa";

const HomePage = () => {
  const Card = ({ image, title, description }) => {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          {/* <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
            Learn More
          </button> */}
        </div>
      </div>
    );
  };

  const handleButton = () => {
    if (localStorage.getItem("role") == "Seller") {
      window.location.href = "/seller";
    } else {
      window.location.href = "/buyer";
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
    alert("Message Sent!");
  };

  const cards = [
    {
      id: 1,
      image: "/src/assets/images/service1.jpg",
      title: "Eco-Friendly Recycling",
      description:
        "Join us in making the world a greener place by recycling responsibly.Every recycled item contributes to a cleaner environment and conserves valuable natural resources.",
    },
    {
      id: 2,
      image: "/src/assets/images/service2.jpg",
      title: "Scrap Collection Services",
      description:
        "We collect and process scrap materials efficiently and sustainably, ensuring that waste is transformed into valuable resources. With a focus on eco-friendly practices, we ensure that metals, plastics, electronics, and other recyclables are properly sorted, processed, and reintroduced into the supply chain. ",
    },
    {
      id: 3,
      image: "/src/assets/images/service3.jpg",
      title: "Sustainable Solutions",
      description:
        "Innovative solutions for a more sustainable and waste-free future.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Scrap Selling Online
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
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
              <TbLogin2 />
              Login
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

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center bg-opa bg-green-700">
        <h2 className="text-3xl font-bold text-white">
          Sell & Buy Scrap Materials Easily
        </h2>
        <p className="text-white mt-2">
          Join our marketplace to trade scrap metals, electronics, plastics, and
          more.
        </p>

        <button
          type="submit"
          className="mt-6 bg-white text-green-600 hover:bg-green-900 hover:text-white px-6 py-2 rounded-md font-semibold"
          onClick={handleButton}
        >
          Get Started
        </button>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="relative">
        <img
          src="/src/assets/images/aboutus.jpg"
          alt="Office Team"
          className="w-full h-60 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            About Us
          </h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 text-center mt-6">
        <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          "To be a global leader in sustainable scrap trading by leveraging
          innovation and technology, creating an eco-friendly future where
          businesses and communities thrive through responsible recycling and
          efficient waste management."
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center mt-6">
        <h2 className="text-3xl font-bold text-gray-800">Our Values</h2>
        <p className="mt-4 text-lg text-gray-600">
          Integrity, Excellence, Collaboration, and Customer Focus guide
          everything we do at Scrap Selling Online.
        </p>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-7">
          {/* Integrity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaHandshake className="text-blue-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Integrity</h3>
            <p className="text-gray-600 mt-2">
              We ensure transparency and trust in every transaction, helping
              buyers and sellers trade scrap fairly.
            </p>
          </div>

          {/* Excellence */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaAward className="text-green-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Excellence</h3>
            <p className="text-gray-600 mt-2">
              We strive to provide the best user experience with an easy-to-use
              platform and top-notch support.
            </p>
          </div>

          {/* Collaboration */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaUsers className="text-purple-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Collaboration</h3>
            <p className="text-gray-600 mt-2">
              We work closely with recyclers, businesses, and individuals to
              promote sustainable scrap trading.
            </p>
          </div>

          {/* Customer Focus */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaBullseye className="text-red-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Customer Focus</h3>
            <p className="text-gray-600 mt-2">
              Our goal is to make scrap selling and buying simple, secure, and
              efficient for all users.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}

      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* Section Container */}
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden md:flex">
          {/* Map Section */}
          <div className="md:w-1/2">
            <iframe
              title="Google Map"
              className="w-full h-96 md:h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1697045632946!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Form Section */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Contact Us
            </h2>
            <p className="text-gray-600 text-center mt-2">
              We would love to hear from you!
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Message
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                  })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Message"
                  rows="4"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            {/* <div className="mt-6 text-center text-gray-600">
              <p>
                <strong>Email:</strong> contact@company.com
              </p>
              <p>
                <strong>Phone:</strong> +1 234 567 890
              </p>
              <p>
                <strong>Address:</strong> 123 Main Street, Melbourne, Australia
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold">Scrap Selling Online</h2>
            <p className="mt-2 text-white">
              Connecting sellers, buyers, and recyclers for a greener future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div>
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p className="mt-2 text-white">
              📍 123 Scrap Street, Recycling City
            </p>
            <p className="text-white">📧 contact@scrapsell.com</p>
            <p className="text-white">📞 +1 234 567 890</p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-gray-300 text-2xl">
                🌍
              </a>
              <a href="#" className="text-white hover:text-gray-300 text-2xl">
                📘
              </a>
              <a href="#" className="text-white hover:text-gray-300 text-2xl">
                🐦
              </a>
              <a href="#" className="text-white hover:text-gray-300 text-2xl">
                📸
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-white mt-6 border-t border-gray-300 pt-4">
          &copy; {new Date().getFullYear()} Scrap Selling Online. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
