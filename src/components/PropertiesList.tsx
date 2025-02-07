import PropertyDetails from "./PropertyDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PropertiesList = ({ properties }: { properties: any[] }) => {
  return (
    <>
      <div>
        {properties?.map?.(({ property }) => {
          const {
            bedrooms,
            bathrooms,
            address,
            price,
            media,
            propertyType,
            zpid,
          } = property;

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
            />
          );
        })}
      </div>
    </>
  );
};

export default PropertiesList;
