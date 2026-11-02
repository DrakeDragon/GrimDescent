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
 {id:"cave",sky:["#2d2347","#120c24"],acc:"#d9a441",sil:"stalac",el:"none",wx:["clear","fog","smog"],decor:["🕸️","🪨","🦇","🕯️"],places:["Caverns","Grotto","Hollow","Depths","Burrows","Tunnels"],mobs:[["Cave Rat","🐀"],["Bat","🦇"],["Spider","🕷️"],["Slime","🟢"],["Shroom","🍄"],["Mole","🦫"],["Rock Golem","🪨"],["Eyeball","👁️"]],boss:[["Stone Troll","🧌"],["Cave Dragon","🐉"],["Broodmother","🕷️"],["Cave Lich","💀"]]},
 {id:"forest",sky:["#1d4a2a","#0a2012"],acc:"#8fbf7a",sil:"trees",el:"nature",wx:["rain","fog","wind","clear"],decor:["🌲","🍄","🪵","🦋"],places:["Woods","Thicket","Grove","Glade","Canopy","Understory"],mobs:[["Wolf","🐺"],["Boar","🐗"],["Treant","🌳"],["Snake","🐍"],["Frog","🐸"],["Owl","🦉"],["Bear","🐻"],["Beetle","🪲"]],boss:[["Ancient Stag","🦌"],["Forest Wyrm","🐲"],["Great Oak","🌳"],["Bear King","🐻"]]},
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
 {id:"office",sky:["#2a3a5a","#0c1220"],acc:"#d9a441",sil:"bldg",el:"none",wx:["clear","fog","confetti","smog"],decor:["📎","🖨️","☕","🪑"],places:["Cubicles","Break Room","Boardroom","Server Closet","Parking Garage","Open-Plan Office"],mobs:[["Stapler","📎"],["Cubicle Zombie","🧟"],["Intern","🧑‍💼"],["Manager","👔"],["Printer","🖨️"],["Coffee Golem","☕"],["Spreadsheet Beast","📊"],["Fax Machine","📠"]],boss:[["CEO Hydra","🐍"],["HR Dragon","🐉"],["Quarterly Report","📊"],["Mega Meeting","🗓️"]]},
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
 const suf=rnd()<.18?pick2(rnd,[" of Sorrows"," (Haunted Edition)"," Forever"," of the Ninth Night"," (Closed by Royal Decree)"]):"";
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
