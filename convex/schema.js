import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  property: defineTable({
    zpid: v.string(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    city: v.string(),
    streetAddress: v.string(),
    price: v.string(),
    imgSrc: v.string(),
    homeType: v.string(),
    preference: v.boolean(),
    embedding: v.array(v.float64()),
    nice_to_haves: v.array(v.string()),
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
    filterFields: ["nice_to_haves"],
  }),
});
