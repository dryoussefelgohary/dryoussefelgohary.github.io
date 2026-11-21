(function(){
const S = window.SITE || {};
const SPEC = [
 {id:"surgery",ar:"جراحة الفم",en:"Oral Surgery",d_ar:"خلع الأسنان البسيط والجراحي، الأسنان المطمورة، وإدارة ما بعد الجراحة.",d_en:"Simple and surgical extractions, impacted teeth and post-operative care.",ic:"M12 2v20M5 9l7-7 7 7"},
 {id:"restorative",ar:"الحشوات (علاج تحفظي)",en:"Restorative Dentistry",d_ar:"حشوات تجميلية بالكومبوزيت، ترميم الأسنان المتآكلة وإعادة الشكل الطبيعي.",d_en:"Composite fillings, rebuilding worn or decayed teeth and restoring natural form.",ic:"M4 12a8 8 0 0 1 16 0 8 8 0 0 1-16 0z"},
 {id:"endo",ar:"علاج الجذور",en:"Endodontics",d_ar:"علاج قنوات الجذور وإنقاذ الأسنان المصابة بدل خلعها.",d_en:"Root canal treatment that saves infected teeth instead of removing them.",ic:"M12 3v18M8 7l4-4 4 4"},
 {id:"pedo",ar:"أسنان الأطفال",en:"Pedodontics",d_ar:"التعامل اللطيف مع الأطفال، الوقاية بالفلورايد وسدّ الشقوق، وعلاج الأسنان اللبنية.",d_en:"Gentle child care, fluoride and fissure sealants, and treating primary teeth.",ic:"M12 8a4 4 0 1 0 0 .01M6 21c0-4 3-6 6-6s6 2 6 6"},
 {id:"prostho",ar:"التركيبات",en:"Prosthodontics",d_ar:"التيجان والجسور والأطقم المتحركة لاستعادة الوظيفة والمظهر.",d_en:"Crowns, bridges and removable dentures that restore function and appearance.",ic:"M4 16h16M6 16V9a6 6 0 0 1 12 0v7"},
 {id:"ortho",ar:"تقويم الأسنان",en:"Orthodontics",d_ar:"التشخيص وتخطيط العلاج وتركيب وضبط الجهاز الثابت.",d_en:"Diagnosis, treatment planning, and placing and adjusting fixed appliances.",ic:"M3 12h18M7 8v8M12 8v8M17 8v8"},
 {id:"perio",ar:"علاج اللثة",en:"Periodontics",d_ar:"تنظيف الجير والتقليح، علاج التهابات اللثة والحفاظ على صحة الأنسجة الداعمة.",d_en:"Scaling and root planing, gum disease treatment and protecting supporting tissues.",ic:"M3 15c3-6 6-6 9 0s6 6 9 0"}
];
let lang = localStorage.getItem("lang") || "ar";
const $ = (s,r=document)=>r.querySelector(s);
const t = (o,k)=> o[k+"_"+lang] || o[k+(lang==="ar"?"":"")] ;
const nm = s => lang==="ar"?s.ar:s.en;
const ds = s => lang==="ar"?s.d_ar:s.d_en;
const icon = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></svg>`;

function applyLang(){
  document.documentElement.lang = lang;
  document.documentElement.dir = lang==="ar"?"rtl":"ltr";
  document.body.classList.toggle("en", lang==="en");
  document.querySelectorAll("[data-ar]").forEach(e=>{ e.textContent = e.dataset[lang]; });
  $("#lang").textContent = lang==="ar"?"EN":"عربي";
  renderUni(); renderSkills(); renderTabs(); renderPanel(); renderContact();
}
function renderUni(){
  const u = lang==="ar"?S.universityAr:S.university;
  const el = $("#uni");
  const yr = S.graduationYear ? " · "+S.graduationYear : "";
  el.textContent = u ? u+yr : "";
  el.style.display = u ? "" : "none";
}
function renderSkills(){
  $("#skillGrid").innerHTML = SPEC.map(s=>`<article class="skill"><div class="ic">${icon(s.ic)}</div><h3>${nm(s)}</h3><p>${ds(s)}</p></article>`).join("");
}
let active = SPEC[0].id;
function renderTabs(){
  $("#tabs").innerHTML = SPEC.map(s=>`<button role="tab" class="tab ${s.id===active?"on":""}" data-id="${s.id}">${nm(s)}</button>`).join("");
  document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{active=b.dataset.id;renderTabs();renderPanel();});
}
function slot(id,n,kind){
  const label = kind==="before" ? (lang==="ar"?"قبل":"Before") : (lang==="ar"?"بعد":"After");
  const empty = lang==="ar"?"الصورة قريبًا":"Photo coming soon";
  return `<figure class="slot ${kind}" data-src="${id}-${n}-${kind}.jpg"><span class="tag">${label}</span><div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="11" r="2"/><path d="m21 16-5-5-8 8"/></svg><small>${empty}</small></div></figure>`;
}
function renderPanel(){
  const s = SPEC.find(x=>x.id===active);
  const cases = [1,2,3].map(n=>`<div class="case" data-n="${n}"><div class="case-h">${lang==="ar"?"حالة":"Case"} ${n}</div><div class="ba">${slot(s.id,n,"before")}${slot(s.id,n,"after")}</div></div>`).join("");
  $("#panel").innerHTML = `<div class="panel-head"><h3>${nm(s)}</h3><p>${ds(s)}</p></div><div class="cases">${cases}</div>`;
  document.querySelectorAll(".slot").forEach(f=>{
    const im = new Image(); im.loading="lazy"; im.alt = "";
    im.onload=()=>{ f.classList.add("has"); f.appendChild(im); f.querySelector(".empty").remove(); f.onclick=()=>openLb(im.src); };
    im.src = f.dataset.src;
  });
  // hide cases beyond 1 that have no photos at all, keep first as empty state
  setTimeout(()=>{
    document.querySelectorAll(".case").forEach(c=>{
      if(c.dataset.n!=="1" && !c.querySelector(".has")) c.remove();
    });
  },900);
}
function openLb(src){ const lb=$("#lb"); lb.querySelector("img").src=src; lb.classList.add("on"); }
$("#lb").onclick=()=>$("#lb").classList.remove("on");
function renderContact(){
  const items=[];
  if(S.email) items.push(["mail",lang==="ar"?"البريد الإلكتروني":"Email",S.email,"mailto:"+S.email]);
  if(S.phone) items.push(["tel",lang==="ar"?"الهاتف":"Phone",S.phone,"tel:"+S.phone.replace(/\s/g,"")]);
  if(S.whatsapp) items.push(["wa","WhatsApp",lang==="ar"?"راسلني":"Message me","https://wa.me/"+S.whatsapp.replace(/\D/g,"")]);
  if(S.linkedin) items.push(["in","LinkedIn",lang==="ar"?"الملف المهني":"Profile",S.linkedin]);
  $("#contactRow").innerHTML = items.map(i=>`<a class="c-card" href="${i[3]}" ${i[3].startsWith("http")?'target="_blank" rel="noopener"':""}><small>${i[1]}</small><b dir="ltr">${i[2]}</b></a>`).join("");
}
$("#lang").onclick=()=>{lang=lang==="ar"?"en":"ar";localStorage.setItem("lang",lang);applyLang();};
$("#burger").onclick=()=>$("#nav").classList.toggle("open");
document.querySelectorAll("#links a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
addEventListener("scroll",()=>$("#nav").classList.toggle("solid",scrollY>30),{passive:true});
const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:.12});
function reveal(){document.querySelectorAll(".sec .wrap > *").forEach(e=>{e.classList.add("rv");io.observe(e);});}
applyLang(); if(!location.search.includes("shot")) reveal();
})();
