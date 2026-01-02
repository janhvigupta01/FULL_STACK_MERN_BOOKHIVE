import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";

import Profile from "./pages/Profile.jsx";
import Contact from "./components/Contact.jsx";
import Category from "./pages/Category";
import About from "./pages/About";
import Shop from "./pages/Shop";
import BookDetails from "./pages/BookDetails";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorBooks from "./pages/AuthorBooks";
import CategoryBooks from "./pages/CategoryBooks";
import Categories from "./pages/Categories";
import History from "./pages/History";
import SearchResults from "./pages/SearchPage.jsx";
import Favorites from "./pages/Favorites";
import Feedback from "./pages/Feedback";

import AppContext from "./Context/AppContext";

const App = () => {
  const { user } = useContext(AppContext);
  const location = useLocation();

  // ❌ Routes where footer should NOT appear
  const hideFooterRoutes = ["/login", "/signup", "/forgot-password"];

  const isAuthRoute = hideFooterRoutes.includes(location.pathname);
  const shouldShowFooter = !isAuthRoute && Boolean(user);

  return (
    <div className="min-h-screen flex flex-col bg-[#ABA293]">
      
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

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryBooks />} />

          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/author/:name" element={<AuthorBooks />} />

          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />

          <Route path="/details" element={<BookDetails />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>

      {/* ✅ FOOTER */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;
