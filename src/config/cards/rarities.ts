export const CardRarities = {
	basic: {
		label: "card.rarity.basic",
		icon: "/img/rarities/rarity_basic.svg",
	},
	common: {
		label: "card.rarity.common",
		icon: "/img/rarities/rarity_common.svg",
	},
	fabled: {
		label: "card.rarity.fabled",
		icon: "/img/rarities/rarity_fabled.svg",
	},
	legendary: {
		label: "card.rarity.legendary",
		icon: "/img/rarities/rarity_legendary.svg",
	},
	majestic: {
		label: "card.rarity.majestic",
		icon: "/img/rarities/rarity_majestic.svg",
	},
	marvel: {
		label: "card.rarity.marvel",
		icon: "/img/rarities/rarity_marvel.svg",
	},
	promo: {
		label: "card.rarity.promo",
		icon: "/img/rarities/rarity_promo.svg",
	},
	rare: {
		label: "card.rarity.rare",
		icon: "/img/rarities/rarity_rare.svg",
	},
	superrare: {
		label: "card.rarity.superrare",
		icon: "/img/rarities/rarity_superrare.svg",
	},
	token: {
		label: "card.rarity.token",
		icon: "/img/rarities/rarity_token.svg",
	},
} as const;

export type CardRarity = keyof typeof CardRarities;