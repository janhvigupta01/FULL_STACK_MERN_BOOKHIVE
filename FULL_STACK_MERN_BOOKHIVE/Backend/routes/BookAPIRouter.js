import express from "express";
import axios from "axios";

const router = express.Router();

// Fetch single book using Google API
router.get("/getbook/:id", async (req, res) => {
    try {
        const googleRes = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${req.params.id}`
        );

        res.json(googleRes.data);

    } catch (error) {
        console.log("Error fetching from Google API:", error.message);

        res.status(500).json({
            message: "Failed to fetch book data",
            error: error.message
        });
    }
});

export default router;
