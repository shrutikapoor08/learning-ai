import React from "react";
import { Link } from "@tanstack/react-router";
import NiceToHaveFeatures from "../NiceToHaveFeatures/NiceToHaveFeatures";
import { Heart, MapPin, Bed, Bath, Square, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyActions from "../PropertyActions/PropertyActions";
import useAgentStore from "../../store/agentStore";

function PropertyCard(property) {
  const {
    zpid,
    imgSrc,
    price,
    bedrooms,
    bathrooms,
    streetAddress,
    city,
    propertyDetails,
    homeType,
  } = property;
  const setProperty = useAgentStore((state) => state.setProperty);
  const realEstateAgentRef = useAgentStore((state) => state.realEstateAgentRef);

  return (
    <>
      <Link
        to={`/details/${zpid}`}
        search={{
          price: price,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          streetAddress: streetAddress,
          city: city,
          imgSrc: imgSrc,
          homeType: propertyDetails?.homeType,
          nice_to_haves: propertyDetails?.nice_to_haves,
          preference: propertyDetails?.preference,
        }}
      >
        <img
          src={imgSrc}
          alt="Property Image"
          className="featured-image aspect-3/2 w-full h-48 rounded-s object-cover"
        />

        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 mt-2">${price}</h3>
          <div className="flex flex-col items-center justify-center text-md text-bold text-[#767676]">
            <p>
              {streetAddress}, {city}
            </p>
            <p className="text-sm text-black text-center">
              {bedrooms} bedrooms, {bathrooms} bathrooms
            </p>
          </div>
        </div>

        {propertyDetails?.nice_to_haves && (
          <NiceToHaveFeatures features={propertyDetails?.nice_to_haves} />
        )}
      </Link>
      <PropertyActions
        onAskQuestion={() => {
          setProperty(property);
          realEstateAgentRef.current.scrollIntoView({
            behavior: "smooth",
          });
          realEstateAgentRef.current.focus();
        }}
      />
    </>
  );
}

export default PropertyCard;
