import { useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useRecommendedPropertyStore from "../../store/recommendedProperty";
import useAgentStore from "../../store/agentStore";
import PropertyCard from "../PropertyCard/PropertyCard";
import PropertiesListings from "../PropertiesListings/PropertiesListings";
import "../../App.css";

export default function Recommendations() {
  const property = useAgentStore((state) => state.property);
  const setRecommendedProperties = useRecommendedPropertyStore(
    (state) => state.setRecommendedProperties
  );
  const recommendedProperties = useRecommendedPropertyStore(
    (state) => state.recommendedProperties
  );
  const generateRecommendations = useAction(
    api.vectorFunctions.similarProperties
  );

  useEffect(() => {
    useAgentStore.subscribe(
      (state) => state.property,
      fetchRecommendations(property)
    );
  }, [property?.zpid]);

  async function fetchRecommendations(property) {
    if (!property?.zpid) return;

    const {
      zpid,
      bedrooms,
      bathrooms,
      city,
      streetAddress,
      price,
      imgSrc,
      propertyDetails,
    } = property;

    console.log({propertyDetails})
    const propertiesResult = await generateRecommendations({
      property: {
        bedrooms,
        bathrooms,
        city,
        streetAddress,
        price,
        imgSrc,
        zpid,
        homeType: propertyDetails?.homeType,
      },
    });

    // TODO: using the _id from the database, make a query to the databse to get the property details.
    console.log({ propertiesResult });

    setRecommendedProperties(propertiesResult);
  }

  return (
    <div>
      <h2>Generating recommednations...</h2>
      {recommendedProperties?.length > 0 && (
        <section id="recommended-listings" className="py-12 bg-gray-50">
          <PropertiesListings
            properties={recommendedProperties}
            title="Recommended Properties"
          >
            {recommendedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </PropertiesListings>
        </section>
      )}
    </div>
  );
}
