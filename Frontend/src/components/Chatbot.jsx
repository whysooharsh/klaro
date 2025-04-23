import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = ({ products, onProductRecommend, cartItems, wishlistItems }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your personal shopping assistant. I can help you find the perfect outfit! You can ask me about specific types of clothing, occasions, or your style preferences.",
      isBot: true,
      type: 'welcome'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserMessage = async (message) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, isBot: false }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = generateBotResponse(message, products);
    setMessages([...newMessages, response]);
    setIsTyping(false);
  };

  const quickActions = [
    { text: 'Show me dresses', icon: '👗' },
    { text: 'Find casual outfits', icon: '👕' },
    { text: 'View my cart', icon: '🛒' },
    { text: 'Check wishlist', icon: '❤️' }
  ];

  const generateBotResponse = (message, products) => {
    const lowercaseMessage = message.toLowerCase();
    let recommendedProducts = [];
    let responseText = "";
    let responseType = 'text';

    // Enhanced category detection
    const categories = {
      dresses: ['dress', 'dresses', 'gown', 'gowns'],
      tops: ['top', 'shirt', 'blouse', 't-shirt', 'tshirt'],
      bottoms: ['bottom', 'pants', 'jeans', 'skirt', 'trousers'],
      accessories: ['accessory', 'jewelry', 'bag', 'shoes', 'hat']
    };

    // Price range detection
    const priceRanges = {
      budget: ['cheap', 'affordable', 'budget', 'under 50'],
      mid: ['mid-range', 'moderate', '50-100'],
      premium: ['expensive', 'luxury', 'premium', 'over 100']
    };

    // Occasion detection
    const occasions = {
      formal: ['formal', 'office', 'business', 'work'],
      casual: ['casual', 'everyday', 'daily'],
      party: ['party', 'evening', 'night', 'event'],
      summer: ['summer', 'beach', 'vacation'],
      winter: ['winter', 'cold', 'snow']
    };

    // Color detection
    const colors = ['red', 'blue', 'green', 'black', 'white', 'pink', 'yellow', 'purple'];

    // Process filters
    Object.entries(categories).forEach(([category, keywords]) => {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        recommendedProducts = products.filter(p => p.category.toLowerCase() === category);
        responseText = `Here are some ${category} that might interest you!`;
      }
    });

    Object.entries(priceRanges).forEach(([range, keywords]) => {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        const priceFilter = range === 'budget' ? p => p.price < 50 :
                          range === 'mid' ? p => p.price >= 50 && p.price <= 100 :
                          p => p.price > 100;
        recommendedProducts = products.filter(priceFilter);
        responseText = `Here are some ${range} options for you!`;
      }
    });

    Object.entries(occasions).forEach(([occasion, keywords]) => {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        recommendedProducts = products.filter(p => p.tags.some(tag => keywords.includes(tag)));
        responseText = `Here are some perfect ${occasion} wear options!`;
      }
    });

    colors.forEach(color => {
      if (lowercaseMessage.includes(color)) {
        recommendedProducts = products.filter(p => p.color.toLowerCase() === color);
        responseText = `Here are some beautiful ${color} items!`;
      }
    });

    if (recommendedProducts.length > 0) {
      onProductRecommend(recommendedProducts);
      return {
        text: `${responseText} I've highlighted them in the product grid. Would you like me to help you find something else?`,
        isBot: true,
        type: 'product',
        products: recommendedProducts.slice(0, 3)
      };
    }

    if (lowercaseMessage.includes('cart') || lowercaseMessage.includes('basket')) {
      if (cartItems.length > 0) {
        return {
          text: `You have ${cartItems.length} items in your cart. Would you like to view your cart or continue shopping?`,
          isBot: true,
          type: 'cart',
          items: cartItems
        };
      } else {
        return {
          text: "Your cart is currently empty. Would you like me to help you find something to add?",
          isBot: true,
          type: 'empty-cart'
        };
      }
    }

    if (lowercaseMessage.includes('wishlist') || lowercaseMessage.includes('favorite')) {
      if (wishlistItems.length > 0) {
        return {
          text: `You have ${wishlistItems.length} items in your wishlist. Would you like to view your wishlist or continue shopping?`,
          isBot: true,
          type: 'wishlist',
          items: wishlistItems
        };
      } else {
        return {
          text: "Your wishlist is currently empty. Would you like me to help you find something to add?",
          isBot: true,
          type: 'empty-wishlist'
        };
      }
    }

    return {
      text: "I'm here to help you find the perfect outfit! You can ask me about:\n- Specific types of clothing (dresses, tops, bottoms)\n- Occasions (formal, casual, party)\n- Price ranges (affordable, premium)\n- Colors\n- Your cart or wishlist\nWhat would you like to know?",
      isBot: true,
      type: 'help',
      quickActions
    };
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg transition-all duration-300 ${
        isMinimized ? 'h-12' : 'h-[500px]'
      }`}
    >
      <motion.div 
        className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center">
          <FaRobot className="text-white mr-2" />
          <h3 className="font-semibold">Shopping Assistant</h3>
        </div>
        <motion.button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-white hover:text-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMinimized ? <FaRobot /> : <FaTimes />}
        </motion.button>
      </motion.div>

      {!isMinimized && (
        <>
          <div className="h-[350px] overflow-y-auto p-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                    message.isBot
                      ? 'bg-gray-100 ml-4'
                      : 'bg-blue-500 text-white mr-4 ml-auto'
                  }`}
                >
                  {message.text}
                  {message.type === 'product' && message.products && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 grid grid-cols-3 gap-2"
                    >
                      {message.products.map((product, idx) => (
                        <motion.div 
                          key={idx} 
                          className="text-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img src={product.image} alt={product.name} className="w-full h-20 object-cover rounded" />
                          <p className="text-xs mt-1">{product.name}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  {message.type === 'help' && message.quickActions && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 flex flex-wrap gap-2"
                    >
                      {message.quickActions.map((action, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleUserMessage(action.text)}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {action.icon} {action.text}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div 
                className="flex items-center space-x-1 ml-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
                <motion.div 
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                />
                <motion.div 
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                />
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.01 }}
            >
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
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                onClick={() => handleUserMessage(userInput.trim())}
                className="p-2 text-blue-500 hover:text-blue-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiSend />
              </motion.button>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Chatbot; 