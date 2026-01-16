import React from 'react';
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full sm:w-60 md:w-64 bg-zinc-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200 m-3">
      <Link to={`/View-book-details/${data._id}`}>
        {/* Image Section */}
        <div className="h-56 w-full overflow-hidden">
          <img
            src={data.url}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 text-white">
          <h2 className="font-semibold text-lg truncate">{data.title}</h2>
          <p className="text-sm text-gray-300 truncate">{data.author}</p>
          <p className="text-yellow-400 font-semibold mt-2">${data.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
