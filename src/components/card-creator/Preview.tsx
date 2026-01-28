import { useMemo } from "react";
import { useCardCreator } from "../../stores/card-creator.ts";
import { CardTypes } from "../../config/cards/types.ts";
import { CardTalents } from "../../config/cards/talents.ts";
import { CardClasses } from "../../config/cards/classes.ts";
import { CardSubtypes } from "../../config/cards/subtypes.ts";
import { useTranslation } from "react-i18next";
import {CardRarities} from "../../config/cards.ts";

export function Preview() {
	const { t } = useTranslation();
	const {
		CardBack,
		CardPitch,
		CardName,
		CardResource,
		CardPower,
		CardTalent,
		CardType,
		CardClass,
		CardSecondaryClass,
		CardSubType,
		CardWeapon,
		CardRarity,
		CardDefense
	} = useCardCreator();

	const cardBackImage = useMemo(
		() =>
			CardBack.images.find((image) => image.pitch === CardPitch) ||
			CardBack.images[0],
		[CardBack.images, CardPitch],
	);

	const cardTypeText = useMemo(() => {
		// Translate talent if present
		const talent = CardTalent && CardTalent !== "none"
			? t(CardTalents[CardTalent])
			: null;

		// Translate primary class if present
		const primaryClass = CardClass && CardClass !== "none"
			? t(CardClasses[CardClass])
			: null;

		// Handle class combination with proper separator
		// Heroes use space separator, others use " / "
		const isHero = CardType === "hero" || CardType === "demi_hero";
		const separator = isHero ? " " : " / ";

		const classText = primaryClass && CardSecondaryClass && CardSecondaryClass !== "none"
			? `${primaryClass}${separator}${t(CardClasses[CardSecondaryClass])}`
			: primaryClass;

		// Translate card type
		const cardType = CardType
			? t(CardTypes[CardType].label)
			: null;

		// Build subtype portion
		const subtypeParts: string[] = [];

		// Add translated subtype if present
		if (CardType && CardSubType && CardSubType !== "none") {
			const subtypeKey = CardSubtypes[CardType]?.[CardSubType];
			if (subtypeKey) {
				subtypeParts.push(t(subtypeKey));
			}
		}

		// Add weapon suffix for weapon types
		if ((CardType === "weapon" || CardType === "weapon_equipment") && CardWeapon) {
			subtypeParts.push(CardWeapon);  // Already in format "(1H)" or "(2H)"
		}

		const subtypeText = subtypeParts.length > 0
			? `- ${subtypeParts.join(" ")}`
			: null;

		// Assemble final string
		return [talent, classText, cardType, subtypeText]
			.filter((part): part is string => Boolean(part))
			.join(" ");
	}, [CardTalent, CardClass, CardSecondaryClass, CardType, CardSubType, CardWeapon, t]);

	return (
		<div className="aspect-450/628">
			<svg
				viewBox="0 0 450 628"
				className="w-full h-auto aspect-450/628"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>{CardName}</title>
				<defs>
					<mask id="artwork-mask" mask-type="luminance">
						<rect x="10" y="10" width="430" height="608" fill="white" />
					</mask>
					<clipPath id="title-clip">
						<rect x="86" y="40" width="278" height="30" />
					</clipPath>
					<clipPath id="bottom-text-clip">
						<rect x="105" y="560" width="240" height="25" />
					</clipPath>
				</defs>

				<image
					href="https://lipsum.app/640x480/AFA/fff"
					x="0"
					y="0"
					width="640"
					height="480"
					preserveAspectRatio="xMidYMid slice"
					mask="url(#artwork-mask)"
				/>
				<image
					href={`/cardbacks/${cardBackImage.fileName}`}
					x="0"
					y="0"
					width="450"
					height="628"
					preserveAspectRatio="xMidYMid slice"
				/>

				{/* Title bounds: x="86" y="40" width="278" height="30" */}
				{CardName && (
					<text
						x="225"
						y="57"
						textAnchor="middle"
						dominantBaseline="middle"
						fill="black"
						fontFamily="amanda_std_regular"
						fontSize="25"
						fontWeight="400"
						clipPath="url(#title-clip)"
					>
						{CardName}
					</text>
				)}

				{CardResource && (
					<text
						x="396.1"
						y="57"
						textAnchor="middle"
						dominantBaseline="middle"
						fill="black"
						fontFamily="palatino_lt_stdlight"
						fontSize="19"
						fontWeight="400"
					>
						{CardResource}
					</text>
				)}

				{CardPower && (
					<>
						<image
							href="/img/symbols/cardsymbol_power.svg"
							x="30"
							y="561.2"
							width="37"
							height="37"
							preserveAspectRatio="xMidYMid slice"
						/>
						<text
							x="85"
							y="587"
							textAnchor="middle"
							dominantBaseline="middle"
							fill="black"
							fontFamily="palatino_lt_stdlight"
							fontSize="20.6"
							fontWeight="400"
						>
							{CardPower}
						</text>
					</>
				)}

				{CardDefense && (
					<>
						<image
							href="/img/symbols/cardsymbol_defense.svg"
							x="383"
							y="561.2"
							width="37"
							height="37"
							preserveAspectRatio="xMidYMid slice"
						/>
						<text
							x="362.8"
							y="587"
							textAnchor="middle"
							dominantBaseline="middle"
							fill="black"
							fontFamily="palatino_lt_stdlight"
							fontSize="17.2"
							fontWeight="400"
						>
							{CardDefense}
						</text>
					</>
				)}


				{cardTypeText && (
					<text
						x="225"
						y="575"
						textAnchor="middle"
						dominantBaseline="middle"
						fill="black"
						fontFamily="amanda_std_regular"
						fontSize="17.6"
						fontWeight="400"
						clipPath="url(#bottom-text-clip)"
					>
						{cardTypeText}
					</text>
				)}

				<image
					href={CardRarities[CardRarity || "basic"].icon}
					x="114"
					y="594"
					width="12"
					height="12"
					preserveAspectRatio="xMidYMid slice"
				/>
				<text
					x="225"
					y="601"
					textAnchor="middle"
					dominantBaseline="middle"
					fill="white"
					fontFamily="dialog_cond_semiboldregular, Arial, sans-serif"
					fontSize="10.43"
					fontWeight="400"
				>
					FABKIT - NOT LEGAL - FLESH AND BLOOD TCG BY LLS
				</text>
			</svg>
		</div>
	);
}
