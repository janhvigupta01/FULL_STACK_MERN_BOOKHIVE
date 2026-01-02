import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Bookdetailspop from "../components/Bookdetailspop";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [popupLoading, setPopupLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH FAVORITES ================= */
  const fetchFavorites = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/user/favorites",
        { withCredentials: true }
      );
      setFavorites(res.data.favorites || []);
    } catch (error) {
      console.log("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  /* ================= REMOVE FAVORITE ================= */
  const removeFavorite = async (bookId) => {
    try {
      await axios.post(
        "http://localhost:4000/api/user/favorite",
        { bookId },
        { withCredentials: true }
      );

      setFavorites((prev) =>
        prev.filter((item) => item.bookId !== bookId)
      );
    } catch (error) {
      console.log("Remove failed");
    }
  };

  /* ================= OPEN BOOK POPUP ================= */
  const handleOpenBook = async (book) => {
    setPopupLoading(true);

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
          book.title
        )}&maxResults=1`
      );
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const b = data.items[0].volumeInfo;

        setSelectedBook({
          title: b.title,
          image: b.imageLinks?.thumbnail,
          authors: b.authors,
          description: b.description,
          language: b.language,
          category: b.categories?.[0],
          previewLink: b.previewLink,
          year: b.publishedDate?.substring(0, 4),
        });
      }
    } catch (error) {
      console.log("Failed to fetch book details");
    } finally {
      setPopupLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading favorites...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-[#F7F4ED] px-6 py-10 relative">

        {/* 🔙 BACK BUTTON (ADDED) */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute top-6 right-6
            px-5 py-2 rounded-full
            bg-[#473628] text-white font-semibold
            hover:bg-[#5a4335] transition-all
            shadow-md
          "
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-center mb-8 text-[#5A4B35]">
          ❤️ My Favorite Books
        </h1>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-600">
            No favorite books yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((book) => (
              <div
                key={book.bookId}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative cursor-pointer"
                onClick={() => handleOpenBook(book)}
              >
                {/* Remove Favorite */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(book.bookId);
                  }}
                  className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <FaHeart className="text-red-500 text-sm" />
                </button>

                {/* Book Image */}
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={book.thumbnail || "https://via.placeholder.com/150"}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Book Info */}
                <div className="p-3 text-center">
                  <h2 className="font-semibold text-sm text-[#473628] line-clamp-2">
                    {book.title}
                  </h2>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                    {book.authors?.join(", ") || "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= BOOK DETAILS POPUP ================= */}
      {popupLoading && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
          <div className="bg-white px-6 py-4 rounded-lg shadow text-center">
            Loading book details...
          </div>
        </div>
      )}

      <Bookdetailspop
        open={Boolean(selectedBook)}
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
};

export default Favorites;
