import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Renderer } from "../components/card-creator/Renderer.tsx";

export const Route = createFileRoute("/preview")({
	component: RouteComponent,
});

function RouteComponent() {
	const svgRef = useRef<SVGSVGElement>(null);

	return (
		<div className="flex flex-1 flex-col justify-center items-center p-4 gap-4 max-w-1/2">
			<Renderer ref={svgRef} />

			<section>
				<p>test</p>
			</section>
		</div>
	);
}
