import React, { useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Bookdetailspop = ({ open, onClose, book }) => {
  // ✅ HOOKS HAMESHA TOP PAR
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ CONDITIONAL RETURN HOOKS KE BAAD
  if (!open || !book) return null;

  // UNIQUE ID
  const generatedBookId =
    book.title.replace(/\s+/g, "-").toLowerCase();

  /* ================= READ BOOK ================= */
  const handleReadBook = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/history/add",
        {
          bookId: generatedBookId,
          title: book.title,
          thumbnail: book.image || "",
          authors: book.authors || [],
        },
        { withCredentials: true }
      );
    } catch {}

    // 🔥 LOCAL BOOK OR GOOGLE BOOK CHECK
    if (book.localFile) {
      navigate(`/read/${book.localFile}`);
    } else {
      window.open(book.previewLink, "_blank");
    }
  };

  /* ================= FAVORITE ================= */
  const handleFavorite = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:4000/api/user/favorite",
        {
          bookId: generatedBookId,
          title: book.title,
          thumbnail: book.image || "",
          authors: book.authors || [],
        },
        { withCredentials: true }
      );
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999]">
      <div className="bg-white w-[380px] rounded-xl shadow-xl p-5 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg"
        >
          ✖
        </button>

        {/* Favorite */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 left-3 text-xl text-red-500"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Image */}
        <img
          src={book.image || "https://via.placeholder.com/200"}
          className="w-40 h-56 mx-auto object-cover rounded"
          alt={book.title}
        />

        <h2 className="text-xl font-bold text-center mt-4">
          {book.title}
        </h2>

        <p className="text-center text-gray-700">
          {book.authors?.join(", ") || "Unknown"}
        </p>

        <p className="text-sm text-center mt-2 line-clamp-4">
          {book.description}
        </p>

        <div className="flex justify-center mt-5">
          <button
            onClick={handleReadBook}
            className="px-4 py-2 bg-[#5A4B35] text-white rounded"
          >
            Read Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookdetailspop;
