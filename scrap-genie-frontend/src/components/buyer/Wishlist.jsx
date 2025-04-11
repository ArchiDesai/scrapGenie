import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../redux/wishlist/WishlistSlice';
import { addItem} from '../../redux/cart/CartSlice';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      
      {wishlist.items.length === 0 ? (
        <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl shadow-inner p-12 text-center border border-blue-100 max-w-md mx-auto">
        <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <FiStar className="text-green-500 text-3xl" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Wishlist waiting</h2>
        <p className="text-gray-600 mb-8">Your future favorites belong here</p>
        <Link to="/buyer/allproducts">
            <button className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-xl font-bold transition-all hover:shadow-lg">
                Find Your Style
            </button>
        </Link>
    </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.items.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-full h-full object-contain p-4"
                />
                <button
                  onClick={() => dispatch(removeFromWishlist(item._id))}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                >
                  <FaHeart className="text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-1">{item.productName}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                <p className="text-lg font-bold mb-4">₹{item.price}</p>
                <button
                  onClick={() => {
                    dispatch(addItem(item));
                    dispatch(removeFromWishlist(item._id));
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;