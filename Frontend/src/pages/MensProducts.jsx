import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { Virtuoso } from 'react-virtuoso';

const mensProducts = [
  {
    id: 1,
    name: "Classic Fit Shirt",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "New",
    category: "Shirts",
    discount: "15% OFF"
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Bestseller",
    category: "Pants"
  },
  {
    id: 3,
    name: "Casual Blazer",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Premium",
    category: "Outerwear"
  },
  {
    id: 4,
    name: "Leather Jacket",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Limited",
    category: "Outerwear"
  },
  {
    id: 5,
    name: "Polo Shirt",
    price: "$45.99",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "New",
    category: "Shirts"
  },
  {
    id: 6,
    name: "Chino Pants",
    price: "$69.99",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Bestseller",
    category: "Pants"
  }
];

const categories = ["All", "Shirts", "Pants", "Outerwear", "Accessories"];

const ProductCard = React.memo(({ product, onAddToCart, index }) => {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay: Math.min(index * 0.1, 1)
      }}
      className="group cursor-pointer"
      layout
    >
      <div className="relative overflow-hidden rounded-xl mb-4 h-[400px] bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/400x600/f5f5f5/333333?text=${encodeURIComponent(product.name)}`;
          }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
            <button
              className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              onClick={(e) => onAddToCart(product, e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <button
              className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <h3 className="font-medium text-lg">{product.name}</h3>
      <p className="text-lg font-bold mt-1">{product.price}</p>
    </motion.div>
  );
});

export default function MensProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart();

  const handleAddToCart = useCallback((product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  }, [addToCart]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = selectedCategory === "All" 
      ? mensProducts 
      : mensProducts.filter(product => product.category === selectedCategory);

    if (sortBy === "price-low-high") {
      return [...filtered].sort((a, b) => 
        parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
    } else if (sortBy === "price-high-low") {
      return [...filtered].sort((a, b) => 
        parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
    }
    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Men's Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-center"
          >
            Discover our complete collection of men's fashion essentials
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="default">Sort by</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredAndSortedProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 