import React from "react";
import Navbar from "./components/Navbar.jsx";
import {Outlet} from "react-router-dom";


export default function Layout() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
}