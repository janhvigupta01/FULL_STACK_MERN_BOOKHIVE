import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const getInitials = (name) => {
  const parts = name.split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
};

const UniversalSearch = ({
  placeholder = "Search books or authors",
  rounded = "md",
  onBookSelect,
}) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 🔹 REF FOR OUTSIDE CLICK */
  const searchRef = useRef(null);

  /* 🔹 HIDE SUGGESTIONS WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= FETCH SUGGESTIONS ================= */
  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);

    try {
      /* ---------- BOOKS (GOOGLE) ---------- */
      const bookRes = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          value
        )}&maxResults=10`
      );
      const bookData = await bookRes.json();

      const bookSuggestions =
        bookData.items?.map((b) => ({
          type: "book",
          id: b.id,
          title: b.volumeInfo.title,
          authors: b.volumeInfo.authors || [],
          image:
            b.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/40",
          previewLink: b.volumeInfo.previewLink,
          description:
            b.volumeInfo.description || "No description available",
        })) || [];

      /* ---------- AUTHORS (BACKEND) ---------- */
      let apiAuthors = [];
      try {
        const authorRes = await fetch(
          `http://localhost:4000/api/authors?q=${value}`
        );
        apiAuthors = await authorRes.json();
      } catch {
        apiAuthors = [];
      }

      /* ---------- AUTHORS FROM BOOK RESULTS ---------- */
      const bookAuthors = new Set();
      bookSuggestions.forEach((b) =>
        b.authors.forEach((a) => bookAuthors.add(a))
      );

      /* ---------- MERGE + DEDUPE AUTHORS ---------- */
      const mergedAuthors = new Set();
      apiAuthors.forEach((a) => mergedAuthors.add(a.name));
      bookAuthors.forEach((a) => mergedAuthors.add(a));

      /* ✅ EXACT LIMITS */
      const authorSuggestions = [...mergedAuthors]
        .slice(0, 2) // 👈 ONLY 2 AUTHORS
        .map((name) => ({
          type: "author",
          name,
        }));

      const bookSuggestionsLimited = bookSuggestions.slice(0, 4); // 👈 ONLY 4 BOOKS

      /* ---------- FINAL (MAX 6 TOTAL) ---------- */
      setSuggestions([
        ...authorSuggestions,
        ...bookSuggestionsLimited,
      ]);
      setShowSuggestions(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEARCH ACTION ================= */
  const handleSearch = () => {
    if (!query.trim()) return;
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div
        className={`flex items-center bg-white border border-[#DDD6CC] px-4 py-2 shadow-sm ${
          rounded === "full" ? "rounded-full" : "rounded-md"
        }`}
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="bg-transparent w-full outline-none placeholder-[#6B645C]"
        />

        {/* 🔍 SEARCH ICON */}
        <IoMdSearch
          onClick={handleSearch}
          className="text-2xl cursor-pointer text-[#8B6F4E]"
        />
      </div>

      {/* ================= SUGGESTIONS DROPDOWN ================= */}
      {showSuggestions && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#DDD6CC] rounded-xl shadow-lg z-50">
          {loading && (
            <p className="p-3 text-sm text-[#6B645C]">Searching...</p>
          )}

          {!loading &&
            suggestions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setShowSuggestions(false);

                  if (item.type === "author") {
                    navigate(`/author/${item.name}`);
                    return;
                  }

                  if (item.type === "book" && onBookSelect) {
                    onBookSelect(item);
                  }
                }}
                className="flex items-center gap-3 p-3 hover:bg-[#EFEAE3] cursor-pointer"
              >
                {item.type === "author" ? (
                  <>
                    <div className="h-8 w-8 rounded-full bg-[#8B6F4E] text-white flex items-center justify-center text-sm font-bold">
                      {getInitials(item.name)}
                    </div>
                    <p className="font-medium text-sm">{item.name}</p>
                  </>
                ) : (
                  <>
                    <img
                      src={item.image}
                      className="w-8 h-12 object-cover rounded"
                      alt={item.title}
                    />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-[#6B645C] line-clamp-1">
                        {item.authors.join(", ")}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UniversalSearch;
