import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";

export function CardResourceField() {
	const { t } = useTranslation();
	const { CardResource, setCardResource } = useCardCreator();

	return (
		<TextInput
			label={t("card_creator.resource_label")}
			value={CardResource || ""}
			onChange={setCardResource}
			maxLength={2}
		/>
	);
}
