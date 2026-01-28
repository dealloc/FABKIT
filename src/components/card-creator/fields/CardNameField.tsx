import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import TextInput from "../../form/TextInput.tsx";
import { useIsFieldVisible } from "../../utils.ts";

export function CardNameField() {
	const { t } = useTranslation();
	const { CardName, setCardName } = useCardCreator();
	const shouldShow = useIsFieldVisible("CardName");

	if (!shouldShow) return null;

	return (
		<TextInput
			label={t("card_creator.name_label")}
			value={CardName || ""}
			onChange={(event: ChangeEvent<HTMLInputElement>) =>
				setCardName(event.target.value)
			}
			maxLength={50}
		/>
	);
}
