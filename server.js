import express from "express";
// import testAPI from "./client.js";
import fs from "fs";
import { dirname } from "path";
import path from "path";
import llmApi from "./llm.js";
import axios from "axios";

import { createDirectus, rest, createItem, readItems } from "@directus/sdk";
const client = createDirectus("https://database.directus.app").with(rest());

const app = express();
const port = process.env.PORT || 3001;

const __dirname = path.resolve(path.dirname(""));

app.use(express.json({ strict: false }));

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

const fetchProperties = async ({ propertiesRequirements }) => {
  const options = {
    method: "GET",
    url: "https://zillow56.p.rapidapi.com/search",
    params: {
      location: "seattle",
      status: "forSale",
      beds: propertiesRequirements.bedrooms,
      price_min: propertiesRequirements.price_starting,
      price_max: propertiesRequirements.price_ending,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

const savePropertiesToDB = async ({ propertyParams }) => {
  console.log("TESTING$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  let item;
  try {
    item = await client.request(
      createItem("Property", {
        id: "2",
        starting_range: "300000",
      })
    );
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }

  console.log({ item });
  return item;
};

app.post("/api/parse-properties", async function (req, res) {
  console.log("parse properties");
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

app.post("/save-property", async function (req, res) {
  // const propertyParams = {
  //   price_ending: response?.price_ending?.replace(/,/g, ""),
  //   price_starting: response?.price_starting?.replace(/,/g, ""),
  //   bedrooms: response?.bedrooms,
  //   zpid: response?.zpid,
  // };

  const propertyParams = {};

  // call DB API for fetching properties
  const propertiesResponse = await savePropertiesToDB({ propertyParams });

  res.set("Access-Control-Allow-Origin", "*");

  res.send(propertiesResponse);
});

app.use("/", function (req, res) {
  console.log("hitting path /");
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
