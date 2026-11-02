'use strict';
/* ============ DESCENT INC. — GAME DATA ============ */
const VERSION="1.0";

// Realms: 12 + endless "Overtime". Each realm = 10 floors, floor 10 is the boss.
const REALMS=[
 {n:"The Basement",bg:["#2d2347","#120c24"],acc:"#19e6ff",decor:["🕸️","🧦","📦","🔦"],
  intro:"Every legend starts somewhere. Yours starts in a damp basement beneath a suburban home. Please do not touch the water heater. It knows.",
  mobs:[["Angry Rat","🐀"],["Basement Spider","🕷️"],["Haunted Roomba","🤖"],["Mildew Blob","🦠"],["Bat With Opinions","🦇"],["Dust Golem","👻"]],
  boss:["The Water Heater","🛢️","It Has Been Watching You"]},
 {n:"Sewers of Mild Concern",bg:["#17403a","#07201d"],acc:"#3dffa0",decor:["💧","🧻","🪠","🫧"],
  intro:"It smells like a sandwich and a mistake. The locals are friendly, in the way that a shark is friendly. Do NOT lick anything.",
  mobs:[["Gator in a Tie","🐊"],["Rat Union Rep","🐀"],["Plumber's Nightmare","🐍"],["Sewer Mime","🤡"],["Drain Mosquito","🦟"],["Flush Phantom","👻"]],
  boss:["The Fatberg","🦠","Ancient. Greasy. Furious."]},
 {n:"Goblin Strip Mall",bg:["#4a2a5e","#1b0e2b"],acc:"#ff2fd0",decor:["🛒","🏷️","🧾","💡"],
  intro:"Half the shops are closed. The other half are goblins. A banner reads 'EVERYTHING MUST GO' — including you, apparently.",
  mobs:[["Goblin Cashier","👺"],["Rogue Shopping Cart","🛒"],["Mall Cop Troll","🧌"],["Kiosk Salesman","🕴️"],["Food Court Ogre","👹"],["Sample Lady","🥟"]],
  boss:["Gerald, Regional Manager","🐲","Can I Speak To Your Manager? He's Me."]},
 {n:"Crypt of Overdue Library Books",bg:["#3c3a2a","#15130a"],acc:"#ffd447",decor:["📚","🕯️","📜","🪶"],
  intro:"SHHHHH. The dead have fines. The undead have WAY bigger fines. Whatever you do, do not return anything late.",
  mobs:[["Skeleton Librarian","💀"],["Angry Dictionary","📕"],["Shushing Ghost","👻"],["Late Fee Vampire","🧛"],["Bookworm (Huge)","🐛"],["Zombie Intern","🧟"]],
  boss:["The Dewey Decimator","📖","Overdue By 400 Years"]},
 {n:"Fungal Spa & Resort",bg:["#432a4d","#1a0f22"],acc:"#ff8ad8",decor:["🍄","🧖","🧼","🪷"],
  intro:"Welcome to the Fungal Spa! Complimentary spores with every visit. Side effects include: becoming a mushroom. Robes are not optional.",
  mobs:[["Mushroom Masseuse","🍄"],["Hot Tub Toad","🐸"],["Spa Snail","🐌"],["Steam Room Specter","🧖"],["Cucumber Eye Horror","🥒"],["Lotion Elemental","🧴"]],
  boss:["The Spore Queen","🍄","Your Appointment Was Yesterday"]},
 {n:"Magma Corp HQ",bg:["#5b1d12","#220804"],acc:"#ff7a3d",decor:["🔥","📊","☕","🖨️"],
  intro:"Corporate has built an office inside a volcano. The synergy is literally burning. Casual Friday means no armor. Do not come on Casual Friday.",
  mobs:[["Fire Intern","🔥"],["Spreadsheet Elemental","📊"],["Middle Manager Imp","😈"],["Printer of Wrath","🖨️"],["Coffee Golem","☕"],["Slack Salamander","🦎"]],
  boss:["The Quarterly Review","📈","Numbers Are Down. So Is Your HP."]},
 {n:"Frozen Food Aisle",bg:["#1d3f66","#09182b"],acc:"#8ee8ff",decor:["❄️","🧊","🥶","🛒"],
  intro:"Aisle 9. Frozen foods. The freezers hum a song you vaguely recognize. Something in the back is thawing. Something that was never alive. Yet.",
  mobs:[["Freezer Burn Fiend","🥶"],["Ice Cream Wraith","🍦"],["Frostbitten Broccoli","🥦"],["Penguin Stock Boy","🐧"],["Hostile Snowman","⛄"],["Rogue Ice Tray","🧊"]],
  boss:["The Pot Pie Colossus","🥧","Serves 4. Eats 5."]},
 {n:"Cloud Kingdom Timeshare",bg:["#33508a","#101c3c"],acc:"#fff3a8",decor:["☁️","⛅","🪽","🎫"],
  intro:"Free brunch! Just sit through a 90 minute presentation. The cherubs are very pushy. Their handshakes are suspiciously firm. Do not sign anything.",
  mobs:[["Pushy Cloud Salesman","☁️"],["Cherub in a Vest","😇"],["Harpy Concierge","🦅"],["Lightning Intern","⚡"],["Seagull Gatekeeper","🐦"],["Free Brunch Mimic","🥐"]],
  boss:["Zeus, Timeshare Closer","🌩️","Today Only: Eternal Damnation 20% Off"]},
 {n:"Haunted Airport",bg:["#2b2f4d","#0d0f22"],acc:"#c9a8ff",decor:["✈️","🧳","🛄","🪪"],
  intro:"Your flight has been delayed. Forever. The gate agent is a ghost. The luggage carousel is a portal. The overpriced water bottle is a demon.",
  mobs:[["Possessed Luggage","🧳"],["Lost-Baggage Poltergeist","👻"],["Delayed Phoenix","🦅"],["Pilot Zombie","🧟"],["TSA Gargoyle","🗿"],["Overpriced Water","🥤"]],
  boss:["The Terminal Overlord","🛬","Final Boarding Call"]},
 {n:"Data Center of Doom",bg:["#0f3b3f","#041416"],acc:"#19ffd6",decor:["💾","🖥️","📡","🔌"],
  intro:"The servers have woken up. They have opinions. Mostly about you. The admin password is still 'password'. They changed it to 'password1'.",
  mobs:[["Rogue Chatbot","🤖"],["Floppy Disk Revenant","💾"],["Blue Screen Beast","🖥️"],["Glitch Gremlin","👾"],["Extension Cord Serpent","🔌"],["Spam Swarm","📧"]],
  boss:["The Mainframe","🖥️","Have You Tried Turning Yourself Off?"]},
 {n:"Customer Service Hell",bg:["#5a2038","#220811"],acc:"#ff4d6d",decor:["📞","⭐","🧾","🪑"],
  intro:"Your call is important to us. Please hold. Please continue to hold. The hold music is the screams of the damned. It's a banger.",
  mobs:[["Hold Music Banshee","📞"],["Entitled Customer","😡"],["Reply-All Horror","📧"],["Receipt Gremlin","🧾"],["Manager Summoner","🧑‍💼"],["Mimic Office Chair","🪑"]],
  boss:["The Customer (Always Right)","👑","I Want A Refund For This Dungeon"]},
 {n:"The Dragon's Vault & Associates",bg:["#5a4410","#201602"],acc:"#ffd447",decor:["💰","⚖️","📜","🏦"],
  intro:"The final vault. Gold stacked to the ceiling, lawyers in the shadows. The CEO is a dragon. The dragon is also the legal department.",
  mobs:[["Dragonling Intern","🐉"],["Gold Mimic","💰"],["Legal Department","⚖️"],["T-Rex Shareholder","🦖"],["Compliance Wyrm","🐲"],["Hostile Takeover","🏦"]],
  boss:["Draconis Maximus, CEO","🐉","Synergy Will Be Your Doom"]},
 {n:"Overtime Dimension",bg:["#401060","#10021c"],acc:"#ff2fd0",decor:["⏰","🌀","♾️","☕"],
  intro:"The dungeon never ends. The clocks run backwards. Everyone is 'just finishing up one thing'. This is the Overtime Dimension. Welcome. You live here now.",
  mobs:[["Unpaid Overtime Spirit","🌀"],["Meeting That Could Have Been An Email","📆"],["Eternal Intern","🧟"],["Deadline Demon","⏰"],["Open Floor Plan Horror","🪟"],["Mandatory Fun Mascot","🤡"]],
  boss:["The Eternal Stand-Up","🕰️","It's Only Fifteen Minutes (It's Not)"]}
];

const CLS={
 brawler:{n:"Brawler",e:"🥊",dps:1,hp:1,cost:60,aggro:1,d:"Punches things. Reliably mediocre."},
 tank:{n:"Tank",e:"🛡️",dps:.35,hp:3.2,cost:80,aggro:4,d:"Soaks hits. Draws 4× aggro. Smells like metal."},
 archer:{n:"Archer",e:"🏹",dps:1.35,hp:.6,cost:70,aggro:1,d:"Stays back. Judges you from a distance."},
 mage:{n:"Mage",e:"🧙",dps:2.1,hp:.45,cost:95,aggro:1,d:"Glass cannon. Mostly glass."},
 healer:{n:"Healer",e:"🩹",dps:.25,hp:.8,cost:85,aggro:1,d:"Heals the wounded. Mostly yells 'STAND IN THE LIGHT'."},
 rogue:{n:"Rogue",e:"🥷",dps:1.15,hp:.7,cost:90,aggro:1,d:"+12% gold while alive. Not a thief. (Thief.)"},
 bard:{n:"Bard",e:"🎸",dps:.3,hp:.8,cost:90,aggro:1,d:"+10% Knight tap damage while alive. Plays only one song."},
 gambler:{n:"Gambler",e:"🎲",dps:1.2,hp:.7,cost:100,aggro:1,d:"Wildly random damage. 5% chance of a 5× gold JACKPOT."}
};

const UPS=[
 {id:"sword",n:"Sword Training",i:"⚔️",b:10,g:1.4,d:l=>"Tap damage ×"+fmt(Math.pow(1.07,l)*Math.pow(2,Math.floor(l/25))),note:"Bonus ×2 every 25 levels"},
 {id:"auto",n:"Intern Squire",i:"🧑‍🔧",b:120,g:1.5,max:30,d:l=>(0.5*l).toFixed(1)+" auto-taps per second"},
 {id:"crit",n:"Lucky Swings",i:"🎯",b:60,g:1.4,max:60,d:l=>(3+l)+"% base crit chance"},
 {id:"critdmg",n:"Ouch Multiplier",i:"💥",b:90,g:1.4,d:l=>"Crits deal ×"+(2+0.15*l).toFixed(2)},
 {id:"gold",n:"Aggressive Haggling",i:"💰",b:40,g:1.4,d:l=>"+"+(6*l)+"% gold from everything"},
 {id:"vit",n:"Cardio (Allegedly)",i:"❤️",b:50,g:1.3,d:l=>"Knight max HP "+fmt(60*Math.pow(1.1,l))},
 {id:"armor",n:"Padded Underwear",i:"🩲",b:80,g:1.4,max:60,d:l=>"-"+l+"% damage taken by everyone"},
 {id:"luck",n:"Rabbit's Foot (Ethically Sourced)",i:"🐰",b:150,g:1.4,max:80,d:l=>"+"+(10*l)+"% loot drop chance & quality"}
];

const SKS=[
 {id:"slash",n:"Power Slash",i:"🗡️",u:0,cd:8,g:1.5,d:l=>"A mighty swing: "+(12+4*l)+"× tap damage"},
 {id:"cry",n:"Motivational Speech",i:"📣",u:5,cd:45,dur:12,g:1.55,d:l=>"All damage ×"+(1.5+0.1*l).toFixed(1)+" for 12s"},
 {id:"cash",n:"Golden Handshake",i:"🤝",u:12,cd:60,dur:15,g:1.6,d:l=>"Gold ×"+(2+0.2*l).toFixed(1)+" for 15s"},
 {id:"meteor",n:"Meteor of Questionable Origin",i:"☄️",u:25,cd:50,g:1.7,d:l=>"Smash for "+(60+20*l)+"× tap damage"},
 {id:"hr",n:"HR Intervention",i:"📋",u:40,cd:90,g:1.8,d:l=>"Revive all fallen heroes & heal "+Math.min(100,50+5*l)+"%"}
];

const PERKS=[
 {id:"pay",n:"Overtime Pay",i:"💵",b:2,max:50,d:l=>"+"+25*l+"% gold"},
 {id:"power",n:"Power Lunch",i:"🥪",b:3,max:50,d:l=>"+"+20*l+"% all damage"},
 {id:"office",n:"Corner Office",i:"🏢",b:10,max:4,d:l=>"+"+l+" guild slots"},
 {id:"nep",n:"Nepotism",i:"🤝",b:3,max:10,d:l=>"Recruits start +"+2*l+" levels"},
 {id:"luck",n:"Four-Leaf Contract",i:"🍀",b:2,max:20,d:l=>"+"+15*l+"% loot chance"},
 {id:"tele",n:"Tele-Commute",i:"🏠",b:2,max:10,d:l=>"Offline cap "+(2+2*l)+"h"},
 {id:"hr",n:"HR Hotline",i:"☎️",b:15,max:1,d:l=>l?"Unlocked: Auto-Revive toggle":"Unlock Auto-Revive for fallen heroes"},
 {id:"elev",n:"Express Elevator",i:"🛗",b:5,max:20,d:l=>"Restart at floor "+(1+5*l)},
 {id:"sign",n:"Signing Bonus",i:"✍️",b:1,max:15,d:l=>"Start runs with "+fmt(l?100*Math.pow(4,l):0)+" gold"}
];

const SLOTS=["weapon","helm","armor","boots","trinket"];
const SLOT_N={weapon:"Weapon",helm:"Headgear",armor:"Armor",boots:"Footwear",trinket:"Trinket"};
const SLOT_I={weapon:"🗡️",helm:"⛑️",armor:"🦺",boots:"🥾",trinket:"🔮"};
const MAIN={weapon:"tap",helm:"dps",armor:"hp",boots:"gold",trinket:"crit"};
const STAT_N={tap:"Tap Damage",dps:"Party Damage",gold:"Gold",hp:"Health",crit:"Crit Chance"};
const BASES={
 weapon:[["Sword","⚔️"],["Frying Pan","🍳"],["Baguette","🥖"],["Foam Hammer","🔨"],["Axe","🪓"],["Cricket Bat","🏏"],["Fishing Rod","🎣"],["Mop","🧹"]],
 helm:[["Helmet","⛑️"],["Bucket","🪣"],["Colander","🥣"],["Traffic Cone","🚧"],["Top Hat","🎩"],["Crown","👑"],["Stew Pot","🍲"]],
 armor:[["Chainmail","🦺"],["Bathrobe","🥋"],["Barrel","🛢️"],["Hoodie","🧥"],["Tuxedo","🤵"],["Cardboard Box","📦"]],
 boots:[["Boots","🥾"],["Crocs","🩴"],["Roller Skates","🛼"],["Flip-Flops","🩴"],["Clogs","👞"],["Heelys","👟"]],
 trinket:[["Amulet","📿"],["Lucky Sock","🧦"],["Keychain","🔑"],["Fidget Spinner","🌀"],["Rubber Duck","🦆"],["Pet Rock","🪨"],["Mood Ring","💍"],["Four-Leaf Clover","🍀"]]
};
const PRE=["Slightly Haunted","Gently Used","Overpriced","Suspiciously Warm","Artisanal","Sentient","Moist","Discount","Mildly Cursed","Extra-Large","Gluten-Free","Probably Legal","Refurbished","Limited Edition","Fancy","Crunchy","Unlicensed","Forbidden","Family-Size","Certified Pre-Owned","Aggressively Shiny","Bootleg","Organic","Weaponized"];
const SUFX=["of Mild Regret","of Questionable Origin","of Dave","of the Third Floor","of Unpaid Overtime","of Plausible Deniability","of Many Warranties","of Bad Decisions","of Quiet Rage","of Last Resort","of Free Shipping","of the Intern","of Pure Spite","of Reasonable Quality","of No Refunds","of Mild Inconvenience"];
const RAR=[{n:"Junk",c:"#8d8aa8",m:.6},{n:"Common",c:"#e8f1ff",m:1},{n:"Fine",c:"#3dffa0",m:1.5},{n:"Rare",c:"#19a8ff",m:2.2},{n:"Epic",c:"#c36bff",m:3.2},{n:"Legendary",c:"#ffb020",m:4.5},{n:"Mythic",c:"#ff2fd0",m:6.5}];
const RW=[38,34,16,8,3.2,.7,.1];
const EXTRA=[0,0,1,1,2,2,3];

const FIRST=["Gerald","Brenda","Dave","Tiffany","Kevin","Mildred","Chad","Ophelia","Bartholomew","Sheila","Todd","Gwendolyn","Hank","Priya","Borislav","Lucinda","Craig","Fatima","Rufus","Nadine","Wilbur","Esmeralda","Doug","Matilda","Barry","Svetlana","Larry","Cordelia","Moe","Xander"];
const LAST=["the Mediocre","the Unpaid","McStabby","von Mild","the Lukewarm","Bigsword","the Adequate","of Accounting","Fumblethumbs","the Unprepared","Ironbutt","Quickfingers","Dungeonwell","the Reasonable","Smashington","the Sixth","No-Relation","Cleaver-Jones","the Replaceable","Hotfoot"];
const TRAITS=["Brings own folding chair","Has never won an argument","Collects teeth. Not their own.","Calls everyone 'chief'","Allergic to dungeons","Afraid of stairs (job requires stairs)","Secretly unionizing","Wrote 'hero' on résumé, nothing else","Narrates their own fights","Brought a casserole","Believes in the power of friendship","Gets lost in one-room dungeons","Insists they're the Chosen One (of three)","Sleeps in armor. Smells like it.","Yells 'FOR GLORY!' at bad moments","Has a podcast about this","Mom is very proud (she's lying)","Doesn't know what swords are for","Dual-wields spoons","Hasn't read the contract"];
const DEATHS=["slipped on a banana peel (the banana was cursed)","tried to high-five the boss","read the terms and conditions mid-fight","stopped to take a selfie","died of dysentery. Classic.","attempted a heroic speech","was too brave for their own good","fell in love with a mimic","walked into a door labeled 'DO NOT WALK INTO'","ate the mystery meat","tripped over their own cape","got distracted by loot","was technically already dead","forgot to dodge","ran out of snacks and morale","tried to reason with it","said 'I'll be right back'","stepped on a LEGO","challenged it to a staring contest","was outvoted"];
const HR=["Reminder: heroes are not eligible for dental.","Please stop naming the rats.","Mandatory fun is scheduled for 3PM. Attendance is mandatory.","Per my last scroll, please stop dying.","Casualties are down 12%. We stopped counting.","'Dying' is not a valid reason for PTO.","Swords must be returned at end of shift. Including the stuck ones.","Employee of the Month: whoever is still alive.","Please do not feed the Mimic. (It's the vending machine. Probably.)","We're a family here. A family with a strict no-refund policy.","Good news: death is covered. Bad news: it's the Tier 3 plan.","Wellness tip: screaming counts as cardio.","Dress code: armor. Business casual armor on Fridays.","Our turnover rate is concerning. Everyone turns over. Into corpses.","The break room fridge was cleaned. Reclaim your lunch from the owlbear.","Reminder: 'Chosen One' is not a job title.","Heroism is just overtime with better lighting.","Team-building exercise: survive.","Please stop looting the company vending machine.","Your 401(k) is invested in a haunted mine.","Today's synergy: hit things, get gold.","Exit interviews are now just wakes.","We value your feedback. Please scream it quietly.","New hire orientation: look behind you.","Reminder: the dungeon is not responsible for lost souls."];
const BOSS_FAIL=["The boss laughed. Then it laughed some more.","Retreat! Strategically. Very strategically.","HR says that was 'a learning experience'.","Nobody saw that. We never speak of it."];
const KNIGHT_KO=["Sir Tapsalot fainted dramatically.","The Knight was told 'maybe next quarter'.","Sir Tapsalot has been politely escorted out."];
