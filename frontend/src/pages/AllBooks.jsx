import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from "../components/BookCard/BookCard";
import Loader from '../components/Loader/Loader';

const AllBooks = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-all-books");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // ✅ Stop loader after API call
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-4 py-6">
      <h4 className="text-3xl text-yellow-100 mb-4">All Books</h4>

      {/* ✅ Show Loader while fetching */}
      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Data && Data.length > 0 ? (
            Data.map((item, i) => (
              <BookCard key={i} data={item} />
            ))
          ) : (
            <p className="text-gray-400">No books available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
