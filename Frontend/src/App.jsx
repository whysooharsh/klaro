import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './pages/shop';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Profile from './pages/profile';
import Homepage from './pages/Homepage';
import AllProducts from './pages/AllProducts';
import Login from './pages/login';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import SizeGuide from './pages/SizeGuide';
import Terms from './pages/Terms';
import './main.css';
import Api from "./pages/Api";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16"> 
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/tryon" element={<Api />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;