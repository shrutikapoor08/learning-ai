import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/details/$propertyId")({
  component: Details,
});

function Details() {
  const { propertyId } = Route.useParams();

  return <div>Hello {propertyId}</div>;
}
