import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

function PropertyActions({ onLike, onDislike }) {
  return (
    <div className="flex flex-row justify-center align-center">
      <button onClick={onLike}>
        <ThumbsUp fill="black" />
      </button>
      <button onClick={onDislike}>
        <ThumbsDown fill="black" />
      </button>
    </div>
  );
}

export default PropertyActions;
