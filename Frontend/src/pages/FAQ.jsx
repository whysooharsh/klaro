import React from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn, unwashed items with original tags attached. Please contact our customer service for return instructions."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the US. Express shipping is available for faster delivery."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping times and costs vary by destination."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this to track your package on our website."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay."
    },
    {
      question: "How do I care for my clothes?",
      answer: "Care instructions are provided on each product's label. For specific care questions, please refer to our Size Guide page."
    }
  ];

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-gray-600">
          Can't find what you're looking for? Check out our <Link to="/size-guide" onClick={handleLinkClick} className="text-blue-600 hover:underline">Size Guide</Link> or 
          <Link to="/terms" onClick={handleLinkClick} className="text-blue-600 hover:underline ml-1">Terms of Service</Link> for more information.
        </p>
      </div>
    </div>
  );
};

export default FAQ; 