import React from 'react';
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity } = useAuth();

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  if (cart.length === 0) {
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
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="py-6 flex items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                    <p className="mt-1 text-lg font-medium text-blue-600">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiMinus className="w-5 h-5" />
                      </button>
                      <span className="text-gray-900 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiPlus className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => navigate('/shop')}
                className="px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 