import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { FaTh } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const MetinKisalt = ({ metin, maksKarakter }) => {
  if (metin.length <= maksKarakter) {
    return <p>{metin}</p>;
  }

  const kisaltilmisMetin = metin.slice(0, maksKarakter) + "...";

  return <p>{kisaltilmisMetin}</p>;
};

const VideosSearch = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Enter tuşuna basıldığında "/search-list" sayfasına yönlendirme yapılır
      navigate("/search-list");
    }
  };

  //Youtube Api için kral uzun kod bloğu he
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const apiKey = "AIzaSyC6LFAXBW_B-Dj2xn_JJbnqSoNVg2oybe0";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!searchTerm || !buttonClicked) {
          setSearchResults([]);
          return;
        }

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${apiKey}&part=snippet&type=video`
        );

        const data = await response.json();

        if (data.items) {
          setSearchResults(data.items);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm, apiKey, buttonClicked]);

  const handleSearchButtonClick = () => {
    setButtonClicked(true);
  };

  const handleKeyPressVideos = (e) => {
    if (e.key === "Enter") {
      setButtonClicked(true);
    }
  };

  const openVideoInNewTab = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };
  return (
    <div>
      {/*        Navbar */}
      <div className="sticky top-0 z-50 bg-white ">
        <div className="mt-4">
          <Header></Header>
        </div>
        <div className="flex justify-between items-center mt-4 mb-5 px-5 py-3">
          <div className="w-2/3 mt-4">
            <form className="flex flex-col md:flex-row gap-4 mb-4 pl-32">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPressVideos}
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
          <div className="flex-grow">
            {/*             <input
              type="text"
              name="name"
              className="w-2/3 mt-3 border border-gray-500 rounded-3xl"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPressVideos}
            /> */}

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPressVideos}
              placeholder=""
              className="w-2/3 mt-3 border border-gray-500 rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* video görsek cart curt yazısı  */}
      <div className="flex justify-center  items-center p-4">
        <div>
          <Link to="/websites">
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
      <hr className="" />

      {/* videoların gösterileceği yer */}
      <div>
        {searchResults.slice(0, 5).map((result) => (
          <div key={result.id.videoId} className="flex flex-wrap justify-start">
            <div className="mx-12 lg:mx-48 mt-8 ">
              <div className="text-sm">
                <p>www.youtube.com</p>
              </div>
              <div>
                <h4 className="text-blue-500 font-bold text-xl hover:underline">
                  {result.snippet.title}
                </h4>
              </div>
              <div className="flex mt-2">
                <div className="flex-none w-52 h-32 md:w-60 md:h-32">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={result.snippet.thumbnails.medium.url}
                    alt=""
                  />
                </div>
                <div className="mx-3">
                  <div>
                    <p>
                      <MetinKisalt
                        metin={result.snippet.description}
                        maksKarakter={130}
                      />
                    </p>
                  </div>
                  <div className="my-7">Meta Tags Hesabı</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosSearch;
