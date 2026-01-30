import { useMemo } from "react";
import { useCardCreator } from "../../../stores/card-creator.ts";

export function useCardFooterText(): string | [string, string] {
	const CardBackStyle = useCardCreator((state) => state.CardBackStyle);
	const CardSetNumber = useCardCreator((state) => state.CardSetNumber);
	const CardArtworkCredits = useCardCreator(
		(state) => state.CardArtworkCredits,
	);

	return useMemo(() => {
		if (CardBackStyle === "dented") {
			return generateDentedFooterText(CardSetNumber, CardArtworkCredits);
		}

		return generateFlatFooterText(CardSetNumber, CardArtworkCredits);
	}, [CardSetNumber, CardArtworkCredits, CardBackStyle]);
}

function generateDentedFooterText(CardSetNumber: string | null, CardArtworkCredits: string | null): string | [string, string] {
	if (CardSetNumber === null && CardArtworkCredits === null) {
		return "FABKIT - NOT LEGAL - FLESH AND BLOOD TCG BY LLS";
	}

	if (CardSetNumber === null) {
		return [
			`FABKIT - ${CardArtworkCredits}`,
			"NOT LEGAL - FLESH AND BLOOD TCG BY LLS",
		];
	} else if (CardArtworkCredits === null) {
		return [`${CardSetNumber} - FABKIT`, "NOT LEGAL - FLESH AND BLOOD TCG BY LLS"];
	}

	return [
		`${CardSetNumber} - FABKIT - ${CardArtworkCredits}`,
		"NOT LEGAL - FLESH AND BLOOD TCG BY LLS",
	];
}

function generateFlatFooterText(CardSetNumber: string | null, CardArtworkCredits: string | null): [string, string] {
	return [
		[CardSetNumber, 'FABKIT', CardArtworkCredits].filter(value => value?.trim()?.length).join(' | '),
		'FaB TCC BY LSS'
	];
}
