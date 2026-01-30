import { useMemo } from "react";
import type { CardFormField } from "../config/cards/form_fields.ts";
import {type CardType, CardTypes} from "../config/cards/types.ts";
import { useCardCreator } from "../stores/card-creator.ts";

/**
 * Hook to check if a specific field should be visible for the current card type.
 */
export function useIsFieldVisible(field: CardFormField): boolean {
	const cardType = useCardCreator((state) => state.CardType);

	return useMemo(() => {
		if (!cardType) return false;

		return CardTypes[cardType].fields.includes(field);
	}, [cardType, field]);
}

/**
 * non-hook version of `useIsFieldVisible`
 */
export function isFieldVisible(field: CardFormField, cardType: CardType | null): boolean {
	if (!cardType) return false;

	return CardTypes[cardType].fields.includes(field);
}
