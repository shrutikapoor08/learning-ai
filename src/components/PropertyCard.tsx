import { Link } from "@tanstack/react-router";
import NiceToHaveFeatures from "./NiceToHaveFeatures";
import { PropertyAllDetails } from "./PropertyDetails";

function PropertyCard({
  zpid,
  imgSrc,
  price,
  propertyDetails,
  bedrooms,
  bathrooms,
  streetAddress,
  city,
}: PropertyAllDetails) {
  return (
    <Link to="/details/$propertyId" params={{ propertyId: zpid }}>
      <img
        src={imgSrc}
        alt="Property Image"
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
    </Link>
  );
}

export default PropertyCard;
