import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n.ts";

export function LanguageToggle() {
	const { t } = useTranslation();

	// Only show if multiple languages are available
	if (i18n.languages.length <= 1) return null;

	return (
		<Menu as="div" className="relative">
			<MenuButton
				aria-label={t("theme.toggle_language")}
				className="group relative size-10 rounded-lg bg-surface-muted text-body transition-all duration-200 hover:bg-surface-active hover:text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
			>
				<span className="absolute inset-0 flex items-center justify-center">
					<Globe className="size-5 transition-transform duration-300 group-hover:scale-110" />
				</span>
				<span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white shadow-sm">
					{i18n.language.toUpperCase().slice(0, 2)}
				</span>
			</MenuButton>

			<MenuItems
				anchor="bottom end"
				className="mt-2 w-32 origin-top-right rounded-lg bg-surface shadow-lg ring-1 ring-border focus:outline-none"
			>
				<div className="py-1">
					{i18n.languages.map((lang) => (
						<MenuItem key={lang}>
							{({ focus }) => (
								<button
									type="button"
									onClick={() => i18n.changeLanguage(lang)}
									className={`${
										focus ? "bg-surface-active" : ""
									} group flex w-full items-center justify-between px-4 py-2 text-sm text-body transition-colors`}
								>
									<span className="uppercase">{lang}</span>
									{i18n.language === lang && (
										<Check className="size-4 text-primary" />
									)}
								</button>
							)}
						</MenuItem>
					))}
				</div>
			</MenuItems>
		</Menu>
	);
}
