import React, { useState, useEffect } from "react";
import { useAction } from "convex/react";
import NiceToHaveFeatures from "./components/NiceToHaveFeatures";
import "./App.css";
import { api } from "../convex/_generated/api";

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
    saveProperty,
  },
}) {
  const [propertyDetails, setPropertyDetails] = useState({});

  const performMyAction = useAction(api.vectorFunctions.similarProperties);

  const fetchDetails = async () => {
    const url = `/api/property-details/?zpid=${zpid}`;
    const response = await fetch(url);
    const responseData = await response.json();

    const property = {
      bedrooms: responseData?.propertyDetails.bedrooms,
      bathrooms: responseData?.propertyDetails.bathrooms,
      city: responseData?.propertyDetails.city,
      streetAddress: responseData?.propertyDetails.streetAddress,
      price: responseData?.propertyDetails.price,
      imgSrc: responseData?.propertyDetails.hiResImageLink,
      photos: responseData?.propertyDetails.originalPhotos,
      homeType: responseData?.propertyDetails.homeType,
      zpid,
      preference: true,
      nice_to_haves:
        responseData?.propertyDetails?.homeInsights?.[0]?.insights?.[0]
          ?.phrases || [],
    };

    setPropertyDetails(property);
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
    performMyAction({
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

    performMyAction({
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
      <img
        src={imgSrc}
        onClick={fetchDetails}
        className="featured-image h-56 max-h-2x w-full rounded-s object-cover"
      />

      <p className="text-l font-bold">${price}</p>
      {propertyDetails?.nice_to_haves && (
        <NiceToHaveFeatures features={propertyDetails?.nice_to_haves} />
      )}
      <p className="text-xs m-1">
        {bedrooms} bedrooms, {bathrooms} bathrooms
      </p>
      <p className="text-xs">
        {streetAddress}, {city}
      </p>

      <div className="flex flex-row justify-center align-center">
        <button
          onClick={handleLike}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
        >
          Like
        </button>
        <button
          onClick={handleDislike}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
        >
          Dislike
        </button>
      </div>
    </div>
  );
}

export default PropertyDetails;
