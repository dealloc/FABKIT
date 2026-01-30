import { createFileRoute } from "@tanstack/react-router";
import {useCallback, useRef} from "react";
import { Renderer } from "../components/card-creator/Renderer.tsx";
import {convertToImage} from "../export.ts";

export const Route = createFileRoute("/preview")({
	component: RouteComponent,
});

function RouteComponent() {
	const svgRef = useRef<SVGSVGElement>(null);
	const exportImage = useCallback(async () => {
		if (svgRef.current === null) return;

		const blob = await convertToImage(svgRef.current);
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "card.svg";
		link.click();
	}, []);

	return (
		<div className="flex flex-1 flex-col justify-center items-center p-4 gap-4 max-w-1/2">
			<Renderer ref={svgRef} />

			<section>
				<button type="button" onClick={exportImage}>export</button>
			</section>
			<span className="text-primary">
				Card text export is currently broken, everything else <em>should</em> work.
			</span>
		</div>
	);
}
