import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

function PropertyActions({ onLike, onDislike }) {
  return (
    <div className="flex flex-row justify-center align-center mb-5 mt-5">
      <button onClick={onLike} className="mr-2">
        <ThumbsUp fill="black" />
      </button>
      <button onClick={onDislike} className="ml-2">
        <ThumbsDown fill="black" />
      </button>
    </div>
  );
}

export default PropertyActions;
