import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { type CardTalent, CardTalents } from "../../../config/cards.ts";
import { useCardCreator } from "../../../stores/card-creator.ts";
import Select, { type SelectOption } from "../../form/Select.tsx";

export function CardTalentField() {
	const { t } = useTranslation();
	const { CardTalent, setCardTalent } = useCardCreator();

	// TODO: invalidate memo when `t`'s language changes?
	const options: SelectOption<CardTalent>[] = useMemo(
		() =>
			Object.keys(CardTalents).map((key) => ({
				value: key as CardTalent,
				label: t(CardTalents[key as CardTalent]),
			})),
		[t],
	);

	return (
		<Select
			label={t("card_creator.talent_label")}
			value={CardTalent || "none"}
			onChange={setCardTalent}
			options={options}
		/>
	);
}
