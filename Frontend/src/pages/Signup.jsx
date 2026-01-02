import { useState } from "react";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { serrverUrl } from "../main";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serrverUrl}/api/user/Signup`,
        { name, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        toast.error("Signup failed");
      }
    } catch {
      toast.error("Signup error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#030b17] px-4">

      {/* CARD */}
      <div
        className="
          w-full max-w-md p-10 rounded-3xl
          bg-[#030b17]
          shadow-[10px_10px_25px_#01060d,-10px_-10px_25px_#061b3a]
        "
      >
        {/* LOGO */}
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-8">
          <HiMiniBuildingLibrary />
          <span>BookHive</span>
        </div>

        {/* TITLE */}
        <h2 className="text-center text-xl text-slate-300 font-semibold mb-8">
          Create Your Account
        </h2>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-6">

          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Full Name
            </label>
            <NeoInput
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Email
            </label>
            <NeoInput
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-1 block">
              Password
            </label>
            <NeoInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-full font-semibold
              bg-[#FACC15] text-[#020617]
              shadow-[6px_6px_12px_#01060d,-6px_-6px_12px_#061b3a]
              active:shadow-[inset_4px_4px_8px_#c9a40a,inset_-4px_-4px_8px_#ffe88a]
              transition
            "
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-6 text-sm text-slate-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-white cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

/* 🔹 SAME INPUT STYLE AS LOGIN & CONTACT */
const NeoInput = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="
      w-full px-5 py-3 rounded-xl
      bg-[#030b17]
      text-slate-200 placeholder-slate-500
      shadow-[inset_4px_4px_8px_#01060d,inset_-4px_-4px_8px_#061b3a]
      focus:outline-none
    "
  />
);

export default Signup;
