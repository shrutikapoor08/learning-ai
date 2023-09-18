import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

import "dotenv/config";

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  price_ending: "Ending range of price of properties. Parse as a number",
  price_starting:
    "Starting range of price of properties. Parse as a number. If not present, add 500,000",
  bedrooms: "Number of bedrooms as an integer",
  wants:
    "any should haves in the property. add none if none mentioned. if mentioned, parse them as a comma separated list",
  // neighborhoods:
  //   "comma separated list of neighborhoods in the text such as seattle, botthel",
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
  "I need a single family home in the city of Seattle, Ballard, Shoreline, Bothell neighborhoods starting from 900000 to 1.2 million. also need 3 bedrooms. I want it to have a fireplace, garage, backyard";

// https://js.langchain.com/docs/modules/model_io/output_parsers/
const input = await prompt.format({ description: description });

const response = await model.call(input);

console.log(response);

// const zodSchema = z.object({
//   properties: z
//     .array(
//       z.object({
//         price_ending: z
//           .string()
//           .describe("Ending range of price of properties"),
//         price_starting: z
//           .boolean()
//           .describe("Starting range of price of properties"),
//         bedrooms: z.string().optional().describe("Number of bedrooms wanted"),
//       })
//     )
//     .describe("An array of requirements mentioned in the text"),
// });

// // const outputFixingParser = OutputFixingParser.fromLLM(chatModel, outputParser);

// const prompt = new ChatPromptTemplate({
//   promptMessages: [
//     SystemMessagePromptTemplate.fromTemplate(
//       "List all requirements mentioned in the following text."
//     ),
//     HumanMessagePromptTemplate.fromTemplate("{propertyDescription}"),
//   ],
//   inputVariables: ["propertyDescription"],
// });

// const llm = new ChatOpenAI({
//   key: process.env.OPENAI_API_KEY,
//   modelName: "gpt-3.5-turbo-0613",
//   temperature: 0,
// });

// // Binding "function_call" below makes the model always call the specified function.
// // If you want to allow the model to call functions selectively, omit it.
// // const functionCallingModel = llm.bind({
// //   functions: [
// //     {
// //       name: "output_formatter",
// //       description: "Should always be used to properly format output",
// //       parameters: zodToJsonSchema(zodSchema),
// //     },
// //   ],
// //   function_call: { name: "output_formatter" },
// // });

// const outputParser = new JsonOutputFunctionsParser();

// // const chain = prompt.pipe(functionCallingModel).pipe(outputParser);

// const response = await await llm.call();

// // prompt.format({
// //   propertyDescription:
// //     "I want to buy a single family home in Seattle, Ballard, Shoreline, Bothell starting from 500000 to 1 million. 3 bedrooms needed",
// // });

// console.log(JSON.stringify(response, null, 2));
