import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/websites?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter URL..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchInput;
