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
