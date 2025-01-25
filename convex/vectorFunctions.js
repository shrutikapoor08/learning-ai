import { action } from "./_generated/server.js";

import { v } from "convex/values";

export const similarProperties = action({
  args: {
    property: v.object(),
  },
  handler: async (ctx, args) => {
    // TODO:  call OpenAI to get embeddings
    const embedding = [];

    const results = await ctx.vectorSearch("property", "by_embedding", {
      vector: embedding,
      limit: 5,
    });
    return results;
  },
});
