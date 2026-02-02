import _CardBacks from "../../../public/cardbacks/cardbacks.json";
import type { RenderConfigVariation } from "../rendering.ts";
import type { CardStyle } from "./card_styles.ts";
import type { CardType } from "./types.ts";

// Typing of the auto-generated `cardbacks.json` file.
export type CardBack = {
	id: number;
	name: string;
	type: string;
	dented: boolean;
	renderer: RenderConfigVariation;
	images: {
		id: number;
		pitch: number;
		fileName: string;
	}[];
};

// Auto-generated list of cardbacks.
export const CardBacks: CardBack[] = _CardBacks;

export function getCardBacksForTypeAndStyle(
	type: CardType | null,
	style: CardStyle,
): CardBack[] {
	if (type === null) {
		return [];
	}

	const isDented = style === "dented";
	let types = ["general"];
	if (type === "ally") {
		types = ["token", "hero"];
	} else if (
		type !== null &&
		[
			"equipment",
			"hero",
			"equipment",
			"weapon",
			"token",
			"resource",
			"event",
		].includes(type)
	) {
		types = [type];
	} else if (type === "demi_hero") {
		types = ["hero"];
	} else if (type === "weapon_equipment") {
		types = ["weapon"];
	}

	return CardBacks.filter(
		(back) => types.includes(back.type) && back.dented === isDented,
	);
}

export function getSuggestedCardBack(available: CardBack[]): CardBack | null {
	if (available.length === 0) return null;
	return available[0];
}
