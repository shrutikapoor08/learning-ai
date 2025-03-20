import { useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useRecommendedPropertyStore from "../../store/recommendedProperty";
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
    useRecommendedPropertyStore.subscribe(
      (state) => state.likedProperty,
      fetchRecommendations(likedProperty)
    );
  }, [likedProperty]);

  async function fetchRecommendations(property) {
    console.log({ property });
    const propertiesResult = await generateRecommendations({ property });

    // TODO: using the _id from the database, make a query to the databse to get the property details.

    console.log({ propertiesResult });
    setRecommendedProperties(propertiesResult);
  }

  return (
    recommendedProperties?.length > 0 && (
      <section id="recommended-listings" className="py-12 bg-gray-50">
        <PropertiesListings
          properties={recommendedProperties}
          // ERROR: title is not defined
          title="Recommended Properties"
        />
      </section>
    )
  );
}
