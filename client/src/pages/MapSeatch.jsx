import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { FaTh } from "react-icons/fa";
import React, { useState } from "react";
import GooglePlacesApi from "../components/Map/GooglePlacesApi";
import Map from "../components/Map/Map";
import Header from "../components/Header";

const MapSeatch = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        // Enter tuşuna basıldığında "/list" sayfasına yönlendirme yapılır
        navigate("/list");
      }
    };

    const [selectedLocation, setSelectedLocation] = useState({
      lat: 39.9334,
      lng: 32.8597,
    });

  return (
    <div>
        <Header></Header>
      <div style={{ height: "100vh", width: "100%" }}>
        <GooglePlacesApi
          setSelectedLocation={setSelectedLocation}
        ></GooglePlacesApi>
        <Map selectedLocation={selectedLocation}></Map>
        
      </div>
    </div>
  );
};

export default MapSeatch;
