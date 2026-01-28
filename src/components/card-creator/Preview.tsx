import {useMemo} from "react";
import {CardBackMasks} from "../../config/cards/card_backs.ts";
import { useCardCreator } from "../../stores/card-creator.ts";

export function Preview() {
	const { CardBack, CardPitch } = useCardCreator();
	const maskStyle = useMemo(
		() => {
			const mask = CardBackMasks[CardBack.mask || "default"] || CardBackMasks.default;

			return {
				maskImage: `url(${mask})`,
				maskSize: "100% 100%",
				maskRepeat: "no-repeat",
				WebkitMaskImage: `url(${mask})`,
				WebkitMaskSize: "100% 100%",
				WebkitMaskRepeat: "no-repeat",
			};
		},
		[CardBack.mask],
	);

	const cardBackImage = useMemo(
		() => CardBack.images.find(image => image.pitch === CardPitch) || CardBack.images[0],
		[CardBack.images, CardPitch],
	);

	return (
		<div className="relative aspect-450/628 bg-transparent">
			<img
				style={maskStyle}
				className="absolute z-0"
				src="https://lipsum.app/640x480/AFA/fff"
				alt="Preview"
			/>
			<img
				className="absolute z-10"
				src={`/cardbacks/${cardBackImage.fileName}`}
				alt={`Cardback ${cardBackImage.id}`}
			/>
		</div>
	);
}
