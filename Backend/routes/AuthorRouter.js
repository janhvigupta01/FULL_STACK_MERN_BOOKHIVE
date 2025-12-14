import express from "express";
import { searchAuthors } from "../controllers/AuthorController.js";


const router = express.Router();
router.get("/", searchAuthors);
// router.get("/search-authors", searchAuthors);

export default router;
