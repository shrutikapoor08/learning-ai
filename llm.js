import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence } from "langchain/schema/runnable";
import { ChatAnthropic } from "langchain/chat_models/anthropic";

import "dotenv/config";

const llmApi = async (description) => {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  /*
  // *
  // *
  // * Example 1: A Simple Prompt Template and Invoking a Chain
  // *
  // *
  const prompt = PromptTemplate.fromTemplate(
    `You are a starting a new AI startup and thinking of a name.
What is a good name for a startup that uses AI to create {product}?`
  );

  const chain = prompt.pipe(llm);
  const result = await chain.invoke({ product: "real estate listings" });

  console.log(result);

  */

  /*
  // *
  // *
  // * Example 2: Chained Prompt Templates
  // *
  // *


  const prompt1 = PromptTemplate.fromTemplate(
    `What are the three most preferred cities in the world for a person working as a {job}? Only respond with the name of the cities.`
  );
  const prompt2 = PromptTemplate.fromTemplate(
    ` You are a starting a new AI startup and thinking of a name.
    Suggest three good names for a startup that uses AI to create {product}
     in the city {city}. Include the name of the city in the name.`
  );

  const chain = prompt1.pipe(llm).pipe(new StringOutputParser());
  const combinedChain = RunnableSequence.from([
    {
      city: chain,
      product: (input) => input.product,
    },
    prompt2,
    llm,
    new StringOutputParser(),
  ]);

  const result = await combinedChain.invoke({
    job: "Software Engineer",
    product: "Real Estate Listings",
  });

  console.log(result);

  */

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    price_ending:
      "Ending range of price of properties. Parse as a number. Return 1 million if value not given",
    price_starting:
      "Starting range of price of properties. Parse as a number. Return 0 if value not given",
    bedrooms: "Number of bedrooms as an integer. Return 1 if value not given",
  });

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: "\n{format_instructions}\n{description}",
    inputVariables: ["description"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const input = await prompt.format({ description: description });

  const response = await llm.call(input);

  // Sample response -
  // {"price_ending": "1.2 million", "price_starting": "900000", "bedrooms": "3", "fireplace": "true", "garage": "true", "backyard": "true"}
  return response;
};
export default llmApi;

const description =
  "I need a single family home in the city of Seattle, Ballard, Shoreline, Bothell neighborhoods starting from 900000 to 1.2 million. also need 3 bedrooms. I want it to have a fireplace, garage, backyard";

// llmApi();
console.log(await llmApi(description));
