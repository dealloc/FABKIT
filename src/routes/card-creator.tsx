import { createFileRoute } from "@tanstack/react-router";
import { useCardCreator } from "../stores/card-creator.ts";

export const Route = createFileRoute("/card-creator")({
	component: RouteComponent,
});

function RouteComponent() {
	useCardCreator();

	return (
		<div className="flex flex-row flex-1">
			<section className="p-4 flex-1"></section>
			<section className="flex flex-col p-4 max-w-1/3">PREVIEW</section>
		</div>
	);
}
