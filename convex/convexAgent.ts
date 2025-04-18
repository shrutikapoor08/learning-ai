
//   import { Agent , createTool} from "@convex-dev/agent";
// import { components, internal } from "./_generated/api";
// import { openai } from "@ai-sdk/openai";
// import { v } from "convex/values";
// import { tool } from "ai";


// // Define an agent similarly to the AI SDK
// const supportAgent = new Agent(components.agent, {
//   // Note: all of these are optional.
//   chat: openai.chat("gpt-4o-mini"),
//   // Used for vector search (RAG).
//   textEmbedding: openai.embedding("text-embedding-3-small"),
//   // Will be the default system prompt if not overriden.
//   instructions: "You are a helpful assistant.",
//   tools: {
//     // Standard AI SDK tool
//     myTool: tool({ description, parameters, execute: () => {}}),
//     // Convex tool
//     myConvexTool: createTool({
//       description: "Convex Tool For Fetching Previous History about properties ",
//       args: v.object({...}),
//       handler: async (ctx, args) => {
//         return "Hello, world!";
//       },
//     }),
//   },
//   // Used for fetching context messages.
//   contextOptions: {
//     // Whether to include tool messages in the context.
//     includeToolCalls: true,
//     // How many recent messages to include. These are added after the search
//     // messages, and do not count against the search limit.
//     recentMessages: 10,
//     // Whether to search across other threads for relevant messages.
//     // By default, only the current thread is searched.
//     searchOtherThreads: true,
//     // Options for searching messages.
//     searchOptions: {
//       // The maximum number of messages to fetch.
//       limit: 100,
//       // Whether to use text search to find messages.
//       textSearch: true,
//       // Whether to use vector search to find messages.
//       vectorSearch: true,
//       // Note, this is after the limit is applied.
//       // E.g. this will quadruple the number of messages fetched.
//       // (two before, and one after each message found in the search)
//       messageRange: { before: 2, after: 1 },
//     },
//   },
//   // Used for storing messages.
//   storageOptions: {
//     // Defaults to false, allowing you to pass in arbitrary context that will
//     // be in addition to automatically fetched content.
//     // Pass true to have all input messages saved to the thread history.
//     saveAllInputMessages: true,
//     // Defaults to true
//     saveOutputMessages: true,
//   },
//   // Used for limiting the number of steps when tool calls are involved.
//   maxSteps: 10,
//   // Used for limiting the number of retries when a tool call fails.
//   maxRetries: 3,
// });
