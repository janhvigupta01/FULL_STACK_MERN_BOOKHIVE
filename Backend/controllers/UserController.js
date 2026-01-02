import { GenToken } from "../config/Gentoken.js";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { sendOtpMail } from "../utils/mail.js";

/* ===================== AUTH ===================== */

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Something is missing" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = await GenToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "strict",
      secure: false,
    });

    res.json({ success: true, user: newUser });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Something is missing" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = await GenToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "strict",
      secure: false,
    });

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

export const Logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logout successful" });
};

/* ===================== PROFILE ===================== */

export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const updatedData = {};
    if (name) updatedData.name = name;
    if (phone) updatedData.phone = phone;
    if (req.file?.path) updatedData.image = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updatedData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

/* ===================== OTP ===================== */

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendOtpMail(email, otp);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.resetOtp !== otp ||
      user.otpExpires < Date.now()
    ) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();
    res.json({ success: true, message: "OTP verified" });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.json({
        success: false,
        message: "OTP verification required",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.isOtpVerified = false;

    await user.save();
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

/* ======================================================
   🕒 HISTORY FEATURE (RECENTLY VIEWED BOOKS)
   ====================================================== */

export const addRecentlyViewed = async (req, res) => {
  try {
    const { bookId, title, thumbnail, authors } = req.body;

    if (!bookId) {
      return res.json({ success: false, message: "Book ID required" });
    }

    const user = await User.findById(req.userId);

    // remove duplicate
    user.recentlyViewed = user.recentlyViewed.filter(
      (item) => item.bookId !== bookId
    );

    // add latest
    user.recentlyViewed.unshift({
      bookId,
      title,
      thumbnail,
      authors,
    });

    // keep only last 10
    user.recentlyViewed = user.recentlyViewed.slice(0, 10);

    await user.save();
    res.json({ success: true, message: "History updated" });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

export const getRecentlyViewed = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      success: true,
      history: user.recentlyViewed,
    });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

/* ======================================================
   ❤️ FAVORITES FEATURE
   ====================================================== */

export const toggleFavorite = async (req, res) => {
  try {
    const { bookId, title, thumbnail, authors } = req.body;

    if (!bookId) {
      return res.json({ success: false, message: "Book ID required" });
    }

    const user = await User.findById(req.userId);

    const exists = user.favorites.find(
      (item) => item.bookId === bookId
    );

    if (exists) {
      user.favorites = user.favorites.filter(
        (item) => item.bookId !== bookId
      );
    } else {
      user.favorites.push({
        bookId,
        title,
        thumbnail,
        authors,
      });
    }

    await user.save();
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};
