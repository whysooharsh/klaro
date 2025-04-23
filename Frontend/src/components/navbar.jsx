import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            
            // Show navbar if scrolling up or at top of page
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <motion.nav 
            className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : '-100%' }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold">
                        KLARO
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                            Home
                        </Link>
                        <Link to="/shop" className="text-gray-700 hover:text-black transition-colors">
                            Shop
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-black transition-colors">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-black transition-colors">
                            Contact
                        </Link>
                        <Link to="/login" className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/shop"
                            className="block px-3 py-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                            Shop
                        </Link>
                        <Link
                            to="/about"
                            className="block px-3 py-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-3 py-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            to="/login"
                            className="block px-3 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}

export default Navbar;