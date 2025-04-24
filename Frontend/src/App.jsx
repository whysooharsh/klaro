import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './pages/shop';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Profile from './pages/profile';
import Homepage from './pages/Homepage';
import AllProducts from './pages/AllProducts';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import SizeGuide from './pages/SizeGuide';
import Terms from './pages/Terms';
import OrderConfirmation from './pages/OrderConfirmation';
import './main.css';
import Api from "./pages/Api";
import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-16"> 
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/tryon" element={<Api />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route 
                  path="/protected-path" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </div>
        </Router>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;