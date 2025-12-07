import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Profile from "./components/Profile.jsx";
import Contact from "./components/Contact.jsx";
import Category from "./pages/Category";
import About from "./pages/About";
import Shop from "./pages/Shop";

// Remove this import if x.jsx is not needed
// import x from "./componenets/x";

const App = () => {
  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
