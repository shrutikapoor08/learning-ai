import express from "express";
import path from "path";
import { URLSearchParams } from "url";
import { ConvexHttpClient } from "convex/browser";
import * as dotenv from "dotenv";
import llmApi, { generateEmbeddings } from "./llm.js";

// Configuration
dotenv.config({ path: ".env.local" });

const ZILLOW_API = {
  SEARCH: "https://zillow-working-api.p.rapidapi.com/search/byaddress",
  PROPERTY_DETAILS: "https://zillow-working-api.p.rapidapi.com/pro/byzpid",
};

const app = express();
const port = process.env.PORT || 3001;
const convex = new ConvexHttpClient(process.env["VITE_CONVEX_URL"]);
const __dirname = path.resolve(path.dirname(""));

// Middleware
app.use(express.json({ strict: false }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// Utility functions
async function fetchProperties({ propertiesRequirements }) {
  const params = new URLSearchParams({
    location: "Seattle, WA",
    listingStatus: "For_Sale",
    bed_min: propertiesRequirements.bedrooms,
    bed_max: "No_Max",
    min: propertiesRequirements.price_starting,
    max: propertiesRequirements.price_ending,
  }).toString();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "zillow-working-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(`${ZILLOW_API.SEARCH}?${params}`, options);
    const result = JSON.parse(await response.text());
    return result?.searchResults;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function savePropertyToDB(property) {
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
    nice_to_haves,
  } = property;

  try {
    const embeddings = await generateEmbeddings(property);
    const formattedProperty = {
      zpid: String(zpid),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      city: String(city),
      streetAddress: String(streetAddress),
      price: String(price),
      imgSrc: String(imgSrc),
      homeType: String(homeType),
      preference: Boolean(preference),
      nice_to_haves: nice_to_haves || [],
      embedding: embeddings,
    };

    return await convex.mutation("property:insert", formattedProperty);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

// Routes
app.post("/api/parse-properties", async (req, res) => {
  try {
    const requirements = req.body.post;
    const response = await llmApi(requirements);

    const propertiesRequirements = {
      price_ending: response?.price_ending?.replace(/,/g, ""),
      price_starting: response?.price_starting?.replace(/,/g, ""),
      bedrooms: response?.bedrooms,
      zpid: response?.zpid,
    };

    const propertiesResponse = await fetchProperties({
      propertiesRequirements,
    });
    res.send(propertiesResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/save-property", async (req, res) => {
  try {
    const property = req.body;
    const propertiesResponse = await savePropertyToDB(property);
    res.send(propertiesResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/property-details", async (req, res) => {
  try {
    const { zpid } = req.query;
    const response = await fetch(
      `${ZILLOW_API.PROPERTY_DETAILS}?zpid=${zpid}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "zillow-working-api.p.rapidapi.com",
        },
      }
    );

    const propertyDetail = await response.json();
    res.send(propertyDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
