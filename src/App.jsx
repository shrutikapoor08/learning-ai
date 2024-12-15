import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [properties, setProperties] = useState([]);

  const saveProperty = async () => {
    // Send data to parse properties
    const url = "/save-property";
    const formData = {};

    const responseData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!responseData.ok) {
      const errorMessage = await responseData.text();
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    console.log(await responseData.json());
  };

  const renderProperties = (responseData) => {
    responseData.map(
      ({
        bedrooms,
        bathrooms,
        city,
        streetAddress,
        price,
        imgSrc,
        homeType,
      }) => {
        return (
          <div
            key={streetAddress}
            className="flex flex-col rounded-lg p-4 m-4 shadow-sm shadow-indigo-100 text-center"
          >
            <img src={imgSrc} className="h-56 w-full rounded-md object-cover" />
            <p>{streetAddress}</p>
            <p>{bedrooms} bedrooms</p>
            <p>{bathrooms} bathrooms</p>
            <p>${price}</p>
            <button
              onClick={saveProperty}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
            >
              Save
            </button>
          </div>
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = searchInput;

    // Send data to parse properties
    const url = "/parse-properties";
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
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const parsedData = await responseData.json();
    setProperties(parsedData);
  };

  useEffect(() => {
    renderProperties(properties);
  }, [properties]);

  return (
    <div className="flex max-w-5xl p-4 m-4">
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
        ></textarea>

        <button
          onClick={handleSubmit}
          className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 my-10"
        >
          Search
        </button>

        <div id="properties" className="flex flex-col">
          {properties.map((property) => (
            <div
              key={property.streetAddress}
              className="flex flex-col rounded-lg p-4 m-4 shadow-sm shadow-indigo-100 text-center"
            >
              <img
                src={property.imgSrc}
                className="h-56 w-full rounded-md object-cover"
              />
              <p>{property.streetAddress}</p>
              <p>{property.bedrooms} bedrooms</p>
              <p>{property.bathrooms} bathrooms</p>
              <p>${property.price}</p>
              <button
                onClick={saveProperty}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
