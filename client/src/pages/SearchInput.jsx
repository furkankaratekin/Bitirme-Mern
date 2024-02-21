import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoSearch.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <div className="flex-grow flex flex-col items-center justify-center relative">
        <div className="max-w-xs mx-auto mt-4">
          <img src={logo} alt="Karase Logo" className="w-full h-auto" />
        </div>
        <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 mt-4 flex">
          <form
            onSubmit={handleSearch}
            className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-md"
          >
            <input
              
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Enter URL..."
            />

            {errorMessage && <p>{errorMessage}</p>}
          </form>
          <button
            type="submit"
            className="ml-5 px-6 py-2 bg-gray-900 text-white rounded-xl shadow-md"
          >
            Search
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SearchInput;
