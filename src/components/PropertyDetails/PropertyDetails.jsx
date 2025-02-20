import React, { useState, useEffect } from "react";
import { useAction } from "convex/react";
import NiceToHaveFeatures from "../NiceToHaveFeatures/NiceToHaveFeatures";
import PropertyCard from "../PropertyCard/PropertyCard";
import PropertyActions from "../PropertyActions/PropertyActions";
import "../../App.css";
import { api } from "../../../convex/_generated/api";

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
  setRecommendedProperties,
}) {
  const [propertyDetails, setPropertyDetails] = useState({});

  const generateRecommendations = useAction(
    api.vectorFunctions.similarProperties
  );

  const fetchDetails = async () => {
    const url = `/api/property-details/?zpid=${zpid}`;
    const response = await fetch(url);
    const responseData = await response.json();

    const property = {
      bedrooms: responseData?.propertyDetails?.bedrooms,
      bathrooms: responseData?.propertyDetails?.bathrooms,
      city: responseData?.propertyDetails?.city,
      streetAddress: responseData?.propertyDetails?.streetAddress,
      price: responseData?.propertyDetails?.price,
      imgSrc: responseData?.propertyDetails?.hiResImageLink,
      photos: responseData?.propertyDetails?.originalPhotos,
      homeType: responseData?.propertyDetails?.homeType,
      zpid,
      preference: true,
      nice_to_haves:
        responseData?.propertyDetails?.homeInsights?.[0]?.insights?.[0]
          ?.phrases || [],
    };

    setPropertyDetails(property);
  };

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
      nice_to_haves: propertyDetails?.nice_to_haves,
    });
    const recommendedProperties = await generateRecommendations({
      property: {
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
      },
    });
    console.log(recommendedProperties);
    //fetch recommendations from Zillow API
    setRecommendedProperties(recommendedProperties);
  };

  const handleDislike = async () => {
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
      nice_to_haves: propertyDetails?.nice_to_haves,
    });

    generateRecommendations({
      property: {
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
      },
    });
  };

  return (
    <div
      key={zpid}
      className="flex flex-col rounded-lg s-p-1 s-m-1 p-4 m-2 shadow-sm shadow-indigo-100 text-center"
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
      />
      <PropertyActions onLike={handleLike} onDislike={handleDislike} />
    </div>
  );
}

export default PropertyDetails;
