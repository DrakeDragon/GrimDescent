const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const vc=new VirtualConsole();const errs=[];
vc.on('jsdomError',e=>errs.push('JSDOMERR '+(e.detail&&e.detail.stack||e.message)));vc.on('error',e=>errs.push('ERR '+e));
const html=fs.readFileSync('index.html','utf8').replace(/<link[^>]*>/g,'');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://example.com/',virtualConsole:vc,
 beforeParse(w){const ctx=new Proxy({}, {get:(t,k)=>k==='canvas'?{}:k==='measureText'?()=>({width:20}):()=>({addColorStop(){}}),set:()=>true});
  w.HTMLCanvasElement.prototype.getContext=()=>ctx;w.requestAnimationFrame=()=>0;w.navigator.vibrate=()=>{}}});
const w=dom.window;const ev=s=>w.eval(s);
function clickAct(act,extra){const b=w.document.createElement('button');b.dataset.act=act;Object.assign(b.dataset,extra||{});w.document.body.appendChild(b);b.click();b.remove()}
function T(name,f){try{f()}catch(e){errs.push('FAIL '+name+': '+(e.stack||e).toString().split('\n').slice(0,4).join(' | '))}}
T('start',()=>{clickAct('newGame');console.log('inGame',ev('R.inGame'),'stage',ev('S.stage'),'heroes',ev('Object.keys(S.heroes).join()'),'dep',ev('S.dep.join()'));clickAct('close');ev('stepSim(20)');console.log('kills',ev('S.kills'),'gold',ev('fmt(S.gold)'))});
T('taps',()=>{for(let i=0;i<30;i++)ev('tapAt(200,200)')});
T('tabs',()=>{ev('S.gold=1e9;S.max=100;S.stats.maxEver=100');for(const t of ['shop','orders','heroes','gear','pets','map','more'])clickAct('tab',{t})});
T('upgrades',()=>{clickAct('tab',{t:'orders'});for(const id of ['sword','auto','crit','critdmg','gold','vit','armor','umb','luck'])clickAct('up',{id});for(const id of ['slash','cry','cash','meteor','hr'])clickAct('skUp',{id});clickAct('qty',{q:'max'});clickAct('up',{id:'sword'});clickAct('qty',{q:'1'})});
T('hire',()=>{ev('S.max=1000;S.stats.maxEver=1000;S.gold=1e60;recalc()');clickAct('tab',{t:'heroes'});for(const id of ev('SLOT_ORDER'))clickAct('unlockSlot',{id});console.log('seated',ev('S.dep.join()'));
 for(let i=0;i<150;i++){ev('addPicks(1)');clickAct('pickOpen');const k=ev('S.pickList&&S.pickList[0]');if(!k)break;clickAct('pickDo',{k});clickAct('close')}console.log('own',ev('Object.keys(S.own).length'));
 for(const sd of ev('SLOT_DEFS')){clickAct('swapOpen',{id:sd.id});for(const k of sd.list)clickAct('seatHero',{id:sd.id,k});clickAct('close')}
 clickAct('tab',{t:'heroes'});console.log('dep',ev('S.dep.join()'),'links',ev('C.links.length'))});
T('herodetail',()=>{for(const k of ev('CLS_ORDER')){ev(`ensureHero('${k}');recalc()`);clickAct('hero',{k});clickAct('hlv2',{k});clickAct('hlv2',{k});clickAct('close')}});
T('swap',()=>{clickAct('swapOpen',{id:'van'});clickAct('seatHero',{id:'van',k:'knight'});clickAct('close');console.log('field',ev('R.team.map(h=>h.k).join()'))});
T('sim all specials',()=>{ev('S.gold=1e15');ev('S.stage=300;startStage()');for(let i=0;i<8;i++){ev('stepSim(15)');ev('S.gold=1e15;for(const k in S.heroes){S.heroes[k].lvl=Math.max(S.heroes[k].lvl,60)}recalc()')}console.log('stage',ev('S.stage'),'kills',ev('S.kills'),'deaths',ev('S.stats.deaths'))});
T('weather',()=>{for(const id of ev('Object.keys(WXD)')){ev(`setWeather('${id}',false)`);ev('stepSim(12)');ev('render()')}});
T('skills',()=>{for(const id of ['slash','cry','cash','meteor','hr']){ev(`R.cd.${id}=0;useSkill('${id}')`)}ev('stepSim(5)')});
T('loot',()=>{ev('for(let i=0;i<40;i++)dropLoot(i%5==0)');clickAct('tab',{t:'gear'});const id=ev('S.bag[0]&&S.bag[0].id');if(id){clickAct('item',{id});clickAct('enh',{id});clickAct('equip',{k:'knight',id});clickAct('close')}clickAct('sellJunk')});
T('shop',()=>{ev('S.gold=1e40;S.gems=500;S.max=60');clickAct('tab',{t:'shop'});clickAct('buyBox');clickAct('close');for(const u of ev('UTILS.map(x=>x.id)')){clickAct('buyUtil',{id:u});clickAct('useUtil',{id:u});clickAct('close')}for(const g of ev('GEMS.map(x=>x.id)')){clickAct('buyGem',{id:g});clickAct('close')}console.log('gems left',ev('S.gems'),'gemUp',ev('JSON.stringify(S.gemUp)'))});
T('minibossStage',()=>{ev('S.stage=4;startStage();stepSim(1)');for(let i=0;i<40;i++){ev('for(const e of R.en)if(!e.dead)dmgEnemy(e,1e30);stepSim(4)');if(ev('S.chestBag.length>0'))break}console.log('mini chest queued',ev('S.chestBag.length>0'));ev('S.stage=9;startStage()');for(let i=0;i<40;i++){ev('for(const e of R.en)if(!e.dead)dmgEnemy(e,1e30);stepSim(4)');if(ev('S.chestBag.length>1'))break}console.log('chests',ev('S.chestBag.length'),'gems',ev('S.gems'))});
T('chests+offline',()=>{ev('S.chestBag=[];S.stage=4;S.max=20;startStage();stepSim(1)');for(let i=0;i<40;i++){ev('for(const e of R.en)if(!e.dead)dmgEnemy(e,1e30);stepSim(2)');if(ev('R.drops&&R.drops.length'))break}console.log('drops',ev('R.drops.length'));ev('R.modalPause=false;tapAt(R.drops[0].x,R.drops[0].y)');console.log('bag after tap',ev('S.chestBag.length'));ev('S.chestBag.push({t:"boss",g:30},{t:"mini",g:30})');clickAct('tab',{t:'shop'});clickAct('chestOne');clickAct('close');clickAct('chestAll');clickAct('close');
 ev('S.gold=1e9;S.max=60;S.stage=40;recalc()');const o=ev('JSON.stringify(offlineGain(8*3600))');console.log('offline',o);ev('applyOffline(offlineGain(8*3600))');console.log('now stage',ev('S.stage'),'bag',ev('S.chestBag.length'));clickAct('tab',{t:'gear'})});
T('flip',()=>{clickAct('hero',{k:'rogue'});clickAct('flipSpr',{k:'rogue'});clickAct('close')});
T('pets',()=>{clickAct('tab',{t:'pets'});for(let i=0;i<30;i++)clickAct('egg');clickAct('close');for(const p of ev('Object.keys(S.pets)')){clickAct('petTog',{id:p});clickAct('petUp',{id:p})}ev('stepSim(20)')});
T('map',()=>{clickAct('tab',{t:'map'});clickAct('goStage',{g:'12'});clickAct('goStage',{g:'0'});clickAct('wxguide');clickAct('close');clickAct('codex');clickAct('close');clickAct('speed');clickAct('autoTog');clickAct('prevStage');clickAct('nextStage')});
T('more',()=>{clickAct('tab',{t:'more'});clickAct('achs');clickAct('close');clickAct('stats');clickAct('close');clickAct('settings');clickAct('close');clickAct('howto');clickAct('close');clickAct('credits');clickAct('close');clickAct('restr');clickAct('perk',{id:'pay'});clickAct('close')});
T('restructure',()=>{ev('S.max=60;S.stage=60');console.log('soGain',ev('soGain()'));clickAct('restrDo');console.log('restr',ev('S.restructures'),'stage',ev('S.stage'));ev('stepSim(10)')});
T('wipe',()=>{ev('S.stage=30;startStage();for(const h of R.team){hurtHero(h,1e12)}');ev('stepSim(6)');console.log('after wipe stage',ev('S.stage'))});
T('campaigns',()=>{ev('S.gold=1e40;S.max=150;S.campBest[0]=150');clickAct('tab',{t:'map'});clickAct('camp',{c:'1'});clickAct('campDo',{c:'1'});console.log('camp',ev('S.camp'),'max',ev('S.max'),'name',ev('realmName(0)'),'heroes',ev('S.dep.join()'));ev('stepSim(10)');ev('S.max=50;S.gold=1e20');clickAct('restrDo');clickAct('camp',{c:'0'});clickAct('campDo',{c:'0'});console.log('back',ev('S.camp'),'max',ev('S.max'),ev('S.restructures'));
 ev('S.stage=1999;S.max=1999;startStage()');for(let i=0;i<30;i++){ev('for(const e of R.en)if(!e.dead)dmgEnemy(e,1e300);stepSim(3)')}console.log('cap stage',ev('S.stage'),'max',ev('S.max'));clickAct('close');ev('S.stage=5;S.max=5;startStage()')});
T('automgr+milestones',()=>{ev('S.max=30;S.gold=1e30;S.autoMgr=true');clickAct('tab',{t:'heroes'});for(let i=0;i<3;i++)ev('autoManage()');console.log('knight lvl',ev('S.heroes.knight.lvl'),'evo',ev('S.heroes.knight.evo'),'ms',ev('C.msMul'));ev('S.heroes.knight.lvl=24;recalc();S.gold=1e30');clickAct('hlv',{k:'knight'});console.log('evo after 25',ev('S.heroes.knight.evo'));ev('S.autoMgr=false')});
T('evo+potions+hazards',()=>{ev('S.gold=1e60;S.max=1000;recalc()');ev('for(const id of SLOT_ORDER)unlockSlot(id)');for(const k of ev('S.dep'))ev(`S.heroes['${k}'].lvl=130`);ev('recalc()');
 clickAct('tab',{t:'heroes'});console.log('evo',ev('S.dep.map(k=>S.heroes[k].evo).join()'));
 ev('S.pot={str:2,spd:2,hp:2}');for(const t of ['str','spd','hp'])clickAct('drink',{t});console.log('pb',ev('JSON.stringify(S.pb)'));clickAct('tab',{t:'shop'});for(const t of ['str','spd','hp'])clickAct('buyPot',{t});
 for(let a=0;a<14;a++){ev(`S.stage=${'${a}'}*10+2;onAreaChanged();startStage()`.replace('${a}',a));ev('stepSim(14)');console.log('area',a,ev('HZ()?HZ().id:"-"'),ev('R.team.filter(h=>!h.down).length'))}
 ev('S.pb={str:0,spd:0,hp:0}');ev('stepSim(5)');
 ev('openChest("boss",50)');console.log('pots',ev('JSON.stringify(S.pot)'));clickAct('close')});
T('save',()=>{ev('saveGame()');const raw=w.localStorage.getItem('descentinc_save_v4');JSON.parse(raw);console.log('save bytes',raw.length);clickAct('quitDo');clickAct('cont');ev('stepSim(5)');console.log('reloaded inGame',ev('R.inGame'))});
console.log(errs.length?errs.join('\n'):'NO ERRORS');
