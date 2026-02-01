import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CardThumbnail } from "../components/gallery/CardThumbnail";
import { getAllCards } from "../persistence/card-storage";

export const Route = createFileRoute("/gallery")({
	component: GalleryPage,
	loader: async () => ({ cards: await getAllCards() }),
});

function GalleryPage() {
	const { t } = useTranslation();
	const { cards } = Route.useLoaderData();

	return (
		<div className="flex flex-1 flex-col">
			{/* Header */}
			<div className="border-b border-border-primary px-6 py-4">
				<h1 className="text-2xl font-bold text-heading">
					{t("gallery.title")}
				</h1>
				<p className="text-sm text-muted">{t("gallery.subtitle")}</p>
			</div>

			{/* Content */}
			<div className="flex-1 p-6">
				{cards.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-4 py-16">
						<p className="text-lg text-muted">{t("gallery.empty")}</p>
						<Link
							to="/card-creator"
							className="rounded-lg bg-surface-active px-4 py-2 text-sm font-medium text-heading transition-colors hover:bg-surface-muted"
						>
							{t("gallery.create_first")}
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{cards.map((card) => (
							<CardThumbnail key={card.version} card={card} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
