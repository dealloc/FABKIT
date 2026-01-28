import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CardTalents } from "../../config/cards.ts";
import { useCardCreator } from "../../stores/card-creator.ts";

export function Preview() {
	const { CardBack, CardPitch, CardName, CardResource, CardPower, CardTalent } =
		useCardCreator();
	const { t } = useTranslation();

	const cardBackImage = useMemo(
		() =>
			CardBack.images.find((image) => image.pitch === CardPitch) ||
			CardBack.images[0],
		[CardBack.images, CardPitch],
	);

	const cardTypeText: string | null = useMemo(() => {
		if (CardTalent) {
			return t(CardTalents[CardTalent]);
		}

		return null;
	}, [CardTalent, t]);

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
					>
						{cardTypeText}
					</text>
				)}
			</svg>
		</div>
	);
}
