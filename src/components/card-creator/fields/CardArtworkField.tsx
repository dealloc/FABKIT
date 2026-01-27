import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import ImageUpload from "../../form/ImageUpload.tsx";

export function CardArtworkField() {
	const { t } = useTranslation();
	const { setCardArtwork } = useCardCreator();

	return (
		<span>
			<div className="block text-sm font-medium text-muted mb-2">
				{t("card_creator.artwork_label")}
			</div>
			<ImageUpload onImageSelect={setCardArtwork} />
		</span>
	);
}
