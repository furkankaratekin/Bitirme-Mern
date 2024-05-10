import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";
/* import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io"; */

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const WebsitesList = () => {
  const dispatch = useDispatch();
  const [websites, setWebsites] = useState([]);
  const [displayWebsites, setDisplayWebsites] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
/*   const userIds = useSelector((state) => state.currentUser.id);
 */  /* const { currentUser, loading, error } = useSelector((state) => state.user); */

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

  //Favorileri değiştirecek olan şey
  /*   const toggleFavorite = async (websiteId, isFavorite) => {
    const userId = currentUser._id;
    const url = `http://localhost:5000/api/user/${userId}/${
      isFavorite ? "remove-favorite" : "favorites"
    }`;

    try {
      const response = await axios.post(url, { websiteId });
      console.log("Success:", response.data);
      // Burada UI'ı güncellemek için gerekli işlemleri yapabilirsiniz.  }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  }; */

  // const toggleHeart = () => {
  //   setIsHeartFilled(!isHeartFilled)
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Header Bileşeni */}
        <div className="">
          <Header></Header>
        </div>

        {/* Ana İçerik Bölümü */}
        <div className="px-4 md:px-8">
          {/* Arama Formu */}
          <div className="w-2/3 mt-4 mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4 mb-4"
            >
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Arama"
                // md ekranlar için %75, lg ekranlar için %85 genişlik
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Search
              </button>
            </form>
          </div>

          {/* Linkler */}
          <div className="flex justify-center  items-center p-4">
            <div>
              <Link to="/websites">
                <a
                  href="#"
                  className="mr-12 hover:underline hover:text-gray-400"
                >
                  Tümü
                </a>
              </Link>
              <Link to="/pictures">
                <a
                  href="#"
                  className="mr-12 hover:underline hover:text-gray-400"
                >
                  Görseller
                </a>
              </Link>
              <Link to="/videos">
                <a
                  href="#"
                  className="mr-12 hover:underline hover:text-gray-400"
                >
                  Videolar
                </a>
              </Link>
            </div>
          </div>
        </div>
        <hr />

        {/* Listelenen İçerik */}
        <div className="min-h-screen mt-8">
          <div className="w-full max-w-6xl mx-auto">
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            <ul className="space-y-12">
              {displayWebsites.map((website) => (
                <li
                  key={website._id}
                  className="flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="md:flex-1 mx-3">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full overflow-hidden w-9 h-9 hover:scale-110 transition-transform">
                        <img
                          src={website.img_logo}
                          alt={website.kısa_link}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Link to={`/websites/${website.id}`}>
                        <div className="text-sm hover:underline">
                          <h4>{website.kısa_link}</h4>
                          <h5>{website.uzun_link}</h5>
                        </div>
                      </Link>
                      {/* <div className="ml-auto">
                        <button
                          onClick={() =>
                            toggleFavorite(
                              website._id,
                              favoriteIds.includes(website._id)
                            )
                          }
                        >
                          {favoriteIds.includes(website._id) ? (
                            <IoMdHeart />
                          ) : (
                            <IoMdHeartEmpty />
                          )}
                        </button>
                      </div> */}
                    </div>
                    <div className="mt-4">
                      <Link to={`/websites/${website.id}`}>
                        <h3 className="text-blue-500 font-bold text-xl hover:underline">
                          {website.ana_baslik}
                        </h3>
                      </Link>
                      <p className="text-sm mt-2">{website.uzun_aciklama}</p>
                      <div className="mt-2 text-blue-400">
                        <Link to={`/websites/${website.id}`}>
                          <a className="space-x-8" href="#">
                            {website.meta_etiketleri}
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
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

/* 
                        <Link
                          to={`/websites/${website.id}`}
                          className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                          {website.ana_baslik}
                        </Link>; */
/* 
<button
  onClick={() => {
    const isFavorite = favoriteIds.includes(website._id);
    toggleFavorite(website._id, isFavorite).then(() => {
      // Başarılı işlem sonrası favoriteIds state'ini güncelle
      if (isFavorite) {
        setFavoriteIds(favoriteIds.filter((id) => id !== website._id));
      } else {
        setFavoriteIds([...favoriteIds, website._id]);
      }
    });
  }}
>
  {favoriteIds.includes(website._id) ? <IoMdHeart /> : <IoMdHeartEmpty />}
</button>;
 */

{
  /* <button onClick={() => toggleHeart(website.id)}>
                    {favoriteIds.includes(website.id) ? (
                      <IoMdHeart />
                    ) : (
                      <IoMdHeartEmpty />
                    )}
                  </button> */
}
