import { createFileRoute } from "@tanstack/react-router";
import { FeaturedArtist } from "../components/home/FeaturedArtist.tsx";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="p-4">
			<FeaturedArtist />
		</div>
	);
}
