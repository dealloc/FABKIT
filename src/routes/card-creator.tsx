import { createFileRoute } from "@tanstack/react-router";
import { CardArtworkCreditsField } from "../components/card-creator/fields/CardArtworkCreditsField.tsx";
import { CardArtworkField } from "../components/card-creator/fields/CardArtworkField.tsx";
import { CardClassField } from "../components/card-creator/fields/CardClassField.tsx";
import { CardDefenseField } from "../components/card-creator/fields/CardDefenseField.tsx";
import { CardHeroIntellectField } from "../components/card-creator/fields/CardHeroIntellectField.tsx";
import { CardLifeField } from "../components/card-creator/fields/CardLifeField.tsx";
import { CardMacroGroupField } from "../components/card-creator/fields/CardMacroGroupField.tsx";
import { CardNameField } from "../components/card-creator/fields/CardNameField.tsx";
import { CardPitchField } from "../components/card-creator/fields/CardPitchField.tsx";
import { CardPowerField } from "../components/card-creator/fields/CardPowerField.tsx";
import { CardRarityField } from "../components/card-creator/fields/CardRarityField.tsx";
import { CardResourceField } from "../components/card-creator/fields/CardResourceField.tsx";
import { CardSecondaryClassField } from "../components/card-creator/fields/CardSecondaryClassField.tsx";
import { CardSetnumberField } from "../components/card-creator/fields/CardSetnumberField.tsx";
import { CardSubTypeField } from "../components/card-creator/fields/CardSubTypeField.tsx";
import { CardTalentField } from "../components/card-creator/fields/CardTalentField.tsx";
import { CardTextField } from "../components/card-creator/fields/CardTextField.tsx";
import { CardTypeField } from "../components/card-creator/fields/CardTypeField.tsx";
import { CardWeaponField } from "../components/card-creator/fields/CardWeaponField.tsx";
import { Preview } from "../components/card-creator/Preview.tsx";

export const Route = createFileRoute("/card-creator")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col md:grid grid-flow-cols grid-cols-4 gap-2 flex-1">
			<section className="p-4 col-span-3 space-y-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
					<CardTypeField />
					<CardPitchField />
					<CardNameField />
					<CardResourceField />
					<CardPowerField />
					<CardHeroIntellectField />
					<CardTalentField />
					<CardClassField />
					<CardSecondaryClassField />
					<CardSubTypeField />
					<CardMacroGroupField />
					<CardWeaponField />
					<CardRarityField />
					<CardLifeField />
					<CardDefenseField />
					<CardArtworkField />
					<CardArtworkCreditsField />
					<CardSetnumberField />
					<CardTextField />
				</div>
			</section>
			<section className="flex flex-col p-4">
				<Preview />
			</section>
		</div>
	);
}
