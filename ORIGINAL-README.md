# 🌲 Grimm Descent

*A Tap Knight tale. Once upon a time, it all went wrong.*

**Grimm Descent** is a dark-fairytale idle auto-battler for phones and browsers. A band of survivors from a hundred cruel bedtime stories marches right, the monsters of the Hollow Woods march left, everybody hits everybody, and the narrator quietly judges. It is a single self-contained web page: no installs, no server, no build step needed to play. Progress is saved automatically in the browser.

- **Tone:** Grimm-style: grim, spooky and funny. Heroes are survivors of the tales; villains are the tales' authors.
- **150 heroes** across 8 formation seats, each with a bio, a backstory, a special move, synergy rules and **340+ unique spoken lines** each.
- **10 campaigns × 2,000 stages**, each with its own villain, prologue, chapters and finale.
- **Prestige** ("Rewrite the Tale") per campaign: a lot of resets are needed to get far; stage 2,000 is effectively impossible.

---

## ▶ Deploying on GitHub Pages

1. Create a new GitHub repository (public).
2. Upload the contents of this zip (at least `index.html` and `.nojekyll`) to the repo root.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and Save.
4. Open `https://<your-username>.github.io/<repo-name>/` on your phone. Use **Add to Home Screen** for a full-screen app feel.

The page loads Google Fonts (Bungee, Nunito, Pirata One, IM Fell English) when online; everything else is inline. Offline it falls back to system fonts.

The `src/` folder holds the readable source. To rebuild `index.html` after editing: `cd src && node build.js` (Node 16+). The built file is written next to the sources; copy it to the repo root.

---

## 🎮 How to play

1. **March.** Your squad walks right, monsters walk left. Melee heroes dash out to hit things, then return. Ranged heroes stay back and shoot only monsters that are actually on screen.
2. **Tap** the battlefield to smash the nearest monster. After about stage 10 the free Auto-Tap (3/s) handles it; tapping is optional but helps.
3. **Upgrade** a hero with the single ⬆ button under their portrait. Every press is +1 level. Attack and special skill grow automatically every few levels. Every 10 levels is a **milestone** with a unique named effect per hero (no level cap), and a **Signature** milestone every 50 levels. Heroes **evolve** automatically at levels 25, 60 and 120 (Rookie → Veteran → Elite → Mythic).
4. **Tap a portrait** to open the hero's page: bio, backstory, stats, six gear slots, milestones, synergy details and **Swap** (change who sits in that seat).
5. **Formation.** Eight seats: 🛡️ Vanguard, 🏹 Marksman, 💪 Bruiser, 💖 Support, 🔮 Arcanist, 🗡️ Skirmisher, 📣 Commander, 🎲 Wildcard. Each seat holds one hero at a time. Seats unlock at stages 1, 3, 6, 10, 15, 21, 31 and 46 (the first hero of each seat is the campaign's crew member; others come from Recruitment).
6. **Charms tab.** Learn spells for the skill bar and buy boons (tap damage, crit, gold, health, armor, weather resistance, luck and more). Tap a card for details, tap the gold button to buy. The 🧚 **Auto-Fairy** (stage 11+) buys the cheapest hero levels, seats and boons for you. It never buys pets, eggs or chests.
7. **Chests.** Mini-bosses (stage 5 of each area) and bosses (stage 10) drop a chest on the field. Tap it within 5 seconds or it is collected automatically into your unlimited **Chest Bag**, which you open in the Shop. Chests hold gear for the whole squad, gold, supplies, potions and (from bosses) 💎 gems.
8. **Gear.** Six slots per hero: Weapon, Headgear, Armor, Trinket, Boots, Ring. Enhance with gold; auto-equip and auto-sell are available in Settings.
9. **Potions** (found in chests): Strength (+10% damage), Speed (+10% attack speed), Vitality (full heal, slow regen, −10% damage taken). Each lasts 3 minutes for the whole formation.
10. **Weather and hazards.** The sky changes the battlefield (fire hates rain, ice loves snow, lightning is indiscriminate). From the second area on, each area has a **hazard** (rockfall, spores, frenzy, fog, bog, curses) that is halved if you have an ally with the right tag.
11. **Familiars (pets).** Hatch eggs from stage 3. Duplicates level automatically. Pet slots unlock at stages 31 and 81.
12. **Recruitment Events.** Every week, after the first boss and after every 5th area boss: choose 1 of 3 (or more) new heroes for their seat's roster. Gems can trigger extra events.
13. **Synergy.** Every hero has tags (🔗 aura buffs matching allies; 🤝 combo bonus when the right ally is present). Mix seats to find combinations.
14. **Idle progress.** While you are away the squad continues at a quarter of active speed, can advance stages up to your hard cap, and collects chests. You return to the stage you reached.

---

## 🧱 Difficulty, walls and prestige

- **Soft wall (~stage 56 on a fresh run).** After you have upgraded everything, monsters ramp up brutally past this point.
- **Hard cap (soft wall + 8).** You cannot pass it until you prestige.
- **Rewrite the Tale** (available from stage 21) resets gold, upgrades, skills and roster for permanent **Wishes** (+6% damage, +10% gold each, and they raise both the soft wall and the hard cap). Wishes also buy permanent perks in the **Wish Shop**.
- Wishes are **per campaign**. Each campaign has its own progress, levels, Wishes and story.
- Wall growth is deliberately slow: the second wall takes a handful of Rewrites, stage 200 takes dozens, stage 1,200 would take hundreds of resets and tens of thousands of Wishes, and stage 2,000 is out of reach by design: monsters kill you first.
- Gold is intentionally scarce; healing is intentionally weak. Damage, synergy and gear decide how far you go.

---

## 📖 Campaigns

Each campaign stars one hero from every seat, has its own prologue, 10 story chapters (one after each early area boss), periodic later chapters, and a finale at stage 2,000. Story text is told in the characters' voices. Once a hero is unlocked they can be used in any campaign; some are simply better suited to certain tales.

### 1. 🌲 The Hollow Woods

*Villain:* Mother Marzipan, the Candy Witch  
*Tagline:* Where every path leads to a cottage. Do not eat the cottage.  
*Starring:* 🏹 The Huntsman, 🧣 Red Riding Hood, 🐺 The Big Bad Wolf (Recovering), 👵 Granny Goodnight, 🔥 Gretel Ember, 🍞 Hansel Crumb, 🪈 The Piper of Hamelin, 🧌 Rumpelstiltskin

### 2. 🏰 The Sleeping Court

*Villain:* The Queen of Mirrors  
*Tagline:* A castle that has been asleep too long. Someone's been dreaming for it.  
*Starring:* 🤴 Prince Charming (Disgraced), 🏹 Cinderella Glassbow, ⛏️ Grumpy, Seventh Dwarf, 🍎 Snow White, Poison-Proof, 🧚 The Fairy Godmother (Overworked), 🐱 Puss in Boots, 😴 Briar Rose, Hundred-Year Napper, 🍎 The Apple Peddler

### 3. 🌱 The Beanstalk Wars

*Villain:* Old Thunderfoot, the Cloud Giant  
*Tagline:* Up there, the giants have been waiting. And they heard about the goose.  
*Starring:* 👵 Jack's Mother, Shieldwife, 🌱 Jack Beanstalk, 🧔 The Giant Who Said Sorry, 🎼 The Sun Harp (Enchanted), ❄️ Winter's Weather-Witch, 👍 Tom Thumb, 🫘 The Magic Beanseller, 🧵 The Unpaid Fate

### 4. 🌊 The Drowned Kingdom

*Villain:* The Sea Witch, Mother of Brine  
*Tagline:* A kingdom that sank for love, and has been paying interest since.  
*Starring:* 🦞 Sir Barnacle of the Tide, 🧜‍♀️ Mermaid Harpooner, 🎣 The Fisherman Who Wished, 🌿 Kelp-Witch Kerrigan, ⛈️ Thunder Tom, 🦪 The Pearl Thief, 🕯️ The Lighthouse Keeper, 🐙 The Mermaid's Debt Collector

### 5. ❄️ The Frost Court

*Villain:* The Snow Queen  
*Tagline:* A palace of ice where hearts go to stop.  
*Starring:* 🧊 Captain of the Ice Guard, 🔥 The Little Match Girl, 🌹 Gerda the Brave, 🦌 The Reindeer Shaman, 🪞 The Frost-Splinter Sorcerer, 🧊 Kai the Splinter-Hearted, 🪖 The Nutcracker Sergeant, 📒 Winter's Bookkeeper

### 6. ⚙️ The Clockwork Workshop

*Villain:* The Toymaker, Herr Drosselmeyer  
*Tagline:* Everything ticks. Everything watches. Everything is for sale.  
*Starring:* 💂 The Steadfast Tin Soldier, 🧸 Pinocchio, Honest Slinger, 🥜 The Nutcracker Prince, 🎎 The Doll Doctor, 🎩 The Mechanical Magician, 👠 The Red Shoes Hunter, 🩰 The Music-Box Ballerina, 🎭 Punch the Marionette

### 7. 🐉 The Dragon's Wedding

*Villain:* The Wyrm Groom, Lord Vermithrax  
*Tagline:* A wedding where the groom is a dragon and the bride is a kingdom.  
*Starring:* 🐲 Saint George (Retired), 🦢 Eliza of the Wild Swans, 😇 The Archangel Dragon-Fixer, 🪿 The Goose Girl, 🌑 The Shadow Without a Man, 💃 Twelve Dancing Princess, 📯 The Emperor's Herald, 🃏 The King's Fool

### 8. 🦴 The Bone Orchard

*Villain:* Baba Yaga, Mother of the Walking Hut  
*Tagline:* A garden of skulls where the fence is made of fingers and the gate asks riddles.  
*Starring:* 🚪 The Iron-Toothed Gatekeeper, 💀 Vasilisa Firelight, 🔥 Ivan Tsarevich, 🪆 Vasilisa's Doll, 🦚 The Firebird, 🌳 The Bone-Orchard Gardener, 📢 The Town Crier, 🐺 The Grey Wolf Mage

### 9. 🕌 The Thousand Nights

*Villain:* The Vizier of Smoke  
*Tagline:* A palace where stories are currency and the last tale decides who lives.  
*Starring:* 🛡️ The Sultan's Guard-Captain, 🔱 Morgiana the Spear-Maiden, 🏺 Ali Baba, Thief-Boss, 📖 Scheherazade, Teller of Tales, 🧞 The Lamp Genie (Contractor), 🗼 Rapunzel the Climber, 🎶 The Flute-Charmer, 🧰 The Flying Carpet Mechanic

### 10. 📖 The Last Page

*Villain:* The Author Who Stopped Writing  
*Tagline:* Where every tale ends, and what's left when the ink runs out.  
*Starring:* 📚 The Bookend Golem, 🪶 The Quill-Dart Marksman, ♥️ The Queen of Hearts' Executioner, 🫖 The Mad Tea Host, 📜 The Ghost of Stories Past, 😼 The Cheshire Spy, 🧝 Elf Foreman Fennel, 📦 The Mimic Chest of Wonders


---

## 🦸 The 150 heroes

### 🛡️ Vanguard seat (19 heroes)

Front-line tanks that soak the damage.

| # | Hero | Class | Special | Tags |
|---|------|-------|---------|------|
| 1 | 🏹 The Huntsman | Huntsman | Hunter's Oath | ⚔️ Melee, 🛡️ Tank, ✨ Blessed |
| 2 | 🤴 Prince Charming (Disgraced) | Disgraced Prince | Kiss of Courtesy | ⚔️ Melee, 🛡️ Tank, ✨ Blessed |
| 3 | 👵 Jack's Mother, Shieldwife | Shieldwife | Hearth Fury | ⚔️ Melee, 🛡️ Tank, ✨ Blessed |
| 4 | 🦞 Sir Barnacle of the Tide | Tide Knight | Crushing Claws | ⚔️ Melee, 🛡️ Tank, 💪 Physical |
| 5 | 🧊 Captain of the Ice Guard | Ice Captain | Frostbite Salute | ⚔️ Melee, 🛡️ Tank, ⚡ Storm |
| 6 | 💂 The Steadfast Tin Soldier | Tin Soldier | One-Legged Resolve | ⚔️ Melee, 🛡️ Tank, ⚙️ Clockwork |
| 7 | 🐲 Saint George (Retired) | Dragon Knight | Lance of Mild Regret | ⚔️ Melee, 🛡️ Tank, 🔥 Fire, 🐾 Beast |
| 8 | 🚪 The Iron-Toothed Gatekeeper | Gatekeeper | You Shall Not Enter | ⚔️ Melee, 🛡️ Tank, 💪 Physical |
| 9 | 🛡️ The Sultan's Guard-Captain | Guard-Captain | Lamp-Lit Duty | ⚔️ Melee, 🛡️ Tank, ✨ Blessed |
| 10 | 📚 The Bookend Golem | Bookend Golem | Heavy Footnote | ⚔️ Melee, 🛡️ Tank, 🌿 Nature |
| 11 | 🐷 The Third Little Pig | Brickmaker | Brick Wall of Spite | ⚔️ Melee, 🛡️ Tank, 💪 Physical |
| 12 | 🍪 The Gingerbread Titan | Gingerbread Titan | Sugar Slam | ⚔️ Melee, 🛡️ Tank, 💪 Physical |
| 13 | 🧌 The Troll Under the Bridge | Bridge Troll | Toll of Three Goats | ⚔️ Melee, 🛡️ Tank, 💪 Physical |
| 14 | 🦇 The Cathedral Gargoyle | Gargoyle | Gutter Slam | ⚔️ Melee, 🛡️ Tank, 🌑 Shadow |
| 15 | 🐢 The Tortoise Who Won | Tortoise Knight | Slow and Steady | ⚔️ Melee, 🛡️ Tank, 🌿 Nature |
| 16 | 🔔 The Town Watchman | Watchman | Curfew Bell | ⚔️ Melee, 🛡️ Tank, 💪 Physical |
| 17 | ⛓️ Iron Henry | Iron-Banded Servant | Breaking Bands | ⚔️ Melee, 🛡️ Tank, ⚙️ Clockwork |
| 18 | 🛡️ The Maiden of the Glass Hill | Glass Maiden | Slippery Shield | ⚔️ Melee, 🛡️ Tank, ✨ Blessed |
| 19 | 🌾 Straw Jack | Scarecrow | Haystack Hug | ⚔️ Melee, 🛡️ Tank, 🌿 Nature |

### 🏹 Marksman seat (19 heroes)

Ranged physical damage from the middle rows.

| # | Hero | Class | Special | Tags |
|---|------|-------|---------|------|
| 1 | 🧣 Red Riding Hood | Hood | Basket of Arrows | 🏹 Ranged, 💪 Physical |
| 2 | 🏹 Cinderella Glassbow | Glass Archer | Midnight Shot | 🏹 Ranged, 💪 Physical, 🌿 Nature |
| 3 | 🌱 Jack Beanstalk | Giant-Slayer | Slingshot of the Beanstalk | 🏹 Ranged, 💪 Physical, ⚙️ Clockwork |
| 4 | 🧜‍♀️ Mermaid Harpooner | Harpooner | Trident Toss | 🏹 Ranged, 💪 Physical |
| 5 | 🔥 The Little Match Girl | Match Girl | Last Match Strike | 🏹 Ranged, 💪 Physical |
| 6 | 🧸 Pinocchio, Honest Slinger | Slinger | Nose Dart | 🏹 Ranged, 💪 Physical, 🌿 Nature |
| 7 | 🦢 Eliza of the Wild Swans | Swan Sister | Nettle-Wing Volley | 🏹 Ranged, 💪 Physical, 🐾 Beast |
| 8 | 💀 Vasilisa Firelight | Skull-Lantern Bearer | Skull-Lantern Blast | 🏹 Ranged, 🔥 Fire, ⚙️ Clockwork |
| 9 | 🔱 Morgiana the Spear-Maiden | Spear-Maiden | Forty-Thieves Special | 🏹 Ranged, 💪 Physical, ⚡ Storm |
| 10 | 🪶 The Quill-Dart Marksman | Quill Marksman | Ink-Poison Dart | 🏹 Ranged, 🌿 Nature, 💪 Physical |
| 11 | 🧵 The Brave Little Tailor | Tailor Marksman | Seven at One Blow | 🏹 Ranged, 💪 Physical, ⚙️ Clockwork |
| 12 | 🐋 Sinbad's Last Harpooner | Whale-Hunter | Roc Egg Snare | 🏹 Ranged, 💪 Physical, ⚡ Storm |
| 13 | 🪤 The Huntsman's Apprentice | Trap-Setter | Bear Trap Gambit | 🏹 Ranged, 🌿 Nature, 💪 Physical |
| 14 | 🐦‍⬛ The Raven Rider | Raven Rider | Message From Above | 🏹 Ranged, ⚙️ Clockwork |
| 15 | 👗 The Wicked Stepsister | Stepsister Archer | Slipper Size Snipe | 🏹 Ranged, 💪 Physical, 🃏 Trickster |
| 16 | 🪡 Issun-Boshi, the Inch-Tall | Inch-Tall Samurai | Needle Barrage | 🏹 Ranged, 💪 Physical, 🌑 Shadow |
| 17 | 🎖️ The Toy Fortress Cannoneer | Toy Cannoneer | Boom-Box Barrage | 🏹 Ranged, 🔥 Fire, ⚙️ Clockwork |
| 18 | 🍎 William Tell, Apple-Splitter | Apple Archer | Splitting Shot | 🏹 Ranged, 💪 Physical |
| 19 | 🌬️ North Wind's Daughter | Wind Archer | Gale Arrow | 🏹 Ranged, ⚡ Storm, 🌿 Nature |

### 🪓 Bruiser seat (19 heroes)

Hard-hitting melee fighters up front.

| # | Hero | Class | Special | Tags |
|---|------|-------|---------|------|
| 1 | 🐺 The Big Bad Wolf (Recovering) | Reformed Wolf | Huff and Puff | ⚔️ Melee, 💪 Physical |
| 2 | ⛏️ Grumpy, Seventh Dwarf | Grumpy Dwarf | Mine-Shaft Rage | ⚔️ Melee, 💪 Physical, 🔥 Fire |
| 3 | 🧔 The Giant Who Said Sorry | Penitent Giant | Apology of Boulders | ⚔️ Melee, 💪 Physical, ✨ Blessed |
| 4 | 🎣 The Fisherman Who Wished | Wish-Hunter | Third Wish Cut | ⚔️ Melee, 💪 Physical |
| 5 | 🌹 Gerda the Brave | Brave Sister | Rose-Thorn Rescue | ⚔️ Melee, ✨ Blessed, ⚡ Storm |
| 6 | 🥜 The Nutcracker Prince | Nutcracker | Walnut Crush | ⚔️ Melee, 💪 Physical, ✨ Blessed |
| 7 | 😇 The Archangel Dragon-Fixer | Dragon-Fixer | Heavenly Hammer | ⚔️ Melee, ✨ Blessed |
| 8 | 🔥 Ivan Tsarevich | Prince of the Firebird | Firebird Feather Strike | ⚔️ Melee, 💪 Physical |
| 9 | 🏺 Ali Baba, Thief-Boss | Thief Captain | Open Sesame Strike | ⚔️ Melee, 💪 Physical |
| 10 | ♥️ The Queen of Hearts' Executioner | Heart Executioner | Off With Their Heads | ⚔️ Melee, 💪 Physical |
| 11 | 🐻 Bold Bearskin | Bearskin Soldier | Seven-Year Slam | ⚔️ Melee, 💪 Physical |
| 12 | 🪓 The Woodcutter | Woodcutter | Timber Wolf | ⚔️ Melee, 💪 Physical, 🌿 Nature |
| 13 | 🐸 Prince Bullfrog | Frog Prince | Slimy Uppercut | ⚔️ Melee, 💪 Physical |
| 14 | ⛰️ Mountain Troll Magnus | Mountain Troll | Boulder Elbow | ⚔️ Melee, 💪 Physical |
| 15 | 🌕 Wolfsbane Loup-Garou | Loup-Garou | Moon-Howl Maul | ⚔️ Melee, 🌑 Shadow, 🐾 Beast |
| 16 | 🧌 Ogress Ottoline | Ogress | Swamp Smash | ⚔️ Melee, 💪 Physical, 🌿 Nature |
| 17 | 🍑 Momotaro the Peach Boy | Peach Boy | Dumpling Cut | ⚔️ Melee, 💪 Physical |
| 18 | 🌉 The Troll Toll-Keeper | Toll Troll | Pay Up | ⚔️ Melee, 💪 Physical, 🃏 Trickster |
| 19 | 🛡️ Beowulf, Mostly Heroic | Monster-Slayer | Grendel's Handshake | ⚔️ Melee, 💪 Physical |

### 💖 Support seat (19 heroes)

Healers, root-ers and tea-pourers.

| # | Hero | Class | Special | Tags |
|---|------|-------|---------|------|
| 1 | 👵 Granny Goodnight | Granny | Warm Blanket | 🏹 Ranged, 💖 Support, ✨ Blessed |
| 2 | 🍎 Snow White, Poison-Proof | Poison-Proof Princess | Apple of Mercy | 🏹 Ranged, 💖 Support, ✨ Blessed |
| 3 | 🎼 The Sun Harp (Enchanted) | Sun Harp | Golden Chord | 🏹 Ranged, 💖 Support, ✨ Blessed, 🔥 Fire |
| 4 | 🌿 Kelp-Witch Kerrigan | Kelp-Witch | Tidal Garden | 🏹 Ranged, 💖 Support, 🌿 Nature |
| 5 | 🦌 The Reindeer Shaman | Reindeer Shaman | Antler Blessing | 🏹 Ranged, 💖 Support, 🌿 Nature |
| 6 | 🎎 The Doll Doctor | Doll Doctor | Porcelain Cure | 🏹 Ranged, 💖 Support, 🌑 Shadow, 🌿 Nature |
| 7 | 🪿 The Goose Girl | Goose Girl | Flock of Fury | 🏹 Ranged, 💖 Support, 🐾 Beast |
| 8 | 🪆 Vasilisa's Doll | Living Doll | Pocket Kindness | 🏹 Ranged, 💖 Support |
| 9 | 📖 Scheherazade, Teller of Tales | Storyteller | Another Night | 🏹 Ranged, 💖 Support, ✨ Blessed |
| 10 | 🫖 The Mad Tea Host | Tea Host | Unbirthday Tonic | 🏹 Ranged, 💖 Support, 🌿 Nature |
| 11 | 🍺 Brother Tuck | Merry Friar | Cheerful Absolution | 🏹 Ranged, 💖 Support, ✨ Blessed |
| 12 | 🦉 The Wise Owl | Wise Owl | Hoot of Wisdom | 🏹 Ranged, 💖 Support |
| 13 | ☁️ Frau Holle | Pillow-Fluffer | Snowfall Fluff | 🏹 Ranged, 💖 Support |
| 14 | 🦊 Doctor Fox | Fox Physician | Sly Remedy | 🏹 Ranged, 💖 Support, ⚙️ Clockwork |
| 15 | 🐭 The Tea-Pouring Dormouse | Dormouse | Sleepy Splash | 🏹 Ranged, 💖 Support |
| 16 | 🧙‍♀️ The Hag of the Bog | Bog Hag | Hex of Tummyaches | 🏹 Ranged, 💖 Support, 🌿 Nature, 🌑 Shadow |
| 17 | ⚓ The Ferryman of Sorrows | Ferryman | River Crossing | 🏹 Ranged, 💖 Support, ⚡ Storm |
| 18 | ⚗️ The Apothecary of Poison | Apothecary | Cure or Curse | 🏹 Ranged, 💖 Support, ⚙️ Clockwork |
| 19 | 🪿 Mother Goose | Rhyme-Mother | Nursery Rhyme Nurse | 🏹 Ranged, 💖 Support |

### 🔮 Arcanist seat (19 heroes)

Spellcasters: big damage, tiny HP.

| # | Hero | Class | Special | Tags |
|---|------|-------|---------|------|
| 1 | 🔥 Gretel Ember | Oven-Witch | Oven Door Slam | 🏹 Ranged, 🔮 Arcane |
| 2 | 🧚 The Fairy Godmother (Overworked) | Overworked Godmother | Bibbidi-Bobbidi-Boom | 🏹 Ranged, 🔥 Fire |
| 3 | ❄️ Winter's Weather-Witch | Weather-Witch | Cold Front | 🏹 Ranged, ❄️ Ice |
| 4 | ⛈️ Thunder Tom | Storm Caller | Static Shock | 🏹 Ranged, ⚡ Storm |
| 5 | 🪞 The Frost-Splinter Sorcerer | Splinter Sorcerer | Mirror Shard | 🏹 Ranged, 🔮 Arcane |
| 6 | 🎩 The Mechanical Magician | Clockwork Magician | Pulled-Rabbit Strike | 🏹 Ranged, 🔥 Fire, 🔮 Arcane |
| 7 | 🌑 The Shadow Without a Man | Shadow-Mage | Silhouette Strike | 🏹 Ranged, 🔮 Arcane, 🌑 Shadow |
| 8 | 🦚 The Firebird | Firebird | Feather Flare | 🏹 Ranged, 🔥 Fire, ❄️ Ice, ⚡ Storm |
| 9 | 🧞 The Lamp Genie (Contractor) | Lamp Genie | Three Wishes Clause | 🏹 Ranged, 🌑 Shadow, 🔥 Fire |
| 10 | 📜 The Ghost of Stories Past | Story-Ghost | Forgotten Verse | 🏹 Ranged, 🌑 Shadow, 💀 Restless |
| 11 | 🧙‍♂️ Merlin the Mostly Competent | Court Wizard | Mediocre Missile | 🏹 Ranged, 🔮 Arcane |
| 12 | 🌧️ Rain-Caller Rupert | Rain-Caller | Thunder Hat | 🏹 Ranged, ⚡ Storm, ⚙️ Clockwork |
| 13 | 🧊 Jack Frost | Jack Frost | Frost Nip | 🏹 Ranged, ❄️ Ice |
| 14 | 🧚‍♂️ Puck the Trickster | Trickster | Midsummer Mischief | 🏹 Ranged, 🔮 Arcane, 🃏 Trickster |
| 15 | 🌙 Morgan le Fay | Enchantress | Mirror Image Overload | 🏹 Ranged, 🔮 Arcane, 🃏 Trickster |
| 16 | 🔨 Brokk the Runesmith | Dwarf Smith | Etched Detonation | 🏹 Ranged, 🔮 Arcane, ⚙️ Clockwork |
| 17 | 🌠 The Sandman's Stargazer | Star-Child | Dream Meteor | 🏹 Ranged, 🔮 Arcane |
| 18 | 🌋 The Firewitch of Mount Ember | Firewitch | Eruption Notice | 🏹 Ranged, 🔥 Fire |
| 19 | 🧹 The Wicked Stepmother | Wicked Stepmother | Petty Curse | 🏹 Ranged, 🌑 Shadow, 🔮 Arcane |

### 🗡️ Skirmisher seat (19 heroes)

Fast melee flankers and assassins.

| # | Hero | Class | Special | Tags |
|---|------|-------|---------|------|
| 1 | 🍞 Hansel Crumb | Breadcrumb Thief | Crumb Trail Ambush | ⚔️ Melee, 💪 Physical, 🌑 Shadow |
| 2 | 🐱 Puss in Boots | Boot Duelist | Boot-Strapped Lunge | ⚔️ Melee, 💪 Physical |
| 3 | 👍 Tom Thumb | Thumb-Sized Assassin | Needle Poke | ⚔️ Melee, 🌑 Shadow |
| 4 | 🦪 The Pearl Thief | Pearl Thief | Oyster Pocket | ⚔️ Melee, 💪 Physical, 🌑 Shadow |
| 5 | 🧊 Kai the Splinter-Hearted | Splinter-Hearted | Icy Lunge | ⚔️ Melee, 💪 Physical, ⚡ Storm |
| 6 | 👠 The Red Shoes Hunter | Shoe Hunter | Dance-Till-Death | ⚔️ Melee, 💪 Physical, ⚙️ Clockwork |
| 7 | 💃 Twelve Dancing Princess | Midnight Dancer | Worn-Out Slippers | ⚔️ Melee, 🌑 Shadow, 🔮 Arcane |
| 8 | 🌳 The Bone-Orchard Gardener | Bone Gardener | Skull Pruner | ⚔️ Melee, 🌑 Shadow, 💀 Restless |
| 9 | 🗼 Rapunzel the Climber | Tower Climber | Braid Whip | ⚔️ Melee, 💪 Physical |
| 10 | 😼 The Cheshire Spy | Cheshire Spy | Grin of Secrets | ⚔️ Melee, 🌑 Shadow, ⚙️ Clockwork |
| 11 | 🧥 Will Scarlet | Sherwood Rogue | Forest Ambush | ⚔️ Melee, 🌑 Shadow, 💪 Physical |
| 12 | 🏴‍☠️ Pirate Queen Grace | Pirate Queen | Cutlass Compliments | ⚔️ Melee, 💪 Physical, ⚡ Storm |
| 13 | 🏃‍♀️ Rapunzel's Cousin | Rooftop Runner | Rooftop Rampage | ⚔️ Melee, 💪 Physical |
| 14 | 🐈‍⬛ The Nine-Tailed Cat Thief | Cat Thief | Nine Lives Larceny | ⚔️ Melee, 🌑 Shadow, 💰 Hoard |
| 15 | 🏹 Robin Hood, Outlaw of Sherwood | Outlaw | Stick-Up Strike | ⚔️ Melee, 💪 Physical, 💰 Hoard |
| 16 | 🦢 Elise's Silent Brother | Swan Brother | Wing Beat | ⚔️ Melee, 🌑 Shadow |
| 17 | 🧔 Bluebeard, Bachelor Auditor | Bluebeard | Forbidden Room Strike | ⚔️ Melee, 🌑 Shadow, 💪 Physical |
| 18 | 🐸 The Frog Princess Fencer | Fencing Frog | Lunge and Ribbit | ⚔️ Melee, 💪 Physical |
| 19 | 👺 Tom Tit Tot | Imp Stuntman | Name-Guessing Strike | ⚔️ Melee, 💪 Physical, 🃏 Trickster |

### 📣 Commander seat (18 heroes)

Buffers and battlefield managers.

| # | Hero | Class | Special | Tags |
|---|------|-------|---------|------|
| 1 | 🪈 The Piper of Hamelin | Piper | Pied Tune | 🏹 Ranged, 💖 Support |
| 2 | 😴 Briar Rose, Hundred-Year Napper | Sleeper | Spindle Prick | 🏹 Ranged, 💖 Support, 🔮 Arcane |
| 3 | 🫘 The Magic Beanseller | Bean Merchant | Magic Bean Deal | 🏹 Ranged, 💖 Support |
| 4 | 🕯️ The Lighthouse Keeper | Lighthouse Keeper | Beacon Flash | 🏹 Ranged, ⚙️ Clockwork |
| 5 | 🪖 The Nutcracker Sergeant | Toy Sergeant | Toy Soldier Drill | 🏹 Ranged, 💖 Support, 💪 Physical |
| 6 | 🩰 The Music-Box Ballerina | Ballerina | Pirouette Spin | 🏹 Ranged, 💖 Support |
| 7 | 📯 The Emperor's Herald | Herald | New Clothes Fanfare | 🏹 Ranged, 💖 Support, ✨ Blessed |
| 8 | 📢 The Town Crier | Town Crier | Hear Ye | 🏹 Ranged, 💖 Support |
| 9 | 🎶 The Flute-Charmer | Flute-Charmer | Snake Dance | 🏹 Ranged, 💖 Support, ⚡ Storm |
| 10 | 🧝 Elf Foreman Fennel | Elf Foreman | Shoemaker's Shift | 🏹 Ranged, 💖 Support, ⚙️ Clockwork |
| 11 | 👸 Queen Mab, General of Faeries | Fairy General | Dream Directive | 🏹 Ranged, 💖 Support, 💪 Physical |
| 12 | 🐭 Coachman Mouse | Pumpkin Coachman | Midnight Carriage | 🏹 Ranged, 💖 Support, 💪 Physical |
| 13 | 🐜 The Provident Ant | Provision Ant | Winter Stockpile | 🏹 Ranged, 💖 Support, 💰 Hoard |
| 14 | 🎺 The Pied Piper's Page | Piper's Page | Brass Fanfare | 🏹 Ranged, 💖 Support |
| 15 | 🪨 Gretel's Pebble Guide | Pebble Guide | Pebble Trail | 🏹 Ranged, 💖 Support, ⚡ Storm |
| 16 | 🦊 Reynard the Fox | Strategist Fox | Sly Gambit | 🏹 Ranged, 💖 Support, 🔮 Arcane |
| 17 | 🔨 The Troll Auctioneer | Troll Auctioneer | Going Going Gone | 🏹 Ranged, 💖 Support, 💰 Hoard |
| 18 | 🧝‍♀️ The Elves' Union Rep | Union Elf | Strike! (Literally) | 🏹 Ranged, 💖 Support |

### 🎲 Wildcard seat (18 heroes)

Gamblers, gadgets and general chaos.

| # | Hero | Class | Special | Tags |
|---|------|-------|---------|------|
| 1 | 🧌 Rumpelstiltskin | Name-Dealer | Spin Gold from Straw | 🏹 Ranged, 🌿 Nature, 🔮 Arcane |
| 2 | 🍎 The Apple Peddler | Apple Peddler | Rotten Wager | 🏹 Ranged, 🃏 Trickster |
| 3 | 🧵 The Unpaid Fate | Apprentice Fate | Thread Snip | 🏹 Ranged, 🔮 Arcane, 🃏 Trickster |
| 4 | 🐙 The Mermaid's Debt Collector | Debt Collector | Voice Repo | 🏹 Ranged, 💰 Hoard |
| 5 | 📒 Winter's Bookkeeper | Winter Bookkeeper | Frostbitten Ledger | 🏹 Ranged, 💰 Hoard |
| 6 | 🎭 Punch the Marionette | Marionette | Slapstick Smash | 🏹 Ranged, 🃏 Trickster |
| 7 | 🃏 The King's Fool | Court Fool | Biting Wit | 🏹 Ranged, 🃏 Trickster |
| 8 | 🐺 The Grey Wolf Mage | Wolf Mage | Wolf's Trick | 🏹 Ranged, 🔮 Arcane, 🃏 Trickster |
| 9 | 🧰 The Flying Carpet Mechanic | Carpet Mechanic | Prototype Oopsie | 🏹 Ranged, ⚙️ Clockwork, 🃏 Trickster |
| 10 | 📦 The Mimic Chest of Wonders | Chest Tamer | Open Wide | 🏹 Ranged, 🃏 Trickster, 🐾 Beast |
| 11 | 🧹 The Chimney Sweep | Chimney Sweep | Soot Swing | 🏹 Ranged, 🃏 Trickster, ⚙️ Clockwork |
| 12 | 🐈 Cat-Mother Carol | Cat-Mother | Nine-Lives Gambit | 🏹 Ranged, 🃏 Trickster, 🐾 Beast |
| 13 | 🍺 Rip Van Winkle | Long Sleeper | Paradox Poke | 🏹 Ranged, 🔮 Arcane, 🃏 Trickster |
| 14 | 🏪 The Devil's Pawnbroker | Pawnbroker | Soul Appraisal | 🏹 Ranged, 💰 Hoard, 🃏 Trickster |
| 15 | 🍲 The Magic Porridge Pot | Porridge Pot | Porridge Flood | 🏹 Ranged, ⚙️ Clockwork, 🃏 Trickster |
| 16 | ⛲ The Wishing-Well Magician | Well Magician | Coin Flip | 🏹 Ranged, 🔮 Arcane, 🃏 Trickster |
| 17 | 🐦‍⬛ The Raven Whisperer | Raven Whisperer | Murder of Crows | 🏹 Ranged, 🃏 Trickster, 🐾 Beast |
| 18 | 🍪 The Great Gingerbread Man | Gingerbread Man | Run Run Run | 🏹 Ranged, 🃏 Trickster |


Every hero also has a backstory (shown on their page), a milestone chain with a named effect every 10 levels, and a pool of 340+ lines they say in bubbles: general chatter plus reactions to crits, low HP, kills, bosses, loot, level-ups, stage clears, fallen allies, weather, healing and recruiting. Lines can name a random teammate or the monster on screen, and a shuffle bag guarantees no line repeats until the whole pool has been used.

---

## 🐾 Familiars
- 🐦‍⬛ **Raven Messenger** (Common)
- 🐀 **Piper's Rat** (Common)
- 👠 **Glass Slipper Sprite** (Common)
- 🐱 **Puss-in-Boots Kitten** (Common)
- 🍏 **Poison-Apple Slime** (Uncommon)
- 🦝 **Robin's Bandit Raccoon** (Uncommon)
- 🧝 **Elf Apprentice** (Uncommon)
- 🐹 **Dormouse in a Tiny Helmet** (Uncommon)
- 🐲 **Hoard-Hatched Dragonling** (Rare)
- 🦜 **Tale-Teller Parrot** (Rare)
- 🐍 **Lullaby Hydra** (Rare)
- 🦚 **Firebird Chick** (Epic)
- 👻 **Ghost of Grandmother's Cat** (Epic)
- 🐕 **The Royal Hound** (Legendary)
- 🐌 **Overqualified Snail** (Common)
- 🐸 **Frog With Opinions** (Common)
- 🐝 **Workaholic Bee** (Common)
- 🦆 **Rubber Duck Consultant** (Uncommon)
- 🐢 **Retirement-Age Turtle** (Uncommon)
- 🦉 **Night Shift Owl** (Uncommon)
- 🦊 **Freelance Fox** (Uncommon)
- 🐙 **Multitasking Octopus** (Rare)
- 🦄 **Unionized Unicorn** (Rare)
- 🐺 **Middle-Manager Wolf** (Rare)
- 🦣 **Cubicle Yeti** (Rare)
- 🦅 **Gryphon Intern** (Epic)
- 📦 **Pet Mimic (Don't Feed)** (Epic)
- 👼 **Guardian Angel (Contract)** (Epic)
- 🦑 **Emotional Support Kraken** (Legendary)
- 👾 **Baby Eldritch Horror** (Legendary)

## ✨ Spells (skill bar)
- 🗡️ **Huntsman's Cut** (unlocks stage 1)
- 📣 **Rallying Fairy Song** (unlocks stage 6)
- 🪿 **Goose-Gold Gift** (unlocks stage 13)
- 🌠 **Falling Star of Questionable Origin** (unlocks stage 26)
- 🪄 **Fairy Godmother's Wand** (unlocks stage 41)

## 🎒 Charms & Boons
- 👆 **Tap Training**
- 🧚 **Squire Sprite**
- 🎯 **Lucky Swings**
- 💥 **Wicked Multiplier**
- 🪿 **Goose's Gold**
- ❤️ **Hearth & Home**
- 🧥 **Padded Cloaks**
- ☂️ **Enchanted Umbrella**
- 🐰 **Rabbit's Foot (Ethical)**
- ☕ **Coffee Machine**
- 🏷️ **Bulk Discount Card**
- 🛋️ **Break Room Couch**
- 🗑️ **Dumpster Diving Permit**
- ✊ **Union Busting Seminar**
- 🎁 **Stage Clear Bonus**
- 🥤 **Energy Drinks**

## 🌟 Wish Shop (permanent perks)
- 🪿 **Golden Goose Pay**
- 🍖 **Giant's Lunch**
- 🔭 **Talent Scouts**
- 👑 **Royal Favor**
- 🍀 **Four-Leaf Contract**
- 😴 **Long Sleep**
- 🌦️ **Weather Charms**
- 🌱 **Magic Beanstalk**
- 💍 **Dowry**
- 🎒 **Gear Hoarder**
- 🗣️ **Boss Whisperer**
- ⏱️ **Efficient Spells**
- 🦺 **Hazard Pay Gear**
- 🧑‍🔧 **Intern Army**

---

## 🗺️ Realms and monsters

The world is a long descent: the Cellar of Cauldrons, Sewers of the Piper's Rats, the Goblin Marketplace, the Crypt of Overdue Tales, the Mushroom Spa & Poison Bath, the Forge of the Fire Queen, the Pantry of Winter, the Cloud Castle, the Haunted Crossroads, the Hall of Whispering Mirrors, the Tower of Talking Doors, the Dragon's Hoard & Counting-House and the Dimension of Unfinished Business, followed by procedurally themed realms (caves, forests, deserts, ice, volcano, swamp, ocean, sky, city, space, candy, haunted, factory, crystal, jungle, mountain, hell, dream, court, farm, beach) with fairytale monsters, bosses and weather.

---

## 💾 Saving and settings

- Saves automatically to the browser's local storage (key `descentinc_save_v4`). Clearing site data deletes the save.
- Settings: music, sound effects, screen shake, damage numbers, vibration, auto-equip, auto-sell, plus Statistics, Achievements, Credits, How to Play and a hard reset.

## 🛠️ Tech notes

- Single HTML file, vanilla JavaScript + Canvas, no dependencies.
- `src/` contains data files (`data*.js`), the speech engine (`quips.js`), `core.js` (state, economy, prestige), `battle.js` (combat engine), `ui.js`, `style.css`, `template.html` and `build.js`.
- A jsdom smoke test (`src/test.js`) is included for contributors.

## Credits

Created by **Tim**. Built with Claude. No heroes were harmed. Several fainted dramatically.
