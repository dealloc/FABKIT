import { createFileRoute } from "@tanstack/react-router";
import { CardTypeField } from "../components/home/CardTypeField.tsx";
import { FeaturedArtist } from "../components/home/FeaturedArtist.tsx";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col justify-center items-center p-4 gap-4">
			<div className="w-full md:w-1/3">
				<CardTypeField />
			</div>
			<FeaturedArtist />
		</div>
	);
}
