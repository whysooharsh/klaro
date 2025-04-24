import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Virtuoso } from 'react-virtuoso';
import Loading from '../components/Loading';

const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: "$89.99",
    image: "https://images.pexels.com/photos/2058664/pexels-photo-2058664.jpeg",
    tag: "New",
    category: "Dresses",
    discount: "20% OFF"
  },
  {
    id: 2,
    name: "Casual Blouse",
    price: "$49.99",
    image: "https://imgs.search.brave.com/Q3GqEmlnhl_1iI5OnLtqNqLlXpkB1Zd3yzuMxovQu_E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS1jbGRucnkucy1u/YmNuZXdzLmNvbS9p/bWFnZS91cGxvYWQv/dF9maXQtMzIwdyxm/X2F1dG8scV9hdXRv/OmJlc3QvbmV3c2Nt/cy8yMDI0XzQzLzE5/ODY5OTEvNDFnaXBu/Zm1ueGwtc2w1MDAt/NjQ0MTU5NjM1ZjZh/My5qcGc",
    tag: "Bestseller",
    category: "Tops"
  },
  {
    id: 3,
    name: "High-Waisted Jeans",
    price: "$79.99",
    image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg",
    tag: "Limited",
    category: "Bottoms"
  },
  {
    id: 4,
    name: "Leather Handbag",
    price: "$129.99",
    image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg",
    tag: "Premium",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Ankle Boots",
    price: "$99.99",
    image: "https://www.charleskeith.in/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-in-products/default/dw4ae2b2d3/images/hi-res/2022-L6-CK1-90280042-05-8.jpg?sw=756&sh=1008",
    tag: "New",
    category: "Shoes"
  },
  {
    id: 6,
    name: "Evening Gown",
    price: "$199.99",
    image: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg",
    tag: "Premium",
    category: "Dresses"
  },
  {
    id: 7,
    name: "Summer Hat",
    price: "$39.99",
    image: "https://images.pexels.com/photos/1078975/pexels-photo-1078975.jpeg",
    tag: "Accessory",
    category: "Accessories"
  },
  {
    id: 8,
    name: "Designer Sunglasses",
    price: "$149.99",
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg",
    tag: "Luxury",
    category: "Accessories"
  },
  {
    id: 9,
    name: "Silk Scarf",
    price: "$45.99",
    image: "https://images.pexels.com/photos/6764032/pexels-photo-6764032.jpeg",
    category: "Accessories"
  },
  {
    id: 10,
    name: "Maxi Dress",
    price: "$119.99",
    image: "https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg",
    category: "Dresses"
  },
  {
    id: 11,
    name: "Leather Jacket",
    price: "$199.99",
    image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
    category: "Outerwear"
  },
  {
    id: 12,
    name: "Pleated Skirt",
    price: "$69.99",
    image: "https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg",
    category: "Bottoms"
  },
  {
    id: 13,
    name: "Boho Style Dress",
    price: "$129.99",
    image: "https://images.pexels.com/photos/4946409/pexels-photo-4946409.jpeg",
    category: "Dresses"
  },
  {
    id: 14,
    name: "Classic White Shirt",
    price: "$59.99",
    image: "https://images.pexels.com/photos/6764007/pexels-photo-6764007.jpeg",
    category: "Tops"
  },
  {
    id: 15,
    name: "Statement Necklace",
    price: "$79.99",
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
    category: "Accessories"
  },
  {
    id: 16,
    name: "Cocktail Dress",
    price: "$159.99",
    image: "https://imgs.search.brave.com/iUTUMXSsvTMwjMzr0g2XtjLtq20AjhiU34wudM0lpC4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzgwNjc0NTcvci9p/b9mMWY4NGUvMzEy/OTYzMjI3Ny9pbF82/MDB4NjAwLjMxMjk2/MzIyNzdfNXFpNi5q/cGc",
    category: "Dresses"
  },
  {
    id: 17,
    name: "Tote Bag",
    price: "$89.99",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    category: "Accessories"
  },
  {
    id: 18,
    name: "Summer Sandals",
    price: "$69.99",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    category: "Shoes"
  },
  {
    id: 19,
    name: "Nigga",
    price: "$54.99",
    image: "https://images.pexels.com/photos/6311158/pexels-photo-6311158.jpeg",
    category: "Tops"
  },
  {
    id: 20,
    name: "Denim Jacket",
    price: "$89.99",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    category: "Outerwear"
  }
];

const categories = ["All", "Dresses", "Tops", "Bottoms", "Accessories", "Shoes", "Outerwear"];

// Separate ProductCard component for better performance
const ProductCard = React.memo(({ product, onAddToCart, index }) => {
  const { cart, wishlist, addToWishlist, removeFromWishlist } = useAuth();
  
  // Get quantity of this product in cart
  const cartQuantity = useMemo(() => {
    const cartItem = cart.find(item => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  }, [cart, product.id]);

  // Check if product is in wishlist
  const isInWishlist = useMemo(() => {
    return wishlist.some(item => item.id === product.id);
  }, [wishlist, product.id]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay: Math.min(index * 0.1, 1) // Cap maximum delay at 1 second
      }}
      className="group cursor-pointer relative"
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
              className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors relative"
              onClick={(e) => onAddToCart(product, e)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartQuantity > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartQuantity}
                </div>
              )}
            </button>
            <button
              className={`bg-white p-3 rounded-full shadow-lg transition-colors ${
                isInWishlist ? 'text-red-500 hover:bg-red-50' : 'text-black hover:bg-gray-100'
              }`}
              onClick={handleWishlistToggle}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill={isInWishlist ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
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

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useAuth();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = useCallback((product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  }, [addToCart]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = selectedCategory === "All" 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    if (sortBy === "price-low-high") {
      return [...filtered].sort((a, b) => 
        parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
    } else if (sortBy === "price-high-low") {
      return [...filtered].sort((a, b) => 
        parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
    }
    return filtered;
  }, [selectedCategory, sortBy]);

  if (isLoading) {
    return <Loading />;
  }

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
            All Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-center"
          >
            Discover our complete collection of trendy fashion items
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