import { createFileRoute } from "@tanstack/react-router";
import PropertyDetailsPage from "../components/PropertyDetailsPage/PropertyDetailsPage";

export const Route = createFileRoute("/details/$propertyId")({
  component: Details,
});

function Details() {
  const { propertyId } = Route.useParams();
  const { price, bedrooms } = Route.useSearch();

  const propertyDetails = {
    bedrooms,
    price,
    zpid: propertyId,
  };

  return <PropertyDetailsPage propertyDetails={propertyDetails} />;
}
