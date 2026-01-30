import { useMemo } from "react";
import {
	CardBacks,
	getCardBacksForTypeAndStyle,
} from "../../../config/cards/card_backs.ts";
import { useCardCreator } from "../../../stores/card-creator.ts";
import Select, { type SelectOption } from "../../form/Select.tsx";

export function CardBackField() {
	const CardType = useCardCreator((state) => state.CardType);
	const CardBack = useCardCreator((state) => state.CardBack);
	const CardBackStyle = useCardCreator((state) => state.CardBackStyle);
	const setCardBack = useCardCreator((state) => state.setCardBack);

	const options: SelectOption<string>[] = useMemo(
		() =>
			getCardBacksForTypeAndStyle(CardType, CardBackStyle).map((back) => ({
				label: back.name,
				value: `${back.id}`,
			})),
		[CardBackStyle, CardType],
	);

	return (
		<Select
			label={"Card Back"}
			value={`${CardBack?.id}`}
			onChange={(id) => {
				const idAsNumber = parseInt(id, 10);
				const result = CardBacks.find((back) => back.id === idAsNumber) || null;

				setCardBack(result || CardBacks[0]);
			}}
			options={options}
		/>
	);
}
