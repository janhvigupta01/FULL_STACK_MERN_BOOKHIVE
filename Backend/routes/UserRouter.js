import express from "express";
import {
  Login,
  Logout,
  resetPassword,
  sendOtp,
  SignUp,
  updateProfile,
  verifyOtp,
  toggleFavorite,
  getFavorites
} from "../controllers/UserController.js";

import { isAuth } from "../middlewares/isAuth.js";
import { CurrentUserr } from "../controllers/currentuser.js";
import upload from "../middlewares/multer.js";

const userRouter  = express.Router();

/* ================= AUTH ================= */
userRouter.post("/SignUp", SignUp);
userRouter.post("/login", Login);
userRouter.post("/logout", Logout);
userRouter.post("/current", isAuth, CurrentUserr);

/* ================= PROFILE ================= */
userRouter.put(
  "/update-profile",
  isAuth,
  upload.single("image"),
  isAuth,
  updateProfile
);

/* ================= OTP ================= */
userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify", verifyOtp);
userRouter.post("/reset-password", resetPassword);

/* ================= FAVORITES ================= */
userRouter.post("/favorite", isAuth, toggleFavorite);
userRouter.get("/favorites", isAuth, getFavorites);

export default userRouter;
