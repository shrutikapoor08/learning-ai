import React, { useState, useRef } from "react";
import useAgentStore from "../../store/agentStore";
import ChatBot from "../ChatBot/ChatBot";

const RealEstateAgent = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const realEstateAgentRef = useRef(null);
  const setRealEstateAgentRef = useAgentStore(
    (state) => state.setRealEstateAgentRef
  );
  setRealEstateAgentRef(realEstateAgentRef);
  const property = useAgentStore((state) => state.property);

  const placeholderText = property?.streetAddress
    ? `Ask me anything about ${property?.streetAddress} in ${property?.city}`
    : "Ask me anything about a property";

  const handleSendMessage = async (message) => {
    // Add user message to chat
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const result = await fetch("/api/real-estate-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuestion: message, property: property }),
      });

      if (!result.ok) {
        throw new Error(`Server responded with status: ${result.status}`);
      }

      const text = await result.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      // Add bot response to chat
      setChatHistory((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      // Add error message to chat
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${error.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full" ref={realEstateAgentRef}>
      <ChatBot
        messages={chatHistory}
        onSendMessage={handleSendMessage}
        placeholder={placeholderText}
        isLoading={isLoading}
        botName="Real Estate Agent"
        maxHeight={500}
      />
    </div>
  );
};

export default RealEstateAgent;
