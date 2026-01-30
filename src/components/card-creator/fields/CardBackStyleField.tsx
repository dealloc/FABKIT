import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";

export function CardBackStyleField() {
	const { t } = useTranslation();
	const CardBackType = useCardCreator((state) => state.CardBackStyle);
	const setCardBackType = useCardCreator((state) => state.setCardBackStyle);

	return (
		<label className="flex items-center gap-2 text-sm">
			<input
				type="checkbox"
				className="rounded"
				checked={CardBackType === "flat"}
				onChange={(event) =>
					setCardBackType(event.target.checked ? "flat" : "dented")
				}
			/>
			<span className="text-body">
				{CardBackType === "flat"
					? t("card_creator.card_back_style_flat_label")
					: t("card_creator.card_back_style_dented_label")}
			</span>
		</label>
	);
}
