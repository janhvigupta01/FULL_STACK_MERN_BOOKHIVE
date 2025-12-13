import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
      );
      const data = await res.json();
      setResults(data.items || []);
    };
    fetchBooks();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#ECE7CA] p-6">
      <h1 className="text-3xl font-bold text-[#5A4B35] mb-6 text-center">
        Search Results for "{query}"
      </h1>

      <div className="flex justify-center gap-6 flex-wrap">
        {results.map((book, i) => (
          <Card
            key={i}
            title={book.volumeInfo?.title}
            author={book.volumeInfo?.authors?.[0]}
            image={book.volumeInfo?.imageLinks?.thumbnail}
            rating={book.volumeInfo?.averageRating}
            category={book.volumeInfo?.categories?.[0]}
            description={book.volumeInfo?.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
