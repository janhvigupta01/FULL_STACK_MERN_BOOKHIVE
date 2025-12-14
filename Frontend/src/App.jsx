import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./components/Contact.jsx";
import Category from "./pages/Category";
import About from "./pages/About";
import Shop from "./pages/Shop";
import BookDetails from "./pages/BookDetails";
import ForgotPassword from "./pages/ForgotPassword";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorBooks from "./pages/AuthorBooks";

const App = () => {
  return (
    <div>
      <Nav />

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            fontSize: "16px",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/author/:name" element={<AuthorBooks />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details" element={<BookDetails />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
