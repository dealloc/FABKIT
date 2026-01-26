import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/card-creator")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Card creator</div>;
}
