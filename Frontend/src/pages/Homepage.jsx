import React from "react";
import { motion } from "framer-motion";

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
  const galleryItems = [
    {
      image:
        "https://i.pinimg.com/originals/fc/a8/8c/fca88c2bc0305b08491756591bd71db4.jpg",
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
  
  export default function Homepage() {
    return (
      <div className="bg-blue-300 min-h-screen h-max-[600px] flex flex-col justify-center items-center text-center px-1 gap-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sm:text-xl md:text-2xl text-shadow-gray-400 mt-20"
        >
          TRENDS THAT TALK TO YOU
        </motion.div>
  
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-4xl md:text-[3rem] lg:text-[90px] font-semibold text-shadow-gray-600 max-w-7xl mb-6"
        >
          Where style meets simplicity — Shop smarter, live better
        </motion.div>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-shadow-gray-300 max-w-2xl mb-8 font-extralight"
        >
          Virtual try-ons, smart returns, viral trends
          <br />
          this isn’t shopping, it’s sorcery
        </motion.div>
  
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-full shadow-md font-medium hover:bg-blue-100 transition"
        >
          Get Started
        </motion.button>
    <div className="h-[400px] w-full bg-amber-950 z-50 hidden">
        <h1>bruhh</h1>
    </div>
    
        <div className="w-full">
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
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center text-white font-bold text-xl opacity-0 group-hover:opacity-100">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
  