import React, { useState } from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: "$89.99",
    image: "https://i.imgur.com/8tNPtLy.jpg",
    tag: "New",
    category: "Dresses",
    discount: "20% OFF"
  },
  {
    id: 2,
    name: "Casual Blouse",
    price: "$49.99",
    image: "https://i.imgur.com/qNOjJje.jpg",
    tag: "Bestseller",
    category: "Tops"
  },
  {
    id: 3,
    name: "High-Waisted Jeans",
    price: "$79.99",
    image: "https://i.imgur.com/XkHPUkW.jpg",
    tag: "Limited",
    category: "Bottoms"
  },
  {
    id: 4,
    name: "Leather Handbag",
    price: "$129.99",
    image: "https://i.imgur.com/ZmqQI1p.jpg",
    tag: "Premium",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Ankle Boots",
    price: "$99.99",
    image: "https://i.imgur.com/YHqVNeV.jpg",
    tag: "New",
    category: "Shoes"
  },
  {
    id: 6,
    name: "Evening Gown",
    price: "$199.99",
    image: "https://i.imgur.com/Q5qTQlQ.jpg",
    tag: "Premium",
    category: "Dresses"
  },
  {
    id: 7,
    name: "Summer Hat",
    price: "$39.99",
    image: "https://i.imgur.com/VkjWKVj.jpg",
    tag: "Accessory",
    category: "Accessories"
  },
  {
    id: 8,
    name: "Designer Sunglasses",
    price: "$149.99",
    image: "https://i.imgur.com/2LSxgOh.jpg",
    tag: "Luxury",
    category: "Accessories"
  },
  {
    id: 9,
    name: "Silk Scarf",
    price: "$45.99",
    image: "https://i.imgur.com/nZnWUc8.jpg",
    category: "Accessories"
  },
  {
    id: 10,
    name: "Maxi Dress",
    price: "$119.99",
    image: "https://i.imgur.com/L6o73Jt.jpg",
    category: "Dresses"
  },
  {
    id: 11,
    name: "Leather Jacket",
    price: "$199.99",
    image: "https://i.imgur.com/dV3kXHk.jpg",
    category: "Outerwear"
  },
  {
    id: 12,
    name: "Pleated Skirt",
    price: "$69.99",
    image: "https://i.imgur.com/wXuQ5hM.jpg",
    category: "Bottoms"
  },
  {
    id: 13,
    name: "Boho Style Dress",
    price: "$129.99",
    image: "https://i.imgur.com/JxPXBrJ.jpg",
    category: "Dresses"
  },
  {
    id: 14,
    name: "Classic White Shirt",
    price: "$59.99",
    image: "https://i.imgur.com/UW3WPPp.jpg",
    category: "Tops"
  },
  {
    id: 15,
    name: "Statement Necklace",
    price: "$79.99",
    image: "https://i.imgur.com/Y8m8LgF.jpg",
    category: "Accessories"
  },
  {
    id: 16,
    name: "Cocktail Dress",
    price: "$159.99",
    image: "https://i.imgur.com/v7KPMs3.jpg",
    category: "Dresses"
  },
  {
    id: 17,
    name: "Tote Bag",
    price: "$89.99",
    image: "https://i.imgur.com/ZFQUxGE.jpg",
    category: "Accessories"
  },
  {
    id: 18,
    name: "Summer Sandals",
    price: "$69.99",
    image: "https://i.imgur.com/kWq3UzX.jpg",
    category: "Shoes"
  },
  {
    id: 19,
    name: "Printed Blouse",
    price: "$54.99",
    image: "https://i.imgur.com/RzHtZdP.jpg",
    category: "Tops"
  },
  {
    id: 20,
    name: "Denim Jacket",
    price: "$89.99",
    image: "https://i.imgur.com/NkZF9h7.jpg",
    category: "Outerwear"
  }
];

const categories = ["All", "Dresses", "Tops", "Bottoms", "Accessories", "Shoes", "Outerwear"];

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" ? true : product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
    } else if (sortBy === "price-high-low") {
      return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
     
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            All Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-center"
          >
            Discover our complete collection of trendy fashion items
          </motion.p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x500?text=Product+Image";
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
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 h-full transition-all duration-300">
                  <div className="absolute bottom-4 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 flex justify-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-black p-2 rounded-full shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-black p-2 rounded-full shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-lg font-bold mt-1">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 