import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Bookdetailspop from "../components/Bookdetailspop";

const fallbackCover =
  "https://via.placeholder.com/200x300.png?text=Not+Available";

const SearchPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get("q");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  /* ================= FETCH SEARCH RESULTS ================= */
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&maxResults=40`
        );
        const data = await res.json();

        if (data.items) {
          setBooks(
            data.items.map((book) => ({
              title: book.volumeInfo.title,
              image: book.volumeInfo.imageLinks?.thumbnail,
              authors: book.volumeInfo.authors,
              description: book.volumeInfo.description,
              language: book.volumeInfo.language,
              category: book.volumeInfo.categories?.[0],
              previewLink: book.volumeInfo.previewLink,
              year: book.volumeInfo.publishedDate?.substring(0, 4),
            }))
          );
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.log("Search fetch error:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <p className="text-center mt-20 text-xl font-semibold text-[#473628]">
        Searching for “{query}”...
      </p>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F7F4ED] px-10 py-16 relative">

        {/* 🔙 BACK BUTTON */}
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
        <div className="mb-14">
          <h1
            className="
              text-5xl font-black text-[#473628]
              tracking-wide border-b-4 border-b-current/10
              inline-block pb-1
            "
          >
            Results for “{query}”
          </h1>

          <p className="text-[#927A66] text-lg mt-3 italic">
            Showing books related to your search
          </p>
        </div>

        {/* RESULTS GRID */}
        {books.length === 0 ? (
          <p className="text-xl text-[#927A66]">
            No results found 😔
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-y-16 gap-x-8 justify-items-center">
            {books.map((b, index) => (
              <div
                key={index}
                onClick={() => setSelectedBook(b)}
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
                    src={b.image || fallbackCover}
                    alt={b.title}
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
                    text-[16px] font-bold text-[#3A2B21]
                    text-center mt-4 line-clamp-2
                    group-hover:text-[#A67344] transition-colors
                  "
                >
                  {b.title}
                </p>

                <span className="text-sm text-[#927A66] mt-1 text-center line-clamp-1">
                  {b.authors?.join(", ") || "Unknown Author"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOOK DETAILS POPUP */}
      <Bookdetailspop
        open={Boolean(selectedBook)}
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
};

export default SearchPage;
