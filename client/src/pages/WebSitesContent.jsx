import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer'

const WebSitesContent = () => {
  const { id } = useParams(); // URL'den 'id' parametresini al
  const [websiteContent, setWebsiteContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumunu takip etmek için bir state
  const [error, setError] = useState("");

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

  return (
    <div>
      <Header></Header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {websiteContent && (
          <>
            <h1 className=" mt-32 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl text-center">
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
