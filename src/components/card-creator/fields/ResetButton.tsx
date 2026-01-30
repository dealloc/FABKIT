import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function ResetButton() {
	const { t } = useTranslation();

	return (
		<Link
			to="/reset-form"
			mask={{ to: "/card-creator" }}
			className="px-6 py-3 bg-primary-dark text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
		>
			{t("card_creator.reset_label")}
		</Link>
	);
}
