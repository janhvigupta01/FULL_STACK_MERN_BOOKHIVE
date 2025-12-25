import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 📚 ICON MAP (UNCHANGED) */
const genreIcons = {
  Fiction: "📖",
  Romance: "❤️",
  Mystery: "🕵️",
  Thriller: "😱",
  Fantasy: "🐉",
  "Science Fiction": "🚀",
  Biography: "👤",
  "Self Help": "🌱",
  Health: "💊",
  Psychology: "🧠",
  Philosophy: "📜",
  History: "🏛️",
  Business: "💼",
  Economics: "💹",
  Finance: "💰",
  Technology: "💻",
  Programming: "👨‍💻",
  Education: "🎓",
  Politics: "🏛️",
  Law: "⚖️",
  Religion: "🛐",
  Spirituality: "🕉️",
  Children: "🧸",
  "Young Adult": "🧑‍🎓",
  Poetry: "✒️",
  Art: "🎨",
  Music: "🎵",
  Travel: "✈️",
  Cooking: "🍳",
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#ABA293] px-6 py-14 text-[#592219]">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">
            Browse Categories
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="
              px-5 py-2 rounded-xl text-sm font-semibold
              bg-[#ABA293]
              shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
              hover:scale-105 transition
            "
          >
            ← Back
          </button>
        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => {
            const icon = genreIcons[cat.name] || "📚";

            return (
              <div
                key={index}
                onClick={() => navigate(`/category/${cat.name}`)}
                className="
                  cursor-pointer rounded-3xl p-8 text-center
                  bg-[#E5]
                  shadow-[8px_8px_18px_#8f887a,-8px_-8px_18px_#c7bfa9]
                  hover:shadow-[inset_6px_6px_14px_#8f887a,inset_-6px_-6px_14px_#c7bfa9]
                  transition-all duration-300
                "
              >
                <div className="text-4xl mb-4">
                  {icon}
                </div>

                <h3 className="font-semibold tracking-wide">
                  {cat.name}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Categories;
