import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, author, image, rating, category, description }) => {
  const navigate = useNavigate();

  // Sirf button click se hi navigation hoga
  const handleDetails = () => {
    navigate("/details", {
      state: {
        book: {
          title,
          author,
          image,
          rating,
          category,
          description,
        },
      },
    });
  };

  return (
    <div className="w-56 bg-[#F5F5DD] border border-[#C8AD7E] rounded-xl shadow-md p-4 
       hover:shadow-xl transition-all duration-300">

      <img
        src={image || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h2 className="text-lg font-semibold text-[#5A4B35] line-clamp-2">
        {title || "Untitled"}
      </h2>

      <p className="text-sm text-[#7A6A4A] mb-1">
        {author || "Unknown Author"}
      </p>

      <p className="text-yellow-600 text-sm mb-1">
        ⭐ {rating || "No Rating"}
      </p>

      <p className="text-xs font-medium text-[#5A4B35] bg-[#E3D8B7] px-2 py-1 rounded-md inline-block mb-3">
        {category || "General"}
      </p>

      <button
        onClick={handleDetails}
        className="w-full bg-[#C8AD7E] text-white py-2 rounded-lg 
          hover:bg-[#A79574] transition"
      >
        View Details
      </button>
    </div>
  );
};

export default Card;
