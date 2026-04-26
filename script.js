const screens = [...document.querySelectorAll(".screen")];
const state = {
  name: "Player",
  role: "Student",
  avatar: "🌱",
  character: "",
  characterIcon: "🌱",
  pathIndex: 0,
  selectedAnswer: "",
  reflection: "",
  xp: 0,
  storms: 0,
  earned: []
};

const paths = [
  {
    name:"The Whispering Path",
    mood:"Storm 1",
    image:"https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=1200&q=80",
    description:"An enchanted forest path shrouded in mystery and twilight. Twisted roots and ethereal mist represent the uncertain beginning of an emotional journey.",
    scenario:'You hear someone say: "They probably aren’t qualified for that job."',
    answers:["Ignore it","Agree silently","Ask a question","Speak up respectfully"],
    mentor:"Marcus Williams",
    mentorRole:"Teacher",
    mentorAvatar:"👨‍🏫",
    quote:'"I’ve been judged before too. Speaking up creates space for others. When we challenge assumptions respectfully, we help everyone grow."',
    tags:["Empathy","Leadership","Awareness"],
    insight:"Questions open dialogue and invite reflection.",
    reward:"Awareness",
    sticker:"🌧️",
    rewardText:"Recognizing the storms within and around us."
  },
  {
    name:"The Forgotten Sanctuary",
    mood:"Storm 2",
    image:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    description:"Ancient stone archways reclaimed by luminous flora create a space between worlds. Here, time slows and deep contemplation becomes possible.",
    scenario:"A friend seems overwhelmed but keeps saying they are fine. You notice the tension and want to help without embarrassing them.",
    answers:["Give advice immediately","Offer quiet support","Tell everyone what is wrong","Avoid getting involved"],
    mentor:"Nia Carter",
    mentorRole:"Community Mentor",
    mentorAvatar:"👩🏽‍🌾",
    quote:'"Support does not always need to be loud. Sometimes care looks like creating a safe place for someone to breathe."',
    tags:["Compassion","Safety","Connection"],
    insight:"Gentle support can protect someone’s dignity.",
    reward:"Compassion",
    sticker:"🌿",
    rewardText:"Creating space for healing and connection."
  },
  {
    name:"The Tranquil Glade",
    mood:"Storm 3",
    image:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    description:"A peaceful meadow bathed in golden light, where wildflowers dance in gentle breezes. This sanctuary represents inner peace and the restoration of hope.",
    scenario:"You are frustrated after a difficult conversation. You can react quickly, shut down, or pause before responding.",
    answers:["React immediately","Pause and breathe","Blame the other person","Pretend it did not happen"],
    mentor:"Avery Brooks",
    mentorRole:"Peer Guide",
    mentorAvatar:"🧑🏾‍🤝‍🧑🏽",
    quote:'"Pausing is not weakness. It gives your values time to catch up with your emotions."',
    tags:["Peace","Self-Control","Reflection"],
    insight:"A pause can turn reaction into wisdom.",
    reward:"Peace",
    sticker:"✨",
    rewardText:"Choosing calm when emotions feel loud."
  },
  {
    name:"The Storm’s Edge",
    mood:"Storm 4",
    image:"https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=1200&q=80",
    description:"Dark storm clouds part to reveal brilliant sky and divine light. This moment of transformation symbolizes breakthrough, clarity, and perseverance.",
    scenario:"You made a mistake during a group project. You can explain it away, avoid the topic, or take responsibility and repair trust.",
    answers:["Hide the mistake","Blame someone else","Take responsibility","Quit the project"],
    mentor:"Dr. Elaine Moore",
    mentorRole:"Leadership Coach",
    mentorAvatar:"👩🏽‍🏫",
    quote:'"Integrity grows when we own the hard parts. Repairing trust is a form of courage."',
    tags:["Courage","Growth","Responsibility"],
    insight:"Responsibility turns mistakes into growth.",
    reward:"Courage",
    sticker:"🔥",
    rewardText:"Speaking up and choosing integrity."
  },
  {
    name:"The Stone Root",
    mood:"Storm 5",
    image:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    description:"Roots grip stone beneath an old forest floor. This place represents resilience, patience, and standing firm through pressure.",
    scenario:"Someone criticizes your idea in front of others. You feel embarrassed, but you still believe your idea has value.",
    answers:["Give up completely","Respond with curiosity","Insult them back","Stop sharing ideas"],
    mentor:"Thomas Reed",
    mentorRole:"Elder Guide",
    mentorAvatar:"👨🏾‍🦳",
    quote:'"Being steady does not mean being silent. It means answering pressure with purpose."',
    tags:["Resilience","Confidence","Patience"],
    insight:"Resilience helps you stay rooted without becoming closed off.",
    reward:"Resilience",
    sticker:"🪨",
    rewardText:"Standing firm while remaining open."
  },
  {
    name:"The Open Sky",
    mood:"Storm 6",
    image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    description:"The clouds lift and the path opens. This final space represents clarity, hope, and the confidence to keep becoming.",
    scenario:"You see a chance to encourage someone else who is just beginning their own difficult journey.",
    answers:["Offer encouragement","Stay distant","Compare your journey to theirs","Tell them what to do"],
    mentor:"Jalen Rivers",
    mentorRole:"Youth Mentor",
    mentorAvatar:"🧑🏽‍🏫",
    quote:'"Growth becomes stronger when we share it. Your story can become a lantern for someone else."',
    tags:["Hope","Mentorship","Community"],
    insight:"Encouragement transforms personal growth into community care.",
    reward:"Hope",
    sticker:"🌤️",
    rewardText:"Carrying light forward for others."
  }
];

function show(id){
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0,0);
  updateHud();
}
function login(){
  const name = document.getElementById("playerName").value.trim();
  state.name = name || "Player";
  state.role = document.getElementById("playerRole").value;
  show("screen-profile");
}
function goHome(){ show("screen-login"); }
function showProfile(){ renderProfile(); show("screen-profile"); }
function showRewards(){ renderRewards(); show("screen-rewards"); }
function showCharacters(){ show("screen-characters"); }
function selectCharacter(name, icon, traits){
  state.character=name; state.characterIcon=icon; state.avatar=icon;
  renderPaths(); show("screen-path");
}
function renderPaths(){
  const list=document.getElementById("pathList"); list.innerHTML="";
  paths.forEach((p,i)=>{
    const card=document.createElement("button");
    card.className="path-card"+(i===state.pathIndex?" selected":"");
    card.onclick=()=>{state.pathIndex=i; renderPaths();}
    card.innerHTML=`<div class="path-image" style="background-image:url('${p.image}')"><strong>${p.name}</strong></div><p>${p.description}</p>`;
    list.appendChild(card);
  });
}
function beginSelectedPath(){ loadStorm(); show("screen-storm"); }
function loadStorm(){
  const p=paths[state.pathIndex];
  document.getElementById("stormLabel").textContent=p.mood;
  document.getElementById("stormTitle").textContent=p.name;
  document.getElementById("stormText").textContent=p.scenario;
  document.getElementById("mentorMiniName").textContent=p.mentor;
  document.getElementById("mentorMiniRole").textContent=p.mentorRole;
  document.getElementById("mentorAvatar").textContent=p.mentorAvatar;
  const answers=document.getElementById("answers"); answers.innerHTML="";
  p.answers.forEach((a,i)=>{
    const b=document.createElement("button");
    b.textContent=String.fromCharCode(65+i)+"   "+a;
    b.onclick=()=>selectAnswer(a,b);
    answers.appendChild(b);
  });
  state.selectedAnswer="";
  document.getElementById("continueDecision").classList.add("disabled");
  renderDots("dots",1);
}
function selectAnswer(answer, btn){
  state.selectedAnswer=answer;
  document.querySelectorAll("#answers button").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected");
  document.getElementById("continueDecision").classList.remove("disabled");
}
function showReflection(){
  document.getElementById("chosenAnswer").textContent=state.selectedAnswer;
  document.getElementById("continueReflection").classList.add("disabled");
  document.getElementById("ownThoughts").value="";
  renderDots("dots2",2);
  show("screen-reflection");
}
function selectReflection(text){
  state.reflection=text;
  document.querySelectorAll("#screen-reflection .answers button").forEach(b=>b.classList.remove("selected"));
  [...document.querySelectorAll("#screen-reflection .answers button")].find(b=>b.textContent===text)?.classList.add("selected");
  document.getElementById("continueReflection").classList.remove("disabled");
}
function showMentor(){
  const p=paths[state.pathIndex];
  document.getElementById("mentorName").textContent=p.mentor;
  document.getElementById("mentorRole").textContent=p.mentorRole;
  document.getElementById("mentorLargeAvatar").textContent=p.mentorAvatar;
  document.getElementById("mentorQuote").textContent=p.quote;
  const tags=document.getElementById("mentorTags"); tags.innerHTML=p.tags.map(t=>`<span>${t}</span>`).join("");
  renderDots("dots3",3);
  show("screen-mentor");
}
function showGrowth(){
  const p=paths[state.pathIndex];
  document.getElementById("growthInsight").textContent=p.insight;
  document.getElementById("xpEarned").textContent="+8";
  const nextXP=state.xp+8;
  document.getElementById("xpTotal").textContent=`${nextXP} / 60`;
  document.getElementById("xpFill").style.width=`${Math.min(100,(nextXP/60)*100)}%`;
  renderDots("dots4",4);
  show("screen-growth");
}
function earnReward(){
  const p=paths[state.pathIndex];
  state.xp+=8;
  state.storms+=1;
  if(!state.earned.includes(p.reward)) state.earned.push(p.reward);
  document.getElementById("earnedTitle").textContent=`${p.reward} Sticker`;
  document.getElementById("earnedSticker").textContent=p.sticker;
  document.getElementById("earnedText").textContent=p.rewardText;
  show("screen-earned");
}
function nextStorm(){
  if(state.earned.length>=paths.length){show("screen-complete"); return;}
  let next=(state.pathIndex+1)%paths.length;
  while(state.earned.includes(paths[next].reward)) next=(next+1)%paths.length;
  state.pathIndex=next;
  loadStorm(); show("screen-storm");
}
function renderProfile(){
  document.getElementById("profileAvatar").textContent=state.avatar;
  document.getElementById("profileName").textContent=state.name;
  document.getElementById("profileRole").textContent=`${state.role}${state.character ? " · " + state.character : ""}`;
  document.getElementById("statXP").textContent=state.xp;
  document.getElementById("statStorms").textContent=state.storms;
  document.getElementById("statStickers").textContent=`${state.earned.length} / ${paths.length}`;
  const percent=Math.round((state.earned.length/paths.length)*100);
  document.getElementById("journeyPercent").textContent=percent+"%";
  document.getElementById("journeyFill").style.width=percent+"%";
}
function renderRewards(){
  const grid=document.getElementById("rewardGrid"); grid.innerHTML="";
  paths.forEach(p=>{
    const earned=state.earned.includes(p.reward);
    const card=document.createElement("div");
    card.className="reward-card"+(earned?"":" locked");
    card.innerHTML=`<div class="sticker">${earned?p.sticker:"🔒"}</div><strong>${earned?p.reward:"Locked"}</strong><p>${earned?p.rewardText:"Complete more storms to reveal this sticker."}</p>`;
    grid.appendChild(card);
  });
  document.getElementById("collectionProgress").textContent=`${state.earned.length} / ${paths.length}`;
  document.getElementById("collectionFill").style.width=`${(state.earned.length/paths.length)*100}%`;
}
function updateHud(){
  document.getElementById("hudName").textContent=state.name;
  document.getElementById("hudRewardCount").textContent=state.earned.length;
}
function renderDots(id,active){
  const el=document.getElementById(id);
  el.innerHTML="";
  for(let i=1;i<=6;i++){
    const dot=document.createElement("span");
    if(i<=active) dot.classList.add("active");
    el.appendChild(dot);
  }
}
function restartGame(){
  state.name="Player"; state.role="Student"; state.avatar="🌱"; state.character=""; state.characterIcon="🌱"; state.pathIndex=0; state.selectedAnswer=""; state.reflection=""; state.xp=0; state.storms=0; state.earned=[];
  document.getElementById("playerName").value="";
  show("screen-login");
}
