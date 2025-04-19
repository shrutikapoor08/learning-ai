import React from "react";
import { MessageSquare } from "lucide-react";
import useAgentStore from "../../store/agentStore";

function PropertyActions({ onAskQuestion }) {
  const setIsAgentExpanded = useAgentStore((state) => state.setIsAgentExpanded);

  const handleAskQuestion = () => {
    // Call the original onAskQuestion function
    if (onAskQuestion) {
      onAskQuestion();
    }

    // Expand the agent chat
    setIsAgentExpanded(true);
  };

  return (
    <div className="flex flex-row justify-center align-center mb-5 mt-5">
      <button
        onClick={handleAskQuestion}
        className="flex text-md items-center justify-center px-4 py-2 text-gray-700 hover:text-blue-500"
      >
        <MessageSquare className="h-4 w-4 ml-2" />
        <span className="ml-2">Ask a question</span>
      </button>
    </div>
  );
}

export default PropertyActions;
