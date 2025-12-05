import React, { useState } from "react";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import {MdHome} from "react-icons/md";
import {MdInfo} from "react-icons/md";
import {MdCategory} from "react-icons/md";
import {RiShoppingBag3Line} from "react-icons/ri";
import {MdContactMail} from "react-icons/md";


const Nav = () => {
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const apiCalling = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${name}`
      );
      const data = await res.json();
      console.log("API DATA:", data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
  <div className="w-full h-fit px-4 md:px-10 shadow-md sticky top-0 z-50 bg-[#ECE7CA] text-[#5A4B35]">

    <div className="h-20 flex items-center justify-between gap-3">

      {/* LEFT LOGO */}
      <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer">
        <HiMiniBuildingLibrary className="text-[#C8AD7E]" />
        <span className="hidden sm:block">BookHive</span>
      </div>

      {/* SEARCH BAR SHOW ON ALL SCREEN SIZES */}
      <div className="flex items-center w-[45%] bg-[#F5F5DD] border border-[#DACAA4] rounded-full px-4 py-2 shadow-sm">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Search"
          className="bg-transparent w-full outline-none text-[#5A4B35] placeholder-[#A79574]"
        />
        <IoMdSearch
          onClick={apiCalling}
          className="text-2xl text-[#C8AD7E] cursor-pointer hover:text-[#A79574]"
        />
      </div>

      {/* RIGHT ITEMS */}
      <div className="flex items-center gap-6">

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-6 text-md font-medium">
          <span className="hover:text-[#C8AD7E] transition">Home</span>
          <span className="hover:text-[#C8AD7E] transition">About</span>
          <span className="hover:text-[#C8AD7E] transition">Category</span>
          <span className="hover:text-[#C8AD7E] transition">Shop</span>
          <span className="hover:text-[#C8AD7E] transition">Contact</span>
        </div>

        {/* ICONS */}
        <FaRegHeart className="cursor-pointer hover:text-[#C8AD7E] text-xl" />
        <FaRegBell className="cursor-pointer hover:text-[#C8AD7E] text-xl" />
        <CgProfile className="cursor-pointer hover:text-[#C8AD7E] text-xl" />

        {/* MENU ICON FOR MOBILE */}
        <div
          className="lg:hidden text-3xl cursor-pointer text-[#5A4B35]"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <IoMenu />
        </div>
      </div>
    </div>

    {/* MOBILE DROPDOWN BELOW MENU ICON */}
    {menuOpen && (
      <div className="absolute right-4 top-20 flex flex-col gap-3 z-40">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-b-[#ECE7CA] border-transparent mx-auto"></div>
        <div className="dropCard fade delay-1 flex items-center gap-2"><MdHome />Home</div>
        <div className="dropCard fade delay-2 flex items-center gap-2"><MdInfo />About</div>
        <div className="dropCard fade delay-3 flex items-center gap-2"><MdCategory />Category</div>
        <div className="dropCard fade delay-4 flex items-center gap-2"><RiShoppingBag3Line />Shop</div>
        <div className="dropCard fade delay-5 flex items-center gap-2"><MdContactMail />Contact</div>
      </div>
    )}

  </div>
);

};


export default Nav;