import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import "dotenv/config";

const llmApi = async (description) => {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    price_ending: "Ending range of price of properties. Parse as a number",
    price_starting:
      "Starting range of price of properties. Parse as a number. If not present, add 0",
    bedrooms: "Number of bedrooms as an integer",
    // neighborhoods:
    //   "comma separated list of neighborhoods in the text such as seattle, botthel",
    // requirements:
    //   "Figure out the must haves of the property. Add as a comma separated list",
  });

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: "Parse the description \n{format_instructions}\n{description}",
    inputVariables: ["description"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const model = new OpenAI({ temperature: 0 });

  // const description =
  //   "I need a single family home in the city of Seattle, Ballard, Shoreline, Bothell neighborhoods starting from 900000 to 1.2 million. also need 3 bedrooms. I want it to have a fireplace, garage, backyard";

  // https://js.langchain.com/docs/modules/model_io/output_parsers/
  const input = await prompt.format({ description: description });

  const response = await model.call(input);

  return response;
};
export default llmApi;
