import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
	const { t } = useTranslation();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="size-10 rounded-lg bg-surface-muted animate-pulse" />
		);
	}

	const cycleTheme = () => {
		if (theme === "light") setTheme("dark");
		else if (theme === "dark") setTheme("system");
		else setTheme("light");
	};

	const getIcon = () => {
		switch (theme) {
			case "light":
				return <Sun className="size-5" />;
			case "dark":
				return <Moon className="size-5" />;
			default:
				return <Monitor className="size-5" />;
		}
	};

	const getLabel = () => {
		switch (theme) {
			case "light":
				return t("theme.toggle_light");
			case "dark":
				return t("theme.toggle_dark");
			default:
				return t("theme.toggle_system");
		}
	};

	return (
		<button
			type="button"
			onClick={cycleTheme}
			aria-label={getLabel()}
			className="group relative size-10 rounded-lg bg-surface-muted text-body transition-all duration-200 hover:bg-surface-active hover:text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
		>
			<span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
				{getIcon()}
			</span>
		</button>
	);
}
