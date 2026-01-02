import React, { useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Bookdetailspop = ({ open, onClose, book }) => {
  if (!open || !book) return null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReadBook = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/history/add",
        {
          bookId: book.id || book.title,
          title: book.title,
          thumbnail: book.image || "",
          authors: book.authors || [],
        },
        { withCredentials: true }
      );
    } catch (err) {}

    // 🔥 GOOGLE BOOKS PREVIEW ONLY
    if (book.previewLink) {
      window.open(book.previewLink, "_blank");
    }
  };

  const handleFavorite = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:4000/api/user/favorite",
        {
          bookId: book.id || book.title,
          title: book.title,
          thumbnail: book.image || "",
          authors: book.authors || [],
        },
        { withCredentials: true }
      );
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[380px] rounded-xl shadow-xl p-5 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600"
        >
          ✖
        </button>

        <button
          onClick={handleFavorite}
          className="absolute top-3 left-3 text-xl text-red-500"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>

        <img
          src={book.image}
          alt={book.title}
          className="w-40 h-56 object-cover rounded mx-auto"
        />

        <h2 className="text-xl font-bold text-center mt-4">
          {book.title}
        </h2>

        <p className="text-center text-gray-600">
          {book.authors?.join(", ")}
        </p>

        <p className="text-sm text-gray-500 mt-3 line-clamp-4 text-center">
          {book.description}
        </p>

        <div className="flex justify-center mt-5">
          <button
            onClick={handleReadBook}
            className="px-4 py-2 bg-[#5A4B35] text-white rounded-md"
          >
            Read Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookdetailspop;
