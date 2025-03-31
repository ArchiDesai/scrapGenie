import React, { useState } from 'react'

const AddCart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 20, quantity: 1 },
        { id: 2, name: 'Product 2', price: 30, quantity: 2 },
        { id: 3, name: 'Product 3', price: 15, quantity: 1 },
      ]);
    
      const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
      };
    
      const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
      };
    
      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b py-2">
                  <div>
                    <h2 className="text-lg">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center border rounded"
                      min="1"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
              </div>
            </div>
          )}
        </div>
      )
}

export default AddCart