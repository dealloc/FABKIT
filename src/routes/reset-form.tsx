import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useCardCreator } from "../stores/card-creator.ts";

export const Route = createFileRoute("/reset-form")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();
	const reset = useCardCreator((state) => state.reset);
	const navigator = useNavigate();

	return (
		<Dialog
			open={true}
			onClose={() => navigator({ to: "/card-creator" })}
			className="relative z-50"
		>
			{/* The backdrop, rendered as a fixed sibling to the panel container */}
			<DialogBackdrop className="fixed inset-0 bg-black/30" />

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				{/* The actual dialog panel  */}
				<DialogPanel className="max-w-lg space-y-4 bg-surface p-12">
					<DialogTitle className="font-bold">
						{t("components.reset-creator.title")}
					</DialogTitle>
					<p>{t("components.reset-creator.prompt")}</p>
					<div className="flex gap-4">
						<button
							type="button"
							onClick={() => navigator({ to: "/card-creator" })}
						>
							{t("components.reset-creator.cancel")}
						</button>
						<button
							type="button"
							onClick={async () => {
								reset();
								await navigator({ to: "/card-creator" });
							}}
						>
							{t("components.reset-creator.yes")}
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
