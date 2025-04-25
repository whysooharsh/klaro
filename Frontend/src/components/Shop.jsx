import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { LoadingSpinner, ErrorMessage, ProductGrid, Chatbot } from '../components';
import { ToastContainer } from 'react-hot-toast';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [lastViewedProduct, setLastViewedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // Show success toast
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.info('Item removed from cart');
  };

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems(prevItems => {
      if (prevItems.some(item => item.id === product.id)) {
        toast.info('Item already in wishlist');
        return prevItems;
      }
      toast.success(`${product.name} added to wishlist!`);
      return [...prevItems, product];
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.info('Item removed from wishlist');
  };

  const handleProductView = (product) => {
    setLastViewedProduct(product);
    // Track product view for recommendations
    trackProductView(product);
  };

  // Pass these handlers to the Chatbot component
  const chatbotHandlers = {
    onAddToCart: handleAddToCart,
    onRemoveFromCart: handleRemoveFromCart,
    onUpdateCartQuantity: handleUpdateCartQuantity,
    onAddToWishlist: handleAddToWishlist,
    onRemoveFromWishlist: handleRemoveFromWishlist,
    onProductView: handleProductView
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onProductView={handleProductView}
          />
        </div>
        <div className="lg:col-span-1">
          <Chatbot
            products={products}
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            lastViewedProduct={lastViewedProduct}
            handlers={chatbotHandlers}
          />
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Shop; 