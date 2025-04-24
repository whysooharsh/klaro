import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const handleLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-neutral-50 pt-12 pb-8 font-Grotesque border-t border-neutral-200 w-full"
        >
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col space-y-4"
                    >
                        <div className="flex items-center">
                            <img 
                                src="https://res.cloudinary.com/dpwqggym0/image/upload/c_thumb,w_200,g_face/v1745220359/logo_kkulrl.png" 
                                alt="Logo" 
                                className="h-10 w-10 rounded-xl"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/40x40/f5f5f5/333333?text=Logo";
                                }}
                            />
                            <span className="text-3xl font-bold text-gray-800">laro</span>
                        </div>
                        <p className="text-gray-600 mt-4 max-w-xs">Redefining fashion with sustainable and stylish clothing for the modern individual.</p>
                        <div className="flex space-x-4 mt-4">
                            {[
                                { id: 'facebook', url: 'https://facebook.com' },
                                { id: 'twitter', url: 'https://twitter.com' },
                                { id: 'instagram', url: 'https://instagram.com' },
                                { id: 'pinterest', url: 'https://pinterest.com' }
                            ].map((social) => (
                                <motion.a 
                                    key={social.id} 
                                    href={social.url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="text-gray-600 hover:text-black"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" clipRule="evenodd" />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

               
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col space-y-2"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
                        {[
                            { id: 'new-arrivals', label: 'New Arrivals', path: '/shop/new-arrivals' },
                            { id: 'best-sellers', label: 'Best Sellers', path: '/shop/best-sellers' },
                            { id: 'special-offers', label: 'Special Offers', path: '/shop/special-offers' },
                            { id: 'women', label: 'Women', path: '/shop/women' },
                            { id: 'partners', label: 'Partners', path: '/shop/partners' },
                            { id: 'sale', label: 'Sale', path: '/shop/sale' }
                        ].map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ x: 5 }}
                            >
                                <Link 
                                    to={item.path}
                                    className="text-gray-600 hover:text-black transition duration-300"
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col space-y-2"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
                        {[
                            { id: 'faq', label: 'FAQ', path: '/faq' },
                            { id: 'shipping', label: 'Shipping & Returns', path: '/shipping-returns' },
                            { id: 'contact', label: 'Contact Us', path: '/contact' },
                            { id: 'size-guide', label: 'Size Guide', path: '/size-guide' },
                            { id: 'privacy', label: 'Privacy Policy', path: '/privacy-policy' },
                            { id: 'terms', label: 'Terms of Service', path: '/terms' }
                        ].map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ x: 5 }}
                            >
                                <Link 
                                    to={item.path}
                                    onClick={handleLinkClick}
                                    className="text-gray-600 hover:text-black transition duration-300"
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col space-y-2"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                        {[
                            { id: 'login', label: 'Login', path: '/login' },
                            { id: 'about', label: 'About Us', path: '/about' },
                            { id: 'contact-quick', label: 'Contact', path: '/contact' }
                        ].map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ x: 5 }}
                            >
                                <Link 
                                    to={item.path}
                                    onClick={handleLinkClick}
                                    className="text-gray-600 hover:text-black transition duration-300"
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col space-y-4"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscribe</h3>
                        <p className="text-gray-600">Get the latest updates and offers.</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-neutral-800"
                            />
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-neutral-800 text-white px-4 py-2 rounded-r-md"
                            >
                                Submit
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
                >
                    <p className="text-sm text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} Klaro. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="AmEx" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
}