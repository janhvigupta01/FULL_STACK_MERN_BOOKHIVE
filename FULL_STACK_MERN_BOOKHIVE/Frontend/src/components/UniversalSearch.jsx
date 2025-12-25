import { useState, useEffect, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
};

const UniversalSearch = ({
  placeholder = "Search books or authors",
  rounded = "full",
  onBookSelect,
}) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(null);

  /* 🔹 CLICK OUTSIDE */
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* 🔹 FETCH SUGGESTIONS */
  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const bookRes = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          value
        )}&maxResults=6`
      );
      const bookData = await bookRes.json();

      const books =
        bookData.items?.map((b) => ({
          type: "book",
          title: b.volumeInfo.title,
          authors: b.volumeInfo.authors || [],
          image:
            b.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/40",
          previewLink: b.volumeInfo.previewLink,
          description: b.volumeInfo.description,
        })) || [];

      setSuggestions(books);
      setShowSuggestions(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 SEARCH ACTION (THIS WAS MISSING EFFECTIVELY) */
  const handleSearch = () => {
    if (!query.trim()) return;

    setShowSuggestions(false);

    // 🔥 MAIN FIX
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  /* 🔹 ENTER KEY FIX */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div
        className={`flex items-center bg-white px-4 py-2 shadow-sm
        ${rounded === "full" ? "rounded-full" : "rounded-md"}
        border border-[#DDD6CC]`}
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder={placeholder}
          className="
            bg-transparent w-full outline-none
            border-none focus:ring-0 focus:outline-none
            placeholder-[#6B645C]
          "
        />

        <IoMdSearch
          onClick={handleSearch}
          className="text-2xl cursor-pointer text-[#8B6F4E]"
        />
      </div>

      {/* 🔽 DROPDOWN */}
      {showSuggestions && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border rounded-xl shadow-lg z-50">
          {loading && (
            <p className="p-3 text-sm text-[#6B645C]">Searching...</p>
          )}

          {!loading &&
            suggestions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setShowSuggestions(false);
                  onBookSelect?.(item);
                }}
                className="flex items-center gap-3 p-3 hover:bg-[#EFEAE3] cursor-pointer"
              >
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
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UniversalSearch;
