import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Your Shopping Cart
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Your cart is currently empty.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 