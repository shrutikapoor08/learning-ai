import { createFileRoute } from "@tanstack/react-router";
import PropertyDetailsPage from "../components/PropertyDetailsPage/PropertyDetailsPage";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/details/$propertyId")({
  component: Details,
});

const fetchPropertyDetails = async (propertyId) => {
  // Fetch property details from the Zillow API
  const response = await fetch(`/api/property-details?zpid=${propertyId}`);
  const propertyDetails = await response.json();

  const { streetAddress, city, state, zip } = propertyDetails;

  const address = `${streetAddress}, ${city}, ${state} ${zip}`;

  //Fetch additional nice to haves from agent
  const agentResponse = await fetch(`/api/agent?address=${address}`);

  console.log({ agentResponse });

  return {
    ...propertyDetails,
    nice_to_haves: agentResponse.json(),
  };
};

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

  const details = useQuery({
    queryKey: ["property-details", propertyId],
    queryFn: () => fetchPropertyDetails(propertyId),
  });

  console.log({ details });

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
  // const walkScore = realEstateAgent({ propertyDetails });
  // console.log({ walkScore });
  return <PropertyDetailsPage propertyDetails={propertyDetails} />;
}
