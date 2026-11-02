# Grimm Descent — Stage 4

Extract the complete folder and open index.html. For hosting, upload index.html with the assets directory. Earlier ZIPs remain unchanged. This includes all artwork and fixes from Stage 3.

## Added in this pass
- Stages 41–80: fungal grotto, volcanic forge, frozen pantry and cloud palace backgrounds.
- 24 more regular enemies and four more bosses, each with four poses. Total bespoke opening-progression enemy/boss designs: 56 across stages 1–80.
- Sleeping Court crew: eight new four-pose sprite designs and eight portraits. Total illustrated heroes: 16.
- Ten campaign illustrations used in campaign cards, prologues and each later campaign's opening battlefield.
- Prologue popup rebuilt with campaign illustration, readable introduction and eight portrait cards. Unillustrated heroes use initials medallions in this popup and other portrait slots rather than emoji.
- Battlefield enemy rendering no longer uses emoji, including while images load. Later encounters without a bespoke design use shared creature-family artwork selected by existing creature icon, area theme and combat role; bosses use a shared themed boss. This expands art coverage without claiming every later enemy has a unique design.
- Later stage backgrounds reuse the illustrated environment library according to their realm theme. Direct bespoke background coverage extends through stage 80 of the first campaign.
- Shared decoding for images referenced by multiple atlas entries; per-frame bounds support non-integer sheet cell sizes.

## Still to finish in later passes
Most of the 150-hero roster still needs individual sprite/portrait art. Those unillustrated heroes can still use emoji in battle; portrait slots use initials. Later enemy and boss encounters need more unique designs to replace shared art. Equipment, pets, currencies, spells, weather and other UI icons still include emoji. Elite minibosses continue to use enlarged regular enemy art with gold treatment rather than separate characters. Evolution tiers share base artwork.

## Validation
Build and bundled JavaScript syntax passed. Targeted checks passed for 56 enemy-name mappings, 330 actual roster/theme entries with elite/shared/boss fallbacks, all eight Sleeping Court sprite mappings/playback, no enemy emoji when an image is unavailable, and all ten campaign prologues with eight crew cards and no emoji. New images visually inspected; generated alpha and dimensions checked; frame bounds regenerated. These checks do not replace a full browser/mobile playtest, which remains pending after the earlier local-file browser policy block.

Exact generation prompts are in STAGE-4-PROMPTS.json. Built-in image generation was used. Sources are in src; node src/build.js writes src/index.html, which should then be copied to root index.html.
