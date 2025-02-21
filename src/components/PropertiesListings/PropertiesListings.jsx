import PropertyDetails from "../PropertyDetails/PropertyDetails";

const PropertiesListings = ({ properties, setRecommendedProperties }) => {
  const renderProperties = () => {
    return properties?.map?.(({ property }) => {
      if (!property || !property?.zpid) return null;
      const { bedrooms, bathrooms, address, price, media, propertyType, zpid } =
        property;

      return (
        <PropertyDetails
          key={zpid}
          property={{
            bedrooms,
            bathrooms,
            city: address.city,
            streetAddress: address.streetAddress,
            price: price?.value,
            imgSrc: media?.allPropertyPhotos?.highResolution[0],
            homeType: propertyType,
            zpid,
          }}
          setRecommendedProperties={setRecommendedProperties}
        />
      );
    });
  };

  return <div className="flex flex-wrap gap-4"> {renderProperties()} </div>;
};

export default PropertiesListings;
