# Grimm Descent — Stage 10: combat, progression and loot repair

## Battle presentation

- Eight formation seats are spread across distinct front, middle and rear positions. Hero sprites are slightly smaller to give each character room.
- Melee heroes advance at a readable pace, keep their own lanes and hold their combat position for repeated attacks. They return when their target is gone. Ranged heroes remain behind them.
- Attack animation uses a separate presentation clock. Fast simulation speeds no longer consume the animation before a frame can be shown. Rapid attacks allow the current visual cycle to complete, stationary attacks blend between poses, and enemy attacks also trigger their sprites.
- Small attack recoil and projectile origins at the character’s body make attacks easier to read.

## First campaign and later-region graphics

- The current and following painted region backgrounds are requested ahead of use. While a new image loads, the last painted scene stays visible. The old emoji scenery is no longer used as a loading fallback.
- Unknown procedural enemy names now select an illustrated creature from their region and combat role, instead of selecting unrelated art through a shared emoji key. Named designs retain their individual artwork.
- Weather uses softer particles, restrained colors and lighter overlays so the paintings remain visible. The weather chip uses matching vector symbols instead of reintroducing emoji on every HUD update. Rockfall no longer displays an emoji over combat.
- Existing assets cover all first- and second-campaign regions through stage 2,000. Many later worlds still share environment/enemy kits; this update does not add new painted assets or claim every later creature is unique.

## Healing and the wall

- Ordinary enemy hits now include a stage-scaled health-relative component. This prevents exponential hero health growth from making enemy damage negligible. Armor, damage reduction, weather and the vanguard’s defensive role still matter.
- Incoming pressure increases gradually toward the soft wall and accelerates through the hard-wall region. Existing no-kill Dread still begins after 15 active real seconds and compounds every second. Wall positions remain estimates; actual survival depends on the party and its upgrades.
- Direct healing is reduced and bounded by a per-hero recovery budget, preventing stacked healers and pets from instantly restoring every wound. Recovery weakens deeper into the wall and as Dread rises.
- Passive regeneration is capped at 0.15% of maximum health per simulation second, before further recovery/weather modifiers. It pauses for three simulation seconds after taking a hit. Potions no longer add an uncapped passive regeneration stream.
- Successful stage advances restore 6% health before the soft wall, 2% in the soft-wall region and none at or beyond the estimated hard wall. Repeating or retrying a stage grants no free heal. Fallen allies return at 25% health after a successful advance.
- Automatic narrator resurrection stops at the soft wall. Resurrection skills remain available, with limited health and a per-hero reuse delay. Granny’s group heal no longer also randomly resurrects fallen allies. Shields and stacked cooldown reductions are limited so they cannot erase all incoming pressure.
- Enemy control effects wear off faster in the wall region. Root prevents movement without incorrectly silencing a ranged enemy that is already in range.
- A party wipe still opens the paused Rewrite/Retreat choice. Both rewrite paths now rebuild a living party and retain permanent progression.

## Relics and inventory

- Mini-boss chests contain one relic, boss chests two, and premium chests three. Rewards no longer multiply with party size. Mini-boss minimum rarity is Common; boss minimum is Fine; premium minimum is Epic.
- Regular enemy relic drops are about 0.2% at baseline and at most 0.8% with current luck/loot bonuses, rather than the former much larger chance. Bosses and minibosses give their chest instead of an extra random gear roll.
- Stacked attack, health and gold relic bonuses now have diminishing returns. Existing item identities, rarity, enhancement levels and saved base stats are retained; their combined contribution is rebalanced.
- Auto-sell rejects redundant incoming upgrades already surpassed by a same-slot item in the bag. It still respects the player’s auto-equip and auto-sell settings.
- The Gear page’s **Sell outclassed** button can sell obsolete items of any rarity. Existing bag contents are not automatically purged by installing this update.

## Install

For Stage 9, merge the Stage 10 update ZIP into your existing game folder and replace matching files. The update contains the new index.html and current sources; no new image files are required. Keep all existing assets. On a hosted game, replace index.html at the same address and reload the game. Keep the same site address and browser storage to retain your current local save.

The full ZIP includes the current game and all artwork. Open the index.html at its top level.

This update changes live balance on existing saves. A party already well past its wall may now take substantial damage and need to Rewrite. Earned campaign unlocks, owned heroes, pets, gems, Wishes and existing relic data are retained by the update.

## Verification

- Build and bundled JavaScript syntax checks passed.
- Thirty-six actual-wave simulations across the first two campaigns tested hero levels 35, 55 and 75, including heavily geared level-75 parties. They covered early play, soft-wall attrition, hard-wall casualties and full party wipes. Ordinary pre-wall fixtures survived; every tested party wiped in the deeper hard-wall region. Summary results are in STAGE-10-CHECKS.json, with stage numbers converted to the displayed numbering.
- Fresh solo level-one starters cleared the first stage of both campaigns without deaths.
- Formation spacing, persistent melee engagement, ranged positioning, full visual attack cycles at speeds 1/2/3, healing limits, stage-recovery limits and Dread escalation passed.
- Chest counts, duplicate auto-sale, unchanged saved item records, and a 12,000-kill drop-rate check passed (84 random relics with maximum tested luck/loot bonuses).
- All 400 regions across campaigns one and two resolve to existing painted files. Missing/loading images were tested for retention of the previous painted scene and absence of emoji scenery. Existing Stage 9 hero, portrait, recruitment, miniboss and villain mappings passed regression checks.
- Defeat/restart choices, permanent progression preservation, approximately 30 FPS scheduling, bounded sprite caches and no paused/hidden battlefield rendering passed.

These checks use the game logic and a mocked drawing environment. A complete visual phone playthrough and battery/thermal measurements remain pending.

