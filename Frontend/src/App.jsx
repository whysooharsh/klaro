import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Layout from "./layout";
import './main.css';
import Navbar from './components/Navbar';
import AllProducts from './pages/AllProducts';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/all-products" element={<AllProducts />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;