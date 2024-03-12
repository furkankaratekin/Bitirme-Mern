import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const WebSitesContent = () => {
  const { id } = useParams(); // URL'den 'id' parametresini al
  const [websiteContent, setWebsiteContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumunu takip etmek için bir state
  const [error, setError] = useState("");
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const userIds = useSelector((state) => state.user.currentUser._id);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchWebsiteContent = async () => {
      setIsLoading(true); // Veri çekme işlemi başladığında yükleme durumunu true yap
      try {
        const response = await axios.get(
          `http://localhost:5000/api/websites/${id}`
        );
        setWebsiteContent(response.data);
        setError(""); // Başarılı bir istek sonrası hata mesajını temizle
      } catch (error) {
        console.error("Error fetching website content:", error);
        setError("Website content could not be fetched.");
      } finally {
        setIsLoading(false); // İstek tamamlandığında yükleme durumunu false yap
      }
    };

    fetchWebsiteContent();
  }, [id]);

  if (isLoading) return <div>Loading...</div>; // İçerik yüklenirken yükleme mesajı göster

  if (error) return <div>Error: {error}</div>; // Hata oluştuğunda hata mesajı göster

  //Favorileri değiştirecek olan şey
  const toggleFavorite = async (websiteId, isFavorite) => {
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
  };

  return (
    <div>
      <Header></Header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {websiteContent && (
          <>
            <div className="flex justify-end mb-8 mt-36">
              <button
                onClick={() => {
                  const isFavorite = favoriteIds.includes(websiteContent._id);
                  toggleFavorite(websiteContent._id, isFavorite).then(() => {
                    // Başarılı işlem sonrası favoriteIds state'ini güncelle
                    if (isFavorite) {
                      setFavoriteIds(
                        favoriteIds.filter((id) => id !== websiteContent._id)
                      );
                    } else {
                      setFavoriteIds([...favoriteIds, websiteContent._id]);
                    }
                  });
                }}
              >
                {favoriteIds.includes(websiteContent._id) ? (
                  <IoMdHeart className="text-2xl" />
                ) : (
                  <IoMdHeartEmpty className="text-2xl" />
                )}
              </button>
            </div>
            <h1 className=" text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl text-center">
              {websiteContent.ana_baslik}
            </h1>

            <div className="flex justify-center mt-6">
              <img
                className="rounded-lg"
                src={websiteContent.icerik_image}
                alt=""
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            <p className="mt-16 text-gray-600 text-lg md:text-xl leading-relaxed">
              {websiteContent.uzun_aciklama}
            </p>
            <p className="mt-6 mb-40 text-gray-600 text-base md:text-lg leading-relaxed">
              {websiteContent.icerik}
            </p>
            {/* Gerekirse burada daha fazla içerik gösterilebilir */}
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default WebSitesContent;
