import type { Content } from "@tiptap/react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type CardBack, CardBacks } from "../config/cards/card_backs.ts";
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
	cardType: CardType | null;
	cardBack: CardBack;
	cardArtwork: Blob | null;
	cardArtworkCredits: string | null;
	cardSetNumber: string | null;
	// textual representation of the rich text editor's content
	cardTextHTML: string | null;
	// text editor's internal representation of the content, used for hydrating the editor.
	cardTextNode: Content | null;
}

interface CardCreatorActions {
	setCardType: (cardType: CardType) => void;
	setCardArtwork: (artwork: Blob | null) => void;
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
	cardType: null,
	cardBack: CardBacks[0],
	cardArtwork: null,
	cardArtworkCredits: null,
	cardSetNumber: null,
	cardTextHTML: null,
	cardTextNode: null,
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
	CardMacroGroup: null
};

export const useCardCreator = create<CardCreatorState & CardCreatorActions>()(
	devtools((set) => ({
		...initialState,
		setCardType: (cardType: CardType) => set({ cardType }),
		setCardArtwork: (artwork: Blob | null) => set({ cardArtwork: artwork }),
		setCardArtworkCredits: (credits: string | null) =>
			set({ cardArtworkCredits: credits }),
		setCardSetNumber: (setNumber: string | null) =>
			set({ cardSetNumber: setNumber }),
		setCardText: (html: string, content: Content) =>
			set({ cardTextHTML: html, cardTextNode: content }),
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
		reset: () => set(initialState),
	})),
);
