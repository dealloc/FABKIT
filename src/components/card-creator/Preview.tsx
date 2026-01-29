import type { NormalCardRenderConfig } from "../../config/rendering/types.ts";
import { AllRenderConfigVariations } from "../../config/rendering.tsx";
import { NormalRenderer } from "./Renderer/NormalRenderer.tsx";

export function Preview() {
	const renderConfig = AllRenderConfigVariations.default_flat;

	return <NormalRenderer config={renderConfig as NormalCardRenderConfig} />;
}
