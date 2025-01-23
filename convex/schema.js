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
  }),
});
