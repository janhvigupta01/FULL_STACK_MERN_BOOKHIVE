import express from "express"
import { Login, Logout, resetPassword, sendOtp, SignUp, updateProfile, verifyOtp } from "../controllers/UserController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { CurrentUserr } from "../controllers/currentuser.js";
import upload from "../middlewares/multer.js";

const userRouter  = express.Router();
userRouter.post("/SignUp",SignUp)
userRouter.post("/login",Login)
userRouter.post("/logout",Logout)
userRouter.post("/current",isAuth,CurrentUserr);
userRouter.put(
  "/update-profile",
  isAuth,
  upload.single("image"),
  isAuth,
  updateProfile
);
userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify", verifyOtp);
userRouter.post("/reset-password", resetPassword);

export default userRouter