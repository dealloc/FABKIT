import type { ReactElement } from "react";

// Helper type that encapsulates all information related to rendering text(-adjacent) information.
export interface CardTextConfig {
	// X position in pixels
	x: number;
	// Y position in pixels
	y: number;
	// Text color (e.g., "black", "#fff")
	fill: string;
	// Font family name
	fontFamily: string;
	// Font size in pixels
	fontSize: number;
	// Font weight (e.g., 400 for normal, 700 for bold)
	fontWeight: number;
}

// Helper type that encapsulates all information related to rendering images.
export interface CardImageConfig {
	// X position in pixels
	x: number;
	// Y position in pixels
	y: number;
	// Image width in pixels
	width: number;
	// Image height in pixels
	height: number;
}

// Helper type that encapsulates all information related to rendering foreignObject.
export interface CardObjectConfig {
	x: number;
	y: number;
	width: number;
	height: number;
}

/**
 * Base configuration for rendering a card.
 * You'll probably want to use a specialized subtype of this class.
 */
export interface BaseCardRenderConfig {
	// Indicates which renderer to use for the card.
	renderer: "normal" | "meld";
	/**
	 * The viewbox of the card rendering, this should be expressed in pixels.
	 * Note that the viewbox is the area that the card is rendered in, not the actual card itself.
	 *
	 * Changing these values can break positioning for all other values, careful when editing!
	 */
	viewBox: {
		// The width of the viewbox in pixels.
		width: number;
		// The height of the viewbox in pixels.
		height: number;
	};
	// Contains masks for various images.
	masks: Record<string, ReactElement>;
	// Similar to masks, but for rendering `clipPath` (used for clipping texts etc).
	clips: Record<string, ReactElement>;
	// Contains configuration for the various "elements" of a card.
	elements: Record<string, CardTextConfig | CardImageConfig | CardObjectConfig>;
}

/**
 * Specialized `CardRenderConfig` for "normal" cards which don't have any special features (like meld, marvel and so forth).
 */
export interface NormalCardRenderConfig extends BaseCardRenderConfig {
	renderer: "normal";
	masks: {
		CardArtWork: ReactElement;
	};
	clips: {
		Title: ReactElement;
		BottomText: ReactElement;
	};
	elements: {
		CardName: CardTextConfig;
		CardResource: CardTextConfig;
		CardText: CardObjectConfig;
		CardPowerImage: CardImageConfig;
		CardPowerText: CardTextConfig;
		CardDefenseImage: CardImageConfig;
		CardDefenseText: CardTextConfig;
		CardBottomText: CardTextConfig;
		CardRarity: CardImageConfig;
	};
}

/**
 * Specialized `CardRenderConfig` for "meld" cards, which have a different layout and different rendering.
 */
export interface MeldCardRenderConfig extends BaseCardRenderConfig {
	renderer: "meld";
}

export type CardRenderConfig = NormalCardRenderConfig | MeldCardRenderConfig;
