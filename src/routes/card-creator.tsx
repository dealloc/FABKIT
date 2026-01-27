import { createFileRoute } from "@tanstack/react-router";
import { CardClassField } from "../components/card-creator/fields/CardClassField.tsx";
import { CardDefenseField } from "../components/card-creator/fields/CardDefenseField.tsx";
import { CardNameField } from "../components/card-creator/fields/CardNameField.tsx";
import { CardPitchField } from "../components/card-creator/fields/CardPitchField.tsx";
import { CardPowerField } from "../components/card-creator/fields/CardPowerField.tsx";
import { CardRarityField } from "../components/card-creator/fields/CardRarityField.tsx";
import { CardResourceField } from "../components/card-creator/fields/CardResourceField.tsx";
import { CardSubTypeField } from "../components/card-creator/fields/CardSubTypeField.tsx";
import { CardTalentField } from "../components/card-creator/fields/CardTalentField.tsx";
import { CardTypeField } from "../components/card-creator/fields/CardTypeField.tsx";
import { CardSecondaryClassField } from "../components/card-creator/fields/SecondaryCardClassField.tsx";
import { Preview } from "../components/card-creator/Preview.tsx";

export const Route = createFileRoute("/card-creator")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-row flex-1">
			<section className="p-4 flex-1 space-y-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
					<CardTypeField />
					<CardPitchField />
					<CardNameField />
					<CardResourceField />
					<CardPowerField />
					<CardTalentField />
					<CardClassField />
					<CardSecondaryClassField />
					<CardSubTypeField />
					<CardRarityField />
					<CardDefenseField />
				</div>
			</section>
			<section className="flex flex-col p-4 max-w-1/3">
				<Preview />
			</section>
		</div>
	);
}
