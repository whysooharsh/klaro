import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./layout";
import './main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Homepage/>}/>
        </Route>

      </Routes>
      
    </Router>
  );
}
export default App;