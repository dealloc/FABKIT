import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";

export function CardHeroIntellectField() {
	const { t } = useTranslation();
	const { CardHeroIntellect, setCardHeroIntellect } = useCardCreator();

	return (
		<TextInput
			label={t("card_creator.hero_intellect_label")}
			value={CardHeroIntellect || ""}
			onChange={setCardHeroIntellect}
			maxLength={2}
		/>
	);
}
