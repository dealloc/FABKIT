import { useMemo } from "react";
import useObjectURL from "use-object-url";
import { CardRarities } from "../../../config/cards/rarities.ts";
import type { NormalCardRenderConfig } from "../../../config/rendering/types.ts";
import { useCardCreator } from "../../../stores/card-creator.ts";
import { useCardBottomText } from "../hooks/useCardBottomText.ts";

export type NormalRendererProps = {
	config: NormalCardRenderConfig;
};

export function NormalRenderer({ config }: NormalRendererProps) {
	const {
		CardBack,
		CardPitch,
		CardName,
		CardResource,
		CardPower,
		CardRarity,
		CardDefense,
		CardArtwork,
		CardTextHTML,
	} = useCardCreator();

	const artwork = useObjectURL(CardArtwork);
	const cardBackImage = useMemo(
		() =>
			CardBack.images.find((image) => image.pitch === CardPitch) ||
			CardBack.images[0],
		[CardBack.images, CardPitch],
	);

	const cardBottomText = useCardBottomText();

	return (
		<svg
			viewBox={`0 0 ${config.viewBox.width} ${config.viewBox.height}`}
			style={{
				aspectRatio: `${config.viewBox.width}/${config.viewBox.height}`,
			}}
			className="w-full h-auto"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{CardName}</title>
			<defs>
				<mask id="artwork-mask" mask-type="luminance">
					{config.masks.CardArtWork}
				</mask>
				<clipPath id="title-clip">{config.clips.Title}</clipPath>
				<clipPath id="bottom-text-clip">{config.clips.BottomText}</clipPath>
			</defs>

			{artwork && (
				<image
					href={artwork}
					x="0"
					y="0"
					width="640"
					height="480"
					preserveAspectRatio="xMidYMid slice"
					mask="url(#artwork-mask)"
				/>
			)}

			<image
				href={`/cardbacks/${cardBackImage.fileName}`}
				x="0"
				y="0"
				width={config.viewBox.width}
				height={config.viewBox.height}
				preserveAspectRatio="xMidYMid slice"
			/>

			{/* Title bounds: x="86" y="40" width="278" height="30" */}
			{CardName && (
				<text
					x={config.elements.CardName.x}
					y={config.elements.CardName.y}
					textAnchor="middle"
					dominantBaseline="middle"
					fill={config.elements.CardName.fill}
					fontFamily={config.elements.CardName.fontFamily}
					fontSize={config.elements.CardName.fontSize}
					fontWeight={config.elements.CardName.fontWeight}
					clipPath="url(#title-clip)"
				>
					{CardName}
				</text>
			)}

			{CardResource && (
				<text
					x={config.elements.CardResource.x}
					y={config.elements.CardResource.y}
					textAnchor="middle"
					dominantBaseline="middle"
					fill={config.elements.CardResource.fill}
					fontFamily={config.elements.CardResource.fontFamily}
					fontSize={config.elements.CardResource.fontSize}
					fontWeight={config.elements.CardResource.fontWeight}
				>
					{CardResource}
				</text>
			)}

			{CardTextHTML && (
				<foreignObject
					x={config.elements.CardText.x}
					y={config.elements.CardText.y}
					width={config.elements.CardText.width}
					height={config.elements.CardText.height}
				>
					<span
						className="text-black"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: editor content is HTML
						dangerouslySetInnerHTML={{ __html: CardTextHTML }}
					/>
				</foreignObject>
			)}

			{CardPower && (
				<>
					<image
						href="/img/symbols/cardsymbol_power.svg"
						x={config.elements.CardPowerImage.x}
						y={config.elements.CardPowerImage.y}
						width={config.elements.CardPowerImage.width}
						height={config.elements.CardPowerImage.height}
						preserveAspectRatio="xMidYMid slice"
					/>

					<text
						x={config.elements.CardPowerText.x}
						y={config.elements.CardPowerText.y}
						textAnchor="middle"
						dominantBaseline="middle"
						fill={config.elements.CardPowerText.fill}
						fontFamily={config.elements.CardPowerText.fontFamily}
						fontSize={config.elements.CardPowerText.fontSize}
						fontWeight={config.elements.CardPowerText.fontWeight}
					>
						{CardPower}
					</text>
				</>
			)}

			{CardDefense && (
				<>
					<image
						href="/img/symbols/cardsymbol_defense.svg"
						x={config.elements.CardDefenseImage.x}
						y={config.elements.CardDefenseImage.y}
						width={config.elements.CardDefenseImage.width}
						height={config.elements.CardDefenseImage.height}
						preserveAspectRatio="xMidYMid slice"
					/>
					<text
						x={config.elements.CardDefenseText.x}
						y={config.elements.CardDefenseText.y}
						textAnchor="middle"
						dominantBaseline="middle"
						fill={config.elements.CardDefenseText.fill}
						fontFamily={config.elements.CardDefenseText.fontFamily}
						fontSize={config.elements.CardDefenseText.fontSize}
						fontWeight={config.elements.CardDefenseText.fontWeight}
					>
						{CardDefense}
					</text>
				</>
			)}

			{cardBottomText && (
				<text
					x={config.elements.CardBottomText.x}
					y={config.elements.CardBottomText.y}
					textAnchor="middle"
					dominantBaseline="middle"
					fill={config.elements.CardBottomText.fill}
					fontFamily={config.elements.CardBottomText.fontFamily}
					fontSize={config.elements.CardBottomText.fontSize}
					fontWeight={config.elements.CardBottomText.fontWeight}
					clipPath="url(#bottom-text-clip)"
				>
					{cardBottomText}
				</text>
			)}

			<image
				href={CardRarities[CardRarity || "basic"].icon}
				x={config.elements.CardRarity.x}
				y={config.elements.CardRarity.y}
				width={config.elements.CardRarity.width}
				height={config.elements.CardRarity.height}
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
	);
}
