import express from "express";
import Feedback from "../models/Feedback.model.js";

const router = express.Router();

/* SAVE FEEDBACK */
router.post("/feedback", async (req, res) => {
  try {
    const { name, text } = req.body;
    if (!name || !text) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const feedback = await Feedback.create({ name, text });
    res.json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* GET FEEDBACKS */
router.get("/feedback", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(20);
  res.json(feedbacks);
});

export default router;
