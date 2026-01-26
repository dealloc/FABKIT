import { createFileRoute } from "@tanstack/react-router";
import { useCardCreator } from "../stores/card-creator.ts";

export const Route = createFileRoute("/card-creator")({
	component: RouteComponent,
});

function RouteComponent() {
	const { cardType } = useCardCreator();

	return <div>Card creator: {cardType}</div>;
}
