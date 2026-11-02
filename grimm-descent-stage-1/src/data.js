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
