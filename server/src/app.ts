import express from "express";
import { URLSearchParams } from "url";
import llmApi from "./llm.ts";
import { savePropertyToDB } from "./db.ts";

const ZILLOW_API = {
  SEARCH: "https://zillow-working-api.p.rapidapi.com/search/byaddress",
  PROPERTY_DETAILS: "https://zillow-working-api.p.rapidapi.com/pro/byzpid",
};

export const app = express();

// Middleware
app.use(express.json({ strict: false }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

type PropertyRequirements = {
  propertiesRequirements: {
    price_ending: string;
    price_starting: string;
    bedrooms: number;
  };
};

// Utility functions
async function fetchProperties({
  propertiesRequirements,
}: PropertyRequirements) {
  const params = new URLSearchParams({
    location: "Seattle, WA",
    listingStatus: "For_Sale",
    bed_min: propertiesRequirements.bedrooms.toString(),
    bed_max: "No_Max",
    min: propertiesRequirements.price_starting,
    max: propertiesRequirements.price_ending,
  }).toString();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
      "X-RapidAPI-Host": "zillow-working-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(`${ZILLOW_API.SEARCH}?${params}`, options);
    const result = await response.json();
    return result?.searchResults;
  } catch (error) {
    throw new Error((error as Error).message);
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
    };

    const propertiesResponse = await fetchProperties({
      propertiesRequirements,
    });
    res.send(propertiesResponse);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/api/save-property", async (req, res) => {
  try {
    const property = req.body;
    const propertiesResponse = await savePropertyToDB(property);
    res.send(propertiesResponse);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
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
          "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
          "X-RapidAPI-Host": "zillow-working-api.p.rapidapi.com",
        },
      }
    );

    const propertyDetail = await response.json();
    res.send(propertyDetail);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
app.get("/api/health", async (req, res) => {
  res.json({
    message: "Server is running",
  });
});
