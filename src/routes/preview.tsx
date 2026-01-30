import { createFileRoute } from "@tanstack/react-router";
import {Renderer} from "../components/card-creator/Renderer.tsx";

export const Route = createFileRoute("/preview")({
	component: RouteComponent,
});

function RouteComponent() {


	return <div className="flex flex-1 flex-col justify-center items-center p-4 gap-4 max-w-1/2">
		<Renderer />

		<section>
			<p>test</p>
		</section>
	</div>;
}
