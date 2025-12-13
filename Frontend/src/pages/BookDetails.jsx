import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const BookDetails = () => {
  const { state } = useLocation();
  const book = state?.book;

  const [showMore, setShowMore] = useState(false);
  const [similarBooks, setSimilarBooks] = useState([]);

  // Fetch similar books based on category
  useEffect(() => {
    if (!book?.category) return;

    const fetchSimilar = async () => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${book.category}&maxResults=6`
      );
      const data = await res.json();
      setSimilarBooks(data.items || []);
    };

    fetchSimilar();
  }, [book]);

  if (!book) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl text-[#5A4B35]">
        No details found.
      </div>
    );
  }

  const shortText =
    book.description?.slice(0, 300) + (book.description?.length > 300 ? "..." : "");

  return (
    <div className="min-h-screen bg-[#ECE7CA] flex flex-col items-center p-6">

      {/* BOOK DETAILS CARD */}
      <div className="bg-[#F0E4C8] max-w-4xl w-full rounded-2xl shadow-xl p-6 mb-12">

        <img
          src={book.image}
          alt={book.title}
          className="w-60 h-80 object-cover rounded-xl mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold text-[#5A4B35] text-center mb-3">
          {book.title}
        </h1>

        <p className="text-center text-lg text-[#7A6A4A] mb-4">
          {book.author}
        </p>

        <div className="flex justify-center gap-4 mb-4">
          <span className="px-4 py-1 bg-[#C8AD7E] text-white rounded-full">
            ⭐ {book.rating}
          </span>
          <span className="px-4 py-1 bg-[#E3D8B7] text-[#5A4B35] rounded-full">
            {book.category}
          </span>
        </div>

        {/* DESCRIPTION WITH READ MORE / LESS */}
        <p className="text-[#5A4B35] leading-7 text-center whitespace-pre-wrap">
          {showMore ? book.description : shortText}
        </p>

        {book.description && book.description.length > 300 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-4 text-[#C8AD7E] font-semibold hover:text-[#A79574]"
          >
            {showMore ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* SIMILAR BOOKS SECTION */}
      <h2 className="text-2xl font-bold text-[#5A4B35] mb-6">
        Similar Books You Might Like
      </h2>

      <div className="flex justify-center flex-wrap gap-6 max-w-5xl">
        {similarBooks.map((item, index) => (
          <Card
            key={index}
            title={item.volumeInfo?.title}
            author={item.volumeInfo?.authors?.[0]}
            image={item.volumeInfo?.imageLinks?.thumbnail}
            rating={item.volumeInfo?.averageRating}
            category={item.volumeInfo?.categories?.[0]}
            description={item.volumeInfo?.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
