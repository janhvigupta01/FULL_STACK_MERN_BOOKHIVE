import React, { useState } from "react";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const Nav = () => {
  const [name, setName] = useState("");

  const apiCalling = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${name}`
      );
      const data = await res.json(); // important!
      console.log("API DATA:", data);

      // Optional: Print only titles
      if (data.items) {
        data.items.forEach((book) => {
          console.log("Book Title:", book.volumeInfo.title);
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-full h-20 bg-black p-4 flex gap-8 justify-evenly ">
      {/* Left Logo */}
      <div className="text-white flex gap-1 items-center h-full w-[30%] text-3xl">
        <IoMenu className="mr-4 " />
        <HiMiniBuildingLibrary />
        <div>BookHive</div>
      </div>

      {/* Search Box */}
      <div className="w-[30%] h-full bg-white text-black flex items-center rounded-full p-4">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Search"
          className="h-full w-[85%] rounded-lg outline-none"
        />
        <IoMdSearch
          onClick={apiCalling}
          className="text-2xl font-semibold cursor-pointer"
        />
      </div>

      {/* Right Icons */}
      <div className="w-[20%] h-full flex gap-6 justify-center items-center text-white text-2xl font-semibold">
        <IoSunnyOutline />
        <FaRegHeart />
        <FaRegBell />
        <CgProfile />
      </div>
    </div>
  );
};

export default Nav;
