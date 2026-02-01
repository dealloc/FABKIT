/**
 * Card Export System
 *
 * Handles conversion of SVG card previews to high-quality PNG images.
 *
 * ## Export Process (Two-Phase Rendering)
 *
 * ### Phase 1: SVG Rendering with Canvg
 * The SVG card preview is rendered to an OffscreenCanvas using Canvg,
 * which provides accurate SVG rendering including masks, clip paths,
 * and complex styling. However, Canvg cannot render `<foreignObject>`
 * elements (used for rich text with Tiptap).
 *
 * ### Phase 2: Foreign Object Rendering
 * Each `<foreignObject>` element (containing HTML/DOM content) is
 * individually rendered to a canvas using html-to-image and composited
 * onto the main canvas at the correct position.
 *
 * This two-phase approach ensures complete card rendering with both
 * SVG graphics and HTML-based rich text content.
 *
 * ## Scale Factor
 * The `scale` parameter controls output resolution:
 * - scale=1.0: Natural SVG size (~375x523px for standard cards)
 * - scale=2.0: 2x resolution for higher quality
 * - scale affects canvas dimensions and element positioning
 */

import { toCanvas } from "@jpinsonneau/html-to-image";
import { Canvg, type IOptions, presets } from "canvg";

/** XML serializer for converting SVG DOM to string format */
const serializer = new XMLSerializer();

/** Canvg preset configured for OffscreenCanvas rendering */
const preset = presets.offscreen();

/**
 * Converts an SVG card element to a PNG image Blob.
 *
 * Performs two-phase rendering:
 * 1. Renders SVG structure with Canvg
 * 2. Composites foreignObject elements (rich text) on top
 *
 * @param svg - SVG element containing the card preview
 * @param scale - Output scale multiplier (default 1.0, use 2.0+ for high-quality export)
 * @returns Promise resolving to PNG image Blob
 * @throws Error if canvas context cannot be acquired
 */
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

/**
 * Renders a single SVG foreignObject element to a canvas.
 * ForeignObjects contain HTML/DOM content (like Tiptap rich text)
 * that cannot be rendered by Canvg.
 *
 * @param object - SVG foreignObject element to render
 * @returns Promise resolving to canvas containing rendered HTML
 */
async function exportForeignObject(
	object: SVGForeignObjectElement,
): Promise<HTMLCanvasElement> {
	return await toCanvas(object.children[0] as HTMLElement, {
		backgroundColor: "transparent",
		canvasWidth: object.width.baseVal.value,
		canvasHeight: object.height.baseVal.value,
	});
}
