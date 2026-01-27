import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";

export function CardMacroGroupField() {
	const { t } = useTranslation();
	const { CardMacroGroup, setCardMacroGroup } = useCardCreator();

	return (
		<TextInput
			label={t("card_creator.macro_group_label")}
			value={CardMacroGroup || ""}
			onChange={setCardMacroGroup}
		/>
	);
}
