import { BaseListChatMessageHistory } from "@langchain/core/chat_history";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: Blog,
});

function Blog() {
  return <div className="p-2">Hello from Blog!</div>;
}
