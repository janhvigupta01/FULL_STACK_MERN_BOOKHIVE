import React from 'react'
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
const Nav = () => {0
  return (
    <div className="w-full h-20 bg-black p-4 flex gap-8 justify-evenly ">
      <div className="text-white flex gap-1 items-center h-full w-[30%] text-3xl">
        <HiMiniBuildingLibrary />
        <div>BookHive</div>
      </div>
      <div className="w-[30%] h-full bg-white text-black flex items-center rounded-full p-4">
        <input type="text" placeholder="Search" className="h-full w-[85%]  rounded-lg"/>
        <IoMdSearch className="text-2xl font-semibold" />
      </div>
      <div className="w-[20%] h-full flex gap-8  justify-center items-center text-white text-2xl font-semibold">
        <CgProfile />
        <FaRegHeart />
      </div>
    </div>
  )
}

export default Nav
