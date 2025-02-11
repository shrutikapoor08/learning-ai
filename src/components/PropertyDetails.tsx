import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../server/convex/_generated/api";
import PropertyCard from "./PropertyCard";
import PropertyActions from "./PropertyActions";

export interface Property {
  bedrooms: number;
  bathrooms: number;
  city: string;
  streetAddress: string;
  price: string;
  imgSrc: string;
  homeType: string;
  zpid: string;
}

export interface PropertyDetailsType {
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  streetAddress?: string;
  price?: string;
  imgSrc?: string;
  photos?: string[];
  homeType?: string;
  zpid: string;
  preference: boolean;
  nice_to_haves?: string[];
}

export type PropertyAllDetails = {
  propertyDetails: PropertyDetailsType;
} & Property;

interface PropertyDetailsProps {
  property: Property;
}

function PropertyDetails({ property }: PropertyDetailsProps) {
  const {
    bedrooms,
    bathrooms,
    city,
    streetAddress,
    price,
    imgSrc,
    homeType,
    zpid,
  } = property;
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetailsType>({
    zpid: zpid,
    preference: false,
  });

  const performMyAction = useAction(api.vectorFunctions.similarProperties);

  const fetchDetails = async () => {
    const url = `/api/property-details/?zpid=${zpid}`;
    const response = await fetch(url);
    const responseData = await response.json();

    const property: PropertyDetailsType = {
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

  const saveProperty = async (property: PropertyDetailsType) => {
    // Send data to parse properties
    const url = "/api/save-property";

    const responseData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    performMyAction({
      property: {
        bedrooms,
        bathrooms,
        city,
        streetAddress,
        price: parseInt(price),
        imgSrc,
        homeType,
        zpid: parseInt(zpid),
        preference: true,
        nice_to_haves: propertyDetails?.nice_to_haves || [],
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
        price: parseInt(price),
        imgSrc,
        homeType,
        zpid: parseInt(zpid),
        preference: false,
        nice_to_haves: propertyDetails?.nice_to_haves || [],
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
        homeType="For Sale"
      />
      <PropertyActions onLike={handleLike} onDislike={handleDislike} />
    </div>
  );
}

export default PropertyDetails;
