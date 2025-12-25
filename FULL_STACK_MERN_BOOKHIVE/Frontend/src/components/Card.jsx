import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Bookdetailspop from "../components/Bookdetailspop";

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  /* ---------- FETCH BOOKS ---------- */
  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:4000/api/category-books/${encodeURIComponent(
        categoryName
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-[#ABA293] px-10 py-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-4xl font-bold text-[#592219]">
            {categoryName} Books
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="
              px-6 py-2 rounded-xl
              bg-[#ABA293] text-[#592219] font-semibold
              shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
              hover:scale-105 transition
            "
          >
            ← Back
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-xl text-[#7A6A4A]">
            Loading books...
          </p>
        )}

        {/* BOOK GRID */}
        {!loading && books.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-12 justify-items-center">
            {books.map((book, index) => {
              const info = book.volumeInfo;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedBook({
                      title: info.title,
                      authors: info.authors || ["Unknown"],
                      image:
                        info.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/200",
                      previewLink: info.previewLink,
                      description:
                        info.description || "No description available",
                      language: info.language || "Unknown",
                      category: categoryName,
                      year: info.publishedDate?.substring(0, 4),
                    });
                    setModalOpen(true);
                  }}
                  className="flex flex-col items-center w-[150px] cursor-pointer group"
                >
                  <div
                    className="
                      w-full h-[225px] rounded-xl overflow-hidden
                      bg-[#ABA293]
                      shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
                      group-hover:scale-105 transition
                    "
                  >
                    <img
                      src={
                        info.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/200x300"
                      }
                      alt={info.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <p
                    className="
                      mt-4 text-sm font-semibold text-[#592219]
                      text-center line-clamp-2
                      group-hover:text-[#A37F5F] transition
                    "
                  >
                    {info.title}
                  </p>

                  <span className="text-xs text-[#7A6A4A] text-center line-clamp-1">
                    {info.authors?.join(", ") || "Unknown Author"}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY */}
        {!loading && books.length === 0 && (
          <p className="text-center text-xl text-[#7A6A4A]">
            No books found in this category.
          </p>
        )}
      </div>

      {/* BOOK POPUP */}
      <Bookdetailspop
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default CategoryBooks;
