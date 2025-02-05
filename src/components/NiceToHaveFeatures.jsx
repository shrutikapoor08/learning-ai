import React from "react";

function NiceToHaveFeatures(nice_to_haves) {
  if (!nice_to_haves?.features) return null;
  const features = nice_to_haves?.features;
  if (!features?.length) return null;

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {features.map((feature, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
        >
          {feature}

        </span>
      ))}
    </div>
  );
}

export default NiceToHaveFeatures;
