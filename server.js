import express from "express";
// import testAPI from "./client.js";
import fs from "fs";
import { dirname } from "path";
import path from "path";
import llmApi from "./llm.js";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

const __dirname = path.resolve(path.dirname(""));

app.use(express.json({ strict: false }));

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
      "X-RapidAPI-Key": "1082b29331mshf1c50763d566794p1aa9ffjsne135989b6a1b",
      "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.log("issue coming");
    console.error(error);
  }
};

app.post("/parse-properties", async function (req, res) {
  const requirements = req.body.post;
  const response = await llmApi(requirements);
  const responseJson = response;

  // console.log({ responseJson });
  console.log(response);
  console.log(JSON.parse(response));

  const propertiesRequirements = {
    price_ending: response?.price_ending,
    price_starting: response?.price_starting,
    bedrooms: response?.bedrooms,
  };

  // console.log({ propertiesRequirements });

  // const propertiesRequirements = {
  //   price_ending: "1000000",
  //   price_starting: "500000",
  //   bedrooms: 3,
  // }

  // call API for fetching properties
  // const propertiesResponse = await fetchProperties({ propertiesRequirements });

  // res.send(propertiesResponse);
});

app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
