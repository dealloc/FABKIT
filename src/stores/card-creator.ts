import type { Content } from "@tiptap/react";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
	type CardBack,
	CardBacks,
	getCardBacksForTypeAndStyle,
	getSuggestedCardBack,
} from "../config/cards/card_backs.ts";
import type {
	CardFormField,
	CardFormFieldValue,
} from "../config/cards/form_fields.ts";
import type { CardType } from "../config/cards/types.ts";

// Utility type that allows us to be type safe without having to copy every type from CardFormField
type FormFieldValues = {
	[K in CardFormField]: CardFormFieldValue[K] | null;
};

interface CardCreatorState extends FormFieldValues {
	// internal version that will be unique every time, used for tracking persistence etc.
	__version: string;
	CardType: CardType | null;
	CardBack: CardBack;
	CardBackStyle: "flat" | "dented";
	CardArtwork: Blob | null;
	CardArtPosition: {
		x: number;
		y: number;
		width: number;
		height: number;
	} | null;
	CardArtworkCredits: string | null;
	CardSetNumber: string | null;
	// textual representation of the rich text editor's content
	CardTextHTML: string | null;
	// text editor's internal representation of the content, used for hydrating the editor.
	CardTextNode: Content | null;
}

interface CardCreatorActions {
	setCardType: (cardType: CardType) => void;
	setCardBack: (cardBack: CardBack) => void;
	setCardBackStyle: (backType: "flat" | "dented") => void;
	setCardArtwork: (artwork: Blob | null) => Promise<void>;
	setCardArtPosition: (
		position: {
			x: number;
			y: number;
			width: number;
			height: number;
		} | null,
	) => void;
	setCardArtworkCredits: (credits: string | null) => void;
	setCardSetNumber: (setNumber: string | null) => void;
	setCardText: (html: string, content: Content) => void;
	setPitch: (pitch: CardFormFieldValue["CardPitch"]) => void;
	setCardName: (name: string) => void;
	setCardResource: (resource: CardFormFieldValue["CardResource"]) => void;
	setCardPower: (power: CardFormFieldValue["CardPower"]) => void;
	setCardTalent: (talent: CardFormFieldValue["CardTalent"]) => void;
	setCardClass: (cardClass: CardFormFieldValue["CardClass"]) => void;
	setCardSecondaryClass: (
		cardClass: CardFormFieldValue["CardSecondaryClass"],
	) => void;
	setCardSubType: (subType: CardFormFieldValue["CardSubType"]) => void;
	setCardRarity: (rarity: CardFormFieldValue["CardRarity"]) => void;
	setCardLife: (life: CardFormFieldValue["CardLife"]) => void;
	setCardDefense: (defense: CardFormFieldValue["CardDefense"]) => void;
	setCardHeroIntellect: (
		intellect: CardFormFieldValue["CardHeroIntellect"],
	) => void;
	setCardWeapon: (weapon: CardFormFieldValue["CardWeapon"]) => void;
	setCardMacroGroup: (group: CardFormFieldValue["CardMacroGroup"]) => void;
	reset: () => void;
}

const initialState: CardCreatorState = {
	__version: uuid(),
	CardType: null,
	CardBack: CardBacks[0],
	CardBackStyle: "dented",
	CardArtwork: null,
	CardArtPosition: null,
	CardArtworkCredits: null,
	CardSetNumber: null,
	CardTextHTML: null,
	CardTextNode: null,
	CardPitch: null,
	CardName: null,
	CardResource: null,
	CardText: null,
	CardPower: null,
	CardTalent: null,
	CardClass: null,
	CardSecondaryClass: null,
	CardSubType: null,
	CardRarity: "basic",
	CardDefense: null,
	CardLife: null,
	CardHeroIntellect: null,
	CardWeapon: null,
	CardMacroGroup: null,
};

export const useCardCreator = create<CardCreatorState & CardCreatorActions>()(
	devtools((set, _, store) => ({
		...initialState,
		setCardType: (cardType: CardType) =>
			set((state) => {
				// When selecting a new card type, make sure that either:
				// - the current card back is valid for that card type
				// - we select the first available card back for that card type
				const available = getCardBacksForTypeAndStyle(
					cardType,
					state.CardBackStyle,
				);
				let cardBack = state.CardBack;
				if (!available.includes(state.CardBack))
					cardBack = getSuggestedCardBack(available);

				return { CardType: cardType, CardBack: cardBack };
			}),
		setCardBack: (cardBack: CardBack) => set({ CardBack: cardBack }),
		setCardBackStyle: (backType: "flat" | "dented") =>
			set((state) => {
				// When changing card back style, we select the first available card back for that style.
				const available = getCardBacksForTypeAndStyle(state.CardType, backType);
				const cardBack = getSuggestedCardBack(available);

				return { CardBackStyle: backType, CardBack: cardBack };
			}),
		setCardArtwork: async (artwork: Blob | null) => {
			// If clearing artwork, reset both artwork and position
			if (!artwork) {
				set({ CardArtwork: null, CardArtPosition: null });
				return;
			}

			// Load image to get natural dimensions
			const img = new Image();
			const url = URL.createObjectURL(artwork);

			try {
				await new Promise<void>((resolve, reject) => {
					img.onload = () => resolve();
					img.onerror = () => reject(new Error("Failed to load image"));
					img.src = url;
				});

				// Set artwork and initialize position with natural dimensions
				set({
					CardArtwork: artwork,
					CardArtPosition: {
						x: 0,
						y: 0,
						width: img.naturalWidth,
						height: img.naturalHeight,
					},
				});
			} finally {
				// Always clean up the object URL
				URL.revokeObjectURL(url);
			}
		},
		setCardArtPosition: (position: { x: number; y: number } | null) =>
			// biome-ignore lint/suspicious/noExplicitAny: Zustand uses merging, not overwriting.
			set({ CardArtPosition: position as any }),
		setCardArtworkCredits: (credits: string | null) =>
			set({ CardArtworkCredits: credits?.toUpperCase() }),
		setCardSetNumber: (setNumber: string | null) =>
			set({ CardSetNumber: setNumber?.toUpperCase() }),
		setCardText: (html: string, content: Content) =>
			set({ CardTextHTML: html, CardTextNode: content }),
		setPitch: (pitch: CardFormFieldValue["CardPitch"]) =>
			set({ CardPitch: pitch }),
		setCardName: (name: string) => set({ CardName: name }),
		setCardResource: (resource: CardFormFieldValue["CardResource"]) =>
			set({ CardResource: resource }),
		setCardPower: (power: CardFormFieldValue["CardPower"]) =>
			set({ CardPower: power }),
		setCardTalent: (talent: CardFormFieldValue["CardTalent"]) =>
			set({ CardTalent: talent }),
		setCardClass: (cardClass: CardFormFieldValue["CardClass"]) =>
			set({ CardClass: cardClass }),
		setCardSecondaryClass: (
			cardClass: CardFormFieldValue["CardSecondaryClass"],
		) => set({ CardSecondaryClass: cardClass }),
		setCardSubType: (subType: CardFormFieldValue["CardSubType"]) =>
			set({ CardSubType: subType }),
		setCardRarity: (rarity: CardFormFieldValue["CardRarity"]) =>
			set({ CardRarity: rarity }),
		setCardLife: (life: CardFormFieldValue["CardLife"]) =>
			set({ CardLife: life }),
		setCardDefense: (defense: CardFormFieldValue["CardDefense"]) =>
			set({ CardDefense: defense }),
		setCardHeroIntellect: (
			intellect: CardFormFieldValue["CardHeroIntellect"],
		) => set({ CardHeroIntellect: intellect }),
		setCardWeapon: (weapon: CardFormFieldValue["CardWeapon"]) =>
			set({ CardWeapon: weapon }),
		setCardMacroGroup: (group: CardFormFieldValue["CardMacroGroup"]) =>
			set({ CardMacroGroup: group }),
		reset: () => set({ ...store.getInitialState(), __version: uuid() }),
	})),
);
