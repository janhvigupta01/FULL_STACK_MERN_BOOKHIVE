import express from "express";


import { CurrentUserr } from "../controllers/currentuser.js";
import { isAuth } from "../middlewares/isAuth.js";

const authRouter = express.Router();

authRouter.get("/current", isAuth, CurrentUserr);

export default authRouter;