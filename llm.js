import { PromptTemplate } from "@langchain/core/prompts";
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
        .describe("Ending price of budget. Return 1000000 if not passed"),
      price_starting: z
        .string()
        .describe("Starting price of budget. Return 0 if not passed"),
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
          "Nice to haves. Return as an array of string. If nothing is passed, return backyard."
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
