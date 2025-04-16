import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import useAgentStore from "../../store/agentStore";

const RealEstateAgent = ({ realEstateAgentRef }) => {
  const [userInput, setUserInput] = useState("");

  const property = useAgentStore((state) => state.property);
  console.log({ property });

  const placeholderText = property
    ? `Ask me about ${property?.streetAddress}`
    : "Ask me about a property";

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch("/api/real-estate-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userQuestion: userInput }),
    });
    const data = await result.json();
    console.log({ data });
  };

  return (
    <div className="relative flex flex-col w-full ">
      <div className="relative">
        <input
          type="text"
          onChange={onChange}
          value={userInput}
          placeholder={placeholderText}
          className="w-full px-4 py-4 text-gray-900 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
