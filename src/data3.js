/* ============ DESCENT INC. v2.2 — QUIPS, SUPPLIES, GEM SHOP ============ */
HERO_GEN_QUIPS.push("Is it just me or is the floor getting more violent?","I didn't sign up for this. I signed up for 'light adventuring'.","If anyone asks, I was here the whole time. Fighting. Heroically.","We should unionize. Anyone? ...Anyone?","This is the fourth Tuesday this week.","I can't feel my feet. It's fine. I've never used them much anyway.","Whoever invented 'mandatory overtime' should be fed to a mimic.","My horoscope said 'avoid monsters'. Rude.","I'm just here for the snacks and the existential dread.","Can we get a performance review that isn't a fistfight?","How is it still the same wave? I've counted. It's the same wave.","I'd like to file a complaint. The complaint is: everything.","Honestly? I miss the basement.","I wonder what my family thinks I do for a living.","You know what? I respect the monsters. They show up. Unlike Greg.","Note to self: stop volunteering for things.","Nothing says 'job security' like constant mortal peril.","I'm not saying it's a bad dungeon. I'm saying I'd give it one star.","We're basically a very violent book club.","Tell my cat I fought bravely. Tell my landlord I'm broke.");
ENEMY_QUIPS.push("Fresh meat! (That's you.)","I'm on my break, actually.","Do you have an appointment?","Nobody told me about the dental plan either.","I have a mortgage and a dream. The dream is you, leaving.","Sir, this is a Wendy's.","I'm just a monster doing monster things.","Please hold. Your death is important to us.","My therapist says I should hit more people.","Not the face! The other face!","Ow. Rude. Ow.","I only wanted to be a florist.");
BOSS_QUIPS.push("Your performance review is scheduled for NEVER.","I eat heroes for breakfast. And lunch. Dinner is a mimic.","Please state your business. Then your last words.","I'll be right with you. After I destroy you.","You have exceeded your allotted number of lives.");
const QUIP={
 crit:["BOOM. Put that in my résumé.","That one's gonna leave a mark on the invoice.","Critical hit! I felt that in my soul.","Was that me? That was me. Nice.","Hit 'em where the paperwork hurts.","I regret nothing. Especially that.","And THAT'S how you get promoted.","Yeet.","Oh, that was NASTY. Do it again."],
 lowhp:["Everything hurts and I'm not even paid for this.","I'm fine. I'm FINE. Someone heal me.","Tell my family I almost had a pension.","Medic? Anyone? I'll pay in exposure.","I can see a light! Oh wait, that's a lantern.","Is there a heroic way to say 'ow'?","Remember me as I was: mostly intact."],
 kill:["Another one bites the dust. They're all so dusty.","One less colleague at the dungeon.","Rest in pieces.","I'm not saying it was easy. I'm saying I'm bored.","Next! Please take a number.","They never learn.","Cha-ching. Wait, wrong sound.","Dead. Efficient. Cheap."],
 bossIn:["Oh no. It's the BIG one. It's got a name tag and everything.","Is that a boss? It's wearing a lanyard.","I did not stretch for this.","Everyone act natural. Pretend we're not here.","That is a LOT of health bar.","Can we reschedule? I'm busy being scared.","If we die, tell them it was Dave's fault."],
 bossDead:["Boss down! Someone get the confetti.","That's gonna look great on my LinkedIn.","Ding dong, the manager is dead.","We did it! Don't make it weird.","Hostile takeover: successful."],
 loot:["Ooh, shiny. Mine now.","Is that gear? Please be gear.","Finders keepers, legally speaking.","I'll take it. It's probably cursed. Whatever.","The dungeon provides. Reluctantly."],
 lvl:["I feel stronger. Marginally. Spiritually.","Level up! Time to pretend I earned it.","New level, new me. Same back pain.","Raise accepted! Wait, that's a level.","Stats go brrr."],
 clear:["Stage clear! Anyone have a break room?","One stage down. Infinity to go.","Nice work, team. Please never speak of it.","That went suspiciously okay.","On to the next catastrophe!","Great. Now do it again, but deeper.","Moving on before HR notices."],
 allyDown:["Man down! Man... fainted. Man's fine.","Incident report time!","He'll be fine. Probably. Maybe. Eventually.","And that's why we wear helmets. Except he didn't.","Someone wake him up before HR calls."],
 weather:["I don't remember ordering weather.","Of course it's weather. Of course.","This is just what I get for leaving the house."],
 reply:["Oh, stop it.","You're not wrong.","Technically correct. The worst kind.","I'm gonna pretend I didn't hear that.","Same, honestly.","Nobody asked, but thanks.","Wow. Okay.","I'm telling HR you said that.","We're all thinking it.","Can you not?","Bold of you to assume I was listening.","Ha. Ha. Ha. That's not funny.","Hard agree. Soft violence.","This is why nobody sits with us at lunch."],
 hire:["Hi. I'm new. Where's the break room?","Reporting for duty! And lunch!","What's the dental situation?","I was told there would be snacks."],
 heal:["Thanks! Don't tell anyone I needed that.","Back in business. Slightly.","Ahh. Magic. Billable, probably."]
};
const quip=(h,arr,ch)=>{if(!h||h.down||h.bubT>0||Math.random()>(ch==null?1:ch))return false;let t=null;if(typeof heroLine==="function"&&Math.random()<.85){const cat=CAT_OF.get(arr);if(cat)t=heroLine(h,cat)}say(h,t||pick(arr),3.2);return true};
const UTILS=[
 {id:"manual",n:"Training Manual",i:"📘",d:"+1 level on every squad hero."},
 {id:"ticket",n:"Golden Ticket",i:"🎟️",d:"Gold ×2 for 5 minutes."},
 {id:"pre",n:"Pre-Workout Shake",i:"🥤",d:"Squad damage ×1.1 for 5 minutes."},
 {id:"donut",n:"Emergency Donut",i:"🍩",d:"Revive and fully heal the whole squad."},
 {id:"egg",n:"Mystery Egg",i:"🥚",d:"Hatches a random pet. No refunds."}
];
const GEMS=[
 {id:"gchest",n:"Gilded Chest",i:"🎁",cost:()=>3,d:"Epic+ gear for the whole squad, a huge pile of gold and 3 supplies."},
 {id:"gskip",n:"Time Skip",i:"⏩",cost:()=>2,d:"Instantly collect one hour of idle gold."},
 {id:"gegg",n:"Mythic Egg",i:"🥚",cost:()=>2,d:"A guaranteed Epic or Legendary pet."},
 {id:"gmanual",n:"Gilded Manual",i:"📗",cost:()=>4,d:"+3 levels on every squad hero."},
 {id:"gwallet",n:"Gem-Studded Wallet",i:"👛",cost:l=>5+3*l,max:10,d:l=>"+"+10*l+"% gold forever (survives Rewrite)"},
 {id:"gpower",n:"Rune of Power",i:"🔱",cost:l=>5+3*l,max:10,d:l=>"+"+10*l+"% damage forever (survives Rewrite)"},
 {id:"gpick",n:"Recruitment Voucher",i:"🎟️",cost:l=>8+4*l,max:99,d:l=>"Instantly trigger a Recruitment Event (pick 1 of 3 heroes)"},
 {id:"gso",n:"Insider Stock Tip",i:"📈",cost:()=>6,d:"+8 Wishes instantly."}
];
CLS.rogue.flip=true;CLS.assassin.flip=true;CLS.ranger.flip=false;
