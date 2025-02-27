import { useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useRecommendedPropertyStore from "../../store/recommendedProperty";
import PropertyCard from "../PropertyCard/PropertyCard";
import PropertiesListings from "../PropertiesListings/PropertiesListings";
import "../../App.css";

export default function Recommendations() {
  const likedProperty = useRecommendedPropertyStore(
    (state) => state.likedProperty
  );
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
    useRecommendedPropertyStore.subscribe((state) => state.likedProperty);
  }, []);

  console.log("liked property ", likedProperty);

  //   const fetchRecommendations = async () => {
  //     const propertiesResult =
  //       likedProperty && (await generateRecommendations(likedProperty));
  //     setRecommendedProperties(propertiesResult);
  //   };

  //   console.log({ recommendedProperties });

  return (
    recommendedProperties?.length > 0 && (
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
    )
  );
}
