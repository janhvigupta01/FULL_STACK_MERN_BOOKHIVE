import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./componenets/Nav.jsx";
import { Routes, Route } from "react-router-dom";
import Footer from "./componenets/Footer";
import Profile from "./componenets/Profile";
import Contact from "./componenets/Contact";
import x from "./componenets/x";
const App = () => {
  return (
<<<<<<< Updated upstream
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/*<Footer /> */}
    </div>
    // <div>
    //   {/* <Profile/> */}
    //   <Contact/>
    // </div>
=======
    // <div>
    //   <Nav />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //   </Routes>
    //   <Footer />
    // </div>
   <div>
    {/* <Profile/> */}
    {/* <Contact/> */}
    <x/>
   </div>
>>>>>>> Stashed changes
  );
};

export default App;
