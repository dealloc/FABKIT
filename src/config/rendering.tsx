/**
 * Here's where the real magic happens!
 * This file contains the configuration of positioning, scaling, fonts etc of how cards are composed.
 *
 * This stuff gets BIIIIG, and it's not always pretty since it's optimised for performance and accuracy.
 *
 * Here be dragons!
 *
 *                             \||/
 *                             |  @___oo
 *                   /\  /\   / (__,,,,|
 *                  ) /^\) ^\/ _)
 *                  )   /^\/   _)
 *                  )   _ /  / _)
 *              /\  )/\/ ||  | )_)
 *             <  >      |(,,) )__)
 *              ||      /    \)___)\
 *              | \____(      )___) )___
 *               \______(_______;;; __;;;
 *
 */

import { NormalRenderConfigPreset } from "./rendering/preset.tsx";
import type { CardRenderConfig } from "./rendering/types.ts";

export const AllRenderConfigVariations: Record<string, CardRenderConfig> = {
	default_flat: NormalRenderConfigPreset,
};

export type RenderConfigVariation = keyof typeof AllRenderConfigVariations;
