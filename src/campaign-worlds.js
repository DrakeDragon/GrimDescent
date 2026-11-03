/* Campaign presentation overlays retain generated combat kinds, weather and tuning. */
const CAMPAIGN_WORLDS={
 6:{key:'wedding',places:['The Scorched Aisle','The Rose-Glass Cathedral','The Banquet of Golden Fruit','The Cursed Rose Garden','The Basilisk Chapel','The Wyrm Groom’s Altar'],
 enemies:[['Dragonling Sentry',''],['Cursed Bridesmaid',''],['Wedding-Cake Gargoyle',''],['Golden-Fruit Florist',''],['Basilisk Priest',''],['Banquet Mimic',''],['The Wolf Best Man',''],['Lord Vermithrax, the Wyrm Groom','']],
 bosses:[2,1,3,6,4,2,4,6,7,7],
 intro:'The wedding bells have rung for a hundred years. Behind the scorched roses, the Wyrm Groom waits for a kingdom to say yes.',
 mid:'A toast echoes through the valley. The guests bare their teeth. The Wolf Best Man has noticed the uninvited party.',
 out:'The candles gutter and another wedding vow breaks. The party presses deeper into the valley.'},
 7:{key:'bone',places:['The Riddle Gate','The Skull-Lantern Path','The Whispering Well','The Riders’ Crossing','The Firebird Grove','The Walking Hut’s Clearing'],
 enemies:[['Bone-Fence Hound',''],['Skull-Lantern Wisp',''],['Birch Revenant',''],['Mortar Imp',''],['Hungry Root',''],['Grave Crow',''],['The Midnight Rider',''],['Baba Yaga, Mother of the Walking Hut','']],
 bosses:[0,2,3,6,5,4,6,2,7,7],
 intro:'Amber skull-lanterns watch the silver birches. Somewhere beyond the bone fence, a wooden hut turns to face the approaching party.',
 mid:'Hooves sound between the trees. The Midnight Rider has come to collect the toll, and the orchard holds its breath.',
 out:'The roots loosen their grip. A skull-lantern dims, and the path to the walking hut opens a little farther.'}
};
const CAMPAIGN_REALM_CACHE=new Map();
function illustratedCampaignRealm(i,c){
 const key=c+':'+i;if(CAMPAIGN_REALM_CACHE.has(key))return CAMPAIGN_REALM_CACHE.get(key);
 const world=CAMPAIGN_WORLDS[c],base=genRealm(i+5000*c),boss=world.enemies[world.bosses[i%world.bosses.length]];
 const realm={...base,n:world.places[i%world.places.length]+' · Chapter '+(i+1),mobs:world.enemies.slice(0,6),boss:[boss[0],boss[1],i%10>=8?'Keeper of the tale':'Guardian of the path'],intro:world.intro,mid:world.mid,out:world.out};
 CAMPAIGN_REALM_CACHE.set(key,realm);return realm;
}
