import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaHeadset, FaInfoCircle, FaQuestionCircle, FaShippingFast } from 'react-icons/fa';
import { FiSend, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getSimilarProducts, 
  getPersonalizedRecommendations, 
  getComplementaryProducts, 
  getTrendingProducts,
  getSizeRecommendation,
  updateUserPreferences 
} from '../services/RecommendationService';

const Chatbot = ({ products, onProductRecommend, cartItems, wishlistItems, userProfile, handlers }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your personal shopping assistant. I can help you find the perfect outfit! You can ask me about specific types of clothing, occasions, or your style preferences.",
      isBot: true,
      type: 'welcome',
      quickActions: [
        { text: 'Show me dresses', icon: '👗' },
        { text: 'Find casual outfits', icon: '👕' },
        { text: 'View my cart', icon: '🛒' },
        { text: 'Check wishlist', icon: '❤️' }
      ]
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatSection, setChatSection] = useState('shopping');
  const messagesEndRef = useRef(null);
  const [viewedProducts, setViewedProducts] = useState(new Set());
  const [lastViewedProduct, setLastViewedProduct] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let startTime = Date.now();
    return () => {
      if (lastViewedProduct) {
        const duration = (Date.now() - startTime) / 1000;
        updateUserPreferences(lastViewedProduct, 'view', duration);
      }
    };
  }, [lastViewedProduct]);

  const handleUserMessage = async (message) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, isBot: false }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response;
    switch(chatSection) {
      case 'support':
        response = generateSupportResponse(message);
        break;
      case 'faq':
        response = generateFAQResponse(message);
        break;
      case 'shipping':
        response = generateShippingResponse(message);
        break;
      default:
        response = await generateBotResponse(message, { 
          products, 
          cartItems, 
          wishlistItems, 
          lastViewedProduct,
          handlers
        });
    }
    
    setMessages([...newMessages, response]);
    setIsTyping(false);
  };

  const switchSection = (section) => {
    setChatSection(section);
    let welcomeMessage = '';
    
    switch(section) {
      case 'shopping':
        welcomeMessage = "I'm back to help you find perfect outfits! What are you looking for today?";
        break;
      case 'support':
        welcomeMessage = "Welcome to Customer Support! I can help with order issues, returns, or product questions. How can I assist you today?";
        break;
      case 'faq':
        welcomeMessage = "Welcome to our FAQ section! I can answer questions about our products, shipping, returns, or size guides. What would you like to know?";
        break;
      case 'shipping':
        welcomeMessage = "Welcome to Shipping & Delivery! I can help track your order, estimate delivery times, or explain shipping options. How can I help?";
        break;
    }
    
    if (welcomeMessage) {
      setMessages([...messages, {
        text: welcomeMessage,
        isBot: true,
        type: section === 'shopping' ? 'welcome' : section
      }]);
    }
  };

  const supportQuickActions = [
    { text: 'Return policy', icon: '📦' },
    { text: 'Order status', icon: '🔍' },
    { text: 'Payment issue', icon: '💳' },
    { text: 'Speak to human', icon: '👨‍💼' }
  ];

  const faqQuickActions = [
    { text: 'Size guide', icon: '📏' },
    { text: 'Materials', icon: '🧵' },
    { text: 'Care instructions', icon: '🧼' },
    { text: 'Sustainability', icon: '♻️' }
  ];

  const shippingQuickActions = [
    { text: 'Shipping options', icon: '🚚' },
    { text: 'Delivery times', icon: '⏱️' },
    { text: 'Track my order', icon: '📦' },
    { text: 'International shipping', icon: '🌎' }
  ];

  const handleProductView = (product) => {
    setLastViewedProduct(product);
    if (!viewedProducts.has(product.id)) {
      setViewedProducts(new Set([...viewedProducts, product.id]));
      updateUserPreferences(product, 'view');
    }
  };

  const handleProductRecommend = (products) => {
    onProductRecommend(products);
    products.forEach(product => handleProductView(product));
  };

  const generatePersonalizedResponse = () => {
    const recommendations = getPersonalizedRecommendations(3);
    return {
      text: "Based on your browsing history and preferences, I think you'll love these items:",
      isBot: true,
      type: 'personalized',
      products: recommendations,
      quickActions: [
        { text: 'Show more like these', icon: '🔄' },
        { text: 'Different style', icon: '👕' },
        { text: 'View trending items', icon: '🔥' }
      ]
    };
  };

  const generateSimilarProductsResponse = (product) => {
    const similar = getSimilarProducts(product, 3);
    return {
      text: `Here are some similar items you might like:`,
      isBot: true,
      type: 'similar',
      products: similar,
      quickActions: [
        { text: 'Show more similar', icon: '🔄' },
        { text: 'View details', icon: '🔍' },
        { text: 'Different style', icon: '👕' }
      ]
    };
  };

  const generateComplementaryResponse = (product) => {
    const complementary = getComplementaryProducts(product, 3);
    return {
      text: `Complete your look with these matching items:`,
      isBot: true,
      type: 'complementary',
      products: complementary,
      quickActions: [
        { text: 'Show more options', icon: '🔄' },
        { text: 'View outfit', icon: '👗' },
        { text: 'Save look', icon: '💾' }
      ]
    };
  };

  const generateSizeRecommendation = (product) => {
    const sizeRec = getSizeRecommendation(product, userProfile);
    return {
      text: `Based on your previous purchases and fit preferences, I recommend size ${sizeRec.recommendedSize} (${Math.round(sizeRec.confidence * 100)}% confidence).\n\n${sizeRec.fitNote}\n\nSizing tips:\n${sizeRec.sizingTips.map(tip => `• ${tip}`).join('\n')}`,
      isBot: true,
      type: 'size-recommendation',
      quickActions: [
        { text: 'View size chart', icon: '📏' },
        { text: 'Update measurements', icon: '📐' },
        { text: 'Learn more', icon: 'ℹ️' }
      ]
    };
  };

  const generateSupportResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('return')) {
      return {
        text: "Our return policy allows you to return items within 30 days of delivery. The items must be unworn and in original packaging. Would you like me to guide you through the return process?",
        isBot: true,
        type: 'support',
        quickActions: [
          { text: 'Start return process', icon: '📦' },
          { text: 'Return to shopping', icon: '🛍️' }
        ]
      };
    } else if (lowercaseMessage.includes('order status') || lowercaseMessage.includes('track')) {
      return {
        text: "I'd be happy to help you track your order! Could you please provide your order number? It should be in your confirmation email.",
        isBot: true,
        type: 'support'
      };
    } else if (lowercaseMessage.includes('payment') || lowercaseMessage.includes('charge')) {
      return {
        text: "I'm sorry to hear you're having payment issues. Could you tell me more about the problem you're experiencing? (Wrong charge, failed payment, etc.)",
        isBot: true,
        type: 'support'
      };
    } else if (lowercaseMessage.includes('human') || lowercaseMessage.includes('representative') || lowercaseMessage.includes('person')) {
      return {
        text: "I'll connect you with a human representative. Our customer support team is available from 9am-5pm EST Monday through Friday. Would you like me to arrange a callback or would you prefer to continue in live chat?",
        isBot: true,
        type: 'support',
        quickActions: [
          { text: 'Request callback', icon: '📞' },
          { text: 'Live chat', icon: '💬' },
          { text: 'Return to shopping', icon: '🛍️' }
        ]
      };
    }
    
    return {
      text: "I'm here to help with any customer support issues. You can ask about returns, order status, payment issues, or request to speak with a human representative. How can I assist you today?",
      isBot: true,
      type: 'support',
      quickActions: supportQuickActions
    };
  };

  const generateFAQResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('size') || lowercaseMessage.includes('fit')) {
      return {
        text: "Our sizing guide can help you find your perfect fit! We offer sizes XS to XXL in most styles. Would you like to see our detailed size chart with measurements?",
        isBot: true,
        type: 'faq',
        quickActions: [
          { text: 'View size chart', icon: '📏' },
          { text: 'Return to shopping', icon: '🛍️' }
        ]
      };
    } else if (lowercaseMessage.includes('material') || lowercaseMessage.includes('fabric')) {
      return {
        text: "We use a variety of high-quality materials in our clothing. Most of our items have the material composition listed in the product details. Is there a specific item you're interested in?",
        isBot: true,
        type: 'faq'
      };
    } else if (lowercaseMessage.includes('care') || lowercaseMessage.includes('wash')) {
      return {
        text: "Most of our garments can be machine washed cold and laid flat to dry. For delicate items, we recommend hand washing. Always check the care label for specific instructions. Is there a particular item you're asking about?",
        isBot: true,
        type: 'faq'
      };
    } else if (lowercaseMessage.includes('sustain') || lowercaseMessage.includes('environment')) {
      return {
        text: "We're committed to sustainability! We use eco-friendly materials when possible, reduce packaging waste, and partner with ethical manufacturers. Would you like to learn more about our sustainability initiatives?",
        isBot: true,
        type: 'faq',
        quickActions: [
          { text: 'Sustainable materials', icon: '🌱' },
          { text: 'Ethical production', icon: '🏭' },
          { text: 'Return to shopping', icon: '🛍️' }
        ]
      };
    }
    
    return {
      text: "I can answer frequently asked questions about our products and services. Feel free to ask about sizing, materials, care instructions, or our sustainability practices. What would you like to know?",
      isBot: true,
      type: 'faq',
      quickActions: faqQuickActions
    };
  };

  const generateShippingResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('shipping option') || lowercaseMessage.includes('delivery option')) {
      return {
        text: "We offer several shipping options: Standard (3-5 business days), Express (1-2 business days), and Next Day delivery. Standard shipping is free for orders over $50. Would you like more details on pricing?",
        isBot: true,
        type: 'shipping'
      };
    } else if (lowercaseMessage.includes('delivery time') || lowercaseMessage.includes('how long')) {
      return {
        text: "Delivery times depend on your location and shipping method. Standard shipping typically takes 3-5 business days, Express takes 1-2 business days, and Next Day delivery will arrive the next business day if ordered before 1pm EST.",
        isBot: true,
        type: 'shipping'
      };
    } else if (lowercaseMessage.includes('track') || lowercaseMessage.includes('where is')) {
      return {
        text: "I'd be happy to help you track your order! Please provide your order number, and I'll check the status for you. You can find your order number in your confirmation email.",
        isBot: true,
        type: 'shipping'
      };
    } else if (lowercaseMessage.includes('international')) {
      return {
        text: "Yes, we ship internationally to over 40 countries! International shipping typically takes 7-14 business days. Customs fees may apply depending on your country's import regulations. Would you like to know if we ship to your specific country?",
        isBot: true,
        type: 'shipping'
      };
    }
    
    return {
      text: "I can help with all your shipping and delivery questions. Feel free to ask about shipping options, delivery times, order tracking, or international shipping. How can I assist you today?",
      isBot: true,
      type: 'shipping',
      quickActions: shippingQuickActions
    };
  };

  const generateBotResponse = async (message, context) => {
    const {
      products,
      cartItems,
      wishlistItems,
      lastViewedProduct,
      handlers
    } = context;

    const lowerMessage = message.toLowerCase().trim();
    
    // Handle greetings and common phrases
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    if (greetings.some(greeting => lowerMessage.includes(greeting))) {
      return {
        text: "Hello! 👋 How can I help you today? I can help you find clothing, check your cart, or provide size recommendations.",
        isBot: true,
        type: 'greeting',
        quickActions: [
          { text: 'Find new clothes', icon: '👕' },
          { text: 'Check my cart', icon: '🛒' },
          { text: 'Size guide', icon: '📏' }
        ]
      };
    }

    // Handle thank you messages
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return {
        text: "You're welcome! Is there anything else I can help you with?",
        isBot: true,
        type: 'acknowledgment',
        quickActions: [
          { text: 'Show recommendations', icon: '🎯' },
          { text: 'View trending', icon: '🔥' },
          { text: 'Need help', icon: '❓' }
        ]
      };
    }

    // Handle help requests
    if (lowerMessage.includes('help') || lowerMessage === '?') {
      return {
        text: "I can help you with:\n• Finding specific clothing items\n• Checking your cart and wishlist\n• Size recommendations\n• Product suggestions\n• Order support\n\nWhat would you like help with?",
        isBot: true,
        type: 'help',
        quickActions: [
          { text: 'Find clothes', icon: '🔍' },
          { text: 'Size help', icon: '📏' },
          { text: 'Order support', icon: '📦' }
        ]
      };
    }

    // Handle cart-related queries
    if (lowerMessage.includes('cart') || lowerMessage.includes('basket')) {
      if (cartItems.length === 0) {
        const recommendations = getPersonalizedRecommendations(3);
        return {
          text: "Your cart is empty. Based on your preferences, here are some items you might like:",
          isBot: true,
          type: 'recommendation',
          products: recommendations,
          quickActions: [
            { text: 'Show more', icon: '🔄' },
            { text: 'View trending', icon: '🔥' },
            { text: 'Browse categories', icon: '📂' }
          ]
        };
      }

      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const complementaryItems = cartItems.length > 0 
        ? getComplementaryProducts(cartItems[cartItems.length - 1], 3)
        : [];
        
      return {
        text: `You have ${cartItems.length} item(s) in your cart. Total: $${total.toFixed(2)}`,
        isBot: true,
        type: 'cart',
        products: cartItems,
        complementaryProducts: complementaryItems,
        quickActions: [
          { text: 'Checkout', icon: '💳' },
          { text: 'Save for later', icon: '⭐' },
          { text: 'Complete the look', icon: '👗' }
        ]
      };
    }

    // Handle wishlist queries
    if (lowerMessage.includes('wishlist')) {
      if (wishlistItems.length === 0) {
        const trendingItems = getTrendingProducts(3);
        return {
          text: "Your wishlist is empty. Here are some trending items you might like:",
          isBot: true,
          type: 'trending',
          products: trendingItems,
          quickActions: [
            { text: 'View all trending', icon: '🔥' },
            { text: 'Personalized picks', icon: '🎯' },
            { text: 'Browse categories', icon: '📂' }
          ]
        };
      }
      
      const similarItems = wishlistItems.length > 0 
        ? getSimilarProducts(wishlistItems[wishlistItems.length - 1], 3)
        : [];
        
      return {
        text: "Here are the items in your wishlist:",
        isBot: true,
        type: 'wishlist',
        products: wishlistItems,
        similarProducts: similarItems,
        quickActions: [
          { text: 'Add all to cart', icon: '🛒' },
          { text: 'Similar items', icon: '👕' },
          { text: 'Clear wishlist', icon: '🗑️' }
        ]
      };
    }

    // Handle recommendation requests
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion') || 
        lowerMessage.includes('show me') || lowerMessage.includes('find me') ||
        lowerMessage.includes('looking for')) {
      if (lastViewedProduct) {
        const similarProducts = getSimilarProducts(lastViewedProduct, 3);
        const complementaryProducts = getComplementaryProducts(lastViewedProduct, 2);
        
        return {
          text: `Based on your interest in ${lastViewedProduct.name}, you might like these:`,
          isBot: true,
          type: 'mixed-recommendation',
          products: similarProducts,
          complementaryProducts: complementaryProducts,
          quickActions: [
            { text: 'More similar items', icon: '🔄' },
            { text: 'Complete the look', icon: '👗' },
            { text: 'Different style', icon: '🎨' }
          ]
        };
      }

      const personalizedRecs = getPersonalizedRecommendations(3);
      const trendingItems = getTrendingProducts(2);
      
      return {
        text: "Here are some items picked just for you, along with what's trending:",
        isBot: true,
        type: 'mixed-recommendation',
        products: personalizedRecs,
        trendingProducts: trendingItems,
        quickActions: [
          { text: 'More recommendations', icon: '🎯' },
          { text: 'View trending', icon: '🔥' },
          { text: 'Browse categories', icon: '📂' }
        ]
      };
    }

    // Handle size recommendations
    if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      if (lastViewedProduct) {
        const sizeRec = getSizeRecommendation(lastViewedProduct, userProfile);
        return {
          text: `For the ${lastViewedProduct.name}, I recommend size ${sizeRec.recommendedSize} (${Math.round(sizeRec.confidence * 100)}% confidence).\n\n${sizeRec.fitNote}`,
          isBot: true,
          type: 'size-recommendation',
          sizeInfo: sizeRec,
          product: lastViewedProduct,
          quickActions: [
            { text: 'View size chart', icon: '📏' },
            { text: 'Update measurements', icon: '📐' },
            { text: 'See similar items', icon: '👕' }
          ]
        };
      }
    }

    // Handle category filters with fuzzy matching
    const categoryKeywords = {
      'tops': ['top', 'shirt', 'blouse', 'tee', 't-shirt', 'sweater'],
      'bottoms': ['bottom', 'pants', 'jeans', 'skirt', 'shorts', 'trousers'],
      'dresses': ['dress', 'gown', 'frock'],
      'accessories': ['accessory', 'accessories', 'jewelry', 'belt', 'scarf'],
      'shoes': ['shoe', 'sneaker', 'boot', 'sandal', 'heel'],
      'outerwear': ['jacket', 'coat', 'blazer', 'cardigan']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        const categoryProducts = products
          .filter(p => p.category.toLowerCase() === category)
          .slice(0, 3);
          
        if (categoryProducts.length > 0) {
          return {
            text: `Here are some ${category} that match your style:`,
            isBot: true,
            type: 'category',
            products: categoryProducts,
            quickActions: [
              { text: `More ${category}`, icon: '🔄' },
              { text: 'Filter by price', icon: '💰' },
              { text: 'Sort by trending', icon: '🔥' }
            ]
          };
        }
      }
    }

    // Handle price-related queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('cheap')) {
      const priceRangeProducts = products
        .filter(p => {
          if (lowerMessage.includes('cheap') || lowerMessage.includes('under 50')) return p.price < 50;
          if (lowerMessage.includes('expensive') || lowerMessage.includes('luxury')) return p.price > 100;
          return p.price >= 50 && p.price <= 100;
        })
        .slice(0, 3);

      return {
        text: `Here are some items in your desired price range:`,
        isBot: true,
        type: 'price',
        products: priceRangeProducts,
        quickActions: [
          { text: 'Under $50', icon: '💰' },
          { text: '$50-$100', icon: '💰' },
          { text: 'Over $100', icon: '💰' }
        ]
      };
    }

    // If no specific intent is matched but we have context from last viewed product
    if (lastViewedProduct) {
      const similarProducts = getSimilarProducts(lastViewedProduct, 3);
      return {
        text: `Based on your interest in ${lastViewedProduct.name}, you might like these similar items:`,
        isBot: true,
        type: 'contextual-recommendation',
        products: similarProducts,
        quickActions: [
          { text: 'Show more similar', icon: '🔄' },
          { text: 'Different style', icon: '🎨' },
          { text: 'View trending', icon: '🔥' }
        ]
      };
    }

    // Default response with personalized recommendations
    const personalizedRecs = getPersonalizedRecommendations(3);
    const hasSufficientPreferences = Object.values(userPreferences.categories).some(val => val > 0) ||
                                   Object.values(userPreferences.tags).some(val => val > 0);

    if (!hasSufficientPreferences) {
      return {
        text: "I'd love to help you find something! What kind of clothing are you looking for? You can ask about specific items like dresses, tops, or accessories.",
        isBot: true,
        type: 'no-context',
        quickActions: [
          { text: 'Show dresses', icon: '👗' },
          { text: 'View tops', icon: '👕' },
          { text: 'Browse trending', icon: '🔥' }
        ]
      };
    }

    return {
      text: "Based on your browsing history, I think you might like these items:",
      isBot: true,
      type: 'recommendation',
      products: personalizedRecs,
      quickActions: [
        { text: 'Show more', icon: '🔄' },
        { text: 'Different style', icon: '🎨' },
        { text: 'Browse categories', icon: '📂' }
      ]
    };
  };

  const renderNavBar = () => (
    <div className="flex justify-around items-center border-b pb-2 bg-gray-50">
      <motion.button
        onClick={() => switchSection('shopping')}
        className={`flex flex-col items-center p-1 rounded-lg ${chatSection === 'shopping' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRobot className="text-lg" />
        <span className="text-xs mt-1">Shopping</span>
      </motion.button>
      <motion.button
        onClick={() => switchSection('support')}
        className={`flex flex-col items-center p-1 rounded-lg ${chatSection === 'support' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaHeadset className="text-lg" />
        <span className="text-xs mt-1">Support</span>
      </motion.button>
      <motion.button
        onClick={() => switchSection('faq')}
        className={`flex flex-col items-center p-1 rounded-lg ${chatSection === 'faq' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaQuestionCircle className="text-lg" />
        <span className="text-xs mt-1">FAQ</span>
      </motion.button>
      <motion.button
        onClick={() => switchSection('shipping')}
        className={`flex flex-col items-center p-1 rounded-lg ${chatSection === 'shipping' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaShippingFast className="text-lg" />
        <span className="text-xs mt-1">Shipping</span>
      </motion.button>
    </div>
  );

  const getMessageStyle = (message) => {
    if (!message.isBot) {
      return 'bg-blue-500 text-white mr-4 ml-auto';
    }
    
    switch(message.type) {
      case 'out-of-stock':
        return 'bg-orange-100 text-orange-800 ml-4';
      case 'support':
        return 'bg-purple-100 text-purple-800 ml-4';
      case 'faq':
        return 'bg-green-100 text-green-800 ml-4';
      case 'shipping':
        return 'bg-indigo-100 text-indigo-800 ml-4';
      default:
        return 'bg-gray-100 ml-4';
    }
  };

  const renderProductRecommendations = (products, handlers) => {
    if (!products || products.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{product.name}</h4>
              <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handlers.onAddToCart(product)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handlers.onAddToWishlist(product)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700"
                >
                  <FiHeart className="w-4 h-4" />
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border transition-all duration-300 overflow-hidden ${
        isMinimized ? 'h-12' : 'h-[500px]'
      }`}
      style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
    >
      <motion.div 
        className="p-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center">
          <FaRobot className="text-white mr-2 text-xl" />
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
          {renderNavBar()}
          <div className="h-[320px] overflow-y-auto p-4 bg-gray-50">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 p-3 rounded-lg max-w-[80%] shadow-sm ${getMessageStyle(message)}`}
                >
                  <div className="whitespace-pre-line">{message.text}</div>
                  
                  {message.products && message.products.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 grid grid-cols-2 gap-2"
                    >
                      {message.products.map((product, idx) => (
                        <motion.div 
                          key={idx} 
                          className="relative group bg-white rounded-lg p-2 shadow-sm"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleProductView(product)}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-sm text-gray-500">${product.price}</p>
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlers.onAddToCart(product);
                              }}
                              className="mx-1 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                            >
                              <FiShoppingCart className="text-gray-800" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlers.onAddToWishlist(product);
                              }}
                              className="mx-1 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                            >
                              <FiHeart className="text-gray-800" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  
                  {message.quickActions && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 flex flex-wrap gap-2"
                    >
                      {message.quickActions.map((action, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleUserMessage(action.text)}
                          className="px-3 py-1 bg-white shadow-sm text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 border border-blue-200"
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
          <div className="p-3 border-t bg-white">
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
                placeholder={`Ask about ${chatSection === 'shopping' ? 'products' : 
                  chatSection === 'support' ? 'customer support' : 
                  chatSection === 'faq' ? 'frequently asked questions' : 
                  'shipping & delivery'}...`}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <motion.button
                onClick={() => handleUserMessage(userInput.trim())}
                disabled={!userInput.trim()}
                className={`p-2 rounded-full ${userInput.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}
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