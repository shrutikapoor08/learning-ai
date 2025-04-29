import React, { useState, useEffect } from "react";
import "./App.css";

const PREFERENCE = {
  LIKED: true,
  DISLIKED: false,
  NO_PREFERENCE: undefined,
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [properties, setProperties] = useState([]);

  const saveProperty = async (property) => {
    // Send data to parse properties
    const url = "/api/save-property";

    const responseData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });

    if (!responseData.ok) {
      const errorMessage = await responseData.text();
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    console.log(await responseData.json());
  };

  const renderProperties = (responseData) => {
    return responseData.map(({ property }) => {
      const {
        bedrooms,
        bathrooms,
        city,
        address,
        price,
        media,
        homeType,
        zpid,
      } = property;
      const imgSrc = media?.allPropertyPhotos?.highResolution?.[0];
      return (
        <div
          key={zpid}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <img
              src={
                imgSrc || "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={`${address?.streetAddress || "Property"}`}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
              {homeType || "Home"}
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xl font-bold text-gray-800">
                ${price?.value?.toLocaleString() || "Price unavailable"}
              </p>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">{bedrooms || 0}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="mx-2">{bathrooms || 0}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              {address?.streetAddress || ""}, {address?.city || city || ""}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() =>
                  saveProperty({
                    bedrooms,
                    bathrooms,
                    city,
                    streetAddress: address?.streetAddress,
                    price,
                    imgSrc,
                    homeType,
                    zpid,
                    preference: PREFERENCE.LIKED,
                  })
                }
                className="flex-1 mr-2 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
              >
                Like
              </button>
              <button
                onClick={() =>
                  saveProperty({
                    bedrooms,
                    bathrooms,
                    city,
                    streetAddress: address?.streetAddress,
                    price,
                    imgSrc,
                    homeType,
                    zpid,
                    preference: PREFERENCE.DISLIKED,
                  })
                }
                className="flex-1 ml-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
              >
                Dislike
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = searchInput;
    if (!description) return;

    // Send data to parse properties
    const url = "/api/parse-properties";
    const formData = { post: description };

    const responseData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!responseData.ok) {
      const errorMessage = await responseData.text();
      throw new Error(errorMessage);
    }

    const parsedData = await responseData.json();
    setProperties(parsedData);
  };

  return (
    <div className="flex p-4 m-4">
      <div className="mx-auto justify-center items-center m-10 min-h-screen">
        <h1 className="sm:text-6xl text-4xl text-slate-900 mb-10 font-bold sans-serif">
          Search for properties in Seattle
        </h1>

        <textarea
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="I am looking for a 3 bedroom single family house in Seattle..."
        />

        <button
          onClick={() =>
            setSearchInput(
              "Looking for a 3 bedroom house in Seattle in the starting range of 1 million to 2 million"
            )
          }
          className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 my-10 display-none "
        >
          Fill Description
        </button>

        <button
          onClick={handleSubmit}
          className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 my-10"
        >
          Search
        </button>

        <div id="properties" className="flex flex-row flex-wrap">
          {properties.length > 0 && (
            <h2 className="font-bold text-xl">
              Seattle WA Real Estate & Homes For Sale
            </h2>
          )}
          {renderProperties(properties)}
        </div>
      </div>
    </div>
  );
}

export default App;
