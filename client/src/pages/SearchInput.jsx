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
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter URL..."
      />
      <button type="submit">Search</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default SearchInput;
