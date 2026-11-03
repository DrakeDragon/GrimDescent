/* Illustrated campaign casts. Existing Gatekeeper art remains separate. */
const ART_CREWS={
 iceguard:['captain','sniper','valkyrie','shaman','sorcerer','swashbuckler','drillsergeant','accountant'],
 wedding:['dragoon','falconer','deity','beastmaster','voidwalker','shadowdancer','standardbearer','jester'],
 bone:['bomber','gladiator','nurse','elementalist','graverobber','speaker','magician'],
 workshop:['mecha','slinger','hunter','plague','conjurer','bountyhunter','cheerleader','clown']
};
for(const keys of Object.values(ART_CREWS))for(const k of keys)if(!APPROVED_HERO_ART.includes(k))APPROVED_HERO_ART.push(k);
function expansionPortrait(k){for(const [sheet,keys] of Object.entries(ART_CREWS)){const i=keys.indexOf(k);if(i>=0)return `<span class="hero-portrait expansion-portrait" role="img" aria-label="${CLS[k].hero}" style="--hero-sheet:url('assets/${sheet}-portraits.png');--px:${i%4*100/3}%;--py:${i<4?0:100}%"></span>`;}return null;}
