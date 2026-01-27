import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";

export function CardNameField() {
	const { t } = useTranslation();
	const { CardName, setCardName } = useCardCreator();

	return (
		<TextInput
			label={t("card_creator.name_label")}
			value={CardName || ""}
			onChange={setCardName}
			maxLength={50}
		/>
	);
}
