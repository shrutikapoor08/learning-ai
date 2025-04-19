import { useEffect, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useRecommendedPropertyStore from "../../store/recommendedProperty";
import useAgentStore from "../../store/agentStore";
import PropertyCard from "../PropertyCard/PropertyCard";
import "../../App.css";

export default function Recommendations() {
  const [propertyIds, setPropertyIds] = useState([]);
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

  const recommendedPropertiesDetails = useQuery(api.property.getByIds, {
    ids: propertyIds,
  });

  useEffect(() => {
    if (recommendedProperties?.length > 0) {
      // Extract property IDs from the recommendations
      const ids = recommendedProperties.map((prop) => prop._id);
      setPropertyIds(ids);
    }
  }, [recommendedProperties]);

  useEffect(() => {
    if (property?.zpid) {
      fetchRecommendations(property);
    }
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

    setRecommendedProperties(propertiesResult);
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Similar Properties You May Like
      </h2>

      {!recommendedPropertiesDetails && <p>Generating recommendations...</p>}

      {recommendedPropertiesDetails?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedPropertiesDetails.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <PropertyCard
                zpid={property.zpid}
                imgSrc={property.imgSrc}
                price={property.price}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                streetAddress={property.streetAddress}
                city={property.city}
                propertyDetails={{
                  homeType: property.homeType,
                  nice_to_haves: property.nice_to_haves,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {recommendedPropertiesDetails?.length === 0 && property?.zpid && (
        <p>No similar properties found. Try selecting a different property.</p>
      )}
    </div>
  );
}
