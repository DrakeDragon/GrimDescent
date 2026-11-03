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
const wallDepth=g=>Math.max(0,g-wallStage());
const enemyBase=g=>{const u=effG(g),depth=wallDepth(g);return 1.6*Math.pow(1.09,sg(u))*(u>55?Math.pow(1.14,u-55):1)*Math.pow(1.55,Math.min(depth,80));};

/* ---------- canvas ---------- */
function initBattle(){
 cv=$("#fx");cx=cv.getContext("2d");resizeCv();window.addEventListener("resize",resizeCv);
 cv.addEventListener("pointerdown",e=>{e.preventDefault();AU.init();AU.resume();const r=cv.getBoundingClientRect();tapAt(e.clientX-r.left,e.clientY-r.top)});
}
function resizeCv(){
 if(!cv)return;const st=$("#stage");const w=(st&&st.clientWidth)||360,h=(st&&st.clientHeight)||300;
 DPR=Math.min(1.5,window.devicePixelRatio||1);cv.width=Math.floor(w*DPR);cv.height=Math.floor(h*DPR);W=w;H=h;U=clamp(w/360,.85,1.5);
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
 const top=H*.65,bot=H*.90;
 T.forEach(h=>{const d=SLOT_BY_ID[h.c.slot];h.sx=W*d.fx;h.sy=top+d.fy*(bot-top);
  if(!h.x||h.st==="idle"&&Math.abs(h.x-h.sx)>200){h.x=h.sx;h.y=h.sy}});
}
const aliveHeroes=()=>R.team.filter(h=>!h.down);
function weakestHero(){let b=null,r=9;for(const h of R.team){if(h.down)continue;const q=h.hp/h.mhp;if(q<r){r=q;b=h}}return b}
function targetableEnemy(e){return !!e&&!e.dead&&e.x>=0&&e.x<=W-24&&(e.visibleT||0)>=.4;}
function nearestEnemy(x,y,maxd){let b=null,bd=maxd||1e9;for(const e of R.en){if(!targetableEnemy(e))continue;const d=Math.abs(e.x-x)+.4*Math.abs(e.y-(y==null?e.y:y));if(d<bd){bd=d;b=e}}return b}
function frontEnemy(){let b=null;for(const e of R.en){if(!targetableEnemy(e))continue;if(!b||e.x<b.x)b=e}return b}
const liveEn=()=>R.en.filter(targetableEnemy);

/* ---------- fx helpers ---------- */
function fnum(x,y,txt,col,sz){if(!S.set.numbers||R.fl.length>36)return;R.fl.push({x:x+rand(-8,8),y,t:0,txt,col,sz:sz||12})}
function burst(x,y,col,n,sp){if(R.part.length>120)return;for(let i=0;i<n;i++){const a=rand(0,6.28),v=rand(.3,1)*(sp||90);R.part.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-30,l:rand(.3,.7),t:0,c:col,s:rand(2,4)})}}
function ring(x,y,col,r){R.part.push({x,y,vx:0,vy:0,l:.4,t:0,c:col,s:r||40,ring:1})}
function bolt(pts,col){R.bolts.push({pts,t:0,c:col||"#ffe84a"})}
function say(o,txt,dur){
 if(!o||!txt||o.down||o.dead)return false;
 const now=R.speechClock||0;
 if(now<(R.speechNext||0)||(R.team||[]).concat(R.en||[]).some(x=>x.bubT>0))return false;
 const seconds=Math.max(7,Math.min(15,2+txt.split(/\s+/).length*.42),dur||0);
 o.bub=txt;o.bubT=seconds;R.speechNext=now+seconds+4;return true;
}
function ticker(msg){refreshWorldNews(msg);}

/* ---------- stage flow ---------- */
function startStage(){R.impacts=[];R.stallSeconds=0;R.stallMultiplier=1;R.defeatPending=false;const W=Math.floor(wallStage());if(S.stage>=W&&R.wallW!==W){R.wallW=W;setTimeout(()=>toast('Dangerous territory: enemy damage and endurance now climb sharply. Protect your party; a Rewrite grants strength for the next descent.','bad'),1200)}
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
  updateStageHud();ticker();
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
 const e={e:mob[1],name:mob[0],kind:kk,boss:isB,x:W+30+(off||0)+rand(0,30),y:isB?H*.78:rand(H*.65,H*.90),hp,mhp:hp,spd:K.spd,dmg:K.dmg,iv:K.iv,cd:rand(.3,K.iv),sz:K.sz,rng:K.rng*U,stun:0,slow:0,slowF:1,root:0,burn:0,burnDps:0,flash:0,dead:false,bub:null,bubT:0,ph:rand(0,6.28),lunge:0};
 if(isB){R.stg.bossE=e;say(e,pick(BOSS_QUIPS),3.5)}
 if(forceKind==='elite'){e.mini=true;e.name=CAMPAIGN_WORLDS[S.camp]?CAMPAIGN_WORLDS[S.camp].enemies[6][0]:'Elite '+e.name;e.sz=1.7;R.stg.bossE=e;say(e,pick(BOSS_QUIPS),3.2)}
 R.en.push(e);R.stg.alive++;
}
function completeStage(){
 const s=R.stg,g=s.g;s.done=true;AU.play("win");
 if(s.boss||s.mini){if(s.boss)S.stats.bosses++;const be=s.bossE;dropChest(s.boss?'boss':'mini',g,be?be.x:W*.6,be?be.y:H*.65);quip(pick(aliveHeroes()),s.boss?QUIP.bossDead:QUIP.loot)}else quip(pick(aliveHeroes()),QUIP.clear,.6)
 if(L('clear')){const cb=Math.floor(floorHP(g)*3*C.goldBase*0.05*L('clear'));S.gold+=cb;S.totalGold+=cb;S.runGold+=cb}
 if(s.boss&&(g===9||(areaIdx(g)+1)%5===0)&&g+1>S.max){addPicks(1);toast(recruitReady()?"Recruitment Event ready in Heroes.":"Recruitment invitation saved. The guild opens after your first day.","good")}
 S.max=Math.min(STAGE_CAP-1,Math.max(S.max,g+1));S.stats.maxEver=Math.max(S.stats.maxEver,S.max);S.campBest[S.camp]=Math.max(S.campBest[S.camp]||0,S.max);
 if(S.auto&&g+1<=S.max&&g+1<STAGE_CAP)S.stage=g+1;
 if(g>=STAGE_CAP-1&&!(S.seen['camp'+S.camp])){S.seen['camp'+S.camp]=1;setTimeout(()=>{if(typeof storyModal==="function")storyModal("🏆 CAMPAIGN COMPLETE","You cleared all 2000 stages of "+CAMPS[S.camp].n+". The narrator has no further questions. Yet.","Legendary ▶")},700)}
 bannerShow(s.boss?"👑 BOSS DEFEATED!":s.mini?"⚔️ MINI-BOSS DOWN!":"STAGE "+(g+1)+" CLEAR",s.boss||s.mini?"Tap the chest before it's auto-collected!":"Marching on...");
 recalc();saveGame();R.trans=(s.boss||s.mini)?6.2:1.5;
 if(s.boss){const a=areaIdx(g)+1,key='ch'+S.camp+'_'+a;if(!S.seen[key]){S.seen[key]=1;const st=storyFor(S.camp,a);S.log.push({c:S.camp,a});if(S.log.length>400)S.log.shift();if(st.big)setTimeout(()=>{if(typeof storyModal==="function")storyModal("📖 "+st.title+" · "+realmOf(g).n,st.text,"Onward ▶")},600);else setTimeout(()=>toast("📖 "+st.text,"memo"),600)}}
 if(typeof refreshTab==="function"){refreshTab("map");refreshTab("heroes")}
}
function doWipe(){if(R.defeatPending){showDefeatPrompt();return;}
 S.stage=Math.max(0,S.stage-1);toast("Retreating to stage "+(S.stage+1)+" to 'regroup'","bad");
 for(const h of R.team){h.down=false;h.hp=h.mhp*.7}
 startStage();
}
function gotoStage(g){if(g<0||g>S.max||g>=STAGE_CAP)return false;S.stage=g;startStage();return true}
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
 o=o||{};if(!targetableEnemy(e)||amt<=0)return false;if(e.boss||e.mini)amt*=C.bossM;e.hp-=amt;e.flash=.1;
 if(!o.dot)fnum(e.x,e.y-e.sz*16,fmt(amt),o.crit?"#ffe84a":(o.col||"#ffffff"),o.crit?16:12);
 if(o.crit)S.stats.crits++;
 if(e.hp<=0){killEnemy(e);return true}return false;
}
function killEnemy(e){R.stallSeconds=0;R.stallMultiplier=1;
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
 h.flash=Math.max(0,h.flash-dt);if(h.bubT>0)h.bubT-=dt/Math.max(1,S.speed);
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
    if(h.k==="healer"){const wk=weakestHero();if(wk&&wk.hp/wk.mhp<.92){healHero(wk,wk.mhp*Math.min(.2,.05*(1+.03*(hk.lvl-1)+.03*(hk.at-1))));AU.play("heal");h.artAttack=R.time;burst(wk.x,wk.y,"#5df08a",5,60);h.cd=st.iv;return}}
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
 if(!targetableEnemy(e))return false;
 h.artAttack=R.time;
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
 h.artAttack=R.time;return true;
}

/* ---------- enemies ---------- */
function enemyUpdate(e,dt){
 e.visibleT=e.x<=W-24&&e.x>=0?(e.visibleT||0)+dt/Math.max(1,S.speed):0;
 e.flash=Math.max(0,e.flash-dt);if(e.bubT>0)e.bubT-=dt/Math.max(1,S.speed);e.lunge=Math.max(0,e.lunge-dt*6);
 if(e.dead){e.dieT-=dt;return}
 if(e.burn>0){e.burn-=dt;dmgEnemy(e,e.burnDps*dt,{dot:1});if(e.dead)return}
 if(e.slow>0){e.slow-=dt;if(e.slow<=0)e.slowF=1}
 e.cd-=dt*(HZ()&&HZ().id==="frenzy"?1+.35*hzMit():1);
 if(e.stun>0){e.stun-=dt;return}
 const hs=aliveHeroes();if(!hs.length)return;
 let near=null,bd=1e9;for(const h of hs){const d=Math.abs(e.x-h.x)+.5*Math.abs(e.y-h.y);if(d<bd){bd=d;near=h}}
 const stopX=Math.min(W-36*U,near.x+(e.rng?e.rng:(22+e.sz*10)*U));
 if(e.root>0)e.root-=dt;
 else if(e.x>stopX){const w=WX();e.x-=34*U*e.spd*(w.espd||1)*e.slowF*dt;if(e.x<stopX)e.x=stopX}
 if(targetableEnemy(e)&&(e.x<=stopX+6&&e.cd<=0&&e.root<=0||(e.x<=stopX+6&&e.cd<=0&&e.root>0&&!e.rng))){
  e.cd=e.iv*rand(.9,1.1);
  const w=WX();let d=enemyBase(e.bossG||R.stg.g)*e.dmg*elemE(realmOf(R.stg.g).el)*penUp(w.edmg||1);
  if(e.boss)d*=1+Math.max(0,(R.stgT-40)/20);
  d*=R.stallMultiplier||1;
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
   if(f>=1){R.impacts=R.impacts||[];R.impacts.push({x:p.tx,y:p.ty,t:R.artTime||0,size:Math.min(110,p.rad*1.3)});if(R.impacts.length>8)R.impacts.shift();ring(p.tx,p.ty,"#ff7a2f",p.rad);burst(p.tx,p.ty,"#ff7a2f",18,180);AU.play("boom");R.flash=.2;shake(200);
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
 fnum(d.x,d.y-30,(d.type==="boss"?"Boss":"Elite")+" chest +1","#ffd23a",13);
 if(typeof refreshTab==="function")refreshTab("shop")}
function dropsUpdate(dt){
 if(!R.drops)return;
 for(const d of R.drops){d.t+=dt;d.vy+=900*dt;d.oy+=d.vy*dt;if(d.oy>0){d.oy=0;if(Math.abs(d.vy)>60){d.vy*=-.45;d.bn++}else d.vy=0}if(d.t>=5&&!d.done)collectDrop(d,true)}
 R.drops=R.drops.filter(d=>!d.done)}
function drawDrops(){
 if(!R.drops)return;
 for(const d of R.drops){const pulse=1+.08*Math.sin(R.time*9),sz=40*pulse*U;cx.save();cx.shadowColor=d.type==="boss"?"#d9b76a":"#8fbfae";cx.shadowBlur=6;setFont(sz);cx.textAlign="center";cx.textBaseline="middle";if(!drawCanvasIcon(15,d.x,d.y+d.oy,sz)){cx.fillStyle='#99773e';cx.fillRect(d.x-sz*.4,d.y+d.oy-sz*.3,sz*.8,sz*.6);}cx.restore();
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
function updateStallPressure(dt){
 if(R.trans>0||R.wipeT>0||R.defeatPending||R.modalPause||!R.stg||R.stg.done||!liveEn().length)return;
 R.stallSeconds=(R.stallSeconds||0)+dt/Math.max(1,S.speed);
 const steps=R.stallSeconds>15?1+Math.floor(R.stallSeconds-15):0;
 R.stallMultiplier=Math.min(1e12,Math.pow(1.3,steps));
}
function update(dt){
 if(!R.stg)return;
 R.time+=dt;R.stgT+=dt;updateStallPressure(dt);
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
  if(R.team.length&&R.team.every(h=>h.down)){R.wipeT=2.4;R.defeatPending=true;R.defeatStage=S.stage;R.defeatMultiplier=R.stallMultiplier||1;S.stats.wipes++;bannerShow("TOTAL PARTY WIPE",pick(WIPE_LINES));AU.play("death")}
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
 R.speechClock=(R.speechClock||0)+dt/Math.max(1,S.speed);R.bubT-=dt/Math.max(1,S.speed);
 if(R.reply){R.reply.t-=dt;if(R.reply.t<=0){quip(R.reply.who,QUIP.reply);R.reply=null}}
 if(R.bubT<=0){R.bubT=rand(12,18);const hs=aliveHeroes();if(hs.length&&R.team.filter(h=>h.bubT>0).length<2){heroSay(pick(hs))}
  const en=liveEn();if(en.length&&Math.random()<.4){const e=pick(en);say(e,pick(ENEMY_QUIPS),2.6)}}
 R.tickerT-=dt;if(R.tickerT<=0){R.tickerT=14;ticker(pick(HR))}
 R.uiT-=dt;if(R.uiT<=0){R.uiT=.25;updateStageHud()}
}
function stepSim(sec){const n=Math.round(sec*30);for(let i=0;i<n;i++)update(1/30)}

/* ---------- loop ---------- */
let lastTs=0,acc=0,lastDrawTs=0;
function scheduleBattleFrame(){if(document.hidden||R.modalPause)setTimeout(()=>requestAnimationFrame(frame),250);else requestAnimationFrame(frame);}
function frame(ts){
 scheduleBattleFrame();if(!lastTs){lastTs=ts;return;}
 const dt=Math.min(.1,(ts-lastTs)/1000);lastTs=ts;
 if(!R.inGame||R.modalPause||document.hidden){acc=0;return;}
 acc+=dt*S.speed;let n=0;while(acc>=1/30&&n<10){update(1/30);acc-=1/30;n++;if(R.modalPause)break;}if(n>=10)acc=0;
 R.artTime=(R.artTime||0)+dt*Math.min(1.4,S.speed||1);
 if(ts-lastDrawTs>=1000/30-.5){lastDrawTs=ts;render();}
}
function startLoop(){if(R.loopOn)return;R.loopOn=true;requestAnimationFrame(frame)}

/* ---------- HUD ---------- */
function updateStageHud(){
 if(!R.stg)return;const s=R.stg,g=s.g,w=WX();
 const set=(id,t)=>{const el=document.getElementById(id);if(el&&el.textContent!==t)el.textContent=t};
 set("stLabel","STAGE "+(g+1));set("stRealm",realmName(g)+(HZ()?" · "+HZ().i+HZ().n:""));
 set("stWave",R.trans>0?"MARCHING ON…":"WAVE "+Math.min(s.wave,s.waves)+"/"+s.waves+(s.boss&&s.wave>=3?" · BOSS":"")+((R.stallMultiplier||1)>1?" · DREAD ×"+fmt(R.stallMultiplier):""));
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
archer:{src:'assets/archer.png',cols:4,rows:2,scale:1.9},
barbarian:{src:'assets/barbarian.png',cols:4,rows:2,scale:1.9},
healer:{src:'assets/healer.png',cols:4,rows:2,scale:1.9},
mage:{src:'assets/mage.png',cols:4,rows:2,scale:1.9},
rogue:{src:'assets/rogue.png',cols:4,rows:2,scale:1.9},
bard:{src:'assets/bard.png',cols:4,rows:2,scale:1.9},
alchemist:{src:'assets/alchemist.png',cols:4,rows:2,scale:1.9},
 rat:{src:'assets/hungry-rat.png',cols:4,rows:2,scale:2.0}
};
const PROGRESSION_AREAS=['cellar','sewer','goblin','crypt','fungal','forge','frost','cloud','crossroads','orrery','court','vault','overtime'];
const ENEMY_ART={},ENEMY_ICON_ART={};
PROGRESSION_AREAS.forEach((area,i)=>{const realm=REALMS[i];realm.mobs.concat([realm.boss]).forEach((mob,row)=>{const key=area+'-'+row;GAME_ART[key]={src:'assets/'+area+'-enemies.png',cols:4,rows:7,scale:1.8,enemyRow:row};ENEMY_ART[mob[0]]=key;if(!ENEMY_ICON_ART[mob[1]])ENEMY_ICON_ART[mob[1]]=key;});});
const EXTRA_THEME_ART=[['deepforest','forest'],['dunes','desert'],['reef','ocean'],['glacier','ice'],['toyforge','factory']];
EXTRA_THEME_ART.forEach(([area,theme])=>{const t=THEMES.find(x=>x.id===theme);t.mobs.slice(0,6).concat([t.boss[0]]).forEach((mob,row)=>{const key=area+'-'+row;GAME_ART[key]={src:'assets/'+area+'-enemies.png',cols:4,rows:7,scale:1.8,enemyRow:row};ENEMY_ART[mob[0]]=key;ENEMY_ICON_ART[mob[1]]=key;});});
PROGRESSION_AREAS.push(...EXTRA_THEME_ART.map(x=>x[0]));
for(const [id,a] of Object.entries(FAMILIAR_ART))GAME_ART['pet-'+id]={src:'assets/familiars-'+a.group+'.png',cols:4,rows:5,scale:1.8,enemyRow:a.row,pet:true};
GAME_ART.bouncer={src:'assets/gatekeeper.png',cols:4,rows:2,scale:1.9};
const SEA_HERO_KEYS=['colossus','crossbowman','ronin','druid','storm','pickpocket','engineer','collector'];
SEA_HERO_KEYS.forEach((key,row)=>{GAME_ART[key]={src:'assets/sea-heroes.png',cols:4,rows:8,scale:1.9,enemyRow:row};});
for(const [sheet,keys] of Object.entries(ART_CREWS))keys.forEach((key,row)=>{GAME_ART[key]={src:'assets/'+sheet+'-heroes.png',cols:4,rows:keys.length,scale:1.9,enemyRow:row};});
for(const world of Object.values(CAMPAIGN_WORLDS))world.enemies.forEach((mob,row)=>{const key=world.key+'-enemy-'+row;GAME_ART[key]={src:'assets/'+world.key+'-enemies.png',cols:4,rows:8,scale:1.8,enemyRow:row};ENEMY_ART[mob[0]]=key;});
const STAGE_BACKGROUNDS=PROGRESSION_AREAS.map(area=>{const im=new Image();im.artSource='assets/'+area+'-background.png';return im;});
const BEAN_HERO_KEYS=['templar','gunslinger','monk','sunpriest','frost','assassin','manager','fate'];
BEAN_HERO_KEYS.forEach((key,row)=>{GAME_ART[key]={src:'assets/bean-heroes.png',cols:4,rows:8,scale:1.9,enemyRow:row};});
const COURT_HERO_KEYS=['paladin','ranger','berserker','cleric','pyromancer','duelist','chrono','gambler'];
COURT_HERO_KEYS.forEach((key,row)=>{GAME_ART[key]={src:'assets/court-heroes.png',cols:4,rows:8,scale:1.9,enemyRow:row};});
const THEME_ART={cave:'cellar',forest:'deepforest',desert:'dunes',ice:'glacier',volcano:'forge',swamp:'sewer',ocean:'reef',sky:'cloud',city:'crossroads',space:'orrery',candy:'fungal',haunted:'crypt',factory:'toyforge',crystal:'frost',jungle:'fungal',mountain:'frost',hell:'forge',dream:'cloud',court:'court',farm:'fungal',beach:'sewer'};
function areaArtForRealm(rl){return THEME_ART[rl.th]|| (rl.el==='fire'?'forge':rl.el==='ice'?'frost':rl.el==='storm'?'cloud':rl.el==='nature'?'fungal':'crypt');}
function enemyArtKey(e){const world=CAMPAIGN_WORLDS[S.camp];if(world&&e.mini)return world.key+'-enemy-6';const exact=ENEMY_ART[e.name.replace(/^Elite /,'')];if(exact)return exact;
 const rl=realmOf(S.stage),area=areaArtForRealm(rl);
 if(e.boss)return area+'-6';
 return ENEMY_ICON_ART[e.e]||area+'-'+({grunt:0,runner:1,spitter:2,brute:3,swarm:4,tank:5,elite:3}[e.kind]||0);
}
function requestArt(image,src){if(image.artRequested)return;image.artRequested=true;image.src=src;}
const decodedArt=new Map();for(const a of Object.values(GAME_ART)){if(!decodedArt.has(a.src))decodedArt.set(a.src,new Image());a.image=decodedArt.get(a.src);}
const campaignArt=new Image();
function drawCachedBackdrop(im,sx,sy,sw,sh){const key=im.src+'|'+W+'|'+H+'|'+DPR+'|'+sx+'|'+sy+'|'+sw+'|'+sh;if(!R.backdropCache||R.backdropCache.key!==key){const canvas=document.createElement('canvas');canvas.width=Math.ceil(W*DPR);canvas.height=Math.ceil(H*DPR);canvas.getContext('2d').drawImage(im,sx,sy,sw,sh,0,0,canvas.width,canvas.height);R.backdropCache={key,canvas};}cx.drawImage(R.backdropCache.canvas,0,0,W,H);}
function drawCampaignBackdrop(c){requestArt(campaignArt,"assets/campaign-art.png");if(!campaignArt.complete||!campaignArt.naturalWidth)return false;const cw=campaignArt.naturalWidth/2,ch=campaignArt.naturalHeight/5;const ratio=W/H,sw=Math.min(cw,ch*ratio),sh=sw/ratio;drawCachedBackdrop(campaignArt,(c%2)*cw+(cw-sw)/2,Math.floor(c/2)*ch+(ch-sh)/2,sw,sh);return true;}
function drawEnemyLoadingShape(sz){cx.fillStyle='#738678';cx.beginPath();cx.ellipse(0,0,sz*.4,sz*.5,0,0,Math.PI*2);cx.fill();cx.fillStyle='#dfbd75';cx.fillRect(-sz*.22,-sz*.1,sz*.09,sz*.07);}

const BATTLE_VFX=new Image(),CANVAS_ICONS=new Image();
function drawCanvasIcon(index,x,y,size){requestArt(CANVAS_ICONS,'assets/ui-icons.png');if(!CANVAS_ICONS.complete||!CANVAS_ICONS.naturalWidth)return false;const cw=CANVAS_ICONS.naturalWidth/8,ch=CANVAS_ICONS.naturalHeight/4;cx.drawImage(CANVAS_ICONS,index%8*cw,Math.floor(index/8)*ch,cw,ch,x-size/2,y-size/2,size,size);return true;}
function drawBattleEffect(row,frame,x,y,size){requestArt(BATTLE_VFX,'assets/battle-vfx.png');if(!BATTLE_VFX.complete||!BATTLE_VFX.naturalWidth)return false;const cw=BATTLE_VFX.naturalWidth/4,ch=BATTLE_VFX.naturalHeight/2;cx.drawImage(BATTLE_VFX,frame*cw,row*ch,cw,ch,x-size/2,y-size/2,size,size);return true;}
const SPRITE_POSE_CACHE=new Map();
function paintSprite(key,sz,attack,phase,still,attackStart){
 const a=GAME_ART[key];if(!a)return false;requestArt(a.image,a.src);if(!a.image.complete||!a.image.naturalWidth)return false;
 const cw=a.image.naturalWidth/a.cols,ch=a.image.naturalHeight/a.rows;
 const isAtlas=a.enemyRow!=null,row=isAtlas?a.enemyRow:attack?1:0;
 const walk=a.pet?[0,1,2,3]:isAtlas?[0,1,0,1]:[0,1,2,3];
 const clock=(R.artTime||0)*5+(phase||0);
 const age=Math.max(0,R.time-(attackStart||0))*7;
 const index=attack?Math.min(isAtlas?1:3,Math.floor(age)):Math.floor(clock)%walk.length;
 const frame=attack?(isAtlas?2+index:index):still?0:walk[index];
 const next=attack?Math.min(isAtlas?3:3,frame+1):still?frame:walk[(index+1)%walk.length];
 const frac=attack?age-Math.floor(age):clock-Math.floor(clock),blend=still?0:frac*frac*(3-2*frac);
 const q=Math.round(blend*4)/4,cacheKey=a.src+'|'+row+'|'+frame+'|'+next+'|'+q;
 let canvas=SPRITE_POSE_CACHE.get(cacheKey);
 if(canvas){SPRITE_POSE_CACHE.delete(cacheKey);SPRITE_POSE_CACHE.set(cacheKey,canvas);}
 else{
  const scale=Math.min(1,160/Math.max(cw,ch));canvas=document.createElement('canvas');canvas.width=Math.ceil(cw*scale);canvas.height=Math.ceil(ch*scale);const bc=canvas.getContext('2d');bc.globalCompositeOperation='lighter';
  const draw=(f,alpha)=>{if(alpha<=0)return;const box=(typeof SPRITE_BOUNDS!=='undefined'&&SPRITE_BOUNDS[key]||[])[row*a.cols+f]||[0,0,cw,ch];bc.globalAlpha=alpha;bc.drawImage(a.image,Math.floor(f*cw)+box[0],Math.floor(row*ch)+box[1],box[2],box[3],(cw-box[2])/2*scale,(ch-box[3])*scale,box[2]*scale,box[3]*scale);};
  draw(frame,1-q);draw(next,q);bc.globalAlpha=1;SPRITE_POSE_CACHE.set(cacheKey,canvas);if(SPRITE_POSE_CACHE.size>96)SPRITE_POSE_CACHE.delete(SPRITE_POSE_CACHE.keys().next().value);
 }
 const dw=sz*a.scale,dh=dw*ch/cw;cx.drawImage(canvas,-dw/2,sz*.48-dh,dw,dh);return true;
}
const HERO_ART={knight:'huntsman',archer:'archer',barbarian:'barbarian',healer:'healer',mage:'mage',rogue:'rogue',bard:'bard',alchemist:'alchemist',paladin:'paladin',ranger:'ranger',berserker:'berserker',cleric:'cleric',pyromancer:'pyromancer',duelist:'duelist',chrono:'chrono',gambler:'gambler',templar:'templar',gunslinger:'gunslinger',monk:'monk',sunpriest:'sunpriest',frost:'frost',assassin:'assassin',manager:'manager',fate:'fate',bouncer:'bouncer',colossus:'colossus',crossbowman:'crossbowman',ronin:'ronin',druid:'druid',storm:'storm',pickpocket:'pickpocket',engineer:'engineer',collector:'collector'};
for(const keys of Object.values(ART_CREWS))for(const key of keys)HERO_ART[key]=key;

function actorSprite(key,o,sz,still){if(o.lunge>0&&!(o.artLunge>0))o.artAttack=R.time;o.artLunge=o.lunge;const attack=!o.down&&!o.dead&&o.artAttack!=null&&R.time-o.artAttack<.57;return paintSprite(key,sz,attack,o.ph,still,o.artAttack);}
function drawArtHero(h,sz){return actorSprite(HERO_ART[h.k],h,sz,h.down||h.st==='idle'&&R.trans<=0);}
function spriteRatio(key){const a=GAME_ART[key];if(!a)return null;requestArt(a.image,a.src);if(!a.image.complete||!a.image.naturalWidth)return null;const cw=a.image.naturalWidth/a.cols,ch=a.image.naturalHeight/a.rows;const bounds=typeof SPRITE_BOUNDS==='undefined'?null:SPRITE_BOUNDS[key];const heights=bounds?(a.enemyRow==null?bounds:bounds.slice(a.enemyRow*4,a.enemyRow*4+4)).map(b=>b[3]):[ch];return a.scale*Math.max(...heights)/cw;}
function spriteTop(key,y,sz){const ratio=spriteRatio(key);return ratio==null?y-sz*.65:y+sz*.48-sz*ratio;}
function fitActorSize(key,y,sz){const ratio=(spriteRatio(key)==null?.65:spriteRatio(key)-.48);return Math.min(sz,Math.max(12,(y-106)/ratio));}
function heroSize(h){return fitActorSize(HERO_ART[h.k],h.y,clamp(H*.13,26,40)*(1+.07*((S.heroes[h.k]||{}).evo||0)));}
function heroTop(h){return spriteTop(HERO_ART[h.k],h.y,heroSize(h))-3;}
function enemySize(e){return fitActorSize(enemyArtKey(e),e.y,26*e.sz*U*clamp(H/300,.9,1.2));}
function enemyTop(e){return spriteTop(enemyArtKey(e),e.y,enemySize(e))-3;}
function drawSpeech(){
 const actors=R.team.filter(h=>!h.down).map(h=>({o:h,top:heroTop(h)})).concat(R.en.filter(e=>!e.dead&&e.x<W).map(e=>({o:e,top:enemyTop(e)})));
 const speaking=actors.find(a=>a.o.bubT>0&&a.o.bub);if(!speaking)return;
 const ceiling=Math.min(...actors.map(a=>a.top))-17;
 drawBubble(speaking.o.x,ceiling,speaking.o.bub,speaking.o.bubT);
}
function drawArtEnemy(e,sz){return actorSprite(enemyArtKey(e),e,sz,e.dead||e.stun>0||e.root>0);}
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
  if(p.t==="meteor"){if(!drawBattleEffect(0,Math.floor(p.tt*12)%4,p.cx,p.cy,46*U)){cx.fillStyle="#e6af51";cx.beginPath();cx.arc(p.cx,p.cy,9*U,0,6.28);cx.fill();}}
  else if(p.t==="spit"){cx.fillStyle="#7dff4a";cx.beginPath();cx.arc(p.x,p.y,4,0,6.28);cx.fill()}
  else if(p.arrow){cx.save();cx.translate(p.x,p.y);cx.rotate(p.ang||0);cx.fillStyle="#fff";cx.fillRect(-8,-1,12,2);cx.fillStyle="#19e6ff";cx.fillRect(4,-2,3,4);cx.restore()}
  else{cx.fillStyle=p.col;cx.shadowColor=p.col;cx.shadowBlur=8;cx.beginPath();cx.arc(p.x,p.y,4,0,6.28);cx.fill();cx.shadowBlur=0}}
 R.impacts=(R.impacts||[]).filter(f=>(R.artTime||0)-f.t<.5);for(const f of R.impacts){const phase=Math.min(3,Math.floor(((R.artTime||0)-f.t)*8));drawBattleEffect(1,phase,f.x,f.y,f.size);}
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
 drawSpeech();
 if(R.flash>0){cx.fillStyle="rgba(255,255,255,"+Math.min(.5,R.flash*2)+")";cx.fillRect(0,0,W,H)}
 if(R.buff.cry>0){cx.strokeStyle="rgba(255,47,208,.5)";cx.lineWidth=4;cx.strokeRect(2,2,W-4,H-4)}
 if(R.buff.gold>0){cx.strokeStyle="rgba(255,211,74,.55)";cx.lineWidth=4;cx.strokeRect(6,6,W-12,H-12)}
}
function drawHero(h,sz){const ev=(S.heroes[h.k]&&S.heroes[h.k].evo)||0;sz=heroSize(h);
 const bob=HERO_ART[h.k]?Math.sin((R.artTime||0)*2.5+h.ph)*.35:R.trans>0||h.st==="idle"?Math.sin(R.time*6+h.ph):0;
 cx.fillStyle="rgba(0,0,0,.35)";cx.beginPath();cx.ellipse(h.x,h.y+sz*.45,sz*.45,sz*.14,0,0,6.28);cx.fill();
 cx.save();cx.translate(h.x,h.y+bob);
 if(h.down){cx.globalAlpha=.55;cx.rotate(1.3)}
 if(HERO_ART[h.k]?!!S.flip[h.k]:!!h.c.flip!==!!S.flip[h.k])cx.scale(-1,1);
 setFont(sz*(1+h.lunge*.25));cx.textAlign="center";cx.textBaseline="middle";
 if(h.flash>0){cx.shadowColor="#ff5a6e";cx.shadowBlur=14}
 if(!drawArtHero(h,sz)){if(HERO_ART[h.k])drawEnemyLoadingShape(sz);else cx.fillText(h.down?"💤":h.c.e,0,0);}cx.shadowBlur=0;cx.restore();cx.textBaseline="alphabetic";
 if(ev&&!h.down){cx.font=Math.round(sz*.3)+"px sans-serif";cx.textAlign="center";cx.fillStyle="#ffd23a";cx.fillText("★".repeat(ev),h.x,h.y+sz*.75)}
 if(!h.down){const bw=Math.max(30,sz*1.15),x=h.x-bw/2,y=heroTop(h)-8;cx.fillStyle="rgba(0,0,0,.6)";cx.fillRect(x,y,bw,4);cx.fillStyle=h.hp/h.mhp<.3?"#ff5a6e":"#3dffa0";cx.fillRect(x,y,h.hp<h.mhp?Math.min(bw-1,bw*Math.max(0,h.hp/h.mhp)):bw,4);
  if(h.shield>0){cx.strokeStyle="#ffe9a0";cx.lineWidth=2;cx.beginPath();cx.arc(h.x,h.y,sz*.6,0,6.28);cx.stroke()}}
}
function drawEnemy(e){
 const sz=enemySize(e);
 let a=e.dead?Math.max(0,e.dieT/.35):1;
 const bob=Math.sin(R.time*7+e.ph)*2;
 cx.fillStyle="rgba(0,0,0,.35)";cx.beginPath();cx.ellipse(e.x,e.y+sz*.45,sz*.45,sz*.13,0,0,6.28);cx.fill();
 cx.save();cx.globalAlpha=a;cx.translate(e.x-e.lunge*8,e.y+bob);
 if(e.dead)cx.rotate((1-a)*1.5);
 if(e.mini){cx.shadowColor='#d8b76b';cx.shadowBlur=9;}if(e.flash>0){cx.shadowColor='#fff';cx.shadowBlur=14}
 setFont(sz);cx.textAlign="center";cx.textBaseline="middle";
 if(e.burn>0){cx.shadowColor="#ff7a2f";cx.shadowBlur=12}
 if(e.slow>0||e.root>0){cx.shadowColor="#7fe6ff";cx.shadowBlur=10}
 if(!drawArtEnemy(e,sz))drawEnemyLoadingShape(sz);cx.restore();cx.textBaseline="alphabetic";
 if(e.mini&&!e.dead){cx.font='bold 9px Georgia';cx.fillStyle='#e4c780';cx.textAlign='center';cx.fillText('ELITE',e.x,enemyTop(e)-16);}
 if(e.stun>0){setFont(14);drawCanvasIcon(19,e.x,enemyTop(e)-16,16)}
 if(!e.dead&&(e.hp<e.mhp)){const bw=sz*.9,x=e.x-bw/2,y=enemyTop(e)-8;cx.fillStyle="rgba(0,0,0,.6)";cx.fillRect(x,y,bw,4);cx.fillStyle="#ff2fd0";cx.fillRect(x,y,bw*Math.max(0,e.hp/e.mhp),4)}
}
function drawPets(){let i=0;for(const id of S.petAct){if(!FAMILIAR_ART[id])continue;const x=W*.07+i*37*U,y=H*.57+Math.sin((R.artTime||0)*2+i)*.7;cx.save();cx.translate(x,y);paintSprite('pet-'+id,22,false,i*.7,false);cx.restore();i++;}}
function bubbleLayout(x,y,txt){
 const maxw=Math.min(420,W-28);let font=11,lines,line,bw,bh;
 do {cx.font='600 '+font+'px Nunito,sans-serif';line=font+3;lines=[];let cur='';
 for(const word of txt.split(/\s+/)){if(cur&&cx.measureText(cur+' '+word).width>maxw){lines.push(cur);cur=word}else cur+=(cur?' ':'')+word;}if(cur)lines.push(cur);
 bw=Math.min(W-12,Math.max(80,...lines.map(l=>cx.measureText(l).width))+20);bh=lines.length*line+18;
 if(y-bh-7>=4||font<=8)break;font--;
 }while(true);
 return {lines,bw,bh,bx:clamp(x-bw/2,6,W-bw-6),by:y-bh-7,line};
}
function drawBubble(x,y,txt,t){
 const b=bubbleLayout(x,y,txt);cx.save();cx.globalAlpha=Math.min(1,t*2);
 cx.fillStyle='rgba(15,28,28,.97)';cx.strokeStyle='#c7ad73';cx.lineWidth=1;
 cx.beginPath();if(cx.roundRect)cx.roundRect(b.bx,b.by,b.bw,b.bh,8);else cx.rect(b.bx,b.by,b.bw,b.bh);cx.fill();cx.stroke();
 cx.beginPath();const tx=clamp(x,b.bx+12,b.bx+b.bw-12);cx.moveTo(tx-5,b.by+b.bh);cx.lineTo(tx,b.by+b.bh+5);cx.lineTo(tx+5,b.by+b.bh);cx.fill();
 cx.fillStyle='#f1e8d5';cx.textAlign='center';cx.textBaseline='alphabetic';b.lines.forEach((l,i)=>cx.fillText(l,b.bx+b.bw/2,b.by+18+i*b.line));cx.restore();
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
const campaignBackdrops=new Map();
function campaignBackgroundSource(c,stage){const world=CAMPAIGN_WORLDS[c];if(!world)return null;return 'assets/'+world.key+(Math.floor(stage/30)%2?'-second-background.png':'-background.png');}
function drawIllustratedCampaignBackdrop(c){const src=campaignBackgroundSource(c,S.stage);if(!src)return false;let im=campaignBackdrops.get(src);if(!im){im=new Image();campaignBackdrops.set(src,im);}requestArt(im,src);if(!im.complete||!im.naturalWidth)return false;const scale=Math.max(W/im.naturalWidth,H/im.naturalHeight);drawCachedBackdrop(im,(im.naturalWidth-W/scale)/2,(im.naturalHeight-H/scale)/2,W/scale,H/scale);return true;}
function drawBg(rl,hz){
 if(drawIllustratedCampaignBackdrop(S.camp))return;
 const direct=!S.camp&&areaIdx(S.stage)<REALMS.length&&STAGE_BACKGROUNDS[areaIdx(S.stage)];
 const themed=STAGE_BACKGROUNDS[PROGRESSION_AREAS.indexOf(areaArtForRealm(rl))];
 const stageArt=direct||themed;if(stageArt)requestArt(stageArt,stageArt.artSource);
 if(S.camp&&areaIdx(S.stage)===0&&drawCampaignBackdrop(S.camp))return;
 if(stageArt&&stageArt.complete&&stageArt.naturalWidth){const scale=Math.max(W/stageArt.naturalWidth,H/stageArt.naturalHeight),iw=stageArt.naturalWidth*scale,ih=stageArt.naturalHeight*scale;drawCachedBackdrop(stageArt,(iw-W)/2/scale,(ih-H)/2/scale,W/scale,H/scale);return;}
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

