import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import useAgentStore from "../../store/agentStore";
const RealEstateAgent = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState(null);
  const realEstateAgentRef = useRef(null);
  const setRealEstateAgentRef = useAgentStore(
    (state) => state.setRealEstateAgentRef
  );
  setRealEstateAgentRef(realEstateAgentRef);
  const property = useAgentStore((state) => state.property);

  const placeholderText = property?.streetAddress
    ? `Ask me anything about ${property?.streetAddress} in ${property?.city}`
    : "Ask me anything about a property";

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setResponse("Loading response...");

      const result = await fetch("/api/real-estate-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuestion: userInput, property: property }),
      });

      if (!result.ok) {
        throw new Error(`Server responded with status: ${result.status}`);
      }
      const text = await result.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      setResponse(text);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="relative">
        <input
          type="text"
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          value={userInput}
          placeholder={placeholderText}
          className="w-full px-4 py-4 text-gray-900 placeholder-gray-600 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={realEstateAgentRef}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          disabled={!userInput}
          onClick={handleSubmit}
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
      <div className="mt-4">{response && <p>{response}</p>}</div>
    </div>
  );
};

export default RealEstateAgent;
