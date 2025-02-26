import React from "react";
import { Link } from "@tanstack/react-router";
import NiceToHaveFeatures from "../NiceToHaveFeatures/NiceToHaveFeatures";
import { Heart, MapPin, Bed, Bath, Square, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyActions from "../PropertyActions/PropertyActions";

function PropertyCard({
  zpid,
  imgSrc,
  price,
  propertyDetails,
  bedrooms,
  bathrooms,
  streetAddress,
  city,
  onLike,
  onDislike,
}) {
  return (
    <Link to={`/details/${zpid}`}>
      <img
        src={imgSrc}
        alt="Property Image"
        className="featured-image aspect-3/2 w-full h-48 rounded-s object-cover"
      />
      <PropertyActions onLike={onLike} onDislike={onDislike} />

      <div className="mb-2">
        <h3 className="text-xl font-bold">${price}</h3>
        <div className="flex text-sm text-[#767676]">
          <MapPin className="w-4 h-4 mr-1" />
          <p>
            {streetAddress}, {city}
          </p>
        </div>
      </div>

      {propertyDetails?.nice_to_haves && (
        <NiceToHaveFeatures features={propertyDetails?.nice_to_haves} />
      )}
      <p className="text-xs m-1">
        {bedrooms} bedrooms, {bathrooms} bathrooms
      </p>
    </Link>
  );
}

export default PropertyCard;
