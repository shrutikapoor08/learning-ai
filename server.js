import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

import "dotenv/config";

const model = new OpenAI({ temperature: 0 });
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];
const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
});

const input =
  "Who is Olivia Wilde's boyfriend?" +
  " What is his current age raised to the 0.23 power?";
console.log(`Executing with input "${input}"...`);

const result = await executor.call({ input });
console.log({ result });

// import axios from "axios";
// import express from "express";
// let houses = {};
// const options = {
//   method: "GET",
//   url: "https://zillow56.p.rapidapi.com/search",
//   params: {
//     location: "seattle, wa",
//     status: "forSale",
//     sortSelection: "priced",
//     isSingleFamily: "true",
//     price_max: "1100000",
//     beds_min: "3",
//     isApartment: "false",
//     isCondo: "false",
//     isTownhouse: "false",
//   },
//   headers: {
//     "X-RapidAPI-Key": "1082b29331mshf1c50763d566794p1aa9ffjsne135989b6a1b",
//     "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
//   },
// };
// // const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", function (req, res) {
//   let response;
//   let houses;
//   const fetchData = async () => {
//     response = await axios.request(options);
//     houses = response.data;

//     // const em = document.createElement("em");
//     // const para = document.querySelector("p");

//     // em.textContent = houses[0].streetAddress;
//     // para.appendChild(em);
//   };

//   fetchData();
//   res.json(response);
// });

// app.listen(port, function () {
//   console.log(`Example app listening on port ${port}!`);
// });

// export default app;
// // module.exports = app;
