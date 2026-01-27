import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { type CardClass, CardClasses } from "../../../config/cards/classes.ts";
import { useCardCreator } from "../../../stores/card-creator.ts";
import Select, { type SelectOption } from "../../form/Select.tsx";

export function CardSecondaryClassField() {
	const { t } = useTranslation();
	const { CardSecondaryClass, setCardSecondaryClass } = useCardCreator();

	// TODO: invalidate memo when `t`'s language changes?
	const options: SelectOption<CardClass>[] = useMemo(
		() =>
			Object.keys(CardClasses).map((key) => ({
				value: key as CardClass,
				label: t(CardClasses[key as CardClass]),
			})),
		[t],
	);

	return (
		<Select
			label={t("card_creator.secondary_class_label")}
			value={CardSecondaryClass || "none"}
			onChange={setCardSecondaryClass}
			options={options}
		/>
	);
}
