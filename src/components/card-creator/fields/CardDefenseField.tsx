import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";

export function CardDefenseField() {
	const { t } = useTranslation();
	const { CardDefense, setCardDefense } = useCardCreator();

	return (
		<TextInput
			label={t("card_creator.defense_label")}
			value={CardDefense || ""}
			onChange={setCardDefense}
			maxLength={3}
		/>
	);
}
