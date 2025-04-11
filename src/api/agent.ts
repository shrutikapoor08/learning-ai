// agent.ts

// IMPORTANT - Add your API keys here. Be careful not to publish them.
import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { toolNode} from "./tools/tools.ts";

// AGENTS 
/*
Model - OpenAI GPT 4o
Memory - Short Term, Long Term. 
Tools - Tavily Search (web search - figuring out proximity), Parser Tool (DIY)
*/

const realEstateAgent = async ({ propertyDetails }) => {

  console.log({ propertyDetails });
const agentTools = [tools]; // Initialize tools
const agentModel = new ChatOpenAI({ temperature: 0, apiKey: process.env.OPENAI_API_KEY, maxRetries: 2 });
const agentCheckpointer = new MemorySaver(); // Initialize memory to persist state between graph runs

const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});

// Now it's time to use!
const agentNextState = await agent.invoke(
  { messages: [new HumanMessage("how many restaurants are close to this property within a 0.5 mile radius and which cuisines?")] },
  { configurable: { thread_id: "42" } },
);

const agentOpenRestaurantState = await agent.invoke(
  { messages: [new HumanMessage("is it in a central location? Yes, no, or maybe?")] },
  { configurable: { thread_id: "42" } },
);

console.log(
  agentOpenRestaurantState.messages[agentOpenRestaurantState.messages.length - 1].content,
);

const result = agentNextState.messages[agentNextState.messages.length - 1].content;

return result;
}

export default realEstateAgent;

const propertyDetails = {
  'address': '808 3rd Ave, Seattle, WA 98104, United States'
}


realEstateAgent({ propertyDetails});