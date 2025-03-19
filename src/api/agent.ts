// agent.ts

// IMPORTANT - Add your API keys here. Be careful not to publish them.
import "dotenv/config";

import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";


// AGENTS 
/*
Model - OpenAI GPT 4o
Memory - Short Term, Long Term. 
Tools - Tavily Search, Booking tool, Calendar
*/

const realEstateAgent = async ({ propertyDetails }) => {

  console.log({ propertyDetails });
const agentTools = [new TavilySearchResults({ maxResults: 3 })]; // Initialize tools
const agentModel = new ChatOpenAI({ temperature: 0, apiKey: process.env.OPENAI_API_KEY });
const agentCheckpointer = new MemorySaver(); // Initialize memory to persist state between graph runs

const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});

// Now it's time to use!
const agentFinalState = await agent.invoke(
  { messages: [new HumanMessage(`what is the walk score of ${propertyDetails?.address}?`)] },
  { configurable: { thread_id: "42" } },
);

console.log(
  agentFinalState.messages[agentFinalState.messages.length - 1].content,
);

const agentNextState = await agent.invoke(
  { messages: [new HumanMessage("how many restaurants are close to this property within a 0.5 mile radius and which cuisines?")] },
  { configurable: { thread_id: "42" } },
);

const agentOpenRestaurantState = await agent.invoke(
  { messages: [new HumanMessage("which ones are open now?")] },
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
  'address': 'Aster St SE, Tumwater, WA 98501, United States'
}

realEstateAgent({ propertyDetails});