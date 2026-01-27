import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	CardRarities,
	type CardRarity,
} from "../../../config/cards/rarities.ts";
import { useCardCreator } from "../../../stores/card-creator.ts";
import Select, { type SelectOption } from "../../form/Select.tsx";

export function CardRarityField() {
	const { t } = useTranslation();
	const { CardRarity, setCardRarity } = useCardCreator();

	const options: SelectOption<CardRarity>[] = useMemo(
		() =>
			Object.keys(CardRarities).map((key) => ({
				value: key as CardRarity,
				label: t(CardRarities[key as CardRarity].label),
			})),
		[t],
	);

	return (
		<Select
			label={t("card_creator.rarity_label")}
			value={CardRarity}
			onChange={setCardRarity}
			options={options}
		/>
	);
}
