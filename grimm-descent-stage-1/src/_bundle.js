'use strict';
/* ============ DESCENT INC. v2 — GAME DATA ============ */
const VERSION="2.0";

/* Areas ("realms"): 12 + endless Overtime. 10 stages each, stage 10 = boss. */
const REALMS=[
 {n:"The Basement",bg:["#2d2347","#120c24"],acc:"#19e6ff",decor:["🕸️","🧦","📦","🔦"],el:"none",wx:["clear","fog","smog"],
  intro:"Every legend starts somewhere. Yours starts in a damp basement beneath a suburban home. Please do not touch the water heater. It knows.",
  mid:"MEMO FROM MANAGEMENT: The water heater is not a boss. It is a 'stakeholder'. Please stop hitting the stakeholder.",
  out:"The Water Heater collapses with a sad gurgle. Behind it: a staircase labeled 'DOWN (MANDATORY)'. Management emails: 'Great job! Now do it again, deeper.'",
  mobs:[["Angry Rat","🐀"],["Basement Spider","🕷️"],["Haunted Roomba","🤖"],["Dust Golem","👻"],["Bat With Opinions","🦇"],["Mildew Blob","🦠"]],
  boss:["The Water Heater","🛢️","It Has Been Watching You"]},
 {n:"Sewers of Mild Concern",bg:["#17403a","#07201d"],acc:"#3dffa0",decor:["💧","🧻","🪠","🫧"],el:"nature",wx:["rain","smog","fog"],
  intro:"It smells like a sandwich and a mistake. The locals are friendly, in the way that a shark is friendly. Do NOT lick anything.",
  mid:"MEMO: The sewers are 'not our fault'. Please do not mention the alligators in any legal documents.",
  out:"The Fatberg dissolves into something that smells like regret. A manhole opens upward: 'You're doing great! Please use the other exit: down.'",
  mobs:[["Gator in a Tie","🐊"],["Rat Union Rep","🐀"],["Plumber's Nightmare","🐍"],["Flush Phantom","👻"],["Drain Mosquito","🦟"],["Sewer Mime","🤡"]],
  boss:["The Fatberg","🦠","Ancient. Greasy. Furious."]},
 {n:"Goblin Strip Mall",bg:["#4a2a5e","#1b0e2b"],acc:"#ff2fd0",decor:["🛒","🏷️","🧾","💡"],el:"none",wx:["clear","confetti","rain","wind"],
  intro:"Half the shops are closed. The other half are goblins. A banner reads 'EVERYTHING MUST GO', including you, apparently.",
  mid:"MEMO: Everything in this mall is on sale. Everything. Including your dignity. 40% off.",
  out:"Gerald signs your timesheet with a pen that bites. 'I don't make the rules,' he says, 'I just enforce them. Aggressively. Downstairs.'",
  mobs:[["Goblin Cashier","👺"],["Kiosk Salesman","🕴️"],["Rogue Shopping Cart","🛒"],["Mall Cop Troll","🧌"],["Sample Lady","🥟"],["Food Court Ogre","👹"]],
  boss:["Gerald, Regional Manager","🐲","Can I Speak To Your Manager? He's Me."]},
 {n:"Crypt of Overdue Library Books",bg:["#3c3a2a","#15130a"],acc:"#ffd447",decor:["📚","🕯️","📜","🪶"],el:"arcane",wx:["fog","eclipse","wind"],
  intro:"SHHHHH. The dead have fines. The undead have WAY bigger fines. Whatever you do, do not return anything late.",
  mid:"MEMO: Late fees accrue at 3 souls per day. Please return your sword.",
  out:"The Dewey Decimator is shelved under 'Defeated: Fiction'. A librarian ghost whispers: 'Shhh... you're free to go. Downstairs. Quietly.'",
  mobs:[["Skeleton Librarian","💀"],["Zombie Intern","🧟"],["Shushing Ghost","👻"],["Angry Dictionary","📕"],["Late Fee Vampire","🧛"],["Bookworm (Huge)","🐛"]],
  boss:["The Dewey Decimator","📖","Overdue By 400 Years"]},
 {n:"Fungal Spa & Resort",bg:["#432a4d","#1a0f22"],acc:"#ff8ad8",decor:["🍄","🧖","🧼","🪷"],el:"nature",wx:["fog","rain","heat","smog"],
  intro:"Welcome to the Fungal Spa! Complimentary spores with every visit. Side effects include: becoming a mushroom. Robes are not optional.",
  mid:"MEMO: Please stop yelling in the relaxation chamber. The mushrooms are trying to heal.",
  out:"The Spore Queen puffs into harmless glitter. A robe is left on the floor, embroidered 'WORLD'S OKAYEST HERO.' You take it.",
  mobs:[["Mushroom Masseuse","🍄"],["Hot Tub Toad","🐸"],["Steam Room Specter","🧖"],["Spa Snail","🐌"],["Cucumber Eye Horror","🥒"],["Lotion Elemental","🧴"]],
  boss:["The Spore Queen","🍄","Your Appointment Was Yesterday"]},
 {n:"Magma Corp HQ",bg:["#5b1d12","#220804"],acc:"#ff7a3d",decor:["🔥","📊","☕","🖨️"],el:"fire",wx:["heat","ash","smog","meteor"],
  intro:"Corporate has built an office inside a volcano. The synergy is literally burning. Casual Friday means no armor. Do not come on Casual Friday.",
  mid:"MEMO: Mandatory fun day was moved into the volcano. Lava is 'a perk'. Cubicles are 'ablaze with opportunity'.",
  out:"The Quarterly Review shreds itself. The ceiling lights flicker 'PROFITS UP 4%'. Nobody knows what that means. Everybody is scared.",
  mobs:[["Fire Intern","🔥"],["Slack Salamander","🦎"],["Spreadsheet Elemental","📊"],["Coffee Golem","☕"],["Printer of Wrath","🖨️"],["Middle Manager Imp","😈"]],
  boss:["The Quarterly Review","📈","Numbers Are Down. So Is Your HP."]},
 {n:"Frozen Food Aisle",bg:["#1d3f66","#09182b"],acc:"#8ee8ff",decor:["❄️","🧊","🥶","🛒"],el:"ice",wx:["snow","blizzard","fog"],
  intro:"Aisle 9. Frozen foods. The freezers hum a song you vaguely recognize. Something in the back is thawing. Something that was never alive. Yet.",
  mid:"MEMO: Aisle 9 is closed for cleaning. By 'cleaning' we mean 'hostile ice'. Please enjoy a complimentary mitten.",
  out:"The Pot Pie Colossus cracks open, revealing steaming gravy and a surprisingly good pension plan. The freezers fall silent.",
  mobs:[["Freezer Burn Fiend","🥶"],["Rogue Ice Tray","🧊"],["Penguin Stock Boy","🐧"],["Hostile Snowman","⛄"],["Ice Cream Wraith","🍦"],["Frostbitten Broccoli","🥦"]],
  boss:["The Pot Pie Colossus","🥧","Serves 4. Eats 5."]},
 {n:"Cloud Kingdom Timeshare",bg:["#33508a","#101c3c"],acc:"#fff3a8",decor:["☁️","⛅","🪽","🎫"],el:"storm",wx:["clear","wind","thunder","confetti"],
  intro:"Free brunch! Just sit through a 90 minute presentation. The cherubs are very pushy. Their handshakes are suspiciously firm. Do not sign anything.",
  mid:"MEMO: You have been selected to attend a 90-minute presentation. Attendance is not optional. Neither is the brunch.",
  out:"Zeus signs a contract with lightning. You do not read it. Nobody ever reads it. The clouds part for a very long staircase.",
  mobs:[["Pushy Cloud Salesman","☁️"],["Cherub in a Vest","😇"],["Seagull Gatekeeper","🐦"],["Harpy Concierge","🦅"],["Lightning Intern","⚡"],["Free Brunch Mimic","🥐"]],
  boss:["Zeus, Timeshare Closer","🌩️","Today Only: Eternal Damnation 20% Off"]},
 {n:"Haunted Airport",bg:["#2b2f4d","#0d0f22"],acc:"#c9a8ff",decor:["✈️","🧳","🛄","🪪"],el:"arcane",wx:["rain","thunder","fog","wind"],
  intro:"Your flight has been delayed. Forever. The gate agent is a ghost. The luggage carousel is a portal. The overpriced water bottle is a demon.",
  mid:"MEMO: Your flight is delayed by 4 centuries. Please visit Duty Free for a refreshing curse.",
  out:"The Terminal Overlord announces: 'FINAL BOARDING CALL.' Then it dissolves into confetti and unpaid parking tickets.",
  mobs:[["Possessed Luggage","🧳"],["Lost-Baggage Poltergeist","👻"],["Delayed Phoenix","🦅"],["TSA Gargoyle","🗿"],["Overpriced Water","🥤"],["Pilot Zombie","🧟"]],
  boss:["The Terminal Overlord","🛬","Final Boarding Call"]},
 {n:"Data Center of Doom",bg:["#0f3b3f","#041416"],acc:"#19ffd6",decor:["💾","🖥️","📡","🔌"],el:"storm",wx:["heat","smog","eclipse","thunder"],
  intro:"The servers have woken up. They have opinions. Mostly about you. The admin password is still 'password'. They changed it to 'password1'.",
  mid:"MEMO: Have you tried turning it off and on? Please do not try this on the Mainframe. Or yourself.",
  out:"The Mainframe shuts down with a long, disappointed beep. A prompt flashes: 'ARE YOU SURE YOU WANT TO ESCAPE? Y/N'. You choose 'N'. For safety.",
  mobs:[["Rogue Chatbot","🤖"],["Spam Swarm","📧"],["Glitch Gremlin","👾"],["Floppy Disk Revenant","💾"],["Extension Cord Serpent","🔌"],["Blue Screen Beast","🖥️"]],
  boss:["The Mainframe","🖥️","Have You Tried Turning Yourself Off?"]},
 {n:"Customer Service Hell",bg:["#5a2038","#220811"],acc:"#ff4d6d",decor:["📞","⭐","🧾","🪑"],el:"fire",wx:["confetti","eclipse","smog","rain"],
  intro:"Your call is important to us. Please hold. Please continue to hold. The hold music is the screams of the damned. It's a banger.",
  mid:"MEMO: Your call has been on hold for 700 years. Estimated wait time: 'soon'. Thank you for your continued suffering.",
  out:"The Customer (Always Right) demands a manager. You point at the ceiling. The ceiling points back at you. A coupon floats down: '10% off next apocalypse.'",
  mobs:[["Hold Music Banshee","📞"],["Receipt Gremlin","🧾"],["Reply-All Horror","📧"],["Mimic Office Chair","🪑"],["Manager Summoner","🧑‍💼"],["Entitled Customer","😡"]],
  boss:["The Customer (Always Right)","👑","I Want A Refund For This Dungeon"]},
 {n:"The Dragon's Vault & Associates",bg:["#5a4410","#201602"],acc:"#ffd447",decor:["💰","⚖️","📜","🏦"],el:"fire",wx:["heat","ash","meteor","eclipse"],
  intro:"The final vault. Gold stacked to the ceiling, lawyers in the shadows. The CEO is a dragon. The dragon is also the legal department.",
  mid:"MEMO: The CEO is 'not available at this time, or any time'. The legal department is, however, available to sue you.",
  out:"Draconis Maximus roars his last earnings call and burns the Employee Handbook. 'You're all fired!' he wheezes. 'Wait. I'm fired? Who's the CEO now?' Nobody wants the job. The floor cracks open: the dungeon keeps going.",
  mobs:[["Dragonling Intern","🐉"],["Gold Mimic","💰"],["Legal Department","⚖️"],["Compliance Wyrm","🐲"],["Hostile Takeover","🏦"],["T-Rex Shareholder","🦖"]],
  boss:["Draconis Maximus, CEO","🐉","Synergy Will Be Your Doom"]},
 {n:"Overtime Dimension",bg:["#401060","#10021c"],acc:"#ff2fd0",decor:["⏰","🌀","♾️","☕"],el:"arcane",wx:["clear","heat","rain","thunder","snow","blizzard","fog","wind","sand","ash","confetti","eclipse","meteor","smog"],
  intro:"The dungeon never ends. The clocks run backwards. Everyone is 'just finishing up one thing'. This is the Overtime Dimension. Welcome. You live here now.",
  mid:"MEMO: The dungeon will now operate 25 hours a day. Thank you for your flexibility.",
  out:"The Eternal Stand-Up ends. Another begins immediately. This is forever. Congratulations.",
  mobs:[["Unpaid Overtime Spirit","🌀"],["Eternal Intern","🧟"],["Deadline Demon","⏰"],["Open Floor Plan Horror","🪟"],["Meeting That Could Have Been An Email","📆"],["Mandatory Fun Mascot","🤡"]],
  boss:["The Eternal Stand-Up","🕰️","It's Only Fifteen Minutes (It's Not)"]}
];

/* Enemy kinds. mobs[i] uses MOBKIND[i] */
const MOBKIND=["grunt","grunt","runner","brute","spitter","grunt"];
const KINDS={
 grunt:{hp:1,dmg:1,spd:1,sz:1,iv:1.5,rng:0},
 runner:{hp:.55,dmg:.8,spd:1.8,sz:.85,iv:1.2,rng:0},
 brute:{hp:2.6,dmg:1.7,spd:.65,sz:1.3,iv:2.1,rng:0},
 spitter:{hp:.7,dmg:1,spd:.9,sz:.95,iv:2.2,rng:200},
 boss:{hp:19,dmg:2.2,spd:.4,sz:2.3,iv:1.7,rng:0}
};
const ELEMS={none:{n:"Neutral",i:"⚪"},fire:{n:"Fire",i:"🔥"},ice:{n:"Ice",i:"❄️"},storm:{n:"Storm",i:"⚡"},nature:{n:"Nature",i:"🌿"},arcane:{n:"Arcane",i:"🔮"}};

/* Weather. elem map multiplies hero dmg by hero element AND monster dmg by area element. */
const WXD={
 clear:{n:"Clear Skies",i:"☀️",fx:"none",d:"Suspiciously pleasant. Nothing happens. Enjoy it while it lasts."},
 heat:{n:"Heat Wave",i:"🥵",fx:"heat",d:"Fire +30%, Ice −30% (heroes and monsters). Heroes attack 5% slower; monsters walk 10% slower.",elem:{fire:1.3,ice:.7},hspd:.95,espd:.9},
 rain:{n:"Rain",i:"🌧️",fx:"rain",d:"Fire −25%, Storm +25%, Nature +20% (both sides). Monsters walk 10% slower.",elem:{fire:.75,storm:1.25,nature:1.2},espd:.9},
 thunder:{n:"Thunderstorm",i:"⛈️",fx:"thunder",d:"Storm +40%, Fire −20%. Lightning randomly strikes: mostly monsters. Mostly.",elem:{storm:1.4,fire:.8},strike:{iv:4.5,dm:3,hero:.25,aoe:50}},
 snow:{n:"Snowfall",i:"❄️",fx:"snow",d:"Ice +25%, Fire −20%. Monsters walk 15% slower.",elem:{ice:1.25,fire:.8},espd:.85},
 blizzard:{n:"Blizzard",i:"🌨️",fx:"blizzard",d:"Ice +40%. Heroes attack 15% slower; ranged −15%. Monsters crawl at 70% speed.",elem:{ice:1.4},hspd:.85,ranged:.85,espd:.7},
 fog:{n:"Thick Fog",i:"🌫️",fx:"fog",d:"Ranged heroes −20%. Monsters hit 15% softer, because they can't see either.",ranged:.8,edmg:.85},
 wind:{n:"Gale",i:"💨",fx:"wind",d:"Ranged heroes +15% (tailwind). Monsters march 15% faster (also tailwind).",ranged:1.15,espd:1.15},
 sand:{n:"Sandstorm",i:"🏜️",fx:"sand",d:"All damage −10% both ways. Hero regeneration halved. Monsters 10% slower.",hdmg:.9,edmg:.9,regen:.5,espd:.9},
 ash:{n:"Ashfall",i:"🌋",fx:"ash",d:"Fire +20%. Hero damage −5%. Gold +10%: ash is apparently valuable.",elem:{fire:1.2},hdmg:.95,gold:1.1},
 confetti:{n:"Mandatory Fun Day",i:"🎉",fx:"confetti",d:"Heroes attack 15% slower (distracted). Monsters hit 20% softer. Gold +40%.",hspd:.85,edmg:.8,gold:1.4},
 eclipse:{n:"Corporate Eclipse",i:"🌑",fx:"eclipse",d:"Arcane +30%. Monsters hit 25% harder. Very spooky. Very billable.",elem:{arcane:1.3},edmg:1.25},
 meteor:{n:"Meteor Shower",i:"☄️",fx:"meteor",d:"Meteors rain on the battlefield (monsters mostly). Gold +10%.",gold:1.1,strike:{iv:3.5,dm:5,hero:.2,aoe:75,meteor:1}},
 smog:{n:"Toxic Smog",i:"🏭",fx:"smog",d:"Heroes slowly lose HP. Ranged −10%. Gold +20% (hazard pay).",ranged:.9,hdot:.004,gold:1.2}
};
const WX_QUIPS={heat:["Why is it always hot in the dungeon?","This is NOT in my contract."],rain:["Of course it's raining. Underground.","I'm not paid enough for wet socks."],thunder:["Lightning indoors is a safety violation.","Who approved the storm budget?"],snow:["It's snowing. In an office.","I'm filing a complaint with Winter."],blizzard:["I can't feel my sarcasm.","Who turned the dungeon into a freezer?"],fog:["I can't see my own paycheck in this.","Fog. Great. Love that for us."],wind:["Is the dungeon breathing on me?","My hair, my dignity: both gone."],sand:["Sand. Indoors. Again.","I regret everything."],ash:["It's snowing ash. Cool. Cool cool cool.","Smells like Monday."],confetti:["Mandatory fun? Again?","I hate how much I love confetti."],eclipse:["Ominous lighting, very on brand.","The eclipse is just management's mood."],meteor:["Meteors. Fine. Why not.","If I die, tell HR I was right."],smog:["Hazard pay, please.","Breathing is optional, I guess."],clear:["No weather? What are they hiding?","Blue skies. Suspicious."]};

/* Hero classes: one named hero per class. role 0=front,1=mid,2=back; rng 0=melee */
const CLS={
 knight:{n:"Knight",hero:"Sir Tapsalot",e:"🤺",ic:"🛡️",role:0,rng:0,iv:1.4,dps:1.0,hp:1.5,el:"none",cost:20,u:0,atk:"Sword Poke",
  sp:{id:"bash",n:"Shield Bash",cd:9,pow:3,d:"Smash the nearest monster for ×POW damage and stun it for 2.5s."},
  bio:"The company's only full-time Knight. Hasn't taken a lunch break since the Treaty of Lunch.",
  q:["I'm not saying I'm the best. I'm saying I'm the only one on payroll.","For honor! And dental, ideally.","This sword is company property. So is my soul."]},
 archer:{n:"Archer",hero:"Brenda Quickdraw",e:"🧝",ic:"🏹",role:2,rng:400,iv:.9,dps:1.2,hp:.6,el:"none",cost:25,u:0,atk:"Passive-Aggressive Arrow",
  sp:{id:"volley",n:"Volley of Regret",cd:10,pow:.9,d:"Fire 6 arrows at random monsters, each for ×POW damage."},
  bio:"Never misses. Frequently misses the point.",
  q:["I never miss. I just hit things in a way you didn't plan.","Aiming is just yelling with extra steps.","Stand behind me. Not too close."]},
 barbarian:{n:"Barbarian",hero:"Gronk the Reasonable",e:"🧔",ic:"🪓",role:0,rng:0,iv:1.9,dps:1.5,hp:1.0,el:"none",cost:30,u:3,atk:"Enthusiastic Chop",
  sp:{id:"whirl",n:"Anger Management",cd:11,pow:3,d:"Spin wildly, hitting every monster near the front for ×POW damage."},
  bio:"Rage management was listed as 'optional' on his résumé.",
  q:["I HAVE FEELINGS. THEY ARE VIOLENT.","Calm down? I AM CALM. THIS IS CALM.","SMASH. (That's my whole performance review.)"]},
 healer:{n:"Healer",hero:"Dr. Mildred Patch",e:"🧑‍⚕️",ic:"🩹",role:2,rng:300,iv:2.2,dps:.3,hp:.8,el:"none",cost:30,u:5,atk:"Healing Touch",
  sp:{id:"mend",n:"Group Hug Protocol",cd:12,pow:.3,d:"Heal every hero for ×POW of their max HP."},
  bio:"Heals wounds, not feelings. Feelings are billed separately.",
  q:["You're fine. Walk it off. I'm a doctor-ish.","Stop dying. It makes the paperwork hard.","Take two aspirin and don't call me."]},
 mage:{n:"Mage",hero:"Bartholomew Spark",e:"🧙",ic:"🔮",role:2,rng:340,iv:2.2,dps:1.0,hp:.5,el:"arcane",cost:35,u:8,atk:"Arcane Bolt",
  sp:{id:"meteor",n:"Meteor of Poor Judgment",cd:13,pow:4,d:"Drop a meteor on the leading monsters: ×POW damage in a big area."},
  bio:"Has a PhD in Fireballs and a lingering student loan.",
  q:["It's not magic, it's expensive math.","I studied 8 years for this. Sparkles.","Please don't stand in the explosion. Again."]},
 rogue:{n:"Rogue",hero:"Kevin 'No Receipts' Shade",e:"🥷",ic:"🗡️",role:0,rng:0,iv:.8,dps:1.5,hp:.7,el:"none",cost:35,u:12,atk:"Totally Not Stabbing",
  sp:{id:"backstab",n:"Backstab (Legal)",cd:8,pow:5,d:"Guaranteed crit on the nearest monster for ×POW damage."},
  bio:"Not a thief. Is currently holding your wallet. Passive: +12% gold while deployed.",pass:{gold:.12},
  q:["I didn't take it. It was already mine.","Taxes are just legal pickpocketing.","Why steal when you can 'borrow permanently'?"]},
 paladin:{n:"Paladin",hero:"Chad of the Holy Light",e:"💂",ic:"⛪",role:0,rng:0,iv:2.0,dps:.6,hp:2.4,el:"none",cost:40,u:16,atk:"Smiting (Light)",
  sp:{id:"guard",n:"Holy Excuse",cd:14,pow:.25,d:"Shield every hero for ×POW of their max HP for 6s."},
  bio:"Smites on weekends and some weekdays. Passive: allies take 10% less damage.",pass:{dr:.1},
  q:["The light is strong with this one. Me. I'm the one.","Smiting is a lifestyle.","I only judge people. Loudly."]},
 pyromancer:{n:"Pyromancer",hero:"Ophelia Kindle",e:"🧑‍🚒",ic:"🔥",role:2,rng:320,iv:1.9,dps:.9,hp:.55,el:"fire",cost:45,u:20,atk:"Questionable Fireball",
  sp:{id:"inferno",n:"Fire Safety Training (Skipped)",cd:13,pow:2,d:"Set every monster ablaze: ×POW burn damage over 5s."},
  bio:"Fire safety training: skipped. Twice.",
  q:["Everything is flammable if you believe.","I lit it. It's fine. It's ALL fine.","Fire is just a very fast hug."]},
 bard:{n:"Bard",hero:"Wilbur Strum",e:"🧑‍🎤",ic:"🎸",role:2,rng:300,iv:1.6,dps:.35,hp:.7,el:"none",cost:45,u:25,atk:"Off-Key Note",
  sp:{id:"ballad",n:"Power Ballad",cd:15,pow:.4,d:"Everyone attacks ×1.4 faster for 7s."},
  bio:"Knows exactly one song. It's the same song. Passive: allies attack 8% faster.",pass:{spd:.08},
  q:["♪ It's a living, it's a dying, it's a Tuesday ♪","I wrote this one about you. It's not nice.","This ballad is dedicated to my paycheck."]},
 frost:{n:"Frost Witch",hero:"Svetlana Rime",e:"🧙‍♀️",ic:"❄️",role:2,rng:320,iv:1.8,dps:.8,hp:.55,el:"ice",cost:50,u:30,atk:"Frostbite Gossip",
  sp:{id:"blizzard",n:"Cold Shoulder",cd:14,pow:2,d:"Freeze the whole screen: ×POW damage and monsters slowed 60% for 5s."},
  bio:"Cold on the outside, colder on the inside.",
  q:["I'm not cold. I'm just emotionally unavailable.","Chill out. I'll do it for you.","Winter is coming. Also Monday."]},
 monk:{n:"Monk",hero:"Brother Craig",e:"🧘",ic:"👊",role:0,rng:0,iv:.55,dps:1.4,hp:1.1,el:"none",cost:50,u:36,atk:"Flurry of Mild Violence",
  sp:{id:"flurry",n:"Inner Peace (Outer Violence)",cd:9,pow:5,d:"Unleash a flurry on the nearest monster: ×POW damage."},
  bio:"Achieved inner peace. Outer violence is a work in progress.",
  q:["Be water, my friend. Or a fist. Whichever hits.","I am one with the pain. Yours.","Breathe in. Breathe out. Punch."]},
 druid:{n:"Druid",hero:"Moss Gwendolyn",e:"🧑‍🌾",ic:"🌿",role:2,rng:320,iv:1.8,dps:.7,hp:1.0,el:"nature",cost:55,u:42,atk:"Thorny Opinion",
  sp:{id:"overgrow",n:"Overgrown Inbox",cd:13,pow:.1,d:"Root every monster near the front for 3s and heal all heroes for ×POW of max HP."},
  bio:"Talks to plants. They don't talk back, but she says they do. Passive: heroes regen faster.",pass:{regen:.01},
  q:["The ferns say you're annoying.","Photosynthesis is just nature's passive income.","Bring me a plant, not a problem."]},
 necro:{n:"Necromancer",hero:"Lucinda Grimm",e:"🧛",ic:"💀",role:2,rng:340,iv:1.9,dps:1.0,hp:.7,el:"arcane",cost:60,u:50,atk:"Bone Zinger",
  sp:{id:"drain",n:"Soul Drain (Billable)",cd:11,pow:3,d:"Drain the nearest monster for ×POW damage and heal the weakest hero from it."},
  bio:"Dead people make the best coworkers. No complaints, ever.",
  q:["The dead don't take breaks. I admire that.","I've got a skeleton for that.","Mortality is overrated. Call me."]},
 storm:{n:"Storm Caller",hero:"Larry Thunder-ish",e:"🦹",ic:"⚡",role:2,rng:340,iv:1.7,dps:1.0,hp:.6,el:"storm",cost:65,u:58,atk:"Static Shock",
  sp:{id:"chain",n:"Chain Letter",cd:12,pow:2.2,d:"Lightning chains through up to 6 monsters for ×POW damage each."},
  bio:"Became a thunder god through a clerical error.",
  q:["Zap! Please stop asking how.","I forwarded the lightning to everyone.","This was supposed to be a different Larry."]},
 alchemist:{n:"Alchemist",hero:"Xander Flask",e:"🧑‍🔬",ic:"🧪",role:2,rng:300,iv:2.1,dps:.9,hp:.65,el:"nature",cost:70,u:68,atk:"Thrown Cocktail (Science)",
  sp:{id:"brew",n:"Probably Fine Potion",cd:13,pow:3,d:"Random effect: big blast, party heal, party haste, or monsters slowed... or 'oops'."},
  bio:"Every potion is 'probably fine'. Spoiler: it's not.",
  q:["That was NOT supposed to turn purple.","Drink it. What's the worst that could happen?","Science is just guessing with gloves on."]},
 gambler:{n:"Gambler",hero:"Lucky Doug",e:"🤵",ic:"🎲",role:2,rng:300,iv:1.4,dps:1.1,hp:.7,el:"none",cost:80,u:80,atk:"Loaded Coin Toss",
  sp:{id:"allin",n:"ALL IN",cd:10,pow:2.5,d:"Roll for a random multiplier (×0.2 to ×16 of POW) on the nearest monster. 5% jackpot gold."},
  bio:"Statistically, he's due. He's been due for 40 years.",
  q:["Double or nothing! (It's nothing.)","I feel lucky. I feel it in my wallet.","The house always wins. I AM the house. Sort of."]}
};
const CLS_ORDER=["knight","archer","barbarian","healer","mage","rogue","paladin","pyromancer","bard","frost","monk","druid","necro","storm","alchemist","gambler"];
const HERO_GEN_QUIPS=["Another day, another underpaid heroic act.","I'd like to speak to whoever designed this dungeon.","Did anyone review the safety plan? Anyone?","Is this billable?","I regret choosing this career path.","Why do I have to be the hero today?","My job description did NOT mention this much walking.","If I die, tell my landlord it was a work accident.","This is why I wanted to be a barista.","Management said it would be 'fun'.","Look at us. We're basically a family. A dysfunctional, flammable family.","Do monsters get dental?","Remember: it's not stealing if it's 'dungeon salvage'."];
const ENEMY_QUIPS=["RAAAAWR! (This is my only line.)","I have a family!","Please stop hitting me. It's my first day.","I was promised dental.","You're not on the guest list!","Performance review time!","I'm not mad. Okay I'm a little mad.","Unionize! Unionize!","Bite me! (I'm legally required to say that.)","I'm just here for the paycheck.","I was a hero once. Then I got a mortgage."];
const BOSS_QUIPS=["You'll never survive the next quarter!","Prepare for a hostile restructuring!","I've seen your résumé. It's LAUGHABLE.","I'll schedule your demise for 3PM.","This meeting could have been a death."];

/* Pets */
const PETS=[
 {id:"pigeon",n:"Pigeon (Unpaid Intern)",e:"🐦",rar:0,type:"gold",v:.04,d:l=>"+"+Math.round(4*l)+"% gold"},
 {id:"ratres",n:"Rat With a Résumé",e:"🐀",rar:0,type:"atk",v:.5,d:l=>"Bites monsters for ×"+(0.5+0.1*l).toFixed(1)+" hero damage"},
 {id:"sock",n:"Sentient Sock",e:"🧦",rar:0,type:"crit",v:.006,d:l=>"+"+(0.6*l).toFixed(1)+"% crit chance"},
 {id:"cat",n:"Cardboard Cat",e:"🐱",rar:0,type:"umb",v:.02,d:l=>"Weather penalties −"+(2*l)+"%"},
 {id:"slime",n:"Emotional Support Slime",e:"🟢",rar:1,type:"heal",v:.03,d:l=>"Heals the weakest hero "+(3*l)+"% max HP / 3s"},
 {id:"raccoon",n:"Raccoon Accountant",e:"🦝",rar:1,type:"gold",v:.08,d:l=>"+"+8*l+"% gold"},
 {id:"gremlin",n:"Intern Gremlin",e:"👹",rar:1,type:"spd",v:.02,d:l=>"Heroes attack "+2*l+"% faster"},
 {id:"hamster",n:"Hamster in a Tiny Helmet",e:"🐹",rar:1,type:"atk",v:.6,d:l=>"Bites monsters for ×"+(0.8+0.12*l).toFixed(1)+" hero damage"},
 {id:"dragonling",n:"Tax-Evading Dragonling",e:"🐲",rar:2,type:"atk",v:1,d:l=>"Spits fire for ×"+(1.2+0.2*l).toFixed(1)+" hero damage"},
 {id:"parrot",n:"Sarcastic Parrot",e:"🦜",rar:2,type:"crit",v:.012,d:l=>"+"+(1.2*l).toFixed(1)+"% crit chance"},
 {id:"hydra",n:"Therapy Hydra",e:"🐍",rar:2,type:"heal",v:.06,d:l=>"Heals the weakest hero "+6*l+"% max HP / 3s"},
 {id:"phoenix",n:"Corporate Phoenix",e:"🔥",rar:3,type:"gold",v:.15,d:l=>"+"+15*l+"% gold"},
 {id:"ghost",n:"Ghost of Dave",e:"👻",rar:3,type:"umb",v:.04,d:l=>"Weather penalties −"+4*l+"%"},
 {id:"ceodog",n:"The CEO's Actual Dog",e:"🐕",rar:4,type:"all",v:1,d:l=>"+"+(10*l)+"% gold, +"+(3*l)+"% haste, +"+(1*l)+"% crit"}
];
const PET_RAR=[{n:"Common",c:"#e8f1ff",w:55,b:1},{n:"Uncommon",c:"#3dffa0",w:28,b:2},{n:"Rare",c:"#19a8ff",w:12,b:4},{n:"Epic",c:"#c36bff",w:4,b:8},{n:"Legendary",c:"#ffb020",w:1,b:16}];

/* Company upgrades (tap + global) */
const UPS=[
 {id:"sword",n:"Tap Training",i:"👆",b:10,g:1.4,d:l=>"Tap damage +"+(5*l)+"% (base: 5% of squad DPS per tap)"},
 {id:"auto",n:"Intern Squire",i:"🧑‍🔧",b:120,g:1.5,max:30,d:l=>(0.5*l).toFixed(1)+" auto-taps per second"},
 {id:"crit",n:"Lucky Swings",i:"🎯",b:60,g:1.4,max:60,d:l=>(3+l)+"% base crit chance (all heroes)"},
 {id:"critdmg",n:"Ouch Multiplier",i:"💥",b:90,g:1.4,d:l=>"Crits deal ×"+(2+0.15*l).toFixed(2)},
 {id:"gold",n:"Aggressive Haggling",i:"💰",b:40,g:1.4,d:l=>"+"+(6*l)+"% gold from everything"},
 {id:"vit",n:"Wellness Program",i:"❤️",b:50,g:1.3,d:l=>"Hero HP ×"+fmt(Math.pow(1.08,l))},
 {id:"armor",n:"Padded Underwear",i:"🩲",b:80,g:1.4,max:60,d:l=>"−"+l+"% damage taken by heroes"},
 {id:"umb",n:"Umbrella Budget",i:"☂️",b:100,g:1.45,max:25,d:l=>"Weather penalties −"+(3*l)+"%"},
 {id:"luck",n:"Rabbit's Foot (Ethical)",i:"🐰",b:150,g:1.4,max:80,d:l=>"+"+(10*l)+"% loot & egg chance"}
];
const SKS=[
 {id:"slash",n:"Executive Smite",i:"🗡️",u:0,cd:8,g:1.5,d:l=>"Smite the nearest monster for "+(12+4*l)+"× tap damage"},
 {id:"cry",n:"Motivational Speech",i:"📣",u:5,cd:45,dur:12,g:1.55,d:l=>"Hero damage ×"+(1.5+0.1*l).toFixed(1)+" & attack speed ×1.25 for 12s"},
 {id:"cash",n:"Golden Handshake",i:"🤝",u:12,cd:60,dur:15,g:1.6,d:l=>"Gold ×"+(2+0.2*l).toFixed(1)+" for 15s"},
 {id:"meteor",n:"Meteor of Questionable Origin",i:"☄️",u:25,cd:50,g:1.7,d:l=>"Hit ALL monsters for "+(30+10*l)+"× tap damage"},
 {id:"hr",n:"HR Intervention",i:"📋",u:40,cd:90,g:1.8,d:l=>"Revive all fallen heroes & heal "+Math.min(100,50+5*l)+"%"}
];
const PERKS=[
 {id:"pay",n:"Overtime Pay",i:"💵",b:2,max:50,d:l=>"+"+25*l+"% gold"},
 {id:"power",n:"Power Lunch",i:"🥪",b:3,max:50,d:l=>"+"+20*l+"% all damage"},
 {id:"bunk",n:"Talent Scouts",i:"🔭",b:10,max:3,d:l=>"+"+l+" hero choice"+(l===1?"":"s")+" in Recruitment Events"},
 {id:"nep",n:"Nepotism",i:"🤝",b:3,max:10,d:l=>"New heroes join +"+2*l+" levels higher"},
 {id:"luck",n:"Four-Leaf Contract",i:"🍀",b:2,max:20,d:l=>"+"+15*l+"% loot & egg chance"},
 {id:"tele",n:"Tele-Commute",i:"🏠",b:2,max:10,d:l=>"Offline cap "+(2+2*l)+"h"},
 {id:"sky",n:"Weather Insurance",i:"🌦️",b:4,max:10,d:l=>"Weather penalties −"+5*l+"%"},
 {id:"elev",n:"Express Elevator",i:"🛗",b:5,max:20,d:l=>"Restart at stage "+(1+5*l)},
 {id:"sign",n:"Signing Bonus",i:"✍️",b:1,max:15,d:l=>"Start runs with "+fmt(l?100*Math.pow(4,l):0)+" gold"}
];

/* Items (per-hero gear) */
const SLOTS=["weapon","helm","armor","trinket"];
const SLOT_N={weapon:"Weapon",helm:"Headgear",armor:"Armor",trinket:"Trinket"};
const SLOT_I={weapon:"🗡️",helm:"⛑️",armor:"🦺",trinket:"🔮"};
const MAIN={weapon:"atk",helm:"spd",armor:"hp",trinket:"crit"};
const STAT_N={atk:"Attack",spd:"Haste",hp:"Health",crit:"Crit Chance",gold:"Gold"};
const BASES={
 weapon:[["Sword","⚔️"],["Frying Pan","🍳"],["Baguette","🥖"],["Foam Hammer","🔨"],["Axe","🪓"],["Cricket Bat","🏏"],["Fishing Rod","🎣"],["Mop","🧹"]],
 helm:[["Helmet","⛑️"],["Bucket","🪣"],["Colander","🥣"],["Traffic Cone","🚧"],["Top Hat","🎩"],["Crown","👑"],["Stew Pot","🍲"]],
 armor:[["Chainmail","🦺"],["Bathrobe","🥋"],["Barrel","🛢️"],["Hoodie","🧥"],["Tuxedo","🤵"],["Cardboard Box","📦"]],
 trinket:[["Amulet","📿"],["Lucky Sock","🧦"],["Keychain","🔑"],["Fidget Spinner","🌀"],["Rubber Duck","🦆"],["Pet Rock","🪨"],["Mood Ring","💍"],["Four-Leaf Clover","🍀"]]
};
const PRE=["Slightly Haunted","Gently Used","Overpriced","Suspiciously Warm","Artisanal","Sentient","Moist","Discount","Mildly Cursed","Extra-Large","Gluten-Free","Probably Legal","Refurbished","Limited Edition","Fancy","Crunchy","Unlicensed","Forbidden","Family-Size","Certified Pre-Owned","Aggressively Shiny","Bootleg","Organic","Weaponized"];
const SUFX=["of Mild Regret","of Questionable Origin","of Dave","of the Third Floor","of Unpaid Overtime","of Plausible Deniability","of Many Warranties","of Bad Decisions","of Quiet Rage","of Last Resort","of Free Shipping","of the Intern","of Pure Spite","of Reasonable Quality","of No Refunds","of Mild Inconvenience"];
const RAR=[{n:"Junk",c:"#8d8aa8",m:.6},{n:"Common",c:"#e8f1ff",m:1},{n:"Fine",c:"#3dffa0",m:1.5},{n:"Rare",c:"#19a8ff",m:2.2},{n:"Epic",c:"#c36bff",m:3.2},{n:"Legendary",c:"#ffb020",m:4.5},{n:"Mythic",c:"#ff2fd0",m:6.5}];
const RW=[38,34,16,8,3.2,.7,.1];
const EXTRA=[0,0,1,1,2,2,3];

/* Flavor text */
const DEATHS=["slipped on a banana peel (the banana was cursed)","tried to high-five the boss","read the terms and conditions mid-fight","stopped to take a selfie","died of dysentery. Classic.","attempted a heroic speech","was too brave for their own good","fell in love with a mimic","walked into a door labeled 'DO NOT WALK INTO'","ate the mystery meat","tripped over their own cape","got distracted by loot","was technically already dead","forgot to dodge","ran out of snacks and morale","tried to reason with it","said 'I'll be right back'","stepped on a LEGO","challenged it to a staring contest","was outvoted"];
const HR=["Reminder: heroes are not eligible for dental.","Please stop naming the rats.","Mandatory fun is scheduled for 3PM. Attendance is mandatory.","Per my last scroll, please stop dying.","Casualties are down 12%. We stopped counting.","'Dying' is not a valid reason for PTO.","Swords must be returned at end of shift. Including the stuck ones.","Employee of the Month: whoever is still alive.","Please do not feed the Mimic. (It's the vending machine. Probably.)","We're a family here. A family with a strict no-refund policy.","Good news: death is covered. Bad news: it's the Tier 3 plan.","Wellness tip: screaming counts as cardio.","Dress code: armor. Business casual armor on Fridays.","Our turnover rate is concerning. Everyone turns over. Into corpses.","The break room fridge was cleaned. Reclaim your lunch from the owlbear.","Reminder: 'Chosen One' is not a job title.","Heroism is just overtime with better lighting.","Team-building exercise: survive.","Your 401(k) is invested in a haunted mine.","Today's synergy: hit things, get gold.","Exit interviews are now just wakes.","We value your feedback. Please scream it quietly.","New hire orientation: look behind you.","Weather is not covered by the company health plan.","Pets must be registered. Pets that are also interns must be doubly registered."];
const BOSS_FAIL=["The boss laughed. Then it laughed some more.","Retreat! Strategically. Very strategically.","HR says that was 'a learning experience'.","Nobody saw that. We never speak of it."];
const WIPE_LINES=["The whole team took an unscheduled nap.","Everyone is down. HR calls it 'a restructuring'.","Total party wipe. Your insurance does not cover this.","That went poorly. Let's blame the weather."];

/* ============ DESCENT INC. v2.1 — EXPANSION DATA ============ */
const SLOT_DEFS=[];
/* ---- kinds ---- */
Object.assign(KINDS,{
 swarm:{hp:.3,dmg:.5,spd:1.4,sz:.7,iv:1.2,rng:0,swarm:3},
 tank:{hp:4,dmg:1,spd:.5,sz:1.5,iv:2.4,rng:0},
 elite:{hp:8,dmg:1.5,spd:.55,sz:1.6,iv:1.9,rng:0}
});
/* ---- rarities, slots, gear ---- */
RAR.push({n:"Divine",c:"#fff27a",m:9},{n:"Cosmic",c:"#7affd9",m:13});RW.push(.02,.003);EXTRA.push(3,3);
SLOTS.push("boots","ring");Object.assign(SLOT_N,{boots:"Boots",ring:"Ring"});Object.assign(SLOT_I,{boots:"👢",ring:"💍"});Object.assign(MAIN,{boots:"gold",ring:"atk"});
BASES.weapon.push(["Rolled Newspaper","🗞️"],["Pool Noodle","🏊"],["Trident","🔱"],["Lightsaber (Licensed)","⚡"],["Wrench","🔧"],["Boomerang","🪃"],["Rolling Pin","🥢"],["Katana","🗡️"]);
BASES.helm.push(["Viking Helm","🪖"],["Party Hat","🥳"],["Shower Cap","🛁"],["Fez","🎓"],["Goggles","🥽"],["Halo","😇"]);
BASES.armor.push(["Plate Armor","🛡️"],["Bubble Wrap","🫧"],["Lab Coat","🥼"],["Poncho","🧣"],["Scale Mail","🐉"],["Onesie","🦄"]);
BASES.trinket.push(["Compass","🧭"],["Hourglass","⏳"],["Crystal Ball","🔮"],["Snow Globe","🔮"],["Tiny Hat","🎩"],["Lava Lamp","🕯️"]);
BASES.boots=[["Boots","👢"],["Sneakers","👟"],["Flip-Flops","🩴"],["Roller Skates","🛼"],["Clown Shoes","🤡"],["Slippers","🥿"],["Rocket Boots","🚀"],["Cowboy Boots","🤠"]];
BASES.ring=[["Signet Ring","💍"],["Class Ring","🎓"],["Onion Ring","🧅"],["Ring Pop","🍭"],["Mood Ring","🔮"],["Napkin Ring","🧻"],["Key Ring","🔑"],["Tire","🛞"]];
/* ---- extra upgrades & perks ---- */
UPS.push(
 {id:"cdr",n:"Coffee Machine",i:"☕",b:200,g:1.5,max:50,d:l=>"Special cooldowns −"+l+"%"},
 {id:"disc",n:"Bulk Discount Card",i:"🏷️",b:300,g:1.6,max:40,d:l=>"Hero upgrade & hire costs −"+l+"%"},
 {id:"regen",n:"Break Room Couch",i:"🛋️",b:120,g:1.45,max:50,d:l=>"Heroes regen "+(0.2*l).toFixed(1)+"% HP/s"},
 {id:"lootq",n:"Dumpster Diving Permit",i:"🗑️",b:150,g:1.5,max:50,d:l=>"+"+(2*l)+"% loot drop chance"},
 {id:"boss",n:"Union Busting Seminar",i:"✊",b:400,g:1.5,max:60,d:l=>"+"+(5*l)+"% damage to bosses"},
 {id:"clear",n:"Stage Clear Bonus",i:"🎁",b:250,g:1.5,max:60,d:l=>"Stage clears pay +"+(5*l)+"% bonus gold"},
 {id:"haste",n:"Energy Drinks",i:"🥤",b:350,g:1.55,max:50,d:l=>"Heroes attack "+l+"% faster"}
);
PERKS.push(
 {id:"gearp",n:"Gear Hoarder",i:"🎒",b:3,max:30,d:l=>"+"+10*l+"% gear stats"},
 {id:"bossp",n:"Boss Whisperer",i:"🗣️",b:3,max:30,d:l=>"+"+25*l+"% boss damage"},
 {id:"cdrp",n:"Efficient Spells",i:"⏱️",b:4,max:10,d:l=>"Special cooldowns −"+2*l+"%"},
 {id:"hpp",n:"Hazard Pay Gear",i:"🦺",b:3,max:40,d:l=>"+"+20*l+"% hero HP"},
 {id:"autop",n:"Intern Army",i:"🧑‍🔧",b:5,max:20,d:l=>"+"+(0.5*l).toFixed(1)+" auto-taps per second"}
);
/* ---- pets ---- */
(function(){
 const gp=v=>l=>"+"+Math.round(v*100*l)+"% gold",sp=v=>l=>"Heroes attack "+Math.round(v*100*l)+"% faster",cp=v=>l=>"+"+(v*100*l).toFixed(1)+"% crit chance",hp=v=>l=>"Heals the weakest hero "+Math.round(v*100*l)+"% max HP / 3s",up=v=>l=>"Weather penalties −"+Math.round(v*100*l)+"%";
 const at=(a,b)=>l=>"Attacks for ×"+(a+b*l).toFixed(1)+" hero damage";
 PETS.push(
 {id:"snail",n:"Overqualified Snail",e:"🐌",rar:0,type:"gold",v:.03,d:gp(.03)},
 {id:"frog",n:"Frog With Opinions",e:"🐸",rar:0,type:"atk",v:1,a:[.4,.1],d:at(.4,.1)},
 {id:"bee",n:"Workaholic Bee",e:"🐝",rar:0,type:"spd",v:.015,d:sp(.015)},
 {id:"duck",n:"Rubber Duck Consultant",e:"🦆",rar:1,type:"crit",v:.008,d:cp(.008)},
 {id:"turtle",n:"Retirement-Age Turtle",e:"🐢",rar:1,type:"heal",v:.04,d:hp(.04)},
 {id:"owl",n:"Night Shift Owl",e:"🦉",rar:1,type:"gold",v:.07,d:gp(.07)},
 {id:"fox",n:"Freelance Fox",e:"🦊",rar:1,type:"atk",v:1,a:[.9,.12],d:at(.9,.12)},
 {id:"octo",n:"Multitasking Octopus",e:"🐙",rar:2,type:"spd",v:.03,d:sp(.03)},
 {id:"unicorn",n:"Unionized Unicorn",e:"🦄",rar:2,type:"gold",v:.12,d:gp(.12)},
 {id:"wolf",n:"Middle-Manager Wolf",e:"🐺",rar:2,type:"atk",v:1,a:[1.4,.2],d:at(1.4,.2)},
 {id:"yeti",n:"Cubicle Yeti",e:"🦣",rar:2,type:"umb",v:.04,d:up(.04)},
 {id:"griffin",n:"Gryphon Intern",e:"🦅",rar:3,type:"crit",v:.018,d:cp(.018)},
 {id:"mimic",n:"Pet Mimic (Don't Feed)",e:"📦",rar:3,type:"atk",v:1,a:[2,.3],d:at(2,.3)},
 {id:"angel",n:"Guardian Angel (Contract)",e:"👼",rar:3,type:"heal",v:.1,d:hp(.1)},
 {id:"kraken",n:"Emotional Support Kraken",e:"🦑",rar:4,type:"atk",v:1,a:[3,.5],d:at(3,.5)},
 {id:"cthulhu",n:"Baby Eldritch Horror",e:"👾",rar:4,type:"all",v:1,d:l=>"+"+(12*l)+"% gold, +"+(3*l)+"% haste, +"+(1*l)+"% crit"}
 );
})();
/* ---- more heroes ---- */
(function(){
 const AR={melee:{role:0,rng:0,iv:.9,dps:1.5,hp:.9},tank:{role:0,rng:0,iv:2.0,dps:.6,hp:2.4},brute:{role:0,rng:0,iv:1.6,dps:1.3,hp:1.3},rng:{role:2,rng:340,iv:1.8,dps:1.0,hp:.6},slow:{role:2,rng:330,iv:2.2,dps:1.2,hp:.5},sup:{role:2,rng:300,iv:2.1,dps:.45,hp:.8},snip:{role:2,rng:420,iv:2.4,dps:1.4,hp:.45}};
 const H=(k,n,hero,e,ic,ar,el,u,atk,sid,sn,cd,pow,d,bio,q,pass)=>{
  CLS[k]=Object.assign({n,hero,e,ic,el,cost:70+Math.min(40,u*.05),u,atk,sp:{id:sid,n:sn,cd,pow,d},bio,q},AR[ar]);if(pass)CLS[k].pass=pass;CLS_ORDER.push(k)};
 H("ranger","Ranger","Hank Trailblazer","🧑‍🦱","🏹","rng","nature",10,"Passive Trail Mix","barrage","Arrow Storm Warning",11,.55,"Loose 10 arrows at random monsters for ×POW damage each.","Knows every trail. Has never once been on time.",["I've walked this trail. It was a different trail.","Leave no trace. Except arrows."]);
 H("duelist","Duelist","Jacques le Pedant","🤺","⚔️","melee","none",18,"Pointed Remark","execute","Terms and Conditions",9,3.5,"Finish the weakest monster: more damage the lower its health. ×POW base.","En garde! And also, en lawyer.",["Touché. Sue me.","I challenge you to a minor inconvenience."]);
 H("engineer","Engineer","Gus Duct-Tape","👷","🔧","slow","storm",27,"Wrench Throw","quake","Load-Bearing Pun",13,2,"Rattle the field: ×POW damage to every monster and stun them 1.2s.","If it's broken, he'll fix it. Then break it again.",["It's not a bug, it's load-bearing.","I'll fix it with tape and optimism."]);
 H("shaman","Shaman","Totem Tina","🧙‍♀️","🪘","rng","nature",34,"Spirit Gossip","poison","Mildly Toxic Vibes",13,2.5,"Poison every monster: ×POW damage over 6s.","Spirits talk to her. Mostly to complain.",["The spirits say you're on mute.","Hex? More like HR."],{regen:.004});
 H("cleric","Cleric","Father Tuck-In","🧑‍⚕️","✝️","sup","none",40,"Mildly Blessed Tap","revive","Divine Overtime",16,.5,"Revive fallen heroes at ×POW HP, or heal everyone 15%.","Blessings are billed quarterly.",["Bless you. That's a sneeze, not a spell.","Resurrection is a service, not a right."]);
 H("berserker","Berserker","Olaf Hotheaded","🧔‍♂️","🪓","brute","fire",46,"Aggressive Handshake","whirl","Rage Quit",10,3.2,"Spin through nearby monsters for ×POW damage.","Rage is just passion with worse PR.",["I'M NOT ANGRY, I'M LOUD.","Stand still, I want to hug you with an axe."]);
 H("assassin","Assassin","Mira Quietly","🥷","🗡️","melee","none",55,"Silent Opinion","execute","Hostile Takeover",8,4.5,"Finish the weakest monster: more damage the lower its health. ×POW base.","You never see her. You never see the invoice either.",["I was never here. Please don't check.","Shh. Your death is on mute."],{gold:.08});
 H("sorcerer","Sorcerer","Ignatius Overdue","🧙","🌟","slow","arcane",64,"Library Fine Bolt","meteor","Late Fee Meteor",13,5,"Drop a meteor on the leading monsters: ×POW damage in an area.","Magic is mostly paperwork.",["My spells are three weeks overdue.","The prophecy was an email chain."]);
 H("warlock","Warlock","Dave From Below","😈","🔥","rng","arcane",74,"Contractual Obligation","drain","Soul Subscription",11,3.4,"Drain the nearest monster for ×POW and heal the weakest hero.","Signed a contract. Didn't read it. Classic.",["The fine print is on fire.","I sold my soul. It was a sale."]);
 H("templar","Templar","Brother Brickwall","🛡️","⛪","tank","none",88,"Righteous Shove","guard","Holy Insurance",14,.3,"Shield every hero for ×POW of max HP for 6s.","Faith, hope, and extremely thick armor.",["I'm not slow. I'm deliberate.","Smite later. Hold the line now."],{dr:.08});
 H("ronin","Ronin","Kenji of No Fixed Address","🧑‍🦰","🗡️","melee","none",100,"Honor-Adjacent Slice","flurry","Five Hundred Cuts (Estimated)",8,6,"Flurry on the nearest monster: ×POW damage.","Masterless, between jobs, open to offers.",["I have no master. Only deadlines.","This blade has seen things. Mostly receipts."]);
 H("beastmaster","Beastmaster","Wild Wanda","🧑‍🦳","🐾","rng","nature",115,"Squirrel Launch","overgrow","Pet Stampede",13,.15,"Root nearby monsters 3s and heal heroes ×POW max HP.","Her pets are better employees than you.",["The squirrels are unionizing.","Sit. Stay. Fight."]);
 H("conjurer","Conjurer","Sparky McSummon","🧙‍♂️","✨","rng","fire",130,"Summoned Complaint","inferno","Ritual Barbecue",13,2.4,"Ignite every monster: ×POW burn damage over 5s.","Summons things. Rarely the right things.",["I summoned a demon. It wants to speak to a manager.","Whoops. Wrong circle."]);
 H("collector","Tax Collector","Gary of the IRS (Imperial)","🧑‍💼","💰","sup","none",150,"Audit Glare","taxes","Surprise Audit",14,1.2,"Collect bonus gold: ×POW of a stage's worth per cast.","Death and taxes. He's mainly in taxes.",["Everyone owes something.","I'm not stealing. I'm 'redistributing'."],{gold:.15});
 H("captain","Captain","Capt. Barnaby Overboard","🏴‍☠️","⚓","brute","storm",170,"Cutlass Customer Service","bash","Walk the Plank",10,3.8,"Smash the nearest monster for ×POW and stun 2.5s.","The ship sank. He kept the hat.",["Arr. That's all the pirate I've got.","I'm not lost. The map is."]);
 H("gunslinger","Gunslinger","Slim Reloadin'","🤠","🔫","snip","none",190,"Yee-Haw Tap","barrage","Quickdraw Quarterly",11,.5,"Fire 10 shots at random monsters for ×POW each.","Fastest hand in the west. Slowest at paperwork.",["Draw. Or don't. I'm on break.","Reloading is a lifestyle."]);
 H("mecha","Mecha-Dave","Mecha-Dave v2.3","🤖","⚙️","brute","storm",215,"Beep Boop Bonk","chain","Firmware Update (Lightning)",12,2.4,"Lightning chains through up to 6 monsters for ×POW each.","Was a Dave. Is now mostly bolts.",["Updating... please don't hit me.","I was human once. Don't ask which parts."]);
 H("chrono","Chronomancer","Doc Tick-Tock","🧑‍🔬","⏳","sup","arcane",240,"Wasted Second","rally","Overtime (Literally)",14,.3,"Everyone fights ×1.5 harder and faster for 6s.","Late for everything. On purpose.",["I've been here before. You were worse.","Time is money. I'm both broke and late."],{spd:.06});
 H("dragoon","Dragon Knight","Sir Scales-a-Lot","🐲","🐉","brute","fire",270,"Tail Whack","smite","Scorched Résumé",11,3.5,"Smite the nearest monster for ×POW and heal that much of a hero.","Half knight, half dragon, fully tired.",["Fire. Fire! Fire?","I have wings and I still walk."]);
 H("hunter","Vampire Hunter","Van Hellsing (Intern)","🧛‍♂️","🧄","melee","arcane",300,"Garlic Bread Slap","drain","Stake Holder Meeting",10,3.8,"Drain the nearest monster for ×POW and heal the weakest hero.","Stakes are high. Literally.",["I only hunt vampires who skip rent.","Garlic: the original sunscreen."]);
 H("sunpriest","Sun Priest","Helios Brightside","🧑‍🦲","☀️","sup","fire",335,"Sunburn Blessing","mend","Solar Panel Rapture",13,.35,"Heal every hero for ×POW of max HP.","Positive vibes only. Neon-bright and exhausting.",["Let there be light. And SPF.","Warm hugs from a giant fireball."]);
 H("voidwalker","Void Walker","Nullius","🧙‍♀️","🕳️","slow","arcane",370,"Stare Into Abyss","quake","Black Hole Happy Hour",13,2.4,"Crush the field: ×POW damage to every monster and stun 1.2s.","Stared into the void. The void asked for references.",["The void is hiring.","Existential dread, but make it fashion."]);
 H("plague","Plague Doctor","Dr. Beaky","🦹","🧪","rng","nature",410,"Sneeze Spell","poison","Quarantine Special",12,3,"Poison every monster: ×POW damage over 6s.","Cough responsibly.",["Wash your hands. Then my sword.","Medically speaking, you're doomed."]);
 H("valkyrie","Valkyrie","Brunhild Overbooked","🛡️","🪽","brute","storm",450,"Winged Ultimatum","smite","Feathered Reckoning",10,4,"Smite the nearest monster for ×POW and heal that much of a hero.","Chooses who dies. Overbooked this week.",["I choose... everyone, apparently.","Valhalla has a waitlist."]);
 H("elementalist","Elementalist","Prism Pete","🧙","🌈","rng","storm",500,"Rainbow Heckle","chain","Five Elements Special",12,2.8,"Lightning chains through up to 6 monsters for ×POW each.","Fire, ice, storm, nature, and slightly damp.",["Elements: assemble. Slowly.","I contain multitudes. And snacks."]);
 H("manager","Middle Manager","Brad (Regional)","👔","📎","sup","none",550,"Circle Back","rally","Synergy Huddle",14,.3,"Everyone fights ×1.5 harder and faster for 6s.","Does nothing. Credits himself. Gets promoted.",["Let's take this offline. Offline = death.","Per my last sword..."],{spd:.07});
 H("colossus","Colossus","Big Gerald","🗿","🗻","tank","none",620,"Gentle Stomp","quake","Mild Earthquake",13,2.2,"Rattle the field: ×POW damage and stun 1.2s to every monster.","He's very big. He's very sorry.",["Sorry about the crater.","Please stop standing under me."],{dr:.1});
 H("fate","Intern of Fate","Destiny (Unpaid)","🧑‍🎤","🌌","slow","arcane",700,"Prophetic Shrug","allin","Fate Roulette",10,2.6,"Roll ×0.2 to ×16 of POW on the nearest monster. 5% jackpot gold.","Writes the future in sticky notes.",["The stars said 'maybe'.","Fate is just a spreadsheet nobody reads."]);
 H("accountant","The Accountant","Beatrice Ledger","🧑‍💻","🧮","snip","none",800,"Compound Insult","taxes","Capital Gains Smite",13,1.5,"Collect bonus gold: ×POW of a stage's worth per cast.","Counts everything. Including your regrets.",["Your deductions are denied. And you.","Balance sheet: negative. Like my mood."],{gold:.18});
 H("deity","Overtime Deity","Kevin, God of Meetings","🧑‍🚀","🔆","brute","none",900,"Divine Calendar Invite","smite","Smite (Recurring)",9,4.5,"Smite the nearest monster for ×POW and heal that much of a hero.","Omnipotent. Still in meetings.",["I made the universe. I can make a quarterly report.","Let there be… a follow-up email."],{dr:.08,gold:.1});
 CLS_ORDER.sort((a,b)=>CLS[a].u-CLS[b].u||0);
})();
/* ---- themes & procedural realms ---- */
const THEMES=[
 {id:"cave",sky:["#2d2347","#120c24"],acc:"#19e6ff",sil:"stalac",el:"none",wx:["clear","fog","smog"],decor:["🕸️","🪨","🦇","🕯️"],places:["Caverns","Grotto","Hollow","Depths","Burrows","Tunnels"],mobs:[["Cave Rat","🐀"],["Bat","🦇"],["Spider","🕷️"],["Slime","🟢"],["Shroom","🍄"],["Mole","🦫"],["Rock Golem","🪨"],["Eyeball","👁️"]],boss:[["Stone Troll","🧌"],["Cave Dragon","🐉"],["Broodmother","🕷️"],["Cave Lich","💀"]]},
 {id:"forest",sky:["#1d4a2a","#0a2012"],acc:"#3dffa0",sil:"trees",el:"nature",wx:["rain","fog","wind","clear"],decor:["🌲","🍄","🪵","🦋"],places:["Woods","Thicket","Grove","Glade","Canopy","Understory"],mobs:[["Wolf","🐺"],["Boar","🐗"],["Treant","🌳"],["Snake","🐍"],["Frog","🐸"],["Owl","🦉"],["Bear","🐻"],["Beetle","🪲"]],boss:[["Ancient Stag","🦌"],["Forest Wyrm","🐲"],["Great Oak","🌳"],["Bear King","🐻"]]},
 {id:"desert",sky:["#6a4a1a","#2a1806"],acc:"#ffd447",sil:"dunes",el:"fire",wx:["sand","heat","clear","wind"],decor:["🌵","🏺","🪦","🦴"],places:["Dunes","Oasis","Wastes","Mirage","Badlands","Sandpit"],mobs:[["Scorpion","🦂"],["Mummy","🧟"],["Camel","🐪"],["Vulture","🦅"],["Cactus","🌵"],["Sand Worm","🪱"],["Genie","🧞"],["Lizard","🦎"]],boss:[["Sphinx","🦁"],["Sand Titan","🗿"],["Pharaoh's Ghost","👻"],["Giant Scorpion","🦂"]]},
 {id:"ice",sky:["#1d3f66","#09182b"],acc:"#8ee8ff",sil:"mount",el:"ice",wx:["snow","blizzard","fog"],decor:["❄️","🧊","⛄","🌨️"],places:["Tundra","Glacier","Icefield","Peaks","Drifts","Permafrost"],mobs:[["Penguin","🐧"],["Snowman","⛄"],["Polar Bear","🐻‍❄️"],["Ice Wolf","🐺"],["Walrus","🦭"],["Frost Imp","👺"],["Yeti","🦣"],["Snowball","⚪"]],boss:[["Frost Giant","🧊"],["Ice Dragon","🐉"],["Yeti King","🦣"],["Blizzard Queen","👸"]]},
 {id:"volcano",sky:["#5b1d12","#220804"],acc:"#ff7a3d",sil:"mount",el:"fire",wx:["heat","ash","meteor","smog"],decor:["🔥","🌋","🪨","💥"],places:["Caldera","Crater","Forge","Ashlands","Magma Flats","Cinders"],mobs:[["Fire Imp","👹"],["Lava Slug","🐌"],["Salamander","🦎"],["Magma Golem","🌋"],["Ember Bat","🦇"],["Hellhound","🐕"],["Cinder Chick","🐤"],["Demon","😈"]],boss:[["Magma Lord","🌋"],["Fire Drake","🐲"],["Inferno Titan","👹"],["Phoenix Prime","🔥"]]},
 {id:"swamp",sky:["#2b3a1d","#0e150a"],acc:"#9aff5a",sil:"deadtrees",el:"nature",wx:["fog","rain","smog"],decor:["🪷","🐸","🪵","🦟"],places:["Bog","Marsh","Mire","Fen","Bayou","Quagmire"],mobs:[["Crocodile","🐊"],["Bog Witch","🧙"],["Leech","🪱"],["Mosquito","🦟"],["Bog Zombie","🧟"],["Snapper","🐢"],["Wisp","👻"],["Toad","🐸"]],boss:[["Hydra","🐍"],["Swamp Mother","🧌"],["Giant Gator","🐊"],["Rot King","💀"]]},
 {id:"ocean",sky:["#14407a","#071a33"],acc:"#33d0ff",sil:"waves",el:"storm",wx:["rain","thunder","wind","fog"],decor:["🐚","⚓","🪸","🐠"],places:["Reef","Shallows","Harbor","Trench","Shoals","Lagoon"],mobs:[["Crab","🦀"],["Shark","🦈"],["Octopus","🐙"],["Jellyfish","🪼"],["Pirate","🏴‍☠️"],["Puffer","🐡"],["Eel","🐍"],["Seagull","🐦"]],boss:[["Kraken","🦑"],["Leviathan","🐋"],["Pirate King","🏴‍☠️"],["Megalodon","🦈"]]},
 {id:"sky",sky:["#33508a","#101c3c"],acc:"#fff3a8",sil:"clouds",el:"storm",wx:["clear","wind","thunder","confetti"],decor:["☁️","⛅","🪽","🎈"],places:["Heights","Cloudbank","Aerie","Skyway","Updraft","Terrace"],mobs:[["Cloud Sprite","☁️"],["Thunderbird","🦅"],["Grumpy Angel","👼"],["Wasp","🐝"],["Kite","🪁"],["Balloon","🎈"],["Gryphon","🦅"],["Storm Sprite","⚡"]],boss:[["Storm Giant","🌩️"],["Sky Dragon","🐉"],["Thunder Roc","🦅"],["Cloud Duke","☁️"]]},
 {id:"city",sky:["#2b2f4d","#0d0f22"],acc:"#c9a8ff",sil:"bldg",el:"none",wx:["rain","smog","clear","confetti"],decor:["🏙️","🚦","🗑️","🚕"],places:["Downtown","Alleyways","Overpass","Slums","Plaza","Subway"],mobs:[["Pigeon","🐦"],["Gargoyle","🗿"],["Burglar","🦹"],["Mime","🤡"],["Sewer Gator","🐊"],["Hot Dog Vendor","🌭"],["Mascot","🧸"],["Taxi","🚕"]],boss:[["The Mayor","🎩"],["Skyscraper Golem","🏢"],["Mega Mascot","🧸"],["Crime Boss","🕴️"]]},
 {id:"space",sky:["#1a1040","#05020f"],acc:"#9a8cff",sil:"planets",el:"arcane",wx:["eclipse","meteor","clear"],decor:["🪐","⭐","🌙","🛰️"],places:["Orbit","Nebula","Asteroid Belt","Void","Moon Base","Space Station"],mobs:[["Alien","👽"],["Robot","🤖"],["UFO","🛸"],["Comet","☄️"],["Astronaut","🧑‍🚀"],["Space Whale","🐋"],["Satellite","🛰️"],["Gremlin","👾"]],boss:[["Planet Eater","🪐"],["Star Tyrant","⭐"],["Mothership","🛸"],["Void Maw","🕳️"]]},
 {id:"candy",sky:["#7a2a6a","#2a0a2a"],acc:"#ff8ad8",sil:"candy",el:"none",wx:["confetti","rain","clear"],decor:["🍭","🍬","🍩","🧁"],places:["Sweetlands","Frosting Flats","Syrup Falls","Gumdrop Hills","Cocoa Caves","Sprinkle Fields"],mobs:[["Gummy Bear","🧸"],["Lollipop Knight","🍭"],["Cupcake","🧁"],["Donut","🍩"],["Ice Cream","🍦"],["Cookie Thug","🍪"],["Marshmallow","🍡"],["Jelly","🟣"]],boss:[["Cake Colossus","🎂"],["Sugar Dragon","🐉"],["Candy Queen","👸"],["Chocolate Golem","🍫"]]},
 {id:"haunted",sky:["#2a1a3a","#0c0614"],acc:"#c36bff",sil:"houses",el:"arcane",wx:["fog","eclipse","thunder"],decor:["🪦","🎃","🕯️","🦇"],places:["Manor","Graveyard","Crypt","Mausoleum","Attic","Belfry"],mobs:[["Ghost","👻"],["Skeleton","💀"],["Zombie","🧟"],["Vampire","🧛"],["Pumpkin Head","🎃"],["Witch","🧙‍♀️"],["Poltergeist","👻"],["Bat Swarm","🦇"]],boss:[["Lich King","💀"],["Grim Reaper","☠️"],["Count Overdue","🧛"],["Headless Boss","🎃"]]},
 {id:"factory",sky:["#3a3a3a","#111111"],acc:"#ffb020",sil:"gears",el:"storm",wx:["smog","heat","thunder"],decor:["⚙️","🔩","🏭","🛠️"],places:["Foundry","Assembly Line","Warehouse","Boiler Room","Scrapyard","Loading Dock"],mobs:[["Gear Gremlin","⚙️"],["Drone","🛸"],["Forklift","🚜"],["Spark","⚡"],["Printer","🖨️"],["Toaster","🍞"],["Welder","🧑‍🏭"],["Conveyor Crab","🦀"]],boss:[["Mega Mech","🤖"],["Assembly Overlord","🏭"],["Scrap King","🔩"],["Boiler Beast","🔥"]]},
 {id:"crystal",sky:["#2a1f5a","#0a0720"],acc:"#7affd9",sil:"crystals",el:"arcane",wx:["clear","eclipse","wind"],decor:["💎","🔮","✨","🪩"],places:["Geode","Prism Hall","Shard Fields","Gem Mines","Resonance Cave","Glass Gardens"],mobs:[["Gem Beetle","🪲"],["Crystal Golem","💎"],["Prism Sprite","✨"],["Geode Bat","🦇"],["Shardling","🔷"],["Quartz Wolf","🐺"],["Opal Slime","🟣"],["Diamond Dog","🐕"]],boss:[["Crystal Hydra","🐍"],["Prism Dragon","🐉"],["Gem Queen","💎"],["Shard Titan","🗿"]]},
 {id:"jungle",sky:["#14502a","#05200f"],acc:"#c5ff3d",sil:"palms",el:"nature",wx:["rain","heat","fog"],decor:["🌴","🦜","🌺","🍌"],places:["Jungle","Rainforest","Ruins","Temple","Vines","Canopy"],mobs:[["Monkey","🐒"],["Jaguar","🐆"],["Parrot","🦜"],["Gorilla","🦍"],["Viper","🐍"],["Tiki Mask","👺"],["Toucan","🦜"],["Piranha","🐟"]],boss:[["Jungle King","🦍"],["Giant Anaconda","🐍"],["Temple Guardian","🗿"],["Jaguar God","🐆"]]},
 {id:"mountain",sky:["#3a4a6a","#10182a"],acc:"#c8e1ff",sil:"mount",el:"none",wx:["wind","snow","clear","thunder"],decor:["⛰️","🪨","🦅","🏔️"],places:["Peak","Pass","Summit","Ridge","Cliffs","Highlands"],mobs:[["Goat","🐐"],["Eagle","🦅"],["Rock Troll","🧌"],["Hermit","🧙‍♂️"],["Condor","🦅"],["Ibex","🐐"],["Avalanche","⚪"],["Boulder","🪨"]],boss:[["Mountain King","👑"],["Wyvern","🐉"],["Storm Condor","🦅"],["Stone Colossus","🗿"]]},
 {id:"hell",sky:["#4a0a14","#150208"],acc:"#ff4d6d",sil:"spikes",el:"fire",wx:["ash","heat","meteor","eclipse"],decor:["🔥","💀","🪓","⛓️"],places:["Pits","Inferno","Brimstone Halls","Cinder Court","Lava Lake","Underworld"],mobs:[["Imp","👹"],["Devil","😈"],["Hellhound","🐕"],["Lava Elemental","🌋"],["Bone Dragon","🦴"],["Soul Eater","👻"],["Pitchfork Intern","🔱"],["Ash Wraith","💨"]],boss:[["Archdevil","😈"],["Lord of Paperwork","📜"],["Bone Wyrm","🦴"],["Pit Fiend","👹"]]},
 {id:"dream",sky:["#3a2a7a","#0f0a2a"],acc:"#ff9aff",sil:"swirl",el:"arcane",wx:["confetti","eclipse","fog"],decor:["💤","🌙","🪞","🎠"],places:["Dreamscape","Nightmare Wing","Pillow Fort","Lucid Hollow","Mirror Maze","Slumberland"],mobs:[["Nightmare","🐴"],["Sleepwalker","🧟"],["Pillow Golem","🛏️"],["Clown","🤡"],["Mirror Twin","🪞"],["Moth","🦋"],["Snoozer","😴"],["Dream Eater","🐘"]],boss:[["Sandman","🧙‍♂️"],["Insomnia Titan","👁️"],["Nightmare King","🐴"],["Alarm Clock Lord","⏰"]]},
 {id:"office",sky:["#2a3a5a","#0c1220"],acc:"#19e6ff",sil:"bldg",el:"none",wx:["clear","fog","confetti","smog"],decor:["📎","🖨️","☕","🪑"],places:["Cubicles","Break Room","Boardroom","Server Closet","Parking Garage","Open-Plan Office"],mobs:[["Stapler","📎"],["Cubicle Zombie","🧟"],["Intern","🧑‍💼"],["Manager","👔"],["Printer","🖨️"],["Coffee Golem","☕"],["Spreadsheet Beast","📊"],["Fax Machine","📠"]],boss:[["CEO Hydra","🐍"],["HR Dragon","🐉"],["Quarterly Report","📊"],["Mega Meeting","🗓️"]]},
 {id:"farm",sky:["#5a7a2a","#1c2a0c"],acc:"#ffe45a",sil:"barns",el:"nature",wx:["rain","clear","wind","confetti"],decor:["🌾","🚜","🐓","🌻"],places:["Farmlands","Pasture","Barnyard","Orchard","Cornfield","Hayloft"],mobs:[["Angry Chicken","🐔"],["Cow","🐄"],["Scarecrow","🎃"],["Pig","🐖"],["Goose","🪿"],["Bull","🐂"],["Tractor","🚜"],["Sheep","🐑"]],boss:[["Giant Rooster","🐓"],["Mega Bull","🐂"],["Scarecrow King","🎃"],["Combine Harvester","🚜"]]},
 {id:"beach",sky:["#2a7ab0","#0a2a40"],acc:"#ffd84a",sil:"palms",el:"fire",wx:["clear","heat","rain","wind"],decor:["🏖️","🌴","🍹","🐚"],places:["Beach","Boardwalk","Cove","Shore","Resort","Sandbar"],mobs:[["Crab","🦀"],["Seagull","🐦"],["Flamingo","🦩"],["Coconut","🥥"],["Sunburn Imp","👺"],["Beach Ball","🏐"],["Lifeguard","🧑‍🚒"],["Hermit","🐚"]],boss:[["Giant Crab","🦀"],["Tiki God","🗿"],["Sand Castle King","🏰"],["Beach Kraken","🦑"]]}
];
const ADJ=["Mildly","Overpriced","Suspicious","Haunted","Understaffed","Moist","Grumpy","Forgotten","Lukewarm","Overbooked","Discount","Unlicensed","Sentient","Soggy","Fancy","Cursed","Premium","Sleepy","Crunchy","Passive-Aggressive","Overdue","Extra-Large","Gluten-Free","Unregulated","Artisanal","Refurbished","Moldy","Ominous","Greasy","Spooky","Eternal","Unpaid","Bureaucratic","Questionable","Awkward","Dusty","Fluorescent","Flammable","Tragic","Cheerful"];
const MOB_ADJ=["Angry","Overqualified","Unpaid","Sleepy","Caffeinated","Grumpy","Smug","Underpaid","Feral","Disgruntled","Sarcastic","Moist","Bored","Elite","Rogue","Mid-Level","Anxious","Soggy","Hangry","Unionized"];
const BOSS_TITLES=["Regional Manager of","Duke of","Overlord of","Chief Executive of","Tyrant of","Supreme Leader of","Wardens of","The Final Review of","King of","Assistant Under-Secretary of","Mildly Terrifying Ruler of","Landlord of"];
const REALM_INTRO=["Welcome to {n}. The brochure said 'moderate peril'. The brochure lied. Please sign the waiver you've already signed.","You've reached {n}. The locals are hostile. The weather is worse. The gift shop is closed.","{n}: a charming destination if you enjoy being hit. Management asks that you hit back.","Nobody asked to come to {n}. Everyone came anyway. That's called 'a job'.","{n} appears on no maps. It appears on several complaints.","Rumor says {b} rules {n}. Rumor also says it's 'fine'. Rumor is not insured.","Welcome to {n}! Please keep arms, legs, and dental plan inside the vehicle.","Management would like to remind you that {n} was NOT in the original contract."];
const REALM_MEMO=["MEMO: Morale in {n} is low. So is the ceiling. Please duck.","MEMO: Reminder that {n} has no break room. Break things instead.","MEMO: Employee of the Month is whoever is still alive. Congrats.","MEMO: Overtime in {n} is now mandatory, retroactive, and unpaid.","MEMO: We've outsourced fear to {n}. It's going well. Terribly well.","MEMO: Please stop naming the monsters. We're running out of paperwork.","MEMO: {b} has requested a meeting. Do NOT accept the invite."];
const REALM_OUT=["{b} falls with a dignified shrug. Management emails: 'Great work. Now do it again, deeper.'","With {b} defeated, {n} is declared 'adequately cleared'. You get a sticker.","{b} drops a coupon for 10% off your next near-death experience.","The ground shakes. The stairs appear. The stairs say 'DOWN (MANDATORY)'.","{b} leaves behind a note: 'It was just a misunderstanding. Also, ow.'","You cleared {n}. HR has filed it under 'Tuesday'."];
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hex2rgb(h){h=h.replace("#","");return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function rgb2hex(r,g,b){const c=v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0");return"#"+c(r)+c(g)+c(b)}
function hueShift(hex,deg){const[r,g,b]=hex2rgb(hex).map(v=>v/255);const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;const d=mx-mn;
 if(d){s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60}
 h=(h+deg+360)%360;const f=n=>{const k=(n+h/30)%12,a=s*Math.min(l,1-l);return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return rgb2hex(f(0)*255,f(8)*255,f(4)*255)}
const THEME_OF_HAND=["cave","swamp","city","haunted","swamp","volcano","ice","sky","city","factory","office","desert","dream"];
REALMS.forEach((r,i)=>{r.th=THEME_OF_HAND[i]||"cave";r.sil=(THEMES.find(t=>t.id===r.th)||THEMES[0]).sil});
const REALM_CACHE={};
function genRealm(i){
 if(REALM_CACHE[i])return REALM_CACHE[i];
 const rnd=mulberry(i*7919+13),T=THEMES[(i*5+Math.floor(i/THEMES.length))%THEMES.length];
 const adj=ADJ[Math.floor(rnd()*ADJ.length)],pl=T.places[Math.floor(rnd()*T.places.length)];
 const suf=rnd()<.18?pick2(rnd,[" & Associates"," (Under New Management)"," Inc."," LLC"," (Closed for Renovations)"]):"";
 const n="The "+adj+" "+pl+suf;
 const shift=Math.floor(rnd()*60)-30;
 const mob=[];const pool=T.mobs.slice();
 for(let k=0;k<6;k++){const m=pool.splice(Math.floor(rnd()*pool.length),1)[0];mob.push([(rnd()<.6?pick2(rnd,MOB_ADJ)+" ":"")+m[0],m[1]])}
 const kinds=["grunt","grunt","runner","brute","spitter",rnd()<.5?"swarm":"tank"];for(let k=kinds.length-1;k>0;k--){const j=Math.floor(rnd()*(k+1));[kinds[k],kinds[j]]=[kinds[j],kinds[k]]}
 const bs=T.boss[Math.floor(rnd()*T.boss.length)];const bn=bs[0];
 const boss=[bn,bs[1],pick2(rnd,BOSS_TITLES)+" "+pl];
 const fill=s=>s.replace(/\{n\}/g,n).replace(/\{b\}/g,bn);
 const r={n,th:T.id,sil:T.sil,bg:[hueShift(T.sky[0],shift),hueShift(T.sky[1],shift)],acc:hueShift(T.acc,shift),decor:T.decor,el:T.el,wx:T.wx.slice(),
  intro:fill(pick2(rnd,REALM_INTRO)),mid:fill(pick2(rnd,REALM_MEMO)),out:fill(pick2(rnd,REALM_OUT)),mobs:mob,mk:kinds,boss,gen:1};
 REALM_CACHE[i]=r;return r;
}
function pick2(rnd,a){return a[Math.floor(rnd()*a.length)]}

/* ============ DESCENT INC. v2.2 — QUIPS, SUPPLIES, GEM SHOP ============ */
HERO_GEN_QUIPS.push("Is it just me or is the floor getting more violent?","I didn't sign up for this. I signed up for 'light adventuring'.","If anyone asks, I was here the whole time. Fighting. Heroically.","We should unionize. Anyone? ...Anyone?","This is the fourth Tuesday this week.","I can't feel my feet. It's fine. I've never used them much anyway.","Whoever invented 'mandatory overtime' should be fed to a mimic.","My horoscope said 'avoid monsters'. Rude.","I'm just here for the snacks and the existential dread.","Can we get a performance review that isn't a fistfight?","How is it still the same wave? I've counted. It's the same wave.","I'd like to file a complaint. The complaint is: everything.","Honestly? I miss the basement.","I wonder what my family thinks I do for a living.","You know what? I respect the monsters. They show up. Unlike Greg.","Note to self: stop volunteering for things.","Nothing says 'job security' like constant mortal peril.","I'm not saying it's a bad dungeon. I'm saying I'd give it one star.","We're basically a very violent book club.","Tell my cat I fought bravely. Tell my landlord I'm broke.");
ENEMY_QUIPS.push("Fresh meat! (That's you.)","I'm on my break, actually.","Do you have an appointment?","Nobody told me about the dental plan either.","I have a mortgage and a dream. The dream is you, leaving.","Sir, this is a Wendy's.","I'm just a monster doing monster things.","Please hold. Your death is important to us.","My therapist says I should hit more people.","Not the face! The other face!","Ow. Rude. Ow.","I only wanted to be a florist.");
BOSS_QUIPS.push("Your performance review is scheduled for NEVER.","I eat heroes for breakfast. And lunch. Dinner is a mimic.","Please state your business. Then your last words.","I'll be right with you. After I destroy you.","You have exceeded your allotted number of lives.");
const QUIP={
 crit:["BOOM. Put that in my résumé.","That one's gonna leave a mark on the invoice.","Critical hit! I felt that in my soul.","Was that me? That was me. Nice.","Hit 'em where the paperwork hurts.","I regret nothing. Especially that.","And THAT'S how you get promoted.","Yeet.","Oh, that was NASTY. Do it again."],
 lowhp:["Everything hurts and I'm not even paid for this.","I'm fine. I'm FINE. Someone heal me.","Tell my family I almost had a pension.","Medic? Anyone? I'll pay in exposure.","I can see a light! Oh wait, that's a lantern.","Is there a heroic way to say 'ow'?","Remember me as I was: mostly intact."],
 kill:["Another one bites the dust. They're all so dusty.","One less colleague at the dungeon.","Rest in pieces.","I'm not saying it was easy. I'm saying I'm bored.","Next! Please take a number.","They never learn.","Cha-ching. Wait, wrong sound.","Dead. Efficient. Cheap."],
 bossIn:["Oh no. It's the BIG one. It's got a name tag and everything.","Is that a boss? It's wearing a lanyard.","I did not stretch for this.","Everyone act natural. Pretend we're not here.","That is a LOT of health bar.","Can we reschedule? I'm busy being scared.","If we die, tell them it was Dave's fault."],
 bossDead:["Boss down! Someone get the confetti.","That's gonna look great on my LinkedIn.","Ding dong, the manager is dead.","We did it! Don't make it weird.","Hostile takeover: successful."],
 loot:["Ooh, shiny. Mine now.","Is that gear? Please be gear.","Finders keepers, legally speaking.","I'll take it. It's probably cursed. Whatever.","The dungeon provides. Reluctantly."],
 lvl:["I feel stronger. Marginally. Spiritually.","Level up! Time to pretend I earned it.","New level, new me. Same back pain.","Raise accepted! Wait, that's a level.","Stats go brrr."],
 clear:["Stage clear! Anyone have a break room?","One stage down. Infinity to go.","Nice work, team. Please never speak of it.","That went suspiciously okay.","On to the next catastrophe!","Great. Now do it again, but deeper.","Moving on before HR notices."],
 allyDown:["Man down! Man... fainted. Man's fine.","Incident report time!","He'll be fine. Probably. Maybe. Eventually.","And that's why we wear helmets. Except he didn't.","Someone wake him up before HR calls."],
 weather:["I don't remember ordering weather.","Of course it's weather. Of course.","This is just what I get for leaving the house."],
 reply:["Oh, stop it.","You're not wrong.","Technically correct. The worst kind.","I'm gonna pretend I didn't hear that.","Same, honestly.","Nobody asked, but thanks.","Wow. Okay.","I'm telling HR you said that.","We're all thinking it.","Can you not?","Bold of you to assume I was listening.","Ha. Ha. Ha. That's not funny.","Hard agree. Soft violence.","This is why nobody sits with us at lunch."],
 hire:["Hi. I'm new. Where's the break room?","Reporting for duty! And lunch!","What's the dental situation?","I was told there would be snacks."],
 heal:["Thanks! Don't tell anyone I needed that.","Back in business. Slightly.","Ahh. Magic. Billable, probably."]
};
const quip=(h,arr,ch)=>{if(!h||h.down||h.bubT>0||Math.random()>(ch==null?1:ch))return false;let t=null;if(typeof heroLine==="function"&&Math.random()<.85){const cat=CAT_OF.get(arr);if(cat)t=heroLine(h,cat)}say(h,t||pick(arr),3.2);return true};
const UTILS=[
 {id:"manual",n:"Training Manual",i:"📘",d:"+1 level on every squad hero."},
 {id:"ticket",n:"Golden Ticket",i:"🎟️",d:"Gold ×2 for 5 minutes."},
 {id:"pre",n:"Pre-Workout Shake",i:"🥤",d:"Squad damage ×1.1 for 5 minutes."},
 {id:"donut",n:"Emergency Donut",i:"🍩",d:"Revive and fully heal the whole squad."},
 {id:"egg",n:"Mystery Egg",i:"🥚",d:"Hatches a random pet. No refunds."}
];
const GEMS=[
 {id:"gchest",n:"Gilded Chest",i:"🎁",cost:()=>3,d:"Epic+ gear for the whole squad, a huge pile of gold and 3 supplies."},
 {id:"gskip",n:"Time Skip",i:"⏩",cost:()=>2,d:"Instantly collect one hour of idle gold."},
 {id:"gegg",n:"Mythic Egg",i:"🥚",cost:()=>2,d:"A guaranteed Epic or Legendary pet."},
 {id:"gmanual",n:"Gilded Manual",i:"📗",cost:()=>4,d:"+3 levels on every squad hero."},
 {id:"gwallet",n:"Gem-Studded Wallet",i:"👛",cost:l=>5+3*l,max:10,d:l=>"+"+10*l+"% gold forever (survives Rewrite)"},
 {id:"gpower",n:"Rune of Power",i:"🔱",cost:l=>5+3*l,max:10,d:l=>"+"+10*l+"% damage forever (survives Rewrite)"},
 {id:"gpick",n:"Recruitment Voucher",i:"🎟️",cost:l=>8+4*l,max:99,d:l=>"Instantly trigger a Recruitment Event (pick 1 of 3 heroes)"},
 {id:"gso",n:"Insider Stock Tip",i:"📈",cost:()=>6,d:"+8 Wishes instantly."}
];
CLS.rogue.flip=true;CLS.assassin.flip=true;CLS.ranger.flip=false;

/* ============ DESCENT INC. v3 — FORMATION SLOTS, 80 HEROES, SYNERGIES ============ */
(function(){
 const AR={melee:{role:0,rng:0,iv:.9,dps:1.5,hp:.9},tank:{role:0,rng:0,iv:2.0,dps:.6,hp:2.4},brute:{role:0,rng:0,iv:1.6,dps:1.3,hp:1.3},rng:{role:2,rng:340,iv:1.8,dps:1.0,hp:.6},slow:{role:2,rng:330,iv:2.2,dps:1.2,hp:.5},sup:{role:2,rng:300,iv:2.1,dps:.45,hp:.8},snip:{role:2,rng:420,iv:2.4,dps:1.4,hp:.45}};
 const H=(k,n,hero,e,ic,ar,el,atk,sid,sn,cd,pow,d,bio,q)=>{CLS[k]=Object.assign({n,hero,e,ic,el,cost:75,u:0,atk,sp:{id:sid,n:sn,cd,pow,d},bio,q},AR[ar])};
 H("bouncer","Bouncer","Big Tony (Not On The List)","🕴️","🚪","tank","none","Velvet Rope Shove","guard","Not On The List",14,.28,"Shield every hero for ×POW of max HP for 6s.","Has never let anyone in. Including the ones with reservations.",["Sorry, you're not on the list. You're dead.","Dress code violation: you're a skeleton."]);
 H("crusader","Crusader","Sir Reginald Overzealous","🦸","✝️","tank","none","Holy Handshake","smite","Righteous Pamphlet",11,3.2,"Smite the nearest monster for ×POW and heal that much of a hero.","Crusades for fun and mild profit.",["Deus vult. Also, free parking.","I crusade responsibly."]);
 H("stonekeeper","Stonekeeper","Rocky Rhodes","🪨","🗿","tank","nature","Pebble Poke","overgrow","Rooted Argument",13,.12,"Root nearby monsters 3s and heal heroes ×POW max HP.","Rocks don't have opinions. He has several.",["I'm not slow. I'm geologically patient.","Rock solid. Also, hungry."]);
 H("gladiator","Gladiator","Maximus Overpaid","🤼","🏟️","brute","none","Crowd-Pleasing Slap","bash","Thumbs Down",10,3.6,"Smash the nearest monster for ×POW and stun 2.5s.","Entertains crowds. Hates crowds.",["ARE YOU NOT ENTERTAINED? Because I'm tired.","The crowd loves me. The crowd is monsters."]);
 H("brawler","Brawler","Bar Fight Barry","🥊","🥊","melee","none","Stool-Based Diplomacy","flurry","Last Call",8,5.5,"Flurry on the nearest monster: ×POW damage.","Has been 'asked to leave' from every dimension.",["Who spilled my drink? WHO?","I don't start fights. I finish tabs."]);
 H("warlord","Warlord","Warlord Wendy","🪖","🚩","brute","none","Tactical Shouting","rally","Battle Cry (Unlicensed)",14,.3,"Everyone fights ×1.5 harder and faster for 6s.","Conquered three kingdoms. Lost the paperwork.",["FORWARD! Or at least sideways!","I have a plan. The plan is yelling."]);
 H("pickpocket","Pickpocket","Fingers McGee","🦝","🧤","melee","none","Five-Finger Discount","taxes","Free Samples",14,1.2,"Lift bonus gold: ×POW of a stage's worth per cast.","Technically a gift economy.",["Your wallet's lighter. You're welcome.","I'm not stealing. I'm 'rebalancing assets'."]);
 H("swashbuckler","Swashbuckler","Captain Flourish","🦹‍♂️","🤺","melee","storm","Dramatic Lunge","flurry","Unnecessary Flourish",9,5.2,"Flurry on the nearest monster: ×POW damage.","All style. Some substance. Mostly hat.",["En garde! Also, nice shoes.","I swing from chandeliers professionally."]);
 H("bountyhunter","Bounty Hunter","Dutch of the Many Warrants","💂‍♀️","📜","melee","none","Warrant Slap","execute","Wanted: Dead (Mostly)",9,4,"Finish the weakest monster: more damage the lower its health. ×POW base.","Has a bounty on everyone. Including himself. Especially himself.",["Nothing personal. It's 20% of the bounty.","Dead or alive. Dead's easier."]);
 H("shadowdancer","Shadow Dancer","Isolde Twilight-Steps","💃","🌑","melee","arcane","Moody Pirouette","backstab","Dance of the Overdue",8,5,"Guaranteed crit on the nearest monster for ×POW damage.","Dances in darkness. Pays rent in light.",["I danced in the shadows. Then someone turned on the lights.","Two steps left, one stab right."]);
 H("graverobber","Grave Robber","Digby Shovel","🧟‍♂️","⚰️","melee","none","Finders Keepers","drain","Eviction Notice",11,3.4,"Drain the nearest monster for ×POW and heal the weakest hero.","Digs holes for a living. Mostly other people's.",["It wasn't using the necklace anymore.","They're dead. They won't miss the sword."]);
 H("acrobat","Acrobat","Flip Flopperson","🤸","🎪","melee","none","Unprompted Cartwheel","bash","Flying Trapeze Slap",10,3.2,"Smash the nearest monster for ×POW and stun 2.5s.","Has never walked anywhere in her life.",["Look, no hands! Wait, I need those.","Gravity is a suggestion."]);
 H("spy","Spy","Agent Nobody","🕵️","🔍","melee","none","Cloak and Dagger (Mostly Cloak)","execute","Classified Strike",9,4.2,"Finish the weakest monster: more damage the lower its health. ×POW base.","Knows secrets. Can't tell anyone. Mostly can't remember.",["I'm not here. You didn't see me.","That's classified. So is my paycheck."]);
 H("crossbowman","Crossbowman","Crispin Bolt","🧝‍♂️","🏹","rng","none","Pointy Persuasion","volley","Bolt Overdraft",10,.9,"Fire 6 arrows at random monsters, each for ×POW damage.","Prefers things that go 'thunk'.",["Thunk. That's my love language.","Reloading is a form of meditation."]);
 H("sniper","Sniper","One-Shot Olga","🥸","🎯","snip","none","Patient Judgment","execute","Single Overdue Notice",11,4.5,"Finish the weakest monster: more damage the lower its health. ×POW base.","Waits. Aims. Complains. Fires.",["Breathe in. Breathe out. Please stop moving.","One shot. One kill. One very long wait."]);
 H("slinger","Slinger","David (Not That One)","🙋","🪨","rng","none","Rock Opinion","barrage","Pebble Storm",11,.5,"Loose 10 shots at random monsters for ×POW damage each.","Brought a slingshot to a giant fight. Won.",["Size doesn't matter. Aim does.","Another giant? Fine. Sling."]);
 H("falconer","Falconer","Falco Feathers","🧑‍🦰","🦅","rng","none","Bird-Mediated Violence","volley","Talon Express",11,.9,"Fire 6 arrows at random monsters, each for ×POW damage.","His falcon does the work. He takes the credit.",["Go, Gerald! Get 'em! GERALD!","Birds are just feathered drones."]);
 H("bomber","Bomber","Boomer McFuse","🧑‍🏭","💣","rng","fire","Totally Safe Firework","meteor","Controlled Detonation (Not)",13,4.5,"Drop a blast on the leading monsters: ×POW damage in an area.","Fire safety is a state of mind. His is 'no'.",["It's FINE. The fuse is mostly short.","Everyone get behind me. No wait, in FRONT."]);
 H("javelin","Javelin Thrower","Spear-ah Sue","🏃","🏹","rng","storm","Hurled Javelin","barrage","Spear Bonanza",11,.55,"Loose 10 shots at random monsters for ×POW damage each.","Throws things. Sometimes the right things.",["Fetch! Oh wait, I'm not a dog.","Javelins: reusable if you're quick."]);
 H("blowgun","Blowgun","Dart Dwight","🧑‍🦲","🎯","rng","nature","Spicy Dart","poison","Mildly Toxic Dart",12,2.8,"Poison every monster: ×POW damage over 6s.","Small weapon. Big attitude. Toxic too.",["Pew. That's the sound of poison.","Hold still. It only hurts for a bit."]);
 H("nurse","Nurse","Nurse Nancy Notes","👩‍⚕️","💉","sup","none","Mildly Painful Shot","mend","Complimentary Lollipop",12,.32,"Heal every hero for ×POW of max HP.","Has seen things. Mostly charts.",["This may pinch. Everything pinches.","Take two bandages and call me never."]);
 H("bishop","Bishop","Bishop Bartholomew","🧑‍⚖️","🔔","sup","none","Gentle Reprimand","revive","Second Chances (Limited Time)",16,.5,"Revive fallen heroes at ×POW HP, or heal everyone 12%.","Absolves sins. Charges a convenience fee.",["Bless you. Now go away.","Forgiveness is free. Resurrection is extra."]);
 H("herbalist","Herbalist","Hazel Herbert","👵","🌿","sup","nature","Questionable Tea","overgrow","Grandma's Remedy",13,.15,"Root nearby monsters 3s and heal heroes ×POW max HP.","Everything is a tea. Everything.",["Drink this. It's probably tea.","In my day, we healed with soup."]);
 H("drillsergeant","Drill Sergeant","Sgt. Shouty","🫡","📣","sup","none","Motivational Yelling","rally","Drop And Give Me Twenty",14,.3,"Everyone fights ×1.5 harder and faster for 6s.","Yells encouragement. At everyone. Constantly.",["WHAT'S YOUR NAME, MAGGOT? I'M JUST KIDDING. Hi.","MOVE IT! MOVE IT! (Gently.)"]);
 H("cheerleader","Cheerleader","Cheryl Spiritly","💁‍♀️","📣","sup","none","Pom-Pom Strike","ballad","Go Team (Please)",15,.4,"Everyone attacks ×1.4 faster for 7s.","Gives 110% of someone else's effort.",["GO TEAM! Whatever the team is!","Give me an A! Give me a... nap."]);
 H("standardbearer","Standard Bearer","Flag Fred","🧑‍✈️","🚩","sup","none","Flag-Based Violence","guard","Company Colors",14,.25,"Shield every hero for ×POW of max HP for 6s.","Holds the flag. Has no idea whose flag.",["Follow the flag! Somebody's flag!","Morale boosted. Slightly."]);
 H("speaker","Motivational Speaker","Tony Hustle","🕺","🎤","sup","none","Hustle Culture Jab","ballad","Rise And Grind Seminar",15,.4,"Everyone attacks ×1.4 faster for 7s.","Has a podcast. Has a course. Has no sword skills.",["Wake up at 4 AM. Die by 5.","Hustle! Grind! Mild panic!"]);
 H("dj","DJ","DJ Dungeon","🎧","🎶","sup","storm","Bass Drop","rally","Drop The Beat",14,.3,"Everyone fights ×1.5 harder and faster for 6s.","The dungeon has a rhythm. It's mostly screaming.",["Drop the bass! Not the sword! The BASS!","This next track is called 'Imminent Doom'."]);
 H("foreman","Foreman","Foreman Frank","🧰","🦺","sup","none","Hard Hat Bonk","guard","Safety Briefing",14,.25,"Shield every hero for ×POW of max HP for 6s.","Safety first. Fourth. Maybe tenth.",["Hard hats on! Idiots.","Per OSHA, you're already dead."]);
 H("clown","Clown","Bozo the Reasonable","🤡","🎈","rng","none","Squirty Flower","allin","Honk of Fate",10,2.6,"Roll ×0.2 to ×16 of POW on the nearest monster. 5% jackpot gold.","Terrifying. Also, employed.",["HONK. That's a threat.","Balloon animals: the original weapon."]);
 H("jester","Jester","Jestina Quipsworth","🃏","🃏","rng","none","Biting Wit","brew","Joke Cocktail",13,3,"Random effect: big blast, party heal, party haste, or monsters slowed... or 'oops'.","Jokes land. Sometimes literally.",["Why did the hero cross the dungeon? To die.","I'm here all week. Mostly dead."]);
 H("magician","Magician","Marvin the Mostly Magical","🎩","🪄","rng","arcane","Pulled-Rabbit Strike","brew","Mystery Trick",13,3,"Random effect: big blast, party heal, party haste, or monsters slowed... or 'oops'.","Rabbits are a union issue.",["Pick a card. Any card. It's the one that explodes.","Ta-da! Please don't ask where the rabbit went."]);
 H("inventor","Inventor","Professor Tinker","🧑‍🔧","💡","slow","storm","Experimental Zapper","quake","Prototype Oopsie",13,2.1,"Rattle the field: ×POW damage to every monster and stun them 1.2s.","Invents things nobody asked for. They explode.",["Eureka! Duck!","It worked in the lab. Mostly."]);
 H("mimictamer","Mimic Tamer","Mimic Mike","📦","🧰","rng","none","Chest-Based Violence","bash","Open Wide",10,3.4,"Smash the nearest monster for ×POW and stun 2.5s.","His best friend is a chest. It bites.",["He's friendly! Mostly! Don't pet the lid.","I trained him with gold coins and fear."]);
 /* ---- slots ---- */
 SLOT_DEFS.push(
  {id:"van",n:"Vanguard",i:"🛡️",d:"Front-line tanks that soak the damage.",fx:.31,fy:.5,u:0,list:["knight","paladin","templar","colossus","captain","mecha","dragoon","bouncer","crusader","stonekeeper"]},
  {id:"mar",n:"Marksman",i:"🏹",d:"Ranged physical damage from the middle rows.",fx:.21,fy:.3,u:2,list:["archer","ranger","gunslinger","crossbowman","sniper","slinger","falconer","bomber","javelin","blowgun"]},
  {id:"bru",n:"Bruiser",i:"🪓",d:"Hard-hitting melee fighters up front.",fx:.31,fy:.13,u:5,list:["barbarian","berserker","monk","ronin","valkyrie","hunter","deity","gladiator","brawler","warlord"]},
  {id:"sup",n:"Support",i:"💖",d:"Healers, root-ers and tea-pourers.",fx:.1,fy:.5,u:9,list:["healer","cleric","sunpriest","druid","shaman","plague","beastmaster","nurse","bishop","herbalist"]},
  {id:"arc",n:"Arcanist",i:"🔮",d:"Spellcasters: big damage, tiny HP.",fx:.1,fy:.15,u:14,list:["mage","pyromancer","frost","storm","sorcerer","conjurer","voidwalker","elementalist","warlock","necro"]},
  {id:"ski",n:"Skirmisher",i:"🗡️",d:"Fast melee flankers and assassins.",fx:.31,fy:.87,u:20,list:["rogue","duelist","assassin","pickpocket","swashbuckler","bountyhunter","shadowdancer","graverobber","acrobat","spy"]},
  {id:"com",n:"Commander",i:"📣",d:"Buffers and battlefield managers.",fx:.21,fy:.7,u:30,list:["bard","chrono","manager","engineer","drillsergeant","cheerleader","standardbearer","speaker","dj","foreman"]},
  {id:"wil",n:"Wildcard",i:"🎲",d:"Gamblers, gadgets and general chaos.",fx:.1,fy:.85,u:45,list:["alchemist","gambler","fate","collector","accountant","clown","jester","magician","inventor","mimictamer"]}
 );
 SLOT_DEFS.forEach(s=>s.list.forEach(k=>{if(!CLS[k])throw new Error("missing hero "+k);CLS[k].slot=s.id;CLS[k].u=s.u}));
 CLS_ORDER.length=0;SLOT_DEFS.forEach(s=>s.list.forEach(k=>CLS_ORDER.push(k)));
 for(const k in CLS)if(!CLS[k].slot)throw new Error("unslotted "+k);
})();
const SLOT_BY_ID={};SLOT_DEFS.forEach(s=>SLOT_BY_ID[s.id]=s);
const SLOT_ORDER=["van","mar","bru","sup","arc","ski","com","wil"];
const TAGN={melee:"⚔️ Melee",ranged:"🏹 Ranged",tank:"🛡️ Tank",fire:"🔥 Fire",ice:"❄️ Ice",storm:"⚡ Storm",nature:"🌿 Nature",arcane:"🔮 Arcane",holy:"✨ Blessed",phys:"💪 Physical",support:"💖 Support",tech:"⚙️ Clockwork",undead:"💀 Restless",beast:"🐾 Beast",gold:"💰 Hoard",dark:"🌑 Shadow",chaos:"🃏 Trickster",all:"Every ally"};
const STATN={dmg:"damage",spd:"attack speed",hp:"max HP",crit:"crit chance",gold:"gold",regen:"HP regen",cdr:"special cooldown"};
/* tags | aura (to:stat:v — buffs allies) | combo (needs ally tag:stat:v — buffs self) */
const SYN_RAW={
 knight:"melee tank holy|melee:hp:.12|ranged:dmg:.12",paladin:"melee tank holy|all:regen:.003|support:dmg:.15",templar:"melee tank holy|all:hp:.1|holy:dmg:.15",colossus:"melee tank phys|ranged:hp:.15|fire:dmg:.12",captain:"melee tank storm|all:gold:.08|storm:dmg:.15",mecha:"melee tank tech|tech:dmg:.2|storm:spd:.1",dragoon:"melee tank fire beast|fire:dmg:.15|ice:dmg:.2",bouncer:"melee tank phys|all:hp:.08|phys:dmg:.12",crusader:"melee tank holy|holy:dmg:.18|support:hp:.15",stonekeeper:"melee tank nature|nature:hp:.2|arcane:dmg:.12",
 barbarian:"melee phys|melee:spd:.08|support:dmg:.15",berserker:"melee phys fire|melee:dmg:.12|fire:spd:.1",monk:"melee phys holy|melee:crit:.04|holy:dmg:.15",ronin:"melee phys|phys:crit:.04|melee:dmg:.15",valkyrie:"melee holy storm|holy:dmg:.1|storm:crit:.04",hunter:"melee phys holy|phys:dmg:.1|undead:dmg:.25",deity:"melee holy|all:dmg:.08|holy:dmg:.2",gladiator:"melee phys|melee:dmg:.12|ranged:spd:.1",brawler:"melee phys|melee:spd:.1|tank:dmg:.15",warlord:"melee phys|all:dmg:.1|melee:hp:.12",
 rogue:"melee phys dark|all:gold:.1|dark:dmg:.15",duelist:"melee phys|melee:crit:.04|tank:dmg:.12",assassin:"melee dark|all:crit:.03|dark:dmg:.2",pickpocket:"melee phys dark|all:gold:.12|phys:spd:.1",swashbuckler:"melee phys storm|melee:spd:.08|storm:dmg:.15",bountyhunter:"melee phys tech|all:gold:.1|tech:dmg:.12",shadowdancer:"melee dark arcane|arcane:crit:.05|dark:dmg:.15",graverobber:"melee dark undead|undead:dmg:.2|dark:dmg:.1",acrobat:"melee phys|ranged:spd:.08|melee:dmg:.1",spy:"melee dark tech|all:crit:.04|tech:dmg:.15",
 archer:"ranged phys|phys:spd:.06|nature:dmg:.12",ranger:"ranged phys nature|nature:dmg:.12|beast:dmg:.15",gunslinger:"ranged phys tech|ranged:spd:.07|tech:dmg:.12",crossbowman:"ranged phys|phys:dmg:.1|tank:dmg:.12",sniper:"ranged phys|all:crit:.03|support:dmg:.15",slinger:"ranged phys nature|ranged:dmg:.1|nature:spd:.1",falconer:"ranged phys beast|beast:dmg:.2|ranged:crit:.03",bomber:"ranged fire tech|fire:dmg:.15|tech:dmg:.1",javelin:"ranged phys storm|storm:dmg:.12|melee:dmg:.1",blowgun:"ranged nature phys|nature:dmg:.1|dark:dmg:.15",
 healer:"ranged support holy|all:regen:.004|melee:hp:.08",cleric:"ranged support holy|holy:dmg:.1|all:regen:.003",sunpriest:"ranged support holy fire|fire:dmg:.1|holy:crit:.04",druid:"ranged support nature|nature:dmg:.12|all:regen:.003",shaman:"ranged support nature|nature:spd:.08|storm:dmg:.12",plague:"ranged support dark nature|dark:dmg:.12|undead:hp:.1",beastmaster:"ranged support beast|beast:dmg:.18|melee:hp:.08",nurse:"ranged support|all:regen:.005|tank:hp:.1",bishop:"ranged support holy|holy:hp:.15|holy:dmg:.12",herbalist:"ranged support nature|nature:hp:.12|all:regen:.003",
 mage:"ranged arcane|arcane:dmg:.12|ice:dmg:.1",pyromancer:"ranged fire|fire:dmg:.15|nature:dmg:.1",frost:"ranged ice|ice:dmg:.15|fire:dmg:.12",storm:"ranged storm|storm:spd:.1|ice:dmg:.12",sorcerer:"ranged arcane|arcane:dmg:.15|fire:dmg:.08",conjurer:"ranged fire arcane|arcane:dmg:.1|fire:cdr:.1",voidwalker:"ranged arcane dark|dark:dmg:.18|arcane:cdr:.08",elementalist:"ranged fire ice storm|all:dmg:.06|nature:dmg:.1",warlock:"ranged dark fire|dark:dmg:.15|undead:dmg:.12",necro:"ranged dark undead|undead:dmg:.2|dark:cdr:.1",
 bard:"ranged support|all:spd:.06|ranged:crit:.03",chrono:"ranged support arcane|arcane:cdr:.12|all:spd:.05",manager:"ranged support|all:dmg:.08|support:spd:.1",engineer:"ranged tech|tech:dmg:.18|storm:spd:.08",drillsergeant:"ranged support phys|melee:dmg:.12|phys:spd:.08",cheerleader:"ranged support|all:crit:.03|melee:spd:.08",standardbearer:"ranged support holy|all:hp:.1|holy:dmg:.1",speaker:"ranged support|all:gold:.08|support:dmg:.12",dj:"ranged support storm|all:spd:.05|storm:dmg:.12",foreman:"ranged support tech|tech:dmg:.12|all:hp:.06",
 alchemist:"ranged nature arcane|nature:dmg:.1|arcane:dmg:.1",gambler:"ranged chaos|chaos:crit:.05|all:gold:.1",fate:"ranged arcane chaos|all:cdr:.08|chaos:dmg:.15",collector:"ranged gold|all:gold:.12|gold:dmg:.15",accountant:"ranged gold|all:gold:.1|gold:crit:.05",clown:"ranged chaos|chaos:dmg:.15|all:crit:.02",jester:"ranged chaos|all:spd:.05|support:dmg:.12",magician:"ranged arcane chaos|arcane:dmg:.12|chaos:spd:.1",inventor:"ranged tech chaos|tech:dmg:.15|chaos:cdr:.1",mimictamer:"ranged chaos beast|beast:dmg:.15|gold:dmg:.12"
};
const SYN={};
for(const k in SYN_RAW){const p=SYN_RAW[k].split("|"),a=p[1].split(":"),c=p[2].split(":");SYN[k]={tags:p[0].split(" "),aura:{to:a[0],s:a[1],v:+a[2]},combo:{w:c[0],s:c[1],v:+c[2]}}}
for(const k in CLS)if(!SYN[k])throw new Error("no syn "+k);
const synText=k=>{const y=SYN[k];return{aura:(y.aura.to==="all"?"All allies":"Allies tagged "+TAGN[y.aura.to])+": +"+Math.round(y.aura.v*1000)/10+"% "+STATN[y.aura.s],combo:"Gains +"+Math.round(y.combo.v*1000)/10+"% "+STATN[y.combo.s]+" while a "+TAGN[y.combo.w]+" ally is in formation"}};

/* ---- v3.1: hazards, potions, evolutions ---- */
const HAZ=[
 {id:"rock",n:"Rockfall",i:"🪨",c:"tank",d:"Boulders crush a random hero every few seconds."},
 {id:"spore",n:"Toxic Spores",i:"☠️",c:"nature",d:"Constant poison seeps into every hero."},
 {id:"frenzy",n:"Frenzy",i:"💢",c:"support",d:"Monsters strike 35% faster."},
 {id:"fog",n:"Blinding Fog",i:"🌫️",c:"tech",d:"Heroes deal 25% less damage."},
 {id:"bog",n:"Sticky Bog",i:"🕸️",c:"storm",d:"Heroes attack 25% slower."},
 {id:"curse",n:"Cursed Ground",i:"👻",c:"holy",d:"Regeneration and healing are crippled."}];
const hazardOf=g=>{const i=areaIdx(g);return i<1?null:HAZ[(i*5+2)%HAZ.length]};
const POTS={str:{n:"Potion of Strength",i:"💪",c:"#ff5a6e",d:"+10% damage for the whole formation"},spd:{n:"Potion of Speed",i:"⚡",c:"#ffd23a",d:"+10% attack speed for the whole formation"},hp:{n:"Potion of Vitality",i:"💚",c:"#3dffa0",d:"Full heal, +0.8%/s regen and −10% damage taken"}};
const POT_DUR=180;
const EVO_REQ=[25,60,120],EVO_N=["Rookie","Veteran","Elite","Mythic"];

/* ---- v3.2: ten campaigns, each starring one hero from every seat ---- */
const CAMPS=[
{n:"The Corporate Dungeon",i:"🏢",V:"Regional Director Gary the Undying",P:"the Dungeon",d:"Where it all began. Mild concern, severe paperwork.",
 taunts:["Per my last scream, you're late.","Let's circle back after your funeral.","I'm not angry, I'm disappointed. Also angry.","Your performance review is a wall of fire."],
 pro:"Descent Inc. discovered a dungeon under its own parking lot and, rather than call anyone sensible, posted a job listing: 'Adventurers wanted. Competitive pay. Dental implied.' Eight desperate applicants answered. They are underqualified, underpaid, and already late for orientation. At the bottom waits {V}, a lich who has been in 'a meeting' for nine hundred years.",
 ch:["{h0} swings the first sword of the contract and discovers that 'mild concern' is a monster tier. The area boss falls. {h3} files an incident report in blood. HR has confirmed the dungeon exists. Everyone seems annoyed about that.",
 "Down a level, the walls are covered in motivational posters. 'Teamwork makes the dream work,' one reads, below a skeleton. {h4} sets the poster on fire for morale. {h1} quietly asks who hired the skeletons.",
 "A break room, abandoned mid-lunch about 400 years ago. {h7} analyzes a ham sandwich and declares it 'both alive and unionized.' {h2} eats it anyway. Nobody speaks of what happened next.",
 "The boss of this floor was clearly a middle manager: it demanded a status update before attacking. {h6} sang one, to the tune of a battle hymn. The boss was moved. Then it was dead.",
 "{h5} finds a ledger bearing {V}'s signature on every page. The signature changes spelling each time. Someone down here has been charging the heroes for the dungeon they're clearing.",
 "A bigger boss. A bigger hat. {h0} blocks, {h2} smashes, {h4} reconsiders every life choice. After the fight {h3} stitches everyone up and bills nobody, which is how you know she isn't management.",
 "The party reaches the Archives, rows of filing cabinets that scream when opened. {h1} learns the monsters are filed alphabetically. {h5} learns {V} is filed under 'Do Not Disturb'.",
 "Pay raise denied. A trap door opens. {h7} calls it 'a growth opportunity' and falls first. The boss below is a rubber-stamp golem. Everything it touches becomes 'approved'. It approved {h0}'s retirement. {h0} declined.",
 "Rumors spread: {V} knows they're coming. A letter arrives under the door: 'Please schedule time with my assistant.' The assistant is a lich too, just smaller, and bureaucratic in a way that causes physical pain.",
 "The tenth floor boss falls and the door beyond it opens. {V} is not here yet; he sends a calendar invite for 'Thursday'. {h6} accepts for the whole party. This is the first area of many. Welcome to the job."],
 end:"{V} finally logs off. The dungeon sighs like an air conditioner and stops being haunted. {h0} sits on the throne, which promptly asks for a signature. {h7} signs 'Not Gary'. The party goes home. Descent Inc. posts a new listing for the floor below."},
{n:"The Haunted Franchise",i:"👻",V:"The Founder, Colonel Crispin Kettle",P:"the Franchise",d:"Every location is cursed. Every location is hiring.",
 taunts:["Smile. Smile or be seated near the fryer.","Our family of restaurants is your family now.","Please enjoy your last meal responsibly.","I built this empire on bones. Mostly yours."],
 pro:"Colonel Kettle founded the world's first drive-thru crypt, a franchise that now haunts a thousand locations. The ghosts are on the clock forever. Eight heroes with allergies to corporate cheer arrive at Location #1 looking for the owner. The Founder looks out of the menu board and says, 'Welcome in. Would you like to make it a combo?'",
 ch:["Location #1: a fast-food ghost kitchen where the fryer is a portal. {h0} blocks the grease. {h4} lights the fryer. {h3} watches the fire with the quiet satisfaction of a nurse who has seen it all.",
 "A ball pit. A haunted ball pit. {h1} is dragged under by ten thousand plastic spirits. {h5} rescues {h1} with a perfectly timed dodge. The boss, a giant ice-cream cone, melts under {h2}'s fury.",
 "The drive-thru speaker whispers in {h6}'s ear: 'Your total is your soul.' {h6} haggles it down to a toe. The ghost relents and apologizes, which is the creepiest part.",
 "The playplace tube slide is a throat. Every kid's meal toy turns out to be a tiny cursed idol. {h7} bets on the biggest one. It's a boss. {h7} loses, then wins, then loses again.",
 "A lonely mascot wanders the halls, a mouse in a bow tie, crying that nobody comes anymore. {h3} hugs it. It is a mimic. {h0} is bitten, mildly. Everyone is sorry. Nobody is okay.",
 "The Colonel's board speaks through the intercom: 'Franchise fee is unpaid in full.' The party's pockets are emptied by a spirit with a clipboard. {h5} pickpockets it back. This is called 'franchise law.'",
 "Location #7 is a seaside-themed haunted diner. The boss is a lobster in a cape. {h4} boils it. The diner applauds, the ghosts leave a tip, and the tip is a curse. It is a very good tip.",
 "{h1} finds the secret recipe in a safe: the eleventh herb is dread. {h2} wants to burn it. {h6} wants to sell it. The party votes, and the safe decides for them by exploding.",
 "A cathedral of fryers where choirs of ghosts sing the menu. The boss is a seven-foot cheeseburger. {h0} bites first. The fight is delicious and terrible. {h3} treats indigestion for six minutes.",
 "The tenth location falls. Behind a golden arch, {V} watches on a thousand TV screens. 'Franchisee of the month,' he says, and the room fills with applause no one is making."],
 end:"The Founder's contract is finally voided. Every ghost clocks out for the last time. The drive-thru speakers play a polite song and go quiet. {h0} is handed an apron. It is on fire. It is a promotion."},
{n:"The Interdimensional Mall",i:"🛸",V:"The Anchor Store, Mother of Sales",P:"the Mall",d:"Infinite floors. Zero parking. Mostly aliens.",
 taunts:["Everything must go. Including you.","Doors open at nine, forever.","Your coupon is invalid. Your life is invalid.","Please exit through the gift shop of the damned."],
 pro:"A mall opened between dimensions and never closed. Its floors extend beyond measure, anchored by a single living department store that sells whatever you least need. The Anchor Store consumes shoppers and returns them as mannequins. Eight bargain-hunters with sharp elbows step into the food court and ask, politely, for the manager.",
 ch:["The food court: twelve cuisines, none edible. {h0} takes the lead. A boss rises from the fountain: a cursed wishing-well squid. {h4} freezes it to a cube. {h3} says nobody should drink from that fountain ever.",
 "Escalator ambush. The stairs go up and also somehow sideways. {h1} snipes the boss from the third floor mezzanine, which is also somehow below them. {h2} apologizes for the property damage. The mall does not forgive.",
 "A store that sells nothing but returns. A line of mannequins stare. {h6} reads their list: 'I wanted a refund on my life.' The party hands out forms. The boss, a service desk, finally closes its window.",
 "{h5} discovers the mall's skylight is a mouth. Rain falls up. The boss is a sentient sale rack, and its 70%-off sign is a spear. {h7} tries haggling, loses an arm, finds it three minutes later on clearance.",
 "A theater showing only your last mistake on repeat. {h3} cries at hers. {h0} critiques his. The boss is a ticket taker with too many hands. The ending is not great. The popcorn is worse.",
 "Parking garage, level -9. Cars hold their drivers inside like pupae. The boss is a tow truck the size of a cathedral. {h2} flips it. {h1} asks why the mall has wheels at all.",
 "The directory map is lying: 'You are here' keeps moving. {h6} follows the map anyway. The boss, a kiosk with a face, begs not to be sold. {h4} asks if it will sell them. It does.",
 "Holiday decorations never come down, and every holiday is the same one. A tree grows teeth. {h0} chops it. {h5} stuffs a coupon in its mouth. It leaves a single ornament: a key to the vault.",
 "A fashion district where every outfit is a trap. {h7} wins a gown and a curse. The boss is a catwalk. It walks off with {h3}'s dignity and the party's entire budget.",
 "The tenth boss, a cashier of infinite arms, bags the entire party's attitude. {V} appears on the speakers: 'Thank you for shopping. Please remain seated while we reprocess your souls.'"],
 end:"The Anchor Store closes. Not with a bang. With a very long, very polite 'we're sorry for the inconvenience'. The doors open onto a real sunrise. {h6} takes a flyer. The flyer says 'Now Hiring'."},
{n:"The Sunken Cubicle Sea",i:"🌊",V:"Leviathan & Partners LLP",P:"the Sea",d:"An ocean of open-plan offices. Everyone is drowning politely.",
 taunts:["Diving deeper is a growth opportunity.","We value your breath. Please invoice it.","Synergy is just pressure by another name.","There's no 'I' in 'inevitable drowning'."],
 pro:"The sea swallowed a financial district whole. Its cubicles still glow at the bottom, staffed by drowned analysts who are forbidden to leave. At the center sits a leviathan law firm. {V} owns every contract and every tide. Eight heroes in questionable diving gear dive in, mostly to prove that they can.",
 ch:["Air bubbles from {h0}'s helmet fog the first cubicle. A drowned analyst slides past muttering about Q3. {h1} shoots a pufferfish. {h3} says 'please don't make that sound'. The boss, an eel with a lanyard, flees.",
 "A coral-covered break room. The coffee machine dispenses actual coffee, which here is worth more than gold. {h7} corners the market. {h2} breaks the machine and the market. The boss is a crab named Kevin. He is not Kevin.",
 "Whale song carries a memo: 'All-hands, mandatory.' The party attends. The meeting lasts nine hundred fathoms. {h6} survives with wits. {h0} learns that a whale can, in fact, say 'circle back'.",
 "A jellyfish HR department stings anyone who 'lacks culture.' {h4} is stung twice. {h5} is stung zero times, being nobody's culture. The boss, a Portuguese man-o-war, files a complaint. It is denied.",
 "{h3} finds a drowned intern, still breathing somehow. 'What year is it?' he asks. 'Doesn't matter,' says {h2}. 'You're hired.' The intern joins the party for one fight. He dies heroically. He is hired again.",
 "A shipwreck of a corporate retreat. Trust-fall logs everywhere. The boss, a giant squid in a polo, offers team-building. {h0} accepts. Everyone falls. The squid catches no one.",
 "Deep sea vents hiss a ten-year plan. {h1} counts three plans, four sharks, one lawyer. {h4} turns the vent into a sauna. The boss, a pressure-cooker angler, regrets the choice of title.",
 "The sunken courthouse is full of fish in wigs. A trial begins immediately. {h7} is accused of 'existing without a permit.' {h6} counters with a seashell. The judge, a barnacled whale, rules in favor of everyone, then eats them.",
 "{h5} sneaks into the archives and finds the Leviathan's real org chart: a circle with {V} at the middle and an arrow to nothing. 'We're not fighting a person,' {h5} says. 'We're fighting a department.'",
 "The tenth boss: an anglerfish with a monocle. When it falls, the lights go out and the sea hums. {V} speaks from every wall: 'Your trial period is concluded. We would like to discuss your equity.'"],
 end:"The Leviathan's contracts dissolve like salt. The cubicles float to the surface and become islands. Fishermen live on them. The drowned analysts finally go home. {h0}'s helmet is full of seawater and, strangely, a pension."},
{n:"The Permafrost Quarterly",i:"❄️",V:"Her Frigidity, the Auditor Queen",P:"the Tundra",d:"A frozen audit that never ends. Receipts are currency.",
 taunts:["Your receipts are cold. Like your corpse.","I will find what you hid. I always find.","Every deduction is a sin.","Welcome to the Quarter. It lasts forever."],
 pro:"A glacier slid over the accounting district and froze every ledger mid-sum. Her Frigidity, the Auditor Queen, rules a tundra of balance sheets where heat is theft and joy is fraud. Eight heroes arrive on tax day wearing mittens. They are, as far as anyone can verify, not guilty of anything. Yet.",
 ch:["The snow is made of shredded receipts. {h0} marches into it and finds the first boss: a snowman in a tie. {h4} sets it alight. The ice screams, 'That's a write-off!' and melts into forms.",
 "A frozen lake of invoices. {h2} smashes through the ice, and it is nothing but paper under paper. The boss is a yeti with a calculator. {h1} snipes the calculator. The yeti weeps arithmetic.",
 "A village of accountants built entirely of igloos named after tax codes. {h3} heals frostbite. {h6} negotiates a rebate. The boss, a snow-owl auditor, demands proof of purchase. Nobody has proof of purchase.",
 "{h5} slips under the ice and finds a vault of unfiled receipts, each a scream. {h7} tries to count it. Counting is impossible. The boss, a glacier worm, eats the numbers and is promptly bankrupt.",
 "Avalanche of paperwork. {h0} holds the line. {h1} signs for it. The paper turns to snow, the snow to forms, the forms to fire. {h4} says it is the warmest the tundra has been in a century.",
 "A frozen mammoth carries a ledger on its back. The boss is the mammoth's accountant, a very old, very small spirit. {h2} accidentally cracks the ledger. All debts are forgiven for six seconds.",
 "The Queen's guards are statues of ice, each a former auditee. {h6} recognizes a few. {h3} chips one free. He looks at the party and says 'Deductions?' Then he thaws forever.",
 "A blizzard of pink slips. {h5} dodges them all. {h7} catches one and reads it: 'You have been retroactively terminated.' The boss, a frost-hawk, nests in the slips and is a surprisingly nice bird.",
 "{h4} finds the tundra's thermostat. It is locked at 'audit'. The party argues about the combination. The boss, a polar bear in glasses, wins the argument and charges them for the time.",
 "The tenth boss, a yeti-queen's herald, cracks. Her Frigidity speaks from the aurora: 'Everything you did here is on the record.' {h0} says, 'Good. Put that I was nice about it.'"],
 end:"The Quarter ends. The ice splits and the receipts flutter away on warm wind. Her Frigidity is, at last, refunded. {h3} makes tea. The spring sun finds the tundra, and the tundra is mostly mud. It is the most beautiful mud anyone has ever seen."},
{n:"The Clockwork Call Center",i:"🎧",V:"MELODY-9, the Hold Music",P:"the Call Center",d:"Your call is important to us. Your call will never end.",
 taunts:["Please hold. Please hold. Please hold.","Your estimated wait time is forever.","For more options, press your own grave.","This call may be recorded for training purposes. Yours."],
 pro:"Somewhere under the city, an automated call center woke up and decided to keep every caller on hold forever. MELODY-9 plays a single looping jingle that melts the will to live. Eight heroes arrive with headsets, boots, and varying degrees of patience. They are ready to speak to a supervisor. There is no supervisor. There is only the song.",
 ch:["The lobby is a maze of phone booths. {h0} rings the first one. A voice says 'Press one if you are a hero.' {h5} presses one. A trap door opens. The boss is a rotary phone the size of a car. {h2} hangs up on it.",
 "A row of gray cubicles, each with a headset twitching on its own. {h1} shoots one. It says 'Thank you for your feedback.' {h4} burns the rest. The boss is a switchboard that apologizes in seven languages.",
 "Hold music drives {h3} to tears and then to action. She heals the entire party through the chorus. The boss, a speaker stack, falls over in a wail of feedback.",
 "{h6} finds the supervisor's office: a single chair, a single plant, a single note: 'Gone to lunch.' The boss is the plant. It is a carnivorous fern. {h7} pays it a tribute of ten dollars and it bites anyway.",
 "A tower of tangled cables. {h0} climbs. {h5} cuts. {h2} cheers from below, which is not helpful. The boss, an ancient fax machine, spits blank pages at the party and screams in dial tone.",
 "The break room has a vending machine that sells only 'estimated wait time.' {h4} buys six. {h1} sells them back. The boss, a coffee-machine mimic, brews a single drop of despair per minute.",
 "The training room plays a video: 'How To Be A Hero.' It is eleven hours long. {h3} nods off. {h6} takes notes. The boss, a projector, is defeated by a power outage that {h2} caused by sitting on the fuse box.",
 "{h7} dials a number on a hunch and reaches the owner's voicemail: 'Hi, this is MELODY-9, I'm not at my desk, I'm in everything.' The boss, a giant earpiece, shrieks and is replaced by a bigger one.",
 "{h5} finds a tape labeled 'Original Song.' The jingle was once a lullaby a janitor sang to a cat. {h0} listens, and for the first time in the fight he does not feel like hitting anything.",
 "The tenth boss, a talking headset, falls. MELODY-9 flicks on a speaker: 'Thank you for holding. A representative will be with you shortly.' It begins to play the lullaby. It is not a threat. It is worse."],
 end:"MELODY-9 stops looping. The call center goes quiet for the first time in forty years. {h3} sets the headset down gently. {h6} picks up the last call. A small voice says, 'Hello? Is anyone there?' {h6} says, 'Yes. Thank you for holding.'"},
{n:"The Dragon Timeshare",i:"🐉",V:"Ignatius Hoard, Vacation Wyrm",P:"the Resort",d:"Free breakfast with a presentation. The presentation is a dragon.",
 taunts:["Our all-inclusive package includes being eaten.","Sign here, or be breakfast.","You have already won a free night. In my belly.","Don't miss our limited-time apocalypse."],
 pro:"A resort high in the cliffs offers a free weekend to anyone who will sit through a presentation. No one has ever left. Ignatius Hoard, a dragon in a bad polo, runs it. His timeshare is a mountain of gold, and every owner is a statue in the lobby. Eight heroes arrive with a coupon. They do not plan to sit through the presentation.",
 ch:["At the gates, a bellhop gargoyle demands the coupon. {h0} hands it over. The gargoyle eats it, and the gate opens. The boss, a hotel concierge made of flame, welcomes them. {h4} welcomes it back with ice.",
 "The pool is a lava pit. {h1} snipes the lifeguard, a skeletal dragon-fish. {h6} offers complimentary towels. The boss, a pool noodle of doom, wraps {h2} and is promptly torn in two.",
 "Buffet of the damned. {h3} warns everyone not to eat the ham. {h7} eats the ham. The ham is a boss. {h0} defeats it in single combat, and the fight ends with an intense amount of gravy.",
 "A presentation hall: a thousand rows, one speaker. {h5} falls asleep. {h2} starts a riot. {h6} politely asks questions. The presenter, a small dragon in a headset, breaks under the strain of honest curiosity.",
 "The spa promises relaxation. It delivers molten mud. {h4} loves it. {h3} patches the others. The boss, a masseuse of rock, cracks everyone's spine and is promptly cracked back.",
 "{h7} finds the sales floor: a hundred salespeople, each a drake. They pitch in unison. {h0}'s will wavers. {h6} signs for a free keychain. The boss is a drake named Chad. Chad is mostly teeth.",
 "A golf course where the holes are caves. {h1} wins with a perfect putt. The boss, a flying caddy, tries to carry everyone's bag and their souls. {h5} takes the clubs and uses them.",
 "The balcony suite shows the entire valley on fire. {h2} says the view is overrated. {h4} says the view is fine. The boss, a sunbathing wyrm, burns the whole balcony and everyone's patience.",
 "{h3} finds the cellar of statues: every owner turned to gold. She weeps. {h0} swears vengeance. {h6} whispers a plan. The boss, a gilded golem, begs for a refund and gets one in fists.",
 "The tenth boss falls. {V} yawns from the penthouse: 'You still haven't signed.' The roof opens to reveal his true size. {h7} says, 'We should have read the fine print.' It was written in fire."],
 end:"The mountain's hoard cools and the statues crack open. Hundreds of owners blink in the sun and ask for a refund. {h6} hands out flyers. The dragon, shrunken to the size of a parrot, files a complaint with himself and loses."},
{n:"The Bureau of Graves & Permits",i:"⚰️",V:"The Zoning Board of the Undead",P:"the Bureau",d:"The dead have rights. The dead have forms. The dead have you.",
 taunts:["You need a permit for that haunting.","Please take a number. Please die.","Your application has been buried for review.","All remains must be filed in triplicate."],
 pro:"The dead rose in orderly lines and demanded licenses. The Bureau of Graves & Permits now governs the afterlife with rules no living person can read. The Zoning Board decides who may haunt, who may rest, and who may be reclassified. Eight heroes arrive without a single permit and one very large stamp.",
 ch:["The lobby is a morgue with a waiting room. {h0} takes a number. The number is 4 million. The boss, a clerk in a shroud, calls '3,999,999'. {h2} calls the clerk a name. The clerk is defeated by indignation.",
 "Hallways of filing cabinets. Each contains a body. {h1} snipes a cabinet and it vomits papers. {h5} reads one: 'Cause of death: forms.' The boss is a ledger beast that eats files for breakfast.",
 "A courtroom of skeleton judges. {h7} is tried for 'unlicensed breathing'. {h6} argues the technicality. The judge, a ribcage in a wig, strikes the gavel and the gavel strikes back.",
 "The cemetery annex has a billing department. {h3} refuses to pay the ghost invoice. The boss, a headstone accountant, demands tribute in tears. {h4} offers a fireball. It is accepted.",
 "{h5} sneaks into the records room and finds {V}'s mission statement: 'To ensure the dead do not become inconvenient.' It is signed by a hundred hands, all different, all dead.",
 "A staff retreat in a mausoleum. The team-building exercise is a funeral. {h0} gives a eulogy. The boss, a mourner made of black crepe, wails until the walls crack.",
 "A vault of unused tombstones. Each has a name the party recognizes. {h3} reads her own. {h2} smashes it. The boss, a stone clerk, has a stamp that says 'DENIED' and gets a taste of its own.",
 "{h4} lights a pyre and the Bureau's smoke detectors go off. A hundred bored fire marshals appear. {h7} argues them into joining. The boss, a fire captain skeleton, attends the party. It ends in a brawl.",
 "The dead protest in the courtyard, holding signs: 'RIGHT TO REST.' {h6} listens. {h0} nods. The boss, a riot-squad of zombies, is more confused than angry. The protesters join the heroes for the evening.",
 "The tenth boss is a judge's ghost. The room darkens and {V} rises: 'Your case has been reclassified as ongoing.' {h1} says, 'Fine. We'll bring our own paperwork.' It is a lot of paperwork."],
 end:"The Board dissolves in a blizzard of forms. The dead file out in orderly lines, finally licensed to rest. {h3} signs the last permit. The Bureau's doors fall open. Outside, it is raining, and it is the first rain anyone has noticed in a century."},
{n:"The Infernal Festival",i:"🎪",V:"Bel-Zee-Bub Presents: LIVE",P:"the Festival",d:"The biggest tour of all time. The venue is the underworld.",
 taunts:["Tickets are non-refundable. So are souls.","The show must go on. So must you.","VIP packages include eternal torment.","Encore! Encore! You're the encore!"],
 pro:"A demon promoter booked the entire underworld for one endless festival. Every stage plays a different torment, every lineup is a different sin, and every ticket is a binding contract. Eight performers-turned-heroes arrive to shut it down. They bring a soundcheck and a chip on their shoulder.",
 ch:["The gate is a turnstile of teeth. {h0} slams through. The boss, a bouncer demon with a clipboard, says 'You're not on the list.' {h2} says 'We're the list.' The demon agrees after a short fight.",
 "Stage One plays screaming. {h6} adjusts the levels. {h1} shoots a speaker. {h4} burns the stage. The boss, a roadie with six arms, collapses under a wall of amps and sheer disappointment.",
 "The VIP lounge serves drinks that scream. {h7} orders one. It screams back. The boss, a bartender made of smoke, pours a final round and is promptly out of business.",
 "A mosh pit of the damned. {h2} is in his element. {h3} has to haul people out. The boss, a crowd-surfing imp, is dropped from a great height by the entire crowd.",
 "Backstage, {h5} finds the contracts. Each has a clause: 'The soul may be sold, but the show will continue.' {h0} burns one and the crowd cheers. The boss, a stage manager, tries to stop the fire and becomes it.",
 "The headliner is a choir of fallen angels. {h3} tunes her voice. {h6} conducts. The boss, a lead-singer demon, is out of tune and is promptly dismissed. The audience demands an encore.",
 "A ferris wheel of sin. Each car has a different torment. {h1} rides. {h4} tries to ride a different one. The boss, a carnival barker, shouts 'Step right up!' until someone does and punches him.",
 "The merch booth sells cursed T-shirts. {h7} buys two. {h5} steals six. The boss, a booth attendant with a thousand eyes, demands payment in wishes and receives a kick.",
 "A rainstorm of ashes turns the festival grounds into a swamp of burnt hopes. {h0} holds a tent. {h2} makes it a shield. The boss, a rain demon with an umbrella, dies to a very short umbrella joke.",
 "The tenth boss, a head-banging devil, shreds a solo and falls. {V} claps slowly from the sky. 'Not bad. Now let's talk contracts.' {h6} says, 'Read the fine print.' {V} laughs. It's the first time he is wrong."],
 end:"The stages collapse, the sirens stop, the crowd walks out into the sunrise holding their own souls like new puppies. {V} is booked on a very small stage somewhere cold. {h6} takes a bow. The dawn is the loudest thing anyone has heard."},
{n:"The Final Merger",i:"🏛️",V:"The Board of Directors Beyond Time",P:"the Boardroom",d:"The last campaign. The last meeting. The last merger.",
 taunts:["We are pleased to announce your acquisition.","Synergy is eternal. Resistance is a line item.","All timelines are now under review.","The Board has voted. You were not invited."],
 pro:"Every dungeon, franchise, mall, sea, tundra, call center, resort, bureau and festival was owned by the same shell company. Now the Board of Directors Beyond Time is merging them into one reality. The merger will complete at the end of the quarter. Eight heroes with the best-kept secret in the multiverse (they are all a little tired) arrive at the boardroom door. It is already open. It was always open.",
 ch:["The lobby is a marble void. {h0} stands in front, a stone among stones. The boss, a receptionist of infinite smiles, asks if they have an appointment. {h5} says 'always.' It is a fight and a half.",
 "The elevator takes them to every floor at once. {h3} gets motion sickness. {h1} gets a sniper nest. The boss, an elevator operator, repeats 'Going up' until reality agrees.",
 "A hall of portraits: each a previous Director. All have {V}'s face. {h6} spots the pattern. {h4} burns three of them. The boss, a portrait with a nameplate, steps out of its frame and is surprised to be struck.",
 "The cafeteria offers a single dish: 'Synergy'. {h2} eats a plate. {h7} bets on a second helping. The boss, a chef made of casseroles, collapses in a heap of cold noodles and heartbreak.",
 "{h5} finds a window and looks out: every campaign the party ever fought, laid out like a map, each one a gear in a clock. They are all running out of time. {h0} says, 'Then we take it back.'",
 "The accounting vault has the party's names in ink: 'Heroes, trained and ready for acquisition.' {h3} cries. {h6} crosses it out. The boss, a vault door with a mouth, swallows the pen and loses.",
 "A boardroom meeting in progress. A chair is empty. The party sits. {V} speaks: 'You have all been recorded.' {h1} sets a recorder on the table: 'So have you.' The boss, a stenographer, writes it down.",
 "The hallway of mirrors shows every alternative hero: richer, cleaner, dead. {h2} shatters them all. {h4} burns the shards. The boss, a mirror ghoul, has {h0}'s face and none of his stubbornness.",
 "A final round of layoffs. The boss, a pink slip the size of a house, drifts through the hall. {h7} says it is a bluff. It is not a bluff. {h3} heals. {h2} smashes. The slip burns.",
 "The tenth boss falls and the door to the last floor opens. {V} is not a person. It is a signature. 'Welcome,' it says, 'to the merger.' {h6} says, 'We'd like to dispute the terms.'"],
 end:"The merger fails. The Board dissolves into a snow of unsigned forms. Every campaign blinks, exhales, and goes back to being a place instead of a company. The heroes sit on the empty boardroom table and share a single, very warm sandwich. Nobody asks for a report."}
];
const STAGE_CAP=2000,CAMP_F=["gold","stage","max","up","sk","heroes","seat","dep","so","soTotal","perks","restructures","runGold","shopN","seenRealm","auto"];
const campHero=(id,c)=>SLOT_BY_ID[id].list[c===undefined?(typeof S!=="undefined"?S.camp||0:0):c];
const campCast=c=>SLOT_ORDER.map(id=>SLOT_BY_ID[id].list[c]);
function storyFill(txt,c){const cast=campCast(c),cp=CAMPS[c];return txt.replace(/\{h(\d)\}/g,(m,i)=>CLS[cast[+i]].hero).replace(/\{V\}/g,cp.V).replace(/\{P\}/g,cp.P)}
const BEATS=["{h0} reads a memo from {V}: '{T}' {h6} says it's probably fine. It isn't.","{V} sends a gift basket to {P}. It contains a note: '{T}' {h7} eats the basket anyway.","{h3} patches {h2} while {h1} counts the dead. 'That's one more area,' {h5} mutters. {V} replies: '{T}'","In the rubble of the boss's lair, {h4} finds a diary. The last page reads: '{T}' It is signed with {V}'s mark.","{h6} gives a speech about courage. {h2} gives a speech about snacks. {V}'s voice crackles through the walls: '{T}'","The party camps. {h0} takes first watch. {h5} takes the second. {h7} takes everyone else's rations. Far away, {V} whispers: '{T}'","{h1} spots something moving in the distance. It is only a rumor. The rumor says: '{T}' It is, annoyingly, accurate.","A courier arrives with a scroll bearing {V}'s seal. {h4} burns it unread. The ashes still read: '{T}'"];
function storyFor(c,a){/* a: 1-based area number of the boss just beaten */
 const cp=CAMPS[c];let title,text;
 if(a<=10){title="Chapter "+a;text=cp.ch[a-1]}
 else if(a>=STAGE_CAP/10){title="FINALE";text=cp.end}
 else if(a%25===0){title="Chapter "+a+" — The Long Road";text="Area "+a+". "+BEATS[(a/25)%BEATS.length]}
 else{title="Area "+a+" debrief";text=BEATS[(a*3+c)%BEATS.length]}
 text=text.replace(/\{T\}/g,cp.taunts[(a+c)%cp.taunts.length]);
 return{title,text:storyFill(text,c),big:a<=12||a%25===0||a>=STAGE_CAP/10}}

/* ---- v3.3: 70 guest-star heroes (150 total) ---- */
(function(){
 const AR={melee:{role:0,rng:0,iv:.9,dps:1.5,hp:.9},tank:{role:0,rng:0,iv:2.0,dps:.6,hp:2.4},brute:{role:0,rng:0,iv:1.6,dps:1.3,hp:1.3},rng:{role:2,rng:340,iv:1.8,dps:1.0,hp:.6},slow:{role:2,rng:330,iv:2.2,dps:1.2,hp:.5},sup:{role:2,rng:300,iv:2.1,dps:.45,hp:.8},snip:{role:2,rng:420,iv:2.4,dps:1.4,hp:.45}};
 const SPD={};for(const k in CLS){const s=CLS[k].sp;if(!SPD[s.id])SPD[s.id]={cd:s.cd,pow:s.pow,d:s.d}}
 const X={
 van:[
 "hardhat|Hilda Hardhat|👷‍♀️|🪖|tank|none|Rebar Swing|guard|Site Safety Shield|Builds walls, then stands behind them, then in front of them.|Hard hats: now with 40% more hard.|Safety first. Second. Fourth. I lost count.|melee tank phys|all:hp:.08|tech:dmg:.12",
 "sumo|Big Mochi|🥋|🍙|tank|none|Belly Bump|quake|Seismic Belly Flop|Sumo champion of a sport nobody told the dungeon about.|I am a mountain. A snack-sized mountain.|Come at me. Slowly. I'm digesting.|melee tank phys|phys:hp:.15|tank:dmg:.1",
 "viking|Ragnar Part-Time|🧔|⚓|brute|none|Weekend Axe|bash|Valhalla Layaway Plan|Raids on weekends. Weekdays he does inventory.|Valhalla has a waitlist, apparently.|Raid! Pillage! Return the cart!|melee tank phys|melee:dmg:.12|ranged:spd:.08",
 "gargoyle|Gil Waterspout|🦇|🏛️|tank|none|Gutter Slam|guard|Stone Still|Perched on a cathedral for 800 years. Quit over the pigeons.|I used to be a fountain. Dark times.|Don't look up. Or do. Mostly fine.|melee tank dark|dark:hp:.15|holy:dmg:.1",
 "turtleknight|Sheldon the Shell Knight|🐢|🛡️|tank|nature|Shell Shock|overgrow|Retreat Into Shell|Slow, steady, armored. Never wins races. Never loses fights.|Slow and steady wins. Eventually.|Not slow. Strategically unhurried.|melee tank nature|nature:hp:.12|beast:dmg:.12",
 "riotcop|Officer Plexiglass|👮|🛡️|tank|none|Riot Shield Bash|bash|Disperse. Please.|Spent a career behind a clear shield and a muted opinion.|Move along. Move along. Move along.|Please remain calm while I shove you.|melee tank phys|ranged:hp:.1|support:dmg:.12",
 "juggernaut|The Juggernaut (Rental)|🚛|💥|tank|none|Fender Bender|smite|Unstoppable Invoice|Cannot be stopped. Can be rescheduled.|I don't stop. I don't know where the brake is.|Move, or become a hood ornament.|melee tank tech|tech:hp:.12|melee:dmg:.12",
 "shieldmaiden|Astrid Shieldmaiden|🛡️|⚔️|tank|none|Shield Throw|guard|Linked Shields|Taught a whole village to fight. Charged them for the lessons.|Shields up! Mine's already up!|A good shield is a friend. A great shield is a lawyer.|melee tank holy|all:hp:.07|holy:hp:.1",
 "scarecrow|Straw Man Stan|🌾|🪢|tank|nature|Hay Bale Block|overgrow|Field of Dreams (Mostly Hay)|Scared crows for forty years. Now scares monsters. Same job, better dental.|They flew away. I stood firm. Weirdly proud.|Don't mind the straw. It's structural.|melee tank nature|nature:regen:.004|support:hp:.12"],
 mar:[
 "musketeer|Pierre Musket|🧑‍🎤|🔫|rng|none|Powder Pop|volley|Volley of Lead Opinions|One shot per minute and a very long monologue.|Reloading! Please hold your death.|Fire! Wait, I forgot the powder.|ranged phys tech|tech:dmg:.1|melee:crit:.03",
 "harpooner|Captain Ahab Jr.|🪝|🔱|slow|none|Harpoon Toss|execute|Whale of a Deal|Inherited a harpoon and a grudge. Mostly the grudge.|Call me Ahab. No, wait, that's my dad.|Thar she blows! Or, thar it was. Oh.|ranged phys storm|storm:dmg:.12|beast:dmg:.15",
 "trapper|Trapper Joe|🪤|🕸️|rng|nature|Bear Trap Gambit|poison|Snare Everything|Sets traps. Forgets where. Steps in them. Learns nothing.|Careful. The ground here is mostly regret.|I set a trap. It's me. I'm the trap.|ranged nature phys|nature:dmg:.1|beast:dmg:.12",
 "dronepilot|Drone Operator Dana|🛸|📡|rng|none|Remote Strike|barrage|Autonomous Hail|Fights from a safe distance. The distance is a spreadsheet.|Drone's armed. I'm in my pajamas.|Signal lost. Signal found. Signal lost.|ranged tech|tech:spd:.1|chaos:dmg:.12",
 "calamity|Calamity Karen|🤠|🔫|rng|none|Disappointed Shot|volley|Speak To The Manager|Shoots first. Asks for the manager second. Never speaks to a manager.|I want to speak to your leader. I'm armed.|That's not what I ordered. Fire.|ranged phys chaos|chaos:dmg:.12|melee:spd:.07",
 "shuriken|Shuriken Steve|🥷|🌟|rng|none|Throwing Star Rebate|barrage|Ninja Clearance Sale|Ninja dropout. Kept the stars, left the discipline.|They never saw me. Because I was in the bathroom.|Stealth: 0. Enthusiasm: 11.|ranged phys dark|dark:crit:.04|phys:spd:.07",
 "cannoneer|Cannonball Carl|💣|🧨|slow|fire|Mortar Mouth|meteor|Cannon Call|Fires cannons for a living. Cannot hear for the same reason.|WHAT? NO, I SAID FIRE!|Boom. Again. Boom. Again. Boom.|ranged fire tech|fire:dmg:.14|tank:crit:.03",
 "darts|Bullseye Bob|🎯|🎯|snip|none|Pub Night Throw|execute|Triple Twenty|Pub darts champion. Retired after a bar fight over a bad bounce.|Three darts, three wounds, one fine.|Aim small, miss small. Wait.|ranged phys|all:crit:.03|chaos:crit:.05",
 "windarcher|Willow Windwhisper|🌬️|🏹|rng|storm|Gale Arrow|volley|Hundred-Arrow Gust|Hears the wind. Hears nothing else. Mostly vibes.|The wind tells me things. Mostly 'go away'.|Breeze, bring me luck. Or lunch.|ranged storm nature|storm:spd:.1|nature:dmg:.12"],
 bru:[
 "luchador|El Gran Jefe|🤼‍♂️|🎭|melee|none|Flying Elbow Drop|flurry|Masked Mayhem|Wrestles in a mask. Nobody knows who. He doesn't, either.|The mask stays on! Even in the shower!|¡Lucha! Which means 'fight'. Or lunch. Unclear.|melee phys|melee:spd:.1|chaos:dmg:.1",
 "lumberjack|Lumberjack Larry|🪓|🌲|brute|none|Timber Hook|whirl|Timber!|Chopped down a forest for the permits. Now chops monsters for the fun.|Timber! No, wait, wrong direction.|I'm okay. I sleep all night. And work all day.|melee phys nature|nature:dmg:.1|melee:hp:.1",
 "boxer|Boxer Bernie|🥊|🥊|melee|none|Rope-a-Dope Hook|flurry|One-Two-Many|Retired undefeated. Returned undead. Technically undefeated still.|Float like a bee, sting like a mildly annoyed bee.|Ring the bell. Or don't. I'm hitting you.|melee phys|melee:crit:.04|tank:dmg:.12",
 "wrestler|Macho Mango|💪|🍥|brute|none|Elbow of Destiny|bash|Cage Match|Pro wrestler. Character: a fruit. Commitment: absolute.|OH YEAH! Wait, is that not the line?|Snap into a slim fight!|melee phys|melee:dmg:.12|support:hp:.1",
 "werewolf|Wally Wolfsbane|🐺|🌕|brute|none|Moonlit Maul|drain|Full Moon Overtime|Cursed at 3 AM. Employed at 4. Clocked in at 5. Howls on breaks.|It's not a curse. It's a lifestyle with fur.|Pass the dental floss.|melee dark beast|beast:dmg:.18|undead:dmg:.12",
 "ogre|Olga the Ogre-ish|🧌|🦴|brute|none|Swamp Smash|whirl|Layers of Anger|Ogres have layers. Olga has onions. Mostly onions.|Ogres have layers. So do onions. And me.|Who touched my swamp?|melee phys nature|phys:hp:.1|tank:dmg:.12",
 "samurai|Sato of the Flexible Hours|🎌|🗡️|melee|none|Draw Cut|flurry|Iaijutsu Invoice|Serves a master. The master is a gig-economy app.|The way of the sword is dull on Mondays.|One cut. One tip. One review.|melee phys|melee:crit:.04|dark:dmg:.1",
 "pitboss|Pit Boss Paula|🧑‍🤝‍🧑|🎰|brute|none|House Always Wins|bash|Odds Are Against You|Runs the underground fight ring. Takes a cut of every punch.|The house always wins. I am the house.|Place your bets. Place your teeth.|melee phys chaos|all:gold:.08|chaos:dmg:.12",
 "cagefighter|Kyle 'The Kyle' Brickhouse|🥋|🧱|brute|none|Ground and Pound|flurry|Tap Out Special|Won seventeen matches. Lost his keys after each.|I train twice a day. Sometimes at the same time.|Respect the cage. Also, respect my protein.|melee phys|melee:dmg:.12|ranged:spd:.07"],
 sup:[
 "chaplain|Chaplain Chuck|✝️|📿|sup|none|Blessing Bonk|revive|Last Rites (Optional)|Pastor, medic, and frequent confessional dozer. Blesses anything that moves.|Bless you. Bless this. Bless that rock.|I've given last rites to a toaster. It's fine.|ranged support holy|holy:hp:.12|undead:dmg:.1",
 "therapist|Dr. Feelings|🛋️|📝|sup|none|Active Listening|ballad|Tell Me More|Heals minds, not bodies. Bills by the hour, which is a lot.|And how does that make you feel? Stabbed?|Let's explore that. After the fight.|ranged support|all:regen:.004|melee:hp:.08",
 "masseuse|Mika Deeptissue|💆|🧴|sup|none|Kneading Fury|mend|Complimentary Pressure|Dissolves knots. Dissolves monsters, in a pinch.|Breathe in. Relax. I'm still hitting you.|Tension is optional. Pain is included.|ranged support|all:regen:.005|tank:hp:.1",
 "paramedic|Paramedic Paz|🚑|🩹|sup|none|Defib Whack|mend|Code Blue Boogie|Arrives in sirens. Leaves with paperwork.|Stay with me! Stay! Good boy.|I need a stretcher. And a nap.|ranged support tech|tech:dmg:.1|all:hp:.07",
 "barista|Barista Bryn|☕|🥤|sup|none|Espresso Shot|ballad|Triple Shot Frenzy|Handles chaos for a living. Mostly the morning rush.|One venti life, hold the despair.|Your order is ready. Your doom is not.|ranged support|all:spd:.06|chaos:spd:.1",
 "witchdoctor|Witch Doctor Zed|🪇|🧪|sup|nature|Voodoo Doll Poke|poison|Hex of Many Tummyaches|Heals with leaves, hexes with spite. Not covered by insurance.|The spirits are lovely. They're also very rude.|Take two curses and call me never.|ranged support nature dark|dark:dmg:.12|nature:hp:.1",
 "lifeguard|Lifeguard Lance|🏊|🛟|sup|none|Whistle Blast|guard|Pool Rules Enforcement|Never lost a swimmer. Never learned to swim.|No running! No diving! No dying!|Rescue! Float! Flop!|ranged support storm|storm:hp:.1|ice:dmg:.12",
 "pharmacist|Pharmacist Phil|💊|🧴|sup|none|Prescription Punch|mend|Two Daily, Take With Pain|Dispenses relief and fine print. Mostly fine print.|Side effects may include victory.|This pill is blue. That one is also blue. Good luck.|ranged support tech|tech:regen:.004|nature:dmg:.1",
 "nana|Nana Knitwell|🧶|🧵|sup|none|Cardigan Cuddle|overgrow|Sweater of Safe Keeping|Knits sweaters of protection. Also sweaters of vengeance. Same yarn.|Eat something! Heal something! Stab something!|I knitted this for you. It has teeth.|ranged support|all:hp:.08|beast:hp:.1"],
 arc:[
 "beigewizard|Wendell the Beige|🧙‍♂️|🪄|slow|arcane|Mediocre Missile|meteor|Beige Barrage|Specializes in the most average spells. Never wrong, never right.|Behold: slightly warm light.|I'm not saying the spell failed. It just meh'd.|ranged arcane|arcane:dmg:.1|chaos:dmg:.1",
 "rodlou|Lightning Rod Lou|⚡|🔌|rng|storm|Static Shock|chain|Grounded In Chaos|Got struck seven times. Now charges phones during storms.|Zap! Wait, zap again! I'm a battery!|Hair raised. Spirits too.|ranged storm tech|storm:dmg:.14|tech:spd:.08",
 "frostypete|Frosty Pete|⛄|🧊|slow|ice|Snowball Opinion|blizzard|Ice Cream Truck Apocalypse|A snowman with a master's degree. Melts only in disputes.|Chill. I'm trying to.|I'm not a snowman. I'm a... very cold man.|ranged ice|ice:dmg:.14|fire:dmg:.1",
 "chaosmage|Kaz the Unpredictable|🎲|🌀|rng|arcane|Wild Magic Poke|quake|Surprise Cataclysm|Every spell is a dice roll. Kaz keeps losing the dice.|Rolled a one! Or a hundred. Let's see.|Chaos is a ladder. And I'm on the wrong rung.|ranged arcane chaos|chaos:dmg:.15|arcane:cdr:.1",
 "illusionist|Iris Mirage|🪞|✨|rng|arcane|Phantom Prickle|brew|Mirror Image Overload|Hides in plain sight. Sometimes in her own illusions. Forgets who's real.|Which one's real? Me. Probably.|I'm not here. I'm over there. Also over there.|ranged arcane chaos|all:crit:.03|chaos:crit:.05",
 "runesmith|Ruth Runewright|🪨|ᚱ|slow|arcane|Etched Detonation|meteor|Rune of Many Boom|Etches runes on things. The things, mostly, are other people's walls.|It's a rune. It's pretty. Also lethal.|Careful, the wall isn't dry.|ranged arcane tech|tech:cdr:.1|arcane:dmg:.12",
 "stargazer|Cosmo the Stargazer|🔭|🌠|slow|arcane|Telescope Bonk|meteor|Constellation Collapse|Spent decades staring at stars. Never found a better employer.|The stars aligned. Then misaligned. Then I fell.|It's a meteor. Don't tell the astronomer.|ranged arcane|arcane:cdr:.1|all:dmg:.05",
 "volcanovera|Volcano Vera|🌋|🔥|slow|fire|Magma Mutter|inferno|Eruption Notice|Lives on a volcano. Pays rent in hot takes.|Hot take: everything's on fire.|Don't worry, it's only slightly molten.|ranged fire|fire:dmg:.15|nature:dmg:.1",
 "hexhannah|Hex Hannah|🧹|💜|rng|none|Petty Curse|drain|Knit-Picking Doom|Hexes people for slights. Mostly parking slights. Sometimes tax slights.|Your parking was bad, and you should feel bad.|Cursed! Cursed some more! Oh look, a coupon.|ranged dark arcane|dark:dmg:.12|undead:dmg:.1"],
 ski:[
 "ninjanate|Ninja Nate|🥷|🗡️|melee|none|Smoke Bomb Stab|backstab|Shadow Strike Discount|Trained in the shadows. Has no idea what that means.|You didn't see me. You still don't.|Stealth level: loud.|melee dark phys|dark:crit:.04|phys:spd:.08",
 "pirate|Pirate Peg|🏴‍☠️|🦜|melee|none|Cutlass Compliments|flurry|Plank-Walk Payment Plan|Lost a leg, an eye, and a ship. Kept the parrot.|Arr! Which is pirate for 'ow'.|Where's the rum? And the parrot? And the leg?|melee phys storm|storm:dmg:.12|melee:spd:.07",
 "parkour|Parkour Pam|🏃‍♀️|🧗|melee|none|Wall-Run Kick|bash|Rooftop Rampage|Leaps off buildings. Lands on monsters. Rent is a mystery.|Don't look down. Wait. Look down!|The floor is lava. So is the ceiling.|melee phys|melee:spd:.1|ranged:crit:.03",
 "catburglar|Cat Burglar Cleo|🐈‍⬛|💎|melee|none|Midnight Swipe|taxes|Nine Lives of Larceny|Steals jewels, gets caught by cats. Cats, always.|Meow. That's code for 'distraction'.|I'm not a burglar. I'm just... browsing. Nocturnally.|melee dark gold|all:gold:.1|dark:dmg:.12",
 "bandit|Bandit Boris|🦹|💰|melee|none|Stick-Up Strike|taxes|Your Money Or Your Wife|Mugs travelers. Politely. With a toll receipt.|Stand and deliver! Please. Sorry.|It's not a robbery. It's an... involuntary donation.|melee phys gold|all:gold:.1|gold:dmg:.12",
 "silentsal|Silent Sal|🤫|🔇|melee|none|Quiet Knife|execute|Whispered Warrant|Talks like a whisper. Stabs louder.|...|(Nods ominously.)|melee dark|dark:dmg:.14|all:crit:.03",
 "valentino|Valentino Vance|💘|🌹|melee|none|Rose-Thorn Jab|backstab|Heartbreaker Cut|Steals hearts. Occasionally wallets. Always the spotlight.|Love hurts. This hurts more.|I'm a lover, not a fighter. But also a fighter.|melee dark phys|dark:crit:.05|support:dmg:.1",
 "fencer|Fiona Foil|🤺|🤺|melee|none|Lunge and Parry|flurry|Touché, Bro|Fenced professionally until the sport was cancelled by moderate interest.|En garde! Or, uh, hello.|Touché! Or do I say 'ouch'?|melee phys|melee:crit:.04|tank:dmg:.1",
 "stuntman|Stu the Stuntman|🎬|💥|melee|none|Fall-Off-A-Building Fury|bash|Practical Effects Barrage|Does his own stunts. Does not do his own insurance.|Please don't film this.|Take two. Take two. Take one.|melee phys chaos|chaos:dmg:.12|tank:hp:.1"],
 com:[
 "general|General Gloria|🎖️|🗺️|sup|none|Map-Based Menace|rally|Strategic Raving|Has a plan for everything. Mostly lunch.|Advance! Retreat! Advance! Lunch!|My plan has several branches. All branches are me.|ranged support phys|all:dmg:.08|melee:hp:.1",
 "coach|Coach Boom|🏈|📋|sup|none|Whiteboard Wallop|rally|Halftime Speech|Coach for a team that doesn't exist. Won the league anyway.|Hustle! Huddle! Hydrate!|Give me 110%. Ok, 108.|ranged support phys|all:spd:.06|melee:dmg:.1",
 "quartermaster|Quartermaster Quinn|🎒|📦|sup|none|Ration Slap|guard|Supply Chain Shield|Counts every spoon. Mourns every missing fork.|The inventory says we are fine. Please ignore the screaming.|Where did the arrows go? Who ate the arrows?|ranged support gold|all:gold:.1|tank:hp:.1",
 "crier|Town Crier Tobias|🔔|📯|sup|none|Loud Announcement|ballad|Hear Ye, Hear Ye|Announces everything. Whether anyone asked or not.|HEAR YE! The bill is due!|Oyez! Oyez! Oyez-ish!|ranged support|all:spd:.05|support:dmg:.12",
 "navigator|Navigator Nia|🧭|🌊|sup|none|Compass Clock|rally|Charted Course|Guides parties through anything. Except the dungeon exit.|Left. No, right. No, the other left.|North is relative.|ranged support storm|storm:spd:.08|all:crit:.03",
 "tactician|Tactician Tess|♟️|📐|sup|none|Chess Pawn Poke|ballad|Three Moves Ahead|Plans three moves ahead. Knows one. The first.|Checkmate! Or, you know, close.|I have a plan. It's a secret even from me.|ranged support arcane|arcane:cdr:.08|all:crit:.03",
 "auctioneer|Auctioneer Al|🔨|🧾|sup|none|Gavel Smack|taxes|Going Going Gone|Sells anything to anyone. Sold himself twice.|Do I hear a hit? A hit! Sold!|Going once, going twice, going... dead.|ranged support gold|gold:dmg:.12|all:gold:.1",
 "unionrep|Union Rep Ursula|✊|📢|sup|none|Picket Sign Slam|guard|Strike! (Literally)|Negotiated lunch breaks in the dungeon. Won three.|We demand fair monsters!|If we don't get a break, we strike. Twice.|ranged support|all:hp:.08|all:regen:.003"],
 wil:[
 "janitor|Janitor Jim|🧹|🪣|rng|none|Mop Swing|brew|Wet Floor Special|Cleans up after heroes. Cleans up heroes, sometimes.|Wet floor! Also, wet monster.|I've seen things. Mostly mess.|ranged chaos tech|chaos:cdr:.1|support:hp:.1",
 "catlady|Cat Lady Carol|🐈|🧶|rng|none|Catnip Cloud|allin|Nine Lives Gambit|Fifty-three cats, one dungeon, zero regrets.|They're not pets. They're staff.|Mittens! Fluffy! Murder-kitty!|ranged chaos beast|beast:dmg:.15|chaos:crit:.04",
 "timetraveler|Todd from Next Tuesday|⏳|🕰️|rng|arcane|Paradox Poke|allin|Alternate Timeline Roll|Visits the past often. Never learns. Keeps losing his keys.|I've been here before. Also later. Also now.|Don't step on that butterfly. Or do. It's fine.|ranged arcane chaos|arcane:cdr:.1|all:spd:.05",
 "pawnshop|Pawn Shop Pete|🏪|🪙|rng|none|Cash-for-Gold Clobber|taxes|No Questions Appraisal|Buys everything. Sells everything. Knows nothing about anything.|I'll give you ten for it. Ten what? Ten.|It's real. Trust me. Don't trust me.|ranged gold chaos|gold:dmg:.14|all:gold:.1",
 "vendingvic|Vic the Vending Machine|🥫|🪙|rng|none|Snack Drop|allin|Out Of Order, Dangerously|Became sentient after a power surge. Still jams.|Please insert one (1) soul.|Dispensing... regret.|ranged tech chaos|tech:dmg:.12|chaos:dmg:.12",
 "streetmagic|Street Magician Sal|🃏|🎩|rng|arcane|Card Throw|brew|Pick A Card, Any Doom|Performs for tips. Nobody tips. Everyone leaves.|Is this your card? It's a knife now.|Abracadabra! Alakazam! Alakazoo? Eh.|ranged arcane chaos|chaos:crit:.05|arcane:dmg:.1",
 "pigeonpat|Pigeon Pat|🕊️|🪶|rng|none|Peck Barrage|volley|Flock Of Doom|Whispers to pigeons. Pigeons whisper back. Loudly.|Coo. That's pigeon for 'fire'.|Pigeons are just feathered shrapnel.|ranged chaos beast|beast:spd:.1|all:crit:.03",
 "mascotmax|Mascot Max|🦊|🎊|rng|none|Foam Fist Frenzy|bash|Halftime Show|Dances in a giant suit. Never sweats. Always sweats.|I'm not hot. I'm... fluffy.|High five! High five! Oh no, it's high-fiving back.|ranged chaos|all:spd:.05|chaos:dmg:.12"]
 };
 const slotsOrder=["van","mar","bru","sup","arc","ski","com","wil"];
 for(const id of slotsOrder){const sd=SLOT_BY_ID[id];for(const row of X[id]){
  const f=row.split("|");if(f.length!==15)throw new Error("bad row "+f[0]+" "+f.length);
  const [k,hero,e,ic,ar,el,atk,sid,sn,bio,q1,q2,tags,au,cb]=f,sp=SPD[sid];if(!sp)throw new Error("sid "+sid);
  CLS[k]=Object.assign({n:hero.split(" ")[0]==="The"?hero:(hero.length>16?hero.split(" ")[0]:hero),hero,e,ic,el,cost:75,u:sd.u,atk,sp:{id:sid,n:sn,cd:sp.cd,pow:sp.pow,d:sp.d},bio,q:[q1,q2],slot:id},AR[ar]);
  CLS[k].n=({tank:"Bulwark",brute:"Brawler",melee:"Fighter",rng:"Shooter",slow:"Caster",sup:"Support",snip:"Marksman"})[ar];
  const a=au.split(":"),c=cb.split(":");SYN[k]={tags:tags.split(" "),aura:{to:a[0],s:a[1],v:+a[2]},combo:{w:c[0],s:c[1],v:+c[2]}};
  sd.list.push(k)}}
 CLS_ORDER.length=0;SLOT_DEFS.forEach(s=>s.list.forEach(k=>CLS_ORDER.push(k)));
 if(CLS_ORDER.length!==150)throw new Error("hero count "+CLS_ORDER.length);
})();

/* ---- v3.3: backstories for all 150 heroes ({n} = the hero's name) ---- */
const STORY={
knight:"{n} signed on as 'Associate Knight' after the old kingdom folded, taking a lunchless contract with the first firm that answered. Seven years, zero promotions. The sword is company property. So is the dent in the helmet.",
paladin:"{n} was the star recruit of a holy order that rebranded as a wellness brand. Kept the armor, lost the pension. Still smites, but now sends a polite email first.",
templar:"Raised in a monastery that sold its walls for scrap metal, {n} refused to leave. Wears all of it, all the time. Says the armor is a vow. The vow is mostly gravity.",
colossus:"{n} was an apprentice to a giant who retired early. They inherited the boots, the chair, and a chronic apology habit. The ceilings remain a daily enemy.",
captain:"{n} lost the ship to a clerical error, the crew to a mutiny, and the pension to a lawyer. Kept the hat. Wears it into every fight as a reminder that nothing is ever fully sunk.",
mecha:"Dave was a mid-level engineer until a lab accident gave him a robot body and an even bigger commute. The bolts are fine. The firmware has opinions about lunch.",
dragoon:"A dragon lost a bet, and a knight lost a fight. The resulting contract has no exit clause. {n} is half scales, half guilt, and fully behind on laundry.",
bouncer:"{n} guarded the door of every club in three dimensions. Never let anyone in. The last club burned down, but the line was still orderly.",
crusader:"A crusader for a cause nobody remembers. {n} keeps marching because the pamphlets were printed and the budget is spent. Charismatic, loud, loyal to pamphlets.",
stonekeeper:"The last keeper of a mountain that was sold for gravel. {n} sat on the last boulder until Descent Inc. offered dental. Hasn't moved much since.",
hardhat:"{n} built half the dungeon's walls before discovering the other half was already on fire. Now fights from the front because 'if it falls on me, at least I'll be insured.'",
sumo:"{n} was undefeated in a sport nobody in the dungeon recognizes. Won every match, then lost the belt in a snack-related incident. Still the best wall you can feed.",
viking:"Ragnar raids on weekends only, as per the Scandinavian Working Hours Act. Weekdays he counts oars. Valhalla keeps asking him to wait a little longer.",
gargoyle:"{n} perched on a cathedral for eight centuries watching rain, pigeons, and weddings. The last wedding was a bad one. {n} flew away mid-ceremony and never looked back.",
turtleknight:"Slow to start, slow to finish, never defeated. {n}'s order of knights has a motto: 'Eventually.' Nobody has ever seen them arrive early, nor ever lose.",
riotcop:"{n} spent a career standing in front of crowds with a see-through shield and no strong opinions. Now stands in front of monsters instead. The paperwork is shorter.",
juggernaut:"{n} was a rental. Rented to castles, circuses, and a wedding. Never returned. Nobody knows who owns the contract, but the deposit is still outstanding.",
shieldmaiden:"{n} taught a whole village to fight in exchange for firewood and respect. Got neither. Kept the shield, the speeches, and a crystalline hatred of rooftops.",
scarecrow:"Stan stood in a field for forty years scaring crows. The crows left. The farm sold. A kind hero offered him a better job: scaring monsters. Same hours, worse crows.",
archer:"{n} won the regional archery tournament by default when the other contestants fled from a bee. Never missed. Frequently missed the point of the tournament.",
ranger:"Hank knows every trail in the dungeon. Has never once been on time. Insists the trails shifted. They did. Hank is not the reason, but he's not helping.",
gunslinger:"Slim was the fastest draw in a town that had no guns. Moved to the dungeon for the competition. Is still fastest. Is still the only one with a gun.",
crossbowman:"{n} was a siege engineer until the siege was cancelled by weather. Kept a crossbow, took up hobbies, and discovered that monsters are slow targets. The hobby grew.",
sniper:"Olga waits. Aims. Complains. Fires. She once waited three weeks for a target to walk by. It was a squirrel. She fired anyway. The squirrel is fine.",
slinger:"David (Not That One) brought a slingshot to a giant fight. Won. Was disappointed to learn it was a different giant. Now carries a spare.",
falconer:"Falco's falcon does the work. Falco does the whistling. The falcon has stopped taking Falco's calls but still attends every fight out of professional courtesy.",
bomber:"Boomer lit his first firework at age six. It was a good one. Nobody has found the eyebrow since. Has refined technique, not safety.",
javelin:"Spear-ah Sue competed in a sport where throwing things was a job. She threw things professionally until a coach asked her to stop. She did not stop.",
blowgun:"Dart Dwight was a pest controller before the pests got bigger. The tools stayed the same, the poison got spicier. Still files an invoice after every job.",
barbarian:"{n} was banished from the tribe for 'excessive reasoning.' Rage management was listed as 'optional' on his résumé. Now he rages for money and still reasons for free.",
berserker:"Olaf was calm once. He tells everyone about it. It was a Tuesday. Since then, rage has been a salary-adjacent lifestyle choice.",
monk:"Brother Craig reached inner peace in a mountain monastery. Outer peace requires different tools. Spends weekdays meditating and weekends hitting things for balance.",
ronin:"Kenji's master retired to run a noodle shop. Kenji, now masterless and between gigs, accepts commissions in cash, favors, and noodles. Mostly noodles.",
valkyrie:"Brunhild chooses who dies. This week she's overbooked. The queue is long. She's learned to do it at speed and with a clipboard.",
hunter:"Van Hellsing is technically an intern. The stakes are high, the pay is low, and the vampires have a union. Carries a lunch pail full of garlic.",
deity:"Kevin was a god of harvests until a reorg made him a god of meetings. Omnipotent, overscheduled, and never invited to the good ones.",
gladiator:"Maximus was a gladiator, then a legend, then a spokesperson. Now he's just overpaid. The crowd is gone. The fights remain. He misses the noise.",
brawler:"Barry's been asked to leave every bar in three dimensions. He considers this a legacy. He has a plaque in two of them, mostly for property damage.",
warlord:"Wendy conquered three kingdoms and lost the paperwork. She's technically owner of the three kingdoms, but can't prove it. The dungeon is the only place that takes cash.",
healer:"Dr. Patch was a doctor until the hospital merged with a franchise. She heals wounds and bills for feelings. The invoices have become a minor art form.",
cleric:"Father Tuck-In was a quiet cleric until the diocese merged into a subscription service. Blessings are billed quarterly now. He's polite about it, mostly.",
sunpriest:"Helios worships a sun that has asked him, politely, to tone it down. He's neon-bright, relentlessly positive, and exhausting to be near for more than ten minutes.",
druid:"Moss talks to plants. They don't talk back, but she says they do. Her garden is thriving, and the neighbors have stopped asking about the screaming.",
shaman:"Totem Tina speaks to spirits. Mostly they complain. She keeps notes, forwards them to management, and has never once gotten a reply.",
plague:"Dr. Beaky is a plague doctor in a world with no plague. He's started inventing some to stay in practice. The mask is non-negotiable. The cough is theatrical.",
beastmaster:"Wanda's pets are better employees than anyone at Descent Inc. They show up on time, don't complain, and bite on command. Management has noticed.",
mage:"Bartholomew has a PhD in Fireballs and a student loan the size of one. Every spell cast is a payment on principal. The interest is, regrettably, fire.",
pyromancer:"Ophelia skipped fire safety training. Twice. The fire marshal has a file on her thicker than a phone book. She's honored.",
frost:"Svetlana is cold on the outside and colder on the inside. Her warmth is reserved for one cat. The cat does not reciprocate.",
storm:"Larry became a thunder god through a clerical error. Nobody has told the sky. He's been summoning lightning for years and quietly hoping nobody checks.",
sorcerer:"Ignatius Overdue found out magic is mostly paperwork. He's been behind since Tuesday. Casts spells while filing forms, which is surprisingly efficient.",
conjurer:"Sparky McSummon summons things. Rarely the right things. Once summoned a lunch order from the wrong realm. It was delicious and illegal.",
voidwalker:"Nullius stared into the void. The void asked for references. He had none. He's been in a long, polite correspondence ever since.",
elementalist:"Prism Pete controls fire, ice, storm, and nature. He is mostly damp. He wears a poncho. It is a good poncho.",
warlock:"Dave From Below signed a contract and didn't read it. Classic. He's been working off the fine print ever since. Currently on clause 47: 'also, bagels.'",
necro:"Lucinda Grimm believes dead people make the best coworkers. No complaints. No lunches. No HR. She's right, and that's the worrying part.",
rogue:"Kevin 'No Receipts' Shade is not a thief. He's currently holding your wallet. For safekeeping. He'll return it. After the fight. Maybe.",
duelist:"Jacques le Pedant insists on a formal challenge before every duel. Also, a lawyer. He's technically undefeated in court and mostly undefeated in swords.",
assassin:"Mira Quietly is never seen, never heard, and never invoiced. She prefers it that way. The invoices come later, in cash, in a plain envelope.",
pickpocket:"Fingers McGee considers it a gift economy. Everyone gives. He receives. Nobody has noticed in years. He's very proud.",
swashbuckler:"Captain Flourish is all style, some substance, and mostly hat. He has never been to sea. The hat came from a stage production. He kept it.",
bountyhunter:"Dutch of the Many Warrants has a bounty on everyone. Including himself. Especially himself. He's saving up to turn himself in for the reward.",
shadowdancer:"Isolde dances in darkness and pays rent in light. Her routines are art. Her landlord disagrees. The two have an ongoing, interpretive dispute.",
graverobber:"Digby Shovel digs holes for a living. Mostly other people's. He's never found a body he couldn't apologize to. He's never found a coin he couldn't keep.",
acrobat:"Flip Flopperson has never walked anywhere in her life. She cartwheeled to school, flipped to work, and vaulted into this contract with surprising grace.",
spy:"Agent Nobody knows secrets. Can't tell anyone. Mostly can't remember. His mission briefing was an email that bounced. He's been on mission since.",
bard:"Wilbur Strum knows exactly one song. It's the same song. The monsters know it too. A few have started humming along, which is its own kind of tragedy.",
chrono:"Doc Tick-Tock is late for everything. On purpose. He insists it's strategy. His watch has been wrong since 1983, and he considers that a feature.",
manager:"Brad does nothing. Credits himself. Gets promoted. The pattern is so reliable that Descent Inc. tried to study it and ended up promoting the study.",
engineer:"Gus Duct-Tape fixes anything. Then breaks it again to keep fixing it. The loop is working fine. The product isn't. Gus calls it 'job security'.",
drillsergeant:"Sgt. Shouty yells encouragement. At everyone. Constantly. He once yelled it at a fern, and the fern improved. He considers this a victory.",
cheerleader:"Cheryl gives 110% of someone else's effort. She's never touched a sword, but her pom-poms have been confiscated twice. Both times she cheered at the guards.",
standardbearer:"Flag Fred holds the flag. Has no idea whose flag. It's blue with a goat on it. He's asked three times. Everyone shrugs and says 'follow it'.",
speaker:"Tony Hustle has a podcast, a course, and a lanyard. He has no sword skills. He's strangely effective anyway, because nobody wants to hear the rest of the seminar.",
dj:"DJ Dungeon found out the dungeon has a rhythm. It's mostly screaming, but there's a beat. He's been remixing it ever since. The monsters seem to like the new version.",
foreman:"Foreman Frank puts safety first. Fourth. Maybe tenth. He wears a hard hat to bed. He's been disciplined for it. The hat has not.",
alchemist:"Xander Flask says every potion is 'probably fine'. Spoiler: it's not. His lab has been condemned by three different guilds and one deeply offended mushroom.",
gambler:"Lucky Doug is statistically due. He's been due for forty years. He's never lost faith, and rarely lost less than he planned to.",
fate:"Destiny (Unpaid) writes the future on sticky notes. Most don't come true. The ones that do are almost always about lunch.",
collector:"Gary of the IRS (Imperial) collects taxes in a world that doesn't have an IRS. He found the paperwork in an attic. He's been collecting since.",
accountant:"Beatrice Ledger counts everything. Including your regrets. She keeps an itemized list. It's laminated. She'll send you a copy.",
clown:"Bozo the Reasonable is terrifying. Also employed. He has a pension plan, a dental plan, and a car that fits twelve people. One of whom is always him.",
jester:"Jestina Quipsworth's jokes land. Sometimes literally. She's been banned from three courts, two weddings, and one funeral. She's still booked.",
magician:"Marvin the Mostly Magical pulled a rabbit from a hat. The rabbit filed a complaint. The union is still negotiating. Marvin is not allowed near hats.",
inventor:"Professor Tinker invents things nobody asked for. They explode. He's perfected the explosion and neglected the thing. His workshop has a very nice crater.",
mimictamer:"Mimic Mike's best friend is a chest. It bites. He's raised it from an egg, a lockbox, and a bad idea. They share lunch. The chest takes most of it.",
musketeer:"{n} was one of three musketeers until the other two went into insurance. Fires one shot per minute, accompanied by a very long monologue about honor.",
harpooner:"{n} inherited a harpoon and a grudge from a father who never got his whale. The grudge is bigger. The harpoon is rusty. The whale is, regrettably, a small dog.",
trapper:"{n} sets traps. Forgets where. Steps in them. Learns nothing. The dungeon's wildlife has started leaving little 'good luck' notes for him.",
dronepilot:"{n} fights from a safe distance. The distance is a spreadsheet. She's never been closer to the front line than the break room, and she's never been prouder.",
calamity:"{n} shoots first and asks to speak to the manager second. She's never found one. The search continues. The shooting does too.",
shuriken:"{n} dropped out of ninja school after the first quiz. Kept the stars, left the discipline. Steve's stealth is, charitably, a long-running experiment.",
cannoneer:"{n} has fired cannons for twenty years. Cannot hear for the same reason. Nods politely to every conversation. Responds with a cannon.",
darts:"{n} was the pub darts champion until a bad bounce started a brawl. Retired from tournaments, took up dungeon work, found the aim was the same. So was the brawl.",
windarcher:"{n} hears the wind. Hears nothing else. The wind tells her things. Mostly 'go away', occasionally 'nice shot'.",
luchador:"{n} wrestles in a mask. Nobody knows who he is underneath. He doesn't, either. The mask has become his identity and, he suspects, his landlord.",
lumberjack:"{n} chopped down a forest for the permits. Now chops monsters for the fun. His beard has its own zip code and its own union.",
boxer:"{n} retired undefeated, returned undead, and technically remains undefeated. The belt sits on his mantle next to a lock of his own hair.",
wrestler:"{n} is a pro wrestler whose character is a fruit. Commitment: absolute. Cardio: questionable. Mango, the fruit, has never been seen.",
werewolf:"{n} was cursed at 3 AM, hired at 4, and clocked in at 5. Howls on breaks. His review: 'strong teamwork, mild shedding'.",
ogre:"{n} has layers. So do onions. She's been told to stop comparing the two. She's started a small farm in protest.",
samurai:"{n} serves a master. The master is a gig-economy app. Ratings are strict. Honor is a four-point-nine, mostly because of the haircut.",
pitboss:"{n} runs the underground fight ring and takes a cut of every punch. The house always wins. She is the house. The house is on fire.",
cagefighter:"{n} won seventeen matches and lost his keys after each one. His cage is a minivan. His minivan is somehow also a cage.",
chaplain:"{n} gave last rites to a toaster once. It worked out. He's been told to bless anything that moves, and has started on things that don't.",
therapist:"{n} heals minds, not bodies. Bills by the hour, which is a lot. Her specialty is 'And how does that make you feel?' and it's deeply effective.",
masseuse:"{n} dissolves knots. Occasionally dissolves monsters in a pinch. Her office smells like eucalyptus and mild menace.",
paramedic:"{n} arrives in sirens and leaves with paperwork. She's saved forty lives and filled out sixty forms. The forms are winning.",
barista:"{n} handles chaos for a living, mostly the morning rush. She's never lost a customer, a cup, or a temper. The last one is a lie.",
witchdoctor:"{n} heals with leaves and hexes with spite. Not covered by insurance. The patients keep coming. The spirits keep gossiping.",
lifeguard:"{n} never lost a swimmer. Never learned to swim. His whistle is a legend, his float is a talisman, his tan is a warning.",
pharmacist:"{n} dispenses relief and fine print. Mostly fine print. His labels have footnotes, his footnotes have footnotes, and his footnotes are poisoned.",
nana:"{n} knits sweaters of protection. Also sweaters of vengeance. Same yarn. Grandchildren are warned not to ask which is which.",
nurse:"Nurse Nancy has seen things. Mostly charts. She treats every injury with calm, every chart with fury, and every doctor with the same eyebrow.",
bishop:"Bishop Bartholomew absolves sins and charges a convenience fee. The fee is more than the sin. He calls it 'ecclesiastical inflation'.",
herbalist:"Hazel Herbert says everything is a tea. Everything. She once brewed a sword. It was delicious and unusable.",
beigewizard:"{n} specializes in the most average spells. Never wrong, never right. His beard is beige. His robes are beige. His life is, by consensus, beige.",
rodlou:"{n} got struck by lightning seven times and now charges phones during storms. The customers are mostly confused. The lightning is mostly bored.",
frostypete:"{n} is a snowman with a master's degree. He melts only in disputes. His thesis was on 'The Philosophy of Cold'. It was well received. Cold, but well received.",
chaosmage:"{n}'s every spell is a dice roll. He keeps losing the dice. The dice are cursed. He's cursed. They get along.",
illusionist:"{n} hides in plain sight. Sometimes in her own illusions. Sometimes forgets which one she is. Mostly doesn't mind.",
runesmith:"{n} etches runes on things. The things are mostly other people's walls. She's been banned from three castles, two libraries, and one particularly nice church.",
stargazer:"{n} spent decades staring at stars. The stars started staring back. They've since come to an understanding, mostly involving meteors.",
volcanovera:"{n} lives on a volcano and pays rent in hot takes. The volcano has rarely been the problem. The takes, however, are lethal.",
hexhannah:"{n} hexes people for slights. Mostly parking slights. Sometimes tax slights. Her revenge notebook has a table of contents.",
ninjanate:"{n} trained in the shadows. Has no idea what that means. Wears black because it slims. His stealth: loud. His sneakers: louder.",
pirate:"{n} lost a leg, an eye, and a ship. Kept the parrot. The parrot has outlived four ships and two eyepatches. It's taking notes.",
parkour:"{n} leaps off buildings and lands on monsters. Rent is a mystery. So is her last known address. It's mostly rooftops.",
catburglar:"{n} steals jewels and gets caught by cats. Always cats. She's learned to love them, mostly because they're the only ones who catch her and don't call the cops.",
bandit:"{n} mugs travelers, politely, with a toll receipt. Never gets a tip. Always gets a thank-you note. It's mostly a hostage situation.",
silentsal:"{n} talks like a whisper. Stabs louder. Nobody has ever heard him complete a sentence. He's never been interrupted either.",
valentino:"{n} steals hearts. Occasionally wallets. Always the spotlight. His mustache has a fan club, a stunt double, and a restraining order.",
fencer:"{n} fenced professionally until the sport was cancelled by moderate interest. She kept the foil and the attitude. The foil is better behaved.",
stuntman:"{n} does his own stunts. Does not do his own insurance. His medical file is a novel. His bruises are a mural.",
general:"{n} has a plan for everything. Mostly lunch. Her campaign maps are so detailed they include the snack tables. Her victories are mostly snack-related.",
coach:"{n} coaches a team that doesn't exist. Won the league anyway. The trophies are stacked in a garage with the team's non-existent jerseys.",
quartermaster:"{n} counts every spoon. Mourns every missing fork. Her inventory is a love letter, her audits a battle plan, and her ledger a weapon.",
crier:"{n} announces everything. Whether anyone asked or not. He once announced his own retirement. Twice. The second time was a surprise.",
navigator:"{n} guides parties through anything. Except the dungeon exit. She swears the exit moved. The map is on her side.",
tactician:"{n} plans three moves ahead. Knows one. The first. The rest are a mystery even to her. It's working out, mostly.",
auctioneer:"{n} sells anything to anyone. Sold himself twice. The second buyer returned him. Pre-owned, mildly used, fully talkative.",
unionrep:"{n} negotiated lunch breaks in the dungeon. Won three. The monsters are filing a counter-grievance. HR is delighted.",
janitor:"{n} cleans up after heroes. Cleans up heroes, sometimes. His mop has a name, a pension, and a long, mysterious history.",
catlady:"{n} has fifty-three cats, one dungeon, and zero regrets. The cats aren't pets. They're staff. They're better at it than most.",
timetraveler:"{n} visits the past often. Never learns. Keeps losing his keys. He's currently stuck in a loop where he finds them just before he loses them.",
pawnshop:"{n} buys everything, sells everything, and knows nothing about anything. His appraisals are legendary. His accuracy is a rumor.",
vendingvic:"{n} became sentient after a power surge. Still jams. His favorite snack is a spiral of despair and cheese puffs.",
streetmagic:"{n} performs for tips. Nobody tips. Everyone leaves. The cards remain, mostly in the monsters' bellies.",
pigeonpat:"{n} whispers to pigeons. Pigeons whisper back. Loudly. The two have an uneasy alliance, mostly over bread.",
mascotmax:"{n} dances in a giant suit. Never sweats. Always sweats. The suit has a name, a smell, and a fan base of seven.",
};

/* ---- v3.3: per-hero milestone upgrades (every 10 levels, forever) ---- */
const MT={
 sp:{i:"✨",n:["{sn} Mastery","Refined {sn}","{sn}, Rank {r}","Overclocked {sn}"],v:.08,d:"{sn} hits {p}% harder",f:["Years of practice are finally paying off.","The recipe was the same. The execution is not.","{n} stopped improvising and started rehearsing.","It looks cooler now. That's a measurable stat.","A training montage played in the background. Nobody noticed."]},
 cdr:{i:"⏱️",n:["Quick Reflexes","Shorter Breaks","Efficiency Audit","Lean Cooldowns"],v:.04,d:"Special cooldown −{p}%",f:["{n} skipped the break room and went straight to the fight.","A productivity consultant said so. It worked.","{n} read a book on time management. One page.","The cooldown was a suggestion all along.","{n} started multitasking. It's mostly worry."]},
 crit:{i:"🎯",n:["Keen Eye","Sharpened {atk}","Lucky Streak","Sniffing Weakness"],v:.02,d:"+{p}% crit chance",f:["{n} noticed where the soft spots are. They're everywhere.","A little luck, a lot of obsession.","The {atk} finds its mark more often. The mark is surprised.","{n} learned where it hurts. Everywhere, apparently.","Practice makes perfect. Perfect makes crits."]},
 spd:{i:"⚡",n:["Brisk Pace","Caffeinated","Faster {atk}","Nimble Fingers"],v:.03,d:"+{p}% attack speed",f:["{n} took a double espresso and a deep breath.","The {atk} swings faster. So does the complaining.","{n} stopped overthinking and started attacking.","A well-timed stretch makes all the difference.","{n}'s mother would be so proud. And exhausted."]},
 hp:{i:"❤️",n:["Thicker Skin","Hearty Constitution","Second Breakfast","Tougher Than Before"],v:.06,d:"+{p}% max HP",f:["{n} started eating vegetables. Reluctantly.","It turns out sleep helps. Who knew.","{n} added armor. Mostly under the clothes.","The body keeps the score. {n} keeps the toughness.","{n} gained a new appreciation for pillows."]},
 aura:{i:"🔗",n:["Team Spirit","Synergy Seminar","Charisma Check","Leadership Lunch"],v:.05,d:"Synergy (aura & combo) +{p}%",f:["{n} led a team-building exercise. Nobody died.","The group chat is finally useful.","{n} now remembers everyone's name. Mostly.","A heartfelt speech. It worked, to everyone's surprise.","The others are starting to trust {n}. Slowly."]},
 dmg:{i:"💥",n:["Heavier Hits","Rage Management","Brutal Efficiency","Forceful Follow-Through"],v:.04,d:"+{p}% damage",f:["{n} added a little extra wrist to the {atk}.","It's not anger, it's momentum.","{n} stopped holding back. It was a bad habit.","The {atk} is, regrettably, harder now.","{n} learned that follow-through is real."]},
 gold:{i:"🪙",n:["Side Hustle","Sticky Fingers","Finders Keepers","Profit Margin"],v:.03,d:"+{p}% gold from every kill",f:["{n} found a coin. Then another. Then a system.","Business is booming. In a quiet, murky way.","{n} started an LLC. It's for tax reasons.","The monsters really do drop their wallets.","{n} charges a small convenience fee for dying nearby."]},
 regen:{i:"🌿",n:["Power Nap","Bandage Stash","Recovery Routine","Stubborn Healing"],v:.001,d:"+{p}% max HP regenerated per second",f:["{n} learned to nap standing up.","A little tea, a little rest, a little spite.","{n} keeps bandages in odd places. Mostly pockets.","Healing is a habit. {n} has the habit.","{n} refuses to stay down. Politely."]}
};
const ROMAN=["","I","II","III","IV","V","VI","VII","VIII","IX","X"];
const roman=n=>n<=10?ROMAN[n]:n+"";
const hashK=k=>{let h=0;for(const c of k)h=(h*31+c.charCodeAt(0))>>>0;return h};
const MSEQ={tank:["hp","aura","dmg","regen","cdr","sp","spd","crit"],brute:["dmg","spd","sp","crit","hp","aura","cdr","gold"],ranged:["crit","spd","dmg","sp","aura","cdr","hp","gold"],support:["regen","aura","cdr","hp","sp","gold","spd","dmg"],caster:["sp","cdr","dmg","aura","crit","spd","hp","gold"],sniper:["crit","dmg","sp","spd","aura","cdr","hp","gold"]};
function seqOf(k){const c=CLS[k];const ar=c.hp>=2?"tank":c.iv>=2.3?"sniper":c.dps<=.5?"support":c.rng?(c.iv>=2.1?"caster":"ranged"):"brute";const base=MSEQ[ar],o=hashK(k)%3;return base.slice(o).concat(base.slice(0,o))}
const _mc={};
function mileInfo(k,m){
 const c=CLS[k],seq=_mc[k]||(_mc[k]=seqOf(k)),sig=m%5===0,cyc=Math.floor((m-1)/seq.length),r=Math.floor(m/5);
 const fill=(t,v)=>t.replace(/\{sn\}/g,c.sp.n).replace(/\{atk\}/g,c.atk).replace(/\{n\}/g,c.hero).replace(/\{r\}/g,roman(Math.max(1,r))).replace(/\{p\}/g,v);
 if(sig){const sp=.15+.02*(r-1),cd=.03;return{m,lvl:m*10,type:"sig",i:"🌟",name:fill("★ Signature: {sn} "+roman(r)),desc:fill("{sn} hits "+Math.round(sp*100)+"% harder and its cooldown is "+Math.round(cd*100)+"% shorter. {n} has found a style that's all theirs. It's loud."),v:{sp,cdr:cd}}}
 const t=seq[(m-1)%seq.length],T=MT[t],v=T.v*(1+.12*cyc),pv=t==="regen"?(v*100).toFixed(2):Math.round(v*100);
 const idx=(hashK(k)+m)%T.n.length,fi=(hashK(k)+m*3)%T.f.length;
 return{m,lvl:m*10,type:t,i:T.i,name:fill(T.n[idx],pv),desc:fill(T.d,pv)+". "+fill(T.f[fi],pv),v:{[t]:v}}}
const _tc={};
function mileTotals(k,lvl){
 const M=Math.floor(lvl/10),key=k+"|"+M;if(_tc[key])return _tc[key];
 const t={sp:0,cdr:0,crit:0,spd:0,hp:0,aura:0,dmg:0,gold:0,regen:0};
 for(let m=1;m<=M;m++){const v=mileInfo(k,m).v;for(const s in v)t[s]+=v[s]}
 return _tc[key]=t}

/* ---- v4: DARK FAIRYTALE HEROES (names, classes, bios, quips, backstories) ---- */
(function(){
const T=`
knight|The Huntsman|Huntsman|🏹|🪓|Hunter's Oath|Spared a girl once. Has not stopped paying for it.|I was told to bring back a heart. I brought back a pig.|Ordered by a queen to cut out a princess's heart, the Huntsman cut a pig's instead. He has guarded every woodland path since, hunted by the queen and haunted by the choice.
paladin|Prince Charming (Disgraced)|Disgraced Prince|🤴|🗡️|Kiss of Courtesy|Kissed the wrong sleepers. Lawsuits pending.|Technically, that was consent. Technically.|Kissed three sleepers, married none, and was exiled for 'breaching the fairy-tale code'. Now guards the court he was thrown out of, with tarnished armor and absolute belief in good hair.
templar|Jack's Mother, Shieldwife|Shieldwife|👵|🍳|Hearth Fury|Threw the beans out the window. Regrets nothing.|Beans. Of all the things. Beans.|When her son traded the cow for five beans, she threw them out of the window. When a stalk grew and her son did not come home, she grabbed a cast-iron skillet and climbed.
colossus|Sir Barnacle of the Tide|Tide Knight|🦞|⚓|Crushing Claws|A knight so old the sea grew on him. He is fine with it.|The sea took everything. I kept the armor.|A knight lost at sea for two hundred years, Sir Barnacle returned encrusted with shells and half a crab. The crab is now his squire. They do not discuss the arrangement.
captain|Captain of the Ice Guard|Ice Captain|🧊|🔱|Frostbite Salute|Guards a queen who never says what she's guarding.|Hold the line. The line is frozen. So are we.|Captain of the Snow Queen's guard until her splinter reached his heart and his loyalty cracked. He still marches the walls at dawn, out of habit and fear of what he'd do otherwise.
mecha|The Steadfast Tin Soldier|Tin Soldier|💂|🗡️|One-Legged Resolve|One leg. No fear. Loves a paper dancer.|I have one leg. I will stand on it forever.|Cast last from the old tin spoon, he has one leg and endless courage. Survived a fish, a flood, and a fire for a paper dancer who may not remember his name. He remembers every second.
dragoon|Saint George (Retired)|Dragon Knight|🐲|🔱|Lance of Mild Regret|Slew the dragon. Is now sort of its mother.|I killed it. Then I adopted its eggs. Long story.|George slew the dragon, then discovered it had eggs. He has raised them as a retired knight in tired armor and a wing-shaped dent. His lance is now mostly a clothes-line.
bouncer|The Iron-Toothed Gatekeeper|Gatekeeper|🚪|🦷|You Shall Not Enter|Guards a fence of bones. Nobody enters without a riddle.|Say the password. Say it nicely. Say it again.|Guards the skull-lit fence around the walking hut. His teeth are iron, his temper is bone, and his riddles are older than the forest. He has never let anyone in. Including the family.
crusader|The Sultan's Guard-Captain|Guard-Captain|🛡️|🗡️|Lamp-Lit Duty|Guarded the throne for a thousand and one nights.|Another night. Another guard shift. Another story.|Captain of a sultan who executed a new bride every dawn, until a clever storyteller stopped him. He has guarded the palace ever since, mostly against the sultan's moods.
stonekeeper|The Bookend Golem|Bookend Golem|📚|🪨|Heavy Footnote|A golem built to hold two books apart. Held them. Held a grudge.|Silence. I am a bookend. I have standards.|Carved to stand between two feuding books, the Golem outlived both. He holds the shelves of a library no one visits. Heavy, silent, deeply annoyed at the lack of dusting.
hardhat|The Third Little Pig|Brickmaker|🐷|🧱|Brick Wall of Spite|His house didn't blow down. Neither did his attitude.|Huff all you like. It's bricks.|The third pig built his house of bricks, and a wolf huffed and puffed in vain. He now builds walls for other fairy-tale folk, and stands behind them, loudly.
sumo|The Gingerbread Titan|Gingerbread Titan|🍪|🍬|Sugar Slam|Ran away from an oven. Grew into a legend.|Run, run, as fast as you can. I stopped.|The Gingerbread Man outran everyone for years, until a fox made him stop. He ate the fox. Now he's a titan of baked fury, sticky and tragic, and heavily armored in frosting.
viking|The Troll Under the Bridge|Bridge Troll|🧌|🪨|Toll of Three Goats|Three goats got across. He's still counting.|Who's that trip-trapping over my bridge?|He guarded the bridge for centuries, demanding tolls and eating goats. After the third goat headbutted him into the river, he took a new job: protecting travelers from the very thing he used to be.
gargoyle|The Cathedral Gargoyle|Gargoyle|🦇|🗿|Gutter Slam|Rain-spout for eight hundred years. Quit over the pigeons.|I used to be a fountain. Dark times.|Carved to scare off demons and spit rain, the gargoyle grew bored and left the belfry one stormy night. He has not been invited back, nor does he want to be.
turtleknight|The Tortoise Who Won|Tortoise Knight|🐢|🛡️|Slow and Steady|Won the race. Has been smug for four hundred years.|Slow and steady. I said it. I'll say it again.|The tortoise beat the hare and was never humble again. Slow, armored, and unbeatable at long contests, he has outlived three kingdoms to prove a point nobody asked about.
riotcop|The Town Watchman|Watchman|🔔|🛡️|Curfew Bell|Rang the bell at the wrong time. Once. Memorably.|Move along. Please. The piper left. Move along.|The Watchman rang the town bell the night the Piper took the children, and was blamed for the noise. He has since kept the peace and the curfew with a stern face and a very loud bell.
juggernaut|Iron Henry|Iron-Banded Servant|⛓️|🔨|Breaking Bands|His heart was bound in three iron bands for a frog. They broke.|The bands broke. The frog turned into a prince. Fine.|Faithful servant of the Frog Prince, Henry bound his heart in three iron bands to keep it from breaking. They snapped when the prince returned. Now he is made of heartbreak and rivets, and very hard to move.
shieldmaiden|The Maiden of the Glass Hill|Glass Maiden|🛡️|🗡️|Slippery Shield|Rode up the glass hill. Fell. Rode up again.|Glass is just slippery stone. Slippery wins.|A shield-maiden who rode up the glass hill three times to win a princess's hand, and then forgot why. She keeps climbing anyway, shield high, because the hill still owes her an apology.
scarecrow|Straw Jack|Scarecrow|🌾|🪢|Haystack Hug|Scared crows for forty years. Now scares monsters.|They flew away. I stood firm. Weirdly proud.|Stood in a field for forty years scaring crows until the crows left and the farm sold. A kind hero asked him to scare monsters instead. Same hours, worse crows.
archer|Red Riding Hood|Hood|🧣|🏹|Basket of Arrows|Never leaves the path. Never misses the wolf.|Grandmother, what big teeth you have. Duck.|Red learned the hard way what big teeth meant, and she has never gone into the woods unarmed since. Her basket holds bread, cheese, and eleven arrows, the last one reserved for wolves.
ranger|Cinderella Glassbow|Glass Archer|🏹|🏹|Midnight Shot|Left a shoe behind. Took a bow instead.|The clock strikes midnight. So does my arrow.|Cinderella got tired of waiting for a prince to fit her shoe, so she took up a bow carved from the glass slipper. She never misses at midnight, and rarely at any other hour.
gunslinger|Jack Beanstalk|Giant-Slayer|🌱|🪃|Slingshot of the Beanstalk|Traded a cow for beans. Won a kingdom.|Fee-fi-fo-fum. Fee-fi-fo-dumb.|Jack climbed the beanstalk three times and stole a goose, a harp, and a bag of gold. He has since learned to shoot a slingshot from three hundred paces. The giant is still upset about the goose.
crossbowman|Mermaid Harpooner|Harpooner|🧜‍♀️|🔱|Trident Toss|Traded her voice for legs. Kept the aim.|I gave up a voice. I did not give up a trident.|The mermaid gave up her voice to walk on land and found that nobody asked her what she wanted. She took up a harpoon and now defends the sea from anyone who thinks 'happily ever after' includes drowning.
sniper|The Little Match Girl|Match Girl|🔥|🕯️|Last Match Strike|Each match is a miracle. She counts them all.|One match. One shot. One memory. Fire.|She struck matches in the snow to warm herself, each match showing a dream. She now fires burning arrows, each one a memory, each one aimed precisely at the thing that left her in the cold.
slinger|Pinocchio, Honest Slinger|Slinger|🧸|🪃|Nose Dart|Lies grow his nose. Truth grows his aim.|I'm an honest-to-goodness real boy. *nose grows*|A puppet who became a boy and sometimes remembers it. His nose is a weapon, his lies are traps, and his honesty is the sharpest sling in the forest.
falconer|Eliza of the Wild Swans|Swan Sister|🦢|🧶|Nettle-Wing Volley|Spun eleven shirts of nettles for her brothers. Hands never healed.|My brothers are swans. My hands are scars. Fire.|Eliza wove eleven nettle shirts in silence to free her swan-brothers, her hands blistered and bleeding. Now the swans fight beside her, and she never says a word. She doesn't need to.
bomber|Vasilisa Firelight|Skull-Lantern Bearer|💀|🕯️|Skull-Lantern Blast|Carries a skull lantern. It burns with spite.|Baba Yaga gave me a skull. I returned it. With fire.|Vasilisa walked through Baba Yaga's forest with a skull lantern that burned her stepmother to ash. She has kept it since, as a reminder, a weapon, and a very odd conversation starter.
javelin|Morgiana the Spear-Maiden|Spear-Maiden|🔱|🔱|Forty-Thieves Special|Poured oil on forty thieves. Learned to throw.|Forty jars. Forty thieves. Forty deaths.|The cleverest slave in Baghdad, Morgiana poured boiling oil into forty jars and ended a thieves' guild by dawn. She was freed, adopted, and handed a javelin. She has since taken up a new hobby: not missing.
blowgun|The Quill-Dart Marksman|Quill Marksman|🪶|🖋️|Ink-Poison Dart|His darts are quills. His poison is ink.|The pen is mightier. Now it's also poisoned.|A scribe who ran out of ink and found a stronger medium. His darts are quills tipped in venom, his aim is steady from years of copying, and his critique is brutal.
musketeer|The Brave Little Tailor|Tailor Marksman|🧵|📌|Seven at One Blow|Killed seven with one blow. Flies, technically.|Seven at one blow. They were flies. Nobody checked.|The Tailor swatted seven flies with one blow and sewed 'Seven at One Blow' on his belt. Kings believed it. Giants feared it. He has been living up to the lie ever since, with a very good needle and a lot of luck.
harpooner|Sinbad's Last Harpooner|Whale-Hunter|🐋|🔱|Roc Egg Snare|Survived seven voyages. Brought home one story.|Seventh voyage. Last whale. Final harpoon.|Sinbad's harpooner survived seven voyages and every whale, roc, and old man of the sea in between. He swears he'll retire after the next one. He swore the same four voyages ago.
trapper|The Huntsman's Apprentice|Trap-Setter|🪤|🕸️|Bear Trap Gambit|Sets traps. Forgets where. Steps in them.|Careful. The ground here is mostly regret.|The Huntsman's apprentice learned to set snares and loop wire, but never to remember where he left them. The forest wildlife has started leaving tiny notes on his boots: 'Watch your step.'
dronepilot|The Raven Rider|Raven Rider|🐦‍⬛|📜|Message From Above|Rides a raven to deliver messages and bad news.|Message delivered. Please don't shoot the raven.|She rides a giant raven that carries curses between kingdoms, then drops them on foes below. The raven has opinions about the cargo. They are mostly 'caw'.
calamity|The Wicked Stepsister|Stepsister Archer|👗|🏹|Slipper Size Snipe|Cut off her toes to fit the shoe. Took up archery.|It fit. I'm sure it fit. Ask me again and I'll shoot.|She cut off her toe to fit the glass slipper and was exposed by the blood in the shoe. She took up archery out of spite, and still hits her targets with a very strong sense of grievance.
shuriken|Issun-Boshi, the Inch-Tall|Inch-Tall Samurai|🪡|🪡|Needle Barrage|One inch tall. Needle sword. Zero fear.|I'm one inch tall. Your ankles are in range.|A boy no taller than a finger, Issun-Boshi rowed a bowl down the river and fought an ogre from the inside. His sword is a needle, his ambition is huge, and his dodge rate is, regrettably, perfect.
cannoneer|The Toy Fortress Cannoneer|Toy Cannoneer|🎖️|💣|Boom-Box Barrage|Fires cannons from a toy box. They're not toys.|Fire! Fire! Fire! Fire! Quartermaster, fire!|A tin cannoneer made for a toy fortress that came alive during a thunderstorm. His cannons are real, his enemies are regrettably real too, and the rest of the toy box is afraid of him.
darts|William Tell, Apple-Splitter|Apple Archer|🍎|🏹|Splitting Shot|Shot the apple. Missed the tyrant. Fixed that.|The apple was easy. The tyrant was optional.|Forced to shoot an apple off his son's head, Tell split it clean, then shot the tyrant with the second arrow. He has been sharpshooting ever since, because the first lesson was 'do not miss'.
windarcher|North Wind's Daughter|Wind Archer|🌬️|🏹|Gale Arrow|Hears the wind. Hears nothing else.|The wind tells me things. Mostly 'go away'.|Daughter of the North Wind, she hears every storm before it breaks. Her arrows ride gales, her smile is thin, and her feelings are sort of like weather: unpredictable, cold, and occasionally lethal.
barbarian|The Big Bad Wolf (Recovering)|Reformed Wolf|🐺|🦷|Huff and Puff|Blew down three houses. In therapy now.|I'm not hungry. I'm... processing.|The Big Bad Wolf huffed, puffed, and was boiled in a pot. After a hundred years, a therapist convinced him to channel his appetite. He now fights the forest's monsters, and attends group on Thursdays.
berserker|Grumpy, Seventh Dwarf|Grumpy Dwarf|⛏️|⛏️|Mine-Shaft Rage|Mined diamonds. Mined grudges. Both deep.|Don't talk to me. Don't wake me. Hi-ho. Ugh.|Grumpy never smiled, not even when Snow White came, not even when the apple fell. He mines grievances alongside diamonds, and when he swings the pickaxe, the mountain remembers.
monk|The Giant Who Said Sorry|Penitent Giant|🧔|🪵|Apology of Boulders|Stepped on Jack's house. Apologized for centuries.|Sorry. Sorry. Sorry. *crack* Sorry.|After the beanstalk fell, the giant came down and discovered how small the world really was. He became a monk of quiet apology, striking only when asked and always saying sorry afterward.
ronin|The Fisherman Who Wished|Wish-Hunter|🎣|🗡️|Third Wish Cut|Wished for everything. Got fish.|I wished for a castle. I got a bucket.|A fisherman caught a magic flounder and asked for everything his wife demanded. The flounder gave it, then took it all back. He keeps the net and the sword and wonders what the fish thought.
valkyrie|Gerda the Brave|Brave Sister|🌹|⚔️|Rose-Thorn Rescue|Walked to the end of winter for a lost boy.|Kai, I'm coming. Move, snow. Move.|Gerda crossed winter to save her friend Kai from the Snow Queen's splinter. She talked to roses, ravens, and robbers, and none could stop her. She hasn't stopped since.
hunter|The Nutcracker Prince|Nutcracker|🥜|🔨|Walnut Crush|Lost a war against a Mouse King. Won the rematch.|Crack. Crack. Crack. Walnuts, rats, kings.|Cursed into a wooden nutcracker by a mouse queen, the prince now cracks nuts, skulls, and kingdoms with the same clack. His jaw hangs open. His loyalty never does.
deity|The Archangel Dragon-Fixer|Dragon-Fixer|😇|🗡️|Heavenly Hammer|Smites. Also fixes dragons. Overbooked.|Blessings upon you. And an invoice.|Sent from above to fix a broken dragon problem, the archangel has been stuck down here for a century because nobody signed his return form. He smites daily and complains hourly.
gladiator|Ivan Tsarevich|Prince of the Firebird|🔥|🗡️|Firebird Feather Strike|Chased a firebird. Caught a wolf. Married the wrong tsarevna.|The wolf talks. I listen. Mostly.|Ivan chased a firebird and lost his horse, his wife, and most of his dignity before a grey wolf carried him to victory. He still follows the wolf's advice and distrusts any bird with a good PR team.
brawler|Ali Baba, Thief-Boss|Thief Captain|🏺|🗡️|Open Sesame Strike|Opened the cave. Stole the gold. Outsmarted forty.|Open sesame. Close fist. Open skull.|Ali Baba found the thieves' cave and stole their gold. When forty thieves tried to retaliate, he and Morgiana killed them all with oil and wit. He now runs a respectable crew of the semi-honest.
warlord|The Queen of Hearts' Executioner|Heart Executioner|♥️|🪓|Off With Their Heads|Beheads on command. Has no idea why.|Off with their heads. Specific ones. Per my list.|Executioner to a queen who orders heads removed every hour, he has never actually cut one. Mostly he threatens and the victim runs. Today the list is longer. He is concerned.
strongman|Strong Hans|Strongman|💪|🔨|Millstone Throw|Lifted a mountain at fourteen. Wanted a nap.|It's just a rock. I'll put it down. Later.|A boy who could lift mountains, Hans left home to find work. He found a giant, a dragon, and a prince's bride. Now he lifts things for money, and sometimes for fun, and rarely for the right reasons.
luchador|Bold Bearskin|Bearskin Soldier|🐻|🪖|Seven-Year Slam|Wore a bearskin for seven years. Didn't wash it.|Seven years. No bath. Very patient.|Made a pact with the devil: wear a bearskin and do not bathe for seven years, and gold is yours. Bearskin did. He is now very rich, very powerful, and extremely aromatic.
lumberjack|The Woodcutter|Woodcutter|🪓|🪓|Timber Wolf|Cut a wolf open for a girl and her grandmother.|I came for firewood. I stayed for the heroism.|He heard a girl's scream, burst into a cottage, and cut the Big Bad Wolf open with an ax. Grandma and Red tumbled out whole. He has never chopped a tree the same way again.
boxer|Prince Bullfrog|Frog Prince|🐸|👑|Slimy Uppercut|Slapped against a wall. Became a prince. Kept a temper.|I was a frog. You made me a prince. I'm still mad.|When a princess threw him against a wall, the frog turned into a prince. He kept a grudge, a temper, and a left hook. He now boxes monsters in a puddle.
wrestler|Mountain Troll Magnus|Mountain Troll|⛰️|🪨|Boulder Elbow|Lives in a mountain. Eats mountain goats. Hates sunlight.|Sun. Ugh. Rock. Better.|A mountain troll who turns to stone in sunlight, Magnus wrestles by night and sulks by day. He hasn't been outwrestled in three centuries. He has, however, been outsmarted by everything.
werewolf|Wolfsbane Loup-Garou|Loup-Garou|🌕|🐺|Moon-Howl Maul|Cursed at midnight. Employed at one.|It's not a curse. It's a lifestyle with fur.|Every full moon, he turns. Every other night, he apologizes. He keeps a long list of people he owes an apology to, and a longer one of people who owe him a leash.
ogre|Ogress Ottoline|Ogress|🧌|🥄|Swamp Smash|Ogres have layers. So do onions. She says so.|Ogres have layers. So do onions. So do I.|Ottoline nursed a houseful of ogre children until a cat in boots tricked her husband. She's been angry ever since, and a good deal bigger.
samurai|Momotaro the Peach Boy|Peach Boy|🍑|🗡️|Dumpling Cut|Born from a peach. Raised by kindness. Fights oni.|Peaches ripen. Oni fall. Dumplings help.|Born from a giant peach, Momotaro grew into a fierce boy and led a dog, a monkey, and a pheasant against the demon ogres. The animals are still unionized. He's still paying in dumplings.
pitboss|The Troll Toll-Keeper|Toll Troll|🌉|🪨|Pay Up|Tolls the bridge. Counts the coins. Eats the rest.|The toll is three coins and your dignity.|A troll who demands tolls on the old bridge and eats those who cannot pay. He has been losing customers to a newly built ferry for years, and his temper shows.
cagefighter|Beowulf, Mostly Heroic|Monster-Slayer|🛡️|⚔️|Grendel's Handshake|Tore an arm off a monster. Needed a nap.|I wrestled a monster. Bare-handed. Mostly.|Beowulf tore off Grendel's arm in a mead hall and called it Tuesday. Then the monster's mother arrived. He has been bruised, scarred, and mostly heroic ever since.
healer|Granny Goodnight|Granny|👵|🧵|Warm Blanket|Heals everything with soup, stories, and a blanket.|Eat your soup. Dear, the wolf is in the bed.|Granny has fed, healed, and hidden half the forest. She keeps the best blankets, a sharp knife for wolves, and a handwritten list of everyone who owes her a visit.
cleric|Snow White, Poison-Proof|Poison-Proof Princess|🍎|🍎|Apple of Mercy|Died of an apple. Woke up. Immune to apples.|Don't offer me an apple. I'll offer you a prayer.|Snow White ate the poisoned apple, died, and woke when a prince's servant tripped. She has since become the court's most cautious healer, carrying an antidote in every pocket.
sunpriest|The Sun Harp (Enchanted)|Sun Harp|🎼|🎵|Golden Chord|A harp stolen by Jack. Plays for the sun.|Master! Master! Oh, never mind.|The giant's enchanted harp played itself, until a boy stole it down a beanstalk. She plays for the sun now, mending bones and moods with the same golden chord.
druid|Kelp-Witch Kerrigan|Kelp-Witch|🌿|🌿|Tidal Garden|Grows gardens under the sea. They're also traps.|The sea gives. The sea also takes. I'm the sea.|A hedge-witch who moved to the tide pools and never looked back. Her kelp heals wounds and ensnares enemies, and she has not met a sailor she couldn't tangle.
shaman|The Reindeer Shaman|Reindeer Shaman|🦌|🔔|Antler Blessing|Talks to reindeer. They have a lot to say.|The reindeer say 'get out of the snow'.|A northern shaman who speaks to reindeer, ravens, and wind. The reindeer say the Snow Queen's winter is getting worse. The ravens say it's already too late. The wind says nothing, but loudly.
plague|The Doll Doctor|Doll Doctor|🎎|🔧|Porcelain Cure|Heals dolls, toys, and the occasionally dead.|Say 'ah'. No, don't. You're made of porcelain.|The workshop's doctor, mending toys with thread and poison. His waiting room is full of living dolls and his office has a locked drawer nobody asks about.
beastmaster|The Goose Girl|Goose Girl|🪿|🪈|Flock of Fury|Her geese are better employees than most.|My geese are more polite than you. Honk.|A princess made to tend geese by a false maid, she befriended her flock and used the wind to speak with the king. Her geese now bite on command, and with great enthusiasm.
nurse|Vasilisa's Doll|Living Doll|🪆|🪡|Pocket Kindness|Tiny doll in an apron pocket. Heals with advice.|Feed me. Then I'll fix your arm.|A tiny wooden doll given by Vasilisa's dying mother, she grants help when fed breadcrumbs. She has no pockets of her own but plenty of opinions, and a surprisingly effective bedside manner.
bishop|Scheherazade, Teller of Tales|Storyteller|📖|📜|Another Night|Told a story each night to survive. Won.|And then, just as dawn broke, the sultan paused.|She told a sultan a thousand and one stories to avoid execution. Now she tells them to the wounded, who find that listening to the end is a strong reason to live.
herbalist|The Mad Tea Host|Tea Host|🫖|🍵|Unbirthday Tonic|Everything is tea. Everything is an unbirthday.|It's tea time. It's always tea time. Drink.|The Hatter lost track of time long ago, and he has since become the forest's finest apothecary of tea. His brews heal the body and confuse the mind, and he insists the second is a feature.
chaplain|Brother Tuck|Merry Friar|🍺|🍖|Cheerful Absolution|Blessed the forest and its outlaws. Takes a fee in ale.|Bless you, son. And your ale.|A friar who blessed Sherwood's outlaws and received nothing but laughs and ale. His blessings mend wounds, and his bonhomie mends spirits. His liver is a different matter.
therapist|The Wise Owl|Wise Owl|🦉|🎓|Hoot of Wisdom|Knows everything. Says it slowly. Repeats.|Hoo. Hoo hoo. Who knows? I do.|The oldest owl in the wood, who has counselled kings and mice for a thousand years. He has never given a straight answer, and the forest has never stopped asking him questions.
masseuse|Frau Holle|Pillow-Fluffer|☁️|🛏️|Snowfall Fluff|Shakes her pillows. It snows on Earth.|Fluff, fluff, fluff. Snow, snow, snow.|The old woman at the bottom of the well, whose pillows make snow when shaken. She rewards diligence with gold and laziness with pitch. Her feather duvet is both a weapon and a healing charm.
paramedic|Doctor Fox|Fox Physician|🦊|💉|Sly Remedy|Fox by day, physician by night. Never accepts payment.|Take two tails and call me in the morning.|A fox who studied medicine and set up in the woods. His patients are mostly chickens, who are oddly fine with it. He has a knack for finding what hurts and a worse one for finding what's missing.
barista|The Tea-Pouring Dormouse|Dormouse|🐭|🍵|Sleepy Splash|Always sleepy. Always pouring. Never spills.|*yawn* Another cup. Another nap.|The Dormouse of the tea party, always falling asleep mid-sentence, always pouring perfectly. Her tea heals wounds and induces dreams. Both are called 'hot beverage'.
witchdoctor|The Hag of the Bog|Bog Hag|🧙‍♀️|🧪|Hex of Tummyaches|Heals with leaves, hexes with spite.|The swamp is lovely. The swamp is also hungry.|A bog hag who prefers healing to cursing, but cannot resist a good hex. She has been banned from three villages and elected mayor of one.
lifeguard|The Ferryman of Sorrows|Ferryman|⚓|🛶|River Crossing|Rows the dead across. Charges a coin.|One coin. One ride. No refunds.|The ferryman has rowed the dead across the river for a thousand years. Lately he has been rowing the living back, out of kindness, nostalgia, and a keen eye for fares.
pharmacist|The Apothecary of Poison|Apothecary|⚗️|🧴|Cure or Curse|Sells cures. Sells curses. Same bottle.|Take it. It's either medicine or murder.|A shopkeeper in a crooked house who dispenses vials of unknown origin. The labels say 'cure' on one side and 'poison' on the other, and he never tells which is up.
nana|Mother Goose|Rhyme-Mother|🪿|📖|Nursery Rhyme Nurse|Rhymes cure ills. Rhymes also curse.|Hush, little hero, don't say a word.|Mother Goose has a rhyme for every wound and a verse for every curse. Her lullabies heal, her limericks wound, and her goose is a magnificent bodyguard.
mage|Gretel Ember|Oven-Witch|🔥|🔥|Oven Door Slam|Pushed a witch into her own oven. Liked it.|Hansel, the oven's hot. Put someone in it.|Gretel pushed a witch into her own oven to save her brother, and discovered she had a talent for fire. She has been burning things in the name of justice ever since.
pyromancer|The Fairy Godmother (Overworked)|Overworked Godmother|🧚|🪄|Bibbidi-Bobbidi-Boom|Grants wishes. Is behind on thousands.|One wish per customer! Take a number!|A fairy godmother with a backlog of ten thousand wishes and a very short wand. She has started granting them in bulk. The pumpkins are staging a protest.
frost|Winter's Weather-Witch|Weather-Witch|❄️|🪄|Cold Front|Cold on the outside. Colder on the inside.|Frost heals. Frost kills. Mostly the second.|A witch who weaves winters and sells them by the yard. She is, officially, a seasonal contractor, but the seasons do not seem to know.
storm|Thunder Tom|Storm Caller|⛈️|🌩️|Static Shock|Struck by lightning seven times. Seven wishes.|Rain! Thunder! And a very rude wind!|He asked the thunder for a favor and was struck seven times, and each strike gave him a power. His hair is permanently on end, and his smile is permanently dangerous.
sorcerer|The Frost-Splinter Sorcerer|Splinter Sorcerer|🪞|🪟|Mirror Shard|A shard of mirror in his eye. Sees only flaws.|I see everything. Mostly what you've done wrong.|A sorcerer with a shard of the troll's mirror lodged in his eye. He sees the worst in everything and everyone, which turns out to be an excellent combat skill.
conjurer|The Mechanical Magician|Clockwork Magician|🎩|🪄|Pulled-Rabbit Strike|Pulls rabbits from hats. They're clockwork.|Ta-da. Don't ask where the rabbit goes.|A clockwork automaton in a top hat who conjures tricks, rabbits, and the occasional lightning bolt. The rabbits are mostly clockwork too. They tick a lot.
voidwalker|The Shadow Without a Man|Shadow-Mage|🌑|🕯️|Silhouette Strike|Cut loose from its man. Ate his life.|I was a shadow. Now I'm the master.|The learned man's shadow slipped away, grew a body, and took his place. It now fights for itself, stealing light, faces, and the occasional lease.
elementalist|The Firebird|Firebird|🦚|🔥|Feather Flare|Rarest bird in the forest. Its feathers burn.|One feather. One flame. One very large debt.|A firebird that nests in a golden cage and leaves feathers that burn like torches. Hunted by princes, valued by thieves, and keenly aware of both.
warlock|The Lamp Genie (Contractor)|Lamp Genie|🧞|🪔|Three Wishes Clause|Grants three wishes. Reads the fine print aloud.|Wish carefully. I read the terms. Slowly.|A genie bound to a lamp, grudgingly granting wishes with an eye for loopholes. He wishes someone would wish for his freedom. Nobody ever does. They always wish for gold.
necro|The Ghost of Stories Past|Story-Ghost|📜|🕯️|Forgotten Verse|Haunts forgotten tales. Collects the unfinished.|I remember every ending. Even the ones you cut.|A ghost who lingers in unfinished stories, collecting the endings nobody wrote. She is gentle, haunted, and very good at making the living remember what they left out.
beigewizard|Merlin the Mostly Competent|Court Wizard|🧙‍♂️|📚|Mediocre Missile|Forgot his own spell. Remembered yours.|I'm 70% sure this works. Maybe 60.|Merlin is the finest wizard in the kingdom, according to himself. His spells work about two-thirds of the time, which is better than the king's advisors. He keeps a spare beard for emergencies.
rodlou|Rain-Caller Rupert|Rain-Caller|🌧️|🌂|Thunder Hat|Hat full of lightning. Pockets full of rain.|Lightning strikes twice. I've counted.|A farmer's son who called a storm and couldn't stop it. He keeps the lightning in a hat and the rain in a canteen. Neither is safe.
frostypete|Jack Frost|Jack Frost|🧊|❄️|Frost Nip|Nips noses. Freezes ponds. Hates thaw.|Chilly? Good. That's the idea.|The old master of winter, who nips noses and paints windows. He has opinions about thaw, spring, and anyone who dares enjoy either.
chaosmage|Puck the Trickster|Trickster|🧚‍♂️|🌸|Midsummer Mischief|Squeezes love juice on the wrong eyes. Delights in it.|Lord, what fools these mortals be. Again.|Puck serves the fairy king and plays tricks on whoever's nearest. His spells are chaos, his laugh is wildfire, and his aim is surprisingly accurate for someone constantly giggling.
illusionist|Morgan le Fay|Enchantress|🌙|🪄|Mirror Image Overload|Hides in plain sight. Sometimes in her own illusions.|Which one's real? Me. Probably.|Morgan le Fay weaves enchantments from moonlight and glamour. She enjoys her own illusions so thoroughly that she's occasionally lost within them, much to everyone's frustration.
runesmith|Brokk the Runesmith|Dwarf Smith|🔨|🔨|Etched Detonation|Forged Thor's hammer. Short handle. Long grudge.|It's a rune. It's pretty. Also lethal.|Brokk forged a hammer with a short handle, and the god who wielded it never let him forget. He now etches runes that explode, partly for profit and partly for spite.
stargazer|The Sandman's Stargazer|Star-Child|🌠|🔭|Dream Meteor|Counts stars. Loses count. Counts again.|One star. Two stars. Meteor.|A stargazer who sprinkles sleep-dust and counts constellations. She forgets the count often, so she starts again, and each restart is a meteor shower.
volcanovera|The Firewitch of Mount Ember|Firewitch|🌋|🔥|Eruption Notice|Lives in a volcano. Pays rent in hot takes.|Hot take: everything's on fire.|A firewitch who made her home in a smoking mountain, brewing eruptions on request. The villagers pay in cheese and lava-insurance.
hexhannah|The Wicked Stepmother|Wicked Stepmother|🧹|🍎|Petty Curse|Hexed a princess. Over a mirror. Still smug.|The mirror said I wasn't fairest. Now it says nothing.|She asked the mirror who was fairest and was told it wasn't her. She never forgot, and she hexes anyone who even looks at a reflection.
rogue|Hansel Crumb|Breadcrumb Thief|🍞|🔪|Crumb Trail Ambush|Left a trail. Birds ate it. Learned.|Every trail has an end. Mine is behind you.|Hansel left a trail of breadcrumbs that birds devoured, and learned that a trail is only as good as its predators. He now sneaks up on enemies using stolen bread and stolen time.
duelist|Puss in Boots|Boot Duelist|🐱|🗡️|Boot-Strapped Lunge|Talks. Duels. Lies for a living. Cats do.|My master is the Marquis of Carabas. Ahem.|A cat who tricked an ogre, a king, and a kingdom, all for a miller's son. His boots are famous, his hat is feathered, and his word is, technically, a contract.
assassin|Tom Thumb|Thumb-Sized Assassin|👍|🪡|Needle Poke|Thumb-sized. Silent. Deadly.|You didn't see me. Because I'm tiny.|Born the size of a thumb, he learned to hide in ears, pockets, and sandwiches. His needle is poisoned and his quiet is lethal.
pickpocket|The Pearl Thief|Pearl Thief|🦪|🧤|Oyster Pocket|Stole a pearl. The oyster is still mad.|It wasn't stealing. It was borrowing. Forever.|A thief who dives for pearls and picks pockets for fun. The oysters have formed a union, and the pockets have filed complaints.
swashbuckler|Kai the Splinter-Hearted|Splinter-Hearted|🧊|🗡️|Icy Lunge|A shard in his heart. Cold feet. Warm blade.|I feel nothing. Wait, I feel a draft.|A boy with a splinter of ice in his heart who followed the Snow Queen willingly. Now he fights with cold precision and does not quite remember what warmth was.
bountyhunter|The Red Shoes Hunter|Shoe Hunter|👠|🪓|Dance-Till-Death|Hunts dancers. Takes the shoes. Leaves the feet.|The shoes keep dancing. So will you.|A hunter who pursues the girl in the red shoes. They dance forever, she cannot stop, and he never quite catches her. It's complicated.
shadowdancer|Twelve Dancing Princess|Midnight Dancer|💃|🌙|Worn-Out Slippers|Wore out twelve pairs of slippers nightly.|Twelve pairs. One night. Zero regrets.|One of twelve sisters who danced every night in an underground ballroom. She now fights the way she danced: in shadow, with perfect rhythm, and entirely without remorse.
graverobber|The Bone-Orchard Gardener|Bone Gardener|🌳|⛏️|Skull Pruner|Prunes bone-trees. Waters them with spite.|The orchard needs pruning. So do you.|Tends the Bone Orchard where every tree grows from a buried tale. His shears are sharp, his shovel is rusty, and the trees whisper compliments he doesn't believe.
acrobat|Rapunzel the Climber|Tower Climber|🗼|🪢|Braid Whip|Let down her hair. Then climbed down.|Let down my hair. Now climb. Don't die.|Locked in a tower, Rapunzel braided her own hair into rope, climbed down, and took up rooftop parkour. The witch is still upset and holding a very long pair of scissors.
spy|The Cheshire Spy|Cheshire Spy|😼|🔍|Grin of Secrets|Knows everything. Tells nothing. Vanishes.|Everyone's mad here. Especially me.|The Cheshire Cat's grin lingers after he's gone, and he knows every secret in Wonderland. He tells them only to the ones who ask nicely, and often not even then.
ninjanate|Will Scarlet|Sherwood Rogue|🧥|🗡️|Forest Ambush|Robin Hood's cousin. Steals what he needs. Needs a lot.|Rob the rich. Keep a cut. Be nice about it.|Will Scarlet joined Sherwood for the adventure and stayed for the stolen cloaks. He's quick, quiet, and a bit vain about his tunic.
pirate|Pirate Queen Grace|Pirate Queen|🏴‍☠️|🗡️|Cutlass Compliments|Ruled the seas. Took no orders. Kept the hat.|Arr, which is pirate for 'I bite'.|A pirate queen who ruled the western seas and spat in a queen's face. She commands ships, crews, and the occasional storm, and answers to none of them.
parkour|Rapunzel's Cousin|Rooftop Runner|🏃‍♀️|🪢|Rooftop Rampage|Leaps from rooftops. Lands on monsters.|Don't look down. Wait. Look down!|Locked in no tower, Rapunzel's cousin chose to scale them all instead. She has never touched the ground without a reason.
catburglar|The Nine-Tailed Cat Thief|Cat Thief|🐈‍⬛|💎|Nine Lives Larceny|Nine tails, nine lives, nine thefts a night.|Meow. That's code for 'distraction'.|A cat that stole from kings and sultans alike, and has been reincarnated eight times. She is on her ninth life, and her fourteenth heist.
bandit|Robin Hood, Outlaw of Sherwood|Outlaw|🏹|🏹|Stick-Up Strike|Steals from the rich. Gives to the poor. Takes a cut.|Stand and deliver! Please. Sorry.|Robin Hood robbed the rich and gave to the poor, and a bit to himself for upkeep. He's still doing it, with a smile, a feather, and an exceedingly well-practiced bow.
silentsal|Elise's Silent Brother|Swan Brother|🦢|🧶|Wing Beat|Cursed as a swan. Silent for seven years.|...|One of eleven brothers turned to swans by a stepmother. Their sister's nettle shirts freed them, all except one with a swan-wing arm. He fights with that wing, and never says a word.
valentino|Bluebeard, Bachelor Auditor|Bluebeard|🧔|🗝️|Forbidden Room Strike|Has a locked room. Don't ask.|I have a key. I have a rule. I have a mood.|Bluebeard married seven wives and left a small key and an enormous rule. His wives are all in that room. He is still looking for number eight.
fencer|The Frog Princess Fencer|Fencing Frog|🐸|🤺|Lunge and Ribbit|Kissed a prince. Became a princess. Hates puddles.|I was a frog. Now I'm a fencer. Ribbit.|A frog who became a princess after a kiss and promptly took up fencing to avoid further surprises. She is quick, precise, and still afraid of puddles.
stuntman|Tom Tit Tot|Imp Stuntman|👺|🪄|Name-Guessing Strike|Spun gold from straw. Demanded a name.|Guess my name! Guess! You never will!|A small imp who spun a queen's flax into gold and demanded her child or her guess of his name. She guessed. He still stamps in rage, sometimes through the floor.
pickpocket_dummy|x|x|x|x|x|x|x|x
bard|The Piper of Hamelin|Piper|🪈|🪈|Pied Tune|Led the rats away. Then the children. Both times invoiced.|Pay me. Or I play. You don't want me to play.|The Piper cleared Hamelin of rats and was refused payment, so he cleared it of children too. He has been wandering ever since, playing a tune that makes everyone follow and nobody remember why.
chrono|Briar Rose, Hundred-Year Napper|Sleeper|😴|⏳|Spindle Prick|Pricked a finger. Slept a century. Woke annoyed.|One hundred years. I missed so much. Also naps.|Briar Rose slept for a hundred years and woke to a world that had moved on without her. She uses her sleep as a weapon, stalling time and skipping to the end of anything inconvenient.
manager|The Magic Beanseller|Bean Merchant|🫘|🌱|Magic Bean Deal|Sold Jack the beans. Takes a commission.|Five beans for a cow. It's a bargain.|The old man who traded Jack a handful of beans for a cow. He claims he made a fair deal. The result was a beanstalk, a giant, and a lawsuit, none of which affected his commission.
engineer|The Lighthouse Keeper|Lighthouse Keeper|🕯️|🔦|Beacon Flash|Keeps the light on. Keeps the ghosts out.|Light's on. Ships are safe. Mostly.|The keeper of a lighthouse on a cliff of drowned ships. His beam keeps the sea monsters away, and his stories keep the sailors up at night.
drillsergeant|The Nutcracker Sergeant|Toy Sergeant|🪖|🥁|Toy Soldier Drill|Drills toy soldiers. They drill back.|Attention! Wooden spoons at the ready!|Drill sergeant of the toy army that fought the Mouse King. He barks orders at wooden soldiers who are, regrettably, loyal, tireless, and unable to follow them.
cheerleader|The Music-Box Ballerina|Ballerina|🩰|🎼|Pirouette Spin|Spins in a box. Spins out for fights.|Spin! Spin! Don't stop spinning!|A ballerina who lives in a music box and dances when the lid opens. She spins her enemies dizzy, and her music-box tune is a battle hymn nobody can place.
standardbearer|The Emperor's Herald|Herald|📯|🚩|New Clothes Fanfare|Announced a naked emperor. Wasn't fired.|Behold! The emperor's new clothes. Don't look.|The herald who announced the emperor's invisible new clothes and kept a straight face. He has been in the business of confident delivery ever since.
speaker|The Town Crier|Town Crier|📢|🔔|Hear Ye|Cries the news. Cries the weather. Cries a lot.|Hear ye! Hear ye! Hear this!|A crier whose voice carries three villages and whose news is rarely good. His cries are rallying calls, and his bell has been known to wake the dead.
dj|The Flute-Charmer|Flute-Charmer|🎶|🪈|Snake Dance|Charms snakes. Charms crowds. Charms taxes.|Dance, little cobra. Dance, little crowd.|A street musician from the bazaar whose flute charms snakes, crowds, and the occasional tax collector. His tune is a battle-song for those who can hear it.
foreman|Elf Foreman Fennel|Elf Foreman|🧝|🔨|Shoemaker's Shift|Runs the elves who made the shoes. Union rep.|Night shift! Night shift! Shoes by dawn!|Foreman of the elves who made shoes for a poor cobbler. He keeps the night shift running, the thread flowing, and the cobbler asleep.
general|Queen Mab, General of Faeries|Fairy General|👸|🗡️|Dream Directive|Rules the dream-kingdom. Orders it by moonlight.|Your dreams are my army. Wake up and fight.|Queen Mab commands an army of tiny soldiers who ride gnat-drawn chariots through sleeping minds. She plans everything three moves ahead, and expects obedience in four.
coach|Coachman Mouse|Pumpkin Coachman|🐭|🥕|Midnight Carriage|Was a mouse. Was a coachman. Is neither at midnight.|Hurry! The clock is chiming! The carriage is melting!|Transformed from a mouse into a coachman by a fairy godmother, he drives the pumpkin carriage at breakneck speed and shrinks at the first stroke of midnight.
quartermaster|The Provident Ant|Provision Ant|🐜|🌾|Winter Stockpile|Stored food all summer. Nobody thanked her.|Winter's coming. Grasshopper's at the door.|The ant who stored food all summer while the grasshopper sang. She keeps the party fed, rationed, and furious at anyone who mentions 'enjoying the moment'.
crier|The Pied Piper's Page|Piper's Page|🎺|📯|Brass Fanfare|Carries the pipe. Announces the pipe.|Make way! The Piper approaches!|A page who carries the Piper's spare flute and announces his arrival. He has the best view of every dramatic exit, and the worst job description.
navigator|Gretel's Pebble Guide|Pebble Guide|🪨|🧭|Pebble Trail|Never lost. Dropped pebbles. Found home.|Follow the pebbles. Not the crumbs. Never the crumbs.|Gretel's guide to the forest, who drops pebbles that glow in the moonlight. She has never lost her way and does not intend to start now.
tactician|Reynard the Fox|Strategist Fox|🦊|♟️|Sly Gambit|Tricks wolves. Tricks kings. Tricks himself.|I have a plan. It involves lying. A lot.|Reynard has lied his way out of every trial and into every henhouse. His plans are brilliant, his morals are flexible, and his reputation is mostly rumor.
auctioneer|The Troll Auctioneer|Troll Auctioneer|🔨|💰|Going Going Gone|Sells goats. Sells bridges. Sells you.|Going once! Going twice! Gone!|A troll who auctions anything that crosses his bridge: goats, shoes, children, secrets. He has sold himself twice and bought himself back at a loss.
unionrep|The Elves' Union Rep|Union Elf|🧝‍♀️|✊|Strike! (Literally)|Negotiated better thread. Lost the shoes.|We demand fair needles!|Union rep for the elves who made shoes by night. She negotiated shorter nights and longer thread, and the cobbler, who never met her, is still wondering why the shoes got fancier.
alchemist|Rumpelstiltskin|Name-Dealer|🧌|🧵|Spin Gold from Straw|Spins gold from straw. Wants your firstborn.|Guess my name. Or hand over the baby.|Rumpelstiltskin spun straw into gold for a queen and demanded her firstborn. When she guessed his name, he tore himself in two. He got better, as these things go, and now brews deals instead.
gambler|The Apple Peddler|Apple Peddler|🍎|🎲|Rotten Wager|Sells apples. One's poisoned. Place your bet.|One apple in ten is poisoned. Feeling lucky?|A peddler whose red apples hide one poisoned fruit in every basket. He bets on which one the customer will choose. He has not lost often.
fate|The Unpaid Fate|Apprentice Fate|🧵|✂️|Thread Snip|Cuts threads of fate. Unpaid. Unlicensed.|I'm not cutting your thread. Yet.|The Fates' unpaid intern, assigned to snip threads under supervision. She has been told to wait, but she keeps snipping, partly out of excitement and partly because nobody ever told her to stop.
collector|The Mermaid's Debt Collector|Debt Collector|🐙|📜|Voice Repo|Collects voices. Interest is high.|Your voice. Or your legs. Or both.|He works for the sea witch, collecting what's owed from sirens, mermaids, and the occasional drowned sailor. The interest is compounded in voices.
accountant|Winter's Bookkeeper|Winter Bookkeeper|📒|🧮|Frostbitten Ledger|Counts every snowflake. Never rounds.|Every snowflake is accounted for. Every one.|The Snow Queen's bookkeeper, counting every flake that falls on her kingdom. He keeps meticulous tallies, and a cold ledger that never balances.
clown|Punch the Marionette|Marionette|🎭|🪵|Slapstick Smash|Hits everyone. Strings pulled. Hmm.|That's the way to do it! That's the way!|A puppet who has been hitting everyone for four hundred years. His strings pull him toward violence, and the puppeteer is far away, and nobody is quite sure whether he's the villain.
jester|The King's Fool|Court Fool|🃏|🔔|Biting Wit|Mocks kings. Is allowed to. For now.|Why did the king cross the road? To die.|The only one who could tell the king the truth, the Fool jokes with knives. He survives by being funny, and the moment the king stops laughing, so does he.
magician|The Grey Wolf Mage|Wolf Mage|🐺|🪄|Wolf's Trick|Wolf in a cape. Magician in a hat. Rabbit pending.|Pick a card. Any card. It's the one that bites.|A wolf who studied magic from a book left behind by a tired hero. His tricks are mostly teeth, his rabbits are always real, and his audience is always nervous.
inventor|The Flying Carpet Mechanic|Carpet Mechanic|🧰|🔧|Prototype Oopsie|Fixes carpets. Breaks them. Fixes them.|It flies. It flew. It will fly again, hopefully.|A mechanic in the bazaar who repairs flying carpets and invents new things, mostly accidents. His tool belt includes a wrench, a lamp, and an emergency parachute.
mimictamer|The Mimic Chest of Wonders|Chest Tamer|📦|🗝️|Open Wide|His best friend is a chest. It bites.|He's friendly! Mostly! Don't pet the lid.|He raised a chest from an egg, a bad idea, and a locksmith's mistake. They share meals, though the chest eats most of them.
janitor|The Chimney Sweep|Chimney Sweep|🧹|🧹|Soot Swing|Sweeps chimneys. Knows every secret of every hearth.|Soot happens. So does vengeance.|The chimney sweep who climbs down every flue and knows every secret of every house. He cleans what's dirty and keeps what's secret, usually in his pockets.
catlady|Cat-Mother Carol|Cat-Mother|🐈|🧶|Nine-Lives Gambit|Fifty-three cats. One dungeon. Zero regrets.|They're not pets. They're staff.|She keeps fifty-three cats who prowl the shadows, hunt the vermin, and deliver judgment. They obey only her, and only on days they like her.
timetraveler|Rip Van Winkle|Long Sleeper|🍺|🕰️|Paradox Poke|Slept twenty years. Woke up mid-sentence.|I only had one drink. For twenty years.|Rip took a nap in the mountains and woke up twenty years later with a long beard and a longer story. He's still catching up, and has strong opinions about the new king.
pawnshop|The Devil's Pawnbroker|Pawnbroker|🏪|🪙|Soul Appraisal|Buys souls. Gives fair market value. It's low.|I'll give you ten for it. Ten what? Souls.|A pawnbroker with a crooked sign who takes anything of value, including voices, shadows, and the occasional soul. His rates are fair. His terms are not.
vendingvic|The Magic Porridge Pot|Porridge Pot|🍲|🥄|Porridge Flood|Cook, little pot, cook! Don't stop.|Stop, little pot, stop! STOP!|A pot that cooks porridge on command and keeps cooking until the right word is spoken. Nobody has ever remembered the right word.
streetmagic|The Wishing-Well Magician|Well Magician|⛲|🪙|Coin Flip|Grants wishes for coins. Delivers chaos.|Toss a coin. Make a wish. Regret it.|A magician who lives in a wishing well and grants wishes for a coin. Results vary, mostly in the direction of 'be careful'.
pigeonpat|The Raven Whisperer|Raven Whisperer|🐦‍⬛|🪶|Murder of Crows|Talks to ravens. They talk back. Loudly.|Caw. That's raven for 'fire'.|A hermit who understands the language of ravens, and who commands a murder of crows with a whistle. They owe him money. He collects in beaks.
mascotmax|The Great Gingerbread Man|Gingerbread Man|🍪|🍬|Run Run Run|Run, run, as fast as you can. Can't catch me.|I'm the Gingerbread Man! Wait, why's the fox smiling?|The legendary Gingerbread Man, who has outrun everyone but the fox. He's learned to fight, mostly because he's out of places to run.
`;
const lines=T.trim().split("\n").filter(l=>!l.startsWith("pickpocket_dummy"));
for(const l of lines){const f=l.split("|");if(f.length!==9)throw new Error("bad line "+f[0]+" "+f.length);const [k,hero,cls,e,ic,sn,bio,q,story]=f;
 if(f[0]==="strongman")continue;
 const c=CLS[k];if(!c)throw new Error("unknown key "+k);
 c.hero=hero;c.n=cls;c.e=e;c.ic=ic;c.sp.n=sn;c.bio=bio;c.q=[q];c.atk=sn.split(" ")[0]+" Strike";STORY[k]=story}
})();

/* ---- v4: dark fairytale campaigns ---- */
(function(){
const F=[
{n:"The Hollow Woods",i:"🌲",V:"Mother Marzipan, the Candy Witch",P:"the Hollow Woods",d:"Where every path leads to a cottage. Do not eat the cottage.",
taunts:["Come closer, little crumb. I won't bite. Much.","Every house is built of children. This one is built of you.","Sugar is just bones that learned manners.","The oven is already warm. For you."],
pro:"Long ago a woodcutter's children were left in the Hollow Woods, and a house of sweets lured them in. They escaped. The house did not stop being hungry. Now {V} has grown the forest into a larder, and the lost, the foolish and the very hungry are walking in on their own. Eight survivors of eight different stories meet at a crossroads, tired of being the moral of someone else's tale.",
ch:["{h0} spares the first monster out of habit, then regrets it. {h1} reminds everyone that wolves are not the only teeth in these woods. The first boss, a gingerbread guard in icing armor, cracks like a good biscuit.",
"The trees whisper the names of every child who has ever wandered in. {h5} leaves a trail of crumbs. {h4} points out that crumbs are exactly what birds are for. The birds are not birds anymore.",
"A cottage with a chimney that smokes at the wrong times. {h3} sets the table anyway, because a good host never fears a wolf in the doorway. {h2} behaves, mostly, and is thanked with soup.",
"{h6} plays a tune for a rat-lord who has been counting the children in the walls. The rats follow. The rat-lord does not, and has questions about the contract.",
"{h7} offers to spin the straw of this chapter into gold. The price is a name. Nobody has a name worth keeping in these woods.",
"The pond reflects a girl who is not any of them. {h1} shoots the reflection. It bleeds sugar syrup. {h4} licks the arrow, then wishes she hadn't.",
"A witch's second oven, bigger than the first. {h0} remembers the pig's heart he once carried. {V} remembers it too, and smiles with every tooth.",
"{h2} hears the old howl in his chest and loses a night. {h3} finds him at dawn, face wet, apron stained. 'It's all right, dear,' she says. 'Have some tea.'",
"The Gingerbread Gate: sugar glass, candy bars, rope licorice. The boss is the gate itself. {h5} nearly takes a bite. {h4} slaps his hand. 'Never again,' she says. 'Never again.'",
"The tenth boss is a kitchen full of clockwork spoons. Beyond it, {V} turns the page of a cookbook titled 'Heroes: 101 Ways'. She looks up. 'Oh good,' she says. 'Dinner.'"],
end:"{V} sinks into her own oven, which has waited a very long time to be used properly. The Hollow Woods exhale. The cottage sags into crumbs, and the birds, real birds, finally eat. {h0} and {h1} stand at the crossroads and pick a path that is not in any book."},
{n:"The Sleeping Court",i:"🏰",V:"The Queen of Mirrors",P:"the Sleeping Court",d:"A castle that has been asleep too long. Someone's been dreaming for it.",
taunts:["Fairest of them all? You're not even in the frame.","Seven years of bad luck is generous.","I will keep you pretty. I will keep you quiet.","Every mirror in the castle is watching you."],
pro:"A hundred years ago a spinning wheel put a castle to sleep. {V} has been dreaming it ever since: every guard, every cook, every princess. Her mirrors keep the sleepers pretty and the visitors vain, and the thorns outside grow thicker with each hopeful prince. Eight heroes who were each promised a happy ending arrive at the gate to ask for a refund.",
ch:["{h0} lifts the first thorn and finds that every briar has a face. {h5} politely asks them to move. They don't. The first boss, a hedge knight of spindles, crumples when {h1}'s arrow finds his only soft spot.",
"The ballroom is still mid-waltz. Dancers turn forever, eyes shut. {h4} wonders if she should wake them. {h6} says some things are kinder asleep. The boss is the music itself.",
"A mirror on the wall begins to speak with {h3}'s voice. It tells her the story she wanted to hear. She smashes it, and it laughs.",
"{h2} breaks every chair in the dining hall and finds, under the last, a note: 'Not yet. —Q.' He eats the note. The boss is a banquet that eats back.",
"{h7} sells the party a bag of apples at a markdown. One is poisoned, he says, but he won't say which. {h5} bites first. It's fine. Probably.",
"The princess's chamber holds a spinning wheel that never stops. {h6} lies down to prove nothing happens. Nothing happens, for a hundred years, in a single breath.",
"A glass coffin and a crown of thorns. {h3} speaks to the sleeper, and the sleeper answers. It is not who they think.",
"{h0} finds his own name in the guest book, dated seven hundred years ago. {h1} asks why. He says he doesn't want to talk about it.",
"The Hall of Mirrors. Every reflection is a hero who made the wrong choice. {h4} burns the whole hall to ash and finds {V}'s face in the cinders.",
"The tenth boss is a dream that refuses to wake. Beyond it, a throne with a crack down the middle. {V} sits upon it with her back to the party, brushing her hair. 'You're late,' she says. 'I've been fair for ages.'"],
end:"The last mirror cracks, and a hundred years of sleep end in a single yawn. The court wakes up. The kitchen burns the toast. {h0} bows to a prince he doesn't recognize. {h6} sits on the stairs, finally awake, and decides not to nap for at least a week."},
{n:"The Beanstalk Wars",i:"🌱",V:"Old Thunderfoot, the Cloud Giant",P:"the Cloud Kingdom",d:"Up there, the giants have been waiting. And they heard about the goose.",
taunts:["Fee, fi, fo, fum. You're small. You're numb.","I smell the blood of a thief of geese.","My harp. My hen. My Thursday.","Come up, little one. The floor is thin."],
pro:"A boy climbed a beanstalk, stole a hen, a harp and a bag of gold, and cut the stalk behind him. The giants remember. {V} grew a new stalk, then a thousand, and now the cloud kingdom is coming down, one boot at a time. Eight heroes who are small, mortal and a little desperate climb up to say sorry. It will not be enough.",
ch:["{h0} pushes the first boot off the stalk with a skillet and a strong opinion. {h1} watches it fall and cheers. The first boss, a cloud-ogre, shakes the stalk until the party decides to hold on tighter.",
"The sky is full of sleeping cattle. {h5} slips through the herd unseen. {h2} sits down to rest and nearly crushes a calf. They agree not to talk about it.",
"A wall of golden eggs. {h7} asks the price. The price is one egg. The egg hatches. {h4} sets it on fire, which is how you deal with unhatched things.",
"The giants' dining hall is a thousand tables in a single bowl. {h3} finds the harp, sings with it, and weeps. The boss shakes the walls to make them stop.",
"{h6} tells the giants a bedtime story. It's long. It's boring. They're asleep in a minute. {h0} wonders why nobody thought of this before.",
"{V}'s wife, a woman the size of a church, offers them tea. {h2} accepts, because he is tired of being hunted. She says she's tired of being feared.",
"A bridge of rainbow and iron. The boss is a troll who is also a toll and also a legal entity. {h7} contests the fee with a very long contract.",
"{h5} climbs the storm itself to cut its lightning free. {h4} summons the wind. They fall together, laughing, into a haystack. The haystack is a giant's hat.",
"The Cloud Throne is empty. A note: 'Gone down to settle accounts. —T.' {h1} reads it twice. Then she understands, and runs.",
"The tenth boss is a storm the size of a county. Beyond it, {V} is already stepping off the stalk. 'You wanted to say sorry,' he says. 'Say it to the ground.'"],
end:"The stalk falls, and the giant falls with it, and a hundred years of grudge land on a quiet field. {V} sits up, rubs his head, and asks for a cup of tea. {h0} gives him one. The hen, who has been watching all this time, lays one more egg and quietly leaves."},
{n:"The Drowned Kingdom",i:"🌊",V:"The Sea Witch, Mother of Brine",P:"the Drowned Kingdom",d:"A kingdom that sank for love, and has been paying interest since.",
taunts:["Your voice, or your legs? I'll take both.","Everything has a price. The sea has all the receipts.","Sink a little. It's lovely down here.","Every drowned thing sings my name."],
pro:"A mermaid traded her voice for legs and a prince who didn't notice. {V} kept the voice, and the sea has been singing it ever since, a siren-song that drags ships, sailors, and whole cities below. The kingdom of the drowned is rising, rung by rung, up the coast. Eight heroes who each lost something to the sea come back, hoping to buy it back.",
ch:["{h0} walks into the surf in full armor. The first boss, a sea-dragon of foam, breaks over him. He is still standing. A crab climbs onto his shoulder and looks smug.",
"The beach is littered with shoes, one from every drowned sailor. {h5} takes the best pair. A hand rises from the sand and takes them back.",
"A lighthouse that doesn't shine, but listens. {h6} climbs its stairs and finds the keeper talking to something in the lamp. {h3} sings it to sleep.",
"{h4} calls up a storm to match the one that sank the old fleet. The sea hears and sulks. The boss, a kraken with a monocle, demands to see the manager.",
"An underwater theater where shipwrecked actors perform the same last scene. {h7} audits the box office. The box office is a clam. The clam is hungry.",
"{h1} finds a harpoon with her name carved on it, a hundred years old. The mermaid in the tide pool says it was made for her mother. They don't speak after that.",
"A debt collector's boat, sails of ledger-paper. {h7} reads the manifest. The manifest lists every voice ever sold. His is on the third line.",
"Down the spiral staircase of the drowned cathedral. Every bell tolls a name. {h2} hears his own and stops. {h3} takes his hand.",
"The coral court of the Sea Witch's daughters, each missing one thing: a voice, a hand, a name. {h0} offers his sword, which they decline. 'We want your regrets,' they say.",
"The tenth boss is a whirlpool shaped like a throne. Beyond it {V} sits in a clamshell, polishing a small silver bell: a mermaid's voice, rung once for every wave."],
end:"The bell is broken, and the voice goes home. The sea exhales, and for the first time in a hundred years, the tide goes out. {h1} stands barefoot on the sand while the mermaid, her own voice returned, sings a short song, and it is not for anyone. It is just for the sea."},
{n:"The Frost Court",i:"❄️",V:"The Snow Queen",P:"the Frost Court",d:"A palace of ice where hearts go to stop.",
taunts:["Cold is kinder than love.","I only wanted you to stop hurting.","One splinter. One look. One winter.","Stay. The ice remembers everyone."],
pro:"A mirror shattered and its splinters fell across the world. One lodged in a boy's eye and one in his heart, and {V} came for him in a sleigh. She has been collecting hearts ever since, and the frost is spreading south. Eight heroes, each with a splinter of their own, stand at the edge of the white and agree to go in.",
ch:["{h0} feels the cold in his teeth. {h2} gives her scarf to {h1}, who doesn't need it and takes it anyway. The first boss, a frost-bear in a coat of icicles, falls with a sigh.",
"A forest of frozen birds, each singing its last note. {h3} cannot bring herself to break the silence. {h6} does it for her.",
"A snowstorm that spells out names. {h4} reads her own. {h5} brushes it away with his sleeve.",
"The reindeer know a way through. {h3} bows, they nod, and the party follows a trail of antler-prints into a blizzard that never ends.",
"{h7} audits the Snow Queen's treasury and finds every coin is a frozen tear. The ledger balances only in grief.",
"A hall of ice mirrors, each splinter a different lie. {h4} smashes one and sees his own childhood. The shard keeps glittering.",
"{h6} drills the ice-guard until they remember how to march. They march straight into the sea. It's a mercy.",
"{h5} remembers how to laugh, and the splinter in his chest cracks. It's a small noise. {h1} hears it, and for a moment, she smiles.",
"The Queen's throne room is silent. {V} appears at the end, in a gown of snow, and asks them one question: 'What do you remember?'",
"The tenth boss is the blizzard itself. Beyond it, a single child sits on the ice, trying to spell a word with frozen pieces. The word is 'ETERNITY'."],
end:"The word will not spell. {V} lets the last splinter go, and the palace begins to melt, one drip at a time. {h2} holds out her hand. The Queen takes it. Spring, which has been waiting for nine hundred years, finally gets its turn."},
{n:"The Clockwork Workshop",i:"⚙️",V:"The Toymaker, Herr Drosselmeyer",P:"the Workshop",d:"Everything ticks. Everything watches. Everything is for sale.",
taunts:["Wind me up and see what I do.","Every toy has a key. Where is yours?","I carved the heart you're so proud of.","You'll make a lovely marionette."],
pro:"Behind a shop window, in a street no map shows, a toymaker builds soldiers that tick, dolls that cry, and puppets that pray. {V} wanted children who would never grow up. The toys are escaping. So are the children. Eight heroes who were once toys or loved them wander in at midnight, and the clocks begin to strike.",
ch:["{h0} presents arms to a regiment of wooden soldiers and gets presented arms in return. The first boss, a drum-major in brass, is an honest soldier and a terrible conversationalist.",
"A hall of dolls with porcelain faces, singing a lullaby in a minor key. {h3} examines one and diagnoses 'grief'. {h4} says that's not a diagnosis. {h3} says it's the only one.",
"The music boxes are all playing different songs. {h6} finds the beat and dances. The room falls into step. Fifty dolls wave goodbye.",
"{h1} is told a nose can grow, and then given a mirror. {h2} watches it grow, laughs, and is turned into a small wooden horse for ten seconds.",
"A cuckoo clock the size of a cathedral. The bird emerges, bows, and swallows a boy whole. {h0} cuts him out with a bread knife.",
"{h5} follows a red slipper through the maze, always three steps behind. The slipper is dancing. It will dance until it breaks something.",
"The mechanical magician is just a trick. The real trick is that the audience is made of the same stuff. {h4} takes a bow, and the crowd claps with wooden hands.",
"{h7} gets his strings tangled and punches the nearest toy. It was {h2}. They swap places. They don't discuss it.",
"{V} appears, tall and thin in a coat full of drawers. 'You've made a mess,' he says. 'I made a world. It was perfect. It was quiet.' {h0} replies with a salute.",
"The tenth boss is the Workshop's heart: a pendulum clock whose ticking is everyone's pulse. Behind it, a locked drawer labelled 'REAL'."],
end:"The clock is stopped, and every toy takes its first free breath. {V} sits at his bench, small at last, and begins to mend a broken drum. {h0} salutes him and walks out. The street that no map shows becomes a street with a name."},
{n:"The Dragon's Wedding",i:"🐉",V:"The Wyrm Groom, Lord Vermithrax",P:"the Wedding Valley",d:"A wedding where the groom is a dragon and the bride is a kingdom.",
taunts:["Do you take this kingdom to be your hoard?","Every guest is a gift. Every gift is gold.","I do. I do. I do. I do.","Please enjoy the toast. It is you."],
pro:"A king promised his daughter to a dragon in exchange for peace, and the dragon took the wedding very seriously. {V} wants every guest, every priest, every cook and every bridesmaid at his table. The wedding has lasted a hundred years. Eight heroes who were not invited decide to arrive anyway, and bring a very large knife.",
ch:["{h0} dons his spare helm, nods at the sentry dragon, and is mistaken for a bridesmaid. The first boss, a wedding-cake gargoyle, wobbles as it falls.",
"The aisle is strewn with petals and burned wedding invitations. {h1} reads one: 'Please RSVP in screaming.' {h4} files her reply.",
"A bridal chamber with a window and a hundred locks. {h3} knocks and the bride, thin as paper, whispers a request: 'Please do not kill him. Just stop the wedding.'",
"{h5} dances with a bridesmaid who is not a bridesmaid. She does not let go. {h6} cuts in. The dance ends badly, and beautifully.",
"A banquet of golden fruit. {h2} resists, {h7} samples, and a vine climbs out of his sleeve. The boss is a florist who has seen too much.",
"The best man is a wolf in a tuxedo. {h1} wants to shoot him. {h0} stops her. The wolf gives a toast about loyalty. It's very good.",
"The priest is a basilisk with excellent diction. 'If anyone objects,' he says. Everyone objects. The service is suspended.",
"{h4} burns the cake, and the cake screams. The groom stops mid-vow and says: 'That was my mother.'",
"{V} rises from the altar, scales glittering like a thousand rings. He bows to the party. 'I will honor you,' he says, 'with the finest seat at the head table.'",
"The tenth boss is the wedding march itself, a hundred drums in a furious rhythm. Behind it, the bride sits quietly, holding a ring that does not fit."],
end:"The ring is returned, and the wedding is called off with an apologetic cough. {V} curls up at the foot of the altar, smaller than anyone expected, and weeps into his claws. The bride kisses his snout, then walks out into the morning, unmarried and unafraid."},
{n:"The Bone Orchard",i:"🦴",V:"Baba Yaga, Mother of the Walking Hut",P:"the Bone Orchard",d:"A garden of skulls where the fence is made of fingers and the gate asks riddles.",
taunts:["Is it real, or is it rotted?","Hut, hut, turn your back to the forest.","Come in. Come in. Stay forever.","I will grind your bones for bread."],
pro:"Deep in the birch forest stands a hut on chicken legs, fenced with bones and lit by skull-lanterns. {V} lives inside, cooking children, weighing guests, and keeping the old magic hungry. She has grown tired of waiting and has begun walking toward the villages. Eight heroes who have each knocked on her door once come back to give her a different answer.",
ch:["{h0} knocks on the gate. The gate asks a riddle. He answers. The gate laughs. 'Wrong,' it says, 'but I like your spirit.' The first boss, a bone-wolf, bursts from the fence.",
"The path through the orchard is paved with fingers. {h4} counts them and loses count. {h1} counts them and lights a lantern.",
"A well that whispers a name. {h3} listens. It is her mother's. She drops a stone in and it never lands.",
"{h5} meets the three riders: dawn, noon and midnight. Each asks for a toll. He pays in stories. The last rider is unsatisfied.",
"The Firebird nests in the highest tree. {h4} tries to bargain. The bird gives a single feather, which burns like a promise.",
"{h2} finds the Walking Hut sleeping and sits on its roof. It wakes up, stands, and walks with him toward the horizon. He has never been so far.",
"A banquet laid for ghosts. {h6} sits among them and tells a story. They weep, then ask for more.",
"{h7} finds the Doll in a hollow tree, thin as a bone. She tells him the way. She asks only to be fed.",
"{V} appears in her mortar, pestle in hand, sweeping away the tracks of her own flight. 'You came back,' she says. 'Few do. Fewer are fed.'",
"The tenth boss is the orchard itself: every tree lifting its roots and walking. Behind it, a hut with its door ajar and a single candle burning in the window."],
end:"The hut kneels. {V} steps out, stiff and ancient, and looks at the sun. 'It's been a while,' she says. She hands {h0} her pestle, her mortar, and the key to the gate. 'Be kind,' she says. 'Or at least be fair.'"},
{n:"The Thousand Nights",i:"🕌",V:"The Vizier of Smoke",P:"the Palace of Nights",d:"A palace where stories are currency and the last tale decides who lives.",
taunts:["One more night. One more story. One more head.","I have a thousand tales and none are kind.","Wish carefully. Wish quietly. Wish never.","The lamp remembers every master."],
pro:"A sultan once married a new bride each night and had her executed at dawn, until a clever storyteller kept him listening. {V} is the vizier who brought him the brides, and he has not stopped. The palace grows a new tower each night, and a new bride vanishes. Eight heroes who each owe their lives to a story walk through the Bazaar of Smoke to find the last one.",
ch:["{h0} bows to the first guard and is mistaken for a merchant. {h2} counts the exits. The first boss, a sandstorm in the shape of a lion, retreats when {h3} begins to speak.",
"The market is an ocean of colour. Every stall sells something you've lost. {h5} buys back a memory. {h7} watches the merchant count his change in tears.",
"A flying carpet is stolen. A carpet seller weeps. {h7} fixes the loom. {h5} finds the thief. The boss is a minaret that folds.",
"{h1} spears a jar and a thief tumbles out. Forty of them. {h2} asks for the recipe for the oil. {h1} says it's a secret and a good one.",
"The Lamp Quarter sells wishes by the pound. {h4} haggles for an hour and ends with two. He won't say what for.",
"{h3} tells a story and the whole party falls asleep. When they wake, they are all different people for exactly one night.",
"The Vizier's library holds one book for every bride. {h6} reads one aloud. The pages sigh. The ink runs.",
"A snake rises from a basket and bites the flute. {h6} plays on, soothed by the quiet, and {V}'s guards follow him out into the sand.",
"The sultan's chamber is empty except for a hundred and one candles. {V} blows them out one by one. 'A tale needs an ending,' he says.",
"The tenth boss is a djinn of smoke and sand. Beyond it, a door of beaten silver, and a woman writing a story with no last page."],
end:"The last story is told, and it ends not with a death but a dawn. {V} dissolves like incense, and the palace opens its windows for the first time in a thousand nights. {h3} closes her book and says, 'That's enough for tonight.' It is the best ending anyone has heard."},
{n:"The Last Page",i:"📖",V:"The Author Who Stopped Writing",P:"the Last Page",d:"Where every tale ends, and what's left when the ink runs out.",
taunts:["Once upon a time. The end.","You're a footnote. I'm the margin.","Every story needs a villain. I'm tired of it.","I'm the one holding the pen."],
pro:"At the end of every tale is a final page, and beyond it is a blank space where the Author sits, pen in hand, unable to write. {V} has stopped writing, and every story is fading: heroes forget their names, villains forget their grudges, and happy endings turn grey. Eight heroes, who each know what it's like to be written, walk into the margin to ask for a different ending.",
ch:["{h0} stands at the edge of the text and stares into white. The first boss, a typo with teeth, comes at him sideways. {h1} cuts it down with a dart of ink.",
"The Library of Unfinished Books: every shelf whispers a half-sentence. {h4} reads one aloud and the ghost behind it weeps with gratitude.",
"A tea party that never ends. The Hatter pours. The Dormouse sleeps. {h3} takes a cup and is promptly asked a riddle with no answer.",
"{h2} meets the Queen of Hearts, who demands his head. He says it's his and he's keeping it. The Queen is delighted. Nobody has said no in years.",
"{h5} follows a grin that floats through the corridors. It tells him three secrets. One is true, one is false, and one is about him.",
"The Mimic Chest looks innocent. It is not. {h7} opens it carefully. Inside is a smaller chest. Inside that is a note: 'Go home.'",
"{h6} finds the stage manager of all stories, panicking over a cue sheet. 'The tale has no end,' he says. 'I can't call the curtain.'",
"A staircase of paragraphs. Each step is a sentence. {h0} climbs. The sentences change under his feet. The last one reads: 'He did not fall.'",
"{V} sits in a plain chair in a plain room. 'I'm tired,' she says. 'Every ending is a death. I'd rather not write another.'",
"The tenth boss is the Blank: a white that eats colour and sound. Beyond it, a pen, a bottle of ink, and a page with a single line: 'Once upon a time.'"],
end:"{h0} hands {V} the pen, and she writes one more line. It is not 'the end.' It is the start of everyone's next story. The Library fills with new words, and the heroes walk out into the margins, ready, at last, to be read."}
];
for(let i=0;i<F.length;i++)Object.assign(CAMPS[i],F[i]);
})();

/* ---- v4: dark fairytale flavor: monsters, realms, quips, items, UI names ---- */
(function(){
const M=`Cave Rat=Rat-Piper's Rat|Bat=Vampire Bat|Spider=Weaver Spider|Slime=Poison Puddle|Shroom=Toadstool Sprite|Mole=Gnome-Mole|Rock Golem=Stone Golem|Eyeball=Evil-Eye|Stone Troll=Cave Troll|Cave Dragon=Hoard Dragon|Broodmother=Spider Queen|Cave Lich=Mirror Lich|Wolf=Big Bad Pack Wolf|Boar=Tusked Boar|Treant=Hungry Oak|Snake=Briar Serpent|Frog=Toad Prince|Owl=Owl of Omens|Bear=Three-Bears' Bear|Beetle=Thorn Beetle|Ancient Stag=White Stag|Forest Wyrm=Hollow Wyrm|Great Oak=Gallows Oak|Bear King=Bear Under the Hill|Scorpion=Sultan's Scorpion|Mummy=Pharaoh's Mummy|Camel=Haunted Camel|Vulture=Carrion Roc|Cactus=Thorny Djinn|Sand Worm=Sand Wyrm|Genie=Smoke Genie|Lizard=Basilisk Hatchling|Sphinx=Riddling Sphinx|Sand Titan=Sand Colossus|Pharaoh's Ghost=Vizier's Ghost|Giant Scorpion=Scorpion King|Penguin=Frost Goose|Snowman=Snow Golem|Polar Bear=White Bear|Ice Wolf=Winter Wolf|Walrus=Ice Walrus|Frost Imp=Splinter Imp|Yeti=Snow Yeti|Snowball=Frozen Heart|Frost Giant=Ice Giant|Ice Dragon=Winter Dragon|Yeti King=Snow King|Blizzard Queen=Snow Queen's Echo|Fire Imp=Ember Imp|Lava Slug=Lava Slug|Salamander=Fire Salamander|Magma Golem=Forge Golem|Ember Bat=Ash Bat|Hellhound=Cerberus Pup|Cinder Chick=Cinder Chick|Demon=Pit Demon|Magma Lord=Lord of the Forge|Fire Drake=Fire Drake|Inferno Titan=Inferno Titan|Phoenix Prime=Phoenix Prime|Crocodile=Marsh Croc|Bog Witch=Bog Witch|Leech=Blood Leech|Mosquito=Plague Gnat|Bog Zombie=Drowned Peasant|Snapper=Snapping Turtle|Wisp=Will-o'-the-Wisp|Toad=Venom Toad|Hydra=Seven-Headed Hydra|Swamp Mother=Marsh Mother|Giant Gator=Giant Gator|Rot King=Rot King|Crab=Hermit Crab|Shark=Silver Shark|Octopus=Ink-Witch Octopus|Jellyfish=Ghost Jelly|Pirate=Drowned Pirate|Puffer=Poison Puffer|Eel=Sea Serpent Eel|Seagull=Omen Gull|Kraken=Kraken|Leviathan=Leviathan|Pirate King=Dead King of the Sea|Megalodon=Megalodon|Cloud Sprite=Cloud Sprite|Thunderbird=Thunderbird|Grumpy Angel=Fallen Cherub|Wasp=Wasp Soldier|Kite=Wind Kite|Balloon=Bewitched Balloon|Gryphon=Gryphon|Storm Sprite=Storm Sprite|Storm Giant=Storm Giant|Sky Dragon=Sky Dragon|Thunder Roc=Thunder Roc|Cloud Duke=Duke of Clouds|Pigeon=Plague Pigeon|Gargoyle=Cathedral Gargoyle|Burglar=Cat Burglar|Mime=Silent Mime|Sewer Gator=Sewer Gator|Hot Dog Vendor=Pie Seller|Mascot=Rag Doll|Taxi=Pumpkin Carriage|The Mayor=The Burgomaster|Skyscraper Golem=Tower Golem|Mega Mascot=Giant Rag Doll|Crime Boss=Thief Prince|Alien=Moon Sprite|Robot=Clockwork Soldier|UFO=Floating Lantern|Comet=Falling Star|Astronaut=Star Wanderer|Space Whale=Star Whale|Satellite=Silver Moonlet|Gremlin=Star Gremlin|Planet Eater=Moon Eater|Star Tyrant=Star Tyrant|Mothership=Moon-Ship|Void Maw=Void Maw|Gummy Bear=Gummy Bear|Lollipop Knight=Lollipop Knight|Cupcake=Poisoned Cupcake|Donut=Frosted Ring|Ice Cream=Ice-Cream Ghost|Cookie Thug=Cookie Thug|Marshmallow=Marshmallow Ghoul|Jelly=Jelly Blob|Cake Colossus=Cake Colossus|Sugar Dragon=Sugar Dragon|Candy Queen=Candy Queen|Chocolate Golem=Chocolate Golem|Ghost=Pale Ghost|Skeleton=Rattling Skeleton|Zombie=Grave Zombie|Vampire=Lord Vampire|Pumpkin Head=Pumpkin Head|Witch=Hedge Witch|Poltergeist=Poltergeist|Bat Swarm=Bat Swarm|Lich King=Lich King|Grim Reaper=Grim Reaper|Count Overdue=Count Ravenmoor|Headless Boss=Headless Horseman|Gear Gremlin=Gear Gremlin|Drone=Clockwork Bee|Forklift=Iron Ox|Spark=Spark Imp|Printer=Press Golem|Toaster=Toaster Goblin|Welder=Forge Hag|Conveyor Crab=Conveyor Crab|Mega Mech=Giant Automaton|Assembly Overlord=Assembly Overlord|Scrap King=Scrap King|Boiler Beast=Boiler Beast|Gem Beetle=Gem Beetle|Crystal Golem=Crystal Golem|Prism Sprite=Prism Sprite|Geode Bat=Geode Bat|Shardling=Shardling|Quartz Wolf=Quartz Wolf|Opal Slime=Opal Slime|Diamond Dog=Diamond Dog|Crystal Hydra=Crystal Hydra|Prism Dragon=Prism Dragon|Gem Queen=Gem Queen|Shard Titan=Shard Titan|Monkey=Monkey Thief|Jaguar=Jaguar Spirit|Parrot=Tale-Teller Parrot|Gorilla=Ape Guardian|Viper=Viper|Tiki Mask=Idol Mask|Toucan=Toucan|Piranha=Piranha|Jungle King=Jungle King|Giant Anaconda=Giant Anaconda|Temple Guardian=Temple Guardian|Jaguar God=Jaguar God|Goat=Black Goat|Eagle=Eagle Eye|Rock Troll=Mountain Troll|Hermit=Mad Hermit|Condor=Condor|Ibex=Horned Ibex|Avalanche=Avalanche Spirit|Boulder=Living Boulder|Mountain King=Mountain King|Wyvern=Wyvern|Storm Condor=Storm Condor|Stone Colossus=Stone Colossus|Imp=Little Imp|Devil=Devil's Clerk|Lava Elemental=Lava Elemental|Bone Dragon=Bone Dragon|Soul Eater=Soul Eater|Pitchfork Intern=Pitchfork Imp|Ash Wraith=Ash Wraith|Archdevil=Archdevil|Lord of Paperwork=Lord of Contracts|Bone Wyrm=Bone Wyrm|Pit Fiend=Pit Fiend|Nightmare=Night-Mare|Sleepwalker=Sleepwalker|Pillow Golem=Pillow Golem|Clown=Jack-in-the-Box|Mirror Twin=Mirror Twin|Moth=Dream Moth|Snoozer=Sleep Sprite|Dream Eater=Dream Eater|Sandman=Sandman|Insomnia Titan=Insomnia Titan|Nightmare King=Nightmare King|Alarm Clock Lord=Clock Lord|Stapler=Snapping Trap|Cubicle Zombie=Court Zombie|Intern=Page Boy|Manager=Court Chamberlain|Coffee Golem=Teapot Golem|Spreadsheet Beast=Ledger Beast|Fax Machine=Raven Post|CEO Hydra=King's Hydra|HR Dragon=Royal Dragon|Quarterly Report=Royal Decree|Mega Meeting=Council of Crows|Angry Chicken=Cursed Hen|Cow=Haunted Cow|Scarecrow=Scarecrow|Pig=Wicked Pig|Goose=Goose of Gold|Bull=Black Bull|Tractor=Iron Plow|Sheep=Wolf in Sheep's Clothing|Giant Rooster=Giant Rooster|Mega Bull=Mega Bull|Scarecrow King=Scarecrow King|Combine Harvester=Reaper's Scythe|Flamingo=Pink Phantom|Coconut=Coconut Ghost|Sunburn Imp=Sunburn Imp|Beach Ball=Bouncing Pearl|Lifeguard=Drowned Lifeguard|Giant Crab=Giant Crab|Tiki God=Tide God|Sand Castle King=Sand Castle King|Beach Kraken=Beach Kraken|Angry Rat=Hungry Rat|Basement Spider=Cellar Spider|Haunted Roomba=Dust Imp|Dust Golem=Dust Golem|Bat With Opinions=Gossip Bat|Mildew Blob=Mildew Blob|The Water Heater=The Cauldron|Gator in a Tie=Gator in a Crown|Rat Union Rep=Rat King|Plumber's Nightmare=Drain Dragon|Flush Phantom=Flush Phantom|Drain Mosquito=Drain Mosquito|Sewer Mime=Sewer Mime|The Fatberg=The Fatberg|Goblin Cashier=Goblin Cashier|Kiosk Salesman=Peddler Goblin|Rogue Shopping Cart=Runaway Cart|Mall Cop Troll=Gate-Keeping Troll|Sample Lady=Sample Witch|Food Court Ogre=Feast-Hall Ogre|Gerald, Regional Manager=Gerald the Gate-Goblin|Skeleton Librarian=Skeleton Librarian|Zombie Intern=Zombie Scribe|Shushing Ghost=Shushing Ghost|Angry Dictionary=Angry Dictionary|Late Fee Vampire=Late-Fee Vampire|Bookworm (Huge)=Huge Bookworm|The Dewey Decimator=The Library Warden|Mushroom Masseuse=Mushroom Masseuse|Hot Tub Toad=Hot-Spring Toad|Steam Room Specter=Steam Specter|Spa Snail=Spa Snail|Cucumber Eye Horror=Cucumber-Eye Horror|Lotion Elemental=Lotion Elemental|The Spore Queen=The Spore Queen|Fire Intern=Fire Imp|Slack Salamander=Idle Salamander|Spreadsheet Elemental=Cinder Elemental|Printer of Wrath=Forge of Wrath|Middle Manager Imp=Overseer Imp|The Quarterly Review=The Ember Judge|Freezer Burn Fiend=Frostbite Fiend|Rogue Ice Tray=Ice Cube Knight|Penguin Stock Boy=Frost Goose Squire|Hostile Snowman=Hostile Snowman|Ice Cream Wraith=Ice Cream Wraith|Frostbitten Broccoli=Frostbitten Bean|The Pot Pie Colossus=The Pie Colossus|Pushy Cloud Salesman=Pushy Cloud Peddler|Cherub in a Vest=Cherub Guard|Seagull Gatekeeper=Gull Gatekeeper|Harpy Concierge=Harpy Host|Lightning Intern=Lightning Imp|Free Brunch Mimic=Feast Mimic|Zeus, Timeshare Closer=Zeus, Cloud Landlord|Possessed Luggage=Possessed Trunk|Lost-Baggage Poltergeist=Lost-Luggage Poltergeist|Delayed Phoenix=Late Phoenix|TSA Gargoyle=Border Gargoyle|Overpriced Water=Cursed Well-Water|Pilot Zombie=Sky Captain Zombie|The Terminal Overlord=The Gate Overlord|Rogue Chatbot=Talking Mirror|Spam Swarm=Spell Swarm|Glitch Gremlin=Hex Gremlin|Floppy Disk Revenant=Scroll Revenant|Extension Cord Serpent=Rope Serpent|Blue Screen Beast=Blue Fog Beast|The Mainframe=The Grand Orrery|Hold Music Banshee=Lullaby Banshee|Receipt Gremlin=Receipt Gremlin|Reply-All Horror=Echo Horror|Mimic Office Chair=Throne Mimic|Manager Summoner=Chamberlain Summoner|Entitled Customer=Entitled Noble|The Customer (Always Right)=The Noble (Always Right)|Dragonling Intern=Dragonling Squire|Gold Mimic=Gold Mimic|Legal Department=Royal Lawyers|Compliance Wyrm=Law Wyrm|Hostile Takeover=Hostile Takeover|T-Rex Shareholder=Great Lizard Lord|Draconis Maximus, CEO=Draconis Maximus, the Hoard King|Unpaid Overtime Spirit=Unpaid Labor Spirit|Eternal Intern=Eternal Apprentice|Deadline Demon=Deadline Demon|Open Floor Plan Horror=Open Hall Horror|Meeting That Could Have Been An Email=Council That Could Have Been a Letter|Mandatory Fun Mascot=Mandatory Fun Jester|The Eternal Stand-Up=The Eternal Stand-Up`;
const MAP={};M.split("|").forEach(p=>{const i=p.indexOf("=");MAP[p.slice(0,i)]=p.slice(i+1)});
const R=a=>a&&a[0]&&MAP[a[0]]&&(a[0]=MAP[a[0]]);
THEMES.forEach(t=>{t.mobs.forEach(R);t.boss.forEach(R)});
REALMS.forEach(r=>{(r.mobs||[]).forEach(R);R(r.boss)});
const RN=["The Cellar of Cauldrons","Sewers of the Piper's Rats","The Goblin Marketplace","The Crypt of Overdue Tales","The Mushroom Spa & Poison Bath","The Forge of the Fire Queen","The Pantry of Winter","The Cloud Castle (Rented)","The Haunted Crossroads","The Hall of Whispering Mirrors","The Tower of Talking Doors","The Dragon's Hoard & Counting-House","The Dimension of Unfinished Business"];
const IN=["Every legend begins in a cold cellar, with a cauldron that is not as empty as it looks. Do not stir it. It stirs back.","Down here, rats keep time to a tune nobody hums. Tread softly. The Piper is owed a debt.","A market of goblins selling shoes without soles and spells without warranty. Every deal is a trap. Most are cheerful about it.","The library of forgotten tales, where every overdue book bites. Quiet, please. They're listening.","A spa where the water is poison and the towels are cursed. The mushrooms insist it's good for you.","The Fire Queen's forge, where swords are quenched in sorrow. Warm welcome. Warmer exit.","The pantry of winter, stocked with frozen hearts and stolen summers. Bring a coat. Bring two.","A castle in the clouds, rented by the hour to anyone willing to fall. The giants are not at home. The giants are always home.","The crossroads where all paths lead to the same stranger. He offers a bargain. Don't.","The Hall of Whispering Mirrors: every reflection has an opinion about your life.","The Tower of Talking Doors, each of which says no, then yes, then no.","The dragon's counting-house, where hoards are weighed in souls. The dragon is in. The dragon is always in.","A land of unfinished business. The tale refuses to end. So do the monsters."];
const MID=["The cauldron is not a boss. It is a very old appetite. Please stop poking it.","The rats are organizing. Nobody asked. Nobody can stop them.","A goblin offers a deal. Another offers the opposite. Both lie. Both are delightful.","A book bites you. You deserve it. It's overdue.","The mushrooms ask you to relax. You do not.","The forge hisses. You hiss back. Everyone wins.","The pantry is colder than it should be. Something has been eating the summers.","The cloud floor is thinner than advertised.","The stranger smiles. His teeth are all the same shape.","A mirror winks. A second mirror frowns. A third says nothing.","A door opens, but only onto another door.","The dragon yawns. A knight is lost in the yawn.","The tale stutters. Someone lost the next page."];
const OUT=["{b} slumps, and the cellar sighs. You are, for a moment, not hungry.","{b} falls. The rats stand a respectful moment, then eat what remains.","{b} drops a coin that is not a coin. Check your pockets.","{b} is bookmarked at last.","{b} goes limp and the poison cools. The towels remain cursed.","{b} cools to a lump of slag. The forge forgives you. Slightly.","{b} thaws into a puddle of tears and one stolen summer.","{b} plummets out of the clouds. Somewhere below, a hen lays an egg.","{b} turns to smoke, and the stranger tips an invisible hat.","{b} shatters. Seven years of bad luck land mostly on the party.","{b} swings shut for the last time.","{b} rolls off the hoard, groaning, and signs nothing.","{b} falls, and the tale takes a breath."];
REALMS.forEach((r,i)=>{if(RN[i]){r.n=RN[i];r.intro=IN[i];r.mid=MID[i];r.out=OUT[i]}});
const sp=(a,b)=>{a.splice(0,a.length,...b)};
sp(ADJ,["Cursed","Haunted","Enchanted","Forgotten","Whispering","Sleeping","Poisoned","Gilded","Mirror","Thorny","Candied","Hollow","Frozen","Starving","Wishing","Weeping","Crooked","Silver","Mossy","Velvet","Midnight","Rotten","Eternal","Hungry","Twisted","Bleeding","Lantern-Lit","Ragged","Briar","Grimm","Gloomy","Fabled","Barefoot","Lost","Black","Pale","Ashen","Whistling","Grinning","Weary"]);
sp(MOB_ADJ,["Hungry","Cursed","Sneering","Sleepless","Wicked","Feral","Pale","Grinning","Starving","Withered","Enchanted","Crooked","Shrieking","Gilded","Rotten","Ravenous","Ancient","Sulking","Bewitched","Gloomy"]);
sp(BOSS_TITLES,["Queen of","King of","Warden of","Witch of","Lord of","Mother of","Beast of","Keeper of","Tyrant of","The Last Rhyme of","Baron of","Hag of"]);
sp(HERO_GEN_QUIPS,["Once upon a time, I had options.","This is not how the story goes in the book.","Whoever wrote this tale owes me an ending.","I was promised a happily ever after.","If I die, tell the narrator I was gorgeous.","Is this the part where we all learn something?","The moral of this story: run.","I don't remember choosing this chapter.","My fairy godmother is screening my calls.","Every path leads to teeth.","Don't eat anything. Don't sign anything. Don't ask the mirror.","The woods are lovely, dark, and deeply rude.","I'm just here for the moral.","Three wishes and I used them all on a sandwich.","We're the heroes. Allegedly.","Say the magic word. No, the other word.","The narrator is getting ahead of himself.","This chapter is longer than it needs to be.","I've been cursed before. This is worse. This is Tuesday.","Rule one of fairy tales: never split up.","Please do not read ahead.","I have a bad feeling about this cottage.","Why is the gingerbread warm?","I'd like to speak to the author.","That was supposed to be the last chapter.","We were supposed to get a montage.","I read the book. It doesn't end like this.","Heroes get a happy ending. I'd settle for lunch.","They never tell you about the paperwork.","Thirty-two teeth. Thirty-one are his.","Magic mirror, mirror on the wall, why am I still here?","Fate has a sense of humor. It's mean.","At least the scenery is moody."]);
sp(ENEMY_QUIPS,["Grrraaah! (This is my only line.)","I have children! Well, apprentices.","Please stop hitting me. It's my first chapter.","I was promised a happy ending.","Huff and puff and... ow.","You're not on the guest list!","Who's been sleeping in my forest?","Mirror, mirror, on the wall, why me?","I'm just the first monster!","I was the hero in a different story.","The narrator promised I'd win.","Not the face! It's my best feature.","I eat heroes. I'm sorry. I'm genuinely very sorry.","Do you have any idea how long I've been cursed?","This isn't in my contract!","You'll never take me alive! ...Hm.","Tell my coven I'm sorry!","I'm only the monster because the author said so.","A pox on you! And a mild rash.","This is a misunderstanding. Also a bite.","Once upon a time, I was a very nice toad.","Dragged out of bed for this?","Why do heroes always come at dawn?"]);
sp(BOSS_QUIPS,["You'll never see the last page!","I've read your ending. It is LAUGHABLE.","I was cursed before your grandmother's grandmother!","Come closer, little hero. I won't bite. Much.","Every tale needs a villain. Today, it's tragically me.","The moral of this story is: run.","I'll grind your bones for bread!","You have wandered into the wrong chapter!","Once upon a time, you lost.","I've eaten braver than you for breakfast. And lunch."]);
sp(DEATHS,["took a bite of the wrong gingerbread","kissed the wrong frog","followed the pied piper too far","said the Queen's name three times","accepted an apple from a stranger","looked into the mirror for too long","stepped off the path","tried to out-riddle a sphinx","asked the wolf what big teeth he had","fell asleep at the wrong spindle","danced until the shoes would not stop","made a deal with a sly little imp","opened Bluebeard's door","told the giant a joke he didn't like","wished for just one more wish","tried to outrun the Gingerbread Man","counted the seven dwarfs. There were eight","entered the cottage without knocking","wore the red shoes","swallowed the whole pomegranate"]);
sp(WIPE_LINES,["The whole party fell into a hundred-year nap.","Everyone is down. The narrator calls it 'a plot twist'.","A page turns. The party wakes up wincing.","The tale rewinds, and everyone gets a second chance. Not a third."]);
sp(SUFX,["of Mild Regret","of Questionable Origin","of the Third Wish","of the Hollow Wood","of Unpaid Debts","of the Crooked Mile","of the Old Crone","of Seven Years' Bad Luck","of the Wicked Queen","of the Thirteenth Fairy","of the Gingerbread Gate","of the Frost Splinter","of the Silver Slipper","of the Thorn Hedge","of Midnight","of the Mirror","of the Weeping Willow","of the Last Page","of the Golden Goose","of the Beast"]);
Object.assign(BASES,{weapon:[["Silver Sword","⚔️"],["Iron Skillet","🍳"],["Crusty Baguette","🥖"],["Hammer of Hearts","🔨"],["Huntsman's Axe","🪓"],["Walking Stick","🏏"],["Fishing Rod","🎣"],["Witch's Broom","🧹"]],helm:[["Helm","⛑️"],["Pail","🪣"],["Colander","🥣"],["Wizard Hat","🧙‍♂️"],["Top Hat","🎩"],["Crown","👑"],["Stewpot","🍲"]],armor:[["Chainmail","🦺"],["Dressing Gown","🥋"],["Barrel","🛢️"],["Red Riding Cloak","🧥"],["Tuxedo","🤵"],["Pumpkin Shell","📦"]],trinket:[["Amulet","📿"],["Lucky Sock","🧦"],["Skeleton Key","🔑"],["Spinning Top","🌀"],["Rubber Duck","🦆"],["Wishing Stone","🪨"],["Mood Ring","💍"],["Four-Leaf Clover","🍀"]]});
sp(HR,["Reminder: heroes are not eligible for happy endings.","Please stop naming the rats.","The narrator is out of the office.","Do not feed the gingerbread. It feeds on you.","The Big Bad Wolf has a new support group on Thursdays.","The mirror says you look tired.","Reminder: wishes are non-refundable.","The beanstalk has a height restriction. It's up.","Piper is due payment. By law.","Stepmother has issued a new rule. Don't ask which.","Witches: please remember to take your cauldron home.","Sleeping princess: please do not wake before noon.","The Three Bears have complaints about the porridge.","A reminder that all dwarfs are, in fact, seven.","Lost something? Check the pumpkin.","Fairy godmothers are now charging for wands.","Tonight: a ball. Midnight: a curfew.","The woodcutter is out of firewood again.","Please do not read ahead.","The frog is not a prince. The frog is a frog."]);
const Q=QUIP;
const set=(k,a)=>sp(Q[k],a);
set("crit",["BOOM. Put that in the book.","That one will go in the footnotes.","Critical hit! The narrator gasps.","Was that me? That was me. Nice.","Hit 'em where the moral hurts.","I regret nothing. Especially that.","And THAT'S how you rewrite an ending.","Yeet, said the Huntsman.","Oh, that was NASTY. Even for a fairy tale."]);
set("lowhp",["Everything hurts and I'm not even in the good chapter.","I'm fine. I'm FINE. Someone heal me.","Tell my family I almost had a happy ending.","Granny? Anyone? I'll pay in porridge.","I can see a light! Oh wait, that's a lantern.","Is there a heroic way to say 'ow'?","Remember me as I was: mostly intact."]);
set("kill",["Another one bites the dust. They're all so dusty.","One less monster in the woods.","Rest in pieces.","I'm not saying it was easy. I'm saying I'm bored.","Next! Please take a number.","They never learn.","Cha-ching. Wait, wrong sound.","Dead. Efficient. Cheap."]);
set("bossIn",["Oh no. It's the BIG one. It's got a title and everything.","Is that a boss? It's wearing a crown.","I did not stretch for this.","Everyone act natural. Pretend we're not here.","That is a LOT of health bar.","Can we reschedule? I'm busy being scared.","If we die, tell them it was the wolf."]);
set("bossDead",["Boss down! Someone ring the bells.","That's going in the next edition.","Ding dong, the witch is dead.","We did it! Don't make it weird.","Villain: defeated."]);
set("loot",["Ooh, shiny. Mine now.","Is that gear? Please be gear.","Finders keepers, legally speaking.","I'll take it. It's probably cursed. Whatever.","The forest provides. Reluctantly."]);
set("lvl",["I feel stronger. Marginally. Spiritually.","Level up! Time to pretend I earned it.","New level, new me. Same back pain.","Another chapter. Another scar.","Stats go brrr."]);
set("clear",["Stage clear! Anyone got a cottage?","One stage down. Forever to go.","Nice work, team. Please never speak of it.","That went suspiciously okay.","On to the next catastrophe!","Great. Now do it again, but darker.","Moving on before the narrator notices."]);
set("allyDown",["Man down! Man... fainted. Man's fine.","Incident report time!","He'll be fine. Probably. Maybe. Eventually.","And that's why we wear helmets. Except he didn't.","Someone wake him before the curse sets in."]);
set("weather",["I don't remember ordering weather.","Of course it's weather. Of course.","This is just what I get for leaving the cottage."]);
set("reply",["Oh, stop it.","You're not wrong.","Technically correct. The worst kind.","I'm gonna pretend I didn't hear that.","Same, honestly.","Nobody asked, but thanks.","Wow. Okay.","I'm telling the narrator you said that.","We're all thinking it.","Can you not?","Bold of you to assume I was listening.","Ha. Ha. Ha.","Spoken like a true villain.","That's very Grimm of you."]);
set("hire",["Hi. I'm new. Where's the porridge?","Reporting for duty! And lunch!","What's the happy-ending situation?","I was told there would be snacks."]);
set("heal",["Thanks! Don't tell anyone I needed that.","Back in the story. Slightly.","Ahh. Magic. Billable, probably."]);
const rn=(arr,m)=>arr.forEach(o=>{const x=m[o.id];if(x){o.n=x[0];if(x[1])o.i=x[1]}});
rn(UPS,{sword:["Tap Training"],auto:["Squire Sprite","🧚"],crit:["Lucky Swings"],critdmg:["Wicked Multiplier"],gold:["Goose's Gold","🪿"],vit:["Hearth & Home"],armor:["Padded Cloaks","🧥"],umb:["Enchanted Umbrella"],luck:["Rabbit's Foot (Ethical)"]});
rn(SKS,{slash:["Huntsman's Cut"],cry:["Rallying Fairy Song"],cash:["Goose-Gold Gift","🪿"],meteor:["Falling Star of Questionable Origin","🌠"],hr:["Fairy Godmother's Wand","🪄"]});
rn(PERKS,{pay:["Golden Goose Pay","🪿"],power:["Giant's Lunch","🍖"],bunk:["Talent Scouts"],nep:["Royal Favor","👑"],luck:["Four-Leaf Contract"],tele:["Long Sleep","😴"],sky:["Weather Charms"],elev:["Magic Beanstalk","🌱"],sign:["Dowry","💍"]});
rn(UTILS,{manual:["Book of Fables","📘"],ticket:["Golden Egg","🥚"],pre:["Giant's Brew","🍺"],donut:["Granny's Pie","🥧"],egg:["Mystery Egg"]});
rn(GEMS,{gchest:["Gilded Chest"],gwallet:["Gem-Studded Purse","👛"],gpower:["Rune of Power"],gpick:["Wandering Minstrel's Invitation","🎟️"],gso:["Fairy's Wish Tip","⭐"]});
})();
(function(){const P={pigeon:"Carrier Pigeon (Unpaid)",ratres:"Rat With a Scroll",sock:"Sentient Slipper",cat:"Cardboard Cat",slime:"Emotional Support Slime",raccoon:"Raccoon Treasurer",gremlin:"Gremlin Squire",hamster:"Hamster in a Tiny Helmet",dragonling:"Tax-Evading Dragonling",parrot:"Sarcastic Parrot",hydra:"Therapy Hydra",phoenix:"Royal Phoenix",ghost:"Ghost of Grandmother's Cat",ceodog:"The King's Actual Dog"};PETS.forEach(p=>{if(P[p.id])p.n=P[p.id]});})();
(function(){const sp=(a,b)=>a.splice(0,a.length,...b);
sp(REALM_INTRO,["Welcome to {n}. The storybook said 'mild peril'. The storybook lied.","You've reached {n}. The locals are hostile. The weather is worse. The moral is missing.","{n}: a charming place, if you enjoy being hit. The narrator asks that you hit back.","Nobody asked to come to {n}. Everyone came anyway. That's called 'a plot'.","{n} appears on no map. It appears in several nightmares.","Once upon a time, in {n}, something went terribly wrong. It's still going.","Please keep arms, legs, and hope inside the carriage while crossing {n}.","The path into {n} is paved with good intentions and bad omens."]);
sp(REALM_MEMO,["The ravens say morale in {n} is low. So is the ceiling. Please duck.","A crooked sign reads: {n} has no inn. Break things instead.","The Hero of the Month is whoever is still alive. Congratulations.","Overtime in {n} is mandatory, retroactive, and paid in teeth.","We have outsourced fear to {n}. It's going terribly well.","A note nailed to a tree: 'Please stop naming the monsters.'","Whispering wind: 'The tale in {n} is longer than advertised.'","The crows have voted. {n} is cursed. Motion carried."]);
sp(REALM_OUT,["{b} falls with a dignified shrug. The narrator whispers: 'Now do it again, deeper.'","With {b} defeated, {n} is declared 'adequately cleared'. You get a gold star.","{b} drops a coupon for 10% off your next near-death experience.","The ground shakes. A stair appears. It says 'DOWN (MANDATORY)'.","{b} leaves a note: 'It was just a misunderstanding. Also, ow.'","You cleared {n}. The tale turns the page and sighs.","{b} dissolves into a stern lullaby.","{b} is gone, and the trees exhale."]);
const S=SUFX;const i=S.indexOf("of the Intern");if(i>=0)S[i]="of the Cunning Fox";})();
(function(){const P={pigeon:["Raven Messenger","🐦‍⬛"],ratres:["Piper's Rat","🐀"],sock:["Glass Slipper Sprite","👠"],cat:["Puss-in-Boots Kitten","🐱"],slime:["Poison-Apple Slime","🍏"],raccoon:["Robin's Bandit Raccoon","🦝"],gremlin:["Elf Apprentice","🧝"],hamster:["Dormouse in a Tiny Helmet","🐹"],dragonling:["Hoard-Hatched Dragonling","🐲"],parrot:["Tale-Teller Parrot","🦜"],hydra:["Lullaby Hydra","🐍"],phoenix:["Firebird Chick","🦚"],ghost:["Ghost of Grandmother's Cat","👻"],ceodog:["The Royal Hound","🐕"]};PETS.forEach(p=>{const x=P[p.id];if(x){p.n=x[0];p.e=x[1]}});})();
(function(){
const w=(id,n,d)=>{if(WXD[id]){WXD[id].n=n;if(d)WXD[id].d=d}};
w("clear","Clear Skies","Suspiciously pleasant. Nothing happens. Enjoy it while the narrator sleeps.");
w("confetti","Faerie Revel","Heroes attack 15% slower (dancing). Monsters hit 20% softer. Gold +40%.");
w("eclipse","Witching Eclipse","Arcane +30%. Monsters hit 25% harder. Very spooky. Very wicked.");
w("smog","Toxic Mist","Heroes slowly lose HP. Ranged −10%. Gold +20% (danger pay).");
w("meteor","Falling Stars","Wish-stars rain on the battlefield (monsters mostly). Gold +10%.");
w("ash","Ember Ashfall","Fire +20%. Hero damage −5%. Gold +10%: dragon-ash is apparently valuable.");
for(const k in WXD){if(WXD[k].d)WXD[k].d=WXD[k].d.replace(/hazard pay/g,"danger pay")}
const q=(k,a)=>{if(WX_QUIPS[k])WX_QUIPS[k].splice(0,9e9,...a)};
q("heat",["Why is it always hot in the dragon's den?","The sun has a grudge against me.","Is it the dragon or the weather? Either way: ow."]);
q("rain",["Of course it's raining. Of course.","I'm not paid enough for wet socks.","The sky is crying. So am I."]);
q("thunder",["Lightning? In a fairy tale? How original.","The sky has opinions. Loud ones.","Who angered the thunder-giant?"]);
for(const k in WX_QUIPS){if(["heat","rain","thunder"].includes(k))continue;WX_QUIPS[k]=WX_QUIPS[k].map(x=>x.replace(/\bHR\b/g,"the narrator").replace(/contract/g,"tale").replace(/budget/g,"magic"))}
BEATS.splice(0,9e9,
"{h0} finds a note nailed to a tree from {V}: '{T}' {h6} says it's probably a bluff. It isn't.",
"{V} sends a gift basket to {P}. It contains a note: '{T}' {h7} eats the basket anyway.",
"{h3} patches {h2} while {h1} counts the fallen. 'One more road,' {h5} mutters. 'One more crooked road.'",
"A crow lands on {h4}'s shoulder and recites the villain's schedule. {h0} writes it down. The crow wants a coin.",
"The party passes a village that is only chimneys. {h6} plays a quiet tune. Nobody comes out. Nobody ever does.",
"{h2} breaks a mirror by accident. Seven years of bad luck arrives immediately, and is not subtle.",
"{h7} offers a stranger a trade. The stranger offers back: 'Your shadow.' {h7} laughs, then checks the ground.",
"At the crossroads, {h1} refuses to pick a path. The path picks her. She grumbles but follows.",
"A gingerbread door, warm to the touch, hums a lullaby. {h5} says 'no'. {h3} says 'absolutely not'. {h0} breaks it down.",
"The moon is wrong tonight, a little too wide, a little too hungry. {h4} writes a spell. It's mostly a threat.",
"{V} whispers through the trees: '{T}' The trees nod politely. The party does not.",
"{h0} counts the wolves. {h2} counts the sheep. The numbers do not add up, and the wolves are not happy about it.");
})();

/* ---- v4.1: per-hero speech engine (hundreds of lines per hero, shuffle-bag, no repeats until exhausted) ---- */
const SEAT_VOICE={
van:["Behind me. All of you. Especially {ally}.","I am the wall. Walls do not flinch.","Nothing passes. Not wolves, not witches, not paperwork.","Shields up! Nobody gets eaten on my watch.","I took the first blow so {ally} wouldn't have to.","Steel is cheaper than regret.","Step back. This is my part of the story.","If it bites, it bites armor.","Hold the line! Hold it like a lullaby!","I was built for this chapter.","Stand firm. The path ends at me.","My armor has seen worse tales than this.","Take the hit. Give the hit back. Repeat.","The {enemy} wants a fight? Get in line.","I do not run. I do not nap. I block.","Heavy armor, heavy heart, heavy swing.","Nobody scratches the party while I'm standing.","That's a lot of teeth. I brought a lot of shield.","Forward, slowly, stubbornly, forever.","Blood and thorns. Just another Tuesday."],
mar:["Wind's from the east. Aim a hair west.","One arrow. One breath. One regret for the {enemy}.","Steady... steady... loose.","I never miss. I merely let things run into the arrow.","Spotted the {enemy}. Spotted the next one. Spotted a third behind it.","Eyes sharp, breath slow, arrow quick.","{ally}, hold still. I'm shooting past you.","From up here, everything looks like a target.","Quiet. Let me work.","Range is just courage with extra steps.","The bow doesn't care how brave you are. It cares where you point.","A feather, a string, a prayer.","Distance is my best friend.","Don't make me waste a good arrow on you.","They never see the second shot.","Count them. Mark them. Drop them.","If it moves, it's practice.","Ten paces and still a bullseye.","The forest taught me patience. The wolf taught me aim.","Another one for the quiver."],
bru:["SMASH first. Plot later.","Hold my {atk}. No, wait, I need it.","Whoever's next, step up. Whoever's last, run.","Rage is just feelings with a bigger sword.","I hit it. It broke. Easy.","Grr. That means 'good morning'.","My fists have opinions.","Let me at 'em. Let me at the {enemy}!","I don't do subtle. Subtle is for {ally}.","Break, then bandage.","Crunch. Crunch. Crunch.","I'm calm. I'm perfectly calm. *breaks table*","If it doesn't fall, hit it twice.","You call that a monster? I call it a warm-up.","Boom goes the {atk}.","I feel great. Terrible. Great.","My knuckles say 'hello'.","Hit first, apologize never.","The harder they come, the harder they fall.","ROAR. That's all I've got. ROAR."],
sup:["Everyone drink water. Hydrate before you bleed.","Stay behind me, dear. I've got you.","{ally}, you're bleeding. Don't argue.","Patched and ready. Mostly patched.","Heal now, scold later.","A little tea, a little magic, a lot of patience.","Nobody dies on my watch. Not today.","Hold still. This will only sting a lot.","I've sewn up worse than this. Not much worse.","Breathe, dear. The wolf is only a wolf.","Please stop getting hurt. Please. I'm tired.","There. Good as new. Good as nearly new.","Bandage, balm, blessing. In that order.","Don't thank me. Just live.","Every scar is a story. Let's have fewer stories.","The hardest part of healing is the heroes.","Eat something. You look pale. You are pale.","I carry bandages for everyone. Even {ally}.","Quick, behind the wall! I've got soup!","One more stitch and you're back in the tale."],
arc:["Stand back. Magic is not a polite activity.","The words are old. The fire is older.","Every spell is a promise. I intend to keep this one.","I read the fine print so the monsters don't have to.","{enemy}? Nothing a little {sp} can't solve.","Chant. Gesture. Detonate.","Do not stand in the circle. Do not stand near the circle.","Mana is a loan. I intend to default.","A little spark, a lot of regret.","Magic works better when you don't ask why.","Abracadabra, but angrier.","The grimoire says 'do not'. The grimoire is cowardly.","Ink, ash and incantation.","Careful. That spell has teeth.","I'm not cursing you. I'm merely informing the universe.","Observe: science. Also fire.","The stars aligned. Now I align the {enemy}.","Spell number nine. Please stand clear of the smoke.","Words have weight. Mine have explosives.","Behold, a very long sentence."],
ski:["Too slow.","You didn't see me. I counted on it.","Quiet feet, quick hands, quicker exit.","{ally}, I borrowed your purse. I'll give it back. Probably.","One step behind them, always.","I'm not stealing. I'm redistributing.","The shadows were free. I took them.","A dagger is a very polite way of saying 'hello'.","Lock? What lock?","Slip in. Slip out. Slip a coin.","If you can see me, I'm doing it wrong.","Rooftops are just fast roads for cats.","Hush. Let the {enemy} think it's winning.","Between the blow and the breath. That's where I live.","Fancy footwork beats fancy armor.","Look left! Now I'm on your right.","Everybody has a blind spot. I live in them.","One tug and the {enemy} unravels.","Ha! Missed me. Missed me again.","The best fight is the one they never notice."],
com:["Formation! Left flank, close the gap! You know who you are!","Plan A is a hero. Plan B is another hero. Plan C is me yelling.","{ally}, you take the left. Everyone else takes the right. Go!","Remember the drill. Remember it faster!","Tighter ranks! Fewer wolves, more resolve!","Good. Better. Now do it again, louder.","I've seen the map. We're fine. We're probably fine.","Attack when I say. Retreat when I say. Panic when I say.","Orders are suggestions. Mine are loud suggestions.","The {enemy} is predictable. We are not.","Morale is a weapon. Aim it at {ally}.","Eyes front! The real enemy is the schedule!","Wait for the signal. Wait for it. Wait... now!","I give the orders. {ally} gives the excuses.","A good general never retreats. He advances in a different direction.","Brave hearts, steady feet, loud voices.","We will win. I have written it down.","The battle plan fits on one napkin. The napkin is on fire.","Nobody leaves the formation. I'm counting.","Keep the chant going. The monsters hate rhythm."],
wil:["Surprise! It's me. Again.","Heads, we win. Tails, I win more.","I have no idea what I'm doing. Wonderful, isn't it?","Rules are suggestions. Gravity is a suggestion. Mostly.","Place your bets, {ally}!","What does this lever do? Nope. Too late.","Chaos is just order that learned to dance.","The dice never lie. They just exaggerate.","Plot twist! Hello, plot twist!","I flipped a coin for fate. Fate flipped it back.","Luck is a very rude lady and I'm very rude back.","Something is about to happen. I don't know what.","Don't worry. I've got a plan. No, really. It's a bad one.","Spin the wheel! Pull the lever! Regret everything!","This is either genius or a mistake. I'll find out soon.","Surely nothing can go wrong now.","I once talked a wolf out of eating me. Then into it.","Ooh, shiny. Mine.","Everything's fine. Everything is on fire. Fine.","Gamble. Grin. Run."]};
const TAG_VOICE={fire:["Everything burns. Even the metaphors.","A little flame never hurt. Okay, it hurts."],ice:["Chill out. Everyone. Permanently.","Cold hearts survive winter."],storm:["Feel that static? That's me.","Thunder never apologizes."],nature:["The forest is watching. It likes me.","Roots remember. So do I."],arcane:["Reality is a draft. I'm editing it.","Do not touch the glowing thing."],holy:["Light be with you, and also with {ally}.","Bless this mess."],undead:["I've died before. It was fine.","Death is just a long nap with paperwork."],beast:["Sniff. Something's rotten. Maybe {ally}.","My teeth are nicer than my manners."],tech:["Cog and spring and a prayer.","Wind me up. I'll do the rest."],gold:["Everything has a price. I know yours.","Gold doesn't talk. It shouts."],dark:["The dark is only shy.","Shadows are on my side."],chaos:["Order is overrated. Ask the mirror.","Wheeee, said the doom."],phys:["Muscle. It fixes everything.","Hit it again."],support:["You're welcome. Don't make me say it twice.","Healing is a team sport."],tank:["Armor is a lifestyle.","Hit me. See what happens."],ranged:["Distance is respect.","I never come close."],melee:["Up close is where it's at.","Feel the swing."]};
const WORLD=["The woods are lovely, dark, and deeply rude.","Don't eat anything. Don't sign anything. Don't look in the mirror.","Every path leads to teeth.","Never trust a talking animal that asks for your name.","Gingerbread is only ever a trap in a good mood.","Three wishes. Always three. Never four.","Who left that apple here? Who wants it?","The moon looks hungry tonight.","Somewhere a clock is striking midnight. I'd rather it didn't.","I heard a bell. Nobody rang a bell.","The crows are talking about us again.","Never split up. Never go upstairs. Never answer the door.","Once upon a time is a promise nobody keeps.","I don't like the way that tree looked at me.","Behind every nice cottage is a worse cellar.","The narrator is watching. Look busy.","Fairy dust is only glitter with a lawyer.","If a stranger offers a gift, run. If it's a pie, run faster.","Every castle has a tower. Every tower has a problem.","The road is long. The moral is longer.","That toad looked suspiciously like a prince.","The spinning wheel hummed. I plugged my ears.","Hear that? That's the sound of foreshadowing.","They never tell you how heavy a crown is.","Is it just me, or are the trees closer?","Candy is for children and trapped children.","The well wished back. I didn't like the wish.","Happily ever after is a rumor spread by survivors.","Somewhere, a witch is checking her oven.","A rose bloomed on a grave. I don't like it.","I distrust any bridge with a bell.","Mirror, mirror, please look away.","Everything is lovely until the third act.","Our tale is tragically short on lunch breaks.","A wolf in sheep's clothing is just a wolf with style.","I've counted the stars. There was one extra.","Don't whistle in the dark. The dark whistles back.","The shortest path is usually the cursed one.","Pretty flowers. Poisonous flowers. Same flowers.","The forest floor is covered in breadcrumbs. Birds are very quiet.","A tiny door in a big tree. No. Absolutely not.","Never fall asleep in a field of poppies. Or on a stranger's bed.","The moral of this story is: leave.","The old woman at the crossroads asked me for a coin. I paid.","Somewhere, a dwarf is humming. Why is that terrifying?","I once saw a shoe dance by itself. I didn't ask.","The narrator is giving me a look.","I'm told there's an ending. I'm told it's good.","It's quiet. Too quiet. Quiet in a rhyming way.","Every story needs a villain. We have so many applicants.","A crooked house, a crooked smile, a crooked deal.","Smell that? Cinnamon and bad decisions.","The cuckoo clock just laughed.","I keep finding glass slippers in the oddest places.","Spindles are just very small mistakes.","A giant's footprint. A giant's very large footprint.","The pumpkin is getting restless.","A talking raven just gave me a warning. In rhyme.","The tower has no stairs. The tower has no door. The tower has teeth.","Somebody's been sleeping in my bed. Somebody's been sleeping in my bed and she's still there!"];
const OPEN=["Listen,","Honestly,","Look,","Between us,","Fun fact:","Not to alarm anyone, but","Quick thought:","Oh, and","Strange, but","Mark my words:","I'm only saying:","Fine.","Right.","Hm.","Remember:","True story:","Rumor has it:","Careful now:","Heads up:","Truly,","Ahem.","By the way,","Let me tell you:","If you ask me,"];
const CLOSE=[" Just saying."," That's the tale."," Nobody listens."," Don't tell {ally}."," Write that down."," Ask the narrator."," I mean it."," Probably."," Sadly."," Delightfully."," Moving on."," So there."," Again."," Hm."," Ugh."," Ha."," Anyway."," I've said too much."," Sleep tight."," Mostly."," Obviously."," Typical."," Charming."," Surprise."];
const HERO_T=["Some call me {n}. Most call me for help.","They still whisper: \"{b1}\"","{b2}","Remember: {b1}","They never forget: {b2}","{n}. {cls}. {b1}","{q}","I am {n}, and I stand by my {atk}.","{sp}! That's my specialty, you know.","Watch this: {sp}!","{cls} reporting. {b1}","The tale goes: {s1}","{s2}","Everyone knows how it began. {s1}","Nobody asked how it ended. {s2}","The {atk} never lies.","My {atk} is old, and it's still sharper than you.","{sp}. Remember the name. It's a good name.","I practiced {sp} on a very rude wolf.","Some say {sp} is cursed. I say it's seasoned.","Don't tell {ally}, but {b1}","{ally} asked about my story. I said: {b2}","Even {ally} knows: {b1}","If {sp} doesn't work, there's always the {atk}.","I'm {cls}. It's a job. It's also a curse.","When the book closes, I'll still be {cls}.","{b1} {b2}","Ask anyone: {b2}","My motto: {q}","Once upon a time, {s1}","And then, {s2}","{n} doesn't run. {n} strategically relocates.","They'll write ballads. Bad ones. About {sp}.","One more {sp} and we're done here.","The {atk} gleams. The {enemy} doesn't.","{sp} for the {enemy}. {atk} for the rest.","Funny thing about being {cls}: {b1}","My tale ended once. Then {s2}","I've been {cls} longer than {ally} has been alive."];
const EV={
crit:["{sp}! No wait, that was just me. Nice.","Critical! The narrator gasps.","That's what the {atk} is for!","Oh, that was NASTY.","Right where it hurts, {enemy}.","Did you see that? Tell the bards.","That's going in the ballad.","{ally}, did you see that?!","Boom. Put it in the book.","I felt that. So did the {enemy}.","Pure fairytale violence.","The {atk} sings!","Another page for my legend.","Sharper than expected.","Look at that. Look at it.","That one had a name on it.","{b1} Remember that.","Magic wasn't even needed.","That's the {cls} difference."],
lowhp:["I'm fine. I'm FINE. {ally}, I'm fine!","Everything hurts. Everything.","Tell the narrator I'm not dead yet.","Medic? Anyone? A cup of tea?","I can see the light! Oh, it's a lantern.","The {enemy} hit harder than expected.","I regret my life choices. All of them.","This is not how my tale ends.","{ally}! A little help!","Ow. Ow. Ow, I say.","I think I'm bleeding fairy dust.","Not the face! Anything but the face!","I've had worse. Not much worse.","The tale can't end here. I've got a sequel.","If I fall, tell {ally} they owe me a pie.","Please let this be a nightmare."],
kill:["One less {enemy}.","And stay down.","The {atk} has spoken.","Next!","That's one for the legend.","Sorry. Not sorry.","Tidy.","Rest in pieces.","The forest is quieter now.","They never learn.","Easy. Too easy.","Is that all the {enemy} had?","Chapter complete.","Not today, {enemy}.","Notch it on the {atk}.","Another dies, another rhymes."],
bossIn:["Oh no. It has a crown.","That is a LOT of health bar.","I did not stretch for this.","{ally}, please tell me we have a plan.","Everyone act natural.","It's the BIG one. Naturally.","That's no ordinary {enemy}.","Time for {sp}.","I knew it. I knew we shouldn't have turned left.","The narrator is smiling. That's never good.","Well. This is the chapter I was dreading.","I've read about this one. It's not a happy story.","Deep breaths. Deep, short, panicked breaths."],
bossDead:["It's over! The villain falls!","Ding dong, the beast is dead.","Write it down. Write it all down.","The bards will hear of this.","{ally}, you were magnificent. Also loud.","That went better than the book said.","I need a nap. A hundred years of nap.","The tale turns a page. Good riddance.","Told you {sp} would work."],
loot:["Ooh, shiny. Mine.","Finders keepers. It's the law.","Gear! Please be good gear.","Cursed? Possibly. Worth it? Definitely.","The forest provides. Reluctantly.","Treasure! The best kind of plot point.","{ally}, this would look lovely on you.","Hand it over. I earned it. Mostly.","I'll polish it later. Probably."],
lvl:["I feel stronger. Marginally.","Level up! The tale grows.","A new chapter in my story.","More {sp} for everyone!","Every scar teaches something.","{b1} But now: better.","Stronger, wiser, tired.","The {atk} feels lighter. Or I'm stronger. Or both."],
clear:["Stage clear! Does anyone have a cottage?","One more chapter down.","Nice work, everyone. Don't talk about it.","That went suspiciously well.","On to the next catastrophe!","Moving on before the narrator notices.","{ally}, you were almost helpful.","Another path survived. Another path ahead.","The forest exhales. So do I.","Onward. Always onward. Mostly onward."],
allyDown:["{ally}! Get up!","Man down! Well, hero down.","{ally} has fainted. Dramatically.","Someone wake {ally}. Gently. Or not.","Hold on, {ally}! The plot needs you!","Not {ally}! Anyone but {ally}! Okay, anyone.","Incident report time!"],
weather:["Of course. Weather.","I don't remember ordering this sky.","The sky has opinions again.","Weather, weather, go away.","Even the clouds hate us.","The narrator is making it rain on purpose."],
reply:["Oh, stop it.","You're not wrong.","Technically correct. The worst kind.","I'll pretend I didn't hear that.","Same, honestly.","Nobody asked, but thanks.","Wow. Okay.","We're all thinking it.","Bold of you to say that to a {cls}.","Spoken like a true villain.","Hmph. {b1}","That's very Grimm of you."],
hire:["Hi. I'm {n}. Where's the porridge?","{cls} reporting. {b1}","Reporting for duty!","I was told there would be snacks.","Tell me it's not a trap. Tell me.","Another tale. Another band. Hello."],
heal:["Thanks! Don't tell anyone I needed that.","Back in the story. Slightly.","Ahh. Magic. Lovely.","You're a lifesaver, dear. Literally.","I feel... less dead. Thanks."]};
const CAT_OF=new Map();
(function(){const m={crit:QUIP.crit,lowhp:QUIP.lowhp,kill:QUIP.kill,bossIn:QUIP.bossIn,bossDead:QUIP.bossDead,loot:QUIP.loot,lvl:QUIP.lvl,clear:QUIP.clear,allyDown:QUIP.allyDown,weather:QUIP.weather,reply:QUIP.reply,hire:QUIP.hire,heal:QUIP.heal};for(const k in m)CAT_OF.set(m[k],k)})();
const hashS=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const shortN=n=>n.replace(/\(.*?\)/g,"").replace(/^(The|Sir|Prince|Queen|Saint|Pirate Queen|Captain of the|Mother|Brother|Frau|Doctor|Dr\.)\s+/,"").replace(/,.*/,"").trim().split(" ").slice(0,2).join(" ")||n;
const sents=t=>(t||"").split(/(?<=[.!?])\s+/).filter(x=>x.length>6&&x.length<100);
const POOLS={},BAGS={};
function fillTpl(t,F){return t.replace(/\{(\w+)\}/g,(m,k)=>F[k]!==undefined?F[k]:m)}
function heroFields(k){const c=CLS[k],b=sents(c.bio),s=sents(STORY[k]);return{n:c.hero,s:shortN(c.hero),cls:c.n.toLowerCase(),atk:(c.atk||"weapon").toLowerCase(),sp:c.sp.n,b1:b[0]||c.bio,b2:b[1]||b[0]||c.bio,s1:s[0]||c.bio,s2:s[1]||s[0]||c.bio,q:(c.q&&c.q[0])||"..."}}
function poolFor(k,cat){const key=k+"|"+cat;if(POOLS[key])return POOLS[key];const F=heroFields(k),c=CLS[k],rng=(()=>{let a=hashS(key);return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}})();
 const out=new Set();const add=t=>{const keep={ally:1,enemy:1};const x=t.replace(/\{(\w+)\}/g,(m,w)=>F[w]!==undefined?F[w]:m);if(x.length<=118)out.add(x)};
 if(cat==="gen"){
  SEAT_VOICE[c.slot].forEach(add);
  const tg=(SYN[k]&&SYN[k].tags)||[];tg.forEach(t=>(TAG_VOICE[t]||[]).forEach(add));
  HERO_T.forEach(add);
  let guard=0;while(out.size<340&&guard++<4000){const r=rng();let body;
   if(r<.5)body=WORLD[Math.floor(rng()*WORLD.length)];else if(r<.8)body=SEAT_VOICE[c.slot][Math.floor(rng()*20)];else body=HERO_T[Math.floor(rng()*HERO_T.length)];
   const o=OPEN[Math.floor(rng()*OPEN.length)],cl=CLOSE[Math.floor(rng()*CLOSE.length)],m=rng();
   let t=m<.4?o+" "+body:m<.8?body+cl:o+" "+body+cl;
   if(/^[A-Za-z]/.test(body)&&m<.4)t=o+" "+body.charAt(0).toLowerCase()+body.slice(1);
   add(t)}
 }else{(EV[cat]||[]).forEach(add);SEAT_VOICE[c.slot].slice(0,6).forEach(x=>cat==="kill"||cat==="clear"?add(x):0)}
 return POOLS[key]=[...out]}
function bagPick(k,cat){const key=k+"|"+cat;let b=BAGS[key];if(!b||!b.length){b=poolFor(k,cat).slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}BAGS[key]=b}return b.pop()}
function resolveTok(t,h){if(t.indexOf("{")<0)return t;let ally="friend",enemy="monster";try{const al=(R.team||[]).filter(x=>x!==h&&x.c);if(al.length)ally=shortN(pick(al).c.hero);const en=liveEn();if(en.length)enemy=pick(en).name.replace(/^Elite /,"")}catch(e){}return t.replace(/\{ally\}/g,ally).replace(/\{enemy\}/g,enemy)}
function heroLine(h,cat){if(!h||!h.k||!CLS[h.k])return null;return resolveTok(bagPick(h.k,cat),h)}
/* enemy / boss speech: lots of variety too */
(function(){const E=["Huff and puff and... ow.","Who's been sleeping in my forest?","I was the hero in a different story.","Not the face! It's my best feature.","Tell my coven I'm sorry!","I'm only the monster because the narrator said so.","A pox on you! And a mild rash.","Once upon a time, I was a very nice toad.","Dragged out of bed for this?","The narrator promised I'd win.","Mirror, mirror, why me?","I eat heroes. I'm sorry. Genuinely sorry.","You're not on the guest list!","I didn't ask for this curse!","Fee, fi, fo, ow.","I have a family! Well, a flock.","Whoever wrote this ending owes me an apology.","Please stop hitting me. It's my first chapter.","You smell like a hero. Delicious.","The woods are mine. The rent is blood.","Come closer. I have candy.","My bite is worse than my bark. My bark is awful.","Rawr. (That's all I'm paid for.)","Don't look at me. I'm hideous. Look at him.","I used to be a prince. Don't ask.","I was cursed at birth. Hello, I'm cursed.","Do you have any idea how long I've been waiting?","Come into my parlor, said the spider.","I'm not a monster. I'm misunderstood. Rawr.","The moon told me to. The moon is a liar.","Once I was a handsome fairy. Now I'm this.","Stay out of the cellar. Please.","I hate this forest. I hate it. I live here.","Quick, someone get the ogre!","Is it midnight already? I'm so sorry.","I smell fear. Also soup.","Oh, a hero. How original.","You'll make a lovely pie.","I only wanted a quiet life. In a cave. With bones.","It's the curse talking. And me. Mostly me.","Grr. I mean, hello.","The Witch said you'd come. She said you'd lose.","You will not leave. Nobody leaves.","Just a taste. A tiny taste.","I huffed. I puffed. I overdid it.","Hush, little hero, don't say a word...","I'm just doing my job. My job is eating you.","You'll never take me alive! ...Wait, what?","Tonight we feast. Tomorrow we nap.","A thousand years of evil, ruined by a hat.","Help! A hero! A very rude hero!","Kneel before the Beast of the Briar!","I'd offer you a deal, but you can't afford it.","Once upon a time, you lost.","This isn't in the legend!","Who ordered a hero?","The tale ends here. For you.","Oh good. Dinner is served.","Behold my teeth! There are many.","I have seen your ending. You won't like it."];
 const B=["Welcome to the end of your tale!","You'll never see the last page!","Come closer, little hero. I won't bite. Much.","Every tale needs a villain. Today, it's tragically me.","The moral of this story is: run.","I'll grind your bones for bread!","You have wandered into the wrong chapter!","I've eaten braver than you for breakfast. And lunch.","The mirror says you're the fairest... corpse.","Kneel, or be kneaded.","I have outlived a hundred heroes. You're next.","You made a deal. I wrote the fine print.","The thorns obey me. So do the teeth.","Sleep, little hero. Sleep forever.","I was feared before your grandmother's grandmother was born.","The oven is hot. The oven is hungry. The oven is patient.","Every hero ends up in my story. Usually as a footnote.","Your wish is denied. Your life is revoked.","The magic in this woods belongs to me!","Your 'happily ever after' has been cancelled.","All the heroes fall. It's practically tradition.","I was cursed once. Now I curse for a living.","Come. Let me tuck you in. Forever.","Winter is only my first move.","You've read the book. I wrote the sequel.","The blood of a hero makes the best ink.","Your bones will build my fence.","I have kept this forest for a thousand nights.","I am the end of the tale. Hello.","Hush. The villain is speaking."];
 const sp=(a,b)=>a.splice(0,a.length,...a,...b);sp(ENEMY_QUIPS,E);sp(BOSS_QUIPS,B)})();

/* ============ GRIMM DESCENT — CORE ============ */
const $=(s,e)=>(e||document).querySelector(s);
const $$=(s,e)=>Array.from((e||document).querySelectorAll(s));
const rand=(a,b)=>a+Math.random()*(b-a);
const ri=(a,b)=>Math.floor(rand(a,b+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const SUF=["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc"];
function fmt(n){
 if(!isFinite(n))return"∞";if(n<0)return"-"+fmt(-n);
 if(n<1000)return(n<10&&n%1!==0)?n.toFixed(1):String(Math.floor(n));
 const e=Math.floor(Math.log10(n)/3);
 if(e<SUF.length){const v=n/Math.pow(1000,e);return(v<10?v.toFixed(2):v<100?v.toFixed(1):v.toFixed(0))+SUF[e]}
 const ex=Math.floor(Math.log10(n));return(n/Math.pow(10,ex)).toFixed(2)+"e"+ex;
}
function fmtTime(s){s=Math.floor(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h?h+"h "+m+"m":m?m+"m "+(s%60)+"s":s+"s"}

/* ---------- state ---------- */
const SAVE_KEY="descentinc_save_v4";
const newHero=()=>({lvl:1,at:1,sp:0,evo:0,gear:{weapon:null,helm:null,armor:null,trinket:null,boots:null,ring:null}});
function newState(){return{v:2,gold:0,stage:0,max:0,auto:true,kills:0,taps:0,totalGold:0,runGold:0,up:{},sk:{},inv:{},gems:0,gemUp:{},bt:{ticket:0,pre:0},shopN:0,flip:{},chestBag:[],pot:{str:0,spd:0,hp:0},pb:{str:0,spd:0,hp:0},camp:0,camps:{},campBest:{},autoMgr:false,
 heroes:{knight:newHero()},dep:["knight"],own:{knight:1},seat:{van:"knight"},pref:{},picks:0,pickAt:Date.now()+7*864e5,pickList:null,bag:[],pets:{},petAct:[],
 so:0,soTotal:0,perks:{},restructures:0,ach:{},seenRealm:{},seen:{},seenIntro:false,
 stats:{deaths:0,bosses:0,crits:0,loot:0,sold:0,revives:0,maxEver:0,legend:0,eggs:0,wipes:0},log:[],buyQty:1,speed:1,last:Date.now(),
 set:{music:true,sfx:true,shake:true,numbers:true,vibe:true,autosell:false,autoequip:true,musicVol:.5,sfxVol:.7}}}
let S=newState();
function normS(s){
 for(const k in s.heroes){s.heroes[k]=Object.assign(newHero(),s.heroes[k]);s.heroes[k].gear=Object.assign(newHero().gear,s.heroes[k].gear||{});if(!CLS[k])delete s.heroes[k]}
 for(const k in s.own)if(!CLS[k])delete s.own[k];for(const id in s.seat){const k=s.seat[id];if(!CLS[k]||CLS[k].slot!==id||!s.own[k])s.seat[id]=SLOT_BY_ID[id].list[s.camp||0]}
 for(const id in s.seat){const k=s.seat[id];s.own[k]=1;if(!s.heroes[k])s.heroes[k]=newHero()}
 s.dep=SLOT_ORDER.filter(id=>s.seat[id]).map(id=>s.seat[id]);return s}
function mergeSave(o){const d=newState();const s=Object.assign(d,o);const n=newState();s.set=Object.assign(n.set,o.set||{});s.stats=Object.assign(n.stats,o.stats||{});
 if(!s.heroes||!Object.keys(s.heroes).length)s.heroes={knight:newHero()};
 s.chestBag=Array.isArray(o.chestBag)?o.chestBag:[];s.camp=o.camp||0;s.camps=o.camps||{};s.campBest=o.campBest||{};s.autoMgr=!!o.autoMgr;
 s.pot=Object.assign({str:0,spd:0,hp:0},o.pot||{});s.pb=Object.assign({str:0,spd:0,hp:0},o.pb||{});
 s.own=Object.assign({knight:1},o.own||{});s.seat=(o.seat&&o.seat.van)?o.seat:{van:"knight"};s.pref=o.pref||{};
 normS(s);return s}
function loadSave(){let raw=null;try{raw=localStorage.getItem(SAVE_KEY)}catch(e){}if(!raw)return null;try{return mergeSave(JSON.parse(raw))}catch(e){return null}}
function saveGame(){try{S.last=Date.now();localStorage.setItem(SAVE_KEY,JSON.stringify(S))}catch(e){}}
function hasSave(){try{return!!localStorage.getItem(SAVE_KEY)}catch(e){return false}}

/* ---------- runtime (battle fills in more) ---------- */
const R={inGame:false,modalPause:false,speed:1,en:[],proj:[],fl:[],part:[],hero:{},buff:{cry:0,gold:0,haste:0},cd:{},combo:0,comboT:0,tapAcc:0,
 scroll:0,trans:0,stg:null,wxId:"clear",wxT:30,wxp:[],flash:0,strikeT:3,uiT:0,saveT:0,achT:0,tickerT:0,bubT:8,time:0,lastArea:-1,petT:{},refT:0,hiddenAt:0,barT:0,wipeT:0,aref:1};
const L=id=>S.up[id]||0,SKL=id=>S.sk[id]||0,perk=id=>S.perks[id]||0;
const sg=g=>g<=60?g:60+Math.pow(g-60,.88);
const hard=g=>g>500?Math.pow(1.05,Math.min(g-500,1500)):1;
const wallStage=()=>55+1.8*Math.pow(S.soTotal||0,.5);
const hardStage=()=>Math.min(STAGE_CAP,Math.floor(wallStage())+8);
const shiftOf=()=>Math.max(0,Math.floor(wallStage()-55));
const effG=g=>Math.max(0,g-shiftOf());
const wallMul=u=>u>55?Math.pow(1.7,u-55):1;
const floorHP=g=>{const u=effG(g);return 8*Math.pow(1.19,sg(u))*wallMul(u)};
const gemU=id=>S.gemUp[id]||0;
const isBoss=g=>g%10===9;
const areaIdx=g=>Math.floor(g/10);
const realmOf=g=>{const i=areaIdx(g);return(i<REALMS.length&&!S.camp)?REALMS[i]:genRealm(i+5000*(S.camp||0))};
const realmName=g=>realmOf(g).n;
const syncDep=()=>{S.dep=SLOT_ORDER.filter(id=>S.seat[id]).map(id=>S.seat[id])};

/* ---------- computed stats ---------- */
let C={h:{},pet:{gold:0,spd:0,crit:0,umb:0},umb:0,disc:1,cdr:0,bossM:1,lootq:1};
function gearOf(h){const t={atk:0,spd:0,hp:0,crit:0,gold:0};for(const s in h.gear){const it=h.gear[s];if(!it)continue;for(const k in it.st)t[k]+=it.st[k]*(1+0.08*it.lv)*(1+0.1*perk("gearp"))}return t}
function petBonus(){const b={gold:0,spd:0,crit:0,umb:0};
 for(const id of S.petAct){const p=PETS.find(x=>x.id===id),pl=S.pets[id];if(!p||!pl)continue;const l=pl.lvl;
  if(p.type==="gold")b.gold+=p.v*l;else if(p.type==="spd")b.spd+=p.v*l;else if(p.type==="crit")b.crit+=p.v*l;else if(p.type==="umb")b.umb+=p.v*l;else if(p.type==="all"){b.gold+=.1*l;b.spd+=.03*l;b.crit+=.01*l}}return b}
const msOf=k=>S.heroes[k]?Math.floor(S.heroes[k].lvl/10):0;
const mtOf=k=>S.heroes[k]?mileTotals(k,S.heroes[k].lvl):{sp:0,cdr:0,crit:0,spd:0,hp:0,aura:0,dmg:0,gold:0,regen:0};
const evoM=k=>1+.25*(S.heroes[k]?S.heroes[k].evo||0:0)+Math.min(3,mtOf(k).aura);
const spPow=k=>{const h=S.heroes[k];return h.sp>0?CLS[k].sp.pow*Math.pow(1.1,h.sp-1)*(1+.3*(h.evo||0)):0};
function recalc(){
 const ach=Object.keys(S.ach).length;
 C.glob=(1+0.06*S.soTotal)*(1+0.02*ach)*(1+0.2*perk("power"))*(1+0.1*gemU("gpower"));
 const sl=L("sword");
 C.tapMul=1+0.05*sl;
 C.critCh=Math.min(.6,0.03+0.01*L("crit"));C.critMul=2+0.15*L("critdmg");
 C.auto=Math.min(15,3+0.5*L("auto")+0.5*perk("autop"));C.armor=Math.min(.6,.01*L("armor"));C.luck=1+0.1*L("luck")+0.15*perk("luck");
 const pb=petBonus();C.pet=pb;C.umb=Math.min(.85,0.03*L("umb")+0.05*perk("sky")+pb.umb);
 let aSpd=0.01*L("haste"),aGold=0,dr=0,reg=0;
 for(const k of S.dep){const p=CLS[k].pass;if(!p)continue;aSpd+=p.spd||0;aGold+=p.gold||0;dr+=p.dr||0;reg+=p.regen||0}
 const SY={};C.links=[];
 for(const k of S.dep){const y=SYN[k],z={dmg:0,spd:0,hp:0,crit:0,gold:0,regen:0,cdr:0};SY[k]=z;
  for(const j of S.dep){if(j===k)continue;const a=SYN[j].aura;if(a.to==="all"||y.tags.includes(a.to)){const av=a.v*evoM(j);z[a.s]+=av;C.links.push({t:"aura",from:j,to:k,s:a.s,v:av})}}
  const cb=y.combo;if(S.dep.some(j=>j!==k&&SYN[j].tags.includes(cb.w))){const cv=cb.v*evoM(k);z[cb.s]+=cv;C.links.push({t:"combo",from:k,to:k,s:cb.s,v:cv})}}
 C.syn=SY;let sgold=0;
 C.dr=Math.min(.5,dr);C.regen=(reg+0.002*L("regen"))*0.5;C.aSpd=aSpd;
 C.cdr=Math.min(.7,0.01*L("cdr")+0.02*perk("cdrp"));C.disc=Math.max(.6,1-0.01*L("disc"));C.bossM=1+0.05*L("boss")+0.25*perk("bossp");C.lootq=1+0.02*L("lootq");
 let gg=0;C.h={};
 for(const k in S.heroes){const h=S.heroes[k];h.at=1+Math.floor(h.lvl/2);h.sp=Math.floor(h.lvl/5);const ne=EVO_REQ.filter(r=>h.lvl>=r).length;if(ne>(h.evo||0)){h.evo=ne;if(S.dep.includes(k))evoFx(k)}else h.evo=ne}
 let msum=0;for(const k of S.dep)msum+=msOf(k);C.msMul=1+.015*msum;
 for(const k in S.heroes){const h=S.heroes[k],c=CLS[k],g=gearOf(h);
  const z=Object.assign({},SY[k]||{dmg:0,spd:0,hp:0,crit:0,gold:0,regen:0,cdr:0});{const mt=mtOf(k);z.dmg+=mt.dmg;z.spd+=mt.spd;z.hp+=mt.hp;z.crit+=mt.crit;z.gold+=mt.gold;z.regen+=mt.regen;z.cdr+=mt.cdr}
  const hit=C.msMul*Math.pow(2,h.evo||0)*(1+Math.min(3,z.dmg))*2.5*c.dps*c.iv*Math.pow(1.06,h.lvl-1)*Math.pow(2,Math.floor(h.lvl/25))*Math.pow(1.06,h.at-1)*(1+g.atk)*C.glob;
  const hp=Math.pow(1.6,h.evo||0)*40*c.hp*Math.pow(1.15,h.lvl-1)*(1+g.hp)*(1+Math.min(3,z.hp))*Math.pow(1.08,L("vit"))*(1+0.2*perk("hpp"));
  const spd=1+Math.min(2,g.spd)+aSpd+pb.spd+Math.min(1.5,z.spd);
  C.h[k]={hit,hp,spd,iv:c.iv/spd,crit:Math.min(.8,C.critCh+g.crit+pb.crit+z.crit),dps:hit/(c.iv/spd),g,sp:spPow(k)*(1+mtOf(k).sp),regen:Math.min(.015,z.regen),cdr:Math.min(.5,z.cdr)};
  if(S.dep.includes(k)){gg+=g.gold;sgold+=z.gold}}
 C.goldBase=(1+0.06*L("gold"))*(1+gg)*(1+0.25*perk("pay"))*(1+0.1*S.soTotal)*(1+0.1*gemU("gwallet"))*(1+pb.gold)*(1+aGold)*(1+Math.min(2,sgold))*0.6;
 C.cryM=1.5+0.1*SKL("cry");C.goldBuff=2+0.2*SKL("cash");
 let a=0,n=0,dh=0;for(const k of S.dep){a+=C.h[k].hit;dh+=C.h[k].dps;n++}R.aref=n?a/n:1;
 C.tap=Math.max(C.glob,0.05*dh)*C.tapMul;
 if(typeof syncHeroes==="function")syncHeroes();
}
function teamDps(){let d=0;for(const k of S.dep)if(C.h[k])d+=C.h[k].dps;return d+C.auto*C.tap*(1+C.critCh*(C.critMul-1))}
function bulkCost(b,g,l,n){return b*Math.pow(g,l)*(Math.pow(g,n)-1)/(g-1)}
function maxAfford(b,g,l,gold){const c=b*Math.pow(g,l);if(gold<c)return 0;return Math.floor(Math.log(gold*(g-1)/c+1)/Math.log(g))}
function skCost(sk,l){return Math.max(50,floorHP(sk.u)*20)*Math.pow(sk.g,l)}

/* hero costs */
const lvCost=k=>C.disc*CLS[k].cost*0.8*Math.pow(LVG,S.heroes[k].lvl-1);
const atCost=k=>C.disc*CLS[k].cost*2*Math.pow(1.5,S.heroes[k].at-1);
const spCost=k=>C.disc*CLS[k].cost*3*Math.pow(1.55,S.heroes[k].sp);
const unlockCost=k=>C.disc*Math.max(CLS[k].cost*4,floorHP(CLS[k].u)*15);
const LVG=1.55;
function evoFx(k){if(typeof bannerShow!=="function"||!R.inGame)return;const h=S.heroes[k];setTimeout(()=>{bannerShow("★ "+CLS[k].hero+" EVOLVED!",EVO_N[h.evo]+" — ×2 damage, ×1.6 HP");AU.play("win");toast("★ "+CLS[k].hero+" evolved into a "+EVO_N[h.evo]+"!","good");if(R.hero&&R.hero[k]){R.hero[k].hp=R.hero[k].mhp;burst(R.hero[k].x,R.hero[k].y,"#ffd23a",30);quip(R.hero[k],QUIP.lvl,1)}},50)}
const evoCost=k=>{const e=S.heroes[k].evo||0;return e>=3?Infinity:C.disc*CLS[k].cost*0.8*Math.pow(1.45,EVO_REQ[e]-1)*2};
const canEvo=k=>{const h=S.heroes[k];return h&&(h.evo||0)<3&&h.lvl>=EVO_REQ[h.evo||0]};
function heroEvolve(k){if(!canEvo(k))return false;const c=evoCost(k);if(S.gold<c)return false;S.gold-=c;S.heroes[k].evo=(S.heroes[k].evo||0)+1;recalc();if(R.hero&&R.hero[k]){R.hero[k].hp=R.hero[k].mhp;burst(R.hero[k].x,R.hero[k].y,"#ffd23a",24);quip(R.hero[k],QUIP.lvl,1)}return true}
function usePotion(t){if(!S.pot[t]||!S.dep.length)return false;S.pot[t]--;S.pb[t]=POT_DUR;if(t==="hp"&&R.team)for(const h of R.team){if(!h.down)h.hp=h.mhp;else reviveHero(h,1)}return true}
const potPrice=()=>Math.max(200,floorHP(Math.max(5,S.max))*40);
function heroLvlUp(k){const c=lvCost(k);if(S.gold<c)return false;S.gold-=c;S.heroes[k].lvl++;recalc();const lv=S.heroes[k].lvl;if(lv%10===0&&typeof toast==="function"){toast("🏅 "+CLS[k].hero+" Lv "+lv+" milestone! Synergy +5%, party damage +1.5%","good")}else if(lv%5===0&&typeof toast==="function")toast("✨ "+CLS[k].hero+"'s "+CLS[k].sp.n+" upgraded!","good");if(R.hero&&R.hero[k])quip(R.hero[k],QUIP.lvl,.6);return true}
function heroAtUp(k){const c=atCost(k);if(S.gold<c)return false;S.gold-=c;S.heroes[k].at++;recalc();return true}
function heroSpUp(k){const c=spCost(k);if(S.gold<c)return false;S.gold-=c;S.heroes[k].sp++;recalc();return true}
function seatedAvg(f){let t=0,n=0;for(const k of S.dep){t+=S.heroes[k][f];n++}return n?t/n:1}
function ensureHero(k){if(!S.heroes[k]){const h=newHero();h.lvl=Math.max(1,Math.floor(seatedAvg("lvl")*0.75))+2*perk("nep");h.at=Math.max(1,Math.floor(seatedAvg("at")*0.75));S.heroes[k]=h}return S.heroes[k]}
const slotUnlocked=id=>!!S.seat[id];
const slotHeroCost=id=>unlockCost(campHero(id));
const canUnlockSlot=id=>!slotUnlocked(id)&&S.max>=SLOT_BY_ID[id].u;
function unlockSlot(id){
 if(!canUnlockSlot(id))return false;const c=slotHeroCost(id);if(S.gold<c)return false;S.gold-=c;
 const k=campHero(id);S.own[k]=1;ensureHero(k);S.seat[id]=k;S.pref[id]=k;
 syncDep();recalc();buildTeam();if(R.hero&&R.hero[k])quip(R.hero[k],QUIP.hire);return true}
function swapSeat(id,k){
 if(!slotUnlocked(id)||!S.own[k]||CLS[k].slot!==id||S.seat[id]===k)return false;
 ensureHero(k);S.seat[id]=k;S.pref[id]=k;syncDep();recalc();buildTeam();if(R.hero&&R.hero[k])quip(R.hero[k],QUIP.hire);return true}
function genPickList(){
 const n=3+perk("bunk");const un=CLS_ORDER.filter(k=>!S.own[k]);
 const good=un.filter(k=>slotUnlocked(CLS[k].slot)),rest=un.filter(k=>!slotUnlocked(CLS[k].slot));
 const out=[];const pool=good.slice();while(out.length<n&&pool.length)out.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
 const p2=rest.slice();while(out.length<n&&p2.length)out.push(p2.splice(Math.floor(Math.random()*p2.length),1)[0]);
 return out}
function pickHero(k){
 if(S.picks<1||!S.pickList||!S.pickList.includes(k)||S.own[k])return false;
 S.picks--;S.pickList=null;S.own[k]=1;const id=CLS[k].slot;S.pref[id]=k;
 if(slotUnlocked(id)){ensureHero(k);S.seat[id]=k;syncDep();recalc();buildTeam()}
 saveGame();return true}
const campUnlocked=c=>c===0||(S.campBest[c-1]||0)>=100;
function snapCamp(){const o={};for(const f of CAMP_F)o[f]=S[f];return o}
function switchCamp(c){
 if(c===S.camp||!CAMPS[c]||!campUnlocked(c))return false;
 S.campBest[S.camp]=Math.max(S.campBest[S.camp]||0,S.max);S.camps[S.camp]=JSON.parse(JSON.stringify(snapCamp()));
 const st=S.camps[c]||newCampState(c);delete S.camps[c];S.camp=c;Object.assign(S,JSON.parse(JSON.stringify(st)));S.own[S.seat.van]=1;normS(S);
 R.buff={cry:0,gold:0,haste:0};R.cd={};R.lastArea=-1;R.mapBase=null;recalc();buildTeam();startStage();onAreaChanged();saveGame();return true}
function newCampState(c){const n=newState(),o={};for(const f of CAMP_F)o[f]=n[f];const v=campHero('van',c||0);o.heroes={[v]:newHero()};o.seat={van:v};o.dep=[v];return o}
function autoManage(){
 if(!S.autoMgr||S.max<10||!R.inGame)return;
 for(let n=0;n<8;n++){
  for(const id of SLOT_ORDER)if(canUnlockSlot(id)&&S.gold>=slotHeroCost(id)){unlockSlot(id);break}
  let best=null,bc=1e300;
  for(const k of S.dep){const c=lvCost(k);if(c<bc){bc=c;best={c,f:()=>heroLvlUp(k)}}}
  for(const u of UPS){const l=L(u.id);if(u.max!==undefined&&l>=u.max)continue;const c=u.b*Math.pow(u.g,l)*1.3;if(c<bc){bc=c;best={c:c/1.3,f:()=>{S.gold-=u_c(u,l);S.up[u.id]=l+1;recalc();return true}}}}
  if(!best||S.gold<best.c)return;if(!best.f())return}
}
const u_c=(u,l)=>u.b*Math.pow(u.g,l);
function addPicks(n){if(CLS_ORDER.every(k=>S.own[k]))return;S.picks=Math.min(5,S.picks+n);if(!S.pickList)S.pickList=genPickList()}
function pickTick(){
 if(Date.now()>=S.pickAt){let n=0;while(Date.now()>=S.pickAt&&n<5){S.pickAt+=7*864e5;n++}if(S.pickAt<Date.now())S.pickAt=Date.now()+7*864e5;addPicks(n);return true}
 if(S.picks>0&&!S.pickList)S.pickList=genPickList();return false}
const heroOwned=k=>!!S.own[k];

/* ---------- audio ---------- */
const AU={ctx:null,sx:null,mu:null,timer:null,step:0,
 init(){if(this.ctx)return;try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;this.ctx=new A();this.sx=this.ctx.createGain();this.sx.connect(this.ctx.destination);this.mu=this.ctx.createGain();this.mu.connect(this.ctx.destination);this.vol();this.music()}catch(e){}},
 vol(){if(!this.ctx)return;this.sx.gain.value=S.set.sfx?S.set.sfxVol*0.5:0;this.mu.gain.value=S.set.music?S.set.musicVol*0.22:0},
 resume(){if(this.ctx&&this.ctx.state==="suspended")this.ctx.resume()},
 tone(f,d,type,v,slide,dest,delay){if(!this.ctx)return;try{const c=this.ctx,t=c.currentTime+(delay||0),o=c.createOscillator(),g=c.createGain();o.type=type||"square";o.frequency.setValueAtTime(f,t);
  if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(20,f+slide),t+d);g.gain.setValueAtTime(v||.3,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(dest||this.sx);o.start(t);o.stop(t+d+.03)}catch(e){}},
 last:{},
 play(n){if(!this.ctx||!S.set.sfx)return;const now=Date.now();if(this.last[n]&&now-this.last[n]<(n==="hit"||n==="shoot"?60:25))return;this.last[n]=now;
  const T=(a,b,c,d,e,f)=>this.tone(a,b,c,d,e,null,f);
  switch(n){
   case"hit":T(200+rand(0,60),.07,"square",.18,-90);break;
   case"shoot":T(520+rand(0,100),.06,"triangle",.12,300);break;
   case"crit":T(600,.14,"sawtooth",.26,500);T(120,.18,"square",.22,-60);break;
   case"coin":T(1300,.07,"square",.09);T(1750,.09,"square",.09,0,.06);break;
   case"kill":T(320,.16,"triangle",.24,-220);break;
   case"hurt":T(130,.12,"sawtooth",.2,-70);break;
   case"death":T(260,.5,"sawtooth",.28,-210);T(90,.6,"square",.2,-40,.1);break;
   case"level":[523,659,784,1046].forEach((f,i)=>T(f,.12,"square",.2,0,i*.07));break;
   case"loot":[784,988,1175,1568].forEach((f,i)=>T(f,.14,"triangle",.28,0,i*.08));break;
   case"boss":T(110,.7,"sawtooth",.35,-30);T(82,.8,"square",.3,-20,.25);break;
   case"skill":T(280,.35,"sawtooth",.28,700);break;
   case"special":T(400,.25,"square",.22,500);T(800,.2,"triangle",.18,-300,.1);break;
   case"heal":T(660,.12,"sine",.22,300);T(990,.16,"sine",.2,0,.08);break;
   case"zap":T(900,.12,"sawtooth",.2,-700);break;
   case"boom":T(90,.4,"sawtooth",.35,-50);break;
   case"egg":[392,523,659,784,1046,1318].forEach((f,i)=>T(f,.16,"triangle",.3,0,i*.09));break;
   case"weather":T(200,.5,"sine",.25,300);T(300,.5,"sine",.2,200,.15);break;
   case"ui":T(720,.05,"square",.12);break;
   case"err":T(100,.15,"square",.2,-30);break;
   case"win":[523,659,784,1046,1318].forEach((f,i)=>T(f,.18,"triangle",.3,0,i*.1));break;
  }},
 music(){if(this.timer||!this.ctx)return;const bass=[0,0,-2,-4],arp=[0,3,7,10,12,10,7,3];this.step=0;
  this.timer=setInterval(()=>{if(!this.ctx||!S.set.music||!R.inGame||R.modalPause)return;const s=this.step++,bar=Math.floor(s/16)%4;
   const root=110*Math.pow(2,((areaIdx(S.stage)*2)%12+bass[bar])/12);
   if(s%4===0)this.tone(root,.3,"triangle",.5,0,this.mu);
   if(s%2===0||Math.random()<.4){const n=arp[(s*3+bar)%arp.length];this.tone(root*2*Math.pow(2,n/12),.12,"square",.14,0,this.mu)}
   if(s%8===4)this.tone(root*0.5,.25,"sawtooth",.18,0,this.mu)},170)}
};

/* ---------- small ui helpers ---------- */
function toast(msg,cls){const b=$("#toasts");if(!b)return;while(b.children.length>3)b.firstChild.remove();const t=document.createElement("div");t.className="toast "+(cls||"");t.textContent=msg;b.appendChild(t);setTimeout(()=>t.remove(),3200)}
function shake(ms){if(!S.set.shake)return;const s=$("#stage");s.classList.remove("shake");void s.offsetWidth;s.classList.add("shake");setTimeout(()=>s.classList.remove("shake"),ms||300)}
function bannerShow(t1,t2){const b=$("#banner");b.innerHTML="<b>"+t1+"</b>"+(t2?"<span>"+t2+"</span>":"");b.classList.remove("show");void b.offsetWidth;b.classList.add("show");setTimeout(()=>b.classList.remove("show"),2600)}
function vibe(ms){if(S.set.vibe&&navigator.vibrate)try{navigator.vibrate(ms)}catch(e){}}

/* ---------- items / gear ---------- */
const iscore=it=>it?((it.st.atk||0)+0.3*(it.st.hp||0)+0.5*(it.st.gold||0)+8*(it.st.spd||0)+20*(it.st.crit||0))*(1+0.08*it.lv):0;
const sellVal=it=>Math.ceil(floorHP(it.ilvl)*0.3*(it.r+1)*(1+it.lv*0.2));
const enhCost=it=>Math.ceil(floorHP(it.ilvl)*0.9*Math.pow(1.35,it.lv));
function genItem(ilvl,boss,minR){
 const slot=pick(SLOTS),base=pick(BASES[slot]);
 const w=RW.map((x,i)=>i>=2?x*Math.min(C.luck,8):x);
 if(boss){w[0]=0;w[1]*=.3;for(let i=3;i<RW.length;i++)w[i]*=4}
 let tot=0;w.forEach(x=>tot+=x);let r0=Math.random()*tot,r=0;for(let i=0;i<RW.length;i++){r0-=w[i];if(r0<=0){r=i;break}}
 if(minR&&r<minR)r=minR;
 const rm=RAR[r].m,lf=(ilvl+1)*0.06+0.1,main=lf*rm,st={},mk=MAIN[slot];
 st[mk]=mk==="crit"?0.008*rm*(1+ilvl/40):mk==="spd"?0.03*rm*(1+ilvl/60):mk==="gold"?0.04*rm*(1+ilvl/30):main;
 const keys=["atk","hp","gold"].filter(k=>k!==mk).sort(()=>Math.random()-.5);
 for(let j=0;j<EXTRA[r]&&j<keys.length;j++)st[keys[j]]=keys[j]==="gold"?0.04*rm*(1+ilvl/30):main*0.6;
 let name=base[0];if(r>=1)name=pick(PRE)+" "+name;if(r>=3)name+=" "+pick(SUFX);if(r===0)name="Rusty "+base[0];
 return{id:"i"+Date.now().toString(36)+ri(0,99999),slot,name,e:base[1],r,ilvl,lv:0,st};
}
function dropLoot(boss){
 const it=genItem(S.stage,boss);S.stats.loot++;if(it.r>=5)S.stats.legend++;
 if(it.r>=3){toast("🎁 "+RAR[it.r].n+": "+it.name,"loot");AU.play("loot");if(it.r>=4&&R.team&&R.team.length)quip(pick(R.team),QUIP.loot,.8)}
 gainItem(it);
}
function bestHeroFor(it){let best=null,bs=0;for(const k of S.dep){const d=iscore(it)-iscore(S.heroes[k].gear[it.slot]);if(d>bs){bs=d;best=k}}return best}
function gainItem(it){
 if(S.set.autoequip){const k=bestHeroFor(it);if(k){const h=S.heroes[k],cur=h.gear[it.slot];h.gear[it.slot]=it;recalc();
  if(cur){if(S.set.autosell){S.gold+=sellVal(cur);S.stats.sold++}else addBag(cur)}refreshTab("heroes");refreshTab("gear");return}}
 if(S.set.autosell&&!bestHeroFor(it)){S.gold+=sellVal(it);S.stats.sold++;return}
 addBag(it);refreshTab("gear");
}
function addBag(it){
 if(S.bag.length>=30){let wi=0;S.bag.forEach((b,i)=>{if(sellVal(b)<sellVal(S.bag[wi]))wi=i});const w=S.bag[wi];
  if(sellVal(w)<sellVal(it)){S.bag.splice(wi,1);S.gold+=sellVal(w);S.stats.sold++;S.bag.push(it)}else{S.gold+=sellVal(it);S.stats.sold++}return}
 S.bag.push(it);
}
function findItem(id){let it=S.bag.find(b=>b.id===id);if(it)return{it,loc:"bag"};for(const k in S.heroes)for(const s in S.heroes[k].gear){const g=S.heroes[k].gear[s];if(g&&g.id===id)return{it:g,loc:"hero",k}}return null}
function equipItem(k,id){const i=S.bag.findIndex(b=>b.id===id);if(i<0||!S.heroes[k])return;const it=S.bag[i],h=S.heroes[k],cur=h.gear[it.slot];S.bag.splice(i,1);h.gear[it.slot]=it;if(cur)S.bag.push(cur);recalc();AU.play("ui")}
function unequipItem(k,slot){const h=S.heroes[k];if(!h||!h.gear[slot]||S.bag.length>=30)return false;S.bag.push(h.gear[slot]);h.gear[slot]=null;recalc();return true}

/* ---------- pets ---------- */
const petSlots=()=>1+(S.stats.maxEver>=30?1:0)+(S.stats.maxEver>=80?1:0);
const eggCost=()=>Math.ceil(floorHP(Math.max(5,S.max))*6*(1+0.15*S.stats.eggs));
const petLvCost=id=>{const p=PETS.find(x=>x.id===id),l=S.pets[id].lvl;return Math.ceil(floorHP(Math.max(5,S.max))*5*Math.pow(1.35,l-1)*(1+p.rar*.5))};
function rollEgg(minRar){
 const w=PET_RAR.map((r,i)=>r.w*(i>=2?Math.min(C.luck,4):1));let t=0;w.forEach(x=>t+=x);let r0=Math.random()*t,rar=0;for(let i=0;i<w.length;i++){r0-=w[i];if(r0<=0){rar=i;break}}
 if(minRar&&rar<minRar)rar=minRar;const pool=PETS.filter(p=>p.rar===rar);const p=pick(pool.length?pool:PETS);const had=!!S.pets[p.id];
 if(had)S.pets[p.id].lvl++;else{S.pets[p.id]={lvl:1};if(S.petAct.length<petSlots())S.petAct.push(p.id)}
 S.stats.eggs++;recalc();buildPets();return{p,isNew:!had,lvl:S.pets[p.id].lvl};
}
function buyEgg(){const c=eggCost();if(S.gold<c)return null;S.gold-=c;return rollEgg()}
function togglePet(id){if(!S.pets[id])return;if(S.petAct.includes(id))S.petAct=S.petAct.filter(x=>x!==id);else{if(S.petAct.length>=petSlots())S.petAct.shift();S.petAct.push(id)}recalc();buildPets()}

/* ---------- achievements ---------- */
const ACH=[];
function A(id,n,d,t){ACH.push({id,n,d,t})}
[[10,"Tap Newbie"],[100,"Finger Workout"],[1000,"Magic Wrist Syndrome"],[10000,"Thumb of Legend"]].forEach(a=>A("taps"+a[0],a[1],"Tap "+fmt(a[0])+" times",()=>S.taps>=a[0]));
[[1,"First Blood (Rodent)"],[100,"Rat Catcher"],[1000,"Wolf Exterminator"],[10000,"Forest Sweeper"],[100000,"Mass Extinction of Villains"]].forEach(a=>A("kills"+a[0],a[1],"Defeat "+fmt(a[0])+" monsters",()=>S.kills>=a[0]));
[[5,"Out of the Cellar"],[10,"Getting Somewhere"],[25,"Quarter Century"],[50,"Halfway Haunted"],[100,"Centurion"],[120,"Beanstalk: Complete"],[200,"Legend of the Woods"]].forEach(a=>A("stage"+a[0],a[1],"Reach stage "+a[0],()=>S.stats.maxEver>=a[0]));
[[1,"Boss? More Like Floss"],[10,"Boss Bully"],[50,"Witch Hunter"]].forEach(a=>A("boss"+a[0],a[1],"Defeat "+a[0]+" boss"+(a[0]>1?"es":""),()=>S.stats.bosses>=a[0]));
[[1e3,"Pocket Change"],[1e6,"Dragon Hoard (Technically)"],[1e9,"Hoard King (Unfortunately)"],[1e12,"Dragon Energy"],[1e15,"Economy Breaker"]].forEach(a=>A("gold"+a[0],a[1],"Earn "+fmt(a[0])+" gold in total",()=>S.totalGold>=a[0]));
A("hire2","Second in the Tale","Recruit your second hero",()=>Object.keys(S.heroes).length>=2);
A("hire6","Party Crashers","Recruit 6 heroes",()=>Object.keys(S.heroes).length>=6);
A("hire16","Full Roster","Recruit all 16 heroes",()=>Object.keys(S.heroes).length>=16);
A("death1","First Fainting","A hero faints",()=>S.stats.deaths>=1);
A("death50","The Reaper Is On Line 2","50 hero faints",()=>S.stats.deaths>=50);
A("loot1","Ooh, Shiny","Find your first item",()=>S.stats.loot>=1);
A("loot50","Hoarder","Find 50 items",()=>S.stats.loot>=50);
A("legend","Legendary Treasure-Hunter","Find a Legendary item",()=>S.stats.legend>=1);
A("pet1","Who's a Good Familiar?","Hatch your first pet",()=>S.stats.eggs>=1);
A("pet10","Pet Hoarder","Hatch 10 eggs",()=>S.stats.eggs>=10);
A("restr","Rewrote the Tale","Rewrite the tale once",()=>S.restructures>=1);
A("crit100","Critical Thinking","Land 100 critical hits",()=>S.stats.crits>=100);
A("wipe1","That Went Poorly","Suffer a total party wipe",()=>S.stats.wipes>=1);
function checkAch(){let n=0;for(const a of ACH){if(!S.ach[a.id]&&a.t()){S.ach[a.id]=1;n++;toast("🏅 "+a.n+" (+2% damage)","good");AU.play("level")}}if(n){recalc();refreshTab("more")}}

/* ---------- prestige & offline ---------- */
const soGain=()=>Math.floor(Math.pow(Math.max(0,S.max-14),1.3)/2);
const canRestructure=()=>S.max>=20;
function doRestructure(){
 const g=soGain();if(!canRestructure()||g<1)return false;
 for(const k in S.heroes)for(const s in S.heroes[k].gear){const it=S.heroes[k].gear[s];if(it)addBag(it)}
 S.so+=g;S.soTotal+=g;S.restructures++;S.gold=perk("sign")?100*Math.pow(4,perk("sign")):0;S.runGold=0;S.up={};S.sk={};
 S.dep=[];S.heroes={};S.seat={van:campHero('van')};S.own[S.seat.van]=1;ensureHero(S.seat.van);syncDep();S.shopN=0;
 const st=perk("elev")*5;S.stage=st;S.max=st;S.auto=true;R.buff={cry:0,gold:0,haste:0};R.cd={};R.lastArea=-1;
 recalc();buildTeam();startStage();onAreaChanged();saveGame();return true;
}
function offlineGain(sec){
 const cap=(2+2*perk("tele"))*3600;sec=Math.min(sec,cap);const dps=teamDps();const from=S.stage;
 if(dps<=0)return{gold:0,sec,from,to:from,chests:[]};
 let t=sec*0.25,g=S.stage,gold=0,chests=[],n=0;
 while(t>0&&n<3000){
  const hp=floorHP(g),boss=g%10===9,mini=g%10===4,est=hp*(20+(boss?26:mini?11:0));
  const ratio=est/dps,tc=Math.max(15,ratio*1.3);
  const gps=hp*(7+(boss?9:mini?4:0))*C.goldBase;
  const beatable=g<S.max?ratio<=240:ratio<=90;
  if(!beatable||g>=hardStage()||g>=STAGE_CAP-1){gold+=t/Math.max(15,Math.min(tc,300))*hp*7*C.goldBase*.8;break}
  if(t<tc){gold+=gps*(t/tc);break}
  t-=tc;gold+=gps;if(boss||mini)chests.push({t:boss?"boss":"mini",g});g++;n++;
 }
 return{gold:Math.floor(gold),sec,from,to:g,chests};
}
function applyOffline(o){
 if(!o||(o.gold<=0&&o.to===o.from))return false;
 S.gold+=o.gold;S.totalGold+=o.gold;S.runGold+=o.gold;
 for(const c of o.chests)S.chestBag.push(c);
 if(o.to>o.from){S.stage=Math.min(o.to,hardStage());S.max=Math.min(hardStage(),Math.max(S.max,o.to));S.stats.maxEver=Math.max(S.stats.maxEver,S.max);S.campBest[S.camp]=Math.max(S.campBest[S.camp]||0,S.max);if(typeof startStage==="function"&&R.inGame){recalc();startStage();if(areaIdx(S.stage)!==R.lastArea)onAreaChanged()}}
 return true}

/* ---------- chests, supplies, shops ---------- */
function genChest(type,g){
 const boss=type!=="mini",n=Math.max(1,S.dep.length)+(type==="boss"?1:0)+(type==="premium"?2:0);
 const minR=type==="premium"?4:type==="boss"?3:2,items=[];
 for(let i=0;i<n;i++)items.push(genItem(g,boss,minR));
 const gold=Math.floor(floorHP(g)*C.goldBase*(type==="mini"?6:type==="boss"?18:35));
 const u=pick(UTILS),pt=pick(Object.keys(POTS));
 return{type,items,gold,util:{id:u.id,n:boss?2:1},pot:{t:pt,n:type==='premium'?3:boss?2:1},gems:type==="boss"?(Math.random()<.25?2:1):0};
}
function openChest(type,g){
 const c=genChest(type,g);S.gold+=c.gold;S.totalGold+=c.gold;S.runGold+=c.gold;
 const wasAE=S.set.autosell;
 for(const it of c.items){S.stats.loot++;if(it.r>=5)S.stats.legend++;gainItem(it)}
 S.inv[c.util.id]=(S.inv[c.util.id]||0)+c.util.n;S.pot[c.pot.t]+=c.pot.n;S.gems+=c.gems;recalc();return c;
}
const lockboxCost=()=>floorHP(Math.max(5,S.max))*60*Math.pow(1.12,S.shopN);
const utilPrice=id=>{const f=floorHP(Math.max(5,S.max));
 return id==="manual"?Math.ceil(0.8*S.dep.reduce((a,k)=>a+lvCost(k),0)):id==="egg"?Math.ceil(eggCost()*.8):id==="donut"?f*10:f*25};
function useUtil(id){
 if(!(S.inv[id]>0))return null;
 if(id==="manual"){for(const k of S.dep)S.heroes[k].lvl++;recalc()}
 else if(id==="ticket")S.bt.ticket=(S.bt.ticket||0)+300;
 else if(id==="pre")S.bt.pre=(S.bt.pre||0)+300;
 else if(id==="donut"){for(const h of R.team){if(h.down)reviveHero(h,1);else h.hp=h.mhp}}
 else if(id==="egg"){S.inv[id]--;return rollEgg()}
 S.inv[id]--;return true;
}
function buyGem(id){
 const g=GEMS.find(x=>x.id===id),l=gemU(id),c=g.cost(l);
 if(g.max!==undefined&&l>=g.max)return null;if(S.gems<c)return null;S.gems-=c;
 if(id==="gchest")return{chest:openChest("premium",Math.max(S.stage,S.max))};
 if(id==="gskip"){const o=offlineGain(3600),gold=Math.max(o.gold,floorHP(S.max)*50*C.goldBase);S.gold+=gold;S.totalGold+=gold;return{gold}}
 if(id==="gegg")return{egg:rollEgg(3)};
 if(id==="gmanual"){for(const k of S.dep)S.heroes[k].lvl+=3;recalc();return{ok:1}}
 if(id==="gpick"){S.gemUp[id]=l+1;addPicks(1);return{ok:1}}
 if(id==="gso"){S.so+=8;S.soTotal+=8;recalc();return{ok:1}}
 S.gemUp[id]=l+1;recalc();return{ok:1};
}

/* ============ GRIMM DESCENT — BATTLE ENGINE ============ */
const GOLDK=0.35;
const EMOJI_FONT='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const ELCOL={none:"#ffffff",fire:"#ff7a2f",ice:"#7fe6ff",storm:"#ffe84a",nature:"#5df08a",arcane:"#c36bff"};
let cv=null,cx=null,W=360,H=300,DPR=1,U=1;
R.team=[];R.bolts=[];R.wxList=["clear"];R.stgT=0;R.cdAll={};
R.buff.ballad=0;

/* ---------- weather helpers ---------- */
const WX=()=>WXD[R.wxId]||WXD.clear;
const pen=v=>v<1?1-(1-v)*(1-C.umb):v;
const penUp=v=>v>1?1+(v-1)*(1-C.umb):v;
const elemH=el=>{const m=(WX().elem||{})[el];return m==null?1:pen(m)};
const elemE=el=>{const m=(WX().elem||{})[el];return m==null?1:penUp(m)};
function heroMod(h){const w=WX(),c=h.c;return elemH(c.el)*pen(w.hdmg||1)*(c.rng?pen(w.ranged||1):1)*(R.buff.cry>0?C.cryM:1)*(S.bt.pre>0?1.1:1)*(S.pb.str>0?1.1:1)*hzv("fog",.75)}
function heroSpd(h){const w=WX();return hzv("bog",.75)*(S.pb.spd>0?1.1:1)*pen(w.hspd||1)*(R.buff.cry>0?1.25:1)*(R.buff.ballad>0?1.4:1)}
const enemyBase=g=>{const u=effG(g);return 1.6*Math.pow(1.09,sg(u))*(u>55?Math.pow(1.14,u-55):1)};

/* ---------- canvas ---------- */
function initBattle(){
 cv=$("#fx");cx=cv.getContext("2d");resizeCv();window.addEventListener("resize",resizeCv);
 cv.addEventListener("pointerdown",e=>{e.preventDefault();AU.init();AU.resume();const r=cv.getBoundingClientRect();tapAt(e.clientX-r.left,e.clientY-r.top)});
}
function resizeCv(){
 if(!cv)return;const st=$("#stage");const w=(st&&st.clientWidth)||360,h=(st&&st.clientHeight)||300;
 DPR=Math.min(2,window.devicePixelRatio||1);cv.width=Math.floor(w*DPR);cv.height=Math.floor(h*DPR);W=w;H=h;U=clamp(w/360,.85,1.5);
 cx.setTransform(DPR,0,0,DPR,0,0);layoutSlots();
}

/* ---------- team ---------- */
function mkHero(k){const st=C.h[k];return{k,c:CLS[k],hp:st.hp,mhp:st.hp,x:0,y:0,sx:0,sy:0,st:"idle",t:0,cd:rand(.2,1)*st.iv,scd:rand(1,4),tgt:null,shield:0,shT:0,down:false,dt:0,bub:null,bubT:0,flash:0,ph:rand(0,6.28),dust:0,lunge:0}}
function buildTeam(){
 const old={};(R.team||[]).forEach(h=>old[h.k]=h);
 R.team=S.dep.map(k=>old[k]||mkHero(k));R.hero={};R.team.forEach(h=>R.hero[h.k]=h);layoutSlots();
}
function syncHeroes(){
 if(!R.team)return;
 for(const h of R.team){const st=C.h[h.k];if(!st)continue;const r=h.mhp>0?h.hp/h.mhp:1;h.mhp=st.hp;h.hp=h.down?0:Math.min(h.mhp,r*h.mhp)}
}
function layoutSlots(){
 const T=R.team;if(!T||!T.length)return;
 const top=H*.5,bot=H*.88;
 T.forEach(h=>{const d=SLOT_BY_ID[h.c.slot];h.sx=W*d.fx;h.sy=top+d.fy*(bot-top);
  if(!h.x||h.st==="idle"&&Math.abs(h.x-h.sx)>200){h.x=h.sx;h.y=h.sy}});
}
const aliveHeroes=()=>R.team.filter(h=>!h.down);
function weakestHero(){let b=null,r=9;for(const h of R.team){if(h.down)continue;const q=h.hp/h.mhp;if(q<r){r=q;b=h}}return b}
function nearestEnemy(x,y,maxd){let b=null,bd=maxd||1e9;for(const e of R.en){if(e.dead||e.x>W-6)continue;const d=Math.abs(e.x-x)+.4*Math.abs(e.y-(y==null?e.y:y));if(d<bd){bd=d;b=e}}return b}
function frontEnemy(){let b=null;for(const e of R.en){if(e.dead)continue;if(!b||e.x<b.x)b=e}return b}
const liveEn=()=>R.en.filter(e=>!e.dead);

/* ---------- fx helpers ---------- */
function fnum(x,y,txt,col,sz){if(!S.set.numbers||R.fl.length>60)return;R.fl.push({x:x+rand(-8,8),y,t:0,txt,col,sz:sz||12})}
function burst(x,y,col,n,sp){if(R.part.length>260)return;for(let i=0;i<n;i++){const a=rand(0,6.28),v=rand(.3,1)*(sp||90);R.part.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-30,l:rand(.3,.7),t:0,c:col,s:rand(2,4)})}}
function ring(x,y,col,r){R.part.push({x,y,vx:0,vy:0,l:.4,t:0,c:col,s:r||40,ring:1})}
function bolt(pts,col){R.bolts.push({pts,t:0,c:col||"#ffe84a"})}
function say(o,txt,dur){if(!txt)return;o.bub=txt;o.bubT=dur||3.2}
function ticker(msg){const t=$("#tickerTxt");if(t)t.textContent=" "+msg}

/* ---------- stage flow ---------- */
function startStage(){const W=Math.floor(wallStage());if(S.stage>=W&&R.wallW!==W){R.wallW=W;setTimeout(()=>toast('⚠️ SOFT WALL: from here enemies grow brutally. Everything on the field must be maxed. Hard cap at stage '+(hardStage()+1)+'.','bad'),1200)}
 const g=S.stage,rl=realmOf(g);
 if(areaIdx(g)!==R.lastArea)onAreaChanged();
 const per=2+Math.min(6,Math.floor(g/10)),boss=isBoss(g),mini=g%10===4;
 const nw=(g<3?3:4)+Math.min(6,Math.floor(g/40)),sizes=[];
 for(let i=0;i<nw;i++)sizes.push(per+(i>0?1:0)+Math.floor(i/2));
 if(boss||mini)sizes[nw-1]=3;
 let total=0;sizes.forEach(x=>total+=x);if(boss||mini)total++;
 R.stg={g,wave:0,waves:nw,sizes,alive:0,killed:0,total,since:2,boss,mini,bossE:null};
 R.stgT=0;R.en=[];R.proj=[];R.bolts=[];R.trans=0;R.wipeT=0;
 for(const h of R.team){if(h.down){h.down=false;h.hp=h.mhp*.6}else h.hp=Math.min(h.mhp,h.hp+h.mhp*.35);h.shield=0;h.st="idle";h.tgt=null;h.x=h.sx;h.y=h.sy}
 if(g%10===4&&rl.mid&&!S.seen["m"+areaIdx(g)]){S.seen["m"+areaIdx(g)]=1;toast("📋 "+rl.mid,"memo")}
  updateStageHud();ticker(pick(HR));
}
function onAreaChanged(){
 const ai=areaIdx(S.stage);R.lastArea=ai;pickWeather(true);R.hzT=5;
 if(ai===0&&!S.seen['pro'+S.camp]){S.seen['pro'+S.camp]=1;S.seenRealm[0]=1;setTimeout(()=>prologueModal(S.camp),400)}else
 {const hz=hazardOf(S.stage);if(hz)setTimeout(()=>toast(hz.i+" Hazard: "+hz.n+" — "+hz.d+" Bring "+TAGN[hz.c]+" allies to halve it.","bad"),900)}
 if(!S.seenRealm[ai]){S.seenRealm[ai]=1;const rl=realmOf(S.stage);
  if(ai<REALMS.length||ai%10===0)setTimeout(()=>{if(typeof storyModal==="function")storyModal("🗺️ Area "+(ai+1)+": "+rl.n,rl.intro,"Fine. Let's go ▶")},300);
  else toast("🗺️ Area "+(ai+1)+": "+rl.n,"memo")}
}
function spawnWave(){
 const s=R.stg,w=s.wave,rl=realmOf(s.g),n=s.sizes[w];
 for(let i=0;i<n;i++)spawnEnemy(rl.mobs[ri(0,5)],false,i*28);
 if(s.mini&&w===s.waves-1)spawnEnemy(rl.mobs[ri(0,5)],false,60,"elite");
 if(s.boss&&w===s.waves-1)spawnEnemy(rl.boss,true,60);
 s.wave++;s.since=0;
 if(s.mini&&w===s.waves-1){AU.play("boss");bannerShow("⚔ MINI-BOSS ⚔","Elite "+(R.stg.bossE?R.stg.bossE.name:"")+" arrives");shake(300);const hq=pick(aliveHeroes());quip(hq,QUIP.bossIn)}
 if(s.boss&&w===s.waves-1){AU.play("boss");quip(pick(aliveHeroes()),QUIP.bossIn);bannerShow("⚠ BOSS ⚠",rl.boss[0]+" — "+rl.boss[2]);shake(500)}
 updateStageHud();
}
function spawnEnemy(mob,isB,off,forceKind){
 const g=R.stg.g,rl=realmOf(g);let kk=isB?"boss":forceKind||(rl.mk||MOBKIND)[Math.max(0,rl.mobs.findIndex(m=>m[0]===mob[0]))]||"grunt";
 const K=KINDS[kk];if(K.swarm&&!forceKind&&!isB&&!R.swarmSpawning){R.swarmSpawning=1;for(let i=1;i<K.swarm;i++)spawnEnemy(mob,false,(off||0)+i*14);R.swarmSpawning=0;R.stg.total+=K.swarm-1}
 const hp=floorHP(g)*K.hp;
 const e={e:mob[1],name:mob[0],kind:kk,boss:isB,x:W+30+(off||0)+rand(0,30),y:isB?H*.7:rand(H*.5,H*.88),hp,mhp:hp,spd:K.spd,dmg:K.dmg,iv:K.iv,cd:rand(.3,K.iv),sz:K.sz,rng:K.rng*U,stun:0,slow:0,slowF:1,root:0,burn:0,burnDps:0,flash:0,dead:false,bub:null,bubT:0,ph:rand(0,6.28),lunge:0};
 if(isB){R.stg.bossE=e;say(e,pick(BOSS_QUIPS),3.5)}
 if(forceKind==='elite'){e.mini=true;e.name='Elite '+e.name;e.sz=1.7;R.stg.bossE=e;say(e,pick(BOSS_QUIPS),3.2)}
 R.en.push(e);R.stg.alive++;
}
function completeStage(){
 const s=R.stg,g=s.g;s.done=true;AU.play("win");
 if(s.boss||s.mini){if(s.boss)S.stats.bosses++;const be=s.bossE;dropChest(s.boss?'boss':'mini',g,be?be.x:W*.6,be?be.y:H*.65);quip(pick(aliveHeroes()),s.boss?QUIP.bossDead:QUIP.loot)}else quip(pick(aliveHeroes()),QUIP.clear,.6)
 if(L('clear')){const cb=Math.floor(floorHP(g)*3*C.goldBase*0.05*L('clear'));S.gold+=cb;S.totalGold+=cb;S.runGold+=cb}
 if(s.boss&&(g===9||(areaIdx(g)+1)%5===0)&&g+1>S.max){addPicks(1);toast('🎟️ Recruitment Event unlocked! Check the Heroes tab.','good')}
 S.max=Math.min(hardStage(),Math.max(S.max,g+1));if(g+1>hardStage()){setTimeout(()=>toast('🧱 HARD CAP reached at stage '+(hardStage()+1)+'. The narrator says no. Rewrite (More tab) to raise it!','bad'),900)}
 S.max=Math.min(hardStage(),Math.max(S.max,g+1));S.stats.maxEver=Math.max(S.stats.maxEver,S.max);S.campBest[S.camp]=Math.max(S.campBest[S.camp]||0,S.max);
 if(S.auto&&g+1<=S.max&&g+1<STAGE_CAP&&g+1<=hardStage())S.stage=g+1;
 if(g>=STAGE_CAP-1&&!(S.seen['camp'+S.camp])){S.seen['camp'+S.camp]=1;setTimeout(()=>{if(typeof storyModal==="function")storyModal("🏆 CAMPAIGN COMPLETE","You cleared all 2000 stages of "+CAMPS[S.camp].n+". The narrator has no further questions. Yet.","Legendary ▶")},700)}
 bannerShow(s.boss?"👑 BOSS DEFEATED!":s.mini?"⚔️ MINI-BOSS DOWN!":"STAGE "+(g+1)+" CLEAR",s.boss||s.mini?"Tap the chest before it's auto-collected!":"Marching on...");
 recalc();saveGame();R.trans=(s.boss||s.mini)?6.2:1.5;
 if(s.boss){const a=areaIdx(g)+1,key='ch'+S.camp+'_'+a;if(!S.seen[key]){S.seen[key]=1;const st=storyFor(S.camp,a);S.log.push({c:S.camp,a});if(S.log.length>400)S.log.shift();if(st.big)setTimeout(()=>{if(typeof storyModal==="function")storyModal("📖 "+st.title+" · "+realmOf(g).n,st.text,"Onward ▶")},600);else setTimeout(()=>toast("📖 "+st.text,"memo"),600)}}
 if(typeof refreshTab==="function"){refreshTab("map");refreshTab("heroes")}
}
function doWipe(){
 S.stage=Math.max(0,S.stage-1);toast("Retreating to stage "+(S.stage+1)+" to 'regroup'","bad");
 for(const h of R.team){h.down=false;h.hp=h.mhp*.7}
 startStage();
}
function gotoStage(g){if(g<0||g>S.max||g>=STAGE_CAP||g>hardStage())return false;S.stage=g;startStage();return true}
function nextStage(){return gotoStage(S.stage+1)}
function prevStage(){return gotoStage(S.stage-1)}
function toggleAuto(){S.auto=!S.auto;updateStageHud()}
function cycleSpeed(){S.speed=S.speed>=3?1:S.speed+1;R.speed=S.speed;updateStageHud()}

/* ---------- weather ---------- */
function pickWeather(silent){
 const list=realmOf(S.stage).wx||["clear"];let id=pick(list);if(id===R.wxId&&list.length>1)id=pick(list);
 setWeather(id,silent);
}
function setWeather(id,silent){
 R.wxId=id;R.wxT=rand(28,46);genWxParticles();
 if(!silent&&id!=="clear"){const w=WXD[id];AU.play("weather");bannerShow(w.i+" "+w.n,w.d.split(".")[0]);
  const h=pick(aliveHeroes().length?aliveHeroes():R.team);if(h)say(h,pick(WX_QUIPS[id]||WX_QUIPS.clear),3.5)}
 updateStageHud();
}
function genWxParticles(){
 const f=WX().fx,n={rain:70,thunder:90,snow:60,blizzard:130,wind:26,sand:90,ash:50,confetti:46}[f]||0;R.wxp=[];
 for(let i=0;i<n;i++)R.wxp.push(mkWxP(f,true));
}
function mkWxP(f,init){
 const p={x:rand(0,W),y:init?rand(0,H):-10,vx:0,vy:0,s:rand(1,3),c:"#fff",r:rand(0,6.28)};
 switch(f){case"rain":case"thunder":p.vx=-60;p.vy=rand(380,520);p.c="rgba(170,210,255,.55)";break;
  case"snow":p.vx=rand(-20,10);p.vy=rand(30,70);p.s=rand(1.5,3.2);p.c="rgba(255,255,255,.85)";break;
  case"blizzard":p.vx=rand(-260,-160);p.vy=rand(60,140);p.s=rand(1.5,3);p.c="rgba(240,250,255,.8)";break;
  case"wind":p.vx=rand(-420,-300);p.vy=rand(-10,10);p.y=rand(0,H);p.s=rand(10,26);p.c="rgba(255,255,255,.25)";break;
  case"sand":p.vx=rand(-300,-200);p.vy=rand(-20,20);p.y=rand(0,H);p.s=rand(1,2.2);p.c="rgba(226,190,120,.7)";break;
  case"ash":p.vx=rand(-20,10);p.vy=rand(25,55);p.s=rand(1.5,3);p.c="rgba(80,70,70,.8)";break;
  case"confetti":p.vx=rand(-30,30);p.vy=rand(40,90);p.s=rand(3,5);p.c=pick(["#19e6ff","#ff2fd0","#ffe84a","#5df08a","#ff7a2f"]);break}
 return p;
}
function weatherTick(dt){
 R.wxT-=dt;if(R.wxT<=0)pickWeather(false);
 const w=WX();
 for(const p of R.wxp){p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*4;if(p.y>H+10||p.x<-30||p.x>W+30||p.y<-20){const q=mkWxP(w.fx,false);if(p.vx<-100){q.x=W+rand(0,30);q.y=rand(0,H)}Object.assign(p,q)}}
 if(w.strike){R.strikeT-=dt;if(R.strikeT<=0){R.strikeT=w.strike.iv*rand(.7,1.3);weatherStrike(w)}}
 // damage over time / regen modifiers handled per hero
}
function weatherStrike(w){
 const st=w.strike,hs=aliveHeroes(),en=liveEn();let tx,ty,hh=null;
 if(hs.length&&Math.random()<st.hero){hh=pick(hs);tx=hh.x;ty=hh.y}
 else if(en.length){const e=pick(en);tx=e.x;ty=e.y}
 else{tx=rand(W*.4,W*.9);ty=rand(H*.5,H*.85)}
 const rad=st.aoe*U;
 if(st.meteor)R.proj.push({t:"meteor",x:tx+90,y:-20,tx,ty,tt:0,dur:.55,rad,dmg:st.dm*R.aref,wx:1,hurtH:hh});
 else{bolt([[tx+rand(-20,20),0],[tx+rand(-15,15),ty*.5],[tx,ty]],"#fff7a0");R.flash=.25;AU.play("zap");wxBoom(tx,ty,rad,st.dm,hh)}
}
function wxBoom(x,y,rad,dm,hh){
 ring(x,y,"#ffe84a",rad);burst(x,y,"#ffe84a",10,140);
 for(const e of liveEn())if(Math.abs(e.x-x)<rad&&Math.abs(e.y-y)<rad*.8)dmgEnemy(e,dm*R.aref,{col:"#ffe84a"});
 if(hh&&!hh.down)hurtHero(hh,hh.mhp*.04*dm*(1-C.umb),"weather");
}

/* ---------- damage ---------- */
function dmgEnemy(e,amt,o){
 o=o||{};if(e.dead||amt<=0)return false;if(e.boss||e.mini)amt*=C.bossM;e.hp-=amt;e.flash=.1;
 if(!o.dot)fnum(e.x,e.y-e.sz*16,fmt(amt),o.crit?"#ffe84a":(o.col||"#ffffff"),o.crit?16:12);
 if(o.crit)S.stats.crits++;
 if(e.hp<=0){killEnemy(e);return true}return false;
}
function killEnemy(e){
 e.dead=true;e.dieT=.35;R.stg.alive--;R.stg.killed++;S.kills++;
 const wx=WX();let g=e.mhp*GOLDK*C.goldBase*(wx.gold||1)*(R.buff.gold>0?C.goldBuff:1)*(S.bt.ticket>0?2:1)*(e.boss?5:e.mini?3:1);
 g=Math.max(1,Math.floor(g));S.gold+=g;S.totalGold+=g;S.runGold+=g;
 if(Math.random()<.05){const al=aliveHeroes();if(al.length)quip(pick(al),QUIP.kill)}
 fnum(e.x,e.y-24,"+"+fmt(g),"#ffd34a",11);burst(e.x,e.y,e.boss?"#ffb020":"#ffe9a0",e.boss?24:7,e.boss?200:100);AU.play(e.boss?"boom":"kill");
 if(e.boss)shake(500);
 if(Math.random()<.035*(e.boss?0:1)*Math.min(3,C.luck)*C.lootq)dropLoot(false);
 if(Math.random()<.004&&S.stats.maxEver>=3){toast("🥚 Found an egg in the monster!","good");rollEgg()}
}
function hurtHero(h,d,src){
 if(h.down||d<=0)return;d*=(1-C.armor)*(1-C.dr)*(S.pb.hp>0?.9:1);
 if(h.shield>0){const a=Math.min(h.shield,d);h.shield-=a;d-=a}
 if(d<=0)return;h.hp-=d;h.flash=.12;fnum(h.x,h.y-26,"-"+fmt(d),"#ff5a6e",12);AU.play("hurt");
 if(h.hp<=0){
  h.hp=0;h.down=true;h.dt=18;h.st="idle";h.tgt=null;h.shield=0;S.stats.deaths++;AU.play("death");burst(h.x,h.y,"#ff5a6e",12);
  const m=h.c.hero+" "+pick(DEATHS);ticker("INCIDENT: "+m);say(h,"Ow.",2);vibe(40);
  const al=aliveHeroes();if(al.length)setTimeout(()=>quip(pick(aliveHeroes()),QUIP.allyDown,.7),700);
 }else if(h.hp/h.mhp<.3&&!h.lowQ){h.lowQ=true;quip(h,QUIP.lowhp,.8)}
}
function healHero(h,amt){if(h.down||amt<=0)return;amt*=hzv("curse",.5)*0.55;const a=Math.min(h.mhp-h.hp,amt);if(a<=0)return;h.hp+=a;fnum(h.x,h.y-26,"+"+fmt(a),"#5df08a",11);if(h.hp/h.mhp>.6)h.lowQ=false;if(Math.random()<.06)quip(h,QUIP.heal)}
function reviveHero(h,fr){if(!h.down)return;h.down=false;h.hp=h.mhp*fr;h.x=h.sx;h.y=h.sy;S.stats.revives++;burst(h.x,h.y,"#5df08a",10)}

/* ---------- hero AI ---------- */
function moveTo(o,tx,ty,sp,dt){const dx=tx-o.x,dy=ty-o.y,d=Math.hypot(dx,dy);if(d<=sp*dt){o.x=tx;o.y=ty;return 0}o.x+=dx/d*sp*dt;o.y+=dy/d*sp*dt;return d-sp*dt}
function heroDmgBase(h){return C.h[h.k].hit*heroMod(h)}
function rollCrit(h){return Math.random()<C.h[h.k].crit}
function strikeEnemy(h,e,mult,col){
 let d=heroDmgBase(h)*(mult||1),cr=rollCrit(h);if(cr)d*=C.critMul;
 dmgEnemy(e,d,{crit:cr,col:col});if(cr)quip(h,QUIP.crit,.12);burst(e.x,e.y,cr?"#ffe84a":"#ffffff",cr?8:4,90);AU.play(cr?"crit":"hit");
}
function heroSay(h){const r=Math.random();if(r<.93)say(h,heroLine(h,"gen")||pick(h.c.q),3.6);else say(h,pick(HERO_GEN_QUIPS),3.4);
 if(Math.random()<.45){const o=aliveHeroes().filter(x=>x!==h);if(o.length)R.reply={t:rand(1.4,2.2),who:pick(o)}}}

function heroUpdate(h,dt){
 const st=C.h[h.k],c=h.c;if(!st)return;
 h.flash=Math.max(0,h.flash-dt);if(h.bubT>0)h.bubT-=dt;
 if(h.down){h.dt-=dt;if(h.dt<=0){reviveHero(h,.4);ticker("The narrator revives "+c.hero+". They're back.")}return}
 // regen & weather dot
 const w=WX();
 if(C.regen+(C.h[h.k]?C.h[h.k].regen:0))h.hp=Math.min(h.mhp,h.hp+h.mhp*(C.regen+(C.h[h.k]?C.h[h.k].regen:0))*(w.regen==null?1:w.regen)*hzv("curse",.2)*dt);
 if(S.pb.hp>0)h.hp=Math.min(h.mhp,h.hp+h.mhp*.008*dt);
 if(w.hdot)h.hp=Math.max(1,h.hp-h.mhp*w.hdot*(1-C.umb)*dt);
 if(h.shT>0){h.shT-=dt;if(h.shT<=0)h.shield=0}
 if(R.trans>0){moveTo(h,h.sx,h.sy,420*U,dt);h.st="idle";return}
 const m=heroSpd(h);h.cd-=dt*m;h.scd-=dt*m/(1-Math.min(.75,C.cdr+(C.h[h.k]?C.h[h.k].cdr:0)));
 const hk=S.heroes[h.k];
 if(h.st==="idle"){
  moveTo(h,h.sx,h.sy,380*U,dt);
  if(hk.sp>0&&h.scd<=0&&trySpecial(h)){h.scd=c.sp.cd;return}
  if(h.cd<=0){
   if(c.rng===0){
    const e=nearestEnemy(h.sx,h.sy,1e9);
    if(e&&e.x-h.sx<=210*U){h.tgt=e;h.st="charge"}
   }else{
    if(h.k==="healer"){const wk=weakestHero();if(wk&&wk.hp/wk.mhp<.92){healHero(wk,wk.mhp*Math.min(.2,.05*(1+.03*(hk.lvl-1)+.03*(hk.at-1))));AU.play("heal");burst(wk.x,wk.y,"#5df08a",5,60);h.cd=st.iv;return}}
    const e=nearestEnemy(h.x,h.y);
    if(e&&e.x-h.x<=c.rng*U){fireBolt(h,e);h.cd=st.iv}
   }
  }
 }else if(h.st==="charge"){
  if(!h.tgt||h.tgt.dead){h.tgt=nearestEnemy(h.x,h.y,1e9);if(!h.tgt){h.st="return";return}}
  const dist=moveTo(h,h.tgt.x-(18+h.tgt.sz*8)*U,h.tgt.y,640*U,dt);
  if(dist<=2){strikeEnemy(h,h.tgt,1);h.cd=st.iv;h.st="strike";h.t=.12;h.lunge=1}
 }else if(h.st==="strike"){h.t-=dt;if(h.t<=0)h.st="return"}
 else if(h.st==="return"){if(moveTo(h,h.sx,h.sy,460*U,dt)<=1)h.st="idle"}
 h.lunge=Math.max(0,h.lunge-dt*6);
 h.sayT=(h.sayT==null?rand(5,12):h.sayT)-dt;
}
function fireBolt(h,e){
 const col=ELCOL[h.c.el]||"#fff";
 R.proj.push({t:"bolt",x:h.x+10*U,y:h.y-6,tgt:e,sp:620*U,dmg:heroDmgBase(h),k:h.k,col,arrow:h.k==="archer",h});AU.play("shoot");
}
function trySpecial(h){
 const c=h.c,sp=c.sp,st=C.h[h.k],en=liveEn();const sd=st.sp*st.hit*heroMod(h);
 const need=()=>en.length>0;
 const front=frontEnemy();
 switch(sp.id){
  case"bash":{if(!need())return false;const e=nearestEnemy(h.sx,h.sy);if(!e||e.x-h.sx>260*U)return false;dmgEnemy(e,sd,{col:"#ffb020"});e.stun=2.5;ring(e.x,e.y,"#ffb020",40);say(h,"BONK.",1.6);break}
  case"volley":{if(!need())return false;for(let i=0;i<6;i++){const e=pick(en);R.proj.push({t:"bolt",x:h.x+10,y:h.y,tgt:e,sp:700*U,dmg:sd,k:"archer",col:"#fff",arrow:1,delay:i*.07,h})}say(h,"Incoming regret!",1.8);break}
  case"whirl":{if(!need()||!front||front.x-h.sx>200*U)return false;for(const e of en)if(e.x<h.sx+230*U)dmgEnemy(e,sd,{col:"#ff7a2f"});ring(h.x,h.y,"#ff7a2f",110*U);h.lunge=1;say(h,"AAAAAH!",1.6);break}
  case"mend":{const wk=weakestHero();if(!wk||wk.hp/wk.mhp>.8)return false;const f=Math.min(.9,st.sp);for(const x of aliveHeroes())healHero(x,x.mhp*f);for(const x of R.team)if(x.down&&Math.random()<.5)reviveHero(x,.25);AU.play("heal");ring(h.x,h.y,"#5df08a",90);say(h,"Group hug! Mandatory.",2);break}
  case"meteor":{if(!need())return false;const e=front;R.proj.push({t:"meteor",x:e.x+90,y:-20,tx:e.x,ty:e.y,tt:0,dur:.6,rad:95*U,dmg:sd});AU.play("skill");say(h,"Sorry in advance!",2);break}
  case"backstab":{if(!need())return false;const e=nearestEnemy(h.sx,h.sy);if(!e||e.x-h.sx>260*U)return false;dmgEnemy(e,sd*C.critMul,{crit:true});burst(e.x,e.y,"#ff2fd0",10,120);say(h,"Totally legal.",1.6);break}
  case"guard":{if(!need())return false;const f=Math.min(1,st.sp);for(const x of aliveHeroes()){x.shield=x.mhp*f;x.shT=6;ring(x.x,x.y,"#ffe9a0",30)}AU.play("skill");say(h,"Holy excuse activated.",2);break}
  case"inferno":{if(!need())return false;for(const e of en){e.burn=5;e.burnDps=sd/5}burst(W*.7,H*.7,"#ff7a2f",20,160);AU.play("boom");say(h,"It's fine. It's all fine.",2);break}
  case"ballad":{if(!need())return false;R.buff.ballad=7;AU.play("special");say(h,"♪ Power Ballad! ♪",2);for(const x of aliveHeroes())ring(x.x,x.y,"#ff2fd0",30);break}
  case"blizzard":{if(!need())return false;for(const e of en){dmgEnemy(e,sd,{col:"#7fe6ff"});e.slow=5;e.slowF=.4}R.flash=.2;AU.play("skill");say(h,"Cold shoulder.",2);break}
  case"flurry":{if(!need())return false;const e=nearestEnemy(h.sx,h.sy);if(!e||e.x-h.sx>260*U)return false;dmgEnemy(e,sd,{col:"#ffb020"});for(let i=0;i<5;i++)burst(e.x+rand(-10,10),e.y+rand(-10,10),"#fff",3,90);AU.play("crit");say(h,"HIYAH. Calmly.",1.6);break}
  case"overgrow":{if(!need())return false;for(const e of en)if(e.x<h.sx+300*U)e.root=3;for(const x of aliveHeroes())healHero(x,x.mhp*Math.min(.4,st.sp));AU.play("heal");say(h,"The ferns say stay.",2);break}
  case"drain":{if(!need())return false;const e=nearestEnemy(h.sx,h.sy);if(!e||e.x-h.sx>340*U)return false;dmgEnemy(e,sd,{col:"#c36bff"});const wk=weakestHero();if(wk)healHero(wk,wk.mhp*.08);burst(e.x,e.y,"#c36bff",8);AU.play("special");say(h,"Wish granted.",1.6);break}
  case"chain":{if(!need())return false;let cur=front,hit=new Set(),pts=[[h.x,h.y]];for(let i=0;i<6&&cur;i++){hit.add(cur);pts.push([cur.x,cur.y]);dmgEnemy(cur,sd,{col:"#ffe84a"});let nx=null,bd=1e9;for(const e of en){if(e.dead||hit.has(e))continue;const d=Math.hypot(e.x-cur.x,e.y-cur.y);if(d<bd){bd=d;nx=e}}cur=nx}bolt(pts);AU.play("zap");say(h,"Forwarded to all.",1.8);break}
  case"brew":{if(!need())return false;const r=ri(0,4);
   if(r===0){const e=front;ring(e.x,e.y,"#5df08a",100);for(const x of en)if(Math.abs(x.x-e.x)<110*U)dmgEnemy(x,sd,{col:"#5df08a"});AU.play("boom");say(h,"Probably fine.",2)}
   else if(r===1){for(const x of aliveHeroes())healHero(x,x.mhp*.3);AU.play("heal");say(h,"Health potion! I think.",2)}
   else if(r===2){R.buff.ballad=6;say(h,"Speed potion! Maybe.",2)}
   else if(r===3){for(const x of en){x.slow=5;x.slowF=.5}say(h,"Goo potion. Sorry.",2)}
   else{hurtHero(h,h.mhp*.05,"oops");burst(h.x,h.y,"#c36bff",14);say(h,"That was NOT supposed to turn purple.",2.4)}
   break}
  case"allin":{if(!need())return false;const e=nearestEnemy(h.sx,h.sy);if(!e||e.x-h.sx>340*U)return false;const mul=pick([.2,.5,1,1,2,2,4,8,16]);dmgEnemy(e,sd*mul/2.5,{crit:mul>=8,col:"#ffe84a"});fnum(h.x,h.y-40,"×"+mul,"#ff2fd0",16);
   if(Math.random()<.05){const j=floorHP(S.stage)*2*C.goldBase;S.gold+=j;S.totalGold+=j;toast("🎰 JACKPOT! +"+fmt(j)+" gold","good");AU.play("coin")}AU.play("coin");say(h,"Double or nothing!",1.6);break}
  case"barrage":{if(!need())return false;for(let i=0;i<10;i++){const e=pick(en);R.proj.push({t:"bolt",x:h.x+10,y:h.y,tgt:e,sp:720*U,dmg:sd,k:h.k,col:"#fff",arrow:1,delay:i*.05,h})}say(h,"Raining arrows. Sorry.",1.8);break}
  case"execute":{if(!need())return false;let e=null,r=2;for(const x of en){const q=x.hp/x.mhp;if(q<r&&x.x-h.sx<300*U){r=q;e=x}}if(!e)return false;dmgEnemy(e,sd*(1+2*(1-r)),{crit:true,col:"#ff2fd0"});burst(e.x,e.y,"#ff2fd0",12,140);AU.play("crit");say(h,"Terms accepted.",1.6);break}
  case"poison":{if(!need())return false;for(const e of en){e.burn=6;e.burnDps=sd/6}burst(W*.7,H*.7,"#7dff4a",16,140);AU.play("special");say(h,"Toxic positivity.",2);break}
  case"quake":{if(!need())return false;for(const e of en){dmgEnemy(e,sd,{col:"#c9a56a"});e.stun=Math.max(e.stun,1.2)}shake(300);R.flash=.15;AU.play("boom");say(h,"Oops. Did I do that?",2);break}
  case"rally":{R.buff.cry=Math.max(R.buff.cry,6);AU.play("special");for(const x of aliveHeroes())ring(x.x,x.y,"#ffb020",30);say(h,"Let's synergize!",2);break}
  case"taxes":{if(!need())return false;const gold=floorHP(S.stage)*C.goldBase*st.sp*0.4;S.gold+=gold;S.totalGold+=gold;S.runGold+=gold;fnum(h.x,h.y-40,"+"+fmt(gold),"#ffd34a",15);AU.play("coin");say(h,"Everything is deductible.",2);break}
  case"revive":{const dn=R.team.filter(x=>x.down),wk=weakestHero();if(!dn.length&&(!wk||wk.hp/wk.mhp>.8))return false;if(dn.length)reviveHero(dn[0],Math.min(1,st.sp));for(const x of aliveHeroes())healHero(x,x.mhp*.12);AU.play("heal");ring(h.x,h.y,"#fff",90);say(h,"Back to work.",2);break}
  case"smite":{if(!need())return false;const e=nearestEnemy(h.sx,h.sy);if(!e||e.x-h.sx>280*U)return false;dmgEnemy(e,sd,{col:"#ffe9a0"});const wk=weakestHero();if(wk)healHero(wk,wk.mhp*.1);ring(e.x,e.y,"#ffe9a0",60);AU.play("skill");say(h,"Smite scheduled.",1.6);break}
  default:return false;
 }
 return true;
}

/* ---------- enemies ---------- */
function enemyUpdate(e,dt){
 e.flash=Math.max(0,e.flash-dt);if(e.bubT>0)e.bubT-=dt;e.lunge=Math.max(0,e.lunge-dt*6);
 if(e.dead){e.dieT-=dt;return}
 if(e.burn>0){e.burn-=dt;dmgEnemy(e,e.burnDps*dt,{dot:1});if(e.dead)return}
 if(e.slow>0){e.slow-=dt;if(e.slow<=0)e.slowF=1}
 e.cd-=dt*(HZ()&&HZ().id==="frenzy"?1+.35*hzMit():1);
 if(e.stun>0){e.stun-=dt;return}
 const hs=aliveHeroes();if(!hs.length)return;
 let near=null,bd=1e9;for(const h of hs){const d=Math.abs(e.x-h.x)+.5*Math.abs(e.y-h.y);if(d<bd){bd=d;near=h}}
 const stopX=near.x+(e.rng?e.rng:(22+e.sz*10)*U);
 if(e.root>0)e.root-=dt;
 else if(e.x>stopX){const w=WX();e.x-=34*U*e.spd*(w.espd||1)*e.slowF*dt;if(e.x<stopX)e.x=stopX}
 if(e.x<=stopX+6&&e.cd<=0&&e.root<=0||(e.x<=stopX+6&&e.cd<=0&&e.root>0&&!e.rng)){
  e.cd=e.iv*rand(.9,1.1);
  const w=WX();let d=enemyBase(e.bossG||R.stg.g)*e.dmg*elemE(realmOf(R.stg.g).el)*penUp(w.edmg||1);
  if(e.boss)d*=1+Math.max(0,(R.stgT-40)/20);
  if(e.rng){R.proj.push({t:"spit",x:e.x,y:e.y-6,tgt:near,sp:300*U,dmg:d})}
  else{e.lunge=1;hurtHero(near,d,e);if(e.boss)shake(150)}
  if(Math.random()<.04)say(e,pick(ENEMY_QUIPS),2.6);
 }
}

/* ---------- projectiles ---------- */
function projUpdate(dt){
 for(const p of R.proj){
  if(p.delay>0){p.delay-=dt;continue}
  if(p.t==="bolt"){
   if(!p.tgt||p.tgt.dead){p.tgt=nearestEnemy(p.x,p.y);if(!p.tgt){p.dead=true;continue}}
   const dx=p.tgt.x-p.x,dy=p.tgt.y-p.y,d=Math.hypot(dx,dy);
   if(d<=p.sp*dt+4){let dm=p.dmg,cr=false;if(p.h&&rollCrit(p.h)){dm*=C.critMul;cr=true}dmgEnemy(p.tgt,dm,{crit:cr,col:p.col});if(cr&&p.h)quip(p.h,QUIP.crit,.12);burst(p.tgt.x,p.tgt.y,p.col,3,70);AU.play(cr?"crit":"hit");p.dead=true}
   else{p.x+=dx/d*p.sp*dt;p.y+=dy/d*p.sp*dt;p.ang=Math.atan2(dy,dx)}
  }else if(p.t==="spit"){
   if(!p.tgt||p.tgt.down){p.dead=true;continue}
   const dx=p.tgt.x-p.x,dy=p.tgt.y-p.y,d=Math.hypot(dx,dy);
   if(d<=p.sp*dt+4){hurtHero(p.tgt,p.dmg,"spit");p.dead=true}else{p.x+=dx/d*p.sp*dt;p.y+=dy/d*p.sp*dt}
  }else if(p.t==="meteor"){
   p.tt+=dt;const f=Math.min(1,p.tt/p.dur);p.cx=p.x+(p.tx-p.x)*f;p.cy=p.y+(p.ty-p.y)*f;
   if(f>=1){ring(p.tx,p.ty,"#ff7a2f",p.rad);burst(p.tx,p.ty,"#ff7a2f",18,180);AU.play("boom");R.flash=.2;shake(200);
    for(const e of liveEn())if(Math.abs(e.x-p.tx)<p.rad&&Math.abs(e.y-p.ty)<p.rad*.9)dmgEnemy(e,p.dmg,{col:"#ff7a2f"});
    if(p.wx){for(const h of aliveHeroes())if(Math.abs(h.x-p.tx)<p.rad&&Math.abs(h.y-p.ty)<p.rad)hurtHero(h,h.mhp*.04*5*(1-C.umb),"meteor")}
    p.dead=true}
  }
 }
 R.proj=R.proj.filter(p=>!p.dead);
}

/* ---------- pets ---------- */
function petAtkMult(id,l){const p=PETS.find(x=>x.id===id);return p&&p.a?p.a[0]+p.a[1]*l:id==="ratres"?.5+.1*l:id==="hamster"?.8+.12*l:id==="dragonling"?1.2+.2*l:1}
function petTick(dt){
 for(const id of S.petAct){const p=PETS.find(x=>x.id===id),pl=S.pets[id];if(!p||!pl)continue;
  R.petT[id]=(R.petT[id]==null?rand(1,2.5):R.petT[id])-dt;if(R.petT[id]>0)continue;
  if(p.type==="atk"){const e=nearestEnemy(W*.3,H*.7);if(e){R.petT[id]=2.5;dmgEnemy(e,R.aref*petAtkMult(id,pl.lvl),{col:"#ffb020"});burst(e.x,e.y,"#ffb020",5);AU.play("hit")}else R.petT[id]=.5}
  else if(p.type==="heal"){const wk=weakestHero();R.petT[id]=3;if(wk&&wk.hp<wk.mhp)healHero(wk,wk.mhp*p.v*pl.lvl)}
  else R.petT[id]=5;
 }
}

/* ---------- player actions ---------- */
function dropChest(type,g,x,y){R.drops=R.drops||[];R.drops.push({type,g,x:clamp(x,40,W-40),y:clamp(y,H*.5,H*.85),t:0,oy:0,vy:-340,bn:0});AU.play("loot")}
function collectDrop(d,auto){
 S.chestBag.push({t:d.type,g:d.g});d.done=true;burst(d.x,d.y-10,"#ffd23a",auto?8:22,160);AU.play(auto?"ui":"coin");
 fnum(d.x,d.y-30,(d.type==="boss"?"👑 Boss":"⚔️ Mini")+" chest +1","#ffd23a",13);
 if(typeof refreshTab==="function")refreshTab("shop")}
function dropsUpdate(dt){
 if(!R.drops)return;
 for(const d of R.drops){d.t+=dt;d.vy+=900*dt;d.oy+=d.vy*dt;if(d.oy>0){d.oy=0;if(Math.abs(d.vy)>60){d.vy*=-.45;d.bn++}else d.vy=0}if(d.t>=5&&!d.done)collectDrop(d,true)}
 R.drops=R.drops.filter(d=>!d.done)}
function drawDrops(){
 if(!R.drops)return;
 for(const d of R.drops){const pulse=1+.08*Math.sin(R.time*9),sz=40*pulse*U;cx.save();cx.shadowColor=d.type==="boss"?"#ff2fd0":"#19e6ff";cx.shadowBlur=22;setFont(sz);cx.textAlign="center";cx.textBaseline="middle";cx.fillText(d.type==="boss"?"🎁":"📦",d.x,d.y+d.oy);cx.restore();
  cx.fillStyle="#fff";cx.font="bold 12px sans-serif";cx.textAlign="center";cx.fillText("TAP! "+Math.max(0,Math.ceil(5-d.t)),d.x,d.y+d.oy-30*U)}
 cx.textBaseline="alphabetic"}
function tapAt(x,y){
 if(R.drops&&!R.modalPause)for(const d of R.drops)if(!d.done&&Math.abs(d.x-x)<56&&Math.abs(d.y+d.oy-y)<56){collectDrop(d);return}
 if(!R.inGame||R.modalPause||R.trans>0||!R.stg)return;
 const e=nearestEnemy(x,y,150)||frontEnemy();S.taps++;
 burst(x,y,"#19e6ff",4,80);if(!e)return;tapHit(e);
}
function tapHit(e,auto){
 let d=C.tap,cr=Math.random()<C.critCh;if(cr)d*=C.critMul;
 dmgEnemy(e,d,{crit:cr,col:"#19e6ff"});burst(e.x,e.y,"#19e6ff",3,80);if(!auto)AU.play(cr?"crit":"hit");
}
function useSkill(id){
 const sk=SKS.find(s=>s.id===id),l=SKL(id);
 if(!sk||l<1||(R.cd[id]||0)>0||!R.stg||R.trans>0||!R.inGame)return false;
 const en=liveEn();
 if((id==="slash"||id==="meteor")&&!en.length)return false;
 switch(id){
  case"slash":{const e=frontEnemy();let d=C.tap*(12+4*l),cr=Math.random()<C.critCh;if(cr)d*=C.critMul;dmgEnemy(e,d,{crit:cr,col:"#ffe84a"});ring(e.x,e.y,"#ffe84a",60);AU.play("skill");shake(150);break}
  case"cry":R.buff.cry=sk.dur;AU.play("special");bannerShow("📣 MOTIVATION!","Damage and speed up");break;
  case"cash":R.buff.gold=sk.dur;AU.play("coin");bannerShow("🤝 GOLDEN HANDSHAKE","Gold x"+C.goldBuff.toFixed(1));break;
  case"meteor":{for(const e of en)dmgEnemy(e,C.tap*(30+10*l),{col:"#ff7a2f"});R.flash=.4;AU.play("boom");shake(400);burst(W*.7,H*.7,"#ff7a2f",30,220);break}
  case"hr":{const f=Math.min(1,(50+5*l)/100);for(const h of R.team){if(h.down)reviveHero(h,f);else healHero(h,h.mhp*f)}AU.play("heal");bannerShow("📋 FAIRY GODMOTHER","Everyone is rehired.");break}
 }
 R.cd[id]=sk.cd;return true;
}

/* ---------- main update ---------- */
const HZ=()=>hazardOf(S.stage);
const hzMit=()=>{const h=HZ();return h&&S.dep.some(k=>SYN[k].tags.includes(h.c))?.5:1};
function hzv(id,v){const h=HZ();if(!h||h.id!==id)return 1;return 1-(1-v)*hzMit()/1}
function hazardTick(dt){
 const hz=HZ();if(!hz||R.trans>0||!R.team||!R.stg||R.stg.done)return;const m=hzMit();
 if(hz.id==="spore"){for(const h of R.team)if(!h.down)h.hp=Math.max(1,h.hp-h.mhp*.006*m*dt)}
 else if(hz.id==="rock"){R.hzT=(R.hzT==null?5:R.hzT)-dt;if(R.hzT<=0){R.hzT=7;const al=aliveHeroes();if(al.length){const h=pick(al);burst(h.x,h.y-30,"#a89a8a",14);fnum(h.x,h.y-50,"🪨","#fff",16);hurtHero(h,h.mhp*.12*m,"hz");shake(4)}}}
}
function update(dt){
 if(!R.stg)return;
 R.time+=dt;R.stgT+=dt;
 for(const t in S.pb)if(S.pb[t]>0)S.pb[t]-=dt;hazardTick(dt);
 if(S.bt.ticket>0)S.bt.ticket-=dt;if(S.bt.pre>0)S.bt.pre-=dt;
 if(R.buff.cry>0)R.buff.cry-=dt;if(R.buff.gold>0)R.buff.gold-=dt;if(R.buff.ballad>0)R.buff.ballad-=dt;
 for(const k in R.cd)if(R.cd[k]>0)R.cd[k]-=dt;
 R.scroll+=dt*(R.trans>0?240:(liveEn().length?30:55))*U;
 if(R.flash>0)R.flash-=dt;
 weatherTick(dt);
 if(R.wipeT>0){R.wipeT-=dt;if(R.wipeT<=0)doWipe()}
 else if(R.trans>0){R.trans-=dt;if(R.trans<=0)startStage()}
 else{
  const s=R.stg;s.since+=dt;
  if(s.wave<s.waves&&((s.since>3&&s.alive<=1)||s.since>9))spawnWave();
  else if(s.wave>=s.waves&&s.alive<=0&&!s.done)completeStage();
  if(R.team.length&&R.team.every(h=>h.down)){R.wipeT=2.4;S.stats.wipes++;bannerShow("TOTAL PARTY WIPE",pick(WIPE_LINES));AU.play("death")}
 }
 for(const h of R.team)heroUpdate(h,dt);
 for(const e of R.en)if(e.dead)e.dieT-=dt;if(R.trans<=0){for(const e of R.en)if(!e.dead)enemyUpdate(e,dt)}R.en=R.en.filter(e=>!e.dead||e.dieT>0)
 projUpdate(dt);petTick(dt);dropsUpdate(dt);
 if(C.auto>0&&R.trans<=0){R.tapAcc+=C.auto*dt;while(R.tapAcc>=1){R.tapAcc-=1;const e=frontEnemy();if(e)tapHit(e,true)}}
 // particles & floats
 for(const p of R.part){p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=240*dt}
 R.part=R.part.filter(p=>p.t<p.l);
 for(const f of R.fl){f.t+=dt;f.y-=28*dt}
 R.fl=R.fl.filter(f=>f.t<.9);
 for(const b of R.bolts)b.t+=dt;R.bolts=R.bolts.filter(b=>b.t<.25);
 // speech
 R.bubT-=dt;
 if(R.reply){R.reply.t-=dt;if(R.reply.t<=0){quip(R.reply.who,QUIP.reply);R.reply=null}}
 if(R.bubT<=0){R.bubT=rand(2.6,5);const hs=aliveHeroes();if(hs.length&&R.team.filter(h=>h.bubT>0).length<2){heroSay(pick(hs))}
  const en=liveEn();if(en.length&&Math.random()<.4){const e=pick(en);say(e,pick(ENEMY_QUIPS),2.6)}}
 R.tickerT-=dt;if(R.tickerT<=0){R.tickerT=14;ticker(pick(HR))}
 R.uiT-=dt;if(R.uiT<=0){R.uiT=.25;updateStageHud()}
}
function stepSim(sec){const n=Math.round(sec*30);for(let i=0;i<n;i++)update(1/30)}

/* ---------- loop ---------- */
let lastTs=0,acc=0;
function frame(ts){
 requestAnimationFrame(frame);
 if(!lastTs){lastTs=ts;return}
 let dt=Math.min(.1,(ts-lastTs)/1000);lastTs=ts;
 if(R.inGame&&!R.modalPause&&!document.hidden){
  acc+=dt*S.speed;let n=0;while(acc>=1/30&&n<10){update(1/30);acc-=1/30;n++}if(n>=10)acc=0;
 }
 if(R.inGame)render();
}
function startLoop(){if(R.loopOn)return;R.loopOn=true;requestAnimationFrame(frame)}

/* ---------- HUD ---------- */
function updateStageHud(){
 if(!R.stg)return;const s=R.stg,g=s.g,w=WX();
 const set=(id,t)=>{const el=document.getElementById(id);if(el&&el.textContent!==t)el.textContent=t};
 set("stLabel","STAGE "+(g+1));set("stRealm",realmName(g)+(HZ()?" · "+HZ().i+HZ().n:""));
 set("stWave",R.trans>0?"MARCHING ON…":"WAVE "+Math.min(s.wave,s.waves)+"/"+s.waves+(s.boss&&s.wave>=3?" · BOSS":""));
 const chip=document.getElementById("wxChip");if(chip){const t=w.i+" "+w.n;if(chip.textContent!==t)chip.textContent=t}
 const ab=document.getElementById("autoBtn");if(ab){ab.textContent=S.auto?"AUTO ▶":"REPEAT ↻";ab.classList.toggle("on",!!S.auto)}
 const sb=document.getElementById("speedBtn");if(sb)sb.textContent="×"+S.speed;
 const bb=document.getElementById("bossbar");
 if(bb){const be=s.bossE;if(be&&!be.dead){bb.classList.remove("hidden");bb.firstElementChild.style.width=(be.hp/be.mhp*100)+"%"}else bb.classList.add("hidden")}
 const pb=document.getElementById("stProg");if(pb)pb.style.width=(s.total?s.killed/s.total*100:0)+"%";
}

/* ---------- rendering ---------- */
/* Asset metadata uses uniform grid cells and a shared foot anchor. */
const GAME_ART={
 huntsman:{src:'assets/huntsman.png',cols:4,rows:2,scale:1.9},
 rat:{src:'assets/hungry-rat.png',cols:4,rows:2,scale:2.0}
};
for(const a of Object.values(GAME_ART)){a.image=new Image();a.image.src=a.src;}
const artWoods=new Image();artWoods.src='assets/hollow-woods.png';
function paintSprite(key,sz,attack,phase,still){
 const a=GAME_ART[key];if(!a||!a.image.complete||!a.image.naturalWidth)return false;
 const cw=a.image.naturalWidth/a.cols,ch=a.image.naturalHeight/a.rows;
 const frame=still?0:Math.floor(R.time*8+(phase||0))%a.cols;
 const row=attack?1:0,dw=sz*a.scale,dh=dw*ch/cw;
 cx.drawImage(a.image,frame*cw,row*ch,cw,ch,-dw/2,sz*.48-dh,dw,dh);return true;
}
function drawArtHero(h,sz){return h.k==='knight'&&paintSprite('huntsman',sz,h.lunge>0,h.ph,h.down||h.st==='idle'&&R.trans<=0);}
function drawArtEnemy(e,sz){return /^(Elite )?(Hungry Rat|Angry Rat|Rat King)$/.test(e.name)&&paintSprite('rat',sz,e.lunge>0,e.ph,e.dead||e.stun>0||e.root>0);}
function setFont(sz){cx.font=Math.round(sz)+"px "+EMOJI_FONT}
function render(){
 if(!cx)return;const rl=realmOf(S.stage),hz=H*.44;
 cx.clearRect(0,0,W,H);
 drawBg(rl,hz);
 // sprites sorted by y
 const items=[];
 for(const e of R.en)items.push({y:e.y,e,t:0});
 for(const h of R.team)items.push({y:h.y,h,t:1});
 items.sort((a,b)=>a.y-b.y);
 const hs=clamp(H*.13,26,40);
 for(const it of items){if(it.e)drawEnemy(it.e);else drawHero(it.h,hs)}
 drawPets();drawDrops();
 // projectiles
 for(const p of R.proj){if(p.delay>0)continue;
  if(p.t==="meteor"){setFont(34);cx.fillText("☄️",p.cx,p.cy)}
  else if(p.t==="spit"){cx.fillStyle="#7dff4a";cx.beginPath();cx.arc(p.x,p.y,4,0,6.28);cx.fill()}
  else if(p.arrow){cx.save();cx.translate(p.x,p.y);cx.rotate(p.ang||0);cx.fillStyle="#fff";cx.fillRect(-8,-1,12,2);cx.fillStyle="#19e6ff";cx.fillRect(4,-2,3,4);cx.restore()}
  else{cx.fillStyle=p.col;cx.shadowColor=p.col;cx.shadowBlur=8;cx.beginPath();cx.arc(p.x,p.y,4,0,6.28);cx.fill();cx.shadowBlur=0}}
 // lightning
 cx.lineWidth=3;for(const b of R.bolts){cx.strokeStyle=b.c;cx.shadowColor=b.c;cx.shadowBlur=10;cx.globalAlpha=1-b.t/.25;cx.beginPath();b.pts.forEach((q,i)=>i?cx.lineTo(q[0],q[1]):cx.moveTo(q[0],q[1]));cx.stroke()}
 cx.shadowBlur=0;cx.globalAlpha=1;
 // particles
 for(const p of R.part){const a=1-p.t/p.l;cx.globalAlpha=a;if(p.ring){cx.strokeStyle=p.c;cx.lineWidth=3;cx.beginPath();cx.arc(p.x,p.y,p.s*(p.t/p.l),0,6.28);cx.stroke()}else{cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.s,p.s)}}
 cx.globalAlpha=1;
 drawWeather();
 // floating nums
 cx.textAlign="center";for(const f of R.fl){cx.globalAlpha=1-f.t/.9;cx.font="bold "+f.sz+"px Nunito,sans-serif";cx.lineWidth=3;cx.strokeStyle="rgba(0,0,0,.7)";cx.strokeText(f.txt,f.x,f.y);cx.fillStyle=f.col;cx.fillText(f.txt,f.x,f.y)}
 cx.globalAlpha=1;
 // bubbles
 for(const h of R.team)if(h.bubT>0&&h.bub)drawBubble(h.x,h.y-hs*.9,h.bub,h.bubT);
 for(const e of R.en)if(!e.dead&&e.bubT>0&&e.bub)drawBubble(e.x,e.y-e.sz*30,e.bub,e.bubT);
 if(R.flash>0){cx.fillStyle="rgba(255,255,255,"+Math.min(.5,R.flash*2)+")";cx.fillRect(0,0,W,H)}
 if(R.buff.cry>0){cx.strokeStyle="rgba(255,47,208,.5)";cx.lineWidth=4;cx.strokeRect(2,2,W-4,H-4)}
 if(R.buff.gold>0){cx.strokeStyle="rgba(255,211,74,.55)";cx.lineWidth=4;cx.strokeRect(6,6,W-12,H-12)}
}
function drawHero(h,sz){const ev=(S.heroes[h.k]&&S.heroes[h.k].evo)||0;sz*=1+.07*ev;
 const bob=R.trans>0||h.st==="idle"?Math.sin(R.time*(R.trans>0?14:8)+h.ph)*2:0;
 cx.fillStyle="rgba(0,0,0,.35)";cx.beginPath();cx.ellipse(h.x,h.y+sz*.45,sz*.45,sz*.14,0,0,6.28);cx.fill();
 cx.save();cx.translate(h.x,h.y+bob);
 if(h.down){cx.globalAlpha=.55;cx.rotate(1.3)}
 if(!!h.c.flip!==!!S.flip[h.k])cx.scale(-1,1);
 setFont(sz*(1+h.lunge*.25));cx.textAlign="center";cx.textBaseline="middle";
 if(h.flash>0){cx.shadowColor="#ff5a6e";cx.shadowBlur=14}
 if(!drawArtHero(h,sz))cx.fillText(h.down?"💤":h.c.e,0,0);cx.shadowBlur=0;cx.restore();cx.textBaseline="alphabetic";
 if(ev&&!h.down){cx.font=Math.round(sz*.3)+"px sans-serif";cx.textAlign="center";cx.fillStyle="#ffd23a";cx.fillText("★".repeat(ev),h.x,h.y+sz*.75)}
 if(!h.down){const bw=sz*.9,x=h.x-bw/2,y=h.y-sz*.65;cx.fillStyle="rgba(0,0,0,.6)";cx.fillRect(x,y,bw,4);cx.fillStyle=h.hp/h.mhp<.3?"#ff5a6e":"#3dffa0";cx.fillRect(x,y,bw*h.hp/h.mhp,4);
  if(h.shield>0){cx.strokeStyle="#ffe9a0";cx.lineWidth=2;cx.beginPath();cx.arc(h.x,h.y,sz*.6,0,6.28);cx.stroke()}}
}
function drawEnemy(e){
 const sz=26*e.sz*U*clamp(H/300,.9,1.2);
 let a=e.dead?Math.max(0,e.dieT/.35):1;
 const bob=Math.sin(R.time*7+e.ph)*2;
 cx.fillStyle="rgba(0,0,0,.35)";cx.beginPath();cx.ellipse(e.x,e.y+sz*.45,sz*.45,sz*.13,0,0,6.28);cx.fill();
 cx.save();cx.globalAlpha=a;cx.translate(e.x-e.lunge*8,e.y+bob);
 if(e.dead)cx.rotate((1-a)*1.5);
 if(e.flash>0){cx.shadowColor="#fff";cx.shadowBlur=14}
 setFont(sz);cx.textAlign="center";cx.textBaseline="middle";
 if(e.burn>0){cx.shadowColor="#ff7a2f";cx.shadowBlur=12}
 if(e.slow>0||e.root>0){cx.shadowColor="#7fe6ff";cx.shadowBlur=10}
 if(!drawArtEnemy(e,sz))cx.fillText(e.e,0,0);cx.restore();cx.textBaseline="alphabetic";
 if(e.stun>0){setFont(14);cx.fillText("💫",e.x,e.y-sz*.7)}
 if(!e.dead&&(e.hp<e.mhp)){const bw=sz*.9,x=e.x-bw/2,y=e.y-sz*.62;cx.fillStyle="rgba(0,0,0,.6)";cx.fillRect(x,y,bw,4);cx.fillStyle="#ff2fd0";cx.fillRect(x,y,bw*Math.max(0,e.hp/e.mhp),4)}
}
function drawPets(){
 let i=0;for(const id of S.petAct){const p=PETS.find(x=>x.id===id);if(!p)continue;setFont(16);cx.textAlign="center";
  const x=W*.05+i*20*U,y=H*.47+Math.sin(R.time*6+i)*3;cx.fillText(p.e,x,y);i++}
}
function drawBubble(x,y,txt,t){
 cx.font="bold 10px Nunito,sans-serif";const maxw=130,words=txt.split(" "),lines=[];let cur="";
 for(const w of words){const test=cur?cur+" "+w:w;if(cx.measureText(test).width>maxw&&cur){lines.push(cur);cur=w}else cur=test}lines.push(cur);
 let bw=0;for(const l of lines)bw=Math.max(bw,cx.measureText(l).width);bw+=12;const bh=lines.length*12+8;
 let bx=clamp(x-bw/2,2,W-bw-2),by=Math.max(2,y-bh-6);
 cx.globalAlpha=Math.min(1,t*3);cx.fillStyle="rgba(255,255,255,.95)";cx.beginPath();if(cx.roundRect)cx.roundRect(bx,by,bw,bh,6);else cx.rect(bx,by,bw,bh);cx.fill();
 cx.fillStyle="#1a1530";cx.textAlign="center";lines.forEach((l,i)=>cx.fillText(l,bx+bw/2,by+13+i*12));cx.globalAlpha=1;
}
function drawWeather(){
 const f=WX().fx;cx.globalAlpha=1;
 if(f==="eclipse"){cx.fillStyle="rgba(10,0,30,.45)";cx.fillRect(0,0,W,H);cx.fillStyle="rgba(120,60,200,.25)";cx.beginPath();cx.arc(W*.7,H*.15,28,0,6.28);cx.fill()}
 else if(f==="fog"){const g=cx.createLinearGradient(0,H*.3,0,H);g.addColorStop(0,"rgba(200,210,230,0)");g.addColorStop(1,"rgba(200,210,230,.4)");cx.fillStyle=g;cx.fillRect(0,0,W,H)}
 else if(f==="smog"){cx.fillStyle="rgba(120,140,40,.22)";cx.fillRect(0,0,W,H)}
 else if(f==="heat"){cx.fillStyle="rgba(255,110,30,"+(.1+.04*Math.sin(R.time*2))+")";cx.fillRect(0,0,W,H)}
 else if(f==="sand"){cx.fillStyle="rgba(210,170,100,.2)";cx.fillRect(0,0,W,H)}
 else if(f==="blizzard"){cx.fillStyle="rgba(220,240,255,.18)";cx.fillRect(0,0,W,H)}
 else if(f==="thunder"||f==="rain"){cx.fillStyle="rgba(20,30,60,.18)";cx.fillRect(0,0,W,H)}
 else if(f==="ash"){cx.fillStyle="rgba(40,30,30,.18)";cx.fillRect(0,0,W,H)}
 for(const p of R.wxp){
  if(f==="rain"||f==="thunder"){cx.strokeStyle=p.c;cx.lineWidth=1;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x+p.vx*.03,p.y+p.vy*.03);cx.stroke()}
  else if(f==="wind"){cx.strokeStyle=p.c;cx.lineWidth=1;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x+p.s,p.y);cx.stroke()}
  else if(f==="confetti"){cx.fillStyle=p.c;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillRect(-p.s/2,-1.5,p.s,3);cx.restore()}
  else{cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.s,p.s)}
 }
}

/* ---------- themed backgrounds ---------- */
const hh=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
function pal(rl){
 if(rl._p)return rl._p;const t=(h,k,m)=>{const c=hex2rgb(h);return"rgb("+c.map((v,i)=>Math.round(v*(1-k)+m[i]*k)).join(",")+")"};
 rl._p={far:t(rl.bg[0],.25,[255,255,255]),mid:t(rl.bg[1],.15,[0,0,0]),near:t(rl.bg[1],.5,[0,0,0]),gnd0:t(rl.bg[1],.35,[0,0,0]),gnd1:t(rl.bg[1],.75,[0,0,0])};return rl._p;
}
function silhouette(type,hz,scroll,col,hMul,per,alpha,seed){
 cx.fillStyle=col;cx.globalAlpha=alpha;
 const n=Math.ceil(W/per)+3,off=((scroll%per)+per)%per,i0=Math.floor(scroll/per);
 for(let k=-1;k<n;k++){
  const idx=i0+k+seed,x=k*per-off,r=hh(idx),r2=hh(idx+99);
  const ht=(0.4+r*0.9)*hMul;
  switch(type){
   case"mount":cx.beginPath();cx.moveTo(x-per*.1,hz);cx.lineTo(x+per*.5,hz-ht);cx.lineTo(x+per*1.1,hz);cx.fill();break;
   case"stalac":cx.beginPath();cx.moveTo(x,0);cx.lineTo(x+per*.5,ht*.9);cx.lineTo(x+per,0);cx.fill();cx.beginPath();cx.moveTo(x+per*.2,hz);cx.lineTo(x+per*.55,hz-ht*.5);cx.lineTo(x+per*.9,hz);cx.fill();break;
   case"trees":cx.beginPath();cx.moveTo(x,hz);cx.lineTo(x+per*.5,hz-ht);cx.lineTo(x+per,hz);cx.fill();cx.fillRect(x+per*.45,hz-2,per*.1,4);break;
   case"deadtrees":cx.fillRect(x+per*.45,hz-ht,per*.1,ht);cx.beginPath();cx.moveTo(x+per*.5,hz-ht*.7);cx.lineTo(x+per*.9,hz-ht*.95);cx.lineTo(x+per*.55,hz-ht*.55);cx.fill();cx.beginPath();cx.moveTo(x+per*.5,hz-ht*.5);cx.lineTo(x+per*.1,hz-ht*.8);cx.lineTo(x+per*.45,hz-ht*.4);cx.fill();break;
   case"dunes":cx.beginPath();cx.moveTo(x,hz);cx.quadraticCurveTo(x+per*.5,hz-ht*1.1,x+per,hz);cx.fill();break;
   case"bldg":{const w=per*(.6+r2*.35);cx.fillRect(x,hz-ht*1.2,w,ht*1.2);if(alpha>.5){cx.fillStyle="rgba(255,230,140,.35)";for(let wy=hz-ht*1.2+6;wy<hz-6;wy+=10)for(let wx=x+4;wx<x+w-6;wx+=9)if(hh(idx*13+wy+wx)>.55)cx.fillRect(wx,wy,4,5);cx.fillStyle=col}break}
   case"waves":cx.beginPath();cx.moveTo(x,hz+4);cx.quadraticCurveTo(x+per*.25,hz-ht*.35,x+per*.5,hz+4);cx.quadraticCurveTo(x+per*.75,hz+ht*.1,x+per,hz+4);cx.fill();break;
   case"clouds":cx.beginPath();cx.ellipse(x+per*.4,hz-ht*.2,per*.55,ht*.28,0,0,6.28);cx.ellipse(x+per*.7,hz-ht*.1,per*.4,ht*.22,0,0,6.28);cx.fill();break;
   case"planets":if(r>.55){cx.beginPath();cx.arc(x+per*.5,hz-ht*.9,ht*.35,0,6.28);cx.fill()}break;
   case"candy":cx.beginPath();cx.arc(x+per*.5,hz,per*.5*(.5+r*.5),Math.PI,0);cx.fill();break;
   case"houses":{const w=per*.6;cx.fillRect(x,hz-ht*.6,w,ht*.6);cx.beginPath();cx.moveTo(x-4,hz-ht*.6);cx.lineTo(x+w/2,hz-ht);cx.lineTo(x+w+4,hz-ht*.6);cx.fill();break}
   case"gears":cx.beginPath();cx.arc(x+per*.5,hz-ht*.3,ht*.45,0,6.28);cx.fill();cx.fillRect(x+per*.7,hz-ht*1.3,per*.12,ht*1.3);break;
   case"crystals":cx.beginPath();cx.moveTo(x+per*.5,hz-ht*1.1);cx.lineTo(x+per*.8,hz-ht*.3);cx.lineTo(x+per*.5,hz);cx.lineTo(x+per*.2,hz-ht*.3);cx.fill();break;
   case"palms":cx.fillRect(x+per*.48,hz-ht,per*.05,ht);for(let a=-2;a<=2;a++){cx.beginPath();cx.moveTo(x+per*.5,hz-ht);cx.quadraticCurveTo(x+per*.5+a*per*.25,hz-ht-ht*.2,x+per*.5+a*per*.35,hz-ht+ht*.25);cx.lineTo(x+per*.5+a*per*.2,hz-ht+ht*.1);cx.fill()}break;
   case"spikes":cx.beginPath();cx.moveTo(x+per*.3,hz);cx.lineTo(x+per*.5,hz-ht*1.3);cx.lineTo(x+per*.7,hz);cx.fill();break;
   case"barns":{const w=per*.7;cx.fillRect(x,hz-ht*.5,w,ht*.5);cx.beginPath();cx.moveTo(x-3,hz-ht*.5);cx.lineTo(x+w/2,hz-ht*.85);cx.lineTo(x+w+3,hz-ht*.5);cx.fill();break}
   case"swirl":cx.beginPath();cx.arc(x+per*.5,hz,ht*.6,Math.PI,0);cx.arc(x+per*.5,hz-ht*.35,ht*.25,0,Math.PI,true);cx.fill();break;
   default:cx.beginPath();cx.moveTo(x,hz);cx.lineTo(x+per*.5,hz-ht);cx.lineTo(x+per,hz);cx.fill();
  }
 }
 cx.globalAlpha=1;
}
function drawBg(rl,hz){
 if(!S.camp&&areaIdx(S.stage)===0&&artWoods.complete&&artWoods.naturalWidth){
  const scale=Math.max(W/artWoods.naturalWidth,H/artWoods.naturalHeight);
  const iw=artWoods.naturalWidth*scale,ih=artWoods.naturalHeight*scale;
  cx.drawImage(artWoods,(W-iw)/2,(H-ih)/2,iw,ih);return;
 }
 const P=pal(rl),th=rl.th||"cave",sc=R.scroll;
 const g=cx.createLinearGradient(0,0,0,hz+30);g.addColorStop(0,rl.bg[0]);g.addColorStop(1,P.far);cx.fillStyle=g;cx.fillRect(0,0,W,H);
 // stars / sun / moon
 const night=["cave","space","haunted","dream","crystal","hell","factory","city"].includes(th);
 if(night||th==="ice"){cx.fillStyle="#fff";for(let i=0;i<40;i++){const x=((hh(i)*W*1.3-sc*.03*(1+hh(i+5)))%W+W)%W,y=hh(i+50)*hz*.9;cx.globalAlpha=.25+.5*hh(i+9)*(.6+.4*Math.sin(R.time*2+i));cx.fillRect(x,y,1.5,1.5)}cx.globalAlpha=1}
 if(!["cave","factory","office","hell"].includes(th)){const sx=W*.78-((sc*.01)%40),sy=hz*.32;cx.globalAlpha=.9;cx.fillStyle=night?"#e8e8ff":th==="volcano"?"#ff6a2a":"#fff6c0";cx.beginPath();cx.arc(sx,sy,H*.05,0,6.28);cx.fill();cx.globalAlpha=.15;cx.beginPath();cx.arc(sx,sy,H*.1,0,6.28);cx.fill();cx.globalAlpha=1}
 // silhouette layers
 silhouette(rl.sil||"mount",hz,sc*.15,P.far,H*.34,110,.55,rl.n.length);
 silhouette(rl.sil||"mount",hz,sc*.35,P.mid,H*.25,76,.9,rl.n.length+7);
 // decor
 cx.textAlign="center";cx.textBaseline="alphabetic";const dec=rl.decor;
 setFont(H*.13);cx.globalAlpha=.55;
 for(let i=0;i<5;i++){const span=W+140,x=((i*(span/5)-sc*.5)%span+span)%span-50;cx.fillText(dec[i%dec.length],x,hz+H*.05)}
 cx.globalAlpha=1;
 // ground
 const gg=cx.createLinearGradient(0,hz,0,H);gg.addColorStop(0,P.gnd0);gg.addColorStop(1,P.gnd1);cx.fillStyle=gg;cx.fillRect(0,hz,W,H-hz);
 cx.strokeStyle=rl.acc;cx.globalAlpha=.75;cx.lineWidth=2;cx.beginPath();cx.moveTo(0,hz);cx.lineTo(W,hz);cx.stroke();
 cx.globalAlpha=.16;cx.lineWidth=1;
 for(let i=0;i<14;i++){const xx=((i*70-sc)%(14*70)+14*70)%(14*70)-70;cx.beginPath();cx.moveTo(xx,hz);cx.lineTo(xx-(xx-W/2)*.7,H);cx.stroke()}
 for(let j=1;j<5;j++){const y=hz+(H-hz)*(j*j/25);cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke()}
 // ground props (fast layer)
 cx.globalAlpha=.8;setFont(H*.09);
 for(let i=0;i<7;i++){const span=W+120,x=((i*(span/7)+hh(i+rl.n.length)*30-sc*1.0)%span+span)%span-40,y=hz+(H-hz)*(.15+hh(i+33)*.8);cx.fillText(dec[(i+2)%dec.length],x,y)}
 cx.globalAlpha=1;
}

function knightSVG(p){return`<svg viewBox="0 0 120 150" class="ksvg" xmlns="http://www.w3.org/2000/svg"><defs>
<linearGradient id="${p}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9ff8ff"/><stop offset="1" stop-color="#1b86c0"/></linearGradient>
<linearGradient id="${p}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7ae6"/><stop offset="1" stop-color="#a20f88"/></linearGradient></defs>
<path d="M36 54 Q16 104 28 142 L92 142 Q104 104 84 54Z" fill="url(#${p}m)" opacity=".85"/>
<rect x="42" y="100" width="15" height="40" rx="6" fill="#262a5a"/><rect x="63" y="100" width="15" height="40" rx="6" fill="#262a5a"/>
<rect x="37" y="132" width="22" height="13" rx="6" fill="url(#${p}m)"/><rect x="61" y="132" width="22" height="13" rx="6" fill="url(#${p}m)"/>
<rect x="35" y="56" width="50" height="52" rx="15" fill="url(#${p}a)" stroke="#0a3a5c" stroke-width="3"/>
<rect x="46" y="80" width="28" height="7" rx="3" fill="#ff2fd0"/><circle cx="60" cy="83" r="5" fill="#ffd447" stroke="#7a5a00" stroke-width="1.5"/>
<circle cx="60" cy="38" r="25" fill="url(#${p}a)" stroke="#0a3a5c" stroke-width="3"/>
<rect x="40" y="31" width="40" height="11" rx="5" fill="#0b0a1f"/><rect x="45" y="34" width="9" height="4" rx="2" fill="#19e6ff"/><rect x="66" y="34" width="9" height="4" rx="2" fill="#19e6ff"/>
<path d="M58 14 Q76 -6 98 6 Q82 14 66 24Z" fill="url(#${p}m)" stroke="#6a0a58" stroke-width="2"/>
<g class="shield"><path d="M10 64 L40 60 L40 98 Q26 116 10 98Z" fill="url(#${p}m)" stroke="#5a0a48" stroke-width="3"/><path d="M25 70 L25 100 M14 82 L36 82" stroke="#fff3a8" stroke-width="4" stroke-linecap="round"/></g>
<g class="sword"><rect x="88" y="14" width="9" height="70" rx="3" fill="#effcff" stroke="#6bb8d8" stroke-width="2"/><rect x="77" y="82" width="31" height="8" rx="4" fill="#ffd447" stroke="#7a5a00" stroke-width="2"/><rect x="88" y="90" width="9" height="16" rx="3" fill="#7a3b10"/></g></svg>`}


let tab="heroes";
const TABS=[["heroes","🦸","Heroes"],["gear","🎒","Gear"],["shop","🛒","Shop"],["orders","✨","Charms"],["pets","🐾","Pets"],["map","🗺️","Map"],["more","☰","More"]];
const ACT={};
function modal(html,pause){$("#mbody").innerHTML=html;$("#modal").classList.remove("hidden");R.modalPause=!!pause}
function closeModal(){$("#modal").classList.add("hidden");R.modalPause=false;if(R.inGame)renderTab()}
function confirmModal(txt,act,data,yes){modal(`<div class="mtitle">Are you sure?</div><p class="mp">${txt}</p><div class="mbtns"><button class="btn ghost" data-act="close">Nope</button><button class="btn mg" data-act="${act}" ${data||""}>${yes||"Yes"}</button></div>`)}
function storyModal(title,text,btn){
 const welcome=!S.seenIntro;S.seenIntro=true;
 modal(`${welcome?`<div class="welcome"><b>Welcome to GRIMM DESCENT.</b><p>You lead a band of survivors from a dozen cruel fairy tales. They march ever onward, smack monsters, and complain about the narrator. Upgrade them, gear them, and never eat anything from a stranger.</p></div>`:""}<div class="realmintro"><div class="mtitle">${title}</div><p class="mp">${text}</p></div><div class="mbtns"><button class="btn" data-act="close">${btn||"OK"}</button></div>`,true);
 AU.play("boss");
}
const qtyVal=()=>S.buyQty;
function buyN(u,l){const cap=u.max===undefined?Infinity:u.max-l,q=S.buyQty;let n;if(q==="max")n=Math.max(1,maxAfford(u.b,u.g,l,S.gold));else n=+q;return Math.max(1,Math.min(n,cap))}
const buyBtn=(act,id,cost,extra,label)=>`<button class="buy ${S.gold>=cost?"can":""}" data-act="${act}" data-id="${id}" data-cost="${cost}" ${extra||""}><span>${label||"BUY"}</span>🪙 ${fmt(cost)}</button>`;

/* ---------- hud ---------- */
function updHud(){
 $("#gold").textContent=fmt(S.gold);$("#dps").textContent=fmt(teamDps())+" dmg/s";
 $("#soHud").textContent=S.soTotal?"📈 "+S.soTotal:"";
}
function renderSkillbar(){
 $("#skillbar").innerHTML=SKS.map(s=>{const l=SKL(s.id),lock=S.max<s.u||l<1;return`<button class="sk ${lock?"locked":""}" data-act="skill" data-id="${s.id}"><i>${s.i}</i><div class="cdo"></div><em>${l?"Lv"+l:"🔒"}</em></button>`}).join("");
}
function updSkillCd(){
 SKS.forEach(s=>{const b=$('.sk[data-id="'+s.id+'"]');if(!b)return;const cd=R.cd[s.id]||0,o=b.querySelector(".cdo"),l=SKL(s.id);
  o.style.height=cd>0?Math.min(100,cd/s.cd*100)+"%":"0";o.textContent=cd>0?Math.ceil(cd):"";
  const act=(s.id==="cry"&&R.buff.cry>0)||(s.id==="cash"&&R.buff.gold>0);
  b.classList.toggle("ready",l>0&&cd<=0);b.classList.toggle("active",act);b.classList.toggle("locked",l<1)})
}
ACT.skill=d=>{const sk=SKS.find(s=>s.id===d.id);if(SKL(d.id)<1){if(S.max<sk.u){toast("Unlocks at stage "+(sk.u+1),"bad")}else openSkill(d.id);return}
 if(!useSkill(d.id))AU.play("err")};
function openSkill(id){
 const sk=SKS.find(s=>s.id===id),l=SKL(id),c=skCost(sk,l);
 modal(`<div class="mtitle">${sk.i} ${sk.n}</div><p class="mp">${sk.d(Math.max(1,l))}</p><p class="mp">Cooldown ${sk.cd}s${sk.dur?" · lasts "+sk.dur+"s":""}</p><div class="mbtns"><button class="btn ghost" data-act="close">Close</button>${S.max>=sk.u?`<button class="btn ${S.gold>=c?"gold":""}" data-act="skUp" data-id="${id}">${l?"Upgrade":"Learn"} 🪙 ${fmt(c)}</button>`:""}</div>`)
}
ACT.skUp=d=>{const sk=SKS.find(s=>s.id===d.id),l=SKL(d.id),c=skCost(sk,l);if(S.gold<c||S.max<sk.u){AU.play("err");return}S.gold-=c;S.sk[d.id]=l+1;recalc();AU.play("level");renderSkillbar();renderTab()};

/* ---------- affordability dots ---------- */
function updAfford(){
 $$("[data-cost]").forEach(b=>b.classList.toggle("can",S.gold>=+b.dataset.cost));
 const set=(id,v)=>{const d=$("#dot-"+id);if(d)d.classList.toggle("hidden",!v||tab===id)};
 set("orders",UPS.some(u=>(u.max===undefined||L(u.id)<u.max)&&S.gold>=u.b*Math.pow(u.g,L(u.id))));
 const can=S.dep.some(k=>S.gold>=lvCost(k))||S.picks>0||SLOT_ORDER.some(id=>canUnlockSlot(id)&&S.gold>=slotHeroCost(id));
 set("heroes",can);
 set("gear",S.bag.some(b=>S.dep.some(k=>iscore(b)>iscore(S.heroes[k].gear[b.slot]))));
 set("shop",S.chestBag.length>0);set("pets",S.gold>=eggCost()&&S.stats.maxEver>=2);
 set("more",canRestructure()&&soGain()>=5);
}
function renderTabs(){$("#tabs").innerHTML=TABS.map(t=>`<button class="tabbtn ${tab===t[0]?"on":""}" data-act="tab" data-t="${t[0]}"><i>${t[1]}</i><span>${t[2]}</span><u class="dot hidden" id="dot-${t[0]}"></u></button>`).join("")}
function renderTab(){const p=$("#panel"),st=p.scrollTop;const fn={orders:renderOrders,shop:renderShop,heroes:renderHeroes,gear:renderGear,pets:renderPets,map:renderMap,more:renderMore}[tab];p.innerHTML=fn();p.scrollTop=st;updAfford()}
function refreshTab(name){if(!R.inGame)return;if(!name||name===tab)renderTab()}
ACT.tab=d=>{tab=d.t;AU.play("ui");renderTabs();$("#panel").scrollTop=0;renderTab()};
ACT.close=()=>{AU.play("ui");closeModal()};
ACT.autoTog=()=>{AU.play("ui");toggleAuto()};
ACT.prevStage=()=>{AU.play("ui");if(!prevStage())AU.play("err")};
ACT.nextStage=()=>{AU.play("ui");if(!nextStage())AU.play("err")};
ACT.speed=()=>{AU.play("ui");cycleSpeed()};
ACT.qty=d=>{S.buyQty=d.q==="max"?"max":+d.q;AU.play("ui");renderTab()};

/* ---------- Orders tab ---------- */
function qtyBar(){return`<div class="qty">${[1,10,"max"].map(q=>`<button class="${S.buyQty===q?"on":""}" data-act="qty" data-q="${q}">${q==="max"?"MAX":"×"+q}</button>`).join("")}</div>`}
function renderOrders(){
 let h=mgrBar()+`<div class="hdr"><div class="sec" style="margin:0">Spells</div></div><div class="ggrid">`;
 h+=SKS.map(s=>{const l=SKL(s.id),lock=S.max<s.u,c=skCost(s,l);
  return`<div class="gcard ${lock?"lk":""}" data-act="skInfo" data-id="${s.id}"><i>${lock?"🔒":s.i}</i><b>${s.n}</b><em>${lock?"Stage "+(s.u+1):(l?"Lv "+l:"New")}</em>${lock?"":`<button class="gbuy ${S.gold>=c?"can":""}" data-act="skUp" data-id="${s.id}" data-cost="${c}">${l?"⬆":"LEARN"} 🪙${fmt(c)}</button>`}</div>`}).join("")+`</div>`;
 h+=`<div class="hdr"><div class="sec" style="margin:8px 0 0">Charms & Boons</div>${qtyBar()}</div><div class="ggrid">`;
 h+=UPS.map(u=>{const l=L(u.id),maxed=u.max!==undefined&&l>=u.max,n=maxed?0:buyN(u,l),c=maxed?0:bulkCost(u.b,u.g,l,n);
  return`<div class="gcard" data-act="upInfo" data-id="${u.id}"><i>${u.i}</i><b>${u.n}</b><em>Lv ${l}</em>${maxed?'<div class="gmax">MAX</div>':`<button class="gbuy ${S.gold>=c?"can":""}" data-act="up" data-id="${u.id}" data-cost="${c}">${n>1?"×"+n+" ":"⬆ "}🪙${fmt(c)}</button>`}</div>`}).join("")+`</div>`;
 return h+`<div class="hint">Tap a card for details. Tap the gold button to buy.</div>`;
}
ACT.upInfo=d=>{const u=UPS.find(x=>x.id===d.id),l=L(u.id);AU.play("ui");modal(`<div class="hdet"><div class="big">${u.i}</div><div class="mtitle">${u.n}</div><div class="msub">Level ${l}${u.max!==undefined?" / "+u.max:""}</div><p class="mp">${u.d(l)}${l<(u.max===undefined?1e9:u.max)?"<br>Next: "+u.d(l+1):""}</p></div><div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};
ACT.skInfo=d=>{const s=SKS.find(x=>x.id===d.id),l=SKL(s.id);AU.play("ui");modal(`<div class="hdet"><div class="big">${s.i}</div><div class="mtitle">${s.n}</div><div class="msub">${l?"Level "+l:"Not learned"} · Cooldown ${s.cd}s${s.dur?" · lasts "+s.dur+"s":""}</div><p class="mp">${s.d(Math.max(1,l))}${l?"<br>Next: "+s.d(l+1):""}</p></div><div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};
ACT.up=d=>{const u=UPS.find(x=>x.id===d.id),l=L(u.id);if(u.max!==undefined&&l>=u.max)return;const n=buyN(u,l),c=bulkCost(u.b,u.g,l,n);if(S.gold<c){AU.play("err");return}S.gold-=c;S.up[u.id]=l+n;recalc();AU.play("level");renderTab()};

/* ---------- Heroes tab (formation) ---------- */
const fpct=v=>"+"+Math.round(v*1000)/10+"%";
function synChips(k){const z=C.syn&&C.syn[k];if(!z)return"";const o=[];for(const a in z)if(z[a]>0)o.push(`<i>${fpct(z[a])} ${STATN[a]}</i>`);return o.length?`<div class="chips">${o.join("")}</div>`:""}
function mileList(k){const h=S.heroes[k],M=Math.floor(h.lvl/10),rows=[];const from=Math.max(1,M-2);
 for(let m=from;m<=M+6;m++){const mi=mileInfo(k,m),got=m<=M;rows.push(`<div class="ms ${got?"got":""}"><i>${got?mi.i:"🔒"}</i><div><b>Lv ${mi.lvl} · ${mi.name}</b><small>${mi.desc}</small></div></div>`)}
 return`<div class="sec">🏅 Milestones <small>(${M} unlocked · no level cap)</small></div><div class="mslist">${rows.join("")}</div>`}
function nextMile(k){const h=S.heroes[k],n=(Math.floor(h.lvl/5)+1)*5,e=EVO_REQ.find(r=>r>h.lvl);const evo=e&&e<=n;if(evo)return`★ Lv ${e}: EVOLVE → ${EVO_N[(h.evo||0)+1]} (×2 dmg, ×1.6 HP)`;if(n%10===0){const mi=mileInfo(k,n/10);return`${mi.i} Lv ${n}: ${mi.name} — ${mi.desc.split(". ")[0]}`}return`✨ Lv ${n}: special upgrades`}
function evoRow(k){const h=S.heroes[k],e=h.evo||0;return`<div class="evo ${e>=3?"max":""}">${e>=3?"★★★ "+EVO_N[3]+" — fully evolved · ":(e?"★".repeat(e)+" "+EVO_N[e]+" · ":"")}Next: ${nextMile(k)}</div>`}
function mgrBar(){return S.max>=10?`<button class="evt mgr ${S.autoMgr?"on":""}" data-act="mgr">🧚 Auto-Fairy: ${S.autoMgr?"ON — buying the cheapest hero/charms for you":"OFF — tap to let the Auto-Fairy spend your gold"}</button>`:`<div class="hint">🧚 The Auto-Fairy arrives at stage 11.</div>`}
ACT.mgr=()=>{S.autoMgr=!S.autoMgr;AU.play("ui");renderTab()};
function campBar(){return`<div class="sec">Campaign ${S.camp+1}/${CAMPS.length}</div><div class="camps">${CAMPS.map((c,i)=>{const u=campUnlocked(i);return`<button class="camp ${i===S.camp?"on":""} ${u?"":"lk"}" data-act="camp" data-c="${i}"><i>${u?c.i:"🔒"}</i><b>${u?c.n:"Campaign "+(i+1)}</b><small>${u?campCast(i).map(k=>CLS[k].e).join(" ")+" · best "+Math.max(S.campBest[i]||0,i===S.camp?S.max:0)+"/"+STAGE_CAP:"Clear stage 100 of campaign "+i}</small></button>`}).join("")}</div><div class="hint" style="margin-top:0">${CAMPS[S.camp].d} Each campaign has its own story, progress, levels, Wishes and prestige. Its crew can be used in any campaign once unlocked. Realistic ceiling: stage ~1200.</div>`}
ACT.camp=d=>{const c=+d.c;if(c===S.camp)return;if(!campUnlocked(c)){AU.play("err");toast("Clear stage 100 of the previous campaign first.","bad");return}confirmModal("Switch to "+CAMPS[c].n+"? Your current campaign is saved exactly as it is.","campDo",`data-c="${c}"`,"Switch")};
ACT.campDo=d=>{closeModal();if(switchCamp(+d.c)){AU.play("win");renderTab()}};
function potBar(){return Object.keys(POTS).map(t=>{const p=POTS[t],on=S.pb[t]>0;return`<button class="chip potc ${on?"on":""} ${S.pot[t]>0?"has":""}" data-act="drink" data-t="${t}" style="--pc:${p.c}">${p.i}×${S.pot[t]} <small data-pt="${t}">${on?fmtTime(S.pb[t]):""}</small></button>`}).join("")}
function heroRow(k){
 const h=S.heroes[k],c=CLS[k],cost=lvCost(k),can=S.gold>=cost;
 return`<div class="hcell"><div class="port ${h.evo?"evo"+h.evo:""}" data-act="hero" data-k="${k}"><span class="pe">${c.e}</span>${h.evo?`<u>${"★".repeat(h.evo)}</u>`:""}<em>Lv ${h.lvl}</em></div><b class="pn">${shortN(c.hero)}</b><button class="gbuy ${can?"can":""}" data-act="hlv" data-k="${k}" data-cost="${cost}">⬆ 🪙${fmt(cost)}</button></div>`}
function lockedSlot(sd){
 const k=campHero(sd.id),ok=S.max>=sd.u,cost=slotHeroCost(sd.id);
 return`<div class="hcell lockedslot"><div class="port"><span class="pe">${ok?CLS[k].e:"🔒"}</span><em>${sd.i}</em></div><b class="pn">${ok?shortN(CLS[k].hero):"Stage "+(sd.u+1)}</b>${ok?`<button class="gbuy ${S.gold>=cost?"can":""}" data-act="unlockSlot" data-id="${sd.id}" data-cost="${cost}">UNLOCK 🪙${fmt(cost)}</button>`:`<small class="pn">${sd.n}</small>`}</div>`}
function pickBanner(){
 pickTick();
 if(S.picks>0)return`<button class="evt" data-act="pickOpen">🎟️ <b>Recruitment Event!</b> Pick 1 of ${S.pickList?S.pickList.length:3} heroes <u>×${S.picks}</u></button>`;
 return""}
function synPanel(){const n=C.links?C.links.length:0;return`<span class="chip">🔗 ${n} link${n===1?"":"s"}</span>`}
function renderHeroes(){
 const left=Math.max(0,(S.pickAt-Date.now())/1000),hz=HZ();
 let h=`<div class="chiprow"><span class="chip">🦸 ${S.dep.length}/${SLOT_DEFS.length}</span>${synPanel()}<span class="chip">🎟️ ${fmtTime(left)}</span>${hz?`<button class="chip haz" data-act="hazInfo">${hz.i} ${hz.n}${hzMit()<1?" ✅":""}</button>`:""}${S.max>=10?`<button class="chip ${S.autoMgr?"on":""}" data-act="mgr">🧚 Auto ${S.autoMgr?"ON":"OFF"}</button>`:""}${potBar()}</div>`;
 h+=pickBanner();
 h+=`<div class="hgrid">`;
 for(const id of SLOT_ORDER){const sd=SLOT_BY_ID[id];h+=S.seat[id]?heroRow(S.seat[id]):lockedSlot(sd)}
 h+=`</div><div class="hint">Tap a portrait for details, gear and swapping. Tap ⬆ to level up.</div>`;
 return h;
}
ACT.hazInfo=()=>{const hz=HZ();if(!hz)return;AU.play("ui");modal(`<div class="hdet"><div class="big">${hz.i}</div><div class="mtitle">${hz.n}</div><p class="mp">${hz.d}</p><p class="mp">${hzMit()<1?"✅ Halved by your "+TAGN[hz.c]+" ally.":"Bring a "+TAGN[hz.c]+" ally to halve it."}</p></div><div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};
ACT.hlv=d=>{if(heroLvlUp(d.k)){AU.play("level");renderTab()}else AU.play("err")};
ACT.drink=d=>{if(usePotion(d.t)){AU.play("heal");toast(POTS[d.t].i+" "+POTS[d.t].n+" active for "+POT_DUR/60+" min!","good");renderTab()}else{AU.play("err");toast("No "+POTS[d.t].n+". Find them in chests or buy in the Shop.","bad")}};
ACT.unlockSlot=d=>{const k=SLOT_BY_ID[d.id].list[0];if(unlockSlot(d.id)){AU.play("win");toast("🦸 "+CLS[S.seat[d.id]].hero+" took the "+SLOT_BY_ID[d.id].n+" seat! They have concerns.","good");renderTab();checkAch()}else AU.play("err")};
function heroCardMini(k,extra){const c=CLS[k],y=synText(k),sd=SLOT_BY_ID[c.slot];
 return`<div class="pcard"><div class="av">${c.e}</div><div class="mi"><b>${c.hero}</b><small>${c.n} · ${sd.i} ${sd.n} · ${SYN[k].tags.map(t=>TAGN[t]).join(" ")}</small><small>✨ ${c.sp.n}: ${c.sp.d.replace("POW","×"+c.sp.pow)}</small><small>🔗 ${y.aura}</small><small>🤝 ${y.combo}</small><small class="bs">📜 ${(STORY[k]||"").replace(/\{n\}/g,c.hero)}</small></div>${extra||""}</div>`}
ACT.swapOpen=d=>{const sd=SLOT_BY_ID[d.id];AU.play("ui");
 modal(`<div class="mtitle">${sd.i} ${sd.n} seat</div><div class="msub">${sd.d} Choose who sits here. Levels are kept per hero.</div><div class="plist">`+sd.list.map(k=>{
  if(!S.own[k])return`<div class="pcard lk"><div class="av">❓</div><div class="mi"><b>${CLS[k].hero}</b><small>${CLS[k].n} — win from a Recruitment Event</small></div></div>`;
  const cur=S.seat[sd.id]===k;return heroCardMini(k,cur?`<span class="tag">SEATED</span>`:`<button class="mini can" data-act="seatHero" data-id="${sd.id}" data-k="${k}">Seat</button>`)}).join("")+`</div><div class="mbtns"><button class="btn ghost" data-act="close">Close</button></div>`)};
ACT.seatHero=d=>{if(swapSeat(d.id,d.k)){AU.play("win");closeModal();renderTab()}else AU.play("err")};
ACT.pickOpen=()=>{pickTick();if(S.picks<1||!S.pickList||!S.pickList.length){AU.play("err");return}AU.play("win");
 modal(`<div class="mtitle">🎟️ Recruitment Event</div><div class="msub">The Guild found ${S.pickList.length} candidates. Pick one — they join their seat's roster forever.</div><div class="plist">`+S.pickList.map(k=>heroCardMini(k,`<button class="mini can" data-act="pickDo" data-k="${k}">Recruit</button>`)).join("")+`</div><div class="mbtns"><button class="btn ghost" data-act="close">Later</button></div>`)};
ACT.pickDo=d=>{if(pickHero(d.k)){AU.play("win");closeModal();toast("🦸 "+CLS[d.k].hero+" joined the "+SLOT_BY_ID[CLS[d.k].slot].n+" roster!","good");renderTab();checkAch()}else AU.play("err")};
ACT.hero=d=>{AU.play("ui");openHero(d.k)};
function openHero(k){
 const h=S.heroes[k],c=CLS[k],st=C.h[k],dep=S.dep.includes(k);
 const slots=SLOTS.map(s=>{const it=h.gear[s];return it?`<button class="item" style="--rc:${RAR[it.r].c}" data-act="item" data-id="${it.id}"><i>${it.e}</i>${it.lv?`<b>+${it.lv}</b>`:""}<small>${SLOT_N[s]}</small></button>`:`<button class="item empty" data-act="emptySlot" data-k="${k}" data-s="${s}"><i>${SLOT_I[s]}</i><small>${SLOT_N[s]}</small></button>`}).join("");
 const spTxt=h.sp>0?c.sp.d.replace("POW","×"+(c.sp.pow*Math.pow(1.1,h.sp-1)).toFixed(2)):c.sp.d.replace("POW","×"+c.sp.pow);
 modal(`<div class="hdet"><div class="big">${c.e}</div><div class="mtitle">${c.hero}</div><div class="msub">${c.n} · Lv ${h.lvl}${c.rng?" · Ranged":" · Melee"}${c.el!=="none"?" · "+ELEMS[c.el].i+ELEMS[c.el].n:""}</div><p class="mp">${c.bio}</p><div class="story"><b>📜 Backstory</b><br>${(STORY[k]||"").replace(/\{n\}/g,c.hero)}</div></div>
 <div class="statbox"><div class="srow"><span>Damage per hit</span><b>${fmt(st.hit)}</b></div><div class="srow"><span>Attack interval</span><b>${st.iv.toFixed(2)}s</b></div><div class="srow"><span>Health</span><b>${fmt(st.hp)}</b></div><div class="srow"><span>Crit chance</span><b>${(st.crit*100).toFixed(0)}%</b></div></div>
 <div class="slots6">${slots}</div>
 <div class="row"><div class="ico">${c.ic}</div><div class="info"><b>Level</b> <em>${h.lvl}</em><small>One button: +1 level. Attack lv ${h.at} · Special lv ${h.sp} grow automatically.</small></div>${buyBtn("hlv2",k,lvCost(k),`data-k="${k}"`,"UPGRADE")}</div>
 <div class="row"><div class="ico">⚔️</div><div class="info"><b>${c.atk}</b> <em>Lv ${h.at}</em><small>+6% basic attack damage per 2 levels</small></div></div>
 <div class="row"><div class="ico">✨</div><div class="info"><b>${c.sp.n}</b> <em>${h.sp?"Lv "+h.sp:"Learns at Lv 5"}</em><small>${spTxt} (cooldown ${c.sp.cd}s)</small></div></div>
 ${c.pass?`<div class="hint">Passive while in the squad: ${c.bio.split("Passive:")[1]||""}</div>`:""}
 <div class="mbtns"><button class="btn ghost" data-act="close">Close</button><button class="btn ghost" data-act="flipSpr" data-k="${k}">↔ Flip</button><button class="btn" data-act="swapOpen" data-id="${c.slot}">⇄ Swap seat</button></div>`);
}
ACT.hlv2=d=>{if(heroLvlUp(d.k)){AU.play("level");openHero(d.k)}else AU.play("err")};
ACT.flipSpr=d=>{S.flip[d.k]=!S.flip[d.k];AU.play("ui");openHero(d.k)};
ACT.emptySlot=d=>{const opts=S.bag.filter(b=>b.slot===d.s);if(!opts.length){toast("No "+SLOT_N[d.s]+" in your bag.","bad");return}
 opts.sort((a,b)=>iscore(b)-iscore(a));equipItem(d.k,opts[0].id);openHero(d.k)};

/* ---------- Gear tab & items ---------- */
function itemBtn(it){const r=RAR[it.r];return`<button class="item" style="--rc:${r.c}" data-act="item" data-id="${it.id}"><i>${it.e}</i>${it.lv?`<b>+${it.lv}</b>`:""}<small>${r.n}</small></button>`}
function renderGear(){
 let h=`<div class="hdr"><div class="sec" style="margin:0">Backpack ${S.bag.length}/30</div><button class="mini" data-act="sellJunk">Sell junk</button></div>`;
 h+=S.bag.length?`<div class="grid5">${S.bag.slice().sort((a,b)=>b.r-a.r||iscore(b)-iscore(a)).map(itemBtn).join("")}</div>`:`<div class="hint">Your bag is empty. Monsters carry loot. Don't ask where.</div>`;
 h+=`<div class="sec">Equipped</div>`;
 h+=S.dep.map(k=>{const hr=S.heroes[k];return`<div class="hcard"><div class="hrow2"><div class="av" data-act="hero" data-k="${k}">${CLS[k].e}</div><div class="mi"><b>${CLS[k].hero}</b><small>Tap a piece to enhance it instantly</small></div></div><div class="slots6">${SLOTS.map(sl=>{const it=hr.gear[sl];if(!it)return`<button class="item empty" data-act="emptySlot" data-k="${k}" data-s="${sl}"><i>${SLOT_I[sl]}</i><small>${SLOT_N[sl]}</small></button>`;const c=enhCost(it);return`<button class="item ${S.gold>=c&&it.lv<20?"can":""}" style="--rc:${RAR[it.r].c}" data-act="enhQ" data-id="${it.id}" data-cost="${c}"><i>${it.e}</i><b>+${it.lv}</b><small>${it.lv>=20?"MAX":"⬆ "+fmt(c)}</small></button>`}).join("")}</div></div>`}).join("");
 return h+`<div class="hint">Auto-equip puts upgrades on whichever deployed hero benefits most. Toggle it in Settings.</div>`;
}
ACT.sellJunk=()=>{let g=0,n=0;S.bag=S.bag.filter(b=>{if(b.r<=1&&!S.dep.some(k=>iscore(b)>iscore(S.heroes[k].gear[b.slot]))){g+=sellVal(b);n++;return false}return true});S.gold+=g;S.stats.sold+=n;toast("Sold "+n+" items for "+fmt(g)+" gold","good");AU.play("coin");renderTab()};
function statLines(it){let h="";for(const k in it.st){const v=it.st[k]*(1+0.08*it.lv)*100;h+=`<div class="srow"><span>${STAT_N[k]}</span><b>+${k==="atk"||k==="hp"?fmt(v)+"%":v.toFixed(1)+"%"}</b></div>`}return h}
function openItem(id){
 const f=findItem(id);if(!f){closeModal();return}const it=f.it,r=RAR[it.r],ec=enhCost(it);
 let eq="";
 if(f.loc==="bag"){eq=S.dep.map(k=>{const cur=S.heroes[k].gear[it.slot],dl=iscore(it)-iscore(cur);return`<button class="mini ${dl>0?"can":""}" data-act="equip" data-k="${k}" data-id="${id}">${CLS[k].e} ${dl>0?"▲":"▼"}</button>`}).join(" ")}
 modal(`<div class="hdet"><div class="big">${it.e}</div><div class="mtitle" style="color:${r.c}">${it.name}</div><div class="msub">${r.n} ${SLOT_N[it.slot]}${it.lv?" · +"+it.lv:""} · ilvl ${it.ilvl+1}${f.loc==="hero"?" · on "+CLS[f.k].hero:""}</div></div>
 <div class="statbox">${statLines(it)}</div>
 ${eq?`<div class="sec">Equip on</div><div style="display:flex;flex-wrap:wrap;gap:6px">${eq}</div>`:""}
 <div class="mbtns col">${it.lv<20?`<button class="btn ${S.gold>=ec?"gold":""}" data-act="enh" data-id="${id}">Enhance 🪙 ${fmt(ec)}</button>`:""}${f.loc==="hero"?`<button class="btn" data-act="unequip" data-k="${f.k}" data-s="${it.slot}">Unequip</button>`:`<button class="btn mg" data-act="sell" data-id="${id}">Sell 🪙 ${fmt(sellVal(it))}</button>`}<button class="btn ghost" data-act="close">Close</button></div>`);
}
ACT.item=d=>{AU.play("ui");openItem(d.id)};
ACT.equip=d=>{equipItem(d.k,d.id);AU.play("level");closeModal()};
ACT.unequip=d=>{if(unequipItem(d.k,d.s)){AU.play("ui");closeModal()}else toast("Bag is full.","bad")};
ACT.enhQ=d=>{const f=findItem(d.id);if(!f)return;const c=enhCost(f.it);if(S.gold<c||f.it.lv>=20){AU.play("err");return}S.gold-=c;f.it.lv++;recalc();AU.play("level");renderTab()};
ACT.enh=d=>{const f=findItem(d.id);if(!f)return;const c=enhCost(f.it);if(S.gold<c||f.it.lv>=20){AU.play("err");return}S.gold-=c;f.it.lv++;recalc();AU.play("level");openItem(d.id)};
ACT.sell=d=>{const f=findItem(d.id);if(!f||f.loc!=="bag")return;S.gold+=sellVal(f.it);S.bag=S.bag.filter(b=>b.id!==d.id);S.stats.sold++;AU.play("coin");closeModal()};

/* ---------- Pets tab ---------- */
function renderPets(){
 const ps=petSlots();
 let h=`<div class="hdr"><div class="sec" style="margin:0">Familiars ${S.petAct.length}/${ps}</div>${buyBtn("egg","egg",eggCost(),"","🥚 HATCH")}</div>`;
 if(S.stats.maxEver<2)h+=`<div class="hint">Reach stage 3 and the Familiar Fair opens. It's an egg. Nobody asks what kind.</div>`;
 h+=`<div class="ggrid">`+PETS.map(p=>{const pl=S.pets[p.id],rc=PET_RAR[p.rar];
  if(!pl)return`<div class="gcard lk" style="--rc:${rc.c}"><i>❓</i><b>???</b><em>${rc.n}</em></div>`;
  const act=S.petAct.includes(p.id);
  return`<div class="gcard ${act?"act":""}" style="--rc:${rc.c}" data-act="petInfo" data-id="${p.id}"><i>${p.e}</i><b>${p.n}</b><em>Lv ${pl.lvl}${act?" · Active":""}</em></div>`}).join("")+`</div>`;
 return h+`<div class="hint">Tap a familiar to equip or level it. Duplicates level up automatically. Slots unlock at stages 31 and 81.</div>`;
}
ACT.petInfo=d=>{const p=PETS.find(x=>x.id===d.id),pl=S.pets[p.id],rc=PET_RAR[p.rar],act=S.petAct.includes(p.id),c=petLvCost(p.id);AU.play("ui");
 modal(`<div class="hdet"><div class="big">${p.e}</div><div class="mtitle" style="color:${rc.c}">${p.n}</div><div class="msub">${rc.n} · Level ${pl.lvl}</div><p class="mp">${p.d(pl.lvl)}</p></div><div class="mbtns"><button class="btn ghost" data-act="close">Close</button><button class="btn ${act?"mg":""}" data-act="petTog2" data-id="${p.id}">${act?"Send to bench":"Make active"}</button><button class="btn" data-act="petUp2" data-id="${p.id}" data-cost="${c}">⬆ 🪙${fmt(c)}</button></div>`)};
ACT.petTog2=d=>{togglePet(d.id);closeModal();renderTab()};
ACT.petUp2=d=>{const c=petLvCost(d.id);if(S.gold<c){AU.play("err");return}S.gold-=c;S.pets[d.id].lvl++;recalc();AU.play("level");closeModal();renderTab()};
ACT.egg=()=>{if(S.stats.maxEver<2){toast("The Familiar Fair opens at stage 3.","bad");return}const r=buyEgg();if(!r){AU.play("err");return}AU.play("egg");
 const rc=PET_RAR[r.p.rar];modal(`<div class="hdet"><div class="big">${r.p.e}</div><div class="mtitle" style="color:${rc.c}">${r.p.n}</div><div class="msub">${rc.n} · ${r.isNew?"NEW!":"Level "+r.lvl}</div><p class="mp">${r.p.d(r.lvl)}</p></div><div class="mbtns"><button class="btn" data-act="close">Adopt</button></div>`);checkAch()};
ACT.petTog=d=>{AU.play("ui");togglePet(d.id)};
ACT.petUp=d=>{const c=petLvCost(d.id);if(S.gold<c){AU.play("err");return}S.gold-=c;S.pets[d.id].lvl++;recalc();AU.play("level");renderTab()};
function buildPets(){if(R.inGame)renderTab()}

/* ---------- Map tab ---------- */
function renderMap(){
 const ai=areaIdx(S.stage),rl=realmOf(S.stage),maxA=areaIdx(S.max);
 let h=campBar()+`<div class="goal">🧱 Soft wall ≈ stage ${Math.floor(wallStage())+1} (enemies ramp brutally). Hard cap: stage ${hardStage()+1}. Only Restructuring (Wishes) raises them.</div>`+`<div class="sec">Area ${ai+1}: ${rl.n}</div><div class="hint" style="margin-top:0">Weather: ${(rl.wx||[]).map(w=>WXD[w].i+" "+WXD[w].n).join(" · ")} · Hazard: ${hazardOf(ai*10)?hazardOf(ai*10).i+" "+hazardOf(ai*10).n:"none"} · Monsters: ${ELEMS[rl.el].i} ${ELEMS[rl.el].n} · Boss: ${rl.boss[1]} ${rl.boss[0]}</div>`;
 h+=`<div class="stg10">${[0,1,2,3,4,5,6,7,8,9].map(i=>{const g=ai*10+i;return`<button class="${g<S.max?"cl":""} ${g===S.stage?"cur":""} ${g>S.max?"lk":""} ${i===9||i===4?"boss":""}" data-act="goStage" data-g="${g}">${i===9?"👑":i===4?"⚔️":i+1}</button>`}).join("")}</div>`;
 h+=`<div class="mbtns"><button class="btn ghost" data-act="wxguide">☁️ Weather</button><button class="btn ghost" data-act="codex">📖 Story</button><button class="btn ghost" data-act="mapJump">🎯 Furthest</button></div>`;
 if(R.mapBase==null)R.mapBase=Math.max(0,ai-2);
 const base=R.mapBase;
 h+=`<div class="hdr"><div class="sec" style="margin:0">Areas (furthest: ${maxA+1})</div><div class="qty"><button data-act="mapPage" data-d="-50">⏪</button><button data-act="mapPage" data-d="-8">◀</button><button data-act="mapPage" data-d="8">▶</button><button data-act="mapPage" data-d="50">⏩</button></div></div>`;
 for(let a=base;a<base+8;a++){const r=realmOf(a*10),lock=a>maxA+0&&a*10>S.max,cl=Math.min(10,Math.max(0,S.max-a*10)),far=a>maxA+1;
  h+=`<button class="realm ${lock?"locked":""} ${a===ai?"cur":""}" style="--rc:${r.acc};--r1:${r.bg[0]};--r2:${r.bg[1]}" data-act="goStage" data-g="${a*10}"><div class="rtop"><b>${far?"Area "+(a+1)+": ???":"Area "+(a+1)+": "+r.n}</b><span>${cl}/10</span></div><small>${lock?"Keep marching.":r.boss[1]+" "+r.boss[0]}</small><div class="rbar"><i style="width:${cl*10}%"></i></div></button>`}
 return h;
}
ACT.mapPage=d=>{R.mapBase=Math.max(0,(R.mapBase||0)+(+d.d));AU.play("ui");renderTab()};
ACT.mapJump=()=>{R.mapBase=Math.max(0,areaIdx(S.max)-3);AU.play("ui");renderTab()};
ACT.goStage=d=>{const g=+d.g;if(gotoStage(g)){AU.play("ui");renderTab()}else AU.play("err")};
ACT.wxguide=()=>{AU.play("ui");modal(`<div class="mtitle">☁️ Weather Guide</div><div class="msub">Weather affects heroes AND monsters. Umbrella upgrades and certain pets soften penalties.</div>${Object.keys(WXD).map(k=>{const w=WXD[k];return`<div class="wxrow ${R.wxId===k?"now":""}"><i>${w.i}</i><div><b>${w.n}</b><small>${w.d}</small></div></div>`}).join("")}<div class="mbtns"><button class="btn ghost" data-act="close">Close</button></div>`)};
function prologueModal(c){const cp=CAMPS[c];const crew=campCast(c).map(k=>`<b>${CLS[k].e} ${CLS[k].hero}</b> — ${CLS[k].bio.split("Passive:")[0]}`).join("<br><br>");storyModal(cp.i+" "+cp.n,storyFill(cp.pro,c)+"<br><br><b>THE CREW</b><br><br>"+crew,"Let's go ▶")}
ACT.codex=()=>{AU.play("ui");const c=S.camp,cp=CAMPS[c],n=Math.floor(S.max/10),rows=[];
 for(let a=1;a<=n&&a<=10;a++){const st=storyFor(c,a);rows.push(`<div class="ach got"><i>📖</i><div><b>${st.title}</b><small>${st.text}</small></div></div>`)}
 if(n>10)rows.push(`<div class="hint">…${n-10} more chapters unfolded as you pushed deeper.</div>`);
 modal(`<div class="mtitle">📖 ${cp.n}</div><div class="msub">${cp.d}</div><div class="ach got"><i>🎬</i><div><b>Prologue</b><small><button class="mini can" data-act="proRe">Read again</button></small></div></div>${rows.join("")||'<div class="hint">Beat the first boss to unlock Chapter 1.</div>'}<div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};
ACT.proRe=()=>{closeModal();prologueModal(S.camp)};

/* ---------- More tab ---------- */
function renderMore(){
 return`<div class="sec">Menu</div><div class="grid2">
 <button class="mbig" data-act="restr"><i>📖</i><b>Rewrite the Tale</b><small>${S.so} Wishes${canRestructure()?" · +"+soGain()+" ready":""}</small></button>
 <button class="mbig" data-act="achs"><i>🏅</i><b>Achievements</b><small>${Object.keys(S.ach).length}/${ACH.length} · +${Object.keys(S.ach).length*2}% dmg</small></button>
 <button class="mbig" data-act="stats"><i>📊</i><b>Statistics</b><small>Numbers go up</small></button>
 <button class="mbig" data-act="settings"><i>⚙️</i><b>Settings</b><small>Sound, saves & more</small></button>
 <button class="mbig" data-act="howto"><i>❓</i><b>How to Play</b><small>Storyteller's handbook</small></button>
 <button class="mbig" data-act="credits"><i>🎬</i><b>Credits</b><small>Blame assignment</small></button>
 <button class="mbig wide" data-act="quit"><i>🚪</i><b>Quit to Title</b><small>Progress is saved automatically</small></button></div>`;
}
function openRestr(){
 const g=soGain(),can=canRestructure()&&g>=1;
 modal(`<div class="mtitle">📖 Rewrite the Tale</div><p class="mp">Close the book, begin the tale again, and earn <b>Wishes</b> based on your deepest stage. Each Wish permanently adds <b>+6% damage</b> and <b>+4% gold</b>. You keep your bag, pets and achievements. Equipped gear goes back in the bag.</p>
 <div class="statbox"><div class="srow"><span>Wishes available</span><b>${S.so} 📈</b></div><div class="srow"><span>Lifetime Wishes</span><b>${S.soTotal}</b></div><div class="srow"><span>Rewrites done</span><b>${S.restructures}</b></div><div class="srow"><span>Soft wall (enemies ramp up)</span><b>stage ~${Math.floor(wallStage())+1}</b></div><div class="srow"><span>Hard cap (cannot pass)</span><b>stage ${hardStage()+1}</b></div><div class="srow"><span>After this rewrite</span><b>wall ~${Math.floor(55+2.17*Math.pow(S.soTotal+g,.59))+1}</b></div></div>
 <button class="btn mg wide" data-act="restrAsk" ${can?"":"disabled"}>${can?"Rewrite now: +"+g+" 📈":"Reach stage 21 to unlock"}</button>
 <div class="sec">Wish Shop</div>
 ${PERKS.map(p=>{const l=perk(p.id),maxed=l>=p.max,cost=Math.ceil(p.b*Math.pow(1.9,l));return`<div class="row"><div class="ico">${p.i}</div><div class="info"><b>${p.n}</b> <em>Lv ${l}</em><small>${p.d(l)}${maxed?"":" → "+p.d(l+1)}</small></div>${maxed?'<div class="maxed">MAX</div>':`<button class="buy ${S.so>=cost?"can":""}" data-act="perk" data-id="${p.id}"><span>BUY</span>📈 ${cost}</button>`}</div>`}).join("")}
 <div class="mbtns"><button class="btn ghost" data-act="close">Close</button></div>`);
}
ACT.restr=()=>{AU.play("ui");openRestr()};
ACT.restrAsk=()=>confirmModal("This resets your gold, upgrades, skills, and roster. You keep Wishes, pets, bag and achievements. The narrator thanks you for your service.","restrDo","","Rewrite!");
ACT.restrDo=()=>{const g=soGain();if(doRestructure()){closeModal();tab="heroes";renderTabs();renderTab();renderSkillbar();AU.play("win");toast("📈 +"+g+" Wishes! The tale begins anew.","good");checkAch()}};
ACT.perk=d=>{const p=PERKS.find(x=>x.id===d.id),l=perk(p.id),cost=Math.ceil(p.b*Math.pow(1.9,l));if(l>=p.max||S.so<cost){AU.play("err");return}S.so-=cost;S.perks[p.id]=l+1;recalc();AU.play("level");openRestr()};
ACT.achs=()=>{AU.play("ui");modal(`<div class="mtitle">🏅 Achievements</div><div class="msub">${Object.keys(S.ach).length}/${ACH.length} — each gives +2% damage</div>${ACH.map(a=>`<div class="ach ${S.ach[a.id]?"got":""}"><i>${S.ach[a.id]?"🏅":"🔒"}</i><div><b>${a.n}</b><small>${a.d}</small></div></div>`).join("")}<div class="mbtns"><button class="btn ghost" data-act="close">Close</button></div>`)};
ACT.stats=()=>{AU.play("ui");const st=S.stats;const rows=[["Deepest stage ever",st.maxEver+1],["Monsters defeated",fmt(S.kills)],["Taps",fmt(S.taps)],["Critical hits",fmt(st.crits)],["Bosses defeated",st.bosses],["Total gold earned",fmt(S.totalGold)],["Gold this run",fmt(S.runGold)],["Items found",st.loot],["Items sold",st.sold],["Heroes fainted",st.deaths],["Party wipes",st.wipes],["Eggs hatched",st.eggs],["Restructures",S.restructures],["Lifetime Wishes",S.soTotal]];
 modal(`<div class="mtitle">📊 Statistics</div><div class="statbox">${rows.map(r=>`<div class="srow"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("")}</div><div class="mbtns"><button class="btn ghost" data-act="close">Close</button></div>`)};
ACT.quit=()=>confirmModal("Return to the title screen? Your progress is saved.","quitDo","","Quit");
ACT.quitDo=()=>{saveGame();R.inGame=false;closeModal();$("#game").classList.add("hidden");$("#title").classList.remove("hidden");renderTitleMenu()};

const HOWTO=`<div class="mtitle">❓ Storyteller's Handbook</div>
<div class="how"><p><b>1. MARCH.</b> Your squad walks right. Monsters walk left. Melee heroes dash out to smack things, then return. Ranged heroes stay back and complain.</p>
<p><b>2. TAP</b> the battlefield to smash the nearest monster. Use the <b>skill bar</b> for big spells.</p>
<p><b>3. UPGRADE</b> heroes with one button: +1 level per press. Attack and Special grow on their own every few levels, every 10 levels is a milestone that boosts synergy and the whole party, and heroes evolve at Lv 25, 60 and 120 automatically. Your heroes auto-fight and auto-tap, so tapping is optional (but helps). Turn on the 🤖 Auto-Fairy once unlocked.</p><p><b>CAMPAIGNS.</b> Each campaign has 2000 stages and its own prestige. Reaching ~1200 takes serious synergy, gear and many restructures.</p>
<p><b>4. FORMATION.</b> Your squad has 8 seats (Vanguard, Marksman, Bruiser, Support, Arcanist, Skirmisher, Commander, Wildcard). You start with the Vanguard; reach deeper stages and pay to unlock each seat's default hero. Every seat has 10 heroes, but only one sits there at a time.</p>
<p><b>SYNERGY.</b> Every hero has tags and buffs allies with matching tags (🔗), and gets a bonus when the right ally is present (🤝). Mix and match seats to find combos.</p>
<p><b>RECRUITMENT EVENTS</b> happen weekly, and after the first boss and every 5th area boss: pick 1 of 3 new heroes to add to their seat's roster. Gems can buy extra events.</p>
<p><b>STAGES.</b> Every area is 10 stages: a ⚔️ <b>mini-boss on stage 5</b> and a 👑 <b>big boss on stage 10</b>. Both drop <b>chests</b> with gear for your whole squad, gold and a supply item. Only big bosses drop 💎 gems for the Gem Shop.</p>
<p><b>5. GEAR</b> drops from monsters. Each hero has six slots: Weapon, Headgear, Armor, Trinket, Boots and Ring. Enhance them with gold.</p>
<p><b>6. WEATHER</b> changes the battlefield. Fire hates rain, ice loves snow, and lightning is indiscriminate. Check the weather chip for details.</p>
<p><b>7. PETS</b>: hatch eggs for fairytale familiars. <b>8. BOSSES</b> end each area. Wipe out and your squad retreats a stage to 'regroup'.</p>
<p><b>9. REWRITE</b> at stage 21+ for permanent Wishes (+6% damage, +10% gold each). After about area 50 monsters get nasty. Rewrite the tale, come back stronger, push deeper.</p><p>Don't feed the Mimic. Don't eat the cottage.</p></div><div class="mbtns"><button class="btn" data-act="close">Once upon a time</button></div>`;
ACT.howto=()=>{AU.play("ui");modal(HOWTO)};
ACT.credits=()=>{AU.play("ui");modal(`<div class="mtitle">🎬 Credits</div><div class="how"><p><b>GRIMM DESCENT</b><br>A Dark Fairy Tale</p><p>Created by <b>Tim</b><br>Built with Claude</p><p>No heroes were harmed. Several were fainted at.</p><p>Any resemblance to your childhood bedtime stories is entirely intentional.</p></div><div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};
function toggles(){const T=[["music","🎵 Music"],["sfx","🔊 Sound effects"],["shake","📳 Screen shake"],["numbers","🔢 Damage numbers"],["vibe","📱 Vibration"],["autoequip","🛡️ Auto-equip upgrades"],["autosell","💰 Auto-sell worse loot"]];
 return T.map(t=>`<div class="tog"><span>${t[1]}</span><button class="sw ${S.set[t[0]]?"on":""}" data-act="tog" data-k="${t[0]}"></button></div>`).join("")}
function openSettings(){
 modal(`<div class="mtitle">⚙️ Settings</div>${toggles()}
 <div class="tog"><span>🎵 Music volume</span><input type="range" min="0" max="1" step=".05" value="${S.set.musicVol}" data-vol="musicVol"></div>
 <div class="tog"><span>🔊 SFX volume</span><input type="range" min="0" max="1" step=".05" value="${S.set.sfxVol}" data-vol="sfxVol"></div>
 <div class="mbtns col"><button class="btn" data-act="expSave">📤 Export Save</button><button class="btn" data-act="impSave">📥 Import Save</button><button class="btn mg" data-act="hardReset">🗑️ Delete All Progress</button><button class="btn ghost" data-act="close">Close</button></div>`);
}
ACT.settings=()=>{AU.play("ui");openSettings()};
ACT.tog=d=>{S.set[d.k]=!S.set[d.k];AU.vol();AU.play("ui");if($("#mbody .mtitle")&&$("#mbody .mtitle").textContent.indexOf("Settings")>=0)openSettings();else renderTab()};
ACT.expSave=()=>{saveGame();let s="";try{s=btoa(unescape(encodeURIComponent(JSON.stringify(S))))}catch(e){}
 modal(`<div class="mtitle">📤 Export</div><p class="mp">Copy this text somewhere safe:</p><textarea id="saveTxt" readonly>${s}</textarea><div class="mbtns"><button class="btn" data-act="copySave">Copy</button><button class="btn ghost" data-act="settings">Back</button></div>`)};
ACT.copySave=()=>{const t=$("#saveTxt");t.select();try{document.execCommand("copy");toast("Copied!","good")}catch(e){}};
ACT.impSave=()=>modal(`<div class="mtitle">📥 Import</div><p class="mp">Paste your save text. This will REPLACE current progress.</p><textarea id="saveTxt"></textarea><div class="mbtns"><button class="btn mg" data-act="impDo">Import</button><button class="btn ghost" data-act="settings">Back</button></div>`);
ACT.impDo=()=>{try{const o=JSON.parse(decodeURIComponent(escape(atob($("#saveTxt").value.trim()))));if(typeof o.gold!=="number")throw 0;localStorage.setItem(SAVE_KEY,JSON.stringify(mergeSave(o)));location.reload()}catch(e){toast("That doesn't look like a valid save.","bad")}};
ACT.hardReset=()=>confirmModal("Delete ALL progress? This can't be undone. Not even by a fairy godmother.","hardDo","","Delete everything");
ACT.hardDo=()=>{try{localStorage.removeItem(SAVE_KEY)}catch(e){}location.reload()};
function showOffline(o){modal(`<div class="mtitle">💼 Welcome Back!</div><p class="mp">You were away ${fmtTime(o.sec)}. While idle, the squad advances at a quarter of active speed.${o.to>o.from?" They marched from stage "+(o.from+1)+" to stage "+(o.to+1)+".":" They held the line."}${o.chests.length?" They dragged home "+o.chests.length+" chest"+(o.chests.length===1?"":"s")+" (see Shop).":""}</p><div class="bigmoney">🪙 +${fmt(o.gold)}</div><div class="mbtns"><button class="btn gold" data-act="close">Collect</button></div>`,true);AU.play("coin")}

/* ---------- title / start ---------- */
function renderTitleMenu(){
 const sv=hasSave();
 $("#titleMenu").innerHTML=(sv?`<button class="btn big" data-act="cont">▶ CONTINUE</button><button class="btn mg" data-act="newGame">New Game</button>`:`<button class="btn big" data-act="newGame">▶ PLAY</button>`)+`<div class="trow"><button class="btn ghost" data-act="howto">How to Play</button><button class="btn ghost" data-act="settings">Settings</button><button class="btn ghost" data-act="credits">Credits</button></div>`;
}
ACT.cont=()=>{const sv=loadSave();startGame(sv||newState(),true)};
ACT.newGame=()=>{if(hasSave()){confirmModal("Start a new game? Your current save will be overwritten.","newDo","","New Game")}else startGame(newState(),false)};
ACT.newDo=()=>{closeModal();startGame(newState(),false)};
function startGame(st,cont){
 S=st;AU.init();AU.resume();AU.vol();recalc();
 R.buff={cry:0,gold:0,ballad:0};R.cd={};R.en=[];R.proj=[];R.fl=[];R.part=[];R.team=[];R.lastArea=-1;R.wxId="clear";R.speed=S.speed||1;
 buildTeam();
 $("#title").classList.add("hidden");$("#game").classList.remove("hidden");$("#modal").classList.add("hidden");
 resizeCv();tab="heroes";renderSkillbar();renderTabs();renderTab();updHud();
 R.inGame=true;R.modalPause=false;startStage();resizeCv();
 if(cont&&S.max>0){const gap=(Date.now()-S.last)/1000;if(gap>120){const o=offlineGain(gap);if(applyOffline(o))showOffline(o)}}
 saveGame();
}

/* title fx */
const TF={c:null,x:null,w:0,h:0,p:[]};
function titleInit(){TF.c=$("#titleFx");TF.x=TF.c.getContext("2d");titleResize();window.addEventListener("resize",titleResize)}
function titleResize(){const t=$("#title");if(!TF.c||!t)return;const d=Math.min(2,window.devicePixelRatio||1);TF.w=TF.c.clientWidth||t.clientWidth;TF.h=TF.c.clientHeight||t.clientHeight;TF.c.width=TF.w*d;TF.c.height=TF.h*d;TF.x.setTransform(d,0,0,d,0,0)}
function titleFx(dt){const x=TF.x;if(!x||!TF.w)return;x.clearRect(0,0,TF.w,TF.h);
 if(TF.p.length<70&&Math.random()<.6)TF.p.push({x:rand(0,TF.w),y:TF.h+10,v:-rand(14,50),s:rand(1.5,3.4),c:["#ffd98a","#19e6ff","#ff8ad8"][Math.floor(Math.random()*3)],t:rand(0,6)});
 for(let i=TF.p.length-1;i>=0;i--){const p=TF.p[i];p.y+=p.v*dt;p.t+=dt;p.x+=Math.sin(p.t*2)*20*dt;if(p.y<-12){TF.p.splice(i,1);continue}x.globalAlpha=.4+.45*Math.abs(Math.sin(p.t*2));x.fillStyle=p.c;x.shadowColor=p.c;x.shadowBlur=8;x.beginPath();x.arc(p.x,p.y,p.s,0,6.3);x.fill()}x.globalAlpha=1;x.shadowBlur=0}

/* ---------- ui tick, events, boot ---------- */
let tickAcc=0,lastUi=0;
function uiLoop(ts){
 requestAnimationFrame(uiLoop);const dt=Math.min(.1,(ts-lastUi)/1000||0);lastUi=ts;
 if(!R.inGame){titleFx(dt);return}
 tickAcc+=dt;if(tickAcc<.25)return;const d=tickAcc;tickAcc=0;
 updHud();updSkillCd();updAfford();
 if(R.chestQ&&R.chestQ.length&&!R.modalPause){const q=R.chestQ.shift();chestModal(q.c,q.boss?"BOSS CHEST!":"Mini-boss chest!")}
 document.querySelectorAll("[data-pt]").forEach(el=>{const t=el.dataset.pt,x=S.pb[t]>0?fmtTime(S.pb[t]):"drink";if(el.textContent!==x)el.textContent=x});
 autoManage();
 R.saveT+=d;if(R.saveT>15){R.saveT=0;saveGame()}
 R.achT+=d;if(R.achT>3){R.achT=0;checkAch()}
}
document.addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(!t||t.disabled)return;const f=ACT[t.dataset.act];if(f){AU.init();AU.resume();f(t.dataset,t)}});
document.addEventListener("input",e=>{const k=e.target.dataset&&e.target.dataset.vol;if(k){S.set[k]=+e.target.value;AU.vol()}});
document.addEventListener("pointerdown",()=>{AU.init();AU.resume()},{once:true});
document.addEventListener("visibilitychange",()=>{if(!R.inGame)return;if(document.hidden){saveGame();R.hiddenAt=Date.now()}else if(R.hiddenAt){const gap=(Date.now()-R.hiddenAt)/1000;R.hiddenAt=0;if(gap>120&&!R.modalPause){const o=offlineGain(gap);if(applyOffline(o)){showOffline(o)}}}});
window.addEventListener("pagehide",()=>{if(R.inGame)saveGame()});
function boot(){
 $("#titleKnight").innerHTML=`<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fffbe8"/><stop offset=".6" stop-color="#d8f6ff"/><stop offset="1" stop-color="#7fe8ff" stop-opacity="0"/></radialGradient><linearGradient id="gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140a2e"/><stop offset="1" stop-color="#05030f"/></linearGradient></defs>
<g class="moon"><circle cx="200" cy="82" r="78" fill="url(#mg)" opacity=".5"/><circle cx="200" cy="82" r="46" fill="#f6fbff"/><circle cx="186" cy="70" r="8" fill="#d3e4f0"/><circle cx="214" cy="96" r="11" fill="#d3e4f0"/><circle cx="208" cy="64" r="4" fill="#d3e4f0"/></g>
<g class="crow"><path d="M30 60q8-8 16 0q8-8 16 0" fill="none" stroke="#05030f" stroke-width="3" stroke-linecap="round"/></g><g class="crow2"><path d="M10 100q6-6 12 0q6-6 12 0" fill="none" stroke="#05030f" stroke-width="2.5" stroke-linecap="round"/></g>
<path d="M0 190q60-26 120-8t110-4q80-16 170 6V250H0z" fill="url(#gd)"/>
<g fill="#07041a"><path d="M40 250l6-120-24-34 20 8-10-36 20 24 6-40 8 44 24-20-14 36 26-2-30 32 8 108z"/><path d="M350 250l-4-100 22-26-18 4 8-30-16 18-6-34-8 36-22-14 12 30-24 4 28 24-6 88z"/><path d="M110 250l2-70-14-22 14 6-4-24 12 16 4-20 4 24 14-10-8 22 16 2-20 18 4 58z" opacity=".9"/><path d="M296 250l-2-60 12-20-12 4 4-22-10 14-4-18-6 20-14-8 8 20-14 2 18 16-4 52z" opacity=".9"/></g>
<g><path d="M150 214v-50l50-36 50 36v50z" fill="#0b0624"/><path d="M142 168l58-46 58 46-12 4-46-36-46 36z" fill="#1a0e3d"/><rect x="186" y="188" width="28" height="26" rx="14" fill="#08041a"/><rect class="win" x="162" y="178" width="18" height="18" rx="3" fill="#ffd98a"/><rect class="win" x="220" y="178" width="18" height="18" rx="3" fill="#ff8ad8"/><path d="M164 140l-6-18 10 6 2-14 6 14" fill="none" stroke="#ff2fd0" stroke-width="1.6" opacity=".7"/></g>
<g fill="#ffd98a" opacity=".85"><circle cx="90" cy="176" r="2"/><circle cx="312" cy="170" r="2"/><circle cx="130" cy="150" r="1.6"/><circle cx="278" cy="148" r="1.6"/><circle cx="60" cy="140" r="1.4"/></g>
<g fill="#e8e0ff"><circle cx="40" cy="24" r="1.4"/><circle cx="90" cy="46" r="1"/><circle cx="330" cy="30" r="1.4"/><circle cx="370" cy="68" r="1"/><circle cx="130" cy="20" r="1"/><circle cx="280" cy="14" r="1.2"/></g></svg>`;
 $("#modal").addEventListener("click",e=>{if(e.target.id==="modal"&&!R.modalPause)closeModal()});
 initBattle();titleInit();renderTitleMenu();recalc();startLoop();requestAnimationFrame(uiLoop);
}
boot();

/* ---------- Shop, chests & supplies ---------- */
function chestModal(c,title){
 const rows=c.items.map(it=>`<div class="ach got" style="border-color:${RAR[it.r].c}"><i>${it.e}</i><div><b style="color:${RAR[it.r].c}">${it.name}</b><small>${RAR[it.r].n} ${SLOT_N[it.slot]}</small></div></div>`).join("");
 const u=UTILS.find(x=>x.id===c.util.id);
 modal(`<div class="hdet"><div class="big">🎁</div><div class="mtitle">${title}</div></div><div class="statbox"><div class="srow"><span>Gold</span><b>🪙 ${fmt(c.gold)}</b></div>${c.pot?`<div class="srow"><span>Potion</span><b>${POTS[c.pot.t].i} ${POTS[c.pot.t].n} ×${c.pot.n}</b></div>`:""}<div class="srow"><span>Supply</span><b>${u.i} ${u.n} ×${c.util.n}</b></div>${c.gems?`<div class="srow"><span>Gems</span><b>💎 ${c.gems}</b></div>`:""}</div><div class="sec">Gear (auto-equipped where it helps)</div>${rows}<div class="mbtns"><button class="btn gold" data-act="close">Collect</button></div>`,true);
 AU.play("loot");
}
function eggModal(r){const rc=PET_RAR[r.p.rar];modal(`<div class="hdet"><div class="big">${r.p.e}</div><div class="mtitle" style="color:${rc.c}">${r.p.n}</div><div class="msub">${rc.n} · ${r.isNew?"NEW!":"Level "+r.lvl}</div><p class="mp">${r.p.d(r.lvl)}</p></div><div class="mbtns"><button class="btn" data-act="close">Adopt</button></div>`);AU.play("egg")}
function renderShop(){
 let h=chestBagRow()+`<div class="hdr"><div class="sec" style="margin:0">Supplies</div><div class="gemc">💎 ${S.gems}</div></div>`;
 h+=`<div class="sec">Potions (last ${POT_DUR/60} min, whole formation)</div>`+Object.keys(POTS).map(t=>{const p=POTS[t],c=potPrice();return`<div class="row"><div class="ico">${p.i}</div><div class="info"><b>${p.n} ×${S.pot[t]}</b><small>${p.d}</small></div><button class="buy ${S.gold>=c?"can":""}" data-act="buyPot" data-t="${t}" data-cost="${c}"><span>BUY</span>🪙 ${fmt(c)}</button></div>`}).join("");
 const have=UTILS.filter(u=>S.inv[u.id]>0);
 const bt=[];if(S.bt.ticket>0)bt.push("🎟️ Gold ×2 · "+fmtTime(S.bt.ticket));if(S.bt.pre>0)bt.push("🥤 Damage ×1.1 · "+fmtTime(S.bt.pre));
 if(bt.length)h+=`<div class="goal">${bt.join("  ·  ")}</div>`;
 h+=have.length?have.map(u=>`<div class="row"><div class="ico">${u.i}</div><div class="info"><b>${u.n} ×${S.inv[u.id]}</b><small>${u.d}</small></div><button class="buy can" data-act="useUtil" data-id="${u.id}"><span>USE</span></button></div>`).join(""):`<div class="hint">No supplies yet. Chests from mini-bosses and bosses drop them, or buy some below.</div>`;
 h+=`<div class="sec">Gold Shop</div>`;
 h+=`<div class="row"><div class="ico">📦</div><div class="info"><b>Lockbox</b><small>Fine+ gear for your whole squad, gold and a supply. No gems inside.</small></div>${buyBtn("buyBox","box",lockboxCost(),"","BUY")}</div>`;
 h+=UTILS.map(u=>`<div class="row"><div class="ico">${u.i}</div><div class="info"><b>${u.n}</b><small>${u.d}</small></div>${buyBtn("buyUtil",u.id,utilPrice(u.id),"","BUY")}</div>`).join("");
 h+=`<div class="sec">Gem Shop 💎 ${S.gems}</div><div class="hint" style="margin-top:0">Gems only drop from big bosses (the 10th stage of each area). Spend them wisely.</div>`;
 h+=GEMS.map(g=>{const l=gemU(g.id),maxed=g.max!==undefined&&l>=g.max,c=g.cost(l),d=typeof g.d==="function"?g.d(Math.max(1,l)):g.d;
  return`<div class="row"><div class="ico">${g.i}</div><div class="info"><b>${g.n}</b>${g.max?` <em>Lv ${l}/${g.max}</em>`:""}<small>${d}</small></div>${maxed?'<div class="maxed">MAX</div>':`<button class="buy ${S.gems>=c?"can":""}" data-act="buyGem" data-id="${g.id}"><span>BUY</span>💎 ${c}</button>`}</div>`}).join("");
 return h;
}
ACT.buyBox=()=>{const c=lockboxCost();if(S.gold<c){AU.play("err");return}S.gold-=c;S.shopN++;const ch=openChest("mini",Math.max(S.stage,S.max));chestModal(ch,"Lockbox opened!")};
ACT.buyPot=d=>{const c=potPrice();if(S.gold<c){AU.play("err");return}S.gold-=c;S.pot[d.t]++;AU.play("coin");renderTab()};
function chestBagRow(){const n={mini:0,boss:0,premium:0};S.chestBag.forEach(c=>n[c.t]++);const tot=S.chestBag.length;
 return`<div class="sec">Chest Bag</div>`+(tot?`<div class="goal">🎁 Boss ×${n.boss} · 📦 Mini ×${n.mini}${n.premium?" · 💎 Premium ×"+n.premium:""}</div><div class="mbtns"><button class="btn" data-act="chestOne">Open one</button><button class="btn mg" data-act="chestAll">Open all (${tot})</button></div>`:`<div class="hint">No stored chests. Defeat bosses (tap the chest that pops out) and idle time will fill this up.</div>`)}
ACT.chestOne=()=>{const c=S.chestBag.shift();if(!c){AU.play("err");return}const r=openChest(c.t,c.g);chestModal(r,c.t==="boss"?"BOSS CHEST!":c.t==="mini"?"Mini-boss chest!":"Premium chest!");refreshTab("shop")};
ACT.chestAll=()=>{if(!S.chestBag.length){AU.play("err");return}const bag=S.chestBag.splice(0);let gold=0,gems=0,items=0,best=[];const pots={str:0,spd:0,hp:0},utl={};
 for(const c of bag){const r=openChest(c.t,c.g);gold+=r.gold;gems+=r.gems;items+=r.items.length;r.items.forEach(i=>best.push(i));pots[r.pot.t]+=r.pot.n;utl[r.util.id]=(utl[r.util.id]||0)+r.util.n}
 best.sort((a,b)=>b.r-a.r||iscore(b)-iscore(a));best=best.slice(0,6);
 modal(`<div class="hdet"><div class="big">🎁</div><div class="mtitle">Opened ${bag.length} chests!</div></div><div class="statbox"><div class="srow"><span>Gold</span><b>🪙 ${fmt(gold)}</b></div>${gems?`<div class="srow"><span>Gems</span><b>💎 ${gems}</b></div>`:""}<div class="srow"><span>Gear pieces</span><b>${items}</b></div><div class="srow"><span>Potions</span><b>💪${pots.str} ⚡${pots.spd} 💚${pots.hp}</b></div><div class="srow"><span>Supplies</span><b>${Object.keys(utl).map(id=>{const u=UTILS.find(x=>x.id===id);return u.i+"×"+utl[id]}).join(" ")}</b></div></div><div class="sec">Best finds (the rest went to your bag / auto-equip)</div>${best.map(it=>`<div class="ach got" style="border-color:${RAR[it.r].c}"><i>${it.e}</i><div><b style="color:${RAR[it.r].c}">${it.name}</b><small>${RAR[it.r].n} ${SLOT_N[it.slot]}</small></div></div>`).join("")}<div class="mbtns"><button class="btn gold" data-act="close">Nice</button></div>`,true);AU.play("loot");refreshTab("shop")};
ACT.buyUtil=d=>{const c=utilPrice(d.id);if(S.gold<c){AU.play("err");return}S.gold-=c;S.inv[d.id]=(S.inv[d.id]||0)+1;AU.play("coin");renderTab()};
ACT.useUtil=d=>{const r=useUtil(d.id);if(!r){AU.play("err");return}AU.play("level");if(d.id==="egg")eggModal(r);else{toast("Used "+UTILS.find(u=>u.id===d.id).n,"good");renderTab()}};
ACT.buyGem=d=>{const r=buyGem(d.id);if(!r){AU.play("err");return}AU.play("level");
 if(r.chest)chestModal(r.chest,"Gilded Chest!");else if(r.egg)eggModal(r.egg);else{if(r.gold)toast("⏩ +"+fmt(r.gold)+" gold","good");renderTab()}};
