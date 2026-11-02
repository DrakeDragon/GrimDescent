/* ============ STAGE 2: simpler tabs, Tale Book, quests, daily gift, more realms ============ */
/* ---- state helpers ---- */
function stage2Init(){if(!S.mons)S.mons={};if(!S.daily)S.daily={last:"",streak:0};if(!Array.isArray(S.quests))S.quests=[];if(!S.realmsSeen)S.realmsSeen={};questFill();R.s2tab=R.s2tab||"chests"}
const todayStr=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const dayDiff=(a,b)=>Math.round((new Date(b+"T00:00:00")-new Date(a+"T00:00:00"))/864e5);
R.info=R.info||{};
function infoCard(id,icon,title,desc){R.info[id]={icon,title,desc};return id}
ACT.gInfo=d=>{const x=R.info[d.id];if(!x)return;AU.play("ui");modal(`<div class="hdet"><div class="big">${x.icon}</div><div class="mtitle">${x.title}</div><p class="mp">${x.desc}</p></div><div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};

/* ---- Tale Book (collection log) ---- */
function bookCounts(){S.mons=S.mons||{};return{heroes:Object.keys(S.own||{}).length,mons:Object.keys(S.mons).length,pets:Object.keys(S.pets||{}).length}}
function bookBonus(){const c=bookCounts();return Math.min(.3,.002*c.heroes)+Math.min(.2,.001*c.mons)+Math.min(.14,.01*c.pets)}
function noteMonster(e){if(!e||!S.mons)return;const n=e.name.replace(/^Elite /,"");if(!S.mons[n]){S.mons[n]=e.e;R.bookDirty=true}}
ACT.book=()=>{AU.play("ui");R.bookTab=R.bookTab||"heroes";openBook()};
ACT.bookTab=d=>{R.bookTab=d.t;AU.play("ui");openBook()};
function openBook(){const c=bookCounts(),t=R.bookTab||"heroes";let body="";
 if(t==="heroes")body=`<div class="bkgrid">`+CLS_ORDER.map(k=>S.own[k]?`<button class="bk" data-act="hero" data-k="${k}" title="${CLS[k].hero}"><i>${CLS[k].e}</i><small>${shortN(CLS[k].hero)}</small></button>`:`<div class="bk lk"><i>❓</i><small>???</small></div>`).join("")+`</div>`;
 else if(t==="mons"){const names=Object.keys(S.mons);body=names.length?`<div class="bkgrid">`+names.sort().map(n=>`<div class="bk"><i>${S.mons[n]}</i><small>${n}</small></div>`).join("")+`</div>`:`<div class="hint">No monsters recorded yet. Go meet some.</div>`}
 else body=`<div class="bkgrid">`+PETS.map(p=>S.pets[p.id]?`<div class="bk"><i>${p.e}</i><small>${p.n}</small></div>`:`<div class="bk lk"><i>❓</i><small>???</small></div>`).join("")+`</div>`;
 modal(`<div class="mtitle">📚 Tale Book</div><div class="msub">Fill the book to gain permanent damage: <b>+${(bookBonus()*100).toFixed(1)}%</b> now (heroes +0.2% each, monsters +0.1% each, familiars +1% each).</div>
 <div class="seg"><button class="${t==="heroes"?"on":""}" data-act="bookTab" data-t="heroes">🦸 ${c.heroes}/${CLS_ORDER.length}</button><button class="${t==="mons"?"on":""}" data-act="bookTab" data-t="mons">👹 ${c.mons}</button><button class="${t==="pets"?"on":""}" data-act="bookTab" data-t="pets">🐾 ${c.pets}/${PETS.length}</button></div>
 <div class="bkwrap">${body}</div><div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)}

/* ---- Daily gift ---- */
function dailyDue(){S.daily=S.daily||{last:"",streak:0};return S.daily.last!==todayStr()}
function dailyGift(tries){tries=tries||0;if(!R.inGame||!dailyDue())return;if(!$("#modal").classList.contains("hidden")){if(tries<8)setTimeout(()=>dailyGift(tries+1),4000);return}
 const d=S.daily,t=todayStr();d.streak=(d.last&&dayDiff(d.last,t)===1)?d.streak+1:1;d.last=t;const day=((d.streak-1)%7)+1;
 const gold=Math.floor(floorHP(Math.max(5,S.max))*C.goldBase*(15+12*day)),rw=[`🪙 ${fmt(gold)} gold`];S.gold+=gold;S.totalGold+=gold;
 if(day===3||day===5||day===7){const pt=pick(Object.keys(POTS));S.pot[pt]++;rw.push(`${POTS[pt].i} ${POTS[pt].n}`)}
 if(day===4||day===7){S.chestBag.push({t:day===7?"boss":"mini",g:Math.max(S.stage,S.max)});rw.push(`🎁 ${day===7?"Boss":"Mini-boss"} chest (in your Chest Bag)`)}
 if(day===7){S.gems+=2;rw.push("💎 2 gems")}
 saveGame();AU.play("win");
 modal(`<div class="hdet"><div class="big">🎁</div><div class="mtitle">The Fairy Post</div><div class="msub">Day ${day} of 7 · streak ${d.streak}</div></div><div class="dayrow">${[1,2,3,4,5,6,7].map(i=>`<i class="${i<=day?"on":""}">${i===7?"👑":i}</i>`).join("")}</div><div class="statbox">${rw.map(x=>`<div class="srow"><span>${x}</span></div>`).join("")}</div><div class="hint">Come back tomorrow to keep the streak. Day 7 brings the big prize.</div><div class="mbtns"><button class="btn" data-act="close">Thank you, post-fairy</button></div>`);refreshTab()}

/* ---- Quests ---- */
const QTYPES=[{id:"kills",n:"Slay monsters",i:"⚔️",cur:()=>S.kills,need:()=>Math.floor(40+S.max*6)},{id:"bosses",n:"Defeat bosses",i:"👑",cur:()=>S.stats.bosses,need:()=>2+Math.floor(S.max/25)},{id:"taps",n:"Tap the battlefield",i:"👆",cur:()=>S.taps,need:()=>80+S.max*5},{id:"crits",n:"Land critical hits",i:"💥",cur:()=>S.stats.crits,need:()=>30+S.max*3},{id:"loot",n:"Find treasures",i:"🎒",cur:()=>S.stats.loot,need:()=>4+Math.floor(S.max/6)}];
function questNew(){const have=S.quests.map(q=>q.t),pool=QTYPES.filter(q=>!have.includes(q.id)),T=pick(pool.length?pool:QTYPES);
 const rw=pick([{k:"gem",n:1},{k:"pot",n:2},{k:"chest",n:1},{k:"gold",n:1}]);return{t:T.id,start:T.cur(),need:T.need(),rw}}
function questFill(){while(S.quests.length<3)S.quests.push(questNew())}
const qT=id=>QTYPES.find(q=>q.id===id);
const qProg=q=>Math.max(0,qT(q.t).cur()-q.start);
const rwText=r=>r.k==="gem"?"💎 "+r.n+" gem":r.k==="pot"?"🧪 "+r.n+" potions":r.k==="chest"?"🎁 Mini chest":"🪙 Gold pile";
function questTick(){if(!S.quests)return;let done=0;for(const q of S.quests)if(qProg(q)>=q.need)done++;if(done!==R.qDone){R.qDone=done;const b=document.querySelector('[data-t="more"] .dot');}
 if(R.bookDirty){R.bookDirty=false;recalc()}}
ACT.quests=()=>{AU.play("ui");openQuests()};
function openQuests(){questFill();modal(`<div class="mtitle">📜 Storybook Quests</div><div class="msub">Finish a quest, claim the prize, a new one appears.</div>${S.quests.map((q,i)=>{const T=qT(q.t),p=Math.min(q.need,qProg(q)),ok=p>=q.need;return`<div class="qcard ${ok?"ok":""}"><i>${T.i}</i><div class="qi"><b>${T.n}: ${fmt(q.need)}</b><div class="qbar"><u style="width:${p/q.need*100}%"></u></div><small>${fmt(p)}/${fmt(q.need)} · Prize: ${rwText(q.rw)}</small></div>${ok?`<button class="gbuy can" data-act="qClaim" data-i="${i}">CLAIM</button>`:""}</div>`}).join("")}<div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)}
ACT.qClaim=d=>{const q=S.quests[+d.i];if(!q||qProg(q)<q.need)return;const r=q.rw;
 if(r.k==="gem")S.gems+=r.n;else if(r.k==="pot")S.pot[pick(Object.keys(POTS))]+=r.n;else if(r.k==="chest")S.chestBag.push({t:"mini",g:Math.max(S.stage,S.max)});else{const g=Math.floor(floorHP(Math.max(5,S.max))*C.goldBase*120);S.gold+=g;S.totalGold+=g}
 S.quests[+d.i]=questNew();AU.play("win");toast("📜 Quest complete! "+rwText(r),"good");saveGame();openQuests()};

/* ---- generic grid helpers ---- */
const seg=(opts,cur,act)=>`<div class="seg">${opts.map(o=>`<button class="${o[0]===cur?"on":""}" data-act="${act}" data-t="${o[0]}">${o[1]}</button>`).join("")}</div>`;

/* ---- GEAR tab (compact) ---- */
function renderGear(){
 let h=`<div class="hdr"><div class="sec" style="margin:0">Backpack ${S.bag.length}/30</div><button class="mini" data-act="sellJunk">Sell junk</button></div>`;
 h+=S.bag.length?`<div class="grid5">${S.bag.slice().sort((a,b)=>b.r-a.r||iscore(b)-iscore(a)).map(itemBtn).join("")}</div>`:`<div class="hint">Your bag is empty. Monsters carry loot. Don't ask where.</div>`;
 h+=`<div class="sec">Equipped</div>`+S.dep.map(k=>{const hr=S.heroes[k];return`<div class="eqrow"><button class="eqp" data-act="hero" data-k="${k}">${CLS[k].e}</button>${SLOTS.map(sl=>{const it=hr.gear[sl];return it?`<button class="item" style="--rc:${RAR[it.r].c}" data-act="item" data-id="${it.id}"><i>${it.e}</i>${it.lv?`<b>+${it.lv}</b>`:""}</button>`:`<button class="item empty" data-act="emptySlot" data-k="${k}" data-s="${sl}"><i>${SLOT_I[sl]}</i></button>`}).join("")}</div>`}).join("");
 return h+`<div class="hint">Tap a piece to enhance or swap it. Tap a portrait for the hero page. Auto-equip is in Settings.</div>`;
}

/* ---- SHOP tab (sub-tabs + cards) ---- */
ACT.shopTab=d=>{R.s2tab=d.t;AU.play("ui");renderTab()};
function renderShop(){
 const t=R.s2tab||"chests";let h=`<div class="chiprow"><span class="chip">🎁 ${S.chestBag.length}</span><span class="chip">💎 ${S.gems}</span></div>`+seg([["chests","🎁 Chests"],["supplies","🧪 Supplies"],["gems","💎 Gems"]],t,"shopTab");
 const bt=[];if(S.bt.ticket>0)bt.push("🥚 Gold ×2 · "+fmtTime(S.bt.ticket));if(S.bt.pre>0)bt.push("🍺 Damage ×1.1 · "+fmtTime(S.bt.pre));
 if(t==="chests"){h+=chestBagRow();const c=lockboxCost();h+=`<div class="ggrid"><div class="gcard" data-act="gInfo" data-id="${infoCard("box","📦","Lockbox","Fine+ gear for your whole squad, gold and a supply. No gems inside.")}"><i>📦</i><b>Lockbox</b><em>Fine+ gear</em><button class="gbuy ${S.gold>=c?"can":""}" data-act="buyBox" data-cost="${c}">🪙${fmt(c)}</button></div></div>`}
 else if(t==="supplies"){if(bt.length)h+=`<div class="goal">${bt.join(" · ")}</div>`;
  h+=`<div class="ggrid">`+Object.keys(POTS).map(k=>{const p=POTS[k],c=potPrice();return`<div class="gcard" data-act="gInfo" data-id="${infoCard("p"+k,p.i,p.n,p.d+". Lasts "+POT_DUR/60+" minutes.")}"><i>${p.i}</i><b>${p.n.replace("Potion of ","")}</b><em>×${S.pot[k]}</em><button class="gbuy ${S.gold>=c?"can":""}" data-act="buyPot" data-t="${k}" data-cost="${c}">🪙${fmt(c)}</button></div>`}).join("")+UTILS.map(u=>{const n=S.inv[u.id]||0,c=utilPrice(u.id);return`<div class="gcard" data-act="gInfo" data-id="${infoCard("u"+u.id,u.i,u.n,u.d)}"><i>${u.i}</i><b>${u.n}</b><em>×${n}</em>${n?`<button class="gbuy can" data-act="useUtil" data-id="${u.id}">USE</button>`:""}<button class="gbuy ${S.gold>=c?"can":""}" data-act="buyUtil" data-id="${u.id}" data-cost="${c}">🪙${fmt(c)}</button></div>`}).join("")+`</div>`}
 else{h+=`<div class="hint" style="margin-top:6px">Gems drop from big bosses (stage 10 of each area).</div><div class="ggrid">`+GEMS.map(g=>{const l=gemU(g.id),maxed=g.max!==undefined&&l>=g.max,c=g.cost(l),d=typeof g.d==="function"?g.d(Math.max(1,l)):g.d;return`<div class="gcard" data-act="gInfo" data-id="${infoCard("g"+g.id,g.i,g.n,d)}"><i>${g.i}</i><b>${g.n}</b><em>${g.max?"Lv "+l+"/"+g.max:"&nbsp;"}</em>${maxed?'<div class="gmax">MAX</div>':`<button class="gbuy ${S.gems>=c?"can":""}" data-act="buyGem" data-id="${g.id}">💎${c}</button>`}</div>`}).join("")+`</div>`}
 return h+`<div class="hint">Tap a card for details, tap its button to buy.</div>`}

/* ---- MAP tab (compact) ---- */
ACT.campPick=()=>{AU.play("ui");modal(campBar()+`<div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};
function renderMap(){
 const ai=areaIdx(S.stage),rl=realmOf(S.stage),maxA=areaIdx(S.max),hz=hazardOf(ai*10);
 let h=`<div class="chiprow"><button class="chip" data-act="campPick">📚 ${CAMPS[S.camp].i} ${S.camp+1}/${CAMPS.length}</button><span class="chip">🧱 ${Math.floor(wallStage())+1}</span><span class="chip">⛔ ${hardStage()+1}</span><button class="chip" data-act="wxguide">☁️</button><button class="chip" data-act="codex">📖</button><button class="chip" data-act="mapJump">🎯</button></div>`;
 h+=`<div class="sec" style="margin:2px 0 4px">Area ${ai+1}: ${rl.n}</div><div class="hint" style="margin:0 0 6px">${(rl.wx||[]).map(w=>WXD[w].i).join(" ")} ${hz?" · "+hz.i+" "+hz.n:""}</div>`;
 h+=`<div class="stg10">${[0,1,2,3,4,5,6,7,8,9].map(i=>{const g=ai*10+i;return`<button class="${g<S.max?"cl":""} ${g===S.stage?"cur":""} ${g>S.max?"lk":""} ${i===9||i===4?"boss":""}" data-act="goStage" data-g="${g}">${i===9?"👑":i===4?"⚔️":i+1}</button>`}).join("")}</div>`;
 if(R.mapBase==null)R.mapBase=Math.max(0,ai-1);const base=R.mapBase;
 h+=`<div class="hdr"><div class="sec" style="margin:0">Areas</div><div class="qty"><button data-act="mapPage" data-d="-50">⏪</button><button data-act="mapPage" data-d="-6">◀</button><button data-act="mapPage" data-d="6">▶</button><button data-act="mapPage" data-d="50">⏩</button></div></div><div class="rgrid">`;
 for(let a=base;a<base+6;a++){const r=realmOf(a*10),lock=a>maxA&&a*10>S.max,cl=Math.min(10,Math.max(0,S.max-a*10)),far=a>maxA+1;
  h+=`<button class="realm ${lock?"locked":""} ${a===ai?"cur":""}" style="--rc:${r.acc};--r1:${r.bg[0]};--r2:${r.bg[1]}" data-act="goStage" data-g="${a*10}"><div class="rtop"><b>${far?"Area "+(a+1)+": ???":(a+1)+". "+r.n}</b><span>${cl}/10</span></div><small>${lock?"Keep marching.":r.boss[1]+" "+r.boss[0]}</small><div class="rbar"><i style="width:${cl*10}%"></i></div></button>`}
 return h+`</div>`}
ACT.mapPage=d=>{R.mapBase=Math.max(0,(R.mapBase||0)+(+d.d));AU.play("ui");renderTab()};

/* ---- MORE tab ---- */
function renderMore(){
 const qd=(S.quests||[]).filter(q=>qProg(q)>=q.need).length;
 return`<div class="grid2">
 <button class="mbig" data-act="restr"><i>📖</i><b>Rewrite the Tale</b><small>${S.so} Wishes${canRestructure()?" · +"+soGain()+" ready":""}</small></button>
 <button class="mbig" data-act="quests"><i>📜</i><b>Quests</b><small>${qd?qd+" ready to claim!":"3 active"}</small></button>
 <button class="mbig" data-act="book"><i>📚</i><b>Tale Book</b><small>+${(bookBonus()*100).toFixed(1)}% damage</small></button>
 <button class="mbig" data-act="achs"><i>🏅</i><b>Achievements</b><small>${Object.keys(S.ach).length}/${ACH.length}</small></button>
 <button class="mbig" data-act="stats"><i>📊</i><b>Statistics</b><small>Numbers go up</small></button>
 <button class="mbig" data-act="settings"><i>⚙️</i><b>Settings</b><small>Sound & saves</small></button>
 <button class="mbig" data-act="howto"><i>❓</i><b>How to Play</b><small>Storyteller's handbook</small></button>
 <button class="mbig" data-act="credits"><i>🎬</i><b>Credits</b><small>Blame assignment</small></button>
 <button class="mbig wide" data-act="quit"><i>🚪</i><b>Quit to Title</b><small>Progress is saved automatically</small></button></div>`}

/* ---- refreshed handbook ---- */
const HOWTO2=`<div class="mtitle">❓ Storyteller's Handbook</div><div class="how">
<p><b>1. MARCH.</b> Your squad walks right, monsters walk left. Heroes fight on their own. Tap the battlefield to smash the nearest monster (optional, helps).</p>
<p><b>2. HEROES.</b> Tap ⬆ under a portrait to gain a level. Tap the portrait for bio, gear, milestones and swapping. Every 10 levels is a named milestone; heroes evolve at Lv 25, 60 and 120.</p>
<p><b>3. FORMATION.</b> Eight seats, one hero each. Pay to unlock new seats as you go deeper. New heroes arrive through Recruitment Events (weekly, after bosses, or with gems). Matching tags create synergy links.</p>
<p><b>4. CHARMS.</b> Spells for the skill bar and permanent boons. The 🧚 Auto-Fairy (stage 11+) buys hero levels, seats and boons for you. It never buys familiars or chests.</p>
<p><b>5. CHESTS &amp; SHOP.</b> Bosses drop chests; tap within 5 seconds or they go to your Chest Bag. Open them in the Shop. Potions give +10% damage, +10% speed or healing for 3 minutes.</p>
<p><b>6. FAMILIARS.</b> Hatch eggs from stage 3 and equip them. Duplicates level up automatically.</p>
<p><b>7. QUESTS, BOOK &amp; POST.</b> Finish quests for prizes. The Tale Book rewards collecting heroes, monsters and familiars with permanent damage. The Fairy Post brings a daily gift (day 7 is the big one).</p>
<p><b>8. WALLS.</b> Around stage 56 monsters grow brutally; a hard cap blocks you shortly after. <b>Rewrite the Tale</b> (stage 21+) for permanent Wishes that raise both and add damage and gold. Each campaign keeps its own Wishes. Going very deep takes a great many rewrites.</p>
<p><b>9. WEATHER &amp; HAZARDS.</b> Weather helps or hurts elements; hazards are halved by an ally with the matching tag.</p><p>Don't feed the Mimic. Don't eat the cottage.</p></div><div class="mbtns"><button class="btn" data-act="close">Once upon a time</button></div>`;
ACT.howto=()=>{AU.play("ui");modal(HOWTO2)};

/* ---- MORE REALMS: 8 new fairytale themes, cleaned-up old ones ---- */
(function(){
 const fix=(id,o)=>{const t=THEMES.find(x=>x.id===id);if(t)Object.assign(t,o)};
 fix("office",{places:["Throne Hall","Counting Room","Scriptorium","Royal Archive","Chancery","Court Corridor"],decor:["📜","🕯️","🪑","🪶"]});
 fix("factory",{places:["Clockwork Foundry","Gear Hall","Toymaker's Floor","Bellows Room","Scrapyard","Cog Cellar"],decor:["⚙️","🔩","🕰️","🛠️"]});
 fix("city",{places:["Old Town","Alley of Doors","Cobbled Bridge","Market Square","Clocktower","Gallows Row"]});
 const N=[
 {id:"briar",sky:["#2a1a3a","#0c0614"],acc:"#ff5a8a",sil:"deadtrees",el:"nature",wx:["fog","rain","wind"],decor:["🥀","🌹","🕸️","🦇"],places:["Briar Hedge","Thorn Maze","Rose Tangle","Bramble Gate","Sleeping Garden","Spindle Path"],mobs:[["Thorn Wraith","🥀"],["Briar Hound","🐕"],["Spindle Spider","🕷️"],["Rose Sprite","🌹"],["Hedge Knight","🛡️"],["Slumber Moth","🦋"],["Bramble Beast","🐗"],["Sleeping Guard","😴"]],boss:[["Thorn Queen","🥀"],["Hedge Dragon","🐉"],["Spindle King","🧌"],["Hundred-Year Hag","🧙‍♀️"]]},
 {id:"glass",sky:["#2b4a6a","#0a1a2a"],acc:"#a8f0ff",sil:"crystals",el:"ice",wx:["snow","fog","clear"],decor:["🪟","💎","🔮","✨"],places:["Glass Hill","Mirror Slope","Shard Summit","Frost Pane","Crystal Stairs","Slippery Heights"],mobs:[["Glass Golem","💎"],["Mirror Shade","🪞"],["Shard Sprite","✨"],["Slip Imp","👺"],["Glass Hound","🐕"],["Reflection","👤"],["Prism Moth","🦋"],["Frost Knight","🛡️"]],boss:[["Glass Giant","🧊"],["Shatter Queen","👸"],["Mirror Dragon","🐲"],["Hill Troll","🧌"]]},
 {id:"goblin",sky:["#3a2a1a","#150c05"],acc:"#ffb020",sil:"bldg",el:"none",wx:["clear","fog","rain"],decor:["🕯️","🧺","🪙","🎪"],places:["Goblin Market","Bargain Alley","Peddler's Row","Lantern Lane","Fruit Stalls","Haggle Square"],mobs:[["Goblin Peddler","👺"],["Fruit Mimic","🍎"],["Coin Imp","🪙"],["Lantern Ghoul","🏮"],["Rug Rat","🐀"],["Haggling Hag","🧙‍♀️"],["Cart Brute","🧌"],["Pickpocket Pixie","🧚"]],boss:[["Goblin King","👑"],["Market Matron","🧙‍♀️"],["Fruit Colossus","🍇"],["Mimic Prince","📦"]]},
 {id:"moon",sky:["#14204a","#05081a"],acc:"#d8e6ff",sil:"planets",el:"arcane",wx:["eclipse","clear","meteor"],decor:["🌙","⭐","🪐","🦉"],places:["Moon Palace","Silver Court","Star Stairs","Lunar Garden","Dream Terrace","Owl Tower"],mobs:[["Moon Moth","🦋"],["Silver Hare","🐇"],["Star Sprite","⭐"],["Night Owl","🦉"],["Lunar Knight","🛡️"],["Dream Weaver","🕷️"],["Cloud Mare","🐴"],["Moonbeam Wisp","✨"]],boss:[["Moon Queen","🌙"],["Silver Stag","🦌"],["Star Eater","🐲"],["Owl Emperor","🦉"]]},
 {id:"ginger",sky:["#7a3a1a","#2a1006"],acc:"#ffcf7a",sil:"candy",el:"fire",wx:["clear","heat","rain"],decor:["🍪","🍬","🍭","🏠"],places:["Gingerbread Village","Sugar Lane","Icing Rooftops","Syrup Spring","Cookie Cottage","Bakery Hill"],mobs:[["Gingerbread Guard","🍪"],["Gumdrop Goblin","🍬"],["Licorice Snake","🐍"],["Candy Cane Knight","🍭"],["Meringue Wraith","👻"],["Pie Crust Brute","🥧"],["Sugar Rat","🐀"],["Cake Slice Slime","🍰"]],boss:[["House Mimic","🏠"],["Marzipan Matron","🧙‍♀️"],["Sugar Dragon","🐉"],["Oven Demon","😈"]]},
 {id:"pumpkin",sky:["#4a2a0a","#150a02"],acc:"#ff8a2a",sil:"barns",el:"nature",wx:["fog","wind","rain","clear"],decor:["🎃","🌾","🕯️","🦇"],places:["Pumpkin Patch","Harvest Fields","Cornmaze","Scarecrow Hill","Hollow Barn","Midnight Orchard"],mobs:[["Jack-o'-Lantern","🎃"],["Straw Sentry","🌾"],["Crow","🐦‍⬛"],["Cornhusk Ghoul","🌽"],["Hayfork Imp","👹"],["Pitchfork Mob","🔱"],["Cider Slime","🍎"],["Harvest Witch","🧙‍♀️"]],boss:[["Pumpkin King","🎃"],["Scarecrow Lord","👑"],["Harvest Moon Hag","🌕"],["Headless Rider","🐴"]]},
 {id:"kitchen",sky:["#1a3a1a","#050f05"],acc:"#7aff5a",sil:"houses",el:"arcane",wx:["smog","fog","thunder"],decor:["🧪","🍲","🕸️","🧹"],places:["Witch's Kitchen","Cauldron Room","Larder","Herb Cellar","Spice Closet","Boiling Pot"],mobs:[["Stew Slime","🟢"],["Cauldron Imp","👹"],["Broom Beast","🧹"],["Toad Familiar","🐸"],["Ladle Knight","🥄"],["Bone Broth Ghoul","🍲"],["Newt Swarm","🦎"],["Spellbook Mimic","📕"]],boss:[["Kitchen Crone","🧙‍♀️"],["Cauldron Colossus","🍲"],["Oven Mother","🔥"],["Poison Chef","👨‍🍳"]]},
 {id:"well",sky:["#0a3a5a","#02101f"],acc:"#5afff0",sil:"waves",el:"storm",wx:["rain","thunder","fog"],decor:["🧜‍♀️","🐚","🪸","🫧"],places:["Wishing Well","Sunken Lagoon","Pearl Grotto","Mermaid Cove","Siren Rocks","Tide Pools"],mobs:[["Siren","🧜‍♀️"],["Pearl Crab","🦀"],["Drowned Sailor","🧟"],["Well Wisp","👻"],["Eel Maiden","🐍"],["Coral Golem","🪸"],["Bubble Imp","🫧"],["Wish Fish","🐟"]],boss:[["Siren Queen","🧜‍♀️"],["Well Mother","🧙‍♀️"],["Leviathan Pup","🐋"],["Wishmaker","🧞"]]}];
 N.forEach(t=>{if(!THEMES.find(x=>x.id===t.id))THEMES.push(t)});
 BEATS.push(
 "A lantern floats by with no one holding it. {h4} follows it for a mile. It leads, as lanterns do, straight into trouble.",
 "{h2} finds a shoe in the road. {h5} warns that it's a trap. It is. It is also a very nice shoe.",
 "{h6} tells the group a story to pass the night. It has a happy ending, which makes everyone deeply suspicious.",
 "The party's shadows slip ahead of them, whispering. {h0} stamps on his own. It stays quiet for a while.",
 "{h3} cooks soup for the whole party. {h7} checks it for poison. {h1} checks the cook for poison. The soup is perfect.",
 "A bridge appears where none was before. A troll appears where none was before. {h7} negotiates. The troll cries.",
 "{V} sends a raven with a polite threat. {h5} sends it back with a rude answer and a feather missing.",
 "The wind carries a lullaby. Half the party yawns. {h0} shouts, {h4} burns a candle, and the lullaby stops, offended.",
 "{h1} wins a staring contest with an owl. The owl is a bishop. Nobody asks how.",
 "Seven crows sit on a gate and count the party. They get a different number every time, and each makes {h2} nervous.",
 "A wishing well in the woods. {h7} drops a coin. {h3} pulls the coin out of the well with a very long stick.",
 "{h0} dreams of a happy ending. He wakes with the taste of apple in his mouth and absolutely no memory of eating one.",
 "A map arrives in the mail, drawn in a child's hand. It points to a cottage. {h5} burns it. It arrives again tomorrow.",
 "{h4} breaks a spell and the forest sighs. The sigh is not a grateful sigh.",
 "{h6} finds a mirror in a ditch. It says '{T}' in {V}'s voice. {h6} throws it in the river. The river does not mind.",
 "Footprints in the snow that stop in the middle of a field. {h2} follows them anyway. They stop being footprints, quite suddenly.",
 "The party sleeps in turns. {h1} wakes to find every shoe on the wrong foot. She decides not to investigate.",
 "{h3} sews a pocket into every cloak. It is the single most useful thing anyone does this week.",
 "A talking cat offers directions for a price. {h7} pays. The cat lies. {h7} is thrilled; he loves a good lie.",
 "{V}'s voice rolls through the trees: '{T}' {h0} replies with a salute. The trees applaud, very quietly, in fear.",
 "The road forks. One way says 'Home'. The other says 'Also Home'. {h4} picks the one that smells less of smoke.",
 "{h5} trades a button for a secret. The secret is: 'Don't trade buttons.' He feels cheated and enlightened.",
 "An old woman asks for help carrying a sack. The sack asks for help too. {h2} carries both. They are both heavy.",
 "{h6} hums a tune. The forest hums back. {h0} would like everyone to stop humming, immediately.");
 const old=" & Associates";
})();
/* hooks used by core/battle */
