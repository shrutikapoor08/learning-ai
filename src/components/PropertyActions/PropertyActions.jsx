import React from "react";
import { ThumbsUp, ThumbsDown, MessagesSquare } from "lucide-react";
import useAgentStore from "../../store/agentStore";

function PropertyActions({ onAskQuestion }) {
  const property = useAgentStore((state) => state.property);

  return (
    <div className="flex flex-row justify-center align-center mb-5 mt-5">
      <button onClick={onAskQuestion} className="flex p-2">
        <MessagesSquare fill="black" className="ml-2" />
        <span className="ml-2 text-sm">Ask a question</span>
      </button>
    </div>
  );
}

export default PropertyActions;
