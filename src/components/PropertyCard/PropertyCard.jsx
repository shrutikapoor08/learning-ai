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
    <>
      <Link
        to={`/details/${zpid}`}
        search={{
          price: price,
          bedrooms: bedrooms,
        }}
      >
        <img
          src={imgSrc}
          alt="Property Image"
          className="featured-image aspect-3/2 w-full h-48 rounded-s object-cover"
        />

        <div className="mb-2 p-4">
          <h3 className="text-xl font-bold mb-2 mt-2">${price}</h3>
          <div className="flex items-center text-center ext-sm text-[#767676]">
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
      <PropertyActions onLike={onLike} onDislike={onDislike} />
    </>
  );
}

export default PropertyCard;
