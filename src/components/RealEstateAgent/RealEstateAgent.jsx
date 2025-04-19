import React, { useState, useRef, useEffect } from "react";
import useAgentStore from "../../store/agentStore";
import ChatBot from "../ChatBot/ChatBot";

const RealEstateAgent = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const realEstateAgentRef = useRef(null);

  // Get expanded state and setter from store
  const isExpanded = useAgentStore((state) => state.isAgentExpanded);
  const setIsExpanded = useAgentStore((state) => state.setIsAgentExpanded);
  const setRealEstateAgentRef = useAgentStore(
    (state) => state.setRealEstateAgentRef
  );

  useEffect(() => {
    setRealEstateAgentRef(realEstateAgentRef);
  }, [setRealEstateAgentRef]);

  const property = useAgentStore((state) => state.property);

  // Scroll into view when expanded
  useEffect(() => {
    if (isExpanded && realEstateAgentRef?.current) {
      realEstateAgentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isExpanded]);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="fixed bottom-0 right-0 z-50 w-full md:w-96 transition-all duration-300 shadow-lg"
      style={{
        height: isExpanded ? "500px" : "60px",
        maxWidth: "100%",
      }}
      ref={realEstateAgentRef}
    >
      <div
        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 flex justify-between items-center cursor-pointer rounded-t-lg"
        onClick={toggleExpand}
      >
        <div className="font-bold text-lg">Real Estate Agent</div>
        <div>{isExpanded ? "▼" : "▲"}</div>
      </div>

      {isExpanded && (
        <div className="w-full h-full bg-white border border-gray-200 border-t-0 rounded-b-lg overflow-hidden">
          <ChatBot
            messages={chatHistory}
            onSendMessage={handleSendMessage}
            placeholder={placeholderText}
            isLoading={isLoading}
            botName="Real Estate Agent"
            maxHeight={440}
          />
        </div>
      )}
    </div>
  );
};

export default RealEstateAgent;
