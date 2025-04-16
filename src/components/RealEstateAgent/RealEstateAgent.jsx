import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import useAgentStore from "../../store/agentStore";

const RealEstateAgent = () => {
  const [userInput, setUserInput] = useState("");
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

    const result = await fetch("/api/real-estate-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userQuestion: userInput, property: property }),
    });
    const data = await result.json();
    console.log({ data });
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
    </div>
  );
};

export default RealEstateAgent;
