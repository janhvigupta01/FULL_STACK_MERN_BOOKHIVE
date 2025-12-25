
export const searchAuthors = async (req, res) => {
  try {
    const query = req.query.q || "";

    const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}&maxResults=40`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      return res.status(200).json([]);
    }

    const authors = [];

    data.items.forEach(item => {
      const info = item.volumeInfo;

      if (!info.authors) return;

      info.authors.forEach(a => {
        authors.push(a);
      });
    });

    // Remove duplicates
    const unique = [...new Set(authors)];

    // Return formatted objects
    const formatted = unique.map(name => ({ name }));

    res.status(200).json(formatted);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
