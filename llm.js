import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";

import "dotenv/config";

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  price_ending: "Ending range of price of properties",
  price_starting: "Starting range of price of properties",
  bedrooms: "Number of bedrooms",
  cities: "comma separated list of cities or neighborhoods to view",
  // requirements:
  //   "Figure out the must haves of the property. Add as a comma separated list",
});

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template:
    "Find some proprties in my range and preferences \n{format_instructions}\n{description}",
  inputVariables: ["description"],
  partialVariables: { format_instructions: formatInstructions },
});

const model = new OpenAI({ temperature: 0 });

const description =
  "I want to buy a single family home in Seattle, Ballard, Shoreline, area starting from 500000 to 1 million. It needs to have 3 bedrooms, a frontyard, a backyard, and be close to shopping and restaurants. It would be nice to have is a fireplace and have a nice view";

// https://js.langchain.com/docs/modules/model_io/output_parsers/
const input = await prompt.format({ description: description });

const response = await model.call(input);

console.log(response);
