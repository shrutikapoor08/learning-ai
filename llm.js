import { PromptTemplate } from "@langchain/core/prompts";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

import { z } from "zod";

import "dotenv/config";

const llmApi = async (description) => {
  console.log({ description });
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
      bedrooms: z.number().describe("Number of bedrooms."),
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

  const loader = new JSONLoader("./src/data.json");
  const jsonParsedData = await loader.load();

  const embeddings_model = new OpenAIEmbeddings();
  const embeddings = await embeddings_model.embedDocuments(jsonParsedData);
  console.log(embeddings);

  const response = await chain.invoke({
    description: description,
    format_instructions: parser.getFormatInstructions(),
  });

  console.log({ response });
  return response;
};

export default llmApi;
