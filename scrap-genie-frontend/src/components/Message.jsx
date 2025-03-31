import React, { useState } from 'react'

const Message = () => {

  const [messages, setMessages] = useState([
    { text: "Hello, is the metal scrap available?", sender: "user" },
    { text: "Yes, it's available. How much do you need?", sender: "seller" }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: "seller" }]);
      setInputValue('');
    }
  }


  return (
//     <div className="container mx-auto px-4 py-8">
//     <h2 className="text-2xl font-bold">Chat with Seller</h2>
//     <div className="bg-white shadow-md p-4 rounded-lg">
//         <div className="flex flex-col space-y-2">
//             <div className="bg-gray-200 p-2 rounded self-start">Hello, is the metal scrap available?</div>
//             <div className="bg-blue-500 text-white p-2 rounded self-end">Yes, it's available. How much do you need?</div>
//         </div>

//         <div className="mt-4 flex">
//             <input type="text" className="border p-2 flex-1 rounded" placeholder="Type a message..."/>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded ml-2">Send</button>
//         </div>
//     </div>
// </div>

<div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Chat with Seller</h2>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <div className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                message.sender === "user"
                  ? "bg-gray-200 self-start"
                  : "bg-blue-500 text-white self-end"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            className="border p-2 flex-1 rounded"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>

  )
}

export default Message