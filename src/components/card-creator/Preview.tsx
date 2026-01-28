import {useMemo} from "react";
import maskImage from "../../assets/mask.png";
import { useCardCreator } from "../../stores/card-creator.ts";

export function Preview() {
	const { CardBack } = useCardCreator();
	const maskStyle = useMemo(
		() => {
			const mask = CardBack.mask || maskImage;
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
				src={`/cardbacks/${CardBack.images[0].fileName}`}
				alt="Cardback"
			/>
		</div>
	);
}
