import express from "express"
import { Login, Logout, SignUp } from "../controllers/UserController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { CurrentUserr } from "../controllers/currentuser.js";

const userRouter  = express.Router();
userRouter.post("/SignUp",SignUp)
userRouter.post("/login",Login)
userRouter.post("/logout",Logout)
userRouter.post("/current",isAuth,CurrentUserr);

export default userRouter