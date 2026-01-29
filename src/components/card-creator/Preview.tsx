import type { NormalCardRenderConfig } from "../../config/rendering/types.ts";
import { AllRenderConfigVariations } from "../../config/rendering.ts";
import { NormalRenderer } from "./Renderer/NormalRenderer.tsx";

export function Preview() {
	const renderConfig = AllRenderConfigVariations.normal_dented;

	return <NormalRenderer config={renderConfig as NormalCardRenderConfig} />;
}
