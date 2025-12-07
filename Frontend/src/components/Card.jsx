import React from "react";

const Card = ({ title, author, image }) => {
  return (
    <div className="w-48 h-72 bg-[#F5F5DD] border border-[#C8AD7E] rounded-xl shadow-md p-3">
      
      <img 
        src={image || "https://via.placeholder.com/150"} 
        alt={title}
        className="w-full h-32 object-cover rounded-md mb-2"
      />

      <h2 className="text-md font-semibold text-[#5A4B35] line-clamp-1">{title}</h2>
      <p className="text-sm text-[#7A6A4A]">{author}</p>

    </div>
  );
};


export default Card;
