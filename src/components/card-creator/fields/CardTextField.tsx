import { useTranslation } from "react-i18next";
import { useCardCreator } from "../../../stores/card-creator.ts";
import RichTextEditor from "../../form/RichTextEditor.tsx";

export function CardTextField() {
	const { t } = useTranslation();
	const { cardTextNode, setCardText } = useCardCreator();

	return (
		<div>
			<div className="block text-sm font-medium text-muted mb-2">
				{t("card_creator.text_label")}
			</div>
			<RichTextEditor content={cardTextNode} onChange={setCardText} />
		</div>
	);
}
