import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const Chatbot = ({ products, onProductRecommend, cartItems, wishlistItems }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your personal shopping assistant. I can help you find the perfect outfit! You can ask me about specific types of clothing, occasions, or your style preferences.",
      isBot: true
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserMessage = (message) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, isBot: false }];
    setMessages(newMessages);
    setUserInput('');

    const response = generateBotResponse(message, products);
    setTimeout(() => {
      setMessages([...newMessages, response]);
    }, 500);
  };

  const generateBotResponse = (message, products) => {
    const lowercaseMessage = message.toLowerCase();
    let recommendedProducts = [];
    let responseText = "";

    if (lowercaseMessage.includes('dress') || lowercaseMessage.includes('dresses')) {
      recommendedProducts = products.filter(p => p.category === 'Dresses');
      responseText = "Here are some beautiful dresses that might interest you!";
    } else if (lowercaseMessage.includes('top') || lowercaseMessage.includes('shirt') || lowercaseMessage.includes('blouse')) {
      recommendedProducts = products.filter(p => p.category === 'Tops');
      responseText = "I found some great tops for you!";
    } else if (lowercaseMessage.includes('bottom') || lowercaseMessage.includes('pants') || lowercaseMessage.includes('jeans') || lowercaseMessage.includes('skirt')) {
      recommendedProducts = products.filter(p => p.category === 'Bottoms');
      responseText = "Check out these stylish bottoms!";
    }

    if (lowercaseMessage.includes('formal') || lowercaseMessage.includes('office')) {
      recommendedProducts = products.filter(p => p.tags.some(tag => ['formal', 'office'].includes(tag)));
      responseText = "Here are some formal and office-appropriate items!";
    } else if (lowercaseMessage.includes('casual') || lowercaseMessage.includes('everyday')) {
      recommendedProducts = products.filter(p => p.tags.includes('casual'));
      responseText = "These casual pieces are perfect for everyday wear!";
    }

    if (lowercaseMessage.includes('party') || lowercaseMessage.includes('evening')) {
      recommendedProducts = products.filter(p => p.tags.some(tag => ['party', 'evening'].includes(tag)));
      responseText = "I found some perfect party and evening wear options!";
    }

    if (lowercaseMessage.includes('cheap') || lowercaseMessage.includes('affordable') || lowercaseMessage.includes('budget')) {
      recommendedProducts = products.filter(p => p.price < 50);
      responseText = "Here are some affordable options within your budget!";
    } else if (lowercaseMessage.includes('expensive') || lowercaseMessage.includes('luxury') || lowercaseMessage.includes('premium')) {
      recommendedProducts = products.filter(p => p.price > 50);
      responseText = "Here are some premium options for you!";
    }

    if (recommendedProducts.length > 0) {
      onProductRecommend(recommendedProducts);
      return {
        text: `${responseText} I've highlighted them in the product grid. Would you like me to help you find something else?`,
        isBot: true
      };
    }

    if (lowercaseMessage.includes('cart') || lowercaseMessage.includes('basket')) {
      if (cartItems.length > 0) {
        return {
          text: `You have ${cartItems.length} items in your cart. Would you like to view your cart or continue shopping?`,
          isBot: true
        };
      } else {
        return {
          text: "Your cart is currently empty. Would you like me to help you find something to add?",
          isBot: true
        };
      }
    }

    if (lowercaseMessage.includes('wishlist') || lowercaseMessage.includes('favorite')) {
      if (wishlistItems.length > 0) {
        return {
          text: `You have ${wishlistItems.length} items in your wishlist. Would you like to view your wishlist or continue shopping?`,
          isBot: true
        };
      } else {
        return {
          text: "Your wishlist is currently empty. Would you like me to help you find something to add?",
          isBot: true
        };
      }
    }

    return {
      text: "I'm here to help you find the perfect outfit! You can ask me about:\n- Specific types of clothing (dresses, tops, bottoms)\n- Occasions (formal, casual, party)\n- Price ranges (affordable, premium)\n- Your cart or wishlist\nWhat would you like to know?",
      isBot: true
    };
  };

  return (
    <div className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg transition-all duration-300 ${
      isMinimized ? 'h-12' : 'h-96'
    }`}>
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <FaRobot className="text-blue-500 mr-2" />
          <h3 className="font-semibold">Shopping Assistant</h3>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isMinimized ? <FaRobot /> : <FaTimes />}
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="h-64 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${
                  message.isBot
                    ? 'bg-gray-100 ml-4'
                    : 'bg-blue-100 mr-4'
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && userInput.trim()) {
                    handleUserMessage(userInput.trim());
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleUserMessage(userInput.trim())}
                className="ml-2 p-2 text-blue-500 hover:text-blue-600"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot; 