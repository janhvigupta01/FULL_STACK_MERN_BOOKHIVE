// src/pages/AuthorBooks.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bookdetailspop from "../components/Bookdetailspop"; // ✅ ADDED

const fallbackCover =
  "https://via.placeholder.com/200x300.png?text=Not+Available";

// --- BookFallbackCard Component ---
const BookFallbackCard = ({ title, year }) => (
  <div className="w-full h-full flex flex-col justify-center items-center bg-[#DBCBB5] text-[#473628] rounded-xl p-3 text-center border-2 border-[#A67344]/50 relative overflow-hidden">
    <span className="text-4xl mb-2">📚</span>
    <p className="font-bold text-sm line-clamp-3">{title}</p>
    <p className="text-xs mt-1 opacity-80">({year})</p>

    <div
      className="
        absolute inset-0 bg-black/60 opacity-0 
        group-hover:opacity-100 transition-all duration-300
        flex items-end justify-start p-3
      "
    >
      <span className="text-white text-sm font-bold">
        View Details &rarr;
      </span>
    </div>
  </div>
);
// --- End BookFallbackCard ---


const AuthorBooks = () => {
  const { name } = useParams();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // ✅ already present

  // Handlers for the modal
  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${name}&maxResults=40`
        );
        const data = await res.json();

        if (data.items) {
          setBooks(
            data.items.map(book => ({
              // Card data
              title: book.volumeInfo.title ?? "Unknown Title",
              image: book.volumeInfo.imageLinks?.thumbnail,
              year: book.volumeInfo.publishedDate?.substring(0, 4) ?? "—",

              // Popup data
              authors: book.volumeInfo.authors,
              description: book.volumeInfo.description,
              language: book.volumeInfo.language,
              category: book.volumeInfo.categories?.[0],
              previewLink: book.volumeInfo.previewLink,
            }))
          );
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [name]);

  // Component for rendering a single book card
  const BookCard = ({ b, index }) => {
    const [imageFailed, setImageFailed] = useState(!b.image);

    const handleImageError = () => {
      setImageFailed(true);
    };

    return (
      <div
        key={index}
        className="flex flex-col items-center w-[150px] 
        cursor-pointer group relative"
        onClick={() => handleBookClick(b)} // ✅ opens popup
      >
        <div
          className="
          w-full h-[225px] rounded-xl overflow-hidden relative
          transition-all duration-300 ease-out 
          transform 
          shadow-xl border-2 border-transparent hover:border-4 hover:border-yellow-400/50 
          group-hover:scale-[1.07] group-hover:-translate-y-2
          shadow-2xl hover:shadow-[0_15px_30px_rgba(0,0,0,0.35)]
          "
        >
          {imageFailed ? (
            <BookFallbackCard title={b.title} year={b.year} />
          ) : (
            <>
              <img
                src={b.image || fallbackCover}
                alt={b.title}
                className="w-full h-full object-cover rounded-[10px]"
                onError={handleImageError}
              />

              <div
                className="
                absolute inset-0 bg-gradient-to-t 
                from-black/60 to-transparent opacity-0 
                group-hover:opacity-100 transition-all duration-300
                flex items-end justify-start p-3
                "
              >
                <span className="text-white text-sm font-bold">
                  View Details &rarr;
                </span>
              </div>
            </>
          )}
        </div>

        <p
          className="
          text-[17px] font-bold text-[#3A2B21] 
          text-center mt-4 leading-snug line-clamp-2 
          group-hover:text-[#A67344] transition-colors
          "
        >
          {b.title}
        </p>

        <span className="text-base text-[#927A66] mt-1 font-medium">
          {b.year}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] px-10 py-16">
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black text-[#473628] tracking-wider border-b-4 border-b-current/10 inline-block pb-1">
          {name} 📖
        </h1>
        <p className="text-[#927A66] text-xl font-medium mt-3 italic">
          The complete collection
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-y-16 gap-x-8 justify-items-center">
        {books.length === 0 ? (
          <p className="text-center col-span-full text-2xl font-semibold text-[#473628] py-20">
            No books found for this author 😔
          </p>
        ) : (
          books.map((b, index) => <BookCard b={b} index={index} key={index} />)
        )}
      </div>

      {/* ✅ BOOK DETAILS POPUP (ONLY ADDITION) */}
      <Bookdetailspop
        open={Boolean(selectedBook)}
        book={selectedBook}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AuthorBooks;
