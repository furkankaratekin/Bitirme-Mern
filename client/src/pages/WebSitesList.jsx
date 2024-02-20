import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const WebsitesList = () => {
  const [websites, setWebsites] = useState([]);
  const [displayWebsites, setDisplayWebsites] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("search");
    if (searchQuery !== null) {
      setInputValue(searchQuery);
      filterWebsites(websites, searchQuery);
    }
  }, [location.search, websites]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/websites");
        setWebsites(response.data);
        filterWebsites(response.data, inputValue);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchWebsites();
  }, []);

  const filterWebsites = (fetchedWebsites, search) => {
    const searchLower = search.toLowerCase();
    const filtered = fetchedWebsites
      .filter((website) => {
        // Check if URLs contain the search query
        const matchesURL =
          website.kısa_link.toLowerCase().includes(searchLower) ||
          website.uzun_link.toLowerCase().includes(searchLower);
        // Check if any meta tag contains the search query
        const matchesMetaTags = website.meta_etiketleri.some((tag) =>
          String(tag).toLowerCase().includes(searchLower)
        );

        return matchesURL || matchesMetaTags;
      })
      .slice(0, 6); // Keep only the first 6 results for display

    setDisplayWebsites(filtered);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage(""); // Reset error message when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setErrorMessage("Lütfen bir veri girin.");
    } else {
      navigate(`?search=${encodeURIComponent(inputValue)}`);
      filterWebsites(websites, inputValue);
    }
  };

  return (
    <div>
      <h2>Websites List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter URL..."
        />
        <button type="submit">Search</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {displayWebsites.map((website) => (
          <li key={website.id}>
            <img src={website.img_logo} alt={`${website.ana_baslik} logo`} />
            <Link to={`/websites/${website.id}`}>
              {" "}
              {/* Update this line */}
              {website.ana_baslik}
            </Link>
            <p>Short URL: {website.kısa_link}</p>
            <p>Long URL: {website.uzun_link}</p>
            <p>Baslik: {website.ana_baslik}</p>
            <p>Aciklama: {website.uzun_aciklama}</p>
            <p>Meta Etiketleri: {website.meta_etiketleri.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebsitesList;
