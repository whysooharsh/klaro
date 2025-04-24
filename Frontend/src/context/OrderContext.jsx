import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const { user, clearCart } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const createOrder = (cart, shippingDetails, paymentDetails) => {
    try {
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newOrder = {
        id: orderId,
        items: cart,
        shippingDetails,
        paymentDetails,
        status: 'pending',
        createdAt: new Date().toISOString(),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };

      setOrders(prevOrders => [...prevOrders, newOrder]);

      return {
        success: true,
        orderId: orderId,
        order: newOrder
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create order'
      };
    }
  };

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getAllOrders = () => {
    return orders;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status } 
          : order
      )
    );
  };

  const value = {
    orders,
    createOrder,
    getOrder,
    getAllOrders,
    updateOrderStatus
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}; 