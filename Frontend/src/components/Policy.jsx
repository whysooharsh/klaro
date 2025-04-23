import React from 'react'
import { FaExchangeAlt, FaShieldAlt, FaTruck, FaCreditCard } from 'react-icons/fa'
import { motion } from 'framer-motion'


const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

export const Policy = () => {
  return (
    <motion.section
      className="bg-white py-20 px-6 sm:px-12 md:px-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Shop With Us?
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-gray-700"
        variants={containerVariants}
      >
        <PolicyCard
          icon={<FaExchangeAlt size={40} className="text-indigo-600 mx-auto mb-4" />}
          title="Easy Exchanges"
          description="Not in love? Exchange within 14 days — no questions asked!"
        />
        <PolicyCard
          icon={<FaShieldAlt size={40} className="text-indigo-600 mx-auto mb-4" />}
          title="Secure Checkout"
          description="Your data is safe with us. Fully encrypted & PCI-compliant."
        />
        <PolicyCard
          icon={<FaTruck size={40} className="text-indigo-600 mx-auto mb-4" />}
          title="Fast & Free Shipping"
          description="Free shipping on all orders over $50. Always fast. Always tracked."
        />
        <PolicyCard
          icon={<FaCreditCard size={40} className="text-indigo-600 mx-auto mb-4" />}
          title="Flexible Payments"
          description="Pay now or later. We accept all major cards & Klarna, too."
        />
      </motion.div>
    </motion.section>
  )
}

const PolicyCard = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-default"
    variants={cardVariants}
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 200 }}
  >
    {icon}
    <h3 className="font-semibold text-lg md:text-xl mb-2">{title}</h3>
    <p className="text-sm md:text-base text-gray-500 max-w-xs">{description}</p>
  </motion.div>
)
