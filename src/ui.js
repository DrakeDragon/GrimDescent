const PORTRAIT_KEYS=['knight','archer','barbarian','healer','mage','rogue','bard','alchemist'];
const SEA_PORTRAITS=['colossus','crossbowman','ronin','druid','storm','pickpocket','engineer','collector'];
const BEAN_PORTRAITS=['templar','gunslinger','monk','sunpriest','frost','assassin','manager','fate'];
const COURT_PORTRAITS=['paladin','ranger','berserker','cleric','pyromancer','duelist','chrono','gambler'];
function heroPortrait(k){const expanded=expansionPortrait(k);if(expanded)return expanded;if(k==="bouncer")return `<span class="hero-portrait gate-portrait" role="img" aria-label="The Iron-Toothed Gatekeeper"></span>`;let i=PORTRAIT_KEYS.indexOf(k),court=false;if(i<0){i=COURT_PORTRAITS.indexOf(k);court=true;}let bean=false;if(i<0){i=BEAN_PORTRAITS.indexOf(k);bean=true;}let sea=false;if(i<0){i=SEA_PORTRAITS.indexOf(k);sea=true;}if(i<0)return '<span class="hero-monogram">'+CLS[k].hero.replace(/^The /,'').split(' ').slice(0,2).map(x=>x[0]).join('')+'</span>';return `<span class="hero-portrait ${sea?'sea-portrait':bean?'bean-portrait':court?'court-portrait':''}" role="img" aria-label="${CLS[k].hero}" style="--px:${(i%4)*100/3}%;--py:${i<4?0:100}%"></span>`;}
function campaignBanner(c){const world=CAMPAIGN_WORLDS[c];if(world)return `<div class="campaign-art campaign-world-art" role="img" aria-label="${CAMPS[c].n}" style="background-image:url('assets/${world.key}-background.png')"></div>`;return `<div class="campaign-art" role="img" aria-label="${CAMPS[c].n}" style="--cx:${c%2?100:0}%;--cy:${Math.floor(c/2)*25}%"></div>`;}
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
function modal(html,pause){$("#mbody").innerHTML=html;polishUi($("#mbody"));$("#modal").classList.remove("hidden");$("#app").classList.toggle("game-paused",!!pause);R.modalPause=!!pause}
function closeModal(){$("#modal").classList.add("hidden");$("#app").classList.remove("game-paused");R.modalPause=false;if(R.inGame)renderTab()}
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
 $("#gold").textContent=fmt(S.gold);$("#dps").textContent=fmt(teamDps())+" active dmg/s · "+activeHeroKeys().length+"/"+S.dep.length;
 $("#soHud").innerHTML=S.soTotal?uiIcon(19)+" "+S.soTotal:"";
}
function skillbarSignature(){return SLOT_ORDER.map(id=>{const k=S.seat[id],h=k&&S.heroes[k];return k+':'+(h?h.lvl:0);}).join('|');}
function renderSkillbar(){
 $('#skillbar').innerHTML=SLOT_ORDER.map(id=>{const k=S.seat[id],h=k&&S.heroes[k],c=k&&CLS[k];return '<button class="sk hero-skill '+(!h||h.sp<1?'locked':'')+'" data-act="skill" data-id="'+(k||id)+'" title="'+(c?c.hero+' — '+c.sp.n:SLOT_BY_ID[id].n)+'">'+(c?'<i>'+heroPortrait(k)+'</i><b>'+shortN(c.hero)+'</b><em>'+ (h.sp?'Special '+h.sp:'Hero Lv 5')+'</em>':'<i>'+uiIcon(14)+'</i><b>'+SLOT_BY_ID[id].n+'</b><em>Seat locked</em>')+'<div class="cdo"></div></button>';}).join('');R.skillbarSignature=skillbarSignature();updSkillCd();
}
function updSkillCd(){
 if(R.skillbarSignature!==skillbarSignature()){renderSkillbar();return;}
 for(const id of SLOT_ORDER){const k=S.seat[id],b=$('.sk[data-id="'+(k||id)+'"]');if(!b)continue;const h=(R.team||[]).find(x=>x.k===k),owned=k&&S.heroes[k],cd=h?h.scd:0,locked=!owned||owned.sp<1,down=!!h&&h.down,o=b.querySelector('.cdo');
 o.style.height=cd>0?Math.min(100,cd/heroSkillCooldown(k)*100)+'%':'0';o.textContent=down?'FALLEN':locked?'':cd>0?Math.ceil(cd):'';if(down)o.style.height='100%';
 b.classList.toggle('ready',!locked&&!down&&cd<=0);b.classList.toggle('fallen',down);b.classList.toggle('locked',locked);b.setAttribute('aria-label',k?CLS[k].hero+': '+CLS[k].sp.n+(down?', fallen':cd>0?', '+Math.ceil(cd)+' seconds':', ready'):SLOT_BY_ID[id].n+' seat locked');}
}
ACT.skill=d=>{const k=d.id;if(!CLS[k]||!S.heroes[k]){toast('Unlock this formation seat in Heroes.','memo');return;}if(S.heroes[k].sp<1){openSkill(k);return;}if(!useHeroSkill(k)){const h=(R.team||[]).find(x=>x.k===k);toast(h&&h.down?'A fallen hero cannot use their special.':'The skill needs a ready hero and a valid battle target.','memo');}updSkillCd();};
function openSkill(k){const c=CLS[k],h=S.heroes[k];if(!c)return;modal('<div class="hdet"><div class="big">'+heroPortrait(k)+'</div><div class="mtitle">'+c.sp.n+'</div><div class="msub">'+c.hero+' · Special '+(h?h.sp:0)+'</div><p class="mp">'+c.sp.d.replace('POW','hero power')+'</p><p class="mp">Unlocks at hero level 5 and improves with hero upgrades. Cooldown '+heroSkillCooldown(k).toFixed(1)+'s. Manual activation and Auto Fairy share this timer. A fallen hero cannot cast.</p></div><div class="mbtns"><button class="btn" data-act="close">Close</button></div>');}
ACT.skInfo=d=>openSkill(d.id);

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
function renderTabs(){$("#tabs").innerHTML=TABS.map(t=>`<button class="tabbtn ${tab===t[0]?"on":""}" data-act="tab" data-t="${t[0]}"><i>${uiIcon(TABS.findIndex(x=>x[0]===t[0]))}</i><span>${t[2]}</span><u class="dot hidden" id="dot-${t[0]}"></u></button>`).join("")}
function renderTab(){const p=$("#panel"),st=p.scrollTop;const fn={orders:renderOrders,shop:renderShop,heroes:renderHeroes,gear:renderGear,pets:renderPets,map:renderMap,more:renderMore}[tab];const headings={heroes:["The Fellowship","Survivors, companions and unlikely legends.",0],orders:["The Spellbook","Charms woven from old promises and older magic.",3],pets:["The Familiar Den","Small companions with a part in every tale.",4],map:["Atlas of Tales","Choose a path through the unfinished world.",5],more:["The Chronicler","Your deeds, wishes and the rules of the tale.",6]};p.innerHTML=(headings[tab]?pageHeading(...headings[tab]):"")+fn();polishUi(p);p.scrollTop=st;updAfford()}
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
 let h=mgrBar()+'<div class="sec">Eight hero specials</div><div class="ggrid hero-special-cards">';
 h+=SLOT_ORDER.map(id=>{const k=S.seat[id]||campHero(id),c=CLS[k],owned=S.seat[id]&&S.heroes[k];return '<button class="gcard '+(!owned?'lk':'')+'" data-act="skInfo" data-id="'+k+'"><i>'+heroPortrait(k)+'</i><b>'+c.sp.n+'</b><em>'+c.hero+'</em><small>'+(!owned?'Unlock '+SLOT_BY_ID[id].n:owned.sp?'Special '+owned.sp+' · '+heroSkillCooldown(k).toFixed(1)+'s':'Unlocks at hero Lv 5')+'</small></button>';}).join('')+'</div><div class="hint">One special per formation seat. Upgrade the hero to improve it. Use the portrait buttons below the battlefield, or enable Auto Fairy to cast ready skills when they have a valid target.</div>';

 h+=`<div class="hdr"><div class="sec" style="margin:8px 0 0">Charms & Boons</div>${qtyBar()}</div><div class="ggrid">`;
 h+=UPS.map(u=>{const l=L(u.id),maxed=u.max!==undefined&&l>=u.max,n=maxed?0:buyN(u,l),c=maxed?0:bulkCost(u.b,u.g,l,n);
  return`<div class="gcard" data-act="upInfo" data-id="${u.id}"><i>${u.i}</i><b>${u.n}</b><em>Lv ${l}</em>${maxed?'<div class="gmax">MAX</div>':`<button class="gbuy ${S.gold>=c?"can":""}" data-act="up" data-id="${u.id}" data-cost="${c}">${n>1?"×"+n+" ":"⬆ "}🪙${fmt(c)}</button>`}</div>`}).join("")+`</div>`;
 return h+`<div class="hint">Tap a card for details. Tap the gold button to buy.</div>`;
}
ACT.upInfo=d=>{const u=UPS.find(x=>x.id===d.id),l=L(u.id);AU.play("ui");modal(`<div class="hdet"><div class="big">${u.i}</div><div class="mtitle">${u.n}</div><div class="msub">Level ${l}${u.max!==undefined?" / "+u.max:""}</div><p class="mp">${u.d(l)}${l<(u.max===undefined?1e9:u.max)?"<br>Next: "+u.d(l+1):""}</p></div><div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};

ACT.up=d=>{const u=UPS.find(x=>x.id===d.id),l=L(u.id);if(u.max!==undefined&&l>=u.max)return;const n=buyN(u,l),c=bulkCost(u.b,u.g,l,n);if(S.gold<c){AU.play("err");return}S.gold-=c;S.up[u.id]=l+n;recalc();AU.play("level");renderTab()};

/* ---------- Heroes tab (formation) ---------- */
const fpct=v=>"+"+Math.round(v*1000)/10+"%";
function synChips(k){const z=C.syn&&C.syn[k];if(!z)return"";const o=[];for(const a in z)if(z[a]>0)o.push(`<i>${fpct(z[a])} ${STATN[a]}</i>`);return o.length?`<div class="chips">${o.join("")}</div>`:""}
function mileList(k){const h=S.heroes[k],M=Math.floor(h.lvl/10),rows=[];const from=Math.max(1,M-2);
 for(let m=from;m<=M+6;m++){const mi=mileInfo(k,m),got=m<=M;rows.push(`<div class="ms ${got?"got":""}"><i>${got?mi.i:"🔒"}</i><div><b>Lv ${mi.lvl} · ${mi.name}</b><small>${mi.desc}</small></div></div>`)}
 return`<div class="sec">🏅 Milestones <small>(${M} unlocked · no level cap)</small></div><div class="mslist">${rows.join("")}</div>`}
function nextMile(k){const h=S.heroes[k],n=(Math.floor(h.lvl/5)+1)*5,e=EVO_REQ.find(r=>r>h.lvl);const evo=e&&e<=n;if(evo)return`★ Lv ${e}: EVOLVE → ${EVO_N[(h.evo||0)+1]} (×2 dmg, ×1.6 HP)`;if(n%10===0){const mi=mileInfo(k,n/10);return`${mi.i} Lv ${n}: ${mi.name} — ${mi.desc.split(". ")[0]}`}return`✨ Lv ${n}: special upgrades`}
function evoRow(k){const h=S.heroes[k],e=h.evo||0;return`<div class="evo ${e>=3?"max":""}">${e>=3?"★★★ "+EVO_N[3]+" — fully evolved · ":(e?"★".repeat(e)+" "+EVO_N[e]+" · ":"")}Next: ${nextMile(k)}</div>`}
function mgrBar(){return S.max>=10?`<button class="evt mgr ${S.autoMgr?"on":""}" data-act="mgr">🧚 Auto-Fairy: ${S.autoMgr?"ON — upgrading heroes, equipping relics and casting ready specials":"OFF — tap to let the Auto-Fairy spend your gold"}</button>`:`<div class="hint">🧚 The Auto-Fairy arrives at stage 11.</div>`}
ACT.mgr=()=>{S.autoMgr=!S.autoMgr;AU.play("ui");renderTab()};
function campBar(){return`<div class="sec">Campaign ${S.camp+1}/${CAMPS.length}</div><div class="camps">${CAMPS.map((c,i)=>{const u=campUnlocked(i);return`<button class="camp ${i===S.camp?"on":""} ${u?"":"lk"}" data-act="camp" data-c="${i}">${campaignBanner(i)}<b>${u?c.n:"Campaign "+(i+1)}</b><small>${u?campCast(i).map(k=>`<span class="cast-thumb">${heroPortrait(k)}</span>`).join("")+" · best "+Math.max(S.campBest[i]||0,i===S.camp?S.max:0)+"/"+STAGE_CAP:"Clear stage 100 of campaign "+i}</small></button>`}).join("")}</div><div class="hint" style="margin-top:0">${CAMPS[S.camp].d} Each campaign has its own story, progress, levels, Wishes and prestige. Its crew can be used in any campaign once unlocked. Stronger enemies eventually force a retreat and Rewrite.</div>`}
ACT.camp=d=>{const c=+d.c;if(c===S.camp)return;if(!campUnlocked(c)){AU.play("err");toast("Clear stage 100 of the previous campaign first.","bad");return}confirmModal("Switch to "+CAMPS[c].n+"? Your current campaign is saved exactly as it is.","campDo",`data-c="${c}"`,"Switch")};
ACT.campDo=d=>{closeModal();if(switchCamp(+d.c)){AU.play("win");renderTab()}};
function potBar(){return Object.keys(POTS).map(t=>{const p=POTS[t],on=S.pb[t]>0;return`<button class="chip potc ${on?"on":""} ${S.pot[t]>0?"has":""}" data-act="drink" data-t="${t}" style="--pc:${p.c}">${p.i}×${S.pot[t]} <small data-pt="${t}">${on?fmtTime(S.pb[t]):""}</small></button>`}).join("")}
function heroRow(k){
 const h=S.heroes[k],c=CLS[k],cost=lvCost(k),can=S.gold>=cost;
 return`<div class="hcell"><div class="port ${h.evo?"evo"+h.evo:""}" data-act="hero" data-k="${k}"><span class="pe">${heroPortrait(k)}</span>${h.evo?`<u>${"★".repeat(h.evo)}</u>`:""}<em>Lv ${h.lvl}</em></div><b class="pn">${shortN(c.hero)}</b><button class="gbuy ${can?"can":""}" data-act="hlv" data-k="${k}" data-cost="${cost}">⬆ 🪙${fmt(cost)}</button></div>`}
function lockedSlot(sd){
 const k=campHero(sd.id),ok=S.max>=sd.u,cost=slotHeroCost(sd.id);
 return`<div class="hcell lockedslot"><div class="port"><span class="pe">${ok?heroPortrait(k):"🔒"}</span><em>${sd.i}</em></div><b class="pn">${ok?shortN(CLS[k].hero):"Stage "+(sd.u+1)}</b>${ok?`<button class="gbuy ${S.gold>=cost?"can":""}" data-act="unlockSlot" data-id="${sd.id}" data-cost="${cost}">UNLOCK 🪙${fmt(cost)}</button>`:`<small class="pn">${sd.n}</small>`}</div>`}
function pickBanner(){
 pickTick();
 if(!recruitReady())return `<div class="recruit-wait">${uiIcon(12)}<div><b>The guild is gathering your company</b><small>First recruitment in ${fmtTime(recruitWait()/1000)} · after 24 hours</small></div></div>`;
 if(APPROVED_HERO_ART.every(k=>S.own[k]))return `<div class="hint">Every illustrated travelling hero has joined your roster. Further invitations will wait for new heroes.</div>`;
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
 return`<div class="pcard"><div class="av">${heroPortrait(k)}</div><div class="mi"><b>${c.hero}</b><small>${c.n} · ${sd.i} ${sd.n} · ${SYN[k].tags.map(t=>TAGN[t]).join(" ")}</small><small>✨ ${c.sp.n}: ${c.sp.d.replace("POW","×"+c.sp.pow)}</small><small>🔗 ${y.aura}</small><small>🤝 ${y.combo}</small><small class="bs">📜 ${(STORY[k]||"").replace(/\{n\}/g,c.hero)}</small></div>${extra||""}</div>`}
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
 const slots=SLOTS.map(s=>{const it=h.gear[s];return it?`<button class="item" style="--rc:${RAR[it.r].c}" data-act="item" data-id="${it.id}"><i>${itemArt(it)}</i>${it.lv?`<b>+${it.lv}</b>`:""}<small>${SLOT_N[s]}</small></button>`:`<button class="item empty" data-act="emptySlot" data-k="${k}" data-s="${s}"><i>${slotArt(s)}</i><small>${SLOT_N[s]}</small></button>`}).join("");
 const spTxt=h.sp>0?c.sp.d.replace("POW","×"+(c.sp.pow*Math.pow(1.1,h.sp-1)).toFixed(2)):c.sp.d.replace("POW","×"+c.sp.pow);
 modal(`<div class="hdet"><div class="big">${heroPortrait(k)}</div><div class="mtitle">${c.hero}</div><div class="msub">${c.n} · Lv ${h.lvl}${c.rng?" · Ranged":" · Melee"}${c.el!=="none"?" · "+ELEMS[c.el].i+ELEMS[c.el].n:""}</div><p class="mp">${c.bio}</p><div class="story"><b>📜 Backstory</b><br>${(STORY[k]||"").replace(/\{n\}/g,c.hero)}</div></div>
 <div class="statbox"><div class="srow"><span>Damage per hit</span><b>${fmt(st.hit)}</b></div><div class="srow"><span>Attack interval</span><b>${st.iv.toFixed(2)}s</b></div><div class="srow"><span>Health</span><b>${fmt(st.hp)}</b></div><div class="srow"><span>Crit chance</span><b>${(st.crit*100).toFixed(0)}%</b></div></div>
 <div class="slots6">${slots}</div>
 <div class="row"><div class="ico">${heroPortrait(k)}</div><div class="info"><b>Level</b> <em>${h.lvl}</em><small>One button: +1 level. Attack lv ${h.at} · Special lv ${h.sp} grow automatically.</small></div>${buyBtn("hlv2",k,lvCost(k),`data-k="${k}"`,"UPGRADE")}</div>
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
function itemBtn(it){const r=RAR[it.r];return`<button class="item" style="--rc:${r.c}" data-act="item" data-id="${it.id}"><i>${itemArt(it)}</i>${it.lv?`<b>+${it.lv}</b>`:""}<small>${r.n}</small></button>`}
function renderGear(){
 let h=`<div class="hdr"><div class="sec" style="margin:0">Backpack ${S.bag.length}/30</div><button class="mini" data-act="equipBest">Equip best</button><button class="mini" data-act="sellJunk">Sell outclassed</button></div>`;
 h+=S.bag.length?`<div class="grid5">${S.bag.slice().sort((a,b)=>b.r-a.r||iscore(b)-iscore(a)).map(itemBtn).join("")}</div>`:`<div class="hint">Your bag is empty. Monsters carry loot. Don't ask where.</div>`;
 h+=`<div class="sec">Equipped</div>`;
 h+=S.dep.map(k=>{const hr=S.heroes[k];return`<div class="hcard"><div class="hrow2"><div class="av" data-act="hero" data-k="${k}">${heroPortrait(k)}</div><div class="mi"><b>${CLS[k].hero}</b><small>Tap a piece to enhance it instantly</small></div></div><div class="slots6">${SLOTS.map(sl=>{const it=hr.gear[sl];if(!it)return`<button class="item empty" data-act="emptySlot" data-k="${k}" data-s="${sl}"><i>${slotArt(sl)}</i><small>${SLOT_N[sl]}</small></button>`;const c=enhCost(it);return`<button class="item ${S.gold>=c&&it.lv<20?"can":""}" style="--rc:${RAR[it.r].c}" data-act="enhQ" data-id="${it.id}" data-cost="${c}"><i>${itemArt(it)}</i><b>+${it.lv}</b><small>${it.lv>=20?"MAX":"⬆ "+fmt(c)}</small></button>`}).join("")}</div></div>`}).join("");
 return pageHeading("The Relic Vault","Enchanted keepsakes from a hundred unfinished tales.",1)+h+`<div class="hint">Chests contain fewer relics. Auto-sell also rejects duplicate upgrades already beaten by an item in your bag. Attack, health and gold bonuses have diminishing returns when stacked. Toggle auto-equip and auto-sell in Settings.</div>`;
}
ACT.equipBest=()=>{const n=equipBestFromBag(true);toast(n?"Equipped "+n+" relic upgrades.":R.lastBagSales?"Already equipped best; sold "+R.lastBagSales+" outclassed relics.":"Your deployed heroes already have the best available relics.","good");renderTab();};
ACT.sellJunk=()=>{const sold=sellOutclassedLoot();toast('Sold '+sold.count+' outclassed items for '+fmt(sold.gold)+' gold','good');AU.play('coin');renderTab();};
function statLines(it){let h="";for(const k in it.st){const v=it.st[k]*(1+0.08*it.lv)*100;h+=`<div class="srow"><span>${STAT_N[k]}</span><b>+${k==="atk"||k==="hp"?fmt(v)+"%":v.toFixed(1)+"%"}</b></div>`}return h}
function openItem(id){
 const f=findItem(id);if(!f){closeModal();return}const it=f.it,r=RAR[it.r],ec=enhCost(it);
 let eq="";
 if(f.loc==="bag"){eq=S.dep.map(k=>{const cur=S.heroes[k].gear[it.slot],dl=iscore(it)-iscore(cur);return`<button class="mini ${dl>0?"can":""}" data-act="equip" data-k="${k}" data-id="${id}">${heroPortrait(k)} ${dl>0?"▲":"▼"}</button>`}).join(" ")}
 modal(`<div class="hdet"><div class="big">${itemArt(it)}</div><div class="mtitle" style="color:${r.c}">${it.name}</div><div class="msub">${r.n} ${SLOT_N[it.slot]}${it.lv?" · +"+it.lv:""} · ilvl ${it.ilvl+1}${f.loc==="hero"?" · on "+CLS[f.k].hero:""}</div></div>
 <div class="statbox">${statLines(it)}</div><div class="hint">These are the relic’s base bonuses. Stacked attack, health and gold bonuses have diminishing returns.</div>
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
  if(!pl)return`<div class="gcard lk" style="--rc:${rc.c}"><i class="unseen-familiar">${petPortrait(p.id)}</i><b>Unseen familiar</b><em>${rc.n}</em></div>`;
  const act=S.petAct.includes(p.id);
  return`<div class="gcard ${act?"act":""}" style="--rc:${rc.c}" data-act="petInfo" data-id="${p.id}"><i>${petPortrait(p.id)}</i><b>${p.n}</b><em>Lv ${pl.lvl}${act?" · Active":""}</em></div>`}).join("")+`</div>`;
 return h+`<div class="hint">Tap a familiar to equip or level it. Duplicates level up automatically. Slots unlock at stages 31 and 81.</div>`;
}
ACT.petInfo=d=>{const p=PETS.find(x=>x.id===d.id),pl=S.pets[p.id],rc=PET_RAR[p.rar],act=S.petAct.includes(p.id),c=petLvCost(p.id);AU.play("ui");
 modal(`<div class="hdet"><div class="big">${petPortrait(p.id)}</div><div class="mtitle" style="color:${rc.c}">${p.n}</div><div class="msub">${rc.n} · Level ${pl.lvl}</div><p class="mp">${p.d(pl.lvl)}</p></div><div class="mbtns"><button class="btn ghost" data-act="close">Close</button><button class="btn ${act?"mg":""}" data-act="petTog2" data-id="${p.id}">${act?"Send to bench":"Make active"}</button><button class="btn" data-act="petUp2" data-id="${p.id}" data-cost="${c}">⬆ 🪙${fmt(c)}</button></div>`)};
ACT.petTog2=d=>{togglePet(d.id);closeModal();renderTab()};
ACT.petUp2=d=>{const c=petLvCost(d.id);if(S.gold<c){AU.play("err");return}S.gold-=c;S.pets[d.id].lvl++;recalc();AU.play("level");closeModal();renderTab()};
ACT.egg=()=>{if(S.stats.maxEver<2){toast("The Familiar Fair opens at stage 3.","bad");return}const r=buyEgg();if(!r){AU.play("err");return}AU.play("egg");
 const rc=PET_RAR[r.p.rar];modal(`<div class="hdet"><div class="big">${petPortrait(r.p.id)}</div><div class="mtitle" style="color:${rc.c}">${r.p.n}</div><div class="msub">${rc.n} · ${r.isNew?"NEW!":"Level "+r.lvl}</div><p class="mp">${r.p.d(r.lvl)}</p></div><div class="mbtns"><button class="btn" data-act="close">Adopt</button></div>`);checkAch()};
ACT.petTog=d=>{AU.play("ui");togglePet(d.id)};
ACT.petUp=d=>{const c=petLvCost(d.id);if(S.gold<c){AU.play("err");return}S.gold-=c;S.pets[d.id].lvl++;recalc();AU.play("level");renderTab()};
function buildPets(){if(R.inGame)renderTab()}

/* ---------- Map tab ---------- */
function renderMap(){
 const ai=areaIdx(S.stage),rl=realmOf(S.stage),maxA=areaIdx(S.max);
 let h=campBar()+`<div class="goal">🧱 Soft wall ≈ stage ${Math.floor(wallStage())+1} (enemies ramp brutally). Defeat pressure rises steeply beyond this point. Survive the waves to advance; Rewrites move the danger deeper.</div>`+`<div class="sec">Area ${ai+1}: ${rl.n}</div><div class="hint" style="margin-top:0">Weather: ${(rl.wx||[]).map(w=>WXD[w].i+" "+WXD[w].n).join(" · ")} · Hazard: ${hazardOf(ai*10)?hazardOf(ai*10).i+" "+hazardOf(ai*10).n:"none"} · Monsters: ${ELEMS[rl.el].i} ${ELEMS[rl.el].n} · Boss: ${rl.boss[0]}</div>`;
 h+=`<div class="stg10">${[0,1,2,3,4,5,6,7,8,9].map(i=>{const g=ai*10+i;return`<button class="${g<S.max?"cl":""} ${g===S.stage?"cur":""} ${g>S.max?"lk":""} ${i===9||i===4?"boss":""}" data-act="goStage" data-g="${g}">${i===9?"👑":i===4?"⚔️":i+1}</button>`}).join("")}</div>`;
 h+=`<div class="mbtns"><button class="btn ghost" data-act="wxguide">☁️ Weather</button><button class="btn ghost" data-act="codex">📖 Story</button><button class="btn ghost" data-act="mapJump">🎯 Furthest</button></div>`;
 if(R.mapBase==null)R.mapBase=Math.max(0,ai-2);
 const base=R.mapBase;
 h+=`<div class="hdr"><div class="sec" style="margin:0">Areas (furthest: ${maxA+1})</div><div class="qty"><button data-act="mapPage" data-d="-50">⏪</button><button data-act="mapPage" data-d="-8">◀</button><button data-act="mapPage" data-d="8">▶</button><button data-act="mapPage" data-d="50">⏩</button></div></div>`;
 for(let a=base;a<base+8;a++){const r=realmOf(a*10),lock=a>maxA+0&&a*10>S.max,cl=Math.min(10,Math.max(0,S.max-a*10)),far=a>maxA+1;
  h+=`<button class="realm ${lock?"locked":""} ${a===ai?"cur":""}" style="--rc:${r.acc};--r1:${r.bg[0]};--r2:${r.bg[1]}" data-act="goStage" data-g="${a*10}"><div class="rtop"><b>${far?"Area "+(a+1)+": ???":"Area "+(a+1)+": "+r.n}</b><span>${cl}/10</span></div><small>${lock?"Keep marching.":r.boss[0]}</small><div class="rbar"><i style="width:${cl*10}%"></i></div></button>`}
 return h;
}
ACT.mapPage=d=>{R.mapBase=Math.max(0,(R.mapBase||0)+(+d.d));AU.play("ui");renderTab()};
ACT.mapJump=()=>{R.mapBase=Math.max(0,areaIdx(S.max)-3);AU.play("ui");renderTab()};
ACT.goStage=d=>{const g=+d.g;if(gotoStage(g)){AU.play("ui");renderTab()}else AU.play("err")};
ACT.wxguide=()=>{AU.play("ui");modal(`<div class="mtitle">☁️ Weather Guide</div><div class="msub">Weather affects heroes AND monsters. Umbrella upgrades and certain pets soften penalties.</div>${Object.keys(WXD).map(k=>{const w=WXD[k];return`<div class="wxrow ${R.wxId===k?"now":""}"><i>${w.i}</i><div><b>${w.n}</b><small>${w.d}</small></div></div>`}).join("")}<div class="mbtns"><button class="btn ghost" data-act="close">Close</button></div>`)};
function prologueModal(c){const welcome=!S.seenIntro;S.seenIntro=true;const cp=CAMPS[c],crew=campCast(c).map(k=>`<div class="crew-entry"><div class="crew-portrait">${heroPortrait(k)}</div><div><b>${CLS[k].hero}</b><small>${CLS[k].bio.split('Passive:')[0]}</small></div></div>`).join('');modal(`${welcome?'<div class="welcome"><b>Welcome to Grimm Descent</b><p>Upgrade your heroes, equip their gear and guide them through the tales. Tap the battlefield to help them fight.</p></div>':''}${campaignBanner(c)}<div class="mtitle">${cp.n}</div><p class="campaign-prologue">${storyFill(cp.pro,c)}</p><div class="sec">The crew</div><div class="crew-list">${crew}</div><div class="mbtns"><button class="btn" data-act="close">Begin the tale</button></div>`,true);}
ACT.codex=()=>{AU.play("ui");const c=S.camp,cp=CAMPS[c],n=Math.floor(S.max/10),rows=[];
 for(let a=1;a<=n&&a<=10;a++){const st=storyFor(c,a);rows.push(`<div class="ach got"><i>📖</i><div><b>${st.title}</b><small>${st.text}</small></div></div>`)}
 if(n>10)rows.push(`<div class="hint">…${n-10} more chapters unfolded as you pushed deeper.</div>`);
 modal(`<div class="mtitle">📖 ${cp.n}</div><div class="msub">${cp.d}</div><div class="ach got"><i>🎬</i><div><b>Prologue</b><small><button class="mini can" data-act="proRe">Read again</button></small></div></div>${rows.join("")||'<div class="hint">Beat the first boss to unlock Chapter 1.</div>'}<div class="mbtns"><button class="btn" data-act="close">Close</button></div>`)};
ACT.proRe=()=>{closeModal();prologueModal(S.camp)};

function showDefeatPrompt(){
 if(!R.defeatPending)return;const reward=canRestructure()?soGain():0;
 modal(`<div class="defeat-scene">${uiIcon(6)}<div class="mtitle">This chapter has fallen</div><p>Your company was overwhelmed at stage ${(R.defeatStage||0)+1}.</p>${R.defeatMultiplier>1?'<p class="dread-note">With no enemy falling for 15 seconds, dread strengthened their attacks to ×'+fmt(R.defeatMultiplier)+'.</p>':''}<p>Rewrite the tale and begin again with the strength of your Wishes, or retreat to regroup.</p></div><div class="mbtns col"><button class="btn gold" data-act="defeatRewrite">Rewrite the tale${reward?' · +'+reward+' Wishes':''}</button><button class="btn ghost" data-act="defeatRetreat">Retreat one stage</button></div>`,true);
}
ACT.defeatRetreat=()=>{if(!R.defeatPending)return;R.defeatPending=false;closeModal();S.stage=Math.max(0,S.stage-1);for(const h of R.team){h.down=false;h.hp=h.mhp*.7;}R.wipeT=0;startStage();saveGame();};
ACT.defeatRewrite=()=>{if(!R.defeatPending)return;R.defeatPending=false;closeModal();if(canRestructure()){doRestructure();return;}for(const k in S.heroes)for(const slot in S.heroes[k].gear){const it=S.heroes[k].gear[slot];if(it)addBag(it);}const permanent={so:S.so,soTotal:S.soTotal,perks:S.perks,restructures:S.restructures};Object.assign(S,newCampState(S.camp),permanent);const launch=perk('elev')*5;S.stage=S.max=launch;S.gold=perk('sign')?100*Math.pow(4,perk('sign')):0;S.own[S.seat.van]=1;normS(S);R.buff={cry:0,gold:0,haste:0,ballad:0};R.cd={};R.wipeT=0;R.lastArea=-1;R.lastClearedStage=null;R.team=[];recalc();buildTeam();startStage();onAreaChanged();saveGame();};

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
 <div class="statbox"><div class="srow"><span>Wishes available</span><b>${S.so} 📈</b></div><div class="srow"><span>Lifetime Wishes</span><b>${S.soTotal}</b></div><div class="srow"><span>Rewrites done</span><b>${S.restructures}</b></div><div class="srow"><span>Soft wall (enemies ramp up)</span><b>stage ~${Math.floor(wallStage())+1}</b></div><div class="srow"><span>Hard wall (severe danger)</span><b>stage ${hardStage()+1}</b></div><div class="srow"><span>After this rewrite</span><b>wall ~${Math.floor(55+1.8*Math.sqrt(S.soTotal+g))+1}</b></div></div>
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
<div class="how"><p><b>1. MARCH.</b> Your squad walks right. Monsters walk left. Melee heroes advance into separate lanes and hold the front while attacking. Ranged heroes stay back and complain.</p>
<p><b>2. TAP</b> the battlefield to smash the nearest monster. The <b>eight portrait buttons</b> activate a special for each deployed hero. Specials unlock at hero Lv 5 and improve with hero upgrades. Turn on Auto Fairy to cast ready specials automatically; manual and automatic casts share one timer. Fallen heroes cannot cast and no longer contribute party damage.</p>
<p><b>3. UPGRADE</b> heroes with one button: +1 level per press. Attack and Special grow on their own every few levels, every 10 levels is a milestone that boosts synergy and the whole party, and heroes evolve at Lv 25, 60 and 120 automatically. Your heroes auto-fight and auto-tap, so tapping is optional (but helps). Turn on the 🤖 Auto-Fairy once unlocked.</p><p><b>CAMPAIGNS.</b> Each campaign has 2000 stages and its own prestige. Reaching ~1200 takes serious synergy, gear and many restructures.</p>
<p><b>4. FORMATION.</b> Your squad has 8 seats (Vanguard, Marksman, Bruiser, Support, Arcanist, Skirmisher, Commander, Wildcard). You start with the Vanguard; reach deeper stages and pay to unlock each seat's default hero. Every seat has 10 heroes, but only one sits there at a time.</p>
<p><b>SYNERGY.</b> Every hero has tags and buffs allies with matching tags (🔗), and gets a bonus when the right ally is present (🤝). Mix and match seats to find combos.</p>
<p><b>STALLED BATTLES</b> After 15 seconds of fighting without an enemy falling, Dread increases enemy damage by 30% each second. An enemy kill resets it. If the party falls, choose to Rewrite the tale or retreat and regroup.</p><p><b>RECRUITMENT EVENTS</b> open after 24 real hours from the start of your save. Earlier boss invitations wait until then. Afterward, weekly and boss events let you choose a traveller for their seat; gems can buy extra events.</p>
<p><b>STAGES.</b> Every area is 10 stages: a ⚔️ <b>mini-boss on stage 5</b> and a 👑 <b>big boss on stage 10</b>. Both drop <b>chests</b> with one relic from a mini-boss or two from a boss, plus gold and supplies. Only big bosses drop 💎 gems for the Gem Shop.</p>
<p><b>5. GEAR</b> drops from monsters. Each hero has six slots: Weapon, Headgear, Armor, Trinket, Boots and Ring. Enhance them with gold.</p>
<p><b>6. WEATHER</b> changes the battlefield. Fire hates rain, ice loves snow, and lightning is indiscriminate. Check the weather chip for details.</p>
<p><b>7. PETS</b>: hatch eggs for fairytale familiars. <b>8. BOSSES</b> end each area. Wipe out and your squad retreats a stage to 'regroup'.</p>
<p><b>9. REWRITE</b> at stage 21+ for permanent Wishes (+6% damage, +10% gold each). Enemy damage rises through the soft wall; deeper into the hard-wall region, healing weakens and fallen heroes need a successful advance or a resurrection skill. Rewrite the tale, come back stronger, push deeper.</p><p>Don't feed the Mimic. Don't eat the cottage.</p></div><div class="mbtns"><button class="btn" data-act="close">Once upon a time</button></div>`;
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
 if(TF.p.length<32&&Math.random()<.6)TF.p.push({x:rand(0,TF.w),y:TF.h+10,v:-rand(14,50),s:rand(1.5,3.4),c:["#d9b96e","#a6bda3","#cca46b"][Math.floor(Math.random()*3)],t:rand(0,6)});
 for(let i=TF.p.length-1;i>=0;i--){const p=TF.p[i];p.y+=p.v*dt;p.t+=dt;p.x+=Math.sin(p.t*2)*20*dt;if(p.y<-12){TF.p.splice(i,1);continue}x.globalAlpha=.4+.45*Math.abs(Math.sin(p.t*2));x.fillStyle=p.c;x.shadowColor=p.c;x.shadowBlur=8;x.beginPath();x.arc(p.x,p.y,p.s,0,6.3);x.fill()}x.globalAlpha=1;x.shadowBlur=0}

/* ---------- ui tick, events, boot ---------- */
let tickAcc=0,lastUi=0,titleDrawAcc=0;
function uiLoop(ts){
 if(document.hidden)setTimeout(()=>requestAnimationFrame(uiLoop),1000);else requestAnimationFrame(uiLoop);const dt=Math.min(.1,(ts-lastUi)/1000||0);lastUi=ts;
 if(document.hidden)return;
 if(!R.inGame){titleDrawAcc+=dt;if(titleDrawAcc>=1/30){titleFx(Math.min(.1,titleDrawAcc));titleDrawAcc=0;}return;}
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
boot();polishUi(document.getElementById("app"));

/* ---------- Shop, chests & supplies ---------- */
function chestModal(c,title){
 const rows=c.items.map(it=>`<div class="ach got" style="border-color:${RAR[it.r].c}"><i>${itemArt(it)}</i><div><b style="color:${RAR[it.r].c}">${it.name}</b><small>${RAR[it.r].n} ${SLOT_N[it.slot]}</small></div></div>`).join("");
 const u=UTILS.find(x=>x.id===c.util.id);
 modal(`<div class="hdet"><div class="big">🎁</div><div class="mtitle">${title}</div></div><div class="statbox"><div class="srow"><span>Gold</span><b>🪙 ${fmt(c.gold)}</b></div>${c.pot?`<div class="srow"><span>Potion</span><b>${POTS[c.pot.t].i} ${POTS[c.pot.t].n} ×${c.pot.n}</b></div>`:""}<div class="srow"><span>Supply</span><b>${u.i} ${u.n} ×${c.util.n}</b></div>${c.gems?`<div class="srow"><span>Gems</span><b>💎 ${c.gems}</b></div>`:""}</div><div class="sec">Gear (auto-equipped where it helps)</div>${rows}<div class="mbtns"><button class="btn gold" data-act="close">Collect</button></div>`,true);
 AU.play("loot");
}
function eggModal(r){const rc=PET_RAR[r.p.rar];modal(`<div class="hdet"><div class="big">${petPortrait(r.p.id)}</div><div class="mtitle" style="color:${rc.c}">${r.p.n}</div><div class="msub">${rc.n} · ${r.isNew?"NEW!":"Level "+r.lvl}</div><p class="mp">${r.p.d(r.lvl)}</p></div><div class="mbtns"><button class="btn" data-act="close">Adopt</button></div>`);AU.play("egg")}
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
 return pageHeading("The Wandering Market","Treasures, wishes and remedies from across the tales.",2)+h;
}
ACT.buyBox=()=>{const c=lockboxCost();if(S.gold<c){AU.play("err");return}S.gold-=c;S.shopN++;const ch=openChest("mini",Math.max(S.stage,S.max));chestModal(ch,"Lockbox opened!")};
ACT.buyPot=d=>{const c=potPrice();if(S.gold<c){AU.play("err");return}S.gold-=c;S.pot[d.t]++;AU.play("coin");renderTab()};
function chestBagRow(){const n={mini:0,boss:0,premium:0};S.chestBag.forEach(c=>n[c.t]++);const tot=S.chestBag.length;
 return`<div class="sec">Chest Bag</div>`+(tot?`<div class="goal">🎁 Boss ×${n.boss} · 📦 Mini ×${n.mini}${n.premium?" · 💎 Premium ×"+n.premium:""}</div><div class="mbtns"><button class="btn" data-act="chestOne">Open one</button><button class="btn mg" data-act="chestAll">Open all (${tot})</button></div>`:`<div class="hint">No stored chests. Defeat bosses (tap the chest that pops out) and idle time will fill this up.</div>`)}
ACT.chestOne=()=>{const c=S.chestBag.shift();if(!c){AU.play("err");return}const r=openChest(c.t,c.g);chestModal(r,c.t==="boss"?"BOSS CHEST!":c.t==="mini"?"Mini-boss chest!":"Premium chest!");refreshTab("shop")};
ACT.chestAll=()=>{if(!S.chestBag.length){AU.play("err");return}const bag=S.chestBag.splice(0);let gold=0,gems=0,items=0,best=[];const pots={str:0,spd:0,hp:0},utl={};
 for(const c of bag){const r=openChest(c.t,c.g);gold+=r.gold;gems+=r.gems;items+=r.items.length;r.items.forEach(i=>best.push(i));pots[r.pot.t]+=r.pot.n;utl[r.util.id]=(utl[r.util.id]||0)+r.util.n}
 best.sort((a,b)=>b.r-a.r||iscore(b)-iscore(a));best=best.slice(0,6);
 modal(`<div class="hdet"><div class="big">🎁</div><div class="mtitle">Opened ${bag.length} chests!</div></div><div class="statbox"><div class="srow"><span>Gold</span><b>🪙 ${fmt(gold)}</b></div>${gems?`<div class="srow"><span>Gems</span><b>💎 ${gems}</b></div>`:""}<div class="srow"><span>Gear pieces</span><b>${items}</b></div><div class="srow"><span>Potions</span><b>💪${pots.str} ⚡${pots.spd} 💚${pots.hp}</b></div><div class="srow"><span>Supplies</span><b>${Object.keys(utl).map(id=>{const u=UTILS.find(x=>x.id===id);return u.i+"×"+utl[id]}).join(" ")}</b></div></div><div class="sec">Best finds (the rest went to your bag / auto-equip)</div>${best.map(it=>`<div class="ach got" style="border-color:${RAR[it.r].c}"><i>${itemArt(it)}</i><div><b style="color:${RAR[it.r].c}">${it.name}</b><small>${RAR[it.r].n} ${SLOT_N[it.slot]}</small></div></div>`).join("")}<div class="mbtns"><button class="btn gold" data-act="close">Nice</button></div>`,true);AU.play("loot");refreshTab("shop")};
ACT.buyUtil=d=>{const c=utilPrice(d.id);if(S.gold<c){AU.play("err");return}S.gold-=c;S.inv[d.id]=(S.inv[d.id]||0)+1;AU.play("coin");renderTab()};
ACT.useUtil=d=>{const r=useUtil(d.id);if(!r){AU.play("err");return}AU.play("level");if(d.id==="egg")eggModal(r);else{toast("Used "+UTILS.find(u=>u.id===d.id).n,"good");renderTab()}};
ACT.buyGem=d=>{if(d.id==="gpick"&&!recruitReady()){toast("The guild opens in "+fmtTime(recruitWait()/1000)+". Your gems have been kept.","memo");return;}const r=buyGem(d.id);if(!r){AU.play("err");return}AU.play("level");
 if(r.chest)chestModal(r.chest,"Gilded Chest!");else if(r.egg)eggModal(r.egg);else{if(r.gold)toast("⏩ +"+fmt(r.gold)+" gold","good");renderTab()}};







