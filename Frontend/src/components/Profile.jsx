import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit, FiSave, FiLogOut } from "react-icons/fi";
import BooksImage from "../assets/books.jpg";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    memberSince: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F5DD] flex justify-center items-center p-4">

      {/* COMPACT CARD */}
      <div
        className="
          flex bg-[#FDF8F0] rounded-2xl overflow-hidden 
          max-w-3xl w-full shadow-[0_6px_16px_rgba(210,195,165,0.45)]
          transform transition-all duration-700 hover:scale-[1.01]
      "
      >

        {/* LEFT SMALL IMAGE SECTION */}
        <div className="w-[35%] bg-[#F5F5DD] flex justify-center items-center p-4">
          <img
            src={BooksImage}
            alt="Books"
            className="w-[70%] h-auto object-contain"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[65%] p-6 flex flex-col">

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-20 w-20 rounded-full border-2 border-[#D1BB91] object-cover shadow-md"
              />
            ) : (
              <FaUserCircle size={70} className="text-black" />
            )}

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Edit Photo */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="mt-2 text-sm flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md hover:opacity-80 transition"
            >
              <FiEdit size={14} />
              Edit Photo
            </button>
          </div>

          {/* TITLE */}
          <h1
            className="text-2xl font-bold text-center mt-4 mb-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#D1BB91",
            }}
          >
            My Profile
          </h1>

          {/* SMALL FORM FIELDS */}
          <div className="space-y-3 text-black">

            {/* NAME */}
            <div>
              <h2 className="font-semibold text-sm">Full Name</h2>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full text-sm border border-[#d8c9a8] rounded-md px-2 py-2 bg-[#F8F4EB]"
              />
            </div>

            {/* EMAIL */}
            <div>
              <h2 className="font-semibold text-sm">Email</h2>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-sm border border-[#d8c9a8] rounded-md px-2 py-2 bg-[#F8F4EB]"
              />
            </div>

            {/* PHONE */}
            <div>
              <h2 className="font-semibold text-sm">Phone</h2>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-sm border border-[#d8c9a8] rounded-md px-2 py-2 bg-[#F8F4EB]"
              />
            </div>

            {/* MEMBER SINCE */}
            <div>
              <h2 className="font-semibold text-sm">Member Since</h2>
              <input
                type="text"
                name="memberSince"
                placeholder="Month Year"
                value={formData.memberSince}
                onChange={handleChange}
                className="w-full text-sm border border-[#d8c9a8] rounded-md px-2 py-2 bg-[#F8F4EB]"
              />
            </div>

          </div>

          {/* SMALL BUTTONS */}
          <div className="mt-6 flex justify-between">

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1 px-4 py-1.5 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
            >
              {isEditing ? <FiSave size={14} /> : <FiEdit size={14} />}
              {isEditing ? "Save" : "Edit"}
            </button>

            <button
              className="flex items-center gap-1 px-4 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
            >
              <FiLogOut size={14} />
              Logout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
