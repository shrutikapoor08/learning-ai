"use node";
import { action } from "./_generated/server.js";
import { v } from "convex/values";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { OpenAIEmbeddings } from "@langchain/openai";

// Perform a vector search by using the "liked" property. fetches embeddings from OpenAI for a particular property, and calls Convex vectorSearch to perform a similaritySearch.
export const similarProperties = action({
  args: {
    property: v.object({
      bedrooms: v.number(),
      bathrooms: v.number(),
      city: v.string(),
      streetAddress: v.string(),
      price: v.float64(),
      imgSrc: v.string(),
      homeType: v.string(),
      zpid: v.float64(),
      preference: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const stringifiedProperty = JSON.stringify(args.property);
    console.log(process.env);
    const embeddings_model = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const embeddings = await embeddings_model.embedQuery(stringifiedProperty);

    console.log({ embeddings });
    const results = await ctx.vectorSearch("property", "by_embedding", {
      vector: embeddings,
      limit: 5,
    });
    return results;
  },
});
