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
  const [backupAuthors, setBackupAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    fetch("http://localhost:4000/api/search-authors?q=a")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAuthors(data);
          setBackupAuthors(data);
        }
      })
      .catch(() => {
        setAuthors([]);
        setBackupAuthors([]);
      });
  }, []);

  /* ---------- SEARCH ---------- */
  useEffect(() => {
    if (!search.trim()) {
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
    <div className="min-h-screen bg-[#ABA293] py-16 px-6 relative">

      {/* 🔙 BACK BUTTON — NEUMORPHIC */}
      <button
        onClick={() => navigate(-1)}
        className="
          absolute top-6 right-6
          px-6 py-2 rounded-xl
          text-sm font-semibold text-[#592219]
          bg-[#ABA293]
          shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
          hover:scale-105 transition
        "
      >
        ← Back
      </button>

      {/* HEADER + SEARCH */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 mb-14">
        <h1 className="text-4xl font-bold text-[#592219]">
          Authors
        </h1>

        {/* 🔍 SEARCH — INSET NEUMORPHISM */}
        <input
          type="text"
          placeholder="Search authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full sm:w-80 px-5 py-3 rounded-full
            bg-[#ABA293] text-[#592219]
            shadow-[inset_4px_4px_10px_#8f887a,inset_-4px_-4px_10px_#c7bfa9]
            outline-none
          "
        />
      </div>

      {/* AUTHORS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-12">

        {loading && (
          <p className="text-[#592219] col-span-full text-center">
            Searching authors...
          </p>
        )}

        {!loading && authors.length === 0 && (
          <p className="text-[#592219] col-span-full text-center">
            No author found 🫠
          </p>
        )}

        {authors.map((author, index) => {
          const bg = bgColors[index % bgColors.length];
          const name = author.name;

          return (
            <div
              key={index}
              onClick={() => navigate(`/author/${name}`)}
              className="flex flex-col items-center cursor-pointer group select-none"
            >
              {/* AVATAR — NEUMORPHIC */}
              <div
                style={{ backgroundColor: bg }}
                className="
                  h-32 w-32 rounded-full
                  flex items-center justify-center
                  text-white text-3xl font-bold
                  shadow-[6px_6px_14px_rgba(0,0,0,0.25),-6px_-6px_14px_rgba(255,255,255,0.15)]
                  group-hover:scale-105 transition
                "
              >
                {getInitials(name)}
              </div>

              <h3
                className="
                  mt-4 text-lg font-medium text-[#592219]
                  group-hover:text-[#A37F5F] transition text-center
                "
              >
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
