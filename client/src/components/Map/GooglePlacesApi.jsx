import React, { useEffect, useRef, useState } from "react";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../constants/constants";
import { Link } from "react-router-dom";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const GooglePlacesApi = ({ setSelectedLocation }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        // types: ["(cities)"],
        componentRestrictions: { country: "TR" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log({ query });

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    console.log({ latLng });
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="">
      <form
        className="w-2/3 mt-4 flex flex-col md:flex-row gap-4 mb-4 pl-32"
        onSubmit={(event) => {
          event.preventDefault(); // Sayfanın yeniden yüklenmesini önle
          handleSubmit(); // Arama işlemini gerçekleştirecek fonksiyonu çağır
        }}
      >
        <input
          ref={autoCompleteRef}
          className="form-control w-full md:w-3/4 h-12 p-4 text-lg border-gray-200"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Places ..."
          value={query}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </form>

      <div className="flex justify-center items-center p-4">
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

      <hr />
    </div>
  );
};

export default GooglePlacesApi;


 /*    <div className="search-location-input">
      <label>Type in your suburb or postcode</label>
      <input
        ref={autoCompleteRef}
        className="form-control"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search Places ..."
        value={query}
      />
    </div> */