import _CardBacks from "../../../public/cardbacks/cardbacks.json";
import defaultMask from "../../assets/masks/default.png";

export const CardBackMasks = {
	default: defaultMask,
};

// Typing of the auto-generated `cardbacks.json` file.
export type CardBack = {
	id: number;
	name: string;
	type: string;
	dented: boolean;
	mask?: CardBackMask;
	images: {
		id: number;
		pitch: number;
		fileName: string;
	}[];
};

// Auto-generated list of cardbacks.
export const CardBacks: CardBack[] = _CardBacks;
export type CardBackMask = keyof typeof CardBackMasks;
