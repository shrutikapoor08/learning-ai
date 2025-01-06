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
    return responseData.map(
      ({
        bedrooms,
        bathrooms,
        city,
        streetAddress,
        price,
        imgSrc,
        homeType,
        zpid,
      }) => {
        return (
          <div
            key={zpid}
            className="flex flex-col rounded-lg s-p-1 s-m-1 p-4 m-2 shadow-sm shadow-indigo-100 text-center"
          >
            <a href="#">
              <img
                src={imgSrc}
                className="featured-image h-56 max-h-2x w-full rounded-s object-cover"
              />
            </a>
            <p className="text-l font-bold">${price}</p>
            <p className="text-xs m-1">
              {bedrooms} bedrooms, {bathrooms} bathrooms
            </p>
            <p className="text-xs">
              {streetAddress}, {city}
            </p>

            <div className="flex flex-row justify-center align-center">
              <button
                onClick={() =>
                  saveProperty({
                    bedrooms,
                    bathrooms,
                    city,
                    streetAddress,
                    price,
                    imgSrc,
                    homeType,
                    zpid,
                    preference: true,
                  })
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
              >
                Like
              </button>
              <button
                onClick={() =>
                  saveProperty({
                    bedrooms,
                    bathrooms,
                    city,
                    streetAddress,
                    price,
                    imgSrc,
                    homeType,
                    zpid,
                    preference: false,
                  })
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
              >
                Dislike
              </button>
            </div>
          </div>
        );
      }
    );
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
              "Looking for a 3 bedroom house in Seattle in the starting range of 1000000 to 21000000"
            )
          }
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 my-10"
        >
          Fill Description
        </button>

        <button
          onClick={handleSubmit}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 my-10"
        >
          Search
        </button>

        <div id="properties" className="flex flex-row justify-center flex-wrap">
          {properties.length > 0 && (
            <h2 className="font-bold text-xl w-full">
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
