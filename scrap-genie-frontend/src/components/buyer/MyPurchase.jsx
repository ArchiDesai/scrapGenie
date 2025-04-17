import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const MyPurchase = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl shadow-inner p-12 text-center max-w-md mx-auto border border-blue-100">
    <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FiSearch className="text-gray-500 text-2xl" />
    </div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">No products found</h2>
    <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
    <Link to="/buyer">
    <button className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:scale-[1.02]">
            View All Products
        </button>
    </Link>
</div>
  )
}

export default MyPurchase