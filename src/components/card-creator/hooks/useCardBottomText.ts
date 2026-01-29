import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardClasses } from "../../../config/cards/classes.ts";
import { CardSubtypes } from "../../../config/cards/subtypes.ts";
import { CardTalents } from "../../../config/cards/talents.ts";
import { CardTypes } from "../../../config/cards/types.ts";
import { useCardCreator } from "../../../stores/card-creator.ts";

export function useCardBottomText() {
	const { t } = useTranslation();
	const {
		CardTalent,
		CardType,
		CardClass,
		CardSecondaryClass,
		CardSubType,
		CardWeapon,
	} = useCardCreator();

	return useMemo(() => {
		// Translate talent if present
		const talent =
			CardTalent && CardTalent !== "none" ? t(CardTalents[CardTalent]) : null;

		// Translate primary class if present
		const primaryClass =
			CardClass && CardClass !== "none" ? t(CardClasses[CardClass]) : null;

		// Handle class combination with a proper separator
		// Heroes use space separator, others use "/"
		const isHero = CardType === "hero" || CardType === "demi_hero";
		const separator = isHero ? " " : " / ";

		const classText =
			primaryClass && CardSecondaryClass && CardSecondaryClass !== "none"
				? `${primaryClass}${separator}${t(CardClasses[CardSecondaryClass])}`
				: primaryClass;

		// Translate a card type
		const cardType = CardType ? t(CardTypes[CardType].label) : null;

		// Build subtype portion
		const subtypeParts: string[] = [];

		// Add a translated subtype if present
		if (CardType && CardSubType && CardSubType !== "none") {
			const subtypeKey = CardSubtypes[CardType]?.[CardSubType];
			if (subtypeKey) {
				subtypeParts.push(t(subtypeKey));
			}
		}

		// Add weapon suffix for weapon types
		if (
			(CardType === "weapon" || CardType === "weapon_equipment") &&
			CardWeapon
		) {
			subtypeParts.push(CardWeapon); // Already in format "(1H)" or "(2H)"
		}

		const subtypeText =
			subtypeParts.length > 0 ? `- ${subtypeParts.join(" ")}` : null;

		// Assemble the final string
		return [talent, classText, cardType, subtypeText]
			.filter((part): part is string => Boolean(part))
			.join(" ");
	}, [
		CardTalent,
		CardClass,
		CardSecondaryClass,
		CardType,
		CardSubType,
		CardWeapon,
		t,
	]);
}
