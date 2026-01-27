import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";

export function CardArtworkCreditsField() {
	const { t } = useTranslation();
	const { cardArtworkCredits, setCardArtworkCredits } = useCardCreator();

	return (
		<TextInput
			label={t("card_creator.artwork_credits_label")}
			value={cardArtworkCredits || ""}
			onChange={setCardArtworkCredits}
			maxLength={50}
		/>
	);
}
