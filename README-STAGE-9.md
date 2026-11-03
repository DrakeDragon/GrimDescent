# Grimm Descent — Stage 9: Dragon’s Wedding and Bone Orchard

This version includes the previous art, combat, recruitment and performance work.

## New art connected to the game

- Fifteen newly illustrated heroes, each with four animation poses and a portrait. Dragon’s Wedding: Saint George (Retired), Eliza of the Wild Swans, the Archangel Dragon-Fixer, the Goose Girl, the Shadow Without a Man, Twelve Dancing Princess, the Emperor’s Herald and the King’s Fool. Bone Orchard: Vasilisa Firelight, Ivan Tsarevich, Vasilisa’s Doll, the Firebird, the Bone-Orchard Gardener, the Town Crier and the Grey Wolf Mage. The Iron-Toothed Gatekeeper keeps his existing individual sheet and portrait.
- Portraits appear throughout the existing formation, upgrades, hero details, recruitment, equipment and prologue views. The illustrated recruitment pool now contains 64 heroes. The first recruit still requires 24 real hours; existing saves and owned heroes are retained.
- Twelve regular enemy designs: Dragonling Sentry, Cursed Bridesmaid, Wedding-Cake Gargoyle, Golden-Fruit Florist, Basilisk Priest, Banquet Mimic; Bone-Fence Hound, Skull-Lantern Wisp, Birch Revenant, Mortar Imp, Hungry Root and Grave Crow. Each has four poses.
- Two dedicated minibosses, the Wolf Best Man and the Midnight Rider, replace enlarged regular-enemy artwork in these campaigns’ elite waves.
- Two dedicated campaign villains: Lord Vermithrax, the Wyrm Groom, and Baba Yaga in her flying mortar. They appear in the ninth and tenth area boss encounters of each repeating ten-area chapter cycle. Earlier area bosses use members of the corresponding illustrated cast.
- Four painted environments: the wedding cathedral, cursed rose garden, moonlit bone orchard and walking-hut clearing. Each campaign alternates its two environments every 30 stages. Campaign cards and prologues use the new main scene.
- Both campaigns now retain their own enemy roster, area names and environments throughout all 2,000 stages. Existing generated combat-kind ordering, weather, hazards, damage/health formulas and rewards are retained. This is a presentation/content pass, not new boss ability mechanics.

## Install

For an existing Stage 8 installation, merge the contents of the Stage 9 update ZIP into the same game folder and replace matching files. Keep the older assets folder contents. For hosting, replace index.html and upload the ten new images from the update’s assets folder. Keep the same site address to retain browser-local progress.

The full ZIP is a complete standalone game folder. Do not move to a different host or clear browser storage if you want to keep the current local save.

## Validation and remaining polish

All new art was visually inspected. Sprite alpha bounds were measured per frame, including the seven-row Bone Orchard hero sheet. Build and bundled JavaScript syntax checks passed. Automated checks passed for all 15 new heroes, 64 illustrated recruitment candidates, 142 named enemy mappings, every area in both campaigns, actual elite/villain wave spawning, background paths and preserved weather/combat kinds. Existing Dread damage, party wipe, restart/retreat, permanent progression and rendering-cache checks passed.

Images load on demand; the existing bounded sprite cache, cached background scaling and approximately 30 FPS renderer remain in use. Actual phone battery measurements and a complete mobile visual playthrough remain pending. These are four-pose sheets, not full separate idle/run/hit/death animation sets. Eight campaign crews now have individual artwork; 86 heroes in the full roster remain for later passes.

Built-in image generation was used. The exact ten prompts are saved in STAGE-9-PROMPTS.json. Assets are in assets/ and editable game sources are in src/. Running node src/build.js builds src/index.html; copy it to the game folder’s index.html after source changes.
