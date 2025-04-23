import React, { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiHeart, FiFilter, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
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
    category: 'all',
    sortBy: 'featured'
  });
  const [showChatbot, setShowChatbot] = useState(false);
  const [highlightedProducts, setHighlightedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showOnlyHighlighted, setShowOnlyHighlighted] = useState(false);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = filters.priceRange === 'all' || 
        (filters.priceRange === 'under50' && product.price < 50) ||
        (filters.priceRange === '50to100' && product.price >= 50 && product.price <= 100) ||
        (filters.priceRange === 'over100' && product.price > 100);
      const matchesSize = filters.size === 'all' || product.size === filters.size;
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesHighlighted = !showOnlyHighlighted || highlightedProducts.includes(product.id);
      
      return matchesSearch && matchesPrice && matchesSize && matchesCategory && matchesHighlighted;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleProductRecommendation = (recommendedProducts) => {
    const recommendedIds = recommendedProducts.map(p => p.id);
    setHighlightedProducts(recommendedIds);
    setShowOnlyHighlighted(true);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    navigate('/cart');
  };

  const handleAddToWishlist = (product) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
      navigate('/wishlist');
    }
  };

  const getProductCount = (category) => {
    return products.filter(p => p.category === category).length;
  };

  const clearFilters = () => {
    setFilters({
      priceRange: 'all',
      size: 'all',
      category: 'all',
      sortBy: 'featured'
    });
    setSearchQuery('');
    setShowOnlyHighlighted(false);
    setHighlightedProducts([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products, categories, or tags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FiFilter />
                <span>Filters</span>
                {showFilters ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Chat with Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-64 bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
            showFilters ? 'block' : 'hidden md:block'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <FiFilter className="mr-2" />
                Filters
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                >
                  <option value="all">All Prices</option>
                  <option value="under50">Under $50</option>
                  <option value="50to100">$50 - $100</option>
                  <option value="over100">Over $100</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="all">All Categories ({products.length})</option>
                  <option value="Dresses">Dresses ({getProductCount('Dresses')})</option>
                  <option value="Tops">Tops ({getProductCount('Tops')})</option>
                  <option value="Bottoms">Bottoms ({getProductCount('Bottoms')})</option>
                  <option value="Outerwear">Outerwear ({getProductCount('Outerwear')})</option>
                </select>
              </div>

              {highlightedProducts.length > 0 && (
                <div className="pt-4 border-t">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showOnlyHighlighted}
                      onChange={(e) => setShowOnlyHighlighted(e.target.checked)}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Show only recommended items</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {highlightedProducts.length > 0 && showOnlyHighlighted && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium">Showing recommended items</span>
                  <span className="ml-2 text-sm text-gray-500">({filteredProducts.length} items)</span>
                </div>
                <button
                  onClick={() => setShowOnlyHighlighted(false)}
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <FiX className="mr-1" />
                  Clear
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                    highlightedProducts.includes(product.id)
                      ? 'ring-2 ring-blue-500 transform scale-105'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        wishlistItems.some(item => item.id === product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                      } transition-colors`}
                    >
                      <FiHeart />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-blue-600 font-medium">${product.price}</p>
                    <p className="text-sm text-gray-500">Size: {product.size}</p>
                    <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                    <div className="mt-4 flex space-x-2">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
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
          cartItems={cartItems}
          wishlistItems={wishlistItems}
        />
      )}
    </div>
  );
};

export default Shop;