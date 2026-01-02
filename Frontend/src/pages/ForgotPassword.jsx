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

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  /* ================= API HANDLERS (UNCHANGED) ================= */

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serrverUrl}/api/user/send-otp`,
        { email },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "OTP sent");
        setStep(2);
      } else toast.error(res.data.message);
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serrverUrl}/api/user/verify`,
        { email, otp },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("OTP verified");
        setStep(3);
      } else toast.error("Invalid OTP");
    } catch {
      toast.error("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmpassword)
      return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const res = await axios.post(
        `${serrverUrl}/api/user/reset-password`,
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Password reset successful");
        navigate("/login");
      } else toast.error(res.data.message);
    } catch {
      toast.error("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030b17] px-4">

      {/* CARD */}
      <div
        className="
          w-full max-w-md p-8 rounded-3xl
          bg-[#030b17]
          shadow-[10px_10px_25px_#01060d,-10px_-10px_25px_#061b3a]
        "
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <IoMdArrowBack
            onClick={() => navigate(-1)}
            className="text-slate-300 cursor-pointer hover:text-white"
            size={26}
          />
          <h1 className="text-lg font-semibold text-slate-200">
            Forgot Password
          </h1>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <NeoLabel>Email</NeoLabel>
            <NeoInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <NeoButton onClick={handleSendOtp} loading={loading}>
              Send OTP
            </NeoButton>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <NeoLabel>Enter OTP</NeoLabel>
            <NeoInput
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <NeoButton onClick={handleVerifyOtp} loading={loading}>
              Verify OTP
            </NeoButton>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <NeoLabel>New Password</NeoLabel>
            <NeoPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              show={showPass}
              toggle={() => setShowPass(!showPass)}
            />

            <NeoLabel className="mt-4">Confirm Password</NeoLabel>
            <NeoPassword
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              show={showPass2}
              toggle={() => setShowPass2(!showPass2)}
            />

            <NeoButton onClick={handleResetPassword} loading={loading}>
              Change Password
            </NeoButton>
          </>
        )}
      </div>
    </div>
  );
};

/* ================= NEUMORPHIC COMPONENTS ================= */

const NeoLabel = ({ children, className = "" }) => (
  <label className={`block text-sm text-slate-400 mb-1 ${className}`}>
    {children}
  </label>
);

const NeoInput = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="
      w-full mb-6 px-5 py-3 rounded-xl
      bg-[#030b17] text-slate-200 placeholder-slate-500
      shadow-[inset_4px_4px_8px_#01060d,inset_-4px_-4px_8px_#061b3a]
      focus:outline-none
    "
  />
);

const NeoPassword = ({ value, onChange, show, toggle }) => (
  <div className="relative mb-6">
    <input
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder="Password"
      className="
        w-full px-5 py-3 rounded-xl
        bg-[#030b17] text-slate-200 placeholder-slate-500
        shadow-[inset_4px_4px_8px_#01060d,inset_-4px_-4px_8px_#061b3a]
        focus:outline-none
      "
    />
    <span
      onClick={toggle}
      className="absolute right-4 top-3 text-slate-400 cursor-pointer"
    >
      {show ? <AiFillEyeInvisible /> : <AiFillEye />}
    </span>
  </div>
);

const NeoButton = ({ children, onClick, loading }) => (
  <button
    onClick={onClick}
    className="
      w-full py-3 rounded-full font-semibold
      bg-[#FACC15] text-[#020617]
      shadow-[6px_6px_12px_#01060d,-6px_-6px_12px_#061b3a]
      active:shadow-[inset_4px_4px_8px_#c9a40a,inset_-4px_-4px_8px_#ffe88a]
      transition
    "
  >
    {loading ? <ClipLoader size={20} color="#020617" /> : children}
  </button>
);

export default ForgotPassword;
