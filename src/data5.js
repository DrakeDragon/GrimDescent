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
