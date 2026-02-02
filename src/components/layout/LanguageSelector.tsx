import { useMemo } from "react";
import i18n from "../../i18n.ts";
import Select from "../form/Select.tsx";

export function LanguageSelector() {
	const languages = useMemo(
		() => i18n.languages.map((lang) => ({ value: lang, label: lang })),
		[],
	);

	if (languages.length <= 1) return null;
	return (
		<Select
			label={null}
			value={i18n.language}
			onChange={(_) => {}}
			options={languages}
		/>
	);
}
