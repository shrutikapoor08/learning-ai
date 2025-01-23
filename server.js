import path from "node:path";
import { URLSearchParams } from "node:url";
import express from "express";
import llmApi from "./llm.js";
import "dotenv/config";
import { createDirectus, createItem, readItems, rest } from "@directus/sdk";

const client = createDirectus("https://database.directus.app").with(rest());

const ZILLOW_API = {
	SEARCH: "https://zillow-working-api.p.rapidapi.com/search/byaddress",
	PROPERTY_DETAILS: "https://zillow-working-api.p.rapidapi.com/byzpid",
};

const app = express();
const port = process.env.PORT || 3001;

const __dirname = path.resolve(path.dirname(""));

app.use(express.json({ strict: false }));

app.use((req, res, next) => {
	res.set("Access-Control-Allow-Origin", "*");
	next();
});

//TODO: Move to utility.
const fetchProperties = async ({ propertiesRequirements }) => {
	const params = new URLSearchParams({
		location: "Seattle, WA",
		listingStatus: "For_Sale",
		bed_min: propertiesRequirements.bedrooms,
		bed_max: "No_Max",
		min: propertiesRequirements.price_starting,
		max: propertiesRequirements.price_ending,
	}).toString();
	const url = `${ZILLOW_API.SEARCH}?${params}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": process.env.RAPID_API_KEY,
			"X-RapidAPI-Host": "zillow-working-api.p.rapidapi.com",
		},
	};

	let result;
	try {
		const response = await fetch(url, options);

		result = JSON.parse(await response.text());
		return result?.searchResults;
	} catch (error) {
		throw new Error(error.message);
	}
};

const savePropertyToDB = async (property) => {
	const {
		bedrooms,
		bathrooms,
		city,
		streetAddress,
		price,
		imgSrc,
		homeType,
		zpid,
		preference,
	} = property;
	let item;
	try {
		item = await client.request(
			createItem("Property", {
				zpid,
				bedrooms,
				bathrooms,
				city,
				streetAddress,
				price,
				imgSrc,
				homeType,
				preference,
			}),
		);
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}

	return item;
};

app.post("/api/parse-properties", async (req, res) => {
	const requirements = req.body.post;
	const response = await llmApi(requirements);

	const propertiesRequirements = {
		price_ending: response?.price_ending?.replace(/,/g, ""),
		price_starting: response?.price_starting?.replace(/,/g, ""),
		bedrooms: response?.bedrooms,
		zpid: response?.zpid,
	};

	// call API for fetching properties
	const propertiesResponse = await fetchProperties({ propertiesRequirements });

	res.set("Access-Control-Allow-Origin", "*");
	res.send(propertiesResponse);
});

app.post("/api/save-property", async (req, res) => {
	const property = req.body;
	// call DB API for fetching properties
	const propertiesResponse = await savePropertyToDB(property);

	res.set("Access-Control-Allow-Origin", "*");

	res.send(propertiesResponse);
});

app.get("/api/property-details", async (req, res) => {
	const zpid = req.query.zpid;

	const response = await fetch(`${ZILLOW_API.PROPERTY_DETAILS}?zpid=${zpid}`, {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": process.env.RAPID_API_KEY,
			"X-RapidAPI-Host": "zillow-working-api.p.rapidapi.com",
		},
	});

	const propertyDetail = await response.json();

	res.set("Access-Control-Allow-Origin", "*");
	res.send(propertyDetail);
});

app.use("/", (req, res) => {
	console.log("hitting path /");
	res.sendFile(path.join(`${__dirname}/index.html`));
});

app.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});
