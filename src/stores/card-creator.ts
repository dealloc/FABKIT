import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type CardBack, CardBacks } from "../config/cards/card_backs.ts";
import type { CardFormField } from "../config/cards/form_fields.ts";
import type { CardType } from "../config/cards/types.ts";

// Utility type that allows us to be type safe without having to copy every type from CardFormField
type FormFieldValues = {
	[K in CardFormField]: string | null;
};

interface CardCreatorState extends FormFieldValues {
	cardType: CardType | null;
	cardBack: CardBack;
	setCardType: (type: CardType | null) => void;
	setCardPitch: (value: string) => void;
	setCardName: (value: string) => void;
	setCardResource: (value: string) => void;
	setCardText: (value: string) => void;
	setCardPower: (value: string) => void;
	setCardTalent: (value: string) => void;
	setCardClass: (value: string) => void;
	setCardSecondaryClass: (value: string) => void;
	setCardSubType: (value: string) => void;
	setCardRarity: (value: string) => void;
	setCardDefense: (value: string) => void;
	setCardLife: (value: string) => void;
	setCardHeroIntellect: (value: string) => void;
	setCardWeapon: (value: string) => void;
	reset: () => void;
}

const initialState = {
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

export const useCardCreator = create<CardCreatorState>()(
	devtools((set) => ({
		...initialState,
		setCardType: (type) => set({ cardType: type }),
		setCardPitch: (value) => set({ CardPitch: value }),
		setCardName: (value) => set({ CardName: value }),
		setCardResource: (value) => set({ CardResource: value }),
		setCardText: (value) => set({ CardText: value }),
		setCardPower: (value) => set({ CardPower: value }),
		setCardTalent: (value) => set({ CardTalent: value }),
		setCardClass: (value) => set({ CardClass: value }),
		setCardSecondaryClass: (value) => set({ CardSecondaryClass: value }),
		setCardSubType: (value) => set({ CardSubType: value }),
		setCardRarity: (value) => set({ CardRarity: value }),
		setCardDefense: (value) => set({ CardDefense: value }),
		setCardLife: (value) => set({ CardLife: value }),
		setCardHeroIntellect: (value) => set({ CardHeroIntellect: value }),
		setCardWeapon: (value) => set({ CardWeapon: value }),
		reset: () => set(initialState),
	})),
);
