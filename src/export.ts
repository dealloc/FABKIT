/**
 * Contains all logic related to exporting our card data
 */

import { toCanvas } from "@jpinsonneau/html-to-image";
import { Canvg, type IOptions, presets } from "canvg";

const serializer = new XMLSerializer();
const preset = presets.offscreen();

export async function convertToImage(
	svg: SVGSVGElement,
	scale = 1.0,
): Promise<Blob> {
	const width = svg.width.baseVal.value * scale;
	const height = svg.height.baseVal.value * scale;
	const canvas = new OffscreenCanvas(width, height);
	const ctx = canvas.getContext("2d");
	const svgString = serializer.serializeToString(svg);

	if (ctx === null) {
		throw new Error("Export failed, canvas context could not be acquired");
	}

	console.debug("Generating Canvg from OffscreenCanvas and SVG string");
	const cvg = await Canvg.from(ctx, svgString, preset as IOptions);

	console.debug("Rendering a single Canvg frame");
	await cvg.render();

	console.debug("Rendering foreignObject instances...");
	for (const foreignObject of svg.querySelectorAll("foreignObject")) {
		const image = await exportForeignObject(foreignObject);

		// TODO: splice `image` onto `canvas` as the coordinates of the `foreignObject`
		ctx.drawImage(
			image,
			foreignObject.x.baseVal.value * scale,
			foreignObject.y.baseVal.value * scale,
			foreignObject.width.baseVal.value * scale,
			foreignObject.height.baseVal.value * scale,
		);
	}

	return await canvas.convertToBlob({ type: "image/png", quality: scale });
}

async function exportForeignObject(
	object: SVGForeignObjectElement,
): Promise<HTMLCanvasElement> {
	return await toCanvas(object.children[0] as HTMLElement, {
		backgroundColor: "transparent",
		canvasWidth: object.width.baseVal.value,
		canvasHeight: object.height.baseVal.value,
	});
}
