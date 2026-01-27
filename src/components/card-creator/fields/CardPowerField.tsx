import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";

export function CardPowerField() {
	const { t } = useTranslation();
	const { CardPower, setCardPower } = useCardCreator();

	return (
		<TextInput
			label={t("card_creator.power_label")}
			value={CardPower || ""}
			onChange={setCardPower}
			maxLength={2}
		/>
	);
}
