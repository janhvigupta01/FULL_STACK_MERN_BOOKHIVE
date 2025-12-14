import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getInitials = (name) => {
  if (!name) return "";
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

const AuthorsPage = () => {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [backupAuthors, setBackupAuthors] = useState([]); // ⭐ cache
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 INITIAL LOAD (ONCE)
  useEffect(() => {
    fetch("http://localhost:4000/api/search-authors?q=a")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAuthors(data);
          setBackupAuthors(data); // ⭐ store initial authors
        }
      })
      .catch(() => {
        setAuthors([]);
        setBackupAuthors([]);
      });
  }, []);

  // 🔹 SEARCH LOGIC (NO BACKEND CHANGE)
  useEffect(() => {
    if (!search.trim()) {
      // restore previous authors
      setAuthors(backupAuthors);
      return;
    }

    setLoading(true);

    fetch(`http://localhost:4000/api/search-authors?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthors(Array.isArray(data) ? data : []);
      })
      .catch(() => setAuthors([]))
      .finally(() => setLoading(false));
  }, [search, backupAuthors]);

  return (
    <div className="min-h-screen bg-[#FAF7EF] py-14 px-6">

      {/* HEADER + SEARCH */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-4xl font-bold text-[#4F3A2C]">
          Authors
        </h1>

        <input
          type="text"
          placeholder="Search authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#CAB9A0] w-full sm:w-80 px-4 py-2 rounded-full 
                     bg-white focus:outline-none text-[#4F3A2C]"
        />
      </div>

      {/* AUTHORS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">

        {loading && (
          <p className="text-[#4F3A2C] col-span-full text-center">
            Searching authors...
          </p>
        )}

        {!loading && authors.length === 0 && (
          <p className="text-[#4F3A2C] col-span-full text-center">
            No author found 🫠
          </p>
        )}

        {authors.map((author, index) => {
          const bg = bgColors[index % bgColors.length];
          const name = author.name;

          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group select-none"
              onClick={() => navigate(`/author/${name}`)}
            >
              <div
                style={{ backgroundColor: bg }}
                className="h-32 w-32 rounded-full flex items-center justify-center 
                           text-white text-3xl font-bold shadow-lg 
                           group-hover:scale-105 transition"
              >
                {getInitials(name)}
              </div>

              <h3 className="mt-3 text-lg font-medium text-[#4F3A2C]
                             group-hover:text-[#A37F5F] transition text-center">
                {name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuthorsPage;
