import React from "react";

const Bookdetailspop = ({ open, onClose, book }) => {
  if (!open || !book) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999]">
      <div className="bg-white w-[380px] rounded-xl shadow-xl p-5 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-lg"
        >
          ✖
        </button>

        {/* Cover */}
        <div className="flex justify-center">
          <img
            src={book.image || "https://via.placeholder.com/200"}
            className="w-40 h-56 object-cover rounded shadow"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mt-4">{book.title}</h2>

        {/* Author */}
        <p className="text-center text-gray-700 mt-1">
          <strong>Author:</strong> {book.authors?.join(", ") || "Unknown"}
        </p>

        {/* Language */}
        <p className="text-center text-gray-700 mt-1">
          <strong>Language:</strong> {book.language}
        </p>

        {/* Category */}
        <p className="text-center text-gray-700 mt-1">
          <strong>Category:</strong> {book.category}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3 text-center line-clamp-4 px-2">
          {book.description}
        </p>

        {/* Buttons */}
        <div className="flex justify-center mt-5">
          <a
            href={book.previewLink}
            target="_blank"
            className="px-4 py-2 bg-[#5A4B35] text-white rounded-md hover:bg-[#7A664C]"
          >
            Read Book
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bookdetailspop;

