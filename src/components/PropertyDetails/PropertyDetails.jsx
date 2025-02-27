import React, { useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import useRecommendedPropertyStore from "../../store/recommendedProperty";
import "../../App.css";

function PropertyDetails({
  property: {
    bedrooms,
    bathrooms,
    city,
    streetAddress,
    price,
    imgSrc,
    homeType,
    zpid,
  },
}) {
  const [propertyDetails, setPropertyDetails] = useState({});

  const setLikedProperty = useRecommendedPropertyStore(
    (state) => state.setLikedProperty
  );
  const setDislikedProperty = useRecommendedPropertyStore(
    (state) => state.setDislikedProperty
  );

  const saveProperty = async (property) => {
    // Send data to parse properties
    const url = "/api/save-property";

    const responseData = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    });

    if (!responseData.ok) {
      const errorMessage = await responseData.text();
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const handleLike = async () => {
    const property = {
      bedrooms,
      bathrooms,
      city,
      streetAddress,
      price,
      imgSrc,
      homeType,
      zpid,
      preference: true,
      nice_to_haves: propertyDetails?.nice_to_haves,
    };
    saveProperty(property);
    setLikedProperty(property); //update store
  };

  const handleDislike = async () => {
    const property = {
      bedrooms,
      bathrooms,
      city,
      streetAddress,
      price,
      imgSrc,
      homeType,
      zpid,
      preference: false,
      nice_to_haves: propertyDetails?.nice_to_haves,
    };
    saveProperty(property);
    setDislikedProperty(property); //update store
  };

  return (
    <div
      key={zpid}
      className="flex flex-col bg-white rounded-lg overflow-hidden border border-[#e3e3e3] hover:shadow-md transition-shadow text-center"
    >
      <PropertyCard
        zpid={zpid}
        imgSrc={imgSrc}
        price={price}
        propertyDetails={propertyDetails}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        streetAddress={streetAddress}
        city={city}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
}

export default PropertyDetails;
