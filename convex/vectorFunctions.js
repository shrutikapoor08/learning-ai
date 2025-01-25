import { action } from "./_generated/server.js";

import { v } from "convex/values";

// Perform a vector search by using the "liked" property. fetches embeddings from OpenAI for a particular property, and calls Convex vectorSearch to perform a similaritySearch.
export const similarProperties = action({
  args: {
    property: {
      zpid: "4tu348tu483",
      bedrooms: 3,
      bathrooms: 2,
      city: "Seattle",
      streetAddress: "123 Main St",
      price: "1000000",
      imgSrc: "https://example.com/image.jpg",
      homeType: "House",
      preference: true,
      embedding: [1, 2, 3],
      nice_to_haves: ["backyard", "pool"],
    },
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
