import { action } from "./_generated/server.js";

import { v } from "convex/values";

// Perform a vector search by using the "liked" property. fetches embeddings from OpenAI for a particular property, and calls Convex vectorSearch to perform a similaritySearch.
export const similarProperties = action({
  args: {
    property: v.object(),
  },
  handler: async (ctx, args) => {
    // TODO:  call OpenAI to get embeddings

    const stringifiedProperty = JSON.stringify(property);
    const embeddings_model = new OpenAIEmbeddings();
    const embeddings = await embeddings_model.embedQuery(stringifiedProperty);

    const results = await ctx.vectorSearch("property", "by_embedding", {
      vector: embedding,
      limit: 5,
    });
    return results;
  },
});
