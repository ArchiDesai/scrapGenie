import React, { useEffect } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  removeItem,
  totals,
  updateQuantity,
} from "../../redux/cart/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeItem(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(updateQuantity(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };


  useEffect(() => {
    dispatch(totals())
  }, [cart, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/buyer/allproducts"
        className="flex items-center text-green-600 hover:text-green-800 transition-colors group"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Continue Shopping</span>
      </Link>
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cart.cartItems.length === 0 ? (
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
          <Link to="/buyer">
            <button className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:scale-[1.02]">
              Let's Go Shopping!
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <div className="lg:col-span-2 bg-purple-50">
            {cart.cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row border-b border-gray-200 py-5"
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
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium">
                        {item.productName}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.category}
                      </p>
                    </div>
                    <h3>₹{item.price}</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-400 rounded">
                        <button
                          onClick={() => handleDecreaseQuantity(item)}
                          className="px-2 py-1"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.cartQuantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(item)}
                          className="px-2 py-1"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button onClick={() => handleRemoveFromCart(item)}>
                      <MdOutlineDeleteForever className="text-red-600 text-2xl" />
                    </button>
                  </div>
                  <p className="text-lg font-bold mt-10 ml-96">
                    ₹{item.price * item.cartQuantity}
                  </p>
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
                Subtotal 
                ({cart.totalQuantity} items)
              </span>
              <span>₹{cart.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{cart.totalAmount.toFixed(2)}</span>
            </div>
            <Link to={"/payment"}>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </Link>
            <button
              onClick={() => handleClearCart()}
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
