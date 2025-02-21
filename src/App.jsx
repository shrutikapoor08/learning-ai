import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useInfiniteQuery } from "@tanstack/react-query";
import PropertyCard from "./components/PropertyCard/PropertyCard.jsx";
import FeaturedSection from "./components/FeaturedSection/FeaturedSection.jsx";
import Header from "./components/Header/Header.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import PropertiesListings from "./components/PropertiesListings/PropertiesListings.jsx";

const PREFERENCE = { LIKED: true, DISLIKED: false, NO_PREFERENCE: undefined };

const Loader = () => (
  <div className="flex justify-center items-center m-10">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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
  const allDataRef = useRef(null);

  const {
    isLoading,
    isError,
    error,
    refetch,
    data: properties,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [ref.current],
    queryFn: getPropertiesFromNaturalLanguage,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // Calculate the total number of items displayed so far
      const totalDisplayed = pages.flat().length;
      // If all items have been displayed, stop pagination
      if (allDataRef.current && totalDisplayed >= allDataRef.current.length) {
        return undefined; // No more pages
      }
      // Return the next page number (incremented by 1 for each page)
      return pages.length;
    },
  });

  async function getPropertiesFromNaturalLanguage({ pageParam = 0 }) {
    const url = "/api/parse-properties";
    const formData = { post: searchInput };
    const responseData = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    allDataRef.current = await responseData.json();

    if (pageParam === 0) {
      return allDataRef.current.slice(0, 20);
    } else {
      const start = pageParam * 20;
      const end = start + 20;

      return allDataRef.current.slice(start, end);
    }
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
      {properties?.pages?.flat().length > 0 && (
        <PropertiesListings
          properties={properties?.pages?.flat()}
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
    <main className="min-h-screen">
      <FeaturedSection>
        <Header />
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSubmit}
          onFillDescription={() =>
            setSearchInput(
              "Looking for a 3 bedroom house in Seattle in the starting range of 1000000 to 21000000"
            )
          }
        />
      </FeaturedSection>

      {isLoading && <Loader />}
      {isError && <Error error={error} />}

      <section id="search-listings" className="py-12">
        <PropertiesListings
          properties={properties?.pages?.flat() || []}
          title="Seattle WA Real Estate & Homes For Sale"
        >
          {properties?.pages?.flat().map(({ property }) => (
            <PropertyCard key={property.zpid} property={property} />
          ))}
        </PropertiesListings>
      </section>

      {recommendedProperties.length > 0 && (
        <section id="recommended-listings" className="py-12 bg-gray-50">
          <PropertiesListings
            properties={recommendedProperties}
            title="Recommended Properties"
          >
            {recommendedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </PropertiesListings>
        </section>
      )}

      {hasNextPage && (
        <div className="flex justify-center py-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
