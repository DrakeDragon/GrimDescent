# Grimm Descent — Stage 2

Extract the full folder and open index.html. For hosting, upload index.html and the entire assets directory. The src folder includes editable sources; rebuild with node src/build.js and copy src/index.html to the root. Existing downloads remain unchanged.

## Changes
- Health bars placed above the full sprite frame, including evolution scaling.
- Dialogue above all visible characters, with one active speaker, no interruption, reading-time durations of 7–15 seconds and a four-second pause after each line. Automatic chatter attempts reduced to every 12–18 seconds. Dialogue timers compensate for battle speed.
- Sprite sizes and formation positions leave room overhead; large enemies also respect this space.
- Seven new eight-frame hero sheets: Red, the Wolf, Granny, Gretel, Hansel, the Piper and Rumpelstiltskin. Together with Huntsman, all eight Hollow Woods starting heroes have sprite art.
- Eight portraits used on formation/upgrade cards, hero details and recruitment cards.
- Attack sequences remain visible after the short combat lunge; successful special skills trigger casting art.
- New illustrated title background, revised title/menu styling, forest/brass panels, dialogs, tabs and upgrade controls.

## Verification and limits
Build and bundled JavaScript syntax passed. Regression checks passed for overhead placement at 230/260/300/400 battlefield heights across evolution levels, dialogue duration/interruption/cooldown, attack row playback, and portrait mapping/fallback. Generated sheets visually inspected; real transparent padding checked. Full browser/mobile playtesting remains pending because the earlier local browser preview was blocked by browser policy. Generated animations can still have pose variation; this is a review build.

The full 150-hero roster is not yet illustrated. Non-starting heroes, most enemies, equipment, pets and some UI icons retain original emoji. New portraits are shared across evolution tiers; unique evolution costumes remain future work. Next art pass should finish opening enemies/miniboss/boss, then expand recruitment heroes and equipment/UI icons.

See GENERATION-PROMPTS.json for exact prompts used with built-in image generation. Source artwork is in assets.
