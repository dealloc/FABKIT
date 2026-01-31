import { useMemo } from "react";

export type ScaledFontSizeOptions = {
	/** The text content to measure */
	text: string;
	/** Base font size (used for reference length) */
	baseFontSize: number;
	/** Reference text length at which baseFontSize is ideal */
	referenceLength?: number;
	/** Minimum font size (prevents text from becoming too small) */
	minFontSize?: number;
	/** Maximum font size (prevents text from becoming too large) */
	maxFontSize?: number;
	/** Scaling factor (how aggressively to scale, default 0.5) */
	scalingFactor?: number;
};

/**
 * Calculate a font size that scales inversely with text length.
 * Shorter text = larger font, longer text = smaller font.
 *
 * @example
 * // For SVG text element
 * const fontSize = useScaledFontSize({
 *   text: CardName,
 *   baseFontSize: 24,
 *   referenceLength: 20,
 *   minFontSize: 16,
 *   maxFontSize: 32
 * });
 */
export function useScaledFontSize(options: ScaledFontSizeOptions): number {
	const {
		text,
		baseFontSize,
		referenceLength = 20,
		minFontSize = baseFontSize * 0.6,
		maxFontSize = baseFontSize * 1.5,
		scalingFactor = 0.5,
	} = options;

	return useMemo(() => {
		const textLength = text.length;

		// If text is shorter than reference, scale up
		// If text is longer than reference, scale down
		const ratio = referenceLength / Math.max(textLength, 1);

		// Apply scaling factor to make the effect more or less aggressive
		// scalingFactor = 1.0 means full scaling, 0.5 means moderate scaling
		const adjustedRatio = 1 + (ratio - 1) * scalingFactor;

		// Calculate the scaled font size
		const scaledSize = baseFontSize * adjustedRatio;

		// Clamp between min and max
		return Math.max(minFontSize, Math.min(maxFontSize, scaledSize));
	}, [
		text.length,
		baseFontSize,
		referenceLength,
		minFontSize,
		maxFontSize,
		scalingFactor,
	]);
}

/**
 * Calculate a font size for HTML content based on plain text length.
 * Use this for foreignObject scenarios where you can't control inner HTML.
 *
 * @example
 * // For foreignObject with uncontrolled HTML
 * const fontSize = useScaledFontSizeFromHTML({
 *   html: CardTextHTML,
 *   baseFontSize: 14,
 *   referenceLength: 100
 * });
 */
export function useScaledFontSizeFromHTML(
	options: Omit<ScaledFontSizeOptions, "text"> & { html: string },
): number {
	const { html, ...restOptions } = options;

	// Strip HTML tags to get approximate text length
	const plainText = useMemo(() => {
		return html.replace(/<[^>]*>/g, "");
	}, [html]);

	return useScaledFontSize({
		text: plainText,
		...restOptions,
	});
}
