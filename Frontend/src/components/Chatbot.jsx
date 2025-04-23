import { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const Chatbot = ({ products, onProductRecommend }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your personal shopping assistant. How can I help you find the perfect outfit today?",
      isBot: true
    }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleUserMessage = (message) => {

    const newMessages = [...messages, { text: message, isBot: false }];
    setMessages(newMessages);

    const response = generateBotResponse(message, products);
    setTimeout(() => {
      setMessages([...newMessages, response]);
    }, 500);
  };

  const generateBotResponse = (message, products) => {
    const lowercaseMessage = message.toLowerCase();
    let recommendedProducts = [];

    if (lowercaseMessage.includes('dress') || lowercaseMessage.includes('dresses')) {
      recommendedProducts = products.filter(p => p.category === 'Dresses');
    } else if (lowercaseMessage.includes('top') || lowercaseMessage.includes('shirt') || lowercaseMessage.includes('blouse')) {
      recommendedProducts = products.filter(p => p.category === 'Tops');
    } else if (lowercaseMessage.includes('bottom') || lowercaseMessage.includes('pants') || lowercaseMessage.includes('jeans') || lowercaseMessage.includes('skirt')) {
      recommendedProducts = products.filter(p => p.category === 'Bottoms');
    }

    if (lowercaseMessage.includes('formal') || lowercaseMessage.includes('office')) {
      recommendedProducts = products.filter(p => p.tags.some(tag => ['formal', 'office'].includes(tag)));
    } else if (lowercaseMessage.includes('casual') || lowercaseMessage.includes('everyday')) {
      recommendedProducts = products.filter(p => p.tags.includes('casual'));
    }
    if (lowercaseMessage.includes('party') || lowercaseMessage.includes('evening')) {
      recommendedProducts = products.filter(p => p.tags.some(tag => ['party', 'evening'].includes(tag)));
    }

    if (recommendedProducts.length > 0) {
      onProductRecommend(recommendedProducts);
      return {
        text: `I found some items that might interest you! I've highlighted them in the product grid. Would you like me to help you find something else?`,
        isBot: true
      };
    }

    return {
      text: "I'm here to help you find the perfect outfit! You can ask me about specific types of clothing (like dresses or tops), occasions (formal, casual, party), or tell me your style preferences.",
      isBot: true
    };
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b flex items-center">
        <FaRobot className="text-blue-500 mr-2" />
        <h3 className="font-semibold">Shopping Assistant</h3>
      </div>
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
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && userInput.trim()) {
              handleUserMessage(userInput.trim());
              setUserInput('');
            }
          }}
          placeholder="Type your message..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Chatbot; 