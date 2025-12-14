import React, { useEffect, useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Bookdetailspop from "../components/Bookdetailspop";

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

const Home = () => {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState([]);

  // Quote section state
  const [quote, setQuote] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Load Popular Authors
  useEffect(() => {
    fetch("http://localhost:4000/api/search-authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.log("Error fetching authors", err));
  }, []);

  // 🔥 FIXED: Fetch Random Quote (cache-buster added)
  useEffect(() => {
    fetch(`https://api.quotable.io/random?ts=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);
        setQuoteAuthor(data.author);
      })
      .catch((err) => console.log("Error fetching quote", err));
  }, []);

  // Search Books
  const searchBooks = async () => {
    if (!searchText.trim()) return;

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
      );
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.log("Error fetching books", err);
    }
  };

  return (
    <div className="flex flex-col w-full">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-[#ECE7CA] to-[#E5DDC1] py-20 px-6 text-[#5A4B35]">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
          <BookOpen size={50} className="text-[#C8AD7E]" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            Discover. Learn. Explore.
          </h1>
          <p className="text-lg md:text-xl opacity-75 max-w-xl">
            A modern library experience built for curious readers like you.
          </p>

          <button
            onClick={() => navigate("/authors")}
            className="mt-4 bg-[#5A4B35] text-white px-8 py-3 rounded-full hover:bg-[#7A664C]
            transition flex items-center gap-2 shadow-md"
          >
            Explore Library <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* QUOTE SECTION */}
      <div className="bg-white py-14 px-6 text-center border-y border-[#E4DCC1]">
        <p className="text-2xl italic opacity-80 max-w-3xl mx-auto font-serif">
          {quote || "A good book opens a world inside your mind..."}
        </p>

        {quoteAuthor && (
          <span className="mt-3 block text-lg font-semibold text-[#C8AD7E] font-serif">
            — {quoteAuthor}
          </span>
        )}
      </div>

      {/* SEARCH SECTION */}
      <div className="bg-white py-10 px-6 border-b border-[#E4DCC1]">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            placeholder="Search books (ex: Harry Potter)"
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-md shadow-sm"
          />

          <button
            onClick={searchBooks}
            className="px-6 py-3 bg-[#5A4B35] text-white rounded-md hover:bg-[#7A664C]"
          >
            Search
          </button>
        </div>
      </div>

      {/* SEARCH RESULTS */}
      {books.length > 0 && (
        <div className="bg-white py-10 px-6">
          <h2 className="text-2xl font-bold mb-6 text-[#5A4B35] max-w-6xl mx-auto">
            Search Results
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {books.map((book, index) => {
              const info = book.volumeInfo;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedBook({
                      id: book.id,
                      title: info.title,
                      authors: info.authors || ["Unknown"],
                      image:
                        info.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/200",
                      previewLink: info.previewLink,
                      description:
                        info.description || "No description available",
                      language: info.language || "Unknown",
                      category: info.categories?.[0] || "Unknown",
                    });
                    setModalOpen(true);
                  }}
                  className="cursor-pointer hover:shadow-xl transition border p-3 rounded-md bg-white"
                >
                  <img
                    src={
                      info.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/200"
                    }
                    alt={info.title}
                    className="w-full h-[200px] object-cover rounded"
                  />

                  <p className="font-medium mt-2 line-clamp-2">
                    {info.title}
                  </p>

                  <small className="text-gray-500">
                    {info.authors?.join(", ") || "Unknown Author"}
                  </small>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* POPULAR AUTHORS */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#5A4B35]">
            Popular Authors
          </h2>

          <Link to="/authors" className="text-[#B89562] hover:underline text-lg">
            Show All →
          </Link>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">
          {authors.slice(0, 6).map((author, index) => {
            const bg = bgColors[index % bgColors.length];

            return (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group select-none"
                onClick={() => navigate(`/author/${author.name}`)}
              >
                <div
                  style={{ backgroundColor: bg }}
                  className="h-24 w-24 rounded-full flex items-center justify-center
                  text-white text-3xl font-bold shadow-md hover:scale-105 transition"
                >
                  {getInitials(author.name)}
                </div>

                <p className="mt-2 text-lg font-medium text-[#4F3A2C] group-hover:text-[#A37F5F]">
                  {author.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOOK DETAILS MODAL */}
      <Bookdetailspop
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default Home;
