import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <div className="mt-4">
        <Header></Header>
      </div>
      <div>
        <div className="w-2/3 mt-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 mb-4 pl-32"
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter URL..."
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex justify-center  items-center p-4">
          <div>
            <Link to="/list">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Tümü
              </a>
            </Link>
            <Link to="/pictures">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Görseller
              </a>
            </Link>
            <Link to="/videos">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Videolar
              </a>
            </Link>
            <Link to="/maps">
              <a href="#" className="hover:underline hover:text-gray-400">
                Haritalar
              </a>
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="min-h-screen mt-8">
        <div className="w-full max-w-4xl ml-36">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <ul className="space-y-12">
            {displayWebsites.map((website) => (
              <li key={website.id} className="flex flex-col md:flex-row gap-4">
                <img
                  src={website.img_logo}
                  alt={`${website.ana_baslik} logo`}
                  className="w-20 h-20 md:w-24 md:h-24"
                />
                <div className="flex-1">
                  <Link
                    to={`/websites/${website.id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    {website.ana_baslik}
                  </Link>
                  <p className="text-sm">Short URL: {website.kısa_link}</p>
                  <p className="text-sm">Long URL: {website.uzun_link}</p>
                  <p className="text-sm">Baslik: {website.ana_baslik}</p>
                  <p className="text-sm">Aciklama: {website.uzun_aciklama}</p>
                  <p className="text-sm">
                    Meta Etiketleri: {website.meta_etiketleri.join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default WebsitesList;



  /*       <div className="flex justify-center  items-center p-4">
          <div>
            <Link to="/list">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Tümü
              </a>
            </Link>
            <Link to="/pictures">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Görseller
              </a>
            </Link>
            <Link to="/videos">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Videolar
              </a>
            </Link>
            <Link to="/maps">
              <a href="#" className="hover:underline hover:text-gray-400">
                Haritalar
              </a>
            </Link>
          </div>
        </div>






      <div className="mt-4 sticky">
        <Header></Header>
      </div> */