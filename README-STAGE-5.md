# Grimm Descent — Stage 5: Relics, navigation and The Raven

Extract the full folder and open index.html. For hosting, upload index.html and assets together. This build includes all earlier art and fixes. Earlier ZIPs remain unchanged.

## Fairytale equipment
All newly generated gear now comes from an illustrated 24-relic collection covering six equipment slots: weapons, headgear, armor, trinkets, boots and rings. Names and rarity modifiers follow the fairytale setting. Examples: Glass-Slipper Bow, Rumpel's Golden Spindle, Seven-League Boots and Ring of the Frog Prince.

Existing saved gear is converted to this collection when the save loads, including equipment, bag items, stored campaign items and already-generated chest contents. Item IDs, rarity, item level, enhancement level and stat values stay intact. Conversion is deterministic and repeatable. Only naming/art metadata changes. Equipment artwork is used in inventory, equipped slots, detail dialogs, equip choices and loot results.

## Interface
A new 32-icon painted brass atlas replaces emoji presentation across the seven bottom tabs, pages, dialogs, skill bar and toast messages. Icons without a specific painted counterpart use a shared scroll emblem. Gear and Shop have new headers and illustrated inventory treatments; other tabs receive matching storybook headings and consistent forest/brass surfaces. Existing UI strings still contain some emoji internally, but these rendering paths replace them with graphic spans. This does not replace remaining emoji-based battlefield pets, hero sprites or combat effects.

## The Raven broadcast
The top strip now scrolls fictional local news. Sixty campaign-specific headlines combine with current area, weather, local boss information and the most recent reached story chapter. Future chapter text is excluded. Field reports can join the next broadcast cycle. The stream duplicates text for a continuous scroll and keeps its position through ordinary stage changes within an area. It refreshes for a new area, campaign, weather or next reporting cycle. Hover pauses it; reduced-motion settings stop automatic scrolling and permit manual horizontal reading.

## More progression art
- Stages 81–120 receive four new backgrounds and 24 regular enemy designs plus four bosses: haunted crossroads, grand orrery, sinister court and dragon vault.
- Beanstalk Wars crew: eight new four-pose hero designs and eight portraits.
- Total bespoke opening-progression coverage: 84 enemy/boss designs through stage 120; 24 illustrated heroes across the first three campaign crews. Other encounters still use shared creature-family artwork until they receive bespoke designs. Elite minibosses retain their matching enemy art with elite treatment.

## Verification and remaining work
Build and bundled JavaScript syntax passed. Tests cover 500 generated gear drops, matching relic art/slot, recursive and idempotent old-gear conversion preserving stats, actual save-load conversion, all ten campaign broadcasts and chapter gating, ticker duplication/timing/no per-stage reset, UI emoji conversion/accessibility, 24 hero mappings, 84 enemy mappings, and the automatic ranged-attack regression. New images visually inspected; alpha/dimensions checked and frame bounds regenerated.

Full browser/mobile visual review remains pending after the earlier local-file browser policy block. Remaining hero sprites, pets, combat effects, bespoke late enemies, additional unique icons and evolution costumes need future art passes. Generated animation poses can still vary.

Sources are in src. Build with node src/build.js, then copy src/index.html to root. Exact prompts and asset indexes are in STAGE-5-PROMPTS.json. Built-in image generation was used.
