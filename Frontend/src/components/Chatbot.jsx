import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaHeadset, FaInfoCircle, FaQuestionCircle, FaShippingFast } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getSimilarProducts, 
  getPersonalizedRecommendations, 
  getComplementaryProducts, 
  getTrendingProducts,
  getSizeRecommendation,
  updateUserPreferences 
} from '../services/RecommendationService';

const Chatbot = ({ products, onProductRecommend, cartItems, wishlistItems, userProfile }) => {
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
  const [chatSection, setChatSection] = useState('shopping'); // 'shopping', 'support', 'faq', 'shipping'
  const messagesEndRef = useRef(null);
  const [viewedProducts, setViewedProducts] = useState(new Set());
  const [lastViewedProduct, setLastViewedProduct] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Track product view duration
  useEffect(() => {
    let startTime = Date.now();
    return () => {
      if (lastViewedProduct) {
        const duration = (Date.now() - startTime) / 1000; // Convert to seconds
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

    // Simulate typing delay
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
        response = generateBotResponse(message, products);
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

  const quickActions = [
    { text: 'Show me dresses', icon: '👗' },
    { text: 'Find casual outfits', icon: '👕' },
    { text: 'View my cart', icon: '🛒' },
    { text: 'Check wishlist', icon: '❤️' }
  ];

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

  const generateBotResponse = (message, products) => {
    const lowercaseMessage = message.toLowerCase();
    let recommendedProducts = [];
    let responseText = "";
    let responseType = 'text';

    // Enhanced category detection with subcategories
    const categories = {
      dresses: ['dress', 'dresses', 'gown', 'gowns', 'party dress', 'evening dress', 'cocktail dress', 'maxi dress'],
      tops: ['top', 'shirt', 'blouse', 't-shirt', 'tshirt', 'sweater', 'hoodie', 'sweatshirt', 'tank'],
      bottoms: ['bottom', 'pants', 'jeans', 'skirt', 'trousers', 'shorts', 'leggings'],
      outerwear: ['jacket', 'coat', 'blazer', 'cardigan', 'outerwear'],
      activewear: ['activewear', 'workout', 'gym', 'athletic', 'sports', 'leggings']
    };

    // Enhanced material detection
    const materials = {
      natural: ['cotton', 'linen', 'silk', 'wool', 'cashmere'],
      synthetic: ['polyester', 'nylon', 'spandex', 'elastane'],
      denim: ['denim', 'jean'],
      leather: ['leather', 'suede']
    };

    // Price range detection with specific ranges
    const priceRanges = {
      budget: { keywords: ['cheap', 'affordable', 'budget', 'under 50', 'inexpensive'], range: price => price < 50 },
      mid: { keywords: ['mid-range', 'moderate', '50-100', 'mid price'], range: price => price >= 50 && price <= 100 },
      premium: { keywords: ['expensive', 'luxury', 'premium', 'over 100', 'high-end'], range: price => price > 100 }
    };

    // Enhanced occasion detection
    const occasions = {
      formal: ['formal', 'office', 'business', 'work', 'professional', 'meeting'],
      casual: ['casual', 'everyday', 'daily', 'relaxed', 'weekend'],
      party: ['party', 'evening', 'night', 'event', 'celebration', 'cocktail'],
      summer: ['summer', 'beach', 'vacation', 'resort', 'tropical'],
      winter: ['winter', 'cold', 'snow', 'holiday', 'christmas']
    };

    // Enhanced style detection
    const styles = {
      classic: ['classic', 'timeless', 'traditional', 'basic'],
      trendy: ['trendy', 'fashionable', 'stylish', 'modern', 'contemporary'],
      bohemian: ['boho', 'bohemian', 'hippie', 'artistic'],
      elegant: ['elegant', 'sophisticated', 'classy', 'refined'],
      sporty: ['sporty', 'athletic', 'active', 'casual']
    };

    // Color detection with variations
    const colors = {
      red: ['red', 'maroon', 'burgundy', 'crimson'],
      blue: ['blue', 'navy', 'azure', 'turquoise'],
      green: ['green', 'olive', 'emerald', 'sage'],
      black: ['black', 'charcoal'],
      white: ['white', 'ivory', 'cream'],
      pink: ['pink', 'rose', 'blush', 'magenta'],
      yellow: ['yellow', 'gold', 'mustard'],
      purple: ['purple', 'violet', 'lavender', 'plum'],
      brown: ['brown', 'tan', 'beige', 'khaki'],
      gray: ['gray', 'grey', 'silver']
    };

    // Process category filters
    Object.entries(categories).forEach(([category, keywords]) => {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        recommendedProducts = products.filter(p => 
          p.category.toLowerCase() === category || 
          p.tags.some(tag => keywords.includes(tag.toLowerCase()))
        );
        responseText = `Here are some ${category} that might interest you!`;
      }
    });

    // Process material filters
    Object.entries(materials).forEach(([material, keywords]) => {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        const materialProducts = products.filter(p => 
          p.description.toLowerCase().includes(material) || 
          p.tags.some(tag => keywords.includes(tag.toLowerCase()))
        );
        if (materialProducts.length > 0) {
          recommendedProducts = materialProducts;
          responseText = `Here are our ${material} items!`;
        }
      }
    });

    // Process price range filters
    Object.entries(priceRanges).forEach(([range, { keywords, range: priceRange }]) => {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        recommendedProducts = products.filter(priceRange);
        responseText = `Here are some ${range} options within your budget!`;
      }
    });

    // Process occasion filters
    Object.entries(occasions).forEach(([occasion, keywords]) => {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        recommendedProducts = products.filter(p => 
          p.tags.some(tag => keywords.includes(tag.toLowerCase())) ||
          p.description.toLowerCase().includes(occasion)
        );
        responseText = `Perfect choices for ${occasion} occasions!`;
      }
    });

    // Process style filters
    Object.entries(styles).forEach(([style, keywords]) => {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        recommendedProducts = products.filter(p => 
          p.tags.some(tag => keywords.includes(tag.toLowerCase())) ||
          p.description.toLowerCase().includes(style)
        );
        responseText = `Here are some ${style} pieces that match your style!`;
      }
    });

    // Process color filters
    Object.entries(colors).forEach(([color, variations]) => {
      if (variations.some(variation => lowercaseMessage.includes(variation))) {
        const colorProducts = products.filter(p => 
          variations.some(v => 
            p.description.toLowerCase().includes(v) || 
            p.tags.some(tag => tag.toLowerCase().includes(v))
          )
        );
        if (colorProducts.length > 0) {
          recommendedProducts = colorProducts;
          responseText = `Here are our ${color} items!`;
        }
      }
    });

    // Handle multiple filters
    const allFilters = [...Object.values(categories).flat(), 
                       ...Object.values(materials).flat(),
                       ...Object.values(priceRanges).map(pr => pr.keywords).flat(),
                       ...Object.values(occasions).flat(),
                       ...Object.values(styles).flat(),
                       ...Object.values(colors).map(c => c).flat()];
    
    const matchedFilters = allFilters.filter(filter => lowercaseMessage.includes(filter));
    
    if (matchedFilters.length > 1) {
      // Apply all matching filters
      recommendedProducts = products.filter(product => 
        matchedFilters.every(filter => 
          product.tags.some(tag => tag.toLowerCase().includes(filter)) ||
          product.description.toLowerCase().includes(filter) ||
          product.category.toLowerCase().includes(filter)
        )
      );
      responseText = `Here are items matching all your criteria: ${matchedFilters.join(', ')}`;
    }

    if (recommendedProducts.length > 0) {
      onProductRecommend(recommendedProducts);
      return {
        text: `${responseText} I've highlighted them in the product grid. Would you like me to help you find something else?`,
        isBot: true,
        type: 'product',
        products: recommendedProducts.slice(0, 3),
        quickActions: [
          { text: 'Show more like these', icon: '🔄' },
          { text: 'Refine search', icon: '🔍' },
          { text: 'Different style', icon: '👕' }
        ]
      };
    }

    // Handle no results
    if (matchedFilters.length > 0 && recommendedProducts.length === 0) {
      return {
        text: `I couldn't find any items matching exactly what you're looking for. Would you like to see some similar alternatives or try a different search?`,
        isBot: true,
        type: 'no-results',
        quickActions: [
          { text: 'Show alternatives', icon: '🔄' },
          { text: 'New search', icon: '🔍' },
          { text: 'Browse all', icon: '👀' }
        ]
      };
    }

    if (lowercaseMessage.includes('cart') || lowercaseMessage.includes('basket')) {
      if (cartItems.length > 0) {
        return {
          text: `You have ${cartItems.length} items in your cart. Would you like to view your cart or continue shopping?`,
          isBot: true,
          type: 'cart',
          items: cartItems,
          quickActions: [
            { text: 'View cart', icon: '🛒' },
            { text: 'Continue shopping', icon: '🛍️' },
            { text: 'Checkout', icon: '💳' }
          ]
        };
      } else {
        return {
          text: "Your cart is currently empty. Would you like me to help you find something to add?",
          isBot: true,
          type: 'empty-cart',
          quickActions: [
            { text: 'Show popular items', icon: '🔥' },
            { text: 'See new arrivals', icon: '✨' }
          ]
        };
      }
    }

    if (lowercaseMessage.includes('wishlist') || lowercaseMessage.includes('favorite')) {
      if (wishlistItems.length > 0) {
        return {
          text: `You have ${wishlistItems.length} items in your wishlist. Would you like to view your wishlist or continue shopping?`,
          isBot: true,
          type: 'wishlist',
          items: wishlistItems,
          quickActions: [
            { text: 'View wishlist', icon: '❤️' },
            { text: 'Continue shopping', icon: '🛍️' },
            { text: 'Add all to cart', icon: '🛒' }
          ]
        };
      } else {
        return {
          text: "Your wishlist is currently empty. Would you like me to help you find something to add?",
          isBot: true,
          type: 'empty-wishlist',
          quickActions: [
            { text: 'Show popular items', icon: '🔥' },
            { text: 'See new arrivals', icon: '✨' }
          ]
        };
      }
    }

    // Handle personalization requests
    if (lowercaseMessage.includes('recommend') || lowercaseMessage.includes('suggestion')) {
      return generatePersonalizedResponse();
    }

    // Handle similar product requests
    if (lowercaseMessage.includes('similar') && lastViewedProduct) {
      return generateSimilarProductsResponse(lastViewedProduct);
    }

    // Handle complementary product requests
    if ((lowercaseMessage.includes('complete') || lowercaseMessage.includes('match') || lowercaseMessage.includes('outfit')) && lastViewedProduct) {
      return generateComplementaryResponse(lastViewedProduct);
    }

    // Handle size recommendation requests
    if (lowercaseMessage.includes('size') && lastViewedProduct) {
      return generateSizeRecommendation(lastViewedProduct);
    }

    // Handle general greeting or small talk
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
      return {
        text: "Hello there! I'm your personal shopping assistant. How can I help you today? Are you looking for something specific or just browsing?",
        isBot: true,
        type: 'greeting',
        quickActions
      };
    }

    if (lowercaseMessage.includes('thank')) {
      return {
        text: "You're very welcome! I'm happy to help with anything else you might need. Happy shopping!",
        isBot: true,
        type: 'thanks'
      };
    }

    return {
      text: "I'm here to help you find the perfect outfit! You can ask me about:\n- Specific types of clothing (dresses, tops, bottoms)\n- Occasions (formal, casual, party)\n- Price ranges (affordable, premium)\n- Colors\n- Your cart or wishlist\nWhat would you like to know?",
      isBot: true,
      type: 'help',
      quickActions
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

  const renderProductRecommendations = (message) => {
    if (!message.products || message.products.length === 0) return null;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-4 space-y-4"
      >
        <div className="grid grid-cols-3 gap-3">
          {message.products.map((product, idx) => (
            <motion.div 
              key={idx}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleProductView(product)}
            >
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                />
              </div>
              <div className="mt-2 text-sm">
                <p className="font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-gray-500">${product.price}</p>
                {message.type === 'similar' && (
                  <p className="text-xs text-blue-600">
                    {Math.round(product.similarity * 100)}% match
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
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
                          <p className="text-xs mt-1 font-medium">{product.name}</p>
                          <p className="text-xs">${product.price}</p>
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