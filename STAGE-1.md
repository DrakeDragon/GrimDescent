# Stage 1 — opening battle art foundation

Included: corrected alpha-transparent Huntsman sheet, new Hungry Rat walk/bite sheet, shared sprite metadata and renderer, grounded sizing, asset-loading fallback, opening-area-only Woods backdrop with aspect ratio preserved. Existing emoji remain for unmapped characters. Original gameplay and saves remain in place. Generated art uses the built-in image generation tool.

Verification: both sheets 1536x1024 with real transparent padding; source/build syntax checks; renderer checks for cell dimensions, attack row, unmapped enemy and unloaded-image fallback. Browser preview was blocked by the browser's local-file policy, so mobile visual QA remains pending. Do not treat this as release-ready animation polish.

Open index.html with assets alongside it. At the first area, Huntsman and Hungry Rat use the new renderer. The sheet includes walk and attack poses; attack selection follows existing lunge state. Generated pose consistency and full attack timing still need a visual pass.

## Stages ahead
1. Validate opening battle composition on a phone; refine animation timing and silhouettes.
2. Complete Hollow Woods starting crew and portraits, maintaining individual identities.
3. Complete opening enemy family, elite variants and bosses.
4. Replace menu/HUD icons and finish buttons, panels, inventory and recruitment screens.
5. Expand campaign backgrounds and roster in approved batches; optimize mobile memory and loading.

## Prompts
Huntsman edit: Remove all painted background to actual alpha, preserve all eight character frames, positions, cell boundaries, dimensions, character and crossbow details.
Hungry Rat: dark fairytale painted production sheet; four columns/two rows, eight equal cells on 1536x1024; left-facing mangy grey-brown rat, amber eyes, curling tail; four walk and four bite poses; consistent scale/baseline and generous padding; actual transparent background, no labels, floor or glow.
