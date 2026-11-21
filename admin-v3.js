(function(){
"use strict";
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const TABS=[["appts","Appointments"],["cases","Cases"],["services","Services"],["reviews","Reviews"],["settings","Website settings"]];
const CATS={restorative:"Restorative Dentistry",endo:"Endodontics",esthetic:"Esthetic Dentistry",prostho:"Prosthodontics",surgery:"Oral Surgery",general:"General Dentistry",pedo:"Pediatric Dentistry",ortho:"Orthodontics",perio:"Periodontics"};
let tab="appts";
const msg=(m,ok)=>{const d=document.createElement("div");d.className="msg "+(ok?"ok":"err");d.textContent=m;d.style.cssText="position:fixed;bottom:20px;inset-inline-end:20px;z-index:99;max-width:340px";document.body.appendChild(d);setTimeout(()=>d.remove(),4000)};
async function guard(fn){try{await fn()}catch(e){if(e.status===401||/JWT/i.test(e.message)){SB.logout();location.reload()}else msg(e.message)}}
function start(){$("#login").hidden=true;$("#app").hidden=false;$("#tabs").innerHTML=TABS.map(t=>'<button data-t="'+t[0]+'" class="'+(t[0]===tab?"on":"")+'">'+t[1]+'</button>').join("");show()}
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(b){tab=b.dataset.t;start()}});
$("#out").onclick=()=>{SB.logout();location.reload()};
$("#lf").addEventListener("submit",async e=>{e.preventDefault();const f=e.target,m=$("#lm");m.hidden=true;try{await SB.login(f.e.value.trim(),f.p.value);start()}catch(err){m.textContent="Sign-in failed. Check email and password.";m.hidden=false}});
function show(){guard(async()=>{await({appts,cases,services,reviews,settings}[tab])()})}
/* appointments */
async function appts(){
 const r=await SB.rest("appointments?select=*&order=created_at.desc&limit=200");
 const phone=a=>{let n=String(a.phone).replace(/[^0-9]/g,'');if(n.startsWith('00'))n=n.slice(2);if(/^01[0-9]{9}$/.test(n))n='20'+n.slice(1);return n};
 const status={new:'Request received / طلب جديد',confirmed:'Confirmed by doctor / أكده الطبيب',done:'Completed / مكتمل',cancelled:'Cancelled / ملغي'};
 $("#view").innerHTML='<div class="pn"><h3>Appointment requests / طلبات الحجز</h3><p>Changing status does not message the patient. Open WhatsApp, review the message, then press Send yourself. Only mark notified after you have contacted the patient. / تغيير الحالة لا يرسل رسالة للمريض.</p>'+(r.length?'<div style="overflow:auto"><table><tr><th>Patient</th><th>Phone</th><th>Service</th><th>Requested (Cairo)</th><th>Status</th><th>Actions</th></tr>'+r.map(a=>{
 const txt='مرحبًا '+a.name+'، بخصوص طلبك لدى د. يوسف الجوهري لخدمة '+a.service+' بتاريخ '+(a.preferred_day||'يتم الاتفاق عليه')+' '+(a.preferred_time||'')+'، نرجو التواصل لتأكيد تفاصيل الموعد والتكلفة.';
 return '<tr data-id="'+a.id+'"><td>'+esc(a.name)+'<br><small>'+esc(a.note||'')+'</small></td><td dir="ltr">'+esc(a.phone)+'</td><td>'+esc(a.service)+'<br><b>'+esc(a.request_kind==='emergency'?'Emergency request / طارئ':'Routine / عادي')+'</b></td><td><input type="date" value="'+esc(a.preferred_day||'')+'" data-f="preferred_day"> <input type="time" step="1800" value="'+esc(a.preferred_time||'')+'" data-f="preferred_time"></td><td><b>'+esc(status[a.status]||a.status)+'</b><br><small>'+(a.notified_at?'Patient notified (recorded by you): '+esc(new Date(a.notified_at).toLocaleString()):'Patient not yet marked notified / لم يسجل إبلاغه')+'</small></td><td><button class="sm" data-s="confirmed">Confirm, no message</button> <a class="sm" target="_blank" rel="noopener" href="https://wa.me/'+phone(a)+'?text='+encodeURIComponent(txt)+'">Message patient on WhatsApp</a> <button class="sm" data-notified="1">I contacted the patient</button> <button class="sm" data-s="cancelled">Cancel</button> <button class="sm" data-s="done">Done</button> <button class="sm" data-rs="1">Save new date/time</button> <button class="sm d" data-del="1">Delete</button></td></tr>';
 }).join('')+'</table></div>':'<p>No requests yet.</p>')+'</div>';
}
document.addEventListener("click",e=>guard(async()=>{
 const tr=e.target.closest("tr[data-id]");if(!tr||$("#view").dataset.x==="no")return;const id=tr.dataset.id;
 if(e.target.dataset.notified){await SB.rest("appointments?id=eq."+id,{method:"PATCH",body:{notified_at:new Date().toISOString()}});msg("Contact recorded by you, not a delivery receipt.",1);appts()}
 if(e.target.dataset.s){await SB.rest("appointments?id=eq."+id,{method:"PATCH",body:{status:e.target.dataset.s}});msg("Updated",1);appts()}
 if(e.target.dataset.rs){const b={preferred_day:tr.querySelector("[data-f=preferred_day]").value,preferred_time:tr.querySelector("[data-f=preferred_time]").value||null,notified_at:null};await SB.rest("appointments?id=eq."+id,{method:"PATCH",body:b});msg("Rescheduled",1);appts()}
 if(e.target.dataset.del&&confirm("Delete this request?")){await SB.rest("appointments?id=eq."+id,{method:"DELETE"});appts()}
}));
/* generic list editors */
async function cases(){
 const r=await SB.rest("cases?select=*&order=sort,created_at.desc");
 $("#view").innerHTML='<div class="pn"><h3>Add a case</h3>'+caseForm({})+'</div>'+r.map(c=>'<div class="pn"><h3>'+esc(c.title)+' '+(c.published?"(published)":"(draft)")+'</h3>'+caseForm(c)+'</div>').join("");
}
function caseForm(c){
 const ph=k=>c[k]?'<img class="thumb" src="'+esc(SB.photoUrl(c[k]))+'">':"";
 return '<form class="g2 cf" data-id="'+(c.id||"")+'"><label>Title<input name="title" required maxlength="160" value="'+esc(c.title||"")+'"></label><label>Category<select name="specialty">'+Object.entries(CATS).map(([k,v])=>'<option value="'+k+'"'+(c.specialty===k?" selected":"")+'>'+v+'</option>').join("")+'</select></label>'+
 '<label class="full">Clinical description<textarea name="summary">'+esc(c.summary||"")+'</textarea></label><label>Diagnosis<textarea name="diagnosis">'+esc(c.diagnosis||"")+'</textarea></label><label>Treatment plan<textarea name="plan">'+esc(c.plan||"")+'</textarea></label><label>Treatment details<textarea name="steps">'+esc(c.steps||"")+'</textarea></label><label>Result<textarea name="result">'+esc(c.result||"")+'</textarea></label>'+
 '<label>Before photo<input type="file" accept="image/*" name="bf">'+ph("before_url")+'</label><label>After photo<input type="file" accept="image/*" name="af">'+ph("after_url")+'</label>'+
 '<label class="chk full"><input type="checkbox" name="consent_confirmed"'+(c.consent_confirmed?" checked":"")+'><span>The patient gave written consent to publish these photos and details, and nothing identifies them (no name, face, ID).</span></label>'+
 '<label class="chk full"><input type="checkbox" name="published"'+(c.published?" checked":"")+'><span>Publish on the website (needs the consent box)</span></label>'+
 '<div class="full"><button class="btn btn-navy" type="submit">Save</button> '+(c.id?'<button class="sm d" type="button" data-delcase="'+c.id+'">Delete case</button>':"")+'</div></form>';
}
async function shrink(file){return new Promise((res,rej)=>{if(!/^image\//.test(file.type))return rej(new Error("Choose an image"));const im=new Image();im.onload=()=>{const m=1600,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);c.toBlob(b=>res(new File([b],"p.jpg",{type:"image/jpeg"})),"image/jpeg",.85)};im.onerror=()=>rej(new Error("Bad image"));im.src=URL.createObjectURL(file)})}
document.addEventListener("submit",e=>{const f=e.target;if(!f.classList.contains("cf"))return;e.preventDefault();guard(async()=>{
 const id=f.dataset.id,b={title:f.title.value.trim(),specialty:f.specialty.value,summary:f.summary.value,diagnosis:f.diagnosis.value,plan:f.plan.value,steps:f.steps.value,result:f.result.value,consent_confirmed:f.consent_confirmed.checked,published:f.published.checked};
 if(b.published&&!b.consent_confirmed)return msg("Tick the patient-consent box before publishing.");
 if(f.bf.files[0])b.before_url=await SB.upload(await shrink(f.bf.files[0]));if(f.af.files[0])b.after_url=await SB.upload(await shrink(f.af.files[0]));
 if(id)await SB.rest("cases?id=eq."+id,{method:"PATCH",body:b});else await SB.rest("cases",{method:"POST",body:b,headers:{Prefer:"return=minimal"}});
 msg("Saved",1);cases()})});
document.addEventListener("click",e=>{const d=e.target.dataset.delcase;if(d&&confirm("Delete this case?"))guard(async()=>{await SB.rest("cases?id=eq."+d,{method:"DELETE"});cases()})});
/* services */
async function services(){
 const r=await SB.rest("services?select=*&order=sort");
 $("#view").innerHTML='<div class="pn"><h3>Add a service</h3>'+svcForm({sort:r.length+1,published:true})+'</div>'+r.map(s=>'<div class="pn">'+svcForm(s)+'</div>').join("");
}
function svcForm(s){return '<form class="g2 sf" data-id="'+(s.id||"")+'"><label>Name (English)<input name="name_en" required value="'+esc(s.name_en||"")+'"></label><label>Name (Arabic)<input name="name_ar" required value="'+esc(s.name_ar||"")+'"></label><label>Description (English)<textarea name="descr_en">'+esc(s.descr_en||"")+'</textarea></label><label>Description (Arabic)<textarea name="descr_ar">'+esc(s.descr_ar||"")+'</textarea></label><label>Optional internal price reference, never shown publicly<input name="price" value="'+esc(s.price||"")+'"></label><label>Parent category, English name (empty for a category)<input name="parent" value="'+esc(s.parent||'')+'"></label><label>Order<input type="number" name="sort" value="'+(s.sort||0)+'"></label><label class="chk full"><input type="checkbox" name="published"'+(s.published?" checked":"")+'><span>Show on website</span></label><div class="full"><button class="btn btn-navy" type="submit">Save</button> '+(s.id?'<button class="sm d" type="button" data-delsvc="'+s.id+'">Delete</button>':"")+'</div></form>'}
document.addEventListener("submit",e=>{const f=e.target;if(!f.classList.contains("sf"))return;e.preventDefault();guard(async()=>{
 const id=f.dataset.id,b={name_en:f.name_en.value.trim(),name_ar:f.name_ar.value.trim(),descr_en:f.descr_en.value,descr_ar:f.descr_ar.value,price:f.price.value.trim()||null,parent:f.parent.value.trim()||null,sort:+f.sort.value||0,published:f.published.checked,grp_en:f.name_en.value.trim().slice(0,40),grp_ar:f.name_ar.value.trim().slice(0,40)};
 if(id)await SB.rest("services?id=eq."+id,{method:"PATCH",body:b});else await SB.rest("services",{method:"POST",body:b,headers:{Prefer:"return=minimal"}});msg("Saved",1);services()})});
document.addEventListener("click",e=>{const d=e.target.dataset.delsvc;if(d&&confirm("Delete this service?"))guard(async()=>{await SB.rest("services?id=eq."+d,{method:"DELETE"});services()})});
/* reviews */
async function reviews(){
 const r=await SB.rest("reviews?select=*&order=sort,created_at.desc");
 const form=v=>'<form class="g2 rf" data-id="'+(v.id||"")+'"><label>Patient name or initials<input name="author" required maxlength="80" value="'+esc(v.author||"")+'"></label><label>Rating (1-5, optional)<input type="number" min="1" max="5" name="rating" value="'+(v.rating||"")+'"></label><label class="full">Review text<textarea name="body" required maxlength="800">'+esc(v.body||"")+'</textarea></label><label class="chk full"><input type="checkbox" name="consent_confirmed"'+(v.consent_confirmed?" checked":"")+'><span>This is a real review and the patient allowed publishing it.</span></label><label class="chk full"><input type="checkbox" name="published"'+(v.published?" checked":"")+'><span>Show on website</span></label><div class="full"><button class="btn btn-navy" type="submit">Save</button> '+(v.id?'<button class="sm d" type="button" data-delrv="'+v.id+'">Delete</button>':"")+'</div></form>';
 $("#view").innerHTML='<div class="pn"><h3>Add a review (only real, permitted reviews)</h3>'+form({})+'</div>'+r.map(v=>'<div class="pn">'+form(v)+'</div>').join("");
}
document.addEventListener("submit",e=>{const f=e.target;if(!f.classList.contains("rf"))return;e.preventDefault();guard(async()=>{
 const id=f.dataset.id,b={author:f.author.value.trim(),body:f.body.value.trim(),rating:f.rating.value?+f.rating.value:null,consent_confirmed:f.consent_confirmed.checked,published:f.published.checked};
 if(b.published&&!b.consent_confirmed)return msg("Tick the permission box before publishing.");
 if(id)await SB.rest("reviews?id=eq."+id,{method:"PATCH",body:b});else await SB.rest("reviews",{method:"POST",body:b,headers:{Prefer:"return=minimal"}});msg("Saved",1);reviews()})});
document.addEventListener("click",e=>{const d=e.target.dataset.delrv;if(d&&confirm("Delete this review?"))guard(async()=>{await SB.rest("reviews?id=eq."+d,{method:"DELETE"});reviews()})});
/* settings */
const SF=[["portrait_url","Hero portrait URL (or upload below)"],["whatsapp","Booking WhatsApp number (country code, digits only)"],["phone","Phone number"],["email","Email"],["instagram","Instagram link (https://...)"],["facebook","Facebook link"],["tiktok","TikTok link"],["linkedin","LinkedIn link"],["city_en","City (English)"],["city_ar","City (Arabic)"],["address_en","Clinic address (English)"],["address_ar","Clinic address (Arabic)"],["map_url","Map link (Google Maps share link)"],["hours_en","Working hours (English)",1],["hours_ar","Working hours (Arabic)",1],["bio_en","Biography (English)",1],["bio_ar","Biography (Arabic)",1],["timeline_en","Education and experience, one per line: Title | Detail (English)",1],["timeline_ar","Education and experience, one per line (Arabic)",1],["courses_en","Courses and development, one per line (English)",1],["courses_ar","Courses and development, one per line (Arabic)",1],["care_en","Dental care guide (English), one card per line: Title | Guidance. Keep medical advice accurate.",1],["care_ar","Dental care guide (Arabic), one card per line: Title | Guidance.",1]];
async function settings(){
 const r=await SB.rest("settings?select=value&key=eq.site");const v=Object.assign({},DEFAULT_SITE,(r[0]&&r[0].value)||{});
 $("#view").innerHTML='<div class="pn"><h3>Website settings</h3><form class="g2" id="setf">'+SF.map(f=>'<label class="'+(f[2]?"full":"")+'">'+f[1]+(f[2]?'<textarea name="'+f[0]+'" rows="'+(f[0].startsWith("bio")?8:4)+'">':'<input name="'+f[0]+'" value="')+esc(v[f[0]]||"")+(f[2]?'</textarea>':'">')+'</label>').join("")+'<label class="full">Upload hero portrait, your professional image only<input type="file" name="portrait_file" accept="image/jpeg,image/png,image/webp"></label><div class="full"><button class="btn btn-navy" type="submit">Save settings</button></div></form></div>';
}
document.addEventListener("submit",e=>{if(e.target.id!=="setf")return;e.preventDefault();guard(async()=>{const o={};SF.forEach(f=>o[f[0]]=e.target[f[0]].value.trim());if(e.target.portrait_file.files[0])o.portrait_url=await SB.upload(await shrink(e.target.portrait_file.files[0]));
 await SB.rest("settings?on_conflict=key",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:{key:"site",value:o,updated_at:new Date().toISOString()}});msg("Saved. The public site updates on next load.",1)})});
if(SB.restore())start();
})();
