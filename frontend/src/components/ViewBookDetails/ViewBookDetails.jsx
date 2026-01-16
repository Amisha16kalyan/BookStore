import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBookDetails = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-book-by-id/${id}`)

        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="text-white flex justify-center items-center h-screen text-xl">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="px-12 py-8 bg-zinc-900 text-white">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* ✅ Left: Book Image */}
        <div className="bg-zinc-800 rounded p-4 w-full md:w-1/3 flex justify-center">
          <img
            src={book.url}
            alt={book.title}
            className="w-full h-80 object-cover rounded"
          />
        </div>

        {/* ✅ Right: Book Details */}
        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-3xl font-semibold">{book.title}</h2>
          <p className="text-lg text-gray-300">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-400">
            <span className="font-semibold">Language:</span> {book.language}
          </p>
          <p className="text-gray-300 leading-relaxed">
            <span className="font-semibold">Description:</span> {book.desc}
          </p>
          <p className="text-yellow-400 font-bold text-xl">${book.price}</p>

          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded shadow-md">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

