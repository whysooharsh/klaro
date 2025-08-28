import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScrollZoomVideo from "../components/scrollZoom";
import Footer from "../components/footer";


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};


const trendingProducts = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "New",
    discount: "20% OFF"
  },
  {
    id: 2,
    name: "Casual Blouse",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Bestseller"
  },
  {
    id: 3,
    name: "High-Waisted Jeans",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Limited"
  },
  {
    id: 4,
    name: "Evening Gown",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Premium"
  },
  {
    id: 5,
    name: "Silk Wrap Dress",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "New"
  },
  {
    id: 6,
    name: "Pleated Midi Skirt",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Premium"
  },
  {
    id: 7,
    name: "Off-Shoulder Blouse",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Bestseller"
  },
  {
    id: 8,
    name: "Maxi Sundress",
    price: "$69.99",
    image: "https://imgs.search.brave.com/rERpjookOnjTqBAqCD-2ZDnV9jD7BJnImfc-l8H9DnY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFKNDNvZjJKMkwu/anBn",
    tag: "New"
  }
];

const mensFeaturedProducts = [
  {
    id: 1,
    name: "Classic Fit Shirt",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "New",
    discount: "15% OFF"
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Bestseller"
  },
  {
    id: 3,
    name: "Casual Blazer",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Premium"
  },
  {
    id: 4,
    name: "Leather Jacket",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tag: "Limited"
  }
];

const features = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2271/2271113.png",
    title: "Sustainable Materials",
    description: "Eco-friendly fabrics that reduce our carbon footprint"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/5362/5362001.png",
    title: "Virtual Try-On",
    description: "Try before you buy with our AR technology"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/411/411763.png",
    title: "Global Shipping",
    description: "Fast delivery to over 100 countries worldwide"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2107/2107956.png",
    title: "100% Money Back",
    description: "Not satisfied? Get a full refund within 30 days"
  }
];

const galleryItems = [
  {
    image: "https://i.pinimg.com/originals/fc/a8/8c/fca88c2bc0305b08491756591bd71db4.jpg",
    label: "Summer Vibes",
  },
  {
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600",
    label: "Urban Style",
  },
  {
    image: "https://honkytonky.in/cdn/shop/files/DR11432-5.jpg?v=1723526730&width=1000",
    label: "Elegant Fit",
  },
  {
    image: "https://img.freepik.com/free-photo/full-shot-smiley-woman-posing-outdoors_23-2150360973.jpg?semt=ais_hybrid&w=740",
    label: "Everyday Casual",
  },
  {
    image: "https://www.shutterstock.com/image-photo/generation-z-fashion-model-brunette-600nw-2316174663.jpg",
    label: "Bold & Bright",
  },
  {
    image: "https://www.fashiongonerogue.com/wp-content/uploads/2023/07/Neutral-Colors-Outfit.jpg",
    label: "Classic Neutrals",
  },
  {
    image: "https://www.thegoodtrade.com/wp-content/uploads/2024/10/eco-friendly-clothing-brands-outerknown-header.jpeg",
    label: "Eco Chic",
  },
  {
    image: "https://insiderdiva.com/wp-content/uploads/2019/01/gigi-hadid-4500x2822-photoshoot-2018-4k-14908-960x602.jpg",
    label: "Minimal Mood",
  },
];


const testimonials = [
  {
    name: "Riyan Parag",
    role: "Fashion Blogger",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "These clothes have completely transformed my wardrobe. The quality is exceptional and the styles are timeless yet trendy."
  },
  {
    name: "Richard",
    role: "Stylist",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "As a professional stylist, I recommend Claro to all my clients. Their attention to detail and commitment to sustainability is unmatched."
  },
  {
    name: "Danish ",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "The virtual try-on feature saved me so much time. I could see exactly how each piece would look on me before ordering!"
  }
];

const instagramPosts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
    caption: "Summer Collection '24",
    likes: 1234,
    username: "@klarofashion"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
    caption: "Street Style Essentials",
    likes: 892,
    username: "@klarostyle"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/2866119/pexels-photo-2866119.jpeg",
    caption: "Accessories Edit",
    likes: 1567,
    username: "@klaroaccessories"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg",
    caption: "Evening Wear Collection",
    likes: 2103,
    username: "@klarofashion"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/2887767/pexels-photo-2887767.jpeg",
    caption: "Casual Chic",
    likes: 1876,
    username: "@klarostyle"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/2887768/pexels-photo-2887768.jpeg",
    caption: "Weekend Vibes",
    likes: 1432,
    username: "@klarofashion"
  }
];

export default function Homepage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timer, setTimer] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const navigate = useNavigate();
  
  // Add parallax effects for hero section
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 0.3], [0, -5]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
      if (timer % 5 === 0) {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, testimonials.length]);

  const handleShopNow = () => {
    navigate('/shop');
    console.log('Shop Now clicked');
  };

  const handleExploreCollections = () => {
    navigate('/shop?category=all');
    console.log('Explore Collections clicked');
  };

  const handleMensCollection = () => {
    navigate('/mens-products');
  };

  return (
    <div className="flex flex-col items-center w-full">
   
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-black text-white py-2 text-center text-sm"
      >
        FREE SHIPPING ON ALL ORDERS OVER $75 | USE CODE: XQC99
      </motion.div>

      <motion.div 
        style={{ opacity, scale }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 w-full flex flex-col justify-center items-center px-4 gap-10 py-32 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-50 -z-10"
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            scale: [1, 1.4, 1],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-30 -z-10"
        />
        
        {/* New floating elements */}
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, -40, 0],
            rotate: [0, 20, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut"
          }}
          className="absolute top-40 left-20 w-32 h-32 bg-pink-400 rounded-full filter blur-3xl opacity-20 -z-10"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 right-20 w-64 h-64 bg-indigo-400 rounded-full filter blur-3xl opacity-20 -z-10"
        />

        {/* Enhanced text animations */}
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            textShadow: ["0px 0px 8px rgba(255,255,255,0.5)", "0px 0px 16px rgba(255,255,255,0.8)", "0px 0px 8px rgba(255,255,255,0.5)"]
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.2,
            textShadow: {
              repeat: Infinity,
              duration: 3
            }
          }}
          className="sm:text-xl md:text-2xl text-white font-light tracking-widest"
        >
          TRENDS THAT TALK TO YOU
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, y: -20, rotateX: 90 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            textShadow: ["0px 0px 10px rgba(255,255,255,0.3)", "0px 0px 20px rgba(255,255,255,0.6)", "0px 0px 10px rgba(255,255,255,0.3)"]
          }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.6,
            textShadow: {
              repeat: Infinity,
              duration: 4
            }
          }}
          className="text-xl sm:text-[4rem] md:text-[3rem] lg:text-[90px] font-bold text-white text-shadow-lg max-w-7xl text-center leading-tight relative"
        >
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              filter: "blur(0px)",
              color: ["#fff", "#ffbfdd", "#fff"]
            }}
            transition={{ 
              duration: 2,
              delay: 0.8,
              color: {
                repeat: Infinity,
                duration: 5
              }
            }}
          >
            Discover
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              filter: "blur(0px)",
              color: ["#fff", "#c3b1ff", "#fff"]
            }}
            transition={{ 
              duration: 2,
              delay: 1.2,
              color: {
                repeat: Infinity,
                duration: 5,
                delay: 1
              }
            }}
          >
            Your
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              filter: "blur(0px)",
              color: ["#fff", "#a6e3ff", "#fff"]
            }}
            transition={{ 
              duration: 2,
              delay: 1.6,
              color: {
                repeat: Infinity,
                duration: 5,
                delay: 2
              }
            }}
          >
            Style
          </motion.span>
          
          {/* Decorative elements around the heading */}
          <motion.div
            className="absolute -right-5 -top-10 opacity-70"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.4, 0.7, 0.4], 
              scale: 1,
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20,
              delay: 2,
              opacity: {
                repeat: Infinity,
                duration: 3
              },
              rotate: {
                repeat: Infinity,
                duration: 20,
                ease: "linear"
              }
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -left-5 bottom-0 opacity-70"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.4, 0.7, 0.4], 
              scale: 1,
              rotate: [0, -360]
            }}
            transition={{ 
              duration: 20,
              delay: 2.2,
              opacity: {
                repeat: Infinity,
                duration: 4
              },
              rotate: {
                repeat: Infinity,
                duration: 25,
                ease: "linear"
              }
            }}
          >
            ✨
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: y3 }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: ["drop-shadow(0px 0px 0px rgba(255,255,255,0))", "drop-shadow(0px 0px 5px rgba(255,255,255,0.5))", "drop-shadow(0px 0px 0px rgba(255,255,255,0))"]
          }}
          transition={{ 
            duration: 1.2, 
            delay: 1.8,
            filter: {
              repeat: Infinity,
              duration: 4
            }
          }}
          className="text-base sm:text-lg md:text-xl text-white/90 text-shadow-lg max-w-2xl font-light text-center"
        >
          Explore our latest collection of trendy and sustainable fashion pieces
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 2.2 
          }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 0px 15px rgba(255,255,255,0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"]
            }}
            transition={{
              boxShadow: {
                repeat: Infinity,
                duration: 3
              }
            }}
            className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg font-medium hover:bg-blue-50 transition text-lg"
            onClick={() => navigate('/shop')}
          >
            Shop Now
          </motion.button>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 0px 15px rgba(255,255,255,0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"]
            }}
            transition={{
              boxShadow: {
                repeat: Infinity,
                duration: 3,
                delay: 1.5
              }
            }}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full shadow-lg font-medium hover:bg-white/10 transition text-lg relative overflow-hidden group"
            onClick={() => navigate('/shop')}
          >
            <span className="relative z-10">Explore Collections</span>
            <motion.div 
              className="absolute inset-0 bg-white/10 -z-0" 
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

   
      <div className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Shop by Category
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                name: "Dresses",
                image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              },
              {
                name: "Tops",
                image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              },
              {
                name: "Bottoms",
                image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              },
              {
                name: "Outerwear",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              }
            ].map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <h3 className="absolute bottom-4 left-0 right-0 text-center text-white text-xl font-bold z-20">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

   
      <div className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/all-products')}
              className="text-black border-b-2 border-black pb-1 hidden md:block"
            >
              View All Products →
            </motion.button>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/shop?product=${product.id}`)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4 h-[400px]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
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
                </div>
                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-lg font-bold mt-1">{product.price}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/all-products')}
              className="bg-neutral-800 text-white px-5 py-3 rounded-full font-medium"
            >
              View All Products
            </motion.button>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Why Choose Us
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-16 h-16 mx-auto mb-4"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/64x64/f5f5f5/333333?text=Icon";
                  }}
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="w-full px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 bg-gradient-to-br from-white via-gray-50 to-gray-100"
      >
        {galleryItems.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{
              scale: 1.08,
              rotate: 2,
              boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="aspect-square overflow-hidden rounded-xl shadow-xl group cursor-pointer relative transform transition-all duration-300 ease-in-out"
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-500 ease-in-out"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/400x400/f5f5f5/333333?text=${encodeURIComponent(item.label)}`;
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center text-white font-bold text-xl opacity-0 group-hover:opacity-100">
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>


      <div className="w-full py-20 bg-blue-300">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            What Our Customers Say
          </motion.h2>
          
          <div className="relative h-80">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: currentTestimonial === idx ? 1 : 0,
                  x: currentTestimonial === idx ? 0 : 100
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center text-center p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl"
                style={{ display: currentTestimonial === idx ? 'flex' : 'none' }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-blue-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/64x64/f5f5f5/333333?text=${encodeURIComponent(testimonial.name[0])}`;
                    }}
                  />
                </div>
                <p className="text-xl italic mb-6">"{testimonial.text}"</p>
                <h3 className="text-lg font-bold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-3 h-3 rounded-full ${currentTestimonial === idx ? 'bg-blue-600' : 'bg-blue-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full py-16 bg-neutral-900 text-white"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-neutral-300 mb-8">Stay updated with the latest trends, new arrivals, and exclusive offers.</p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-6 py-3 rounded-full border-2 border-white text-white focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition"
            >
              Subscribe
            </motion.button>
          </div>
          
          <p className="text-neutral-400 text-sm mt-4">By subscribing, you agree to our Privacy Policy</p>
        </div>
      </motion.div>

      <div className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Follow Us on Instagram</h2>
            <p className="text-gray-600 text-center max-w-2xl">Get inspired by our community and share your style with #KlaroStyle</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {instagramPosts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              >
                <img 
                  src={post.image}
                  alt="Instagram post" 
                  className="w-full h-full object-cover hover:brightness-75 transition"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x400/f5f5f5/333333?text=Instagram+Post";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                  <p className="text-white font-medium text-sm mb-2">{post.caption}</p>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center text-white">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {post.likes.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-white text-xs mt-2">{post.username}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <motion.a 
              href="https://www.instagram.com/klaroclothing" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="text-black text-lg font-medium border-b-2 border-black pb-1 inline-flex items-center"
            >
              @Klaroclothing
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full bg-gradient-to-r from-pink-50 to-purple-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Women's Latest Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our curated selection of premium women's fashion designed for comfort, style, and confidence.</p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
          
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:w-1/3 text-left"
            >
              <h3 className="text-2xl font-bold mb-4">Elevate Your Style</h3>
              <ul className="space-y-4">
                {["Sustainable materials", "Ethically sourced", "Designer quality", "Perfect fit guarantee"].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <span className="mr-2 text-pink-500">✓</span> {item}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-md font-medium mt-8 hover:from-pink-600 hover:to-purple-600 transition"
                onClick={() => navigate('/shop?category=women')}
              >
                Shop Women's Collection
              </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="md:w-2/3 w-full max-w-3xl overflow-hidden rounded-2xl relative"
            >
          
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mix-blend-multiply blur-xl opacity-70 z-0"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply blur-xl opacity-60 z-0"
              />
              
          
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white"
              >
                <ScrollZoomVideo />
                
         
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-6 text-white"
                >
                  <p className="text-sm uppercase tracking-widest">Summer 2023</p>
                  <h4 className="text-xl font-bold">Exclusive Women's Collection</h4>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="w-full py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Men's Collection
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mensFeaturedProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4 h-[400px]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
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
                </div>
                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-lg font-bold mt-1">{product.price}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMensCollection}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              View All Men's Collection
            </motion.button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
  
