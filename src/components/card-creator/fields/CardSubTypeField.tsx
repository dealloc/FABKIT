import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardSubtypes } from "../../../config/cards/subtypes.ts";
import { useCardCreator } from "../../../stores/card-creator.ts";
import Select, { type SelectOption } from "../../form/Select.tsx";
import { useIsFieldVisible } from "../../utils.ts";

export function CardSubTypeField() {
	const { t } = useTranslation();
	const { CardType, CardSubType, setCardSubType } = useCardCreator();
	const shouldShow = useIsFieldVisible("CardSubType");

	const options: SelectOption<string>[] = useMemo(() => {
		if (!CardType) return [];

		const subtypes = CardSubtypes[CardType];
		return Object.keys(subtypes).map((key) => ({
			value: key,
			label: t(subtypes[key]),
		}));
	}, [CardType, t]);

	if (!shouldShow) return null;
	return (
		<Select
			label={t("card_creator.subtype_label")}
			value={CardSubType || "none"}
			onChange={setCardSubType}
			options={options}
		/>
	);
}
