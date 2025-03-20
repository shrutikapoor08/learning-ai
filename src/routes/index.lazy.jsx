import { createLazyFileRoute } from "@tanstack/react-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "../App";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  );
}
