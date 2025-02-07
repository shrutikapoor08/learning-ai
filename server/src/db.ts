import { ConvexHttpClient } from "convex/browser";
import { generateEmbeddings } from "./llm.ts";
import { api } from "../convex/_generated/api.js";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

let convex: ConvexHttpClient | null = null;

export type Property = {
  zpid: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  streetAddress: string;
  price: number;
  imgSrc: string;
  homeType: string;
  preference: boolean;
  nice_to_haves: string[];
};

export function getConvexClient() {
  if (!convex) {
    const convexUrl = process.env.VITE_CONVEX_URL;
    if (!convexUrl) {
      throw new Error(
        "VITE_CONVEX_URL environment variable not set. Ensure .env.local is properly configured."
      );
    }
    convex = new ConvexHttpClient(convexUrl);
  }
  return convex;
}

export async function savePropertyToDB(property: Property) {
  const convex = getConvexClient();
  const {
    bedrooms,
    bathrooms,
    city,
    streetAddress,
    price,
    imgSrc,
    homeType,
    zpid,
    preference,
    nice_to_haves,
  } = property;

  try {
    const embeddings = await generateEmbeddings(property);
    const formattedProperty = {
      zpid: String(zpid),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      city: String(city),
      streetAddress: String(streetAddress),
      price: String(price),
      imgSrc: String(imgSrc),
      homeType: String(homeType),
      preference: Boolean(preference),
      nice_to_haves: nice_to_haves || [],
      embedding: embeddings,
    };

    return await convex.mutation(api.property.insert, formattedProperty);
  } catch (error) {
    console.error(error); // Log the error
    throw new Error((error as Error).message); // Cast error to Error type
  }
}
