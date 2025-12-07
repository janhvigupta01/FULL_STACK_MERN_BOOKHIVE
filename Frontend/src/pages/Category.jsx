import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Category = () => {
  
  const categories = [
    { name: "Popular Books", query: "popular" },
    { name: "Thriller", query: "thriller" },
    { name: "Mystery", query: "mystery" },
    { name: "Sci-Fi", query: "sci-fi" },
    { name: "Fantasy", query: "fantasy" },
    { name: "Biography", query: "biography" },
    { name: "Poetry", query: "poetry" },
    { name: "Romantic", query: "romantic" }
  ];

  const [books, setBooks] = useState({});

  useEffect(() => {

    const fetchCategoryBooks = async () => {
      for (let cat of categories) {
        try {
          const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${cat.query}&maxResults=8`
          );
          const data = await res.json();

          setBooks(prev => ({
            ...prev,
            [cat.name]: data.items || []
          }));
        } catch (error) {
          console.log("Error fetching:", error);
        }
      }
    };

    fetchCategoryBooks();

  }, []);

  return (
    <div className="min-h-screen bg-[#ECE7CA] flex justify-center p-6">

      {/* Main Center Wrapper */}
      <div className="bg-[#E8DCC2] w-full max-w-5xl p-6 rounded-xl shadow-md flex flex-col items-center">

        {categories.map((cat, index) => (
          <div key={index} className="mb-12 w-full text-center">

            {/* Category Heading */}
            <h1 className="text-3xl font-bold text-[#5A4B35] mb-6">
              {cat.name}
            </h1>

            {/* Cards Section */}
            <div className="flex justify-center gap-6 flex-wrap">
              
              {books[cat.name]?.length > 0 ? (
                
                books[cat.name].map((book, i) => (
                  <Card
                    key={i}
                    title={book.volumeInfo?.title || "No Title"}
                    author={book.volumeInfo?.authors?.[0] || "Unknown"}
                    image={book.volumeInfo?.imageLinks?.thumbnail}
                  />
                ))
              
              ) : (
                <p className="text-[#5A4B35]">Loading...</p>
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Category;
