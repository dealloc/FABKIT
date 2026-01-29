import { useMemo } from "react";
import { useCardCreator } from "../../../stores/card-creator.ts";

export function useCardFooterText():
	| ["single", string]
	| ["multi", [string, string]] {
	const CardSetNumber = useCardCreator((state) => state.CardSetNumber);
	const CardArtworkCredits = useCardCreator(
		(state) => state.CardArtworkCredits,
	);

	return useMemo(() => {
		if (CardSetNumber === null && CardArtworkCredits === null) {
			return ["single", "FABKIT - NOT LEGAL - FLESH AND BLOOD TCG BY LLS"];
		}

		if (CardSetNumber === null) {
			return [
				"multi",
				[
					`FABKIT - ${CardArtworkCredits}`,
					"NOT LEGAL - FLESH AND BLOOD TCG BY LLS",
				],
			];
		} else if (CardArtworkCredits === null) {
			return [
				"multi",
				[`${CardSetNumber} - FABKIT`, "NOT LEGAL - FLESH AND BLOOD TCG BY LLS"],
			];
		}

		return [
			"multi",
			[
				`${CardSetNumber} - FABKIT - ${CardArtworkCredits}`,
				"NOT LEGAL - FLESH AND BLOOD TCG BY LLS",
			],
		];
	}, [CardSetNumber, CardArtworkCredits]);
}
