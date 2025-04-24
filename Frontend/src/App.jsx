import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import {
  Homepage,
  Shop,
  Wishlist,
  Cart,
  Profile,
  AllProducts,
  Login,
  About,
  Contact,
  FAQ,
  SizeGuide,
  Terms,
  OrderConfirmation,
  Api,
  Signup,
  Checkout,
  ProductDescription,
  MensProducts
} from './pages';
import './main.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

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
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <div className="pt-16"> 
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDescription />} />
                  <Route path="/mens-products" element={<MensProducts />} />
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
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
            </div>
          </Router>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;