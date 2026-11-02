# Grimm Descent — Stage 6

Extract everything and open index.html. For hosting, replace index.html and upload the complete assets directory together. All earlier artwork/features are included. Earlier ZIPs are unchanged.

## Combat visibility fix
Auto-Tap, ordinary attacks, specials, weather damage and damage-over-time now respect the same target eligibility check. An enemy must enter the viewport and be visible for 0.4 seconds of real time before it can take damage. Offscreen enemies still walk into the battle and remain counted toward their wave. Ranged enemies must move inside the viewport before stopping to fire. This addresses waves dying and stages advancing before enemies appeared around stage 50.

## Walls are earned through combat
The previous hard-stage progression clamp has been removed. A successful clear can advance past the old cap. Enemy damage now scales much more sharply beyond the soft-wall threshold, alongside the existing endurance growth. Existing armor, damage reduction, shields, healing, death, revival and party-wipe/retreat systems still apply; there is no scripted instant-death boundary. Stronger parties can push further, and Rewrites shift the danger deeper.

The old hard-cap UI now describes estimated severe danger. Offline progress cannot newly advance through an unproven soft-wall region, because that estimate does not simulate party survival. It can still farm rewards and revisit proven progress.

## Recruitment
The first recruitment unlock occurs 24 REAL hours after the save begins, including time away. Earlier boss invitations are held until then. The first timed event occurs at that unlock; subsequent calendar events retain the weekly cadence. Gem recruitment cannot spend gems before the gate opens or when no illustrated candidates remain.

New recruitment candidates are limited to the 33 heroes with individual sprite and portrait art. Previously owned heroes are retained. Old candidate lists are filtered safely; recruitment credits are queued rather than consumed before the unlock. For old saves, the start time is inferred from their existing weekly recruitment schedule where available.

## Pet overhaul and more art
- All 30 game familiars now have painted four-pose animations and matching collection/detail/hatch images. Battlefield companions use their animated sheets. Pet IDs, levels, rarity and abilities remain intact. Remaining modern pet names were adapted to the fairytale setting.
- The Iron-Toothed Gatekeeper has a dedicated eight-frame sprite sheet and portrait, including for already-recruited saves.
- Eight Drowned Kingdom heroes receive four-pose sprites and portraits. Total illustrated heroes: 33.
- Four new environments and 28 enemy/boss designs: the hall of unfinished tales (stages 121–130), plus deep forest, desert ruins and sunken reef sets used by corresponding procedural realm themes. The enemy library now maps 112 distinct enemy/boss names. Other variants still use shared family artwork; elite minibosses retain their elite treatment.
- Sprite sheets and stage backgrounds now load on demand; rows that use the same sheet share its decoded image.

## Validation
Build and bundled JavaScript syntax passed. Targeted tests passed for the exact 24-hour boundary, queued invitations, gem refusal, old-save migration, illustrated-only candidate pools, offscreen/newly-entering targeting and damage, all 30 pet mappings, all 33 recruitment-art mappings, successful advancement beyond the former hard cap, and local existence of all 176 sprite mappings. Lazy loading/shared sheet checks passed.

Twenty deterministic wave simulations used four party levels (35,45,55,70) and five starting stages (50,55,59,63,67), with no gear and fixed armor/vitality upgrades. These showed casualties near the soft wall, weaker-party wipes deeper in and stronger parties surviving further. They are controlled balance fixtures, not predictions for an individual save. Full browser/mobile playtesting and real-save balance feedback remain necessary; the earlier local-file browser preview was blocked by policy.

New images were visually inspected and alpha/frame bounds checked. Exact generation prompts and asset rosters are in STAGE-6-PROMPTS.json. Built-in image generation was used.

Sources are in src. Rebuild using node src/build.js, then copy src/index.html to root index.html. Remaining roster sprites, additional unique late enemies, evolution costumes and combat-effect artwork remain future passes.
