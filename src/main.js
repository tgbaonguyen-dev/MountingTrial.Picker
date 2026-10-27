import "./styles.css";

const LIGHT_THEME="mounting-light";
const DARK_THEME="mounting-dark";
const savedTheme=localStorage.getItem("mounting-trial-theme");
const initialTheme=savedTheme===DARK_THEME?DARK_THEME:LIGHT_THEME;
document.documentElement.dataset.theme=initialTheme;

const E = (type, value) => ({ type, value });
const T = (name, ...effects) => ({ name, effects });

const TRIALS = {
  1: [T("Offense Level Up I",E("offense",1)),T("Defense Level Up",E("defense",2)),T("Resilient I",E("defense",1),E("hp",2.5)),T("Growth I",E("hp",5)),T("Defense Skill Up",E("defensePower",1)),T("Take Less Damage",E("damageTaken",5))],
  2: [T("Offense Level Up II",E("offense",2)),T("Body Up I",E("offense",1),E("defense",1),E("hp",2.5)),T("Keen I",E("offense",1),E("hp",5)),T("Resilient II",E("defense",1),E("hp",7.5)),T("Resilient III",E("defense",2),E("hp",5)),T("Growth II",E("hp",10)),T("Headstrong I",E("damageTaken",7.5),E("damage",7.5))],
  3: [T("Keen II",E("offense",2),E("hp",7.5)),T("Keen III",E("offense",3),E("hp",5)),T("Resilient IV",E("defense",3),E("hp",7.5)),T("Resilient V",E("defense",4),E("hp",5)),T("Growth III",E("hp",15)),T("Clash Power Boost",E("clash",1),E("hp",7.5)),T("Final Power Boost",E("final",1),E("hp",5)),T("Base Power Boost",E("base",1),E("hp",2.5))],
  4: [T("Keen IV",E("offense",3),E("hp",15)),T("Body Up II",E("offense",2),E("defense",3),E("hp",10)),T("Body Up III",E("offense",3),E("defense",2),E("hp",10)),T("Growth IV",E("hp",30)),T("Clash Power Spurt",E("clash",1),E("hp",15)),T("Final Power Spurt",E("final",1),E("hp",12.5)),T("Base Power Spurt",E("base",1),E("hp",10)),T("Brutality",E("coin",1),E("minusCoin",1)),T("Headstrong II",E("damageTaken",25),E("damage",25))],
  5: [T("Keen V",E("offense",4),E("hp",10),E("damage",5)),T("Body Up IV",E("offense",3),E("defense",3),E("hp",7.5),E("damage",5)),T("Body Up V",E("offense",4),E("defense",2),E("hp",5),E("damage",5)),T("Growth V",E("offense",1),E("hp",25),E("damage",5)),T("Clash Power Up II",E("clash",1),E("offense",1),E("hp",10),E("damage",5)),T("Final Power Up II",E("final",1),E("offense",1),E("hp",7.5),E("damage",5)),T("Base Power Up II",E("base",1),E("offense",1),E("hp",5),E("damage",5)),T("Brutality II",E("coin",1),E("minusCoin",1),E("damage",5))],
  6: [T("Keen VI",E("offense",5),E("hp",10),E("damage",5)),T("Resilient VI",E("offense",2),E("defense",6),E("hp",10),E("damage",5)),T("Body Up VI",E("offense",5),E("defense",2),E("hp",5),E("damage",5)),T("Growth VI",E("offense",2),E("hp",25),E("damage",5)),T("Clash Power Up III",E("clash",1),E("offense",2),E("hp",10),E("damage",5)),T("Final Power Up III",E("final",1),E("offense",2),E("hp",7.5),E("damage",5)),T("Base Power Up III",E("base",1),E("offense",2),E("hp",5),E("damage",5)),T("Brutality III",E("coin",1),E("minusCoin",1),E("damage",5))],
  7: [T("Keen VII",E("offense",5),E("hp",20),E("damage",7.5)),T("Resilient VII",E("offense",2),E("defense",6),E("hp",20),E("damage",7.5)),T("Body Up VII",E("offense",5),E("defense",2),E("hp",15),E("damage",7.5)),T("Growth VII",E("offense",2),E("hp",35),E("damage",7.5)),T("Clash Power Up IV",E("clash",1),E("offense",2),E("hp",20),E("damage",7.5)),T("Final Power Up IV",E("final",1),E("offense",2),E("hp",17.5),E("damage",7.5)),T("Base Power Up IV",E("base",1),E("offense",2),E("hp",15),E("damage",7.5)),T("Brutality IV",E("coin",1),E("minusCoin",1),E("damage",7.5))],
  8: [T("Keen VIII",E("offense",6),E("hp",30),E("damage",7.5)),T("Resilient VIII",E("offense",3),E("defense",6),E("hp",30),E("damage",7.5)),T("Body Up VIII",E("offense",5),E("defense",4),E("hp",22.5),E("damage",7.5)),T("Growth VIII",E("offense",3),E("hp",45),E("damage",7.5)),T("Clash Power Up V",E("clash",2),E("offense",1),E("hp",25),E("damage",7.5)),T("Final Power Up V",E("final",2),E("offense",1),E("hp",20),E("damage",7.5)),T("Base Power Up V",E("base",2),E("offense",1),E("hp",15),E("damage",7.5)),T("Brutality V",E("coin",2),E("minusCoin",2),E("damage",7.5))],
  9: [T("Keen IX",E("offense",8),E("hp",40),E("damage",10)),T("Resilient IX",E("offense",3),E("defense",9),E("hp",40),E("damage",10)),T("Body Up IX",E("offense",6),E("defense",5),E("hp",32.5),E("damage",10)),T("Growth IX",E("offense",3),E("hp",72.5),E("damage",10)),T("Clash Power Up VI",E("clash",2),E("offense",2),E("hp",40),E("damage",10)),T("Final Power Up VI",E("final",2),E("offense",2),E("hp",35),E("damage",10)),T("Base Power Up VI",E("base",2),E("offense",2),E("hp",30),E("damage",10)),T("Brutality VI",E("coin",2),E("minusCoin",2),E("damage",10))],
  10: [T("Keen XII",E("clash",1),E("offense",8),E("defense",3),E("hp",40),E("damage",10),E("bossHp",30)),T("Resilient XII",E("clash",1),E("offense",4),E("defense",11),E("hp",40),E("damage",10),E("bossHp",30)),T("Body Up XII",E("clash",1),E("offense",6),E("defense",7),E("hp",35),E("damage",10),E("bossHp",30)),T("Growth XII",E("clash",1),E("offense",3),E("defense",3),E("hp",72.5),E("damage",10),E("bossHp",30)),T("Clash Power Up VII",E("clash",3),E("offense",2),E("defense",2),E("hp",42.5),E("damage",10),E("bossHp",30)),T("Final Power Up VII",E("clash",1),E("final",2),E("offense",2),E("defense",2),E("hp",37.5),E("damage",10),E("bossHp",30)),T("Base Power Up VII",E("clash",1),E("base",2),E("offense",2),E("defense",2),E("hp",32.5),E("damage",10),E("bossHp",30))],
  11: [T("Keen XIII",E("coin",1),E("minusCoin",1),E("offense",8),E("defense",5),E("hp",40),E("damage",12.5),E("bossHp",30)),T("Resilient XIII",E("coin",1),E("minusCoin",1),E("offense",5),E("defense",12),E("hp",42.5),E("damage",10),E("bossHp",30)),T("Body Up XIII",E("coin",1),E("minusCoin",1),E("offense",7),E("defense",7),E("hp",40),E("damage",10),E("bossHp",30)),T("Growth XIII",E("coin",1),E("minusCoin",1),E("offense",3),E("defense",3),E("hp",80),E("damage",10),E("bossHp",30)),T("Clash Power Up VIII",E("coin",1),E("minusCoin",1),E("clash",2),E("offense",3),E("defense",3),E("hp",45),E("damage",12.5),E("bossHp",30)),T("Final Power Up VIII",E("coin",1),E("minusCoin",1),E("final",2),E("offense",2),E("defense",2),E("hp",40),E("damage",12.5),E("bossHp",30)),T("Base Power Up VIII",E("coin",1),E("minusCoin",1),E("base",2),E("offense",2),E("defense",2),E("hp",35),E("damage",12.5),E("bossHp",30))],
  12: [T("Keen XIV",E("offense",10),E("defense",5),E("hp",40),E("damage",15),E("bossHp",30)),T("Keen XIV (Resilient)",E("offense",5),E("defense",15),E("hp",45),E("damage",10),E("bossHp",30)),T("Body Up XIV",E("offense",8),E("defense",8),E("hp",45),E("damage",10),E("bossHp",30)),T("Growth XIV",E("offense",3),E("defense",3),E("hp",90),E("damage",10),E("bossHp",30)),T("Clash Power Up IX",E("clash",2),E("offense",4),E("defense",4),E("hp",45),E("damage",15),E("bossHp",30)),T("Final Power Up IX",E("final",2),E("offense",3),E("defense",3),E("hp",40),E("damage",15),E("bossHp",30)),T("Base Power Up IX",E("base",2),E("offense",3),E("defense",3),E("hp",35),E("damage",15),E("bossHp",30))],
  13: [T("Keen XV",E("offense",10),E("defense",5),E("hp",40),E("damage",15),E("bossHp",40)),T("Resilient XV",E("offense",5),E("defense",15),E("hp",45),E("damage",10),E("bossHp",40)),T("Body Up XV",E("offense",8),E("defense",8),E("hp",45),E("damage",10),E("bossHp",40)),T("Growth XV",E("offense",3),E("defense",3),E("hp",90),E("damage",10),E("bossHp",40)),T("Clash Power Up X",E("clash",2),E("offense",4),E("defense",4),E("hp",45),E("damage",15),E("bossHp",40)),T("Final Power Up X",E("final",2),E("offense",3),E("defense",3),E("hp",40),E("damage",15),E("bossHp",40)),T("Base Power Up X",E("base",2),E("offense",3),E("defense",3),E("hp",35),E("damage",15),E("bossHp",40))],
  14: [T("Keen XVI",E("offense",10),E("defense",5),E("hp",40),E("damage",15),E("bossHp",50)),T("Resilient XVI",E("offense",5),E("defense",15),E("hp",45),E("damage",10),E("bossHp",50)),T("Body Up XVI",E("offense",8),E("defense",8),E("hp",45),E("damage",10),E("bossHp",50)),T("Growth XVI",E("offense",3),E("defense",3),E("hp",90),E("damage",10),E("bossHp",50)),T("Clash Power Up XI",E("clash",2),E("offense",4),E("defense",4),E("hp",45),E("damage",15),E("bossHp",50)),T("Final Power Up XI",E("final",2),E("offense",3),E("defense",3),E("hp",40),E("damage",15),E("bossHp",50)),T("Base Power Up XI",E("base",2),E("offense",3),E("defense",3),E("hp",35),E("damage",15),E("bossHp",50))],
  15: []
};

const META = {
  offense:{label:"Offense Level",short:"Offense",category:"offense",unit:"",safe:1.9,fast:2.1,clash:1/3,reason:"tăng clash và damage"},
  defense:{label:"Defense Level",short:"Defense",category:"defense",unit:"",safe:.45,fast:1.25,clash:0,reason:"giảm damage đội bạn gây"},
  hp:{label:"Max HP",short:"Max HP",category:"defense",unit:"%",safe:.16,fast:.55,clash:0,reason:"làm địch lâu chết hơn"},
  bossHp:{label:"Boss Max HP",short:"Boss HP",category:"defense",unit:"%",safe:.12,fast:.5,clash:0,reason:"kéo dài trận boss"},
  damage:{label:"Damage Dealt",short:"Damage",category:"offense",unit:"%",safe:.62,fast:.5,clash:0,reason:"tăng damage của địch"},
  damageTaken:{label:"Damage Taken",short:"Damage Taken",category:"defense",unit:"%",safe:.18,fast:.65,clash:0,reason:"làm địch lâu chết hơn"},
  base:{label:"Base Power",short:"Base",category:"threat",unit:"",safe:6.2,fast:6.2,clash:1,reason:"cộng trực tiếp Power"},
  final:{label:"Final Power",short:"Final",category:"threat",unit:"",safe:6.4,fast:6.4,clash:1,reason:"cộng trực tiếp Power cuối"},
  clash:{label:"Clash Power",short:"Clash",category:"threat",unit:"",safe:8,fast:8,clash:1,reason:"tăng trực tiếp clash"},
  coin:{label:"Plus Coin Power",short:"+Coin",category:"threat",unit:"",safe:12,fast:12,clash:2.5,reason:"tăng mạnh skill nhiều coin"},
  minusCoin:{label:"Minus Coin Power",short:"−Coin",category:"threat",unit:"",safe:12,fast:12,clash:2.5,reason:"tăng sức mạnh Minus Coin"},
  defensePower:{label:"Defense Skill Final Power",short:"Def Power",category:"defense",unit:"",safe:2.4,fast:3.2,clash:0,reason:"làm defense skill mạnh hơn"}
};

const TRIAL_ICONS=[
  ["Defense Skill","/trial-icons/defense-skill.png"],
  ["Offense Level","/trial-icons/offense.png"],
  ["Defense Level","/trial-icons/defense.png"],
  ["Take Less Damage","/trial-icons/take-less-damage.png"],
  ["Body Up","/trial-icons/body-up.png"],
  ["Keen","/trial-icons/keen.png"],
  ["Resilient","/trial-icons/resilient.png"],
  ["Growth","/trial-icons/growth.png"],
  ["Clash Power","/trial-icons/clash.png"],
  ["Final Power","/trial-icons/final.png"],
  ["Base Power","/trial-icons/base.png"],
  ["Brutality","/trial-icons/brutality.png"],
  ["Headstrong","/trial-icons/headstrong.png"]
];

const CUSTOM_STORAGE_KEY="mounting-trial-customs";
const loadCustomTrials=()=>{try{return JSON.parse(localStorage.getItem(CUSTOM_STORAGE_KEY)||"[]");}catch{return[];}};
let customTrials=loadCustomTrials();

const BASE_TRIALS=Object.entries(TRIALS).flatMap(([floor,trials])=>trials.map(trial=>({...trial,floor:Number(floor),id:`${floor}:${trial.name}`,isCustom:false})));
const getAllTrials=()=>[...customTrials,...BASE_TRIALS];

const state={selected:new Map(),mode:"safe",pickCount:2,query:"",floor:"1"};
const $=selector=>document.querySelector(selector);
const libraryGrid=$("#libraryGrid"),arenaContainer=$("#arenaContainer");
const themeToggle=$("#themeToggle");
themeToggle.checked=initialTheme===DARK_THEME;
themeToggle.addEventListener("change",()=>{const theme=themeToggle.checked?DARK_THEME:LIGHT_THEME;document.documentElement.dataset.theme=theme;localStorage.setItem("mounting-trial-theme",theme);});
const score=trial=>trial.effects.reduce((sum,effect)=>sum+effect.value*META[effect.type][state.mode],0);
const clash=trial=>trial.effects.reduce((sum,effect)=>sum+effect.value*META[effect.type].clash,0);
const EFFECT_ORDER={coin:1,minusCoin:2,clash:3,base:4,final:5,offense:6,damage:7,defensePower:8,defense:9,hp:10,bossHp:11,damageTaken:12};
const effectSign=effect=>(effect.type==="damageTaken"||effect.type==="minusCoin"?"−":"+");
const effectVal=effect=>`${effectSign(effect)}${effect.value}${META[effect.type].unit}`;
const effectText=effect=>`${META[effect.type].short||META[effect.type].label} ${effectVal(effect)}`;

const iconForTrial=name=>{
  const custom=customTrials.find(t=>t.name===name);
  const searchName=custom?.iconPrefix||name;
  const icon=TRIAL_ICONS.find(([prefix])=>searchName.startsWith(prefix));
  return icon?icon[1]:"/trial-icons/clash.png";
};

const createEffectChips=effects=>{
  const chips=document.createElement("span");
  chips.className="effect-chips";
  const sorted=[...effects].sort((a,b)=>(EFFECT_ORDER[a.type]??99)-(EFFECT_ORDER[b.type]??99));
  sorted.forEach(effect=>{
    const meta=META[effect.type];
    const category=meta.category||"defense";
    const chip=document.createElement("small");
    chip.className=`trial-chip trial-chip-${category}`;
    chip.innerHTML=`<span class="chip-name">${meta.short||meta.label}</span><b class="chip-val">${effectVal(effect)}</b>`;
    chips.append(chip);
  });
  return chips;
};

// Popover on hover/focus
const popover=$("#trialPopover");
const popoverIcon=$("#popoverIcon");
const popoverTitle=$("#popoverTitle");
const popoverFloor=$("#popoverFloor");
const popoverScore=$("#popoverScore");
const popoverEffects=$("#popoverEffects");

function showPopover(trial,targetEl){
  popoverIcon.src=iconForTrial(trial.name);
  popoverTitle.textContent=trial.name;
  popoverFloor.textContent=trial.isCustom?"Custom":`Floor ${trial.floor}`;
  const clashEst=clash(trial);
  popoverScore.textContent=`Score: ${score(trial).toFixed(1)}${clashEst>0?` • Clash: ~+${clashEst.toFixed(1)}`:""}`;

  popoverEffects.replaceChildren();
  const sorted=[...trial.effects].sort((a,b)=>(EFFECT_ORDER[a.type]??99)-(EFFECT_ORDER[b.type]??99));
  sorted.forEach(effect=>{
    const meta=META[effect.type];
    const category=meta.category||"defense";
    const item=document.createElement("div");
    item.className="popover-item";
    item.innerHTML=`
      <span class="popover-label">${meta.label}</span>
      <span class="trial-chip trial-chip-${category}"><b class="chip-val">${effectVal(effect)}</b></span>
    `;
    popoverEffects.append(item);
  });

  const rect=targetEl.getBoundingClientRect();
  const popoverWidth=270;
  let left=rect.right+8;
  if(left+popoverWidth>window.innerWidth-10){
    left=rect.left-popoverWidth-8;
  }
  if(left<10)left=10;

  let top=rect.top+rect.height/2-40;
  if(top<10)top=10;
  const maxTop=window.innerHeight-260;
  if(top>maxTop)top=Math.max(10,maxTop);

  popover.style.left=`${left}px`;
  popover.style.top=`${top}px`;
  popover.hidden=false;
}

function hidePopover(){
  popover.hidden=true;
}

function toggleTrial(trial){
  const isSelected=state.selected.has(trial.id);
  if(isSelected){
    state.selected.delete(trial.id);
  }else{
    state.selected.set(trial.id,trial);
  }
  const nowSelected=!isSelected;
  const tile=libraryGrid.querySelector(`[data-id="${CSS.escape(trial.id)}"]`);
  if(tile){
    tile.classList.toggle("selected",nowSelected);
    tile.setAttribute("aria-pressed",String(nowSelected));
  }
  renderArena();
}

function removeTrial(id){
  state.selected.delete(id);
  const tile=libraryGrid.querySelector(`[data-id="${CSS.escape(id)}"]`);
  if(tile){
    tile.classList.remove("selected");
    tile.setAttribute("aria-pressed","false");
  }
  renderArena();
}

function deleteCustomTrial(id,event){
  event.stopPropagation();
  customTrials=customTrials.filter(t=>t.id!==id);
  localStorage.setItem(CUSTOM_STORAGE_KEY,JSON.stringify(customTrials));
  state.selected.delete(id);
  hidePopover();
  renderLibrary();
  renderArena();
}

function renderLibrary(){
  libraryGrid.replaceChildren();
  const all=getAllTrials();
  const isSearching=Boolean(state.query);
  const trials=all.filter(trial=>{
    const matchesQuery=!state.query||trial.name.toLowerCase().includes(state.query);
    const matchesFloor=isSearching?true:(state.floor==="all"||trial.floor===Number(state.floor));
    return matchesQuery && matchesFloor;
  });
  const label=isSearching
    ? `Tìm thấy ${trials.length} Trial`
    : (state.floor==="all" ? `Tất Cả (${trials.length})` : `Tầng ${state.floor} (${trials.length} Trial)`);
  $("#libraryCount").textContent=label;
  if(trials.length===0){
    const notice=document.createElement("div");
    notice.className="no-results text-center py-6 col-span-full";
    notice.innerHTML="<strong class='text-xs font-bold block text-base-content/70'>Không Tìm Thấy Trial</strong><p class='text-[0.68rem] text-base-content/40 mt-0.5'>Thử đổi từ khóa hoặc chọn tầng khác.</p>";
    libraryGrid.append(notice);
    return;
  }
  trials.forEach(trial=>{
    const tile=document.createElement("button");
    tile.type="button";
    tile.dataset.id=trial.id;
    tile.className=`armory-tile ${state.selected.has(trial.id)?"selected":""}`;
    tile.setAttribute("aria-pressed",String(state.selected.has(trial.id)));
    tile.addEventListener("click",()=>toggleTrial(trial));

    const icon=document.createElement("img");
    icon.className="tile-icon";
    icon.src=iconForTrial(trial.name);
    icon.alt="";
    icon.loading="lazy";

    const name=document.createElement("span");
    name.className="tile-name";
    name.textContent=trial.name;

    const floor=document.createElement("span");
    floor.className="tile-floor";
    floor.textContent=trial.isCustom?"Custom":`T${trial.floor}`;

    const check=document.createElement("span");
    check.className="tile-check";
    check.textContent="✓";

    tile.append(icon,name,floor,check);

    if(trial.isCustom){
      const delBtn=document.createElement("span");
      delBtn.className="tile-delete";
      delBtn.innerHTML="✕";
      delBtn.title="Xóa Custom Trial này";
      delBtn.addEventListener("click",e=>deleteCustomTrial(trial.id,e));
      tile.append(delBtn);
    }

    tile.addEventListener("mouseenter",()=>showPopover(trial,tile));
    tile.addEventListener("mouseleave",hidePopover);
    tile.addEventListener("focus",()=>showPopover(trial,tile));
    tile.addEventListener("blur",hidePopover);

    libraryGrid.append(tile);
  });
}

function getMathBreakdown(trial){
  const total=score(trial);
  return trial.effects.map(effect=>{
    const meta=META[effect.type];
    const weight=meta[state.mode];
    const pts=effect.value*weight;
    const pct=total>0?Math.round((pts/total)*100):0;
    const clashImp=effect.value*meta.clash;
    return {
      type:effect.type,
      label:meta.short||meta.label,
      fullLabel:meta.label,
      value:effectVal(effect),
      rawVal:effect.value,
      weight,
      pts,
      pct,
      clashImp,
      reason:meta.reason
    };
  }).sort((a,b)=>b.pts-a.pts);
}

function getWinnerExplanation(trial,closestRejected){
  const myClash=clash(trial);
  const myScore=score(trial);

  if(!closestRejected){
    return `<strong>Phân tích tính toán:</strong> Lựa chọn có tổng điểm nguy hại thấp nhất (${myScore.toFixed(1)}đ). Tác động Clash ước tính là +${myClash.toFixed(1)}.`;
  }

  const otherScore=score(closestRejected);
  const otherClash=clash(closestRejected);
  const diffScore=(otherScore-myScore).toFixed(1);
  const diffClash=(otherClash-myClash).toFixed(1);
  const pctSafer=otherScore>0?Math.round(((otherScore-myScore)/otherScore)*100):0;

  let text=`<strong>Phân tích tính toán đối chiếu (${closestRejected.name}):</strong> Nhẹ hơn <strong>${diffScore} điểm nguy hại</strong> (giảm ~${pctSafer}% rủi ro). `;

  if(otherClash>myClash){
    text+=`Tránh được <strong>+${diffClash} Clash Power</strong> cho đối thủ (do quy đổi ~3 Offense Level = 1 Clash). Khi đối thủ không được buff Clash, Sinner duy trì khả năng thắng xúc xắc áp đảo, bảo đảm không bị Stagger hay chịu đòn kết liễu.`;
  }else{
    text+=`Các chỉ số của Trial này (${trial.effects.map(e=>`${META[e.type].short||META[e.type].label} ${effectVal(e)}`).join(", ")}) chỉ làm quái trâu hơn nhẹ mà hoàn toàn không tăng thêm Clash (+0.0 Clash), giữ nguyên độ an toàn cho cả đội.`;
  }

  return text;
}

function getAvoidExplanation(trial,bestTrial){
  const breakdown=getMathBreakdown(trial);
  const myScore=score(trial);
  const bestScore=score(bestTrial);
  const gap=(myScore-bestScore).toFixed(1);
  const dominant=breakdown[0];
  const myClash=clash(trial);
  const bestClash=clash(bestTrial);
  const clashDiff=(myClash-bestClash).toFixed(1);

  let text=`<strong>Phân tích tính toán loại trừ:</strong> Tổng điểm đe dọa <strong>${myScore.toFixed(1)}đ</strong>, cao hơn <strong>+${gap}đ</strong> so với ${bestTrial.name}. `;

  if(dominant){
    text+=`Chỉ số nguy hiểm nhất là <strong>${dominant.fullLabel} (${dominant.value})</strong>, chiếm <strong>${dominant.pts.toFixed(1)}đ</strong> (${dominant.pct}% tổng điểm nguy hại). `;
  }

  if(myClash>bestClash){
    text+=`Tăng thêm <strong>+${clashDiff} Clash Power</strong> cho boss/quái (quy đổi ~3 Offense Lv = 1 Clash). Đối thủ lăn xúc xắc mạnh hơn sẽ dễ dàng bẻ gãy skill của Sinner, đẩy đội hình vào thế Stagger nguy hiểm.`;
  }else{
    text+=`Chỉ số này làm tăng mạnh lượng máu/thủ của địch, kéo dài thời gian trận đấu qua nhiều turn và làm tăng rủi ro mắc sai lầm trong giao tranh.`;
  }

  return text;
}

function renderArena(){
  arenaContainer.replaceChildren();
  const trials=[...state.selected.values()];
  const countBadge=$("#selectedCountBadge");
  if(countBadge)countBadge.textContent=`${trials.length} Slotted`;

  if(trials.length===0){
    const emptyState=document.createElement("div");
    emptyState.className="arena-empty-state";
    emptyState.innerHTML=`
      <div class="hologram-slots-row">
        <div class="hologram-pedestal">
          <span class="text-xs font-black text-primary/70">[ SLOT I ]</span>
          <span class="hologram-label">Trống</span>
        </div>
        <div class="hologram-pedestal">
          <span class="text-xs font-black text-primary/70">[ SLOT II ]</span>
          <span class="hologram-label">Trống</span>
        </div>
        <div class="hologram-pedestal">
          <span class="text-xs font-black text-primary/70">[ SLOT III ]</span>
          <span class="hologram-label">Trống</span>
        </div>
      </div>
      <div class="text-center space-y-1">
        <p class="text-xs font-bold text-base-content/75">Sàn Đối Chiếu Trực Tiếp Trial</p>
        <p class="text-[0.68rem] text-base-content/45 max-w-md">Bấm chọn 2 hoặc 3 Trial từ kho bên dưới. Hệ thống sẽ lập tức đối chiếu nguy cơ và phân tích phương án an toàn nhất cho trận đấu.</p>
      </div>
    `;
    arenaContainer.append(emptyState);
    return;
  }

  if(trials.length===1){
    const single=trials[0];
    const bdown=getMathBreakdown(single);
    const partialState=document.createElement("div");
    partialState.className="arena-empty-state";
    partialState.innerHTML=`
      <div class="hologram-slots-row">
        <div class="duel-card winner flex-1 max-w-[240px]" title="Bấm để bỏ chọn">
          <div class="duel-card-badge"><span>SLOT I</span><span>ĐÃ CHỌN</span></div>
          <div class="duel-card-main">
            <img src="${iconForTrial(single.name)}" alt="" class="duel-icon" />
            <div class="duel-title-box">
              <span class="duel-floor">${single.isCustom?"Custom":`Tầng ${single.floor}`}</span>
              <h4 class="duel-name">${single.name}</h4>
            </div>
          </div>
          <div class="threat-meter safe"><span>THREAT SCORE</span><span>${score(single).toFixed(1)} Đ</span></div>
          <div class="duel-math-box">
            <div class="duel-math-title"><span>Chỉ Số</span><span>Điểm Phạt</span></div>
            ${bdown.map(b=>`<div class="duel-math-row"><span class="duel-math-formula">${b.fullLabel} (${b.value} × ${b.weight})</span><span class="duel-math-val">+${b.pts.toFixed(1)}đ</span></div>`).join("")}
          </div>
          <div class="duel-remove-hint">✕ Bấm thẻ để bỏ chọn</div>
        </div>
        <div class="hologram-pedestal">
          <span class="text-xs font-black text-primary/70">[ SLOT II ]</span>
          <span class="hologram-label">Đang Chờ...</span>
        </div>
        <div class="hologram-pedestal">
          <span class="text-xs font-black text-primary/70">[ SLOT III ]</span>
          <span class="hologram-label">Đang Chờ...</span>
        </div>
      </div>
      <div class="text-center space-y-1 mt-1">
        <p class="text-xs font-bold text-base-content/75">Đã chọn 1 Trial (${single.name})</p>
        <p class="text-[0.68rem] text-base-content/45">Hãy chọn thêm ít nhất 1 Trial nữa từ kho bên dưới để kích hoạt phân tích đối chiếu rủi ro.</p>
      </div>
    `;
    partialState.querySelector(".duel-card")?.addEventListener("click",()=>removeTrial(single.id));
    arenaContainer.append(partialState);
    return;
  }

  // 2+ trials: Full Comparison Duel Arena
  const ranked=[...trials].sort((a,b)=>score(a)-score(b));
  const chosen=ranked.slice(0,Math.min(state.pickCount,ranked.length));
  const rejected=ranked.slice(chosen.length);

  // Top Verdict Banner
  const verdictBanner=document.createElement("div");
  verdictBanner.className="arena-verdict-banner";
  verdictBanner.innerHTML=`
    <div class="flex items-center gap-2 min-w-0">
      <span class="badge badge-success text-[0.6rem] font-black uppercase text-success-content px-1.5 py-0.5">Khuyên Chọn</span>
      <strong class="text-xs font-black truncate">${chosen.map(t=>t.name).join(" + ")}</strong>
      <span class="text-[0.65rem] text-base-content/75 hidden sm:inline">Tổng điểm đe dọa: <b class="text-success font-black">${chosen.reduce((s,t)=>s+score(t),0).toFixed(1)}đ</b></span>
    </div>
    <div class="flex items-center gap-2 text-[0.68rem] font-bold shrink-0">
      <span class="badge badge-sm badge-outline badge-success font-bold text-[0.62rem]">Clash Impact: +${chosen.reduce((s,t)=>s+clash(t),0).toFixed(1)}</span>
      <span class="text-base-content/60 text-[0.65rem] hidden md:inline">Tối ưu theo tính toán (${state.mode==="safe"?"An Toàn":"Farm Nhanh"})</span>
    </div>
  `;
  arenaContainer.append(verdictBanner);

  // Duel Grid
  const duelGrid=document.createElement("div");
  duelGrid.className="arena-duel-grid";

  // Winner Cards
  chosen.forEach(trial=>{
    const card=document.createElement("div");
    card.className="duel-card winner";
    card.role="button";
    card.tabIndex=0;
    card.title="Bấm để bỏ Trial này khỏi đối chiếu";
    card.addEventListener("click",()=>removeTrial(trial.id));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();removeTrial(trial.id);}});

    const closest=rejected[0];
    const clashEst=clash(trial);
    const bdown=getMathBreakdown(trial);

    card.innerHTML=`
      <div class="duel-card-badge">
        <span>★ NÊN CHỌN NHẤT</span>
        <span>${score(trial).toFixed(1)} ĐIỂM</span>
      </div>
      <div class="duel-card-main">
        <img src="${iconForTrial(trial.name)}" alt="" class="duel-icon" />
        <div class="duel-title-box">
          <span class="duel-floor">${trial.isCustom?"Custom":`Tầng ${trial.floor}`}</span>
          <h4 class="duel-name">${trial.name}</h4>
        </div>
      </div>
      <div class="threat-meter safe">
        <span>CLASH RISK: ${clashEst>0?`+${clashEst.toFixed(1)}`:"ZERO (+0.0)"}</span>
        <span>AN TOÀN CAO</span>
      </div>
    `;

    card.append(createEffectChips(trial.effects));

    // Math calculation breakdown box
    const mathBox=document.createElement("div");
    mathBox.className="duel-math-box";
    mathBox.innerHTML=`
      <div class="duel-math-title">
        <span>Công thức tính điểm (${state.mode.toUpperCase()})</span>
        <span>Tỷ trọng</span>
      </div>
      ${bdown.map(b=>`
        <div class="duel-math-row">
          <span class="duel-math-formula">${b.fullLabel} (${b.value} × ${b.weight})</span>
          <span class="duel-math-val">+${b.pts.toFixed(1)}đ (${b.pct}%)</span>
        </div>
      `).join("")}
      <div class="duel-math-row border-t border-base-300 pt-0.5 mt-0.5 font-bold">
        <span class="duel-math-formula">Tổng Điểm Nguy Hại</span>
        <span class="duel-math-val">${score(trial).toFixed(1)}đ</span>
      </div>
    `;
    card.append(mathBox);

    // Tactical calculated explanation
    const rationale=document.createElement("div");
    rationale.className="duel-rationale";
    rationale.innerHTML=getWinnerExplanation(trial,closest);
    card.append(rationale);

    const hint=document.createElement("div");
    hint.className="duel-remove-hint";
    hint.textContent="✕ Bấm thẻ để bỏ chọn";
    card.append(hint);

    duelGrid.append(card);
  });

  // Avoid Cards
  rejected.forEach(trial=>{
    const card=document.createElement("div");
    card.className="duel-card avoid";
    card.role="button";
    card.tabIndex=0;
    card.title="Bấm để bỏ Trial này khỏi đối chiếu";
    card.addEventListener("click",()=>removeTrial(trial.id));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();removeTrial(trial.id);}});

    const gap=(score(trial)-score(chosen.at(-1))).toFixed(1);
    const clashEst=clash(trial);
    const bdown=getMathBreakdown(trial);

    card.innerHTML=`
      <div class="duel-card-badge">
        <span>✕ CẢNH BÁO NGUY HIỂM</span>
        <span>+${gap} Đ NẶNG HƠN</span>
      </div>
      <div class="duel-card-main">
        <img src="${iconForTrial(trial.name)}" alt="" class="duel-icon" />
        <div class="duel-title-box">
          <span class="duel-floor">${trial.isCustom?"Custom":`Tầng ${trial.floor}`}</span>
          <h4 class="duel-name">${trial.name}</h4>
        </div>
      </div>
      <div class="threat-meter danger">
        <span>CLASH IMPACT: +${clashEst.toFixed(1)}</span>
        <span>${clashEst>=1?"NGUY CƠ CLASH CAO":"TĂNG ĐE DỌA"}</span>
      </div>
    `;

    card.append(createEffectChips(trial.effects));

    // Math calculation breakdown box
    const mathBox=document.createElement("div");
    mathBox.className="duel-math-box";
    mathBox.innerHTML=`
      <div class="duel-math-title">
        <span>Công thức tính điểm (${state.mode.toUpperCase()})</span>
        <span>Tỷ trọng</span>
      </div>
      ${bdown.map(b=>`
        <div class="duel-math-row">
          <span class="duel-math-formula">${b.fullLabel} (${b.value} × ${b.weight})</span>
          <span class="duel-math-val">+${b.pts.toFixed(1)}đ (${b.pct}%)</span>
        </div>
      `).join("")}
      <div class="duel-math-row border-t border-base-300 pt-0.5 mt-0.5 font-bold">
        <span class="duel-math-formula">Tổng Điểm Nguy Hại</span>
        <span class="duel-math-val">${score(trial).toFixed(1)}đ (+${gap}đ)</span>
      </div>
    `;
    card.append(mathBox);

    // Tactical calculated explanation
    const rationale=document.createElement("div");
    rationale.className="duel-rationale";
    rationale.innerHTML=getAvoidExplanation(trial,chosen.at(-1));
    card.append(rationale);

    const hint=document.createElement("div");
    hint.className="duel-remove-hint";
    hint.textContent="✕ Bấm thẻ để bỏ chọn";
    card.append(hint);

    duelGrid.append(card);
  });

  arenaContainer.append(duelGrid);
}

function render(){
  renderLibrary();
  renderArena();
}

// Custom Trial Modal
const customModal=$("#customModal");
const openCustomBtn=$("#openCustomModal");
const customForm=$("#customForm");
const customStatInputs=$("#customStatInputs");
const customScorePreview=$("#customScorePreview");
const cancelCustomBtn=$("#cancelCustom");

const STAT_CONFIG=[
  {type:"clash",step:1},
  {type:"coin",step:1},
  {type:"minusCoin",step:1},
  {type:"base",step:1},
  {type:"final",step:1},
  {type:"offense",step:1},
  {type:"damage",step:2.5},
  {type:"defense",step:1},
  {type:"hp",step:2.5},
  {type:"bossHp",step:5},
  {type:"damageTaken",step:2.5},
  {type:"defensePower",step:1}
];

function initCustomStats(){
  customStatInputs.replaceChildren();
  STAT_CONFIG.forEach(stat=>{
    const meta=META[stat.type];
    const label=document.createElement("label");
    label.className="flex items-center justify-between gap-1 p-1.5 rounded-field bg-base-100 text-xs";
    label.innerHTML=`
      <span class="truncate font-semibold text-base-content/75">${meta.label}</span>
      <input type="number" data-stat="${stat.type}" min="0" step="${stat.step}" placeholder="0" class="input input-xs w-16 text-right bg-base-200 font-bold" />
    `;
    label.querySelector("input").addEventListener("input",updateCustomPreview);
    customStatInputs.append(label);
  });
}

function getCustomEffects(){
  const inputs=customStatInputs.querySelectorAll("input[data-stat]");
  const effects=[];
  inputs.forEach(input=>{
    const val=parseFloat(input.value);
    if(!isNaN(val)&&val>0){
      effects.push(E(input.dataset.stat,val));
    }
  });
  return effects;
}

function updateCustomPreview(){
  const effects=getCustomEffects();
  if(effects.length===0){
    customScorePreview.textContent="0.0 điểm";
    return;
  }
  const tempTrial={effects};
  customScorePreview.textContent=`${score(tempTrial).toFixed(1)} điểm`;
}

openCustomBtn?.addEventListener("click",()=>{
  $("#customName").value=`Custom Trial ${customTrials.length+1}`;
  initCustomStats();
  updateCustomPreview();
  customModal.showModal();
});

cancelCustomBtn?.addEventListener("click",()=>customModal.close());

customForm?.addEventListener("submit",event=>{
  event.preventDefault();
  const name=$("#customName").value.trim()||`Custom Trial ${customTrials.length+1}`;
  const floor=Number($("#customFloor").value);
  const iconPrefix=$("#customIcon").value;
  const effects=getCustomEffects();

  if(effects.length===0){
    alert("Vui lòng nhập giá trị > 0 cho ít nhất một chỉ số!");
    return;
  }

  const newTrial={
    name,
    floor,
    effects,
    id:`custom:${Date.now()}`,
    isCustom:true,
    iconPrefix
  };

  customTrials.push(newTrial);
  localStorage.setItem(CUSTOM_STORAGE_KEY,JSON.stringify(customTrials));
  customModal.close();
  state.selected.set(newTrial.id,newTrial);
  render();
});

$("#search").addEventListener("input",event=>{state.query=event.target.value.trim().toLowerCase();renderLibrary();});
document.querySelectorAll("[data-floor]").forEach(button=>button.addEventListener("click",()=>{
  state.floor=button.dataset.floor;
  document.querySelectorAll("[data-floor]").forEach(option=>{
    option.classList.toggle("active",option===button);
  });
  renderLibrary();
}));
$("#mode").addEventListener("change",event=>{
  state.mode=event.target.value;
  const badge=$("#modeDisplayBadge");
  if(badge)badge.textContent=state.mode==="safe"?"Chế Độ: An Toàn":"Chế Độ: Farm Nhanh";
  renderArena();
});
$("#pickCount").addEventListener("change",event=>{
  state.pickCount=Number(event.target.value);
  renderArena();
});
$("#clear").addEventListener("click",()=>{
  state.selected.clear();
  libraryGrid.querySelectorAll(".armory-tile.selected").forEach(card=>{
    card.classList.remove("selected");
    card.setAttribute("aria-pressed","false");
  });
  renderArena();
});

const sourcesModal=$("#sourcesModal");
const openSourcesBtn=$("#openSourcesBtn");
openSourcesBtn?.addEventListener("click",()=>sourcesModal?.showModal());

render();
