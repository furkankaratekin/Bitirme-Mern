import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setErrorMessage("Lütfen bir değer giriniz.");
    } else {
      navigate(`/websites?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setErrorMessage(""); // Reset error message when user starts typing
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 p-4 max-w-lg mx-auto mt-10"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter URL..."
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Search
      </button>
      {errorMessage && (
        <p className="text-red-500 text-xs md:text-sm mt-2 md:mt-0">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default SearchInput;
