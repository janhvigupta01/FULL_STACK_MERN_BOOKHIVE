import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bookdetailspop from "../components/Bookdetailspop";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [popupLoading, setPopupLoading] = useState(false);

  const navigate = useNavigate();

  /* ---------- FETCH HISTORY ---------- */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/history",
          { withCredentials: true }
        );
        setHistory(res.data.history || []);
      } catch (error) {
        console.log("Error fetching history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  /* ---------- OPEN BOOK POPUP ---------- */
  const handleBookClick = async (book) => {
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

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <p className="text-center mt-20 text-xl font-semibold text-[#473628]">
        Loading history...
      </p>
    );
  }

  /* ---------- EMPTY ---------- */
  if (history.length === 0) {
    return (
      <p className="text-center mt-20 text-xl text-[#927A66]">
        No recently viewed books 📭
      </p>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F7F4ED] px-10 py-16 relative">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute top-8 right-10
            px-5 py-2 rounded-full
            bg-[#473628] text-white font-semibold
            hover:bg-[#5a4335] transition-all
            shadow-md
          "
        >
          ← Back
        </button>

        {/* TITLE */}
        <div className="mb-16">
          <h1 className="
              text-5xl font-black text-[#473628]
              tracking-wide border-b-4 border-b-current/10
              inline-block pb-1
            ">
            Recently Viewed 📚
          </h1>

          <p className="text-[#927A66] text-lg mt-3 italic">
            Books you explored recently
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-y-16 gap-x-8 justify-items-center">
          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => handleBookClick(item)}
              className="flex flex-col items-center w-[150px] cursor-pointer group"
            >
              <div
                className="
                  w-full h-[225px] rounded-xl overflow-hidden relative
                  transition-all duration-300 ease-out
                  transform shadow-xl border-2 border-transparent
                  hover:border-4 hover:border-yellow-400/50
                  group-hover:scale-[1.07] group-hover:-translate-y-2
                  hover:shadow-[0_15px_30px_rgba(0,0,0,0.35)]
                "
              >
                <img
                  src={item.thumbnail || "https://via.placeholder.com/200x300"}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-[10px]"
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
                    View Details →
                  </span>
                </div>
              </div>

              <p
                className="
                  text-[17px] font-bold text-[#3A2B21]
                  text-center mt-4 line-clamp-2
                  group-hover:text-[#A67344] transition-colors
                "
              >
                {item.title}
              </p>

              <span className="text-sm text-[#927A66] mt-1 text-center line-clamp-1">
                {item.authors?.join(", ") || "Unknown Author"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP LOADING */}
      {popupLoading && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
          <div className="bg-white px-6 py-4 rounded-lg shadow text-center">
            Loading book details...
          </div>
        </div>
      )}

      {/* BOOK DETAILS POPUP */}
      <Bookdetailspop
        open={Boolean(selectedBook)}
        book={selectedBook}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default History;
