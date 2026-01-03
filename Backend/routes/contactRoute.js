import express from "express";
import {
  submitContact,
  getAllContacts,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", getAllContacts); // optional (admin)

export default router;
