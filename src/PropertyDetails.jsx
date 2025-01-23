import React, { useState, useEffect } from "react";
import "./App.css";

function PropertyDetails({
	property: {
		bedrooms,
		bathrooms,
		city,
		streetAddress,
		price,
		imgSrc,
		homeType,
		zpid,
		saveProperty,
	},
}) {
	const [propertyDetails, setPropertyDetails] = useState({});

	const fetchDetails = async () => {
		console.log("fetching details", zpid);
		const url = `/api/property-details/?zpid=${zpid}`;
		const response = await fetch(url);
		const responseData = await response.json();
		setPropertyDetails(responseData);
	};

	return (
		<div
			key={zpid}
			className="flex flex-col rounded-lg s-p-1 s-m-1 p-4 m-2 shadow-sm shadow-indigo-100 text-center"
		>
			<a href="#">
				<img
					src={imgSrc}
					onClick={fetchDetails}
					className="featured-image h-56 max-h-2x w-full rounded-s object-cover"
				/>
			</a>
			<p className="text-l font-bold">${price}</p>
			<p className="text-xs m-1">
				{bedrooms} bedrooms, {bathrooms} bathrooms
			</p>
			<p className="text-xs">
				{streetAddress}, {city}
			</p>

			<div className="flex flex-row justify-center align-center">
				<button
					onClick={() =>
						saveProperty({
							bedrooms,
							bathrooms,
							city,
							streetAddress,
							price,
							imgSrc,
							homeType,
							zpid,
							preference: true,
						})
					}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
					type="button"
				>
					Like
				</button>
				<button
					onClick={() =>
						saveProperty({
							bedrooms,
							bathrooms,
							city,
							streetAddress,
							price,
							imgSrc,
							homeType,
							zpid,
							preference: false,
						})
					}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-right m-2"
					type="button"
				>
					Dislike
				</button>
			</div>
		</div>
	);
}

export default PropertyDetails;
