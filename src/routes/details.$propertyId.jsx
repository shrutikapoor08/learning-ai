import { createFileRoute } from "@tanstack/react-router";
import PropertyDetailsPage from "../components/PropertyDetailsPage/PropertyDetailsPage";

export const Route = createFileRoute("/details/$propertyId")({
  component: Details,
});

function Details() {
  const { propertyId } = Route.useParams();
  const {
    price,
    bedrooms,
    bathrooms,
    city,
    streetAddress,
    imgSrc,
    homeType,
    preference,
    nice_to_haves,
  } = Route.useSearch();

  const propertyDetails = {
    bedrooms,
    price,
    bathrooms,
    city,
    streetAddress,
    imgSrc,
    homeType,
    preference,
    nice_to_haves,
    propertyId,
  };

  return <PropertyDetailsPage propertyDetails={propertyDetails} />;
}
