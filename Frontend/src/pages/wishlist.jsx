import React, { useState, useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../components/Loading';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist!`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Your Wishlist is Empty
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Save your favorite items here to shop them later.
            </p>
            <button 
              onClick={() => navigate('/shop')}
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-semibold rounded-full">
                      {product.tag}
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                      {product.discount}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-lg font-bold text-blue-600 mb-4">{product.price}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Wishlist; 