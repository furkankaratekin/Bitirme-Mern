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
    setErrorMessage(""); // Kullanıcı yazmaya başladığında hata mesajını sıfırlıyor
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto p-4">
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="mb-4 w-3/4 max-w-xs" />{" "}
            {/* Logo boyutu artırıldı */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Enter URL..."
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow" // Input genişletildi
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" // Buton düzenlendi
                >
                  Search
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-xs md:text-sm mt-2 text-center">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchInput;
