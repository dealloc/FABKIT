/**
 * Contains all logic related to exporting our card data
 */
import { Canvg, type IOptions, presets } from "canvg";

const serializer = new XMLSerializer();
const preset = presets.offscreen();

export async function convertToImage(svg: SVGSVGElement): Promise<Blob> {
	const width = svg.width.baseVal.value;
	const height = svg.height.baseVal.value;
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

	return await canvas.convertToBlob({ type: "image/png", quality: 2 });
}
