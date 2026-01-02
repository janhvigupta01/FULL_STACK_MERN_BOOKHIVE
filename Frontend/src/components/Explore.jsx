import React, { useEffect, useState } from "react";
import { BookOpen, Plus, Check, ChevronRight } from "lucide-react";
import Bookdetailspop from "../components/Bookdetailspop";

const FALLBACK_BOOK = {
  volumeInfo: {
    title: "Welcome to BookHive",
    description: "Discover books, authors, and stories curated just for you.",
    imageLinks: {
      thumbnail: "https://via.placeholder.com/1200x700?text=BookHive",
    },
    publishedDate: "2025",
    pageCount: 320,
  },
};

const Explore = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isInReadList, setIsInReadList] = useState(false);

  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const activeBook =
    trendingBooks.length > 0 ? trendingBooks[heroIndex] : FALLBACK_BOOK;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = API_KEY
          ? `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&key=${API_KEY}`
          : `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.items?.length) {
          setTrendingBooks(data.items);
        }
      } catch (err) {
        console.error("Books fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [API_KEY]);

  useEffect(() => {
    setIsInReadList(false);
  }, [heroIndex]);

  return (
    <div className="w-full bg-[#030b17] min-h-screen text-white overflow-x-hidden">

      {loading && (
        <div className="h-[80vh] flex items-center justify-center text-gray-400 text-xl">
          Loading books...
        </div>
      )}

      {!loading && (
        <div className="relative h-[85vh] w-full overflow-hidden">

          <img
            src={activeBook.volumeInfo.imageLinks?.thumbnail?.replace(
              "http:",
              "https:"
            )}
            className="absolute inset-0 w-full h-full object-cover"
            alt="hero"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#030b17] via-[#030b17]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030b17] via-transparent to-transparent" />

          <div className="absolute bottom-28 left-0 w-full md:w-[50%] px-10 z-20 space-y-5">
            <p className="text-emerald-400 font-bold text-sm uppercase">
              Editor's Choice
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold">
              {activeBook.volumeInfo.title}
            </h1>

            <p className="text-gray-300 line-clamp-3">
              {activeBook.volumeInfo.description}
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  const info = activeBook.volumeInfo;

                  setSelectedBook({
                    id: activeBook.id,
                    title: info.title,
                    authors: info.authors || [],
                    description: info.description,
                    image: info.imageLinks?.thumbnail,
                    previewLink: info.previewLink,
                    publishedDate: info.publishedDate,
                    pageCount: info.pageCount,
                    categories: info.categories,
                    language: info.language,
                    publisher: info.publisher,
                    averageRating: info.averageRating,
                    ratingsCount: info.ratingsCount,
                  });

                  setModalOpen(true);
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 rounded-xl font-bold flex gap-2"
              >
                <BookOpen /> Read Now
              </button>

              <button
                onClick={() => setIsInReadList(!isInReadList)}
                className={`p-4 rounded-xl border ${
                  isInReadList
                    ? "bg-emerald-500"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {isInReadList ? <Check /> : <Plus />}
              </button>
            </div>
          </div>

          {trendingBooks.length > 0 && (
            <div className="absolute bottom-10 right-10 flex items-center gap-3 z-30">
              {trendingBooks.map((book, index) => (
                <img
                  key={book.id}
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  onClick={() => setHeroIndex(index)}
                  className={`w-24 h-14 object-cover cursor-pointer rounded ${
                    heroIndex === index
                      ? "ring-2 ring-emerald-500"
                      : "opacity-40"
                  }`}
                />
              ))}

              <button
                onClick={() =>
                  setHeroIndex((prev) => (prev + 1) % trendingBooks.length)
                }
              >
                <ChevronRight size={32} />
              </button>
            </div>
          )}
        </div>
      )}

      <Bookdetailspop
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default Explore;
