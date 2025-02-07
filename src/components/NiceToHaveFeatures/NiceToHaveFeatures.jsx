import React from "react";
import { Badge } from "@/components/ui/badge";

function NiceToHaveFeatures(nice_to_haves) {
  if (!nice_to_haves?.features) return null;
  const features = nice_to_haves?.features;
  if (!features?.length) return null;

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {features.map((feature, index) => (
        <Badge key={index} variant="secondary">
          {feature}
        </Badge>
      ))}
    </div>
  );
}

export default NiceToHaveFeatures;
