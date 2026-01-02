import express from "express";

const router = express.Router();

const subjects = [
  "Fiction",
  "Romance",
  "Mystery",
  "Thriller",
  "Fantasy",
  "Science Fiction",
  "Biography",
  "Self Help",
  "Health",
  "Psychology",
  "Philosophy",
  "History",
  "Business",
  "Economics",
  "Finance",
  "Technology",
  "Programming",
  "Education",
  "Politics",
  "Law",
  "Religion",
  "Spirituality",
  "Children",
  "Young Adult",
  "Poetry",
  "Art",
  "Music",
  "Travel",
  "Cooking",
];

router.get("/categories", (req, res) => {
  res.json(
    subjects.map((subject) => ({
      name: subject,
    }))
  );
});
router.get("/category-books/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
      category
    )}&maxResults=20`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data.items || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category books" });
  }
});


export default router;
