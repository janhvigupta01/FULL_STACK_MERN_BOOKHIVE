import React, { useState, useEffect, useContext } from "react";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";

import { MdHome, MdInfo, MdCategory, MdContactMail } from "react-icons/md";
import { RiShoppingBag3Line } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UniversalSearch from "../components/UniversalSearch";
import Bookdetailspop from "../components/Bookdetailspop";
import AppContext from "../Context/AppContext";
import { serrverUrl } from "../main";

const Nav = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // 🔥 Close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  // jab bhi user change ho (login / logout)
  setShowDropdown(false);
}, [user]);

  // 🔐 Logout
 const handleLogout = async () => {
  try {
    await axios.post(
      `${serrverUrl}/api/user/logout`,
      {},
      { withCredentials: true }
    );

    setUser(null);          // 🔥 clear user state
    setShowDropdown(false);
    navigate("/login");     // 🔥 go to login page
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full bg-[#592219] text-[#ABA293] sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 md:px-10 h-20 gap-3">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <HiMiniBuildingLibrary />
            <span>BookHive</span>
          </div>

          {/* SEARCH */}
          <div className="hidden md:block w-[40%]">
            <UniversalSearch
              placeholder="Search books or authors"
              rounded="full"
              onBookSelect={(book) => {
                setSelectedBook(book);
                setModalOpen(true);
              }}
            />
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-6 font-medium">
            <span onClick={() => navigate("/")} className="cursor-pointer">Home</span>
            <span onClick={() => navigate("/about")} className="cursor-pointer">About</span>
            <span onClick={() => navigate("/categories")} className="cursor-pointer">Category</span>
            <span onClick={() => navigate("/contact")} className="cursor-pointer">Contact</span>
            <Link to="/history">History</Link>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">
            <Link to="/favorites">
              <FaRegHeart className="text-xl cursor-pointer" />
            </Link>

            

            {/* PROFILE */}
            <div className="relative">
              <CgProfile
                className="text-xl cursor-pointer"
                onClick={() => {setMenuOpen(false);   setShowDropdown((p) => !p);}}
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-[#432819] rounded-xl shadow-xl z-50">
                  {!user ? (
                    <div
                      className="px-4 py-2 hover:bg-[#8D664A] cursor-pointer"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/login");
                      }}
                    >
                      Login
                    </div>
                  ) : (
                    <>
                      <div
                        className="px-4 py-2 hover:bg-[#8D664A] cursor-pointer"
                        onClick={() => {
                          setShowDropdown(false);
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-red-600 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE MENU ICON */}
            <button
              className="lg:hidden text-3xl"
              onClick={() => setMenuOpen((p) => !p)}
            >
              <IoMenu />
            </button>
          </div>
        </div>

        {/* 🔽 MOBILE DROPDOWN — OUTER BG REMOVED */}
        <div
          className={`absolute right-4 top-20 lg:hidden z-40 transition-all duration-300 ease-out
          ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}
        >
          {/* ❌ NO BACKGROUND WRAPPER */}
          <div className="flex flex-col gap-3">
            <GlassItem
  icon={<MdHome />}
  text="Home"
  onClick={() => {
    navigate("/");
    setMenuOpen(false);
  }}
/>

            <GlassItem icon={<MdInfo />} text="About" />
            <GlassItem icon={<MdCategory />} text="Category" onClick={() => navigate("/categories")} />
          
            <GlassItem icon={<MdContactMail />} text="Contact" onClick={() => navigate("/contact")} />
            <GlassItem icon={<FaRegHeart />} text="Favorites" onClick={() => navigate("/favorites")} />
          </div>
        </div>
      </div>

      {/* BOOK POPUP */}
      <Bookdetailspop
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        book={selectedBook}
      />
    </>
  );
};

/* 🔹 INDIVIDUAL MENU ITEM ONLY (NO OUTER BG) */
const GlassItem = ({ icon, text, onClick }) => (
  <div
    onClick={() => {
      onClick?.();
    }}
    className="flex items-center gap-3 px-5 py-2 rounded-xl
      bg-white/75 hover:bg-white text-[#3a2a1f]
      shadow-md transition cursor-pointer text-sm"
  >
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);


export default Nav;
