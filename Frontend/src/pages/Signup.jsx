import React from "react";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <div className="bg-white w-[90%] sm:w-[450px] p-8 rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6 text-3xl font-bold">
          <HiMiniBuildingLibrary className="text-black" />
          <span>BookHive</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Your Account
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            className="bg-black text-white w-full py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
