import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import {
  FaInstagram,
  FaListUl,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import { MdEmail, MdSell } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import { FaHandshake, FaAward, FaUsers, FaBullseye } from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";

const HomePage = () => {
  const Card = ({ image, title, description }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  };


const role = localStorage.getItem("role")

  const handleButton = () => {
    if (role == "Seller") {
      window.location.href = "/seller";
    } else if (role == "Buyer") {
      window.location.href = "/buyer";
    } else {
      window.location.href = "/login";
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
        "Join us in making the world a greener place by recycling responsibly. Every recycled item contributes to a cleaner environment and conserves valuable natural resources.",
    },
    {
      id: 2,
      image: "/src/assets/images/service2.jpg",
      title: "Scrap Collection Services",
      description:
        "We collect and process scrap materials efficiently and sustainably, ensuring that waste is transformed into valuable resources.",
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
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            <Link to={"/"}>ScrapSell</Link>
          </h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-2">
            <Link
              to="/"
              className="px-4 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <IoIosHome className="text-lg" />
              Home
            </Link>
            <Link
              to="/buyer/allproducts"
              className="px-4 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <FaListUl />
              Listings
            </Link>
            <Link
              to="/seller/addproduct"
              className="px-4 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <MdSell />
              Sell Scrap
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <TbLogin2 />
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-600"
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            <Link
              to="/"
              className="px-4 py-3 text-gray-700 hover:bg-green-50 rounded-lg transition-colors border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/buyer/allproducts"
              className="px-4 py-3 text-gray-700 hover:bg-green-50 rounded-lg transition-colors border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Listings
            </Link>
            <Link
              to="/seller/addproduct"
              className="px-4 py-3 text-gray-700 hover:bg-green-50 rounded-lg transition-colors border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Sell Scrap
            </Link>
            <Link
              to="/login"
              className="px-4 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors mt-2 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/images/hero-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Revolutionizing Scrap Trading <br className="hidden md:block" />
            for a Sustainable Future
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Join our marketplace to trade scrap metals, electronics, plastics,
            and more with ease and confidence.
          </p>
          <button
            onClick={handleButton}
            className="px-8 py-3 bg-white text-green-800 font-semibold rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Card
              key={card.id}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden shadow-lg mb-12">
            <div className="relative h-52 md:h-64">
              <img
                src="/src/assets/images/aboutus.jpg"
                alt="Office Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                  About Our Mission
                </h1>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              "To be a global leader in sustainable scrap trading by leveraging
              innovation and technology, creating an eco-friendly future where
              businesses and communities thrive through responsible recycling
              and efficient waste management."
            </p>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Integrity, Excellence, Collaboration, and Customer Focus guide
              everything we do at Scrap Selling Online.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Integrity */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-green-200">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Integrity
              </h3>
              <p className="text-gray-600 text-center">
                We ensure transparency and trust in every transaction, helping
                buyers and sellers trade scrap fairly.
              </p>
            </div>

            {/* Excellence */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-green-200">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-green-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Excellence
              </h3>
              <p className="text-gray-600 text-center">
                We strive to provide the best user experience with an
                easy-to-use platform and top-notch support.
              </p>
            </div>

            {/* Collaboration */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-green-200">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-purple-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Collaboration
              </h3>
              <p className="text-gray-600 text-center">
                We work closely with recyclers, businesses, and individuals to
                promote sustainable scrap trading.
              </p>
            </div>

            {/* Customer Focus */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-green-200">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBullseye className="text-red-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Customer Focus
              </h3>
              <p className="text-gray-600 text-center">
                Our goal is to make scrap selling and buying simple, secure, and
                efficient for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600">We'd love to hear from you!</p>
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Map Section */}
              <div className="md:w-1/2 h-96 md:h-auto">
                <iframe
                  title="Google Map"
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1697045632946!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              {/* Contact Form Section */}
              <div className="md:w-1/2 p-8 md:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your Message"
                      rows="4"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                ScrapSell
              </h3>
              <p className="text-gray-400">
                Connecting sellers, buyers, and recyclers for a greener future.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/buyer/allproducts"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Listings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/seller/addproduct"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sell Scrap
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="not-italic text-gray-400 space-y-2">
                <div className="flex items-center gap-1">
                  <FaLocationDot className="text-gray-200" /> 123 Scrap Street,
                  Recycling City
                </div>
                <div className="flex items-center gap-1">
                  <MdEmail className="text-gray-200" /> contact@scrapsell.com
                </div>
                <div className="flex items-center gap-1">
                  <IoCall className="text-gray-200" /> +1 234 567 890
                </div>
              </address>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <RiFacebookFill className="text-xl" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} ScrapSell. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
