"use node";
import { action } from "./_generated/server.js";
import { v } from "convex/values";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { generateEmbeddings } from "../src/api/llm.js";

//Perform a vector search by using the "liked" property. fetches embeddings from OpenAI for a particular property, and calls Convex vectorSearch to perform a similaritySearch.
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
      nice_to_haves: v.optional(v.array(v.string())),
    }),
  },
  handler: async (ctx, args) => {
    const embeddings = await generateEmbeddings(args.property);
    const results = await ctx.vectorSearch("property", "by_embedding", {
      vector: embeddings,
      limit: 10,
      filterFields: ["price", "bedrooms", "bathrooms", "nice_to_haves"],
    });

    return results;
  },
});
