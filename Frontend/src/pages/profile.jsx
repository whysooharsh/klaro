import React, { useState } from 'react';
import { FiUser, FiArrowLeft, FiMail, FiPhone, FiEdit, FiCamera, FiLogOut, FiSettings, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { user, logout } = useAuth();


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const tabs = [
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
    { id: 'orders', icon: <FiHeart />, label: 'Wishlist' },
    { id: 'settings', icon: <FiSettings />, label: 'Settings' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-950 text-gray-100 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-gray-400 hover:text-gray-100 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </motion.button>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:w-64 bg-gray-900 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <div className="p-6 border-b border-gray-800">
              <div className="relative mx-auto h-24 w-24 mb-4">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center overflow-hidden">
                  <FiUser className="h-12 w-12 text-gray-100" />
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full cursor-pointer shadow-lg"
                >
                  <FiCamera className="h-4 w-4 text-white" />
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-100">{user?.name || ''}</h3>
              <p className="text-sm text-center text-gray-400">Member since 24/04/2025</p>
            </div>
            
            <nav className="px-4 py-6">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <motion.li key={tab.id} whileHover={{ x: 5 }}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id 
                          ? 'bg-gradient-to-r from-blue-600/50 to-blue-600/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                          : 'text-gray-400 hover:text-gray-100'
                      }`}
                    >
                      <span className="mr-3 text-lg">{tab.icon}</span>
                      <span>{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div 
                          layoutId="activeTab"
                          className="ml-auto h-2 w-2 rounded-full bg-blue-400" 
                        />
                      )}
                    </button>
                  </motion.li>
                ))}
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="pt-4 mt-6 border-t border-gray-800"
                >
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FiLogOut className="mr-3 text-lg" />
                    <span>Logout</span>
                  </button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 bg-gray-900 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          >
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {activeTab === 'profile' && 'My Profile'}
                {activeTab === 'orders' && 'My Wishlist'}
                {activeTab === 'settings' && 'Settings'}
              </h2>
              {activeTab === 'profile' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 text-blue-400 transition-colors"
                >
                  <FiEdit />
                </motion.button>
              )}
            </div>
            
            <div className="p-6">
              {activeTab === 'profile' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="grid grid-cols-1 gap-8">
                    <motion.div variants={itemVariants} className="space-y-6">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">
                          Full Name
                        </label>
                        <div className="flex items-center">
                          <FiUser className="absolute left-3 text-gray-500" />
                          <input
                            type="text"
                            disabled={!isEditing}
                            defaultValue={user?.name || ''}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">
                          Email Address
                        </label>
                        <div className="flex items-center">
                          <FiMail className="absolute left-3 text-gray-500" />
                          <input
                            type="email"
                            disabled={!isEditing}
                            defaultValue={user?.email || ''}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">
                          Phone Number
                        </label>
                        <div className="flex items-center">
                          <FiPhone className="absolute left-3 text-gray-500" />
                          <input
                            type="tel"
                            disabled={!isEditing}
                            defaultValue={user?.phone || ''}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                          />
                        </div>
                      </div>
                      
                      {isEditing && (
                        <motion.div 
                          variants={fadeInVariants}
                          className="flex gap-4 pt-4"
                        >
                          <button 
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-3 px-4 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all"
                          >
                            Save Changes
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'orders' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="py-10 text-center"
                >
                  <motion.div variants={itemVariants} className="inline-block p-6 bg-gray-800 rounded-full mb-6">
                    <FiHeart className="h-12 w-12 text-gray-400" />
                  </motion.div>
                  <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-2">Your Wishlist is Empty</motion.h3>
                  <motion.p variants={itemVariants} className="text-gray-400 mb-6">
                    You haven't added any items to your wishlist yet.
                  </motion.p>
                  <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/shop')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white shadow-lg hover:shadow-blue-500/20 transition-all"
                  >
                    Browse Products
                  </motion.button>
                </motion.div>
              )}
              
              {activeTab === 'settings' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="space-y-8">
                    <motion.div variants={itemVariants} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium">Notifications</h3>
                        <p className="text-sm text-gray-400">Receive email notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium">Dark Mode</h3>
                        <p className="text-sm text-gray-400">Use dark theme</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium">Marketing Emails</h3>
                        <p className="text-sm text-gray-400">Receive promotional emails</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="pt-4">
                      <button 
                        className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all"
                      >
                        Save Preferences
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;