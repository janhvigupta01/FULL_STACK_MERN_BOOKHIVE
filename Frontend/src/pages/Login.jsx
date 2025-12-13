import { useState, useContext } from "react";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { serrverUrl } from "../main";
import AppContext from "../Context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { current } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${serrverUrl}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        await current();
        toast.success(data.message || "Login successful");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

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
          Login to Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <p
          onClick={() => navigate("/forgot-password")}
          className="text-center mt-4 text-gray-600 cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>

        {/* Signup */}
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
