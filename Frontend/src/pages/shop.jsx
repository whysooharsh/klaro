import React from 'react';
import { useState } from 'react';
import { FiSearch, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { products as initialProducts } from '../data/products';
import Chatbot from '../components/Chatbot';

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    size: 'all',
    category: 'all'
  });
  const [showChatbot, setShowChatbot] = useState(false);
  const [highlightedProducts, setHighlightedProducts] = useState([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = filters.priceRange === 'all' || 
      (filters.priceRange === 'under50' && product.price < 50) ||
      (filters.priceRange === '50to100' && product.price >= 50 && product.price <= 100);
    const matchesSize = filters.size === 'all' || product.size === filters.size;
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    
    return matchesSearch && matchesPrice && matchesSize && matchesCategory;
  });

  const handleProductRecommendation = (recommendedProducts) => {
    setHighlightedProducts(recommendedProducts.map(p => p.id));
  };

  const handleAddToCart = (productId) => {
    // Add to cart logic here
    navigate('/cart');
  };

  const handleAddToWishlist = (productId) => {
    // Add to wishlist logic here
    navigate('/wishlist');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Women's Clothing</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setShowChatbot(!showChatbot)}
            >
              Chat with Assistant
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-4">
          {/* Filters Sidebar */}
          <div className="w-64 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                >
                  <option value="all">All Prices</option>
                  <option value="under50">Under $50</option>
                  <option value="50to100">$50 - $100</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={filters.size}
                  onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                >
                  <option value="all">All Sizes</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="all">All Categories</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                    highlightedProducts.includes(product.id)
                      ? 'ring-2 ring-blue-500 transform scale-105'
                      : ''
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    <p className="text-sm text-gray-500">Size: {product.size}</p>
                    <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                    <div className="mt-4 flex space-x-2">
                      <button 
                        onClick={() => handleAddToCart(product.id)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => handleAddToWishlist(product.id)}
                        className="p-2 text-gray-600 hover:text-red-500"
                      >
                        <FiHeart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      {showChatbot && (
        <Chatbot
          products={products}
          onProductRecommend={handleProductRecommendation}
        />
      )}
    </div>
  );
};

export default Shop;
