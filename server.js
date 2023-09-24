import express from "express";
// import testAPI from "./client.js";
import fs from "fs";
import { dirname } from "path";
import path from "path";
import llmApi from "./llm.js";

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

const __dirname = path.resolve(path.dirname(""));

app.use(express.json({ strict: false }));

app.post("/parse-properties", async function (req, res) {
  const requirements = req.body.post;
  // const response = await llmApi(requirements);

  // const { properties } = JSON.parse(response);
  // console.log({ response });
  // const propertiesRequirements = {
  //   price_ending: properties.price_ending?.value,
  //   price_starting: properties?.price_starting?.value,
  //   bedrooms: properties?.bedrooms?.value,
  // };

  // res.json(propertiesRequirements);
  res.json("Hello");
});

app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
