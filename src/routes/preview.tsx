import { createFileRoute } from "@tanstack/react-router";
import { Preview } from "../components/card-creator/Preview.tsx";

export const Route = createFileRoute("/preview")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Preview />;
}
