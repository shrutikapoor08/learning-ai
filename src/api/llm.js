import { PromptTemplate } from "@langchain/core/prompts";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { OpenAIEmbeddings } from "@langchain/openai";
import { z } from "zod";
import "dotenv/config";

export async function generateEmbeddings(property) {
  const stringifiedProperty = JSON.stringify(property);
  const embeddings_model = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return embeddings_model.embedQuery(stringifiedProperty);
}

const llmApi = async (description) => {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      price_ending: z
        .string()
        .describe(
          "Ending price of budget. Return 10000000 for properties that are for sale. If the user is looking for a property for rent, then return 10000. If nothing is passed, return 10000000."
        ),
      price_starting: z
        .string()
        .describe(
          "Starting price of budget.  Return 1000000 for properties that are for sale. If the user is looking for a property for rent, then return 1500. If nothing is passed, return 1000000."
        ),
      bedrooms: z
        .number()
        .describe("Number of bedrooms. Return 1 if not passed"),
      bathrooms: z
        .number()
        .describe("Number of bathrooms. Return 1 if not passed"),
      nice_to_haves: z
        .string()
        .array()
        .describe(
          "Additional preferences of the user, such as frontyard, backyard, nice neighborhood, proximity to schools, etc. Return as an array of string. If nothing is passed, return empty array."
        ),
      location: z
        .string()
        .optional()
        .describe(
          "Location preferences of the user. Return as a string. If nothing is passed, return Seattle, WA."
        ),
      listingStatus: z
        .enum(["For_Sale", "For_Rent", "For_Sale_Or_Rent"])
        .default("For_Sale")
        .optional()
        .describe(
          "If the user is looking for a property for rent, then return For_Rent. If the user is looking for a property for sale, then return For_Sale. If the user is looking for a property for rent or sale, then return For_Sale_Or_Rent. If nothing is passed, return For_Sale"
        ),
    })
  );

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "Parse the description provided by user to extract information about real estate preferences.\n{format_instructions}\n{description}."
    ),
    llm,
    parser,
  ]);

  const response = await chain.invoke({
    description: description,
    format_instructions: parser.getFormatInstructions(),
  });

  console.log(response);
  return response;
};

export default llmApi;
