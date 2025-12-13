import axios from "axios";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { serrverUrl } from "../main";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // show / hide password
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${serrverUrl}/api/user/send-otp`,
        { email },
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success(result.data.message || "OTP sent successfully!");
        setStep(2);
      } else toast.error(result.data.message || "Failed to send OTP.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while sending OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${serrverUrl}/api/user/verify`,
        { email, otp },
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success(result.data.message || "OTP verified!");
        setStep(3);
      } else toast.error(result.data.message || "Invalid OTP.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while verifying OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmpassword)
      return toast.error("Passwords do not match!");

    try {
      setLoading(true);
      const result = await axios.post(
        `${serrverUrl}/api/user/reset-password`,
        { email, password },
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success(result.data.message || "Password reset successful!");
        navigate("/login");
      } else toast.error(result.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while resetting password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 
    bg-gradient-to-br from-green-300 via-gray-300 to-green-200">

      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl w-full max-w-md p-8 border border-green-200">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <IoMdArrowBack
            onClick={() => navigate(-1)}
            size={30}
            className="text-green-600 hover:scale-105 transition cursor-pointer"
          />
          <h1 className="text-xl font-bold text-green-700">Forgot Password</h1>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full border border-green-300 rounded-lg px-3 py-2
              focus:outline-none focus:border-green-600 shadow-sm"
              placeholder="Enter your Email"
            />

            <button
              onClick={handleSendOtp}
              className="w-full font-semibold mt-4 flex items-center justify-center py-2 rounded-lg 
              bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition shadow-md"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Send OTP"}
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter OTP
            </label>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              className="w-full border border-green-300 rounded-lg px-3 py-2 
              focus:outline-none focus:border-green-600 shadow-sm"
              placeholder="Enter your OTP"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full font-semibold mt-4 flex items-center justify-center py-2 rounded-lg 
              bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition shadow-md"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Verify OTP"}
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            {/* Password */}
            <label className="block text-gray-700 font-medium mb-1">
              Enter New Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPass ? "text" : "password"}
                className="w-full border border-green-300 rounded-lg px-3 py-2 
                focus:outline-none focus:border-green-600 shadow-sm"
                placeholder="Enter new password"
              />
              <span
                className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <label className="block text-gray-700 font-medium mb-1 mt-4">
              Confirm Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmpassword}
                type={showPass2 ? "text" : "password"}
                className="w-full border border-green-300 rounded-lg px-3 py-2 
                focus:outline-none focus:border-green-600 shadow-sm"
                placeholder="Confirm Password"
              />
              <span
                className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer"
                onClick={() => setShowPass2(!showPass2)}
              >
                {showPass2 ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full font-semibold mt-4 flex items-center justify-center py-2 rounded-lg 
              bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition shadow-md"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Change Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;