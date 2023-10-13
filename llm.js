import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence } from "langchain/schema/runnable";
import { ChatAnthropic } from "langchain/chat_models/anthropic";

import { z } from "zod";

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
  const result = await chain.invoke({ product: "fashion design" });

  console.log(result);

  */

  // *
  // *
  // * Example 2: Chained Prompt Templates
  // *
  // *
  /*
  const prompt1 = PromptTemplate.fromTemplate(
    `What are the three most preferred cities in the world for a person working as a {job}? Only respond with the name of the cities.`
  );
  const prompt2 = PromptTemplate.fromTemplate(
    ` You are a starting a new AI startup and thinking of a name.
    Suggest a name for a startup that uses AI to create {product}
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
    job: "Fashion Designer",
    product: "Wedding outfits",
  });

  console.log(result);
*/

  // *
  // *
  // * Example 3: Property API
  // *
  // *

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      price_ending: z
        .string()
        .describe("Ending price of budget. Return 0 if not passed"),
      price_starting: z
        .string()
        .describe("Starting price of budget. Return 0 if not passed"),
      bedrooms: z.number().describe("Number of bedrooms."),
    })
  );

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "Parse the description provided by user to extract information about real estate preferences.\n{format_instructions}\n{description}."
    ),
    new OpenAI({ temperature: 0 }),
    parser,
  ]);

  const response = await chain.invoke({
    description: description,
    format_instructions: parser.getFormatInstructions(),
  });

  return response;
};
export default llmApi;

// llmApi();
// const description =
//   "Looking for a house in the range of 900000 to 1200000. Needs to have three bedrooms";
