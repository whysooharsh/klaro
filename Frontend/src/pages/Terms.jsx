import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to our fashion store. By accessing and using our website, you accept and agree to be bound by these Terms of Service."
    },
    {
      title: "2. Intellectual Property",
      content: "All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of our company and is protected by intellectual property laws."
    },
    {
      title: "3. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
    },
    {
      title: "4. Product Information",
      content: "We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free."
    },
    {
      title: "5. Pricing and Payment",
      content: "All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice. We shall not be liable to you or any third party for any modification, price change, or discontinuance."
    },
    {
      title: "6. Shipping and Returns",
      content: "Shipping times and costs vary by destination. Please refer to our FAQ page for detailed information about our shipping and return policies."
    },
    {
      title: "7. Limitation of Liability",
      content: "In no event shall our company be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or products."
    },
    {
      title: "8. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Your continued use of the website following any changes indicates your acceptance of the new terms."
    }
  ];

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-gray-600">
          For more information, please visit our <Link to="/faq" onClick={handleLinkClick} className="text-blue-600 hover:underline">FAQ</Link> or 
          <Link to="/size-guide" onClick={handleLinkClick} className="text-blue-600 hover:underline ml-1">Size Guide</Link> pages.
        </p>
      </div>
    </div>
  );
};

export default Terms; 