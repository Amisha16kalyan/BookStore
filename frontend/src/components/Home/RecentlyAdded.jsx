import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-recent-books");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-8">
      <h4 className="  text-3xl text-yellow-100">Recently added books</h4>
     {!Data && <div className="flex items-center justify-center my-8">
       <Loader/>
     </div>
     }
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data && Data.length > 0 ? (
          Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))
        ) : (
          <p className="text-gray-400">No recent books found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
