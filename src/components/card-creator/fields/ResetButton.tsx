import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";

export function ResetButton() {
	const { reset } = useCardCreator();
	const { t } = useTranslation();

	const confirmBeforeReset = useCallback(() => {
		if (window.confirm(t("card_creator.reset_prompt"))) {
			reset();
		}
	}, [reset, t]);

	return (
		<button
			type="button"
			className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded"
			onClick={confirmBeforeReset}
		>
			{t("card_creator.reset_label")}
		</button>
	);
}
