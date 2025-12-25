import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bookdetailspop from "../components/Bookdetailspop";
import UniversalSearch from "../components/UniversalSearch";
import Explore from "../components/Explore";
import quotes from "../assets/quotes";
import FeedbackStrip from "../components/FeedbackStrip";

/* ================= HELPERS ================= */

const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff =
    now - start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;

  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const getInitials = (name) => {
  const parts = name.split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
};

const bgColors = [
  "#C8AE8F",
  "#B89C7D",
  "#A37F5F",
  "#D9C6A4",
  "#E7D7BC",
  "#8D7052",
  "#73553A",
];

const genreIcons = {
  Fiction: "📖",
  Romance: "❤️",
  Mystery: "🕵️",
  Thriller: "😱",
  Fantasy: "🐉",
  "Science Fiction": "🚀",
  Biography: "👤",
  "Self Help": "🌱",
  History: "🏛️",
};

/* ================= HOME ================= */

const Home = () => {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [history, setHistory] = useState([]);

  const [quote, setQuote] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  /* ---------- DAILY QUOTE ---------- */
  useEffect(() => {
    if (!quotes.length) return;
    const dayIndex = getDayOfYear() % quotes.length;
    setQuote(quotes[dayIndex].text);
    setQuoteAuthor(quotes[dayIndex].author);
  }, []);

  /* ---------- AUTHORS ---------- */
  useEffect(() => {
    fetch("http://localhost:4000/api/search-authors")
      .then((res) => res.json())
      .then(setAuthors)
      .catch(() => {});
  }, []);

  /* ---------- CATEGORIES ---------- */
  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  /* ---------- HISTORY ---------- */
  useEffect(() => {
    fetch("http://localhost:4000/api/history", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.history) setHistory(data.history);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#ABA293] text-[#592219]">

      {/* ================= HERO ================= */}
      <Explore />

      {/* ================= DAILY QUOTE ================= */}
     <div className="py-16 px-6 text-center">
  <div
    className="
      max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto
      p-10 rounded-3xl
      bg-[#ABA293]
      shadow-[8px_8px_20px_#8f887a,-8px_-8px_20px_#c7bfa9]
    "
  >
    <p className="text-2xl italic font-serif">
      “{quote}”
    </p>
    <span className="block mt-4 text-lg font-semibold text-[#7A664C]">
      — {quoteAuthor}
    </span>
  </div>
</div>


      {/* ================= SEARCH ================= */}
      <div className="py-12 px-6">
  <div
    className="
      max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto
      p-6 rounded-3xl
      bg-[#ABA293]
      shadow-[inset_6px_6px_14px_#8f887a,inset_-6px_-6px_14px_#c7bfa9]
    "
  >
    <UniversalSearch
      placeholder="Search books or authors"
      rounded="full"
      onBookSelect={(book) => {
        setSelectedBook(book);
        setModalOpen(true);
      }}
    />
  </div>
</div>


      {/* ================= CONTINUE READING ================= */}
      {history.length > 0 && (
        <div className="py-20 px-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Continue Reading</h2>
            <Link to="/history" className="px-5 py-2
    rounded-xl
    text-sm font-semibold
    text-[#7A664C]
    bg-[#ABA293]
    shadow-[4px_4px_10px_#8f887a,-4px_-4px_10px_#c7bfa9]
    hover:scale-105
    active:shadow-[inset_4px_4px_10px_#8f887a,inset_-4px_-4px_10px_#c7bfa9]
    transition">
              Show All →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {history.slice(0, 6).map((item, index) => (
              <div
                key={index}
                className="
                  cursor-pointer p-4 rounded-2xl
                  bg-[#ABA293]
                  shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
                  hover:scale-105 transition
                "
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
                        item.title
                      )}&maxResults=1`
                    );
                    const data = await res.json();

                    if (data.items?.length) {
                      const b = data.items[0].volumeInfo;

                      setSelectedBook({
                        title: b.title,
                        authors: b.authors,
                        image: b.imageLinks?.thumbnail || item.thumbnail,
                        description: b.description,
                        previewLink: b.previewLink,
                        language: b.language,
                        category: b.categories?.[0],
                        year: b.publishedDate?.substring(0, 4),
                      });
                      setModalOpen(true);
                    }
                  } catch {}
                }}
              >
                <img
                  src={item.thumbnail || "https://via.placeholder.com/200"}
                  className="w-full h-[200px] object-cover rounded-xl"
                />
                <p className="mt-3 text-sm line-clamp-2">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= GENRES ================= */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold">Browse Genres</h2>
            <button
  onClick={() => navigate("/categories")}
  className="
    px-5 py-2
    rounded-xl
    text-sm font-semibold
    text-[#7A664C]
    bg-[#ABA293]
    shadow-[4px_4px_10px_#8f887a,-4px_-4px_10px_#c7bfa9]
    hover:scale-105
    active:shadow-[inset_4px_4px_10px_#8f887a,inset_-4px_-4px_10px_#c7bfa9]
    transition
  "
>
  Show All →
</button>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.slice(0, 8).map((cat, index) => (
              <div
                key={index}
                onClick={() => navigate(`/category/${cat.name}`)}
                className="
                  p-6 rounded-2xl cursor-pointer
                  bg-[#ABA293]
                  shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
                  hover:scale-105 transition
                "
              >
                <div className="text-3xl mb-3">
                  {genreIcons[cat.name] || "📚"}
                </div>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= AUTHORS ================= */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Popular Authors</h2>
          <Link to="/authors" className="px-5 py-2
    rounded-xl
    text-sm font-semibold
    text-[#7A664C]
    bg-[#ABA293]
    shadow-[4px_4px_10px_#8f887a,-4px_-4px_10px_#c7bfa9]
    hover:scale-105
    active:shadow-[inset_4px_4px_10px_#8f887a,inset_-4px_-4px_10px_#c7bfa9]
    transition">
            Show All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 max-w-6xl mx-auto">
          {authors.slice(0, 6).map((author, index) => (
            <div
              key={index}
              onClick={() => navigate(`/author/${author.name}`)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                style={{ backgroundColor: bgColors[index % bgColors.length] }}
                className="
                  h-24 w-24 rounded-full flex items-center justify-center
                  text-white text-3xl font-bold
                  shadow-[6px_6px_14px_rgba(0,0,0,0.25),-6px_-6px_14px_rgba(255,255,255,0.15)]
                  group-hover:scale-105 transition
                "
              >
                {getInitials(author.name)}
              </div>
              <p className="mt-3 group-hover:text-[#A37F5F] transition">
                {author.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FEEDBACK ================= */}
      <FeedbackStrip />

      {/* ================= BOOK POPUP ================= */}
      <Bookdetailspop
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default Home;
