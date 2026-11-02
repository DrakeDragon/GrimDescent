# Grimm Descent — Stage 3

Extract the whole folder and open index.html. Upload index.html and assets together when hosting. This build includes the prior heroes, portraits and title artwork.

## Combat and animation fixes
Normal ranged attacks now explicitly trigger the attack animation, including Red Riding Hood. Granny's basic healing also triggers her casting pose. These triggers work independently of upgrades and special-skill unlocks. Combat damage, targeting and attack intervals are unchanged.

Walk frames now use a continuous display clock, smooth pose blending and measured alpha bounds to center each pose and align its feet. Rapid battle speed no longer accelerates walk playback without limit. Sprite bobbing reduced. Blending improves transitions; it does not create new anatomical in-between drawings, so some generated pose variation can remain.

Upgrade buttons now use brass/forest colors in affordable and unaffordable states, including formation, hero detail, charms and shop controls. Previous higher-specificity neon styles are overridden.

## New progression art
Campaign 1, stages 1–40 now have four illustrated backgrounds and four enemy atlases:
- 1–10: woodland cellar, six enemies and The Cauldron.
- 11–20: ancient sewers, six enemies and The Fatberg.
- 21–30: goblin marketplace, six enemies and Gerald the Gate-Goblin.
- 31–40: crypt library, six enemies and The Library Warden.

Each enemy/boss has four poses: neutral, step, windup and strike. Minibosses reuse the correct regular enemy art at elite scale with gold glow and ELITE label, matching the existing game's randomized elite system; they are not separate unique miniboss characters. Later stages and other campaigns retain their prior backgrounds and emoji where custom art is unavailable.

## Verification
Build and JavaScript syntax passed. Targeted checks passed for automatic ranged attacks and cooldowns, correct attack-row playback, blended frame weights/foot anchors, all 28 enemy/boss name mappings and elite aliases, actual atlas dimensions, background files, mobile overhead spacing, frame-contained alpha bounds and final upgrade-button styles. All new images visually inspected. Full browser/mobile playtest remains pending; local browser preview was blocked by policy earlier in the session.

Sources are in src. Build with node src/build.js, then copy src/index.html to the root. src/art-bounds.js contains measured per-frame alpha bounds and is part of the build. Stage-3 exact generation prompts are in STAGE-3-PROMPTS.json; new images were generated with the built-in image generation tool.
