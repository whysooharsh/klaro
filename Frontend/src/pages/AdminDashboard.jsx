import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/'); // Redirect non-admins
      return;
    }
    // Fetch all products
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts);

    // Fetch all orders (admin)
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(setOrders);
  }, [user, navigate]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <ul>
          {products.map(prod => (
            <li key={prod._id}>
              {prod.name} - ₹{prod.price}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              Order #{order._id} | User: {order.user?.email || 'N/A'} | Status: {order.status}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
