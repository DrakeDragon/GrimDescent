/* Recruitment unlock uses elapsed real time and an explicit finished-art roster. */
const RECRUIT_DAY=864e5;
const APPROVED_HERO_ART=['knight','archer','barbarian','healer','mage','rogue','bard','alchemist','paladin','ranger','berserker','cleric','pyromancer','duelist','chrono','gambler','templar','gunslinger','monk','sunpriest','frost','assassin','manager','fate','colossus','crossbowman','ronin','druid','storm','pickpocket','engineer','collector','bouncer'];
function recruitUnlockAt(s=S){return (s.recruitStartedAt||Date.now())+RECRUIT_DAY;}
function recruitReady(s=S){return Date.now()>=recruitUnlockAt(s);}
function recruitWait(s=S){return Math.max(0,recruitUnlockAt(s)-Date.now());}
function normalizeRecruitment(s){if(!Number.isFinite(s.recruitStartedAt))s.recruitStartedAt=Date.now();s.recruitPending=Math.max(0,s.recruitPending||0);if(!s.recruitScheduleV){s.pickAt=Math.min(s.pickAt||recruitUnlockAt(s),recruitUnlockAt(s));s.recruitScheduleV=1;}if(!recruitReady(s)){s.recruitPending=Math.min(5,s.recruitPending+(s.picks||0));s.picks=0;s.pickList=null;}else if(s.pickList){s.pickList=s.pickList.filter(k=>APPROVED_HERO_ART.includes(k)&&!s.own[k]);if(!s.pickList.length)s.pickList=null;}return s;}
