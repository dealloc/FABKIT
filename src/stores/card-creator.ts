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
}

interface CardCreatorActions {
	setCardType: (cardType: CardType) => void;
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
	setCardDefense: (defense: CardFormFieldValue["CardDefense"]) => void;
	reset: () => void;
}

const initialState: CardCreatorState = {
	cardType: null,
	cardBack: CardBacks[0],
	CardPitch: null,
	CardName: null,
	CardResource: null,
	CardText: null,
	CardPower: null,
	CardTalent: null,
	CardClass: null,
	CardSecondaryClass: null,
	CardSubType: null,
	CardRarity: null,
	CardDefense: null,
	CardLife: null,
	CardHeroIntellect: null,
	CardWeapon: null,
};

export const useCardCreator = create<CardCreatorState & CardCreatorActions>()(
	devtools((set) => ({
		...initialState,
		setCardType: (cardType: CardType) => set({ cardType }),
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
		setCardDefense: (defense: CardFormFieldValue["CardDefense"]) =>
			set({ CardDefense: defense }),
		reset: () => set(initialState),
	})),
);
