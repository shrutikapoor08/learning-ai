import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence } from "langchain/schema/runnable";
import { ChatAnthropic } from "langchain/chat_models/anthropic";

import { z } from "zod";

import "dotenv/config";

const description =
  "Looking for a house in the range of 900000 to 1.2 million. Needs to have 3 bedrooms";

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

  /*
  ***** PROPERTY API 

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
  */

  // We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      price_ending: z
        .string()
        .describe("Ending price of budget. Return 0 if not passed"),
      price_starting: z
        .string()
        .describe("Starting price of budget. Return 0 if not passed"),
    })
  );

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "Parse the description provided by user to extract information about real estate preferences.\n{format_instructions}\n{description}."
    ),
    new OpenAI({ temperature: 0 }),
    parser,
  ]);

  // console.log(parser.getFormatInstructions());

  const response = await chain.invoke({
    description: description,
    format_instructions: parser.getFormatInstructions(),
  });

  return response;
};
export default llmApi;

// llmApi();
console.log(await llmApi(description));
