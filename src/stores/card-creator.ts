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
}

interface CardCreatorActions {
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
		reset: () => set(initialState),
	})),
);
