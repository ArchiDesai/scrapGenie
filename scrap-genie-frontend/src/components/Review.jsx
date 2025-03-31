import React from 'react'

const Review = () => {
  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold">Rate Your Experience</h2>
    <div className="bg-white shadow-md p-6 rounded-lg">
        <p className="text-gray-600">Give feedback on the transaction:</p>
        
        <div className="flex space-x-2 mt-4">
            <span className="text-yellow-500 text-2xl">⭐</span>
            <span className="text-yellow-500 text-2xl">⭐</span>
            <span className="text-yellow-500 text-2xl">⭐</span>
            <span className="text-gray-300 text-2xl">⭐</span>
            <span className="text-gray-300 text-2xl">⭐</span>
        </div>

        <textarea className="border w-full p-2 mt-4 rounded" placeholder="Write a review..."></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">Submit Review</button>
    </div>
</div>

  )
}

export default Review