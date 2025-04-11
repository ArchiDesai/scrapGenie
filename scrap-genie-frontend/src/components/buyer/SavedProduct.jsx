// import { useEffect, useState } from "react";
// import {
//   FaHeart,
//   FaShoppingCart,
//   FaTimes,
//   FaStar,
//   FaRegStar,
// } from "react-icons/fa";
// import { BsBank2, BsCreditCard } from "react-icons/bs";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const Wishlist = () => {
//   // const id = useParams().id;

//   const [wishlistItems, setWishlistItems] = useState([
//     {
//       id: 1,
//       name: "boAt Rockerz 450 Bluetooth Headphone with Mic (Carbon Black)",
//       price: 1499,
//       originalPrice: 2990,
//       discount: 50,
//       rating: 4.2,
//       reviews: 12453,
//       image: "https://m.media-amazon.com/images/I/51xxA+6E+xL._SL1500_.jpg",
//       inStock: true,
//       deliveryDate: "Get it by tomorrow",
//       offers: ["Bank Offer", "No Cost EMI"],
//     },
//     {
//       id: 2,
//       name: "Fire-Boltt Ninja 3 Smartwatch with 60 Sports Modes, SpO2 Monitoring",
//       price: 1999,
//       originalPrice: 7999,
//       discount: 75,
//       rating: 3.9,
//       reviews: 8921,
//       image: "https://m.media-amazon.com/images/I/61m9Z5yQxJL._SL1500_.jpg",
//       inStock: true,
//       deliveryDate: "Get it by Wednesday",
//       offers: ["Special Price", "Extra ₹200 off"],
//     },
//     {
//       id: 3,
//       name: "Samsung Galaxy M33 5G (Emerald Brown, 6GB, 128GB Storage)",
//       price: 18999,
//       originalPrice: 22999,
//       discount: 17,
//       rating: 4.1,
//       reviews: 24567,
//       image: "https://m.media-amazon.com/images/I/81I3w4J6yjL._SL1500_.jpg",
//       inStock: false,
//       deliveryDate: "Currently unavailable",
//       offers: [],
//     },
//   ]);

//   // const getAllProductById = async () => {
//   //   const res = await axios.get("/scrapProduct/getproductbyid/" + id);
//   //   console.log(res.data);
    
//   // };

//   // useEffect(() => {
//   //   getAllProductById
//   // }, [])
  

//   const removeFromWishlist = (id) => {
//     setWishlistItems(wishlistItems.filter((item) => item.id !== id));
//   };

//   const moveToCart = (id) => {
//     // In a real app, you would dispatch an action to add to cart
//     console.log(`Moving item ${id} to cart`);
//     removeFromWishlist(id);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">
//         My Wishlist ({wishlistItems.length})
//       </h1>

//       {wishlistItems.length === 0 ? (
//         <div className="text-center py-12 border rounded-lg">
//           <FaHeart className="mx-auto text-4xl text-gray-400 mb-4" />
//           <h3 className="text-xl font-medium text-gray-800">
//             Your wishlist is empty
//           </h3>
//           <p className="text-gray-600 mb-6">
//             Add items to your wishlist to save them for later
//           </p>
//           <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded">
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-sm">
//           {wishlistItems.map((item) => (
//             <div key={item.id} className="border-b last:border-b-0">
//               <div className="flex flex-col sm:flex-row p-4 hover:bg-gray-50">
//                 <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
//                   <img
//                     src={item.image}
//                     alt={item.productName}
//                     className="w-32 h-32 object-contain"
//                   />
//                 </div>

//                 <div className="flex-grow">
//                   <div className="flex justify-between">
//                     <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
//                       {item.productName}
//                     </h3>
//                     <button
//                       onClick={() => removeFromWishlist(item.id)}
//                       className="text-gray-400 hover:text-gray-600 ml-4"
//                     >
//                       <FaTimes className="text-xl" />
//                     </button>
//                   </div>

//                   <div className="mb-2">
//                     <span className="text-xl font-bold text-gray-900">
//                       ₹{item.price.toLocaleString()}
//                     </span>
//                     {/* {item.originalPrice && (
//                       <>
//                         <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice.toLocaleString()}</span>
//                         <span className="text-sm text-green-600 ml-2">{item.discount}% off</span>
//                       </>
//                     )} */}
//                   </div>

//                   {/* <div className="text-sm text-green-700 mb-2">
//                     {item.inStock ? item.deliveryDate : 'Currently unavailable'}
//                   </div> */}

//                   {/* {item.offers.length > 0 && (
//                     <div className="mb-3">
//                       {item.offers.map((offer, index) => (
//                         <div key={index} className="flex items-center text-sm text-gray-700 mb-1">
//                           {offer.includes('Bank') ? (
//                             <BsBank2 className="mr-1 text-gray-500" />
//                           ) : (
//                             <BsCreditCard className="mr-1 text-gray-500" />
//                           )}
//                           {offer}
//                         </div>
//                       ))}
//                     </div>
//                   )} */}

//                   <div className="flex flex-wrap gap-2 mt-4">
//                     <button
//                       onClick={() => moveToCart(item.id)}
//                       disabled={!item.inStock}
//                       className={`flex items-center justify-center py-2 px-4 rounded border ${
//                         item.inStock
//                           ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-500"
//                           : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
//                       }`}
//                     >
//                       <FaShoppingCart className="mr-2" />
//                       {item.inStock ? "Add to Cart" : "Notify Me"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;
