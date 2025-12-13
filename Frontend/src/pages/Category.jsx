import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Category = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // These are the categories you want to show
  const categories = [
    "Popular Books",
    "Thriller",
    "Mystery",
    "Sci-Fi",
    "Fantasy",
    "Biography",
    "Poetry",
    "Romantic"
  ];

  // Default search terms for each category
  const searchQuery = {
    "Popular Books": "popular",
    Thriller: "thriller",
    Mystery: "mystery",
    "Sci-Fi": "science fiction",
    Fantasy: "fantasy",
    Biography: "biography",
    Poetry: "poetry",
    Romantic: "romance"
  };

  // Fetch books once at start
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const responses = await Promise.all(
          categories.map(cat =>
            fetch(
              `https://www.googleapis.com/books/v1/volumes?q=${searchQuery[cat]}&maxResults=8`
            )
          )
        );

        const data = await Promise.all(responses.map(res => res.json()));

        // Combine result: each category will get its own array
        let bookData = {};
        categories.forEach((cat, i) => {
          bookData[cat] = data[i].items || [];
        });

        setBooks(bookData);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#5A4B35]">
        Loading books...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECE7CA] flex justify-center p-6">

      {/* MAIN CENTER DIV */}
      <div className="w-full max-w-6xl bg-[#F0E4C8] p-6 rounded-xl shadow-lg flex flex-col items-center">

        {categories.map((cat, index) => (
          <div key={index} className="mb-16 w-full text-center">

            {/* CATEGORY HEADING */}
            <h1 className="text-3xl font-bold text-[#5A4B35] mb-6">
              {cat}
            </h1>

            {/* BOOK CARDS */}
            <div className="flex justify-center gap-6 flex-wrap">
              {books[cat].map((book, i) => (
                <Card
                  key={i}
                  title={book.volumeInfo?.title}
                  author={book.volumeInfo?.authors?.[0]}
                  image={book.volumeInfo?.imageLinks?.thumbnail}
                  rating={book.volumeInfo?.averageRating}
                  category={book.volumeInfo?.categories?.[0]}
                  description={book.volumeInfo?.description}
                />
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Category;
