// agent.ts

// IMPORTANT - Add your API keys here. Be careful not to publish them.
import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { kMaxLength } from "buffer";

// AGENTS 
/*
Model - OpenAI GPT 4o
Memory - Short Term, Long Term. 
Tools - Tavily Search (web search - figuring out proximity), Parser Tool (DIY)
*/

const realEstateAgent = async ({ userQuestion, property }) => {
  const webTool = new TavilySearchResults({ maxResults: 3 })

console.log("{ property }", property);
// const agentTools = [tools]; // Initialize tools
const agentModel = new ChatOpenAI({ temperature: 0, apiKey: process.env.OPENAI_API_KEY, maxRetries: 2 });
const agentCheckpointer = new MemorySaver(); // Initialize memory to persist state between graph runs

const agent = createReactAgent({
  llm: agentModel,
  tools: [webTool],
  checkpointSaver: agentCheckpointer,
});

const question = new HumanMessage(userQuestion + " " + JSON.stringify(property) );

const agentNextState = await agent.invoke(
  { messages: [question] },
  { configurable: { thread_id: property?.zpid } },
);
console.log(
  agentNextState.messages[agentNextState.messages.length - 1].content,
);

const result = agentNextState.messages[agentNextState.messages.length - 1].content;

return result;
}

export default realEstateAgent;

// const propertyDetails = {
//   'address': '808 3rd Ave, Seattle, WA 98104, United States'
// }


// realEstateAgent({ propertyDetails});