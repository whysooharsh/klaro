import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUpload, FiLoader, FiShoppingBag } from 'react-icons/fi';
import { products } from '../data/products';

const Api = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showProductGrid, setShowProductGrid] = useState(true);

  const convertImageToSupportedFormat = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(blob);
      });
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      });
    } catch (error) {
      console.error('Error converting image:', error);
      throw new Error('Failed to convert image to supported format');
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowProductGrid(false);
  };

  const ApiCall = async (e) => {
    e.preventDefault();
    
    if (!selectedProduct || !avatarFile) {
      setError("Please select a product and upload your avatar image");
      return;
    }

    setLoading(true);
    setError("");

    try {
 
      const convertedProductImage = await convertImageToSupportedFormat(selectedProduct.image);
      
      const formData = new FormData();
      formData.append('avatar_image', avatarFile);
      formData.append('clothing_image', convertedProductImage);

      const apiResponse = await axios({
        method: 'POST',
        url: 'https://try-on-diffusion.p.rapidapi.com/try-on-file',
        headers: {
          'x-rapidapi-key': '869e4473d5mshb84af8c0b5f74d0p154271jsn1ccab6e066de',
          'x-rapidapi-host': 'try-on-diffusion.p.rapidapi.com'
        },
        responseType: 'blob',
        data: formData
      });

      const url = URL.createObjectURL(apiResponse.data);
      setImage(url);
    } catch (error) {
      console.error('API Error:', error);
      setError("Failed to process images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          Virtual Try-On
        </motion.h1>

        {showProductGrid ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              <FiShoppingBag className="inline-block mr-2" />
              Select a Product to Try On
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleProductSelect(product)}
                  className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border-2 ${
                    selectedProduct?.id === product.id ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <p className="text-blue-500 font-medium">${product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={ApiCall}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div 
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
              >
                <label className="block text-lg font-medium text-gray-700">
                  <FiShoppingBag className="inline-block mr-2" />
                  Selected Product
                </label>
                <div className="border-2 border-gray-200 rounded-lg p-6">
                  {selectedProduct && (
                    <div className="text-center">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <h3 className="mt-4 font-medium text-gray-800">{selectedProduct.name}</h3>
                      <p className="text-blue-500 font-medium">${selectedProduct.price}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div 
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
              >
                <label className="block text-lg font-medium text-gray-700">
                  Upload Your Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer block"
                  >
                    <div className="text-gray-500">
                      <FiUpload className="mx-auto h-12 w-12" />
                      <p className="mt-2">Click to upload your photo</p>
                    </div>
                  </label>
                </div>
              </motion.div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              >
                {error}
              </motion.div>
            )}

            <div className="flex gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProductGrid(true)}
                className="flex-1 py-3 px-4 rounded-lg text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 transition-colors shadow-lg"
              >
                Change Product
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-3 px-4 rounded-lg text-white font-medium ${
                  loading ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500'
                } transition-colors shadow-lg`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <FiLoader className="animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  'Try On'
                )}
              </motion.button>
            </div>
          </motion.form>
        )}

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Try-On Result</h2>
            <img
              src={image}
              alt="Try-on result"
              className="max-h-96 mx-auto rounded-lg shadow-lg"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Api;