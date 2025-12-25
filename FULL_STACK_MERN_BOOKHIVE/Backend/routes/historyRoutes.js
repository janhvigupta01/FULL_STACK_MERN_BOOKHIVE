import express from "express";
import {
  addRecentlyViewed,
  getRecentlyViewed,
} from "../controllers/UserController.js";

import { isAuthHistory } from "../middlewares/isAuthHistory.js";

const router = express.Router();

router.post("/add", isAuthHistory, addRecentlyViewed);
router.get("/", isAuthHistory, getRecentlyViewed);

export default router;
