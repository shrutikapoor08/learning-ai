import PropertyDetails from "../PropertyDetails/PropertyDetails";

const PropertiesList = ({properties}) => {
    const renderProperties = () => {
        return properties?.map?.(({ property }) => {
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
                zpid
              }}
            />
          );
        });
      };

      return (
      <div> {renderProperties()} </div>
    
    )

}

export default PropertiesList;