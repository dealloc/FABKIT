import _CardBacks from "../../../public/cardbacks/cardbacks.json";

// Typing of the auto-generated `cardbacks.json` file.
export type CardBack = {
	id: number;
	name: string;
	type: string;
	dented: boolean;
	images: {
		id: number;
		pitch: number;
		fileName: string;
	}[];
};

// Auto-generated list of cardbacks.
export const CardBacks: CardBack[] = _CardBacks;
