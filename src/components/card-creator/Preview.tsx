import {useMemo} from "react";
import { useCardCreator } from "../../stores/card-creator.ts";

export function Preview() {
	const { CardBack, CardPitch, CardName } = useCardCreator();

	const cardBackImage = useMemo(
		() => CardBack.images.find(image => image.pitch === CardPitch) || CardBack.images[0],
		[CardBack.images, CardPitch],
	);

	return (
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
					y="55"
					textAnchor="middle"
					dominantBaseline="middle"
					fill="black"
					fontFamily="serif"
					fontSize="18"
					fontWeight="400"
					clipPath="url(#title-clip)"
				>
					{CardName}
				</text>
			)}
		</svg>
	);
}
