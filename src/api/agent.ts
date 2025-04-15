// agent.ts

// IMPORTANT - Add your API keys here. Be careful not to publish them.
import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

// AGENTS 
/*
Model - OpenAI GPT 4o
Memory - Short Term, Long Term. 
Tools - Tavily Search (web search - figuring out proximity), Parser Tool (DIY)
*/

const realEstateAgent = async ({ userQuestion }) => {
  const webTool = new TavilySearchResults({ maxResults: 3 })

console.log({ userQuestion });
// const agentTools = [tools]; // Initialize tools
const agentModel = new ChatOpenAI({ temperature: 0, apiKey: process.env.OPENAI_API_KEY, maxRetries: 2 });
const agentCheckpointer = new MemorySaver(); // Initialize memory to persist state between graph runs

const agent = createReactAgent({
  llm: agentModel,
  tools: [webTool],
  checkpointSaver: agentCheckpointer,
});


// Now it's time to use!
const agentNextState = await agent.invoke(
  { messages: [new HumanMessage(userQuestion)] },
  { configurable: { thread_id: "42" } },
);
console.log(
  agentNextState.messages[agentNextState.messages.length - 1].content,
);

// const agentFunRestaurantState = await agent.invoke(
//   { messages: [new HumanMessage("is it in a fun neighborhood? Yes, no, or maybe?")] },
//   { configurable: { thread_id: "42" } },
// );

// console.log(agentFunRestaurantState?.messages);

// console.log(
//   agentFunRestaurantState.messages[agentFunRestaurantState.messages.length - 1].content,
// );

// const result = agentNextState.messages[agentNextState.messages.length - 1].content;

// return result;
}

export default realEstateAgent;

// const propertyDetails = {
//   'address': '808 3rd Ave, Seattle, WA 98104, United States'
// }


// realEstateAgent({ propertyDetails});