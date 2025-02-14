import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import PropertiesList from "./components/PropertiesList/PropertiesList.jsx";
import { useQuery } from "@tanstack/react-query";
const PREFERENCE = {
  LIKED: true,
  DISLIKED: false,
  NO_PREFERENCE: undefined,
};

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);
const Error = ({ error }) => (
  <div className="flex justify-center items-center">
    <h1 className="text-red-500">{error.message}</h1>
  </div>
);

function App() {
  const ref = useRef("");
  const [searchInput, setSearchInput] = useState("");
  const [recommendedProperties, setRecommendedProperties] = useState([]);

  const {
    isLoading,
    isError,
    error,
    refetch,
    data: properties,
  } = useQuery({
    queryKey: [ref.current],
    queryFn: getPropertiesFromNaturalLanguage,
    enabled: false,
  });

  async function getPropertiesFromNaturalLanguage() {
    const url = "/api/parse-properties";
    const formData = { post: searchInput };

    const responseData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return responseData.json();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput) return;
    ref.current = searchInput;
    refetch();
  };

  const renderProperties = () => (
    <>
      {properties?.length > 0 && (
        <h2 className="font-bold text-xl w-full">
          Seattle WA Real Estate & Homes For Sale
        </h2>
      )}
      {properties?.length > 0 && (
        <PropertiesList
          properties={properties}
          setRecommendedProperties={setRecommendedProperties}
        />
      )}

      {recommendedProperties.length > 0 && (
        <>
          <h2 className="font-bold text-xl w-full">
            Based on your recommendations
          </h2>

          {recommendedProperties?.map?.((property) => {
            console.log({ property });
            return (
              <div key={property?._id}>
                <h2>{property?._id}</h2>
              </div>
            );
          })}
        </>
      )}
    </>
  );

  return (
    <main className="flex p-4 m-4">
      <div className="mx-auto justify-center items-center m-10 min-h-screen">
        <h1 className="sm:text-6xl text-4xl text-slate-900 mb-10 font-bold sans-serif">
          Search for properties in Seattle
        </h1>
        <textarea
          value={searchInput || ref.current}
          onChange={(e) => setSearchInput(e.target.value)}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border 
            border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="I am looking for a 3 bedroom single family house in Seattle..."
        />
        <div className="flex gap-2 my-10">
          <button
            onClick={() =>
              setSearchInput(
                "Looking for a 3 bedroom house in Seattle in the starting range of 1000000 to 21000000"
              )
            }
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 
              hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
              focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
              text-sm px-5 py-3 text-center"
          >
            Fill Description
          </button>

          <button
            onClick={handleSubmit}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 
              hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
              focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
              text-sm px-5 py-3 text-center"
          >
            Search
          </button>
        </div>
        {isLoading && <Loader />}
        {isError && <Error error={error} />}
        <section className="flex flex-row justify-center flex-wrap">
          {renderProperties()}
        </section>
      </div>
    </main>
  );
}

export default App;
