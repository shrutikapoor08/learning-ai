import { createLazyFileRoute } from "@tanstack/react-router";
import App from "../App";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ErrorBoundary } from "react-error-boundary";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </ErrorBoundary>
  );
}
