import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { FaTh } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/*        Navbar */}
        <div className="sticky top-0 z-50 bg-white ">
          <div className="">
            <Header></Header>
          </div>
          <div className="flex justify-between items-center mt-4 mb-5 px-5 py-3">
            <div className="flex w-2/3 space-x-4 ml-28">
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
                placeholder="Search"
                className=" flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={handleKeyPressVideos}
                type="submit"
                className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Search
              </button>
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
        <p className="text-sm">
          Youtube Api, linklerini veya id'lerini vermediği için yönlendirme işlemi yapılamamaktadır.
         
        </p>
        <p className="text-sm">
          https://developers.google.com/youtube/v3/docs/videos?hl=tr#resource
        </p>

        {/* videoların gösterileceği yer */}
        <div className="mb-12">
          {searchResults.slice(0, 5).map((result) => (
            <div
              key={result.id.videoId}
              className="flex flex-wrap justify-start"
            >
              <div className="mx-12 lg:mx-48 mt-8 ">
                <div className="text-sm">
                  <p>www.youtube.com</p>
                </div>
                <Link to="/">
                  <div>
                    <h4 className="text-blue-500 font-bold text-xl hover:underline">
                      {result.snippet.title}
                    </h4>
                  </div>
                </Link>
                <p>{result.videoId}</p>
                <div className="flex mt-2">
                  <div className="flex-none w-52 h-32 md:w-60 md:h-32">
                    <Link to="/">
                      <img
                        className="w-full h-full object-cover hover:opacity-70 transition-opacity duration-300"
                        src={result.snippet.thumbnails.medium.url}
                        alt=""
                      />
                    </Link>
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default VideosSearch;
