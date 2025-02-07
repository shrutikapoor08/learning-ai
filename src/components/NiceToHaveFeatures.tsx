import { Badge } from "@/components/ui/badge";

function NiceToHaveFeatures({ features }: { features: string[] }) {
  if (!features) return null;
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
