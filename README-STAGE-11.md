# Grimm Descent — Stage 11: living party damage and eight hero specials

## Party damage follows the survivors

- Fallen heroes no longer contribute to the active damage estimate, auto-tap power, passive auras, party milestone bonuses or party-derived familiar attack power. A revival restores their contribution.
- If every deployed hero has fallen, the active damage estimate and auto-tap damage are zero. The HUD shows the number of living heroes alongside **active dmg/s**.
- The number is an estimate of normal attacks and auto-taps, not a measurement of special-skill bursts. Already launched projectiles, poison/burn effects and timed buffs can finish naturally after their caster falls.
- Offline estimates use the recovered roster rather than treating an offline party as permanently fallen.

## Eight hero specials

- The battlefield bar now has exactly eight portrait buttons, one for each formation seat. Empty seats stay visible as locked slots. Replacing a seated hero also replaces their skill button.
- The buttons use the actual heroes’ existing signature abilities. There is no separate Learn/Upgrade purchase for these active skills. A special unlocks at hero level 5 and its level grows automatically with hero upgrades.
- Press a ready portrait to activate the skill manually. Turn **Auto Fairy ON** to cast ready specials automatically when they have a valid combat target. Healing and revival skills wait for an appropriate ally; offensive skills need enemies.
- Manual and automatic activation share the same per-hero timer. They cannot double-cast or bypass cooldowns. Fallen heroes cannot cast, and paused games do not auto-cast.
- The Charms page shows the same eight specials with portraits, hero names and cooldown information. Passive Charms & Boons remain available below them.
- Cooldowns have a six-second minimum and limited cooldown reduction; timers run in game time, so battle speed affects the whole fight consistently. Direct skill power and the currency skill’s multiplier are bounded to prevent excessive scaling. Stage 10 healing budgets, wall pressure and Dread remain in effect.
- Older separate spell-purchase records remain in saved data for compatibility. They are no longer a second set of active buttons; active powers now follow hero progression.

## Unused relics

- **Gear → Equip best** equips suitable upgrades already in the bag onto the deployed party. It does not generate new items or charge gold.
- Auto Fairy also checks the bag when **Auto-equip upgrades** is enabled. It skips unchanged inventories instead of repeatedly scanning and re-equipping them.
- If Auto-sell is enabled, outclassed leftovers can be sold after equipping. If it is disabled, replaced equipment stays in the bag. The existing **Sell outclassed** button is still available for a manual cleanup.
- The reduced chest sizes and ordinary-enemy drop rates from Stage 10 are retained.

## More artwork and late-enemy repair

- Twenty-one enemy/boss designs have refreshed four-pose artwork across the Tower of Talking Doors, Dragon’s Hoard & Counting-House, and Dimension of Unfinished Tales. This includes the crowned Noble, Draconis the Hoard King and the clockwork Eternal Stand-Up bosses. These replace earlier designs rather than adding 21 new enemy types.
- Each region has a new matching painted background. They are connected to the first campaign’s displayed stages 101–130; related procedural areas can also use these region kits.
- The six new PNG files use versioned names to avoid stale cached images. Sprite crops use 84 individually measured frame rectangles, including uneven row heights, so the characters are not cut up by assumed equal rows.
- Failed images retry up to three times. While waiting for an enemy sheet, the game can show an already loaded illustrated enemy instead of leaving the basic loading shape permanently on screen. Health bars follow the illustration actually being displayed.
- Later procedural enemies and environments still share region kits. More unique heroes, enemies, effects and world art remain future work.

## Install

For an existing Stage 10 installation, merge the Stage 11 update ZIP into the same game folder, replacing matching files and merging its assets folder. Keep all older assets. Upload the new index.html and all six new PNGs if you host the game.

The full ZIP contains the game and the complete artwork collection. It is useful if an earlier update left some older image files out of the installation. Open the index.html at the top level of the extracted game.

Reload the game and check the title footer for **v11 · Fellowship Skills & Living Damage**. Keep the same hosting address and browser storage to retain your local save. Existing heroes, campaign unlocks, pets, gems, Wishes and relic records are preserved.

## Verification

- Build and bundled JavaScript syntax checks passed.
- Tests passed for reduced live DPS and auto-tap damage after death, removal of fallen passive sources, zero damage with all heroes fallen, and restored contribution after revival.
- All 24 signature-skill families were activated through the shared timer API. Manual/Fairy double-cast prevention, level-five unlocking, fallen/paused restrictions, eight-button/eight-card rendering and campaign swaps passed.
- Equipping saved bag upgrades and skipping unchanged inventories passed.
- All 84 new frame rectangles were checked against their PNG dimensions and the actual draw calls. Every game art reference resolves to a file. The new enemy sheets have transparent corners; the Unfinished Tales sheet received a separate background-removal pass.
- Thirty-six actual-wave simulations with Auto Fairy skill casting enabled covered both first campaigns, hero levels 35/55/75, heavily geared parties, ordinary stages and the wall region. Early fixtures survived; deeper-wall fixtures suffered full party wipes. Results are in STAGE-11-CHECKS.json.
- Fresh level-one starter fights, restart/permanent-progression behavior, existing hero/recruitment/campaign art mappings and the approximately 30 FPS/bounded-cache rendering checks passed.

These checks use the game logic and a mocked drawing environment. Full visual testing on a phone and battery measurements remain pending.

Built-in image generation was used. The exact generation and transparency-edit prompts are saved in STAGE-11-PROMPTS.json. Selected images are saved in assets/; sources are in src/.
