import React from 'react'

const Payment = () => {
  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold">Payment Options</h2>
    <div className="bg-white shadow-md p-6 rounded-lg">
        <p className="text-gray-600">Select a payment method:</p>

        <div className="mt-4">
            <label className="flex items-center space-x-2">
                <input type="radio" name="payment" /> <span>UPI</span>
            </label>
            <label className="flex items-center space-x-2">
                <input type="radio" name="payment"/> <span>Bank Transfer</span>
            </label>
            <label className="flex items-center space-x-2">
                <input type="radio" name="payment"/> <span>Cash on Delivery</span>
            </label>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded">Proceed to Pay</button>
    </div>
</div>

  )
}

export default Payment