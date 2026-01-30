import {
	NormalDentedRenderConfigPreset,
	NormalFlatRenderConfigPreset,
} from "./rendering/preset.tsx";
import type { CardRenderConfig } from "./rendering/types.ts";

export const AllRenderConfigVariations: Record<string, CardRenderConfig> = {
	normal_dented: NormalDentedRenderConfigPreset,
	normal_flat: NormalFlatRenderConfigPreset,
};

export type RenderConfigVariation = keyof typeof AllRenderConfigVariations;
