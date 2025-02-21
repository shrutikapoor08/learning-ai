import React from "react";
import { Link } from "@tanstack/react-router";
import NiceToHaveFeatures from "../NiceToHaveFeatures/NiceToHaveFeatures";

function PropertyCard({
  zpid,
  imgSrc,
  price,
  propertyDetails,
  bedrooms,
  bathrooms,
  streetAddress,
  city,
}) {
  return (
    <Link to={`/details/${zpid}`}>
      <img
        src={imgSrc}
        alt="Property Image"
        className="featured-image aspect-3/2 w-56 h-28 rounded-s object-cover"
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
    </Link>
  );
}

export default PropertyCard;
