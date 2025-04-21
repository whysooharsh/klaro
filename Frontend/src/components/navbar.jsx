import { motion } from "framer-motion";
import React from "react"
export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md sticky top-0 left-0 z-50 font-Grotesque"
        >
            <div className="container mx-auto px-2 py-5 flex justify-between items-center shadow-black">
              
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-2xl font-bold text-gray-800 cursor-pointer "
                >   <div className="flex">
                   {/* <img src="https://res.cloudinary.com/dpwqggym0/image/upload/c_thumb,w_200,g_face/v1745220359/logo_kkulrl.png" alt="Logo" className="h-12 w-12 rounded-2xl" /> */}
                    <div className="text-4xl">laro</div>
                    </div>
                </motion.div>
                

                <motion.ul className="hidden ml-auto mr-20 md:flex gap-20">
                    {["Home", "Shop", "About", "Contact"].map((item, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ scale: 1.1, color: "black" }}
                            className="text-gray-600 font-medium cursor-pointer"
                        >
                            {item}
                        </motion.li>
                    ))}
                </motion.ul>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-neutral-800 text-white px-4 py-2 rounded-[8px] shadow hover:bg-neutral-900"
                >
                    Login
                </motion.button>

         
                <div className="md:hidden">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-600 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
}