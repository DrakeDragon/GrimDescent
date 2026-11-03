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
 heroes:{knight:newHero()},dep:["knight"],own:{knight:1},seat:{van:"knight"},pref:{},picks:0,recruitStartedAt:Date.now(),recruitPending:0,pickAt:Date.now()+864e5,pickList:null,bag:[],pets:{},petAct:[],
 so:0,soTotal:0,perks:{},restructures:0,ach:{},seenRealm:{},seen:{},seenIntro:false,
 stats:{deaths:0,bosses:0,crits:0,loot:0,sold:0,revives:0,maxEver:0,legend:0,eggs:0,wipes:0},log:[],buyQty:1,speed:1,last:Date.now(),
 set:{music:true,sfx:true,shake:true,numbers:true,vibe:true,autosell:false,autoequip:true,musicVol:.5,sfxVol:.7}}}
let S=newState();
function normS(s){
 for(const k in s.heroes){s.heroes[k]=Object.assign(newHero(),s.heroes[k]);s.heroes[k].gear=Object.assign(newHero().gear,s.heroes[k].gear||{});if(!CLS[k])delete s.heroes[k]}
 for(const k in s.own)if(!CLS[k])delete s.own[k];for(const id in s.seat){const k=s.seat[id];if(!CLS[k]||CLS[k].slot!==id||!s.own[k])s.seat[id]=SLOT_BY_ID[id].list[s.camp||0]}
 for(const id in s.seat){const k=s.seat[id];s.own[k]=1;if(!s.heroes[k])s.heroes[k]=newHero()}
 s.dep=SLOT_ORDER.filter(id=>s.seat[id]).map(id=>s.seat[id]);migrateFairyGear(s);normalizeRecruitment(s);return s}
function mergeSave(o){const d=newState();const s=Object.assign(d,o);s.recruitStartedAt=Number.isFinite(o.recruitStartedAt)?o.recruitStartedAt:Math.min(Date.now(),Math.max(0,(o.pickAt||((o.last||Date.now())+7*864e5))-7*864e5));s.recruitScheduleV=Number.isFinite(o.recruitStartedAt)?o.recruitScheduleV:0;const n=newState();s.set=Object.assign(n.set,o.set||{});s.stats=Object.assign(n.stats,o.stats||{});
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
const realmOf=g=>{const i=areaIdx(g);if(CAMPAIGN_WORLDS[S.camp])return illustratedCampaignRealm(i,S.camp);return(i<REALMS.length&&!S.camp)?REALMS[i]:genRealm(i+5000*(S.camp||0))};
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
 const n=3+perk("bunk");const un=CLS_ORDER.filter(k=>!S.own[k]&&APPROVED_HERO_ART.includes(k));
 const good=un.filter(k=>slotUnlocked(CLS[k].slot)),rest=un.filter(k=>!slotUnlocked(CLS[k].slot));
 const out=[];const pool=good.slice();while(out.length<n&&pool.length)out.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
 const p2=rest.slice();while(out.length<n&&p2.length)out.push(p2.splice(Math.floor(Math.random()*p2.length),1)[0]);
 return out}
function pickHero(k){
 if(!recruitReady()||!APPROVED_HERO_ART.includes(k)||S.picks<1||!S.pickList||!S.pickList.includes(k)||S.own[k])return false;
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
 if(!S.autoMgr||S.max<10||!R.inGame||R.modalPause)return;
 for(let n=0;n<8;n++){
  for(const id of SLOT_ORDER)if(canUnlockSlot(id)&&S.gold>=slotHeroCost(id)){unlockSlot(id);break}
  let best=null,bc=1e300;
  for(const k of S.dep){const c=lvCost(k);if(c<bc){bc=c;best={c,f:()=>heroLvlUp(k)}}}
  for(const u of UPS){const l=L(u.id);if(u.max!==undefined&&l>=u.max)continue;const c=u.b*Math.pow(u.g,l)*1.3;if(c<bc){bc=c;best={c:c/1.3,f:()=>{S.gold-=u_c(u,l);S.up[u.id]=l+1;recalc();return true}}}}
  if(!best||S.gold<best.c)return;if(!best.f())return}
}
const u_c=(u,l)=>u.b*Math.pow(u.g,l);
function addPicks(n){if(!CLS_ORDER.some(k=>!S.own[k]&&APPROVED_HERO_ART.includes(k))){S.recruitPending=Math.min(5,(S.recruitPending||0)+n);return false;}if(!recruitReady()){S.recruitPending=Math.min(5,(S.recruitPending||0)+n);return false;}S.picks=Math.min(5,S.picks+n);S.pickList=genPickList();return S.picks>0;}
function pickTick(){normalizeRecruitment(S);if(!recruitReady())return false;let granted=false;if(S.recruitPending>0){const n=S.recruitPending;S.recruitPending=0;granted=addPicks(n);}
 if(Date.now()>=S.pickAt){let n=0;while(Date.now()>=S.pickAt&&n<5){S.pickAt+=7*864e5;n++;}if(S.pickAt<Date.now())S.pickAt=Date.now()+7*864e5;granted=addPicks(n)||granted;}
 if(S.picks>0&&(!S.pickList||!S.pickList.length))S.pickList=genPickList();return granted;}
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
function toast(msg,cls){const b=$("#toasts");if(!b)return;while(b.children.length>3)b.firstChild.remove();const t=document.createElement("div");t.className="toast "+(cls||"");t.textContent=msg;polishUi(t);b.appendChild(t);setTimeout(()=>t.remove(),3200)}
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
 return{id:"i"+Date.now().toString(36)+ri(0,99999),slot,name,artId:base[2],e:"",r,ilvl,lv:0,st};
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
  if(!beatable||(g>=Math.floor(wallStage())&&g>=S.max)||g>=STAGE_CAP-1){gold+=t/Math.max(15,Math.min(tc,300))*hp*7*C.goldBase*.8;break}
  if(t<tc){gold+=gps*(t/tc);break}
  t-=tc;gold+=gps;if(boss||mini)chests.push({t:boss?"boss":"mini",g});g++;n++;
 }
 return{gold:Math.floor(gold),sec,from,to:g,chests};
}
function applyOffline(o){
 if(!o||(o.gold<=0&&o.to===o.from))return false;
 S.gold+=o.gold;S.totalGold+=o.gold;S.runGold+=o.gold;
 for(const c of o.chests)S.chestBag.push(c);
 if(o.to>o.from){S.stage=Math.min(o.to,STAGE_CAP-1);S.max=Math.min(STAGE_CAP-1,Math.max(S.max,o.to));S.stats.maxEver=Math.max(S.stats.maxEver,S.max);S.campBest[S.camp]=Math.max(S.campBest[S.camp]||0,S.max);if(typeof startStage==="function"&&R.inGame){recalc();startStage();if(areaIdx(S.stage)!==R.lastArea)onAreaChanged()}}
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
 if(id==="gpick"&&(!recruitReady()||!APPROVED_HERO_ART.some(k=>!S.own[k])))return null;
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
