import type { NormalCardRenderConfig } from "./types.ts";

export const NormalRenderConfigPreset: NormalCardRenderConfig = {
	renderer: "normal",
	viewBox: {
		width: 450,
		height: 628,
	},
	masks: {
		CardArtWork: <rect x="10" y="10" width="430" height="608" fill="white" />,
	},
	clips: {
		Title: <rect x="86" y="40" width="278" height="30" />,
		BottomText: <rect x="105" y="560" width="240" height="25" />,
	},
	elements: {
		CardName: {
			x: 225,
			y: 57,
			fill: "black",
			fontFamily: "amanda_std_regular",
			fontSize: 25,
			fontWeight: 400,
		},
		CardResource: {
			x: 396.1,
			y: 57,
			fill: "black",
			fontFamily: "palatino_lt_stdlight",
			fontSize: 19,
			fontWeight: 400,
		},
		CardText: {
			x: 55,
			y: 395,
			width: 340,
			height: 160,
		},
		CardPowerImage: {
			x: 30,
			y: 561.2,
			width: 37,
			height: 37,
		},
		CardPowerText: {
			x: 85,
			y: 587,
			fill: "black",
			fontFamily: "palatino_lt_stdlight",
			fontSize: 20.6,
			fontWeight: 400,
		},
		CardDefenseImage: {
			x: 383,
			y: 561.2,
			width: 37,
			height: 37,
		},
		CardDefenseText: {
			x: 362.8,
			y: 587,
			fill: "black",
			fontFamily: "palatino_lt_stdlight",
			fontSize: 17.2,
			fontWeight: 400,
		},
		CardBottomText: {
			x: 225,
			y: 575,
			fill: "black",
			fontFamily: "amanda_std_regular",
			fontSize: 17.6,
			fontWeight: 400,
		},
		CardRarity: {
			x: 114,
			y: 594,
			width: 12,
			height: 12,
		},
		CardFooterTextSingle: {
			x: 225,
			y: 601,
			fill: "white",
			fontFamily: "dialog_cond_semiboldregular, Arial, sans-serif",
			fontSize: 10.43,
			fontWeight: 400,
		},
		CardFooterTextMulti: [
			{
				x: 225,
				y: 601,
				fill: "white",
				fontFamily: "dialog_cond_semiboldregular, Arial, sans-serif",
				fontSize: 10.43,
				fontWeight: 400,
			},
			{
				x: 225,
				y: 611.43,
				fill: "white",
				fontFamily: "dialog_cond_semiboldregular, Arial, sans-serif",
				fontSize: 10.43,
				fontWeight: 400,
			}
		]
	},
};
