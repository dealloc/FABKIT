import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";

export function CardLifeField() {
	const { t } = useTranslation();
	const { CardLife, setCardLife } = useCardCreator();

	return (
		<TextInput
			label={t("card_creator.power_label")}
			value={CardLife || ""}
			onChange={setCardLife}
			maxLength={2}
		/>
	);
}
