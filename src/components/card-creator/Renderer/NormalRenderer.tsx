import { type ReactNode, type Ref, useMemo } from "react";
import useObjectURL from "use-object-url";
import { CardRarities } from "../../../config/cards/rarities.ts";
import type {
	NormalDentedRenderConfig,
	NormalFlatRenderConfig,
} from "../../../config/rendering/types.ts";
import { useCardCreator } from "../../../stores/card-creator.ts";
import { useCardBottomText } from "../hooks/useCardBottomText.ts";
import { useCardFooterText } from "../hooks/useCardFooterText.ts";
import {
	useScaledFontSize,
	useScaledFontSizeFromHTML,
} from "../hooks/useScaledFontSize.ts";

export type NormalRendererProps = {
	config: NormalFlatRenderConfig | NormalDentedRenderConfig;
	ref?: Ref<SVGSVGElement>;
};

export function NormalRenderer({ config, ref }: NormalRendererProps) {
	const CardBack = useCardCreator((state) => state.CardBack);
	const CardPitch = useCardCreator((state) => state.CardPitch);
	const CardName = useCardCreator((state) => state.CardName);
	const CardResource = useCardCreator((state) => state.CardResource);
	const CardPower = useCardCreator((state) => state.CardPower);
	const CardRarity = useCardCreator((state) => state.CardRarity);
	const CardDefense = useCardCreator((state) => state.CardDefense);
	const CardArtwork = useCardCreator((state) => state.CardArtwork);
	const CardTextHTML = useCardCreator((state) => state.CardTextHTML);
	const CardArtPosition = useCardCreator((state) => state.CardArtPosition);

	// Dynamically scale the font of the card name based on it's length.
	const CardNameFontSize = useScaledFontSize({
		text: CardName || "",
		baseFontSize: config.elements.CardName.fontSize,
		referenceLength: 20,
		minFontSize: 12,
		maxFontSize: 32,
		scalingFactor: 0.7,
	});

	const CardTextFontSize = useScaledFontSizeFromHTML({
		html: CardTextHTML || "",
		baseFontSize: 20,
		referenceLength: 100,
		minFontSize: 10,
		maxFontSize: 20,
		scalingFactor: 0.5,
	});

	const artwork = useObjectURL(CardArtwork);
	const cardBackImage = useMemo(
		() =>
			CardBack?.images.find((image) => image.pitch === CardPitch) ||
			CardBack?.images[0],
		[CardBack?.images, CardPitch],
	);

	const cardBottomText = useCardBottomText();
	const footer = useCardFooterText();
	const cardBottomTextFontSize = useScaledFontSize({
		text: cardBottomText,
		baseFontSize: config.elements.CardBottomText.fontSize,
		referenceLength: 20,
		minFontSize: 10,
		maxFontSize: 20,
		scalingFactor: 0.6,
	});

	const svgStyle = useMemo(
		() => ({
			aspectRatio: `${config.viewBox.width}/${config.viewBox.height}`,
		}),
		[config.viewBox.width, config.viewBox.height],
	);

	return (
		<svg
			ref={ref}
			viewBox={`0 0 ${config.viewBox.width} ${config.viewBox.height}`}
			style={svgStyle}
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
					x={CardArtPosition?.x || 0}
					y={CardArtPosition?.y || 0}
					width={CardArtPosition?.width || 0}
					height={CardArtPosition?.height || 0}
					preserveAspectRatio="xMidYMid slice"
					mask="url(#artwork-mask)"
				/>
			)}

			<image
				href={`/cardbacks/${cardBackImage?.fileName}`}
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
					textAnchor={config.elements.CardName.textAnchor || "middle"}
					dominantBaseline="middle"
					fill={config.elements.CardName.fill}
					fontFamily={config.elements.CardName.fontFamily}
					fontSize={CardNameFontSize}
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
					textAnchor={config.elements.CardResource.textAnchor || "middle"}
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
					<div className="flex h-full w-full flex-col justify-center">
						<span
							className="text-black text-center font-card-text"
							style={{ fontSize: CardTextFontSize }}
							// biome-ignore lint/security/noDangerouslySetInnerHtml: editor content is HTML
							dangerouslySetInnerHTML={{ __html: CardTextHTML }}
						/>
					</div>
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
						textAnchor={config.elements.CardPowerText.textAnchor || "middle"}
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
						textAnchor={config.elements.CardDefenseText.textAnchor || "middle"}
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
					textAnchor={config.elements.CardBottomText.textAnchor || "middle"}
					dominantBaseline="middle"
					fill={config.elements.CardBottomText.fill}
					fontFamily={config.elements.CardBottomText.fontFamily}
					fontSize={cardBottomTextFontSize}
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

			{config.variant === "dented" && generateDentedFooter(config, footer)}
			{config.variant === "flat" && generateFlatFooter(config, footer)}
		</svg>
	);
}

function generateDentedFooter(
	config: NormalDentedRenderConfig,
	footer: string | string[],
): ReactNode {
	if (Array.isArray(footer)) {
		return (
			<>
				<text
					x={config.elements.CardFooterTextMulti[0].x}
					y={config.elements.CardFooterTextMulti[0].y}
					textAnchor={
						config.elements.CardFooterTextMulti[0].textAnchor || "middle"
					}
					dominantBaseline="middle"
					fill={config.elements.CardFooterTextMulti[0].fill}
					fontFamily={config.elements.CardFooterTextMulti[0].fontFamily}
					fontSize={config.elements.CardFooterTextMulti[0].fontSize}
					fontWeight={config.elements.CardFooterTextMulti[0].fontWeight}
				>
					{footer[0]}
				</text>

				<text
					x={config.elements.CardFooterTextMulti[1].x}
					y={config.elements.CardFooterTextMulti[1].y}
					textAnchor={
						config.elements.CardFooterTextMulti[1].textAnchor || "middle"
					}
					dominantBaseline="middle"
					fill={config.elements.CardFooterTextMulti[1].fill}
					fontFamily={config.elements.CardFooterTextMulti[1].fontFamily}
					fontSize={config.elements.CardFooterTextMulti[1].fontSize}
					fontWeight={config.elements.CardFooterTextMulti[1].fontWeight}
				>
					{footer[1]}
				</text>
			</>
		);
	}

	return (
		<text
			x={config.elements.CardFooterTextSingle.x}
			y={config.elements.CardFooterTextSingle.y}
			textAnchor={config.elements.CardFooterTextSingle.textAnchor || "middle"}
			dominantBaseline="middle"
			fill={config.elements.CardFooterTextSingle.fill}
			fontFamily={config.elements.CardFooterTextSingle.fontFamily}
			fontSize={config.elements.CardFooterTextSingle.fontSize}
			fontWeight={config.elements.CardFooterTextSingle.fontWeight}
		>
			{footer}
		</text>
	);
}

function generateFlatFooter(
	config: NormalFlatRenderConfig,
	footer: string | string[],
): ReactNode {
	if (!Array.isArray(footer)) {
		return null;
	}

	return (
		<>
			<text
				x={config.elements.CardFooterTextLeft.x}
				y={config.elements.CardFooterTextLeft.y}
				textAnchor={config.elements.CardFooterTextLeft.textAnchor || "middle"}
				dominantBaseline="central"
				fill={config.elements.CardFooterTextLeft.fill}
				fontFamily={config.elements.CardFooterTextLeft.fontFamily}
				fontSize={config.elements.CardFooterTextLeft.fontSize}
				fontWeight={config.elements.CardFooterTextLeft.fontWeight}
			>
				{footer[0]}
			</text>

			<text
				x={config.elements.CardFooterTextRight.x}
				y={config.elements.CardFooterTextRight.y}
				textAnchor={config.elements.CardFooterTextRight.textAnchor || "middle"}
				dominantBaseline="middle"
				fill={config.elements.CardFooterTextRight.fill}
				fontFamily={config.elements.CardFooterTextRight.fontFamily}
				fontSize={config.elements.CardFooterTextRight.fontSize}
				fontWeight={config.elements.CardFooterTextRight.fontWeight}
			>
				{footer[1]}
			</text>
		</>
	);
}
