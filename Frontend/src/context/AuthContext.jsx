import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCart = localStorage.getItem('cart');
    const storedWishlist = localStorage.getItem('wishlist');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  useEffect(() => {
    if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (wishlist.length > 0) localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const login = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === userData.email && u.password === userData.password);
    
    if (user) {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(user => user.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    setCart([]);
    setWishlist([]);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    ));
  };

  const addToWishlist = (product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <AuthContext.Provider value={{
      user,
      cart,
      wishlist,
      login,
      signup,
      logout,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      addToWishlist,
      removeFromWishlist,
      clearCart
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 