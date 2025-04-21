import React from "react";
import { motion } from "framer-motion";

export default function Homepage() {
    return (
        <div className="bg-blue-300 min-h-screen flex flex-col justify-center items-center text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-shadow-gray-400 mb-2"
            >
                Trends that talk to you
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-shadow-gray-600 max-w-5xl mb-6"
            >
                Where style meets simplicity — shop smarter, live better
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-lg md:text-xl text-shadow-gray-400 max-w-2xl mb-8"
            >
                Virtual try-ons, smart returns, viral trends — this isn’t shopping, it’s sorcery
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-3 rounded-full shadow-md font-medium hover:bg-blue-100 transition"
            >
                Get Started
            </motion.button>
        </div>
    );
}
