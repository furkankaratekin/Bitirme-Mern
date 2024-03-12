import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const PictureList = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  const fetchImages = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: query, client_id: 'YOUR_UNSPLASH_ACCESS_KEY' },
      });
      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images from Unsplash', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-2/3 mt-4 mx-auto">
        <form
          className="flex flex-col md:flex-row gap-4 mb-4"
          onSubmit={fetchImages}
        >
          <input
            type="text"
            placeholder="Search Pictures..."
            className="flex-1 p-2 border border-gray-300 rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>

        <div className="flex justify-center items-center p-4">
          {/* Navigation Links */}
        </div>
      </div>
      <hr />

      {/* Görsellerin Listelendiği Alan */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              className="w-full h-auto object-cover transition-transform duration-300 transform group-hover:scale-105"
              src={image.urls.regular}
              alt={image.alt_description}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg">{image.user.name}</h3>
              <p className="text-gray-300">{image.description || image.alt_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PictureList;
