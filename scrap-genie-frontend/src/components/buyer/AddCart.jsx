// // import axios from "axios";
// // import React, { useEffect, useState } from "react";

// // const AddCart = () => {
// //   const [cartItems, setCartItems] = useState([
// //     // { id: 1, name: 'Product 1', price: 20, quantity: 1 },
// //     // { id: 2, name: 'Product 2', price: 30, quantity: 2 },
// //     // { id: 3, name: 'Product 3', price: 15, quantity: 1 },
// //   ]);

// // //   const getProductById = async () => {
// // //     const res = await axios.get(
// // //       "/scrapProduct/getallscrapproductbyuserid/" + localStorage.getItem("id")
// // //     );
// // //     console.log(res.data);
// // //   };

// // //   useEffect(() => {
// // //     getProductById();
// // //   }, []);

// //   const updateQuantity = (id, newQuantity) => {
// //     setCartItems(
// //       cartItems.map((item) =>
// //         item.id === id ? { ...item, quantity: newQuantity } : item
// //       )
// //     );
// //   };

// //   const removeItem = (id) => {
// //     setCartItems(cartItems.filter((item) => item.id !== id));
// //   };

// //   const totalPrice = cartItems.reduce(
// //     (total, item) => total + item.price * item.quantity,
// //     0
// //   );

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
// //       {cartItems.length === 0 ? (
// //         <p>Your cart is empty.</p>
// //       ) : (
// //         <div>
// //           {cartItems.map((item) => (
// //             <div
// //               key={item.id}
// //               className="flex justify-between items-center border-b py-2"
// //             >
// //               <div>
// //                 <img
// //                   src={item.imageUrl}
// //                   alt={item.productName}
// //                   className="w-full h-full object-contain"
// //                 />
// //               </div>

// //               <div>
// //                 <h2 className="text-lg">{item.productName}</h2>
// //                 <p className="text-gray-600">${item.price.toFixed(2)}</p>
// //               </div>
// //               <div className="flex items-center">
// //                 <input
// //                   type="number"
// //                   value={item.quantity}
// //                   onChange={(e) =>
// //                     updateQuantity(item.id, parseInt(e.target.value))
// //                   }
// //                   className="w-16 text-center border rounded"
// //                   min="1"
// //                 />
// //                 <button
// //                   onClick={() => removeItem(item.id)}
// //                   className="ml-4 text-red-500 hover:text-red-700"
// //                 >
// //                   Remove
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //           <div className="mt-4">
// //             <h2 className="text-xl font-bold">
// //               Total: ${totalPrice.toFixed(2)}
// //             </h2>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AddCart;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeItem,
  updateQuantity,
} from "../../redux/cart/CartSlice";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle quantity changes
  const handleQuantityChange = (id, change) => {
    dispatch(updateQuantity({ id, change }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <Link to="/buyer/allproducts" className="flex items-center text-green-600 hover:text-green-800 transition-colors group">
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
           <span className="font-medium">Continue Shopping</span>
           </Link>
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl shadow-inner p-12 text-center max-w-md mx-auto border border-blue-100">
          <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <FiShoppingBag className="text-green-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
            Cart feeling lonely?
          </h2>
          <p className="text-gray-600 mb-8">
            Treat it with some shopping therapy
          </p>
          <Link to="/buyer/allproducts">
            <button className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:scale-[1.02]">
              Let's Go Shopping!
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <div className="lg:col-span-2 bg-purple-50">
            {cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row border-b border-gray-200 py-6"
              >
                <div className="sm:w-1/4 mb-4 sm:mb-0">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-full h-32 object-contain"
                  />
                </div>
                <div className="sm:w-3/4 sm:pl-6 px-28">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{item.productName}</h3>
                    <button onClick={() => dispatch(removeItem())}>
                      <MdOutlineDeleteForever className="text-red-600 text-2xl" />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 border border-gray-300 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 py-1 border border-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold">
                      ₹{totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-gray-50 p-6 w-1/2 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
              </span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <Link to={"/payment"}>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full border border-gray-300 py-3 rounded-lg mt-4 hover:bg-gray-100 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiPlus, FiMinus, FiTrash2, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeItem, updateQuantity } from '../../redux/cart/CartSlice';

// export const AddCart = () => {
//   // Redux state management
//     const cartItems = useSelector(state => state.cart.items);
//     const dispatch = useDispatch();

//   // Calculate total price
//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   // Handle quantity changes
//     const handleQuantityChange = (id, change) => {
//     dispatch(updateQuantity({ id, change }));
//     };

//     return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//         <div className="max-w-6xl mx-auto p-4 md:p-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//             <Link to="/product" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors group">
//             <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
//             <span className="font-medium">Continue Shopping</span>
//             </Link>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//             Your Shopping Cart
//             </h1>
//             <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-xs border border-gray-200">
//             <FiShoppingBag className="text-indigo-600" />
//             <span className="ml-2 text-sm font-medium text-gray-700">
//                 {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
//             </span>
//             </div>
//         </div>

//         {cartItems.length === 0 ? (
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-12 text-center border border-gray-100 max-w-md mx-auto">
//             <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mb-6">
//                 <FiShoppingBag className="text-indigo-400 text-3xl" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart feels light</h2>
//             <p className="text-gray-500 mb-8">Let's find something to put in it</p>
//             <Link to="/product">
//                 <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
//                 Browse Products
//                 </button>
//             </Link>
//             </div>
//         ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-6">
//                 {cartItems.map(item => (
//                 <div key={item.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xs hover:shadow-sm transition-all p-5 flex items-start border border-gray-100 group">

//                     <div className="ml-5 flex-1">
//                         <div className="flex justify-between items-start">
//                           <div className="w-24 h-24 rounded-xl ${item.color} flex-shrink-0 overflow-hidden shadow-inner">
//                         <img src={item.img} alt={item.name} className="w-full h-full object-contain scale-90 group-hover:scale-95 transition-transform" />
//                     </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-900">{item.name}</h3>
//                                 {/* <p className="text-indigo-600 font-bold mt-1">Rs.{item.price.toFixed(2)}</p> */}
//                             </div>
//                                 <button onClick={() => dispatch(removeItem(item.id))} className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg">
//                                     <FiTrash2 size={18} />
//                                 </button>
//                     </div>
//                     <div className="flex items-center mt-6">
//                         <button
//                         onClick={() => handleQuantityChange(item.id, -1)}
//                         disabled={item.quantity <= 1}
//                         className={`w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg transition-colors ${
//                             item.quantity <= 1
//                             ? 'cursor-not-allowed text-gray-400'
//                             : 'hover:bg-gray-50 hover:border-indigo-300 text-gray-600'
//                         }`}
//                         >
//                         <FiMinus />
//                         </button>
//                         <span className="mx-4 font-medium text-gray-800 min-w-[20px] text-center">{item.quantity}</span>
//                         <button
//                         onClick={() => handleQuantityChange(item.id, 1)}
//                         className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors hover:border-indigo-300 text-gray-600"
//                         >
//                         <FiPlus />
//                         </button>
//                     </div>
//                     </div>
//                 </div>
//                 ))}
//             </div>

//             {/* Summary */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 h-fit sticky top-8 border border-gray-100">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Order Summary</h2>
//                 <div className="space-y-4">
//                 <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
//                     <span className="font-medium text-gray-900">Rs.{totalPrice.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-medium text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span className="text-gray-600">Tax</span>
//                     <span className="font-medium text-gray-900">Rs.0.00</span>
//                 </div>
//                 </div>
//                 <div className="border-t border-gray-200 my-5"></div>
//                 <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
//                 <span>Total</span>
//                 <span>Rs.{totalPrice.toFixed(2)}</span>
//                 </div>
//                 <Link to="/payment">
//                 <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center">
//                     Proceed to Checkout
//                     <FiArrowLeft className="ml-2 transform rotate-180" />
//                 </button>
//                 </Link>
//                 <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center">
//                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                 </svg>
//                 Secure payment processing
//                 </p>
//             </div>
//             </div>
//         )}
//         </div>
//     </div>
//     );
// };

// export default AddCart
