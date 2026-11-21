(function(){
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const T={en:{brand:"Dr Youssef Elgohary",n_about:"About",n_cases:"Cases",n_services:"Services",n_gallery:"Smile Gallery",n_book:"Book",n_contact:"Contact",
h_sub:"Modern dental care focused on comfort, precision, and personalized treatment for every patient.",h_book:"Book Your Appointment",h_cases:"Explore My Cases",h_serv:"Explore Dental Services",h_tag:"Dentist | Restoring Healthy & Confident Smiles",f1:"Zagazig, Egypt",f2:"Personalized Dental Care",f3:"Available for Appointments",chip1:"Dentist",chip1s:"Personalized & patient-centered care",chip2:"Zagazig, Sharqia",chip2s:"Sat to Thu, 5 to 10 PM",
a_title:"Dr Youssef Elgohary",a_tag:"Dentist | Personalized & Patient-Centered Dental Care",a_edu:"Education and experience",a_int:["Oral surgery","Endodontics","Pediatric dentistry","Cosmetic restorations","Veneers"],
c_title:"My Dental Cases",c_lead:"Clinical cases with before and after photos, published with patient consent.",c_all:"All",c_empty:"Cases will appear here soon. Each case is published only with the patient's consent.",
cat:{restorative:"Restorative Dentistry",endo:"Endodontics",esthetic:"Esthetic Dentistry",prostho:"Prosthodontics",surgery:"Oral Surgery",general:"General Dentistry",pedo:"Pediatric Dentistry",ortho:"Orthodontics",perio:"Periodontics"},
s_title:"Dental Services",s_lead:"Care planned around each patient.",s_note:"Treatment is determined according to each patient's needs. Prices may vary depending on the complexity of the case, the materials used, and the required treatment plan. An examination is necessary to determine the appropriate treatment and final cost.",s_price:"Cost determined after examination",s_book:"Book This Service",s_det:"Details",s_more:"Learn More",s_less:"Less",
g_title:"Smile Gallery",g_lead:"Drag the slider to compare before and after. Results vary from patient to patient.",g_empty:"The gallery will show real before and after cases once they are published with patient consent.",before:"Before",after:"After",
r_eyebrow:"Reviews",r_title:"Patient Reviews",b_title:"Book an Appointment",b_lead:"Send your request and the clinic will confirm the time with you. A request is not a confirmed appointment.",b_wa_note:"Prefer WhatsApp? Use the button after sending, or the green button anywhere on this page.",b_priv:"Please do not write medical history here. Share details directly with the doctor.",
f_name:"Patient name",f_phone:"Phone number",f_service:"Requested service",f_date:"Preferred date",f_time:"Preferred time",f_note:"Additional notes (scheduling only)",f_consent:"I agree to store my name, phone and request details with Supabase so the doctor can handle this request. I can ask the doctor to delete them via WhatsApp.",f_send:"Send request",f_pick:"Choose a service",f_pickt:"Choose a time",
e_fill:"Please complete all required fields.",e_phone:"Please enter a valid phone number.",e_fri:"Fridays are for emergency cases only. Please choose another day, or message on WhatsApp for an emergency.",e_past:"Please choose a future date.",e_dup:"This time or request was already received. Please choose another time.",e_net:"The booking system is unavailable right now. Please send your request on WhatsApp instead.",e_consent:"Please tick the consent box.",
ok:"Thank you. Your request was received. The clinic will contact you to confirm. This is not yet a confirmed appointment.",ok_wa:"Also send it on WhatsApp",
k_title:"Contact",k_wa:"WhatsApp",k_phone:"Phone",k_email:"Email",k_loc:"Location",k_hours:"Working hours",k_map:"Open map",k_soc:"Social",
back:"Back to cases",cd_desc:"Case description",cd_diag:"Diagnosis",cd_plan:"Treatment plan",cd_steps:"Treatment details",cd_res:"Result",foot:"Dental care in Zagazig, Egypt.",wa_msg:"Hello Dr Youssef, I would like to book an appointment."},
ar:{brand:"د. يوسف الجوهري",n_about:"نبذة",n_cases:"الحالات",n_services:"الخدمات",n_gallery:"معرض الابتسامات",n_book:"احجز",n_contact:"تواصل",
h_sub:"رعاية أسنان حديثة تركّز على الراحة والدقة وعلاج مخصص لكل مريض.",h_book:"احجز موعدك",h_cases:"استكشف حالاتي",h_serv:"استكشف خدماتي",h_tag:"طبيب أسنان | لاستعادة ابتسامات صحية وواثقة",f1:"الزقازيق، مصر",f2:"رعاية أسنان شخصية",f3:"متاح للحجز",chip1:"طبيب أسنان",chip1s:"رعاية شخصية تضع المريض أولًا",chip2:"الزقازيق، الشرقية",chip2s:"من السبت للخميس، ٥ إلى ١٠ م",
a_title:"د. يوسف الجوهري",a_tag:"طبيب أسنان | رعاية أسنان شخصية تضع المريض أولًا",a_edu:"التعليم والخبرة",a_int:["جراحة الفم","علاج الجذور","أسنان الأطفال","الحشوات التجميلية","الفينير"],
c_title:"حالاتي السنية",c_lead:"حالات سريرية بصور قبل وبعد، تُنشر بموافقة المريض.",c_all:"الكل",c_empty:"ستظهر الحالات هنا قريبًا. لا تُنشر أي حالة إلا بموافقة المريض.",
cat:{restorative:"طب الأسنان الترميمي",endo:"علاج الجذور",esthetic:"طب الأسنان التجميلي",prostho:"التركيبات السنية",surgery:"جراحة الفم",general:"طب الأسنان العام",pedo:"أسنان الأطفال",ortho:"التقويم",perio:"أمراض اللثة"},
s_title:"الخدمات",s_lead:"رعاية مخططة حول كل مريض.",s_note:"تُحدد العلاجات وفقًا لاحتياجات كل مريض. قد تختلف الأسعار حسب تعقيد الحالة، والخامات المستخدمة، وخطة العلاج المطلوبة. ويُعد الكشف ضروريًا لتحديد العلاج المناسب والتكلفة النهائية.",s_price:"التكلفة تُحدد بعد الكشف",s_book:"احجز هذه الخدمة",s_det:"التفاصيل",s_more:"اعرف أكثر",s_less:"أقل",
g_title:"معرض الابتسامات",g_lead:"اسحب المؤشر لمقارنة قبل وبعد. تختلف النتائج من مريض لآخر.",g_empty:"سيعرض المعرض حالات حقيقية بصور قبل وبعد بعد نشرها بموافقة المريض.",before:"قبل",after:"بعد",
r_eyebrow:"التقييمات",r_title:"آراء المرضى",b_title:"احجز موعدًا",b_lead:"أرسل طلبك وسيؤكد معك العيادة الموعد. الطلب ليس موعدًا مؤكدًا.",b_wa_note:"تفضل واتساب؟ استخدم الزر بعد الإرسال أو الزر الأخضر في أي مكان بالصفحة.",b_priv:"من فضلك لا تكتب تاريخًا مرضيًا هنا. شارك التفاصيل مع الطبيب مباشرة.",
f_name:"اسم المريض",f_phone:"رقم الهاتف",f_service:"الخدمة المطلوبة",f_date:"التاريخ المفضل",f_time:"الوقت المفضل",f_note:"ملاحظات إضافية (للمواعيد فقط)",f_consent:"أوافق على حفظ اسمي ورقمي وتفاصيل طلبي على Supabase ليتواصل معي الطبيب بخصوصه. يمكنني طلب حذفها من الطبيب عبر واتساب.",f_send:"إرسال الطلب",f_pick:"اختر الخدمة",f_pickt:"اختر الوقت",
e_fill:"من فضلك أكمل كل الحقول المطلوبة.",e_phone:"من فضلك أدخل رقم هاتف صحيح.",e_fri:"الجمعة للحالات الطارئة فقط. اختر يومًا آخر، أو راسلنا على واتساب للطوارئ.",e_past:"اختر تاريخًا قادمًا.",e_dup:"هذا الموعد أو الطلب مسجل بالفعل. اختر وقتًا آخر.",e_net:"نظام الحجز غير متاح الآن. أرسل طلبك على واتساب بدلًا من ذلك.",e_consent:"من فضلك وافق على الإقرار.",
ok:"شكرًا. وصل طلبك وسيتواصل معك العيادة للتأكيد. هذا ليس موعدًا مؤكدًا بعد.",ok_wa:"أرسله أيضًا على واتساب",
k_title:"تواصل",k_wa:"واتساب",k_phone:"الهاتف",k_email:"البريد",k_loc:"الموقع",k_hours:"مواعيد العمل",k_map:"افتح الخريطة",k_soc:"التواصل الاجتماعي",
back:"العودة للحالات",cd_desc:"وصف الحالة",cd_diag:"التشخيص",cd_plan:"خطة العلاج",cd_steps:"تفاصيل العلاج",cd_res:"النتيجة",foot:"رعاية الأسنان في الزقازيق، مصر.",wa_msg:"مرحبًا د. يوسف، أرغب في حجز موعد."}};
Object.assign(T.en,{n_care:"Dental care",care_title:"Small habits. Healthier smiles.",care_lead:"General guidance, adapted to you by your dentist.",care_disclaimer:"Educational guidance, not a diagnosis or a substitute for personal dental advice.",f_kind:"Request type",kind_routine:"Routine examination, 30 minutes",kind_emergency:"Emergency request, time arranged by doctor",kind_routine_note:"30 minutes includes examination and treatment-plan explanation. Times are Cairo time. Treatment may need further appointments.",kind_emergency_note:"Emergency requests use this form without a promised slot or response time. This form is not continuously monitored. For a medical emergency, seek urgent care rather than waiting for online confirmation.",time_arranged:"Time to be arranged",step1:"1. Request received",step2:"2. Doctor confirms",step3:"3. Doctor messages patient",b_wa_note:"After saving, tap the WhatsApp link and press Send so the doctor receives your message. No automatic WhatsApp message is sent.",ok:"Request saved, not confirmed. Please tap WhatsApp and press Send to message the doctor. The doctor personally confirms the time and discusses the cost.",s_price:"Cost varies by case, determined after examination",e_fri:"Friday is for emergency requests only. Choose the emergency request type, or another day for a routine examination."});
Object.assign(T.ar,{n_care:"العناية بالأسنان",care_title:"عادات بسيطة. ابتسامة أصح.",care_lead:"إرشادات عامة يخصصها طبيبك حسب احتياجك.",care_disclaimer:"محتوى تثقيفي، وليس تشخيصًا أو بديلًا عن نصيحة طبيبك الشخصية.",f_kind:"نوع الطلب",kind_routine:"كشف عادي، ٣٠ دقيقة",kind_emergency:"طلب طارئ، يحدد الطبيب الوقت",kind_routine_note:"نصف ساعة تشمل الكشف وشرح خطة العلاج. الأوقات بتوقيت القاهرة. قد يحتاج العلاج لمواعيد إضافية.",kind_emergency_note:"الطلب الطارئ من نفس النموذج دون وعد بموعد أو وقت استجابة. لا تتم متابعة النموذج باستمرار. في الطوارئ الطبية اطلب رعاية عاجلة ولا تنتظر تأكيدًا عبر الموقع.",time_arranged:"يتم الاتفاق على الوقت",step1:"١. استلام الطلب",step2:"٢. تأكيد الطبيب",step3:"٣. تواصل الطبيب مع المريض",b_lead:"أرسل طلبك وسيؤكد الطبيب الموعد معك. الطلب ليس موعدًا مؤكدًا.",b_wa_note:"بعد حفظ الطلب، اضغط رابط واتساب ثم إرسال ليصل كلامك للطبيب. لا تُرسل رسالة واتساب تلقائيًا.",ok:"تم حفظ طلبك، ولم يُؤكد الموعد بعد. اضغط واتساب ثم إرسال للتواصل مع الطبيب؛ يؤكد لك الموعد ويناقش التكلفة بنفسه.",s_price:"تختلف التكلفة حسب الحالة وتُحدد بعد الكشف",e_fri:"الجمعة لطلبات الطوارئ فقط. اختر نوع الطلب الطارئ، أو يومًا آخر للكشف العادي."});
const HTMLT={en:'Creating Healthy, <em>Confident</em> Smiles.',ar:'نصنع ابتسامات <em>صحية</em> وواثقة.'};
let lang=localStorage.getItem("lang")||((navigator.language||"").startsWith("ar")?"ar":"en");
let S=Object.assign({},DEFAULT_SITE), services=DEFAULT_SERVICES.concat(DEFAULT_PROCEDURES), cases=[], reviews=[], flt="all", pre="";
const t=k=>(T[lang][k]!==undefined?T[lang][k]:T.en[k]);
const L=(o,k)=>o[k+"_"+lang]||o[k+"_en"]||o[k+"_ar"]||"";
const wa=(txt)=>"https://wa.me/"+String(S.whatsapp).replace(/\D/g,"")+(txt?"?text="+encodeURIComponent(txt):"");
const paras=s=>String(s||"").split(/\n\s*\n/).filter(Boolean).map(p=>"<p>"+esc(p).replace(/\n/g,"<br>")+"</p>").join("");
const TOOTH='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 8c-5 0-8 4-8 9 0 6 3 8 4 14 .8 5 2 9 4.500 9 3 0 2-9 6-9h0c4 0 3 9 6 9 2.500 0 3.700-4 4.500-9 1-6 4-8 4-14 0-5-3-9-8-9-4 0-5 2-7 2s-3-2-6.500-2z"/></svg>';
function render(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 $$("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));
 $$("[data-i18n-html]").forEach(e=>e.innerHTML=HTMLT[lang]);
 document.title=lang==="ar"?"د. يوسف الجوهري | طبيب أسنان في الزقازيق":"Dr Youssef Elgohary | Dentist in Zagazig, Egypt";
 $("#bio").innerHTML=paras(L(S,"bio"));
 /* Default portrait ships inline as a data URI so it arrives with the page even on very slow connections; hero-small.jpg is the file fallback; only override when the saved setting points at a different image. */
 if(S.portrait_url&&S.portrait_url!=="mwqph5lgziqjh.jpg")$(".frame img").src=SB.photoUrl(S.portrait_url);
 {const hi=$(".frame img");hi.onerror=function(){this.onerror=null;if(!this.src.endsWith("hero-small.jpg"))this.src="hero-small.jpg";else this.src="portrait.jpg"};}
 $("#int").innerHTML=T[lang].a_int.map(x=>"<span>"+esc(x)+"</span>").join("");
 $("#tl").innerHTML=L(S,"timeline").split("\n").filter(Boolean).map(l=>{const p=l.split("|");return "<div><b>"+esc((p[0]||"").trim())+"</b><span>"+esc((p[1]||"").trim())+"</span></div>"}).join("");
 const co=L(S,"courses").trim();$("#courses").innerHTML=co?"<div class='eyebrow'>"+(lang==="ar"?"الدورات والتطوير المهني":"Courses and development")+"</div><div class='tl'>"+co.split("\n").filter(Boolean).map(l=>"<div><b>"+esc(l)+"</b></div>").join("")+"</div>":"";
 renderCases();renderServices();renderGallery();renderReviews();renderContact();fillForm();window.renderCare(lang,S);
 $("#b_hours").innerHTML=esc(L(S,"hours")).replace(/\n/g,"<br>");
 $("#wa").href=wa(t("wa_msg"));$("#yr").textContent=new Date().getFullYear();
 $("#lang").textContent=lang==="ar"?"EN":"عربي";
 route();
}
function img(u){return u?'<img loading="lazy" src="'+esc(SB.photoUrl(u))+'" alt="">':""}
function renderCases(){
 const cats=[...new Set(cases.map(c=>c.specialty))];
 $("#filters").innerHTML=cats.length>1?['all'].concat(cats).map(c=>'<button data-c="'+c+'" class="'+(flt===c?"on":"")+'">'+esc(c==="all"?t("c_all"):T[lang].cat[c]||c)+'</button>').join(""):"";
 const list=cases.filter(c=>flt==="all"||c.specialty===flt);
 $("#cases-list").innerHTML=list.length?list.map(c=>'<article class="card" tabindex="0" data-id="'+c.id+'"><div class="im">'+img(c.before_url)+img(c.after_url)+'<span class="l">'+t("before")+" / "+t("after")+'</span></div><div class="tx"><div class="cat">'+esc(T[lang].cat[c.specialty]||c.specialty)+'</div><h3>'+esc(c.title)+'</h3><p>'+esc((c.summary||"").slice(0,140))+'</p></div></article>').join(""):'<div class="empty" style="grid-column:1/-1">'+esc(t("c_empty"))+'</div>';
}
const SVC_HEADS=[{k:"what",en:"What is this procedure?",ar:"يعني إيه الإجراء ده؟"},{k:"when",en:"When might you need it?",ar:"إمتى ممكن تحتاجه؟"},{k:"how",en:"How is it done?",ar:"بيتعمل إزاي؟"},{k:"pain",en:"Is it painful?",ar:"هل الإجراء مؤلم؟"},{k:"sessions",en:"Expected sessions",ar:"عدد الجلسات المتوقع"},{k:"after",en:"Aftercare instructions",ar:"تعليمات بعد العلاج"}];
const SVC_DETAILS={
"Preventive Dentistry":{img:"https://images.pexels.com/photos/3845942/pexels-photo-3845942.jpeg?auto=compress&cs=tinysrgb&w=640",en:{"what": "Regular check-ups, professional cleaning (scaling and polishing) and guidance to keep teeth and gums healthy and catch problems early.", "when": "As a routine about every six months, or when you notice bleeding gums, bad breath, or plaque and stain buildup.", "how": "After examination, plaque and calculus are removed with ultrasonic and hand instruments, followed by polishing and home-care advice suited to your case.", "pain": "Usually comfortable; mild sensitivity can happen with heavy buildup or inflamed gums and settles quickly.", "sessions": "Usually one visit; follow-up depends on gum condition.", "after": "Mild sensitivity or gum tenderness for a day or two is possible; keep brushing twice daily and use any recommended rinse."},ar:{"what": "فحوصات دورية وتنظيف احترافي (إزالة الجير والتلميع) وإرشادات للحفاظ على صحة الأسنان واللثة واكتشاف أي مشكلة مبكرًا.", "when": "كروتين كل ستة شهور تقريبًا، أو عند ملاحظة نزيف باللثة أو رائحة فم أو تراكم جير وتصبغات.", "how": "بعد الفحص تُزال الترسبات والجير بأدوات الموجات فوق الصوتية واليدوية، ثم التلميع ونصائح عناية منزلية مناسبة لحالتك.", "pain": "غالبًا مريح؛ قد يحدث تحسس بسيط مع تراكم شديد أو التهاب باللثة ويزول سريعًا.", "sessions": "غالبًا جلسة واحدة، والمتابعة حسب حالة اللثة.", "after": "قد يوجد تحسس بسيط ليوم أو يومين؛ حافظ على تنظيف الأسنان مرتين يوميًا واستخدم الغسول إن وُصف."}},
"Restorative Dentistry":{img:"https://images.pexels.com/photos/13264624/pexels-photo-13264624.jpeg?auto=compress&cs=tinysrgb&w=640",en:{"what": "Fillings and restorations that repair decayed or damaged teeth and restore their shape and function.", "when": "When there is decay, a chipped or broken tooth, an old failing filling, or sensitivity to sweets and cold drinks.", "how": "The decayed part is removed and the cavity cleaned, then a tooth-colored composite restoration is placed, shaped and polished to match your bite.", "pain": "Done with local anesthesia when needed, so the visit is usually comfortable.", "sessions": "Most fillings finish in one visit; larger damage may need more.", "after": "Numbness fades within hours; avoid chewing on that side until it does, and tell us if the filling feels high."},ar:{"what": "حشوات وترميمات لإصلاح الأسنان المصابة بالتسوس أو التلف واستعادة شكلها ووظيفتها.", "when": "عند وجود تسوس أو كسر بالسن أو حشوة قديمة تالفة أو حساسية للحلويات والمشروبات الباردة.", "how": "يُزال الجزء المتسوس ويُنظف التجويف، ثم يوضع حشو تجميلي بلون السن ويُشكل ويُلمع ليناسب الإطباق.", "pain": "يتم بالتخدير الموضعي عند الحاجة، فتكون الزيارة مريحة غالبًا.", "sessions": "معظم الحشوات تنتهي في جلسة واحدة، والتلف الأكبر قد يحتاج أكثر.", "after": "يزول التنميل خلال ساعات؛ تجنب المضغ على تلك الجهة حتى يزول، وأخبرنا إذا شعرت أن الحشو مرتفع."}},
"Endodontics":{img:"https://images.pexels.com/photos/5355837/pexels-photo-5355837.jpeg?auto=compress&cs=tinysrgb&w=640",en:{"what": "Root canal treatment removes infected or inflamed pulp from inside the tooth, then seals the canals to relieve pain and save the natural tooth when possible.", "when": "Deep decay reaching the nerve, severe or night pain, long-lasting sensitivity to hot or cold, or an abscess.", "how": "Under local anesthesia the canals are cleaned, disinfected and filled; the tooth is then restored and often needs a crown afterward.", "pain": "The procedure itself is done under anesthesia; soreness for a few days afterward is common and manageable.", "sessions": "Often two to three visits depending on the tooth and the infection.", "after": "Avoid chewing on the tooth until its final restoration, and take any prescribed medication as directed."},ar:{"what": "علاج العصب يزيل لب السن المصاب أو الملتهب ثم يحكم إغلاق القنوات لتخفيف الألم والحفاظ على السن الطبيعي متى أمكن.", "when": "التسوس العميق الواصل للعصب، أو الألم الشديد أو الليلي، أو حساسية طويلة للساخن والبارد، أو وجود خراج.", "how": "تحت التخدير الموضعي تُنظف القنوات وتُطهر وتُحشى، ثم يُرمم السن وغالبًا يحتاج تاجًا بعد ذلك.", "pain": "الإجراء نفسه يتم تحت التخدير؛ وألم بسيط لأيام قليلة بعده أمر شائع ويمكن التعامل معه.", "sessions": "غالبًا من جلستين إلى ثلاث حسب السن وحالة العدوى.", "after": "تجنب المضغ على السن حتى استكمال ترميمه النهائي، والتزم بأي دواء موصوف."}},
"Cosmetic Dentistry":{img:"https://images.pexels.com/photos/6627572/pexels-photo-6627572.jpeg?auto=compress&cs=tinysrgb&w=640",en:{"what": "Whitening, bonding, veneers and smile design to improve the look of teeth while respecting their natural character.", "when": "Stains, small gaps, uneven edges, or discolored and slightly misshapen front teeth.", "how": "After assessment and planning, treatment ranges from whitening sessions to bonding or custom-made veneers, chosen to fit your case.", "pain": "Most esthetic procedures are comfortable and need little or no anesthesia.", "sessions": "Varies by plan: whitening may take one or two visits; veneers usually two or more.", "after": "Temporary sensitivity after whitening is common; limit staining foods and drinks and keep regular cleaning."},ar:{"what": "تبييض وحشوات تجميلية أمامية وقشور (فينير) وتصميم ابتسامة لتحسين مظهر الأسنان مع الحفاظ على طبيعتها.", "when": "التصبغات أو الفراغات الصغيرة أو الحواف غير المتساوية أو تغير لون الأسنان الأمامية.", "how": "بعد الفحص والتخطيط يتراوح العلاج بين جلسات التبييض والحشوات التجميلية أو القشور المصنوعة خصيصًا، بما يناسب حالتك.", "pain": "معظم إجراءات التجميل مريحة وتحتاج تخديرًا بسيطًا أو لا تحتاج.", "sessions": "تختلف حسب الخطة: التبييض جلسة أو جلستان، والفينير غالبًا جلستان أو أكثر.", "after": "تحسس مؤقت بعد التبييض أمر شائع؛ قلل الأطعمة والمشروبات المصبغة وحافظ على التنظيف الدوري."}},
"Prosthodontics":{img:"https://images.pexels.com/photos/6627600/pexels-photo-6627600.jpeg?auto=compress&cs=tinysrgb&w=640",en:{"what": "Crowns, bridges and dentures that rebuild damaged teeth or replace missing ones to restore chewing and appearance.", "when": "Heavily broken or root-treated teeth, missing teeth, or old failing replacements.", "how": "The tooth is prepared, precise impressions or scans are taken, and a custom restoration is fabricated, tried in and fixed over visits.", "pain": "Preparation is done with local anesthesia when needed; mild gum tenderness afterward is common.", "sessions": "Usually two to three visits; dentures may need extra visits for adjustments.", "after": "Avoid very hard or sticky food at first, clean around the restoration daily, and come back if the bite feels off."},ar:{"what": "تيجان وجسور وأطقم لإعادة بناء الأسنان التالفة أو تعويض المفقودة لاستعادة المضغ والمظهر.", "when": "الأسنان شديدة التكسر أو المعالجة عصبيًا، أو الأسنان المفقودة، أو التركيبات القديمة التالفة.", "how": "يُجهز السن وتُؤخذ طبعات أو مسح دقيق، وتُصنع التركيبة خصيصًا ثم تُجرب وتُثبت على جلسات.", "pain": "التجهيز يتم بالتخدير الموضعي عند الحاجة؛ وألم بسيط باللثة بعده أمر شائع.", "sessions": "غالبًا جلستان إلى ثلاث؛ والأطقم قد تحتاج جلسات إضافية للتعديل.", "after": "تجنب الأكل شديد الصلابة أو اللزوجة أولًا، ونظف حول التركيبة يوميًا، وراجعنا إذا شعرت بخلل في الإطباق."}},
"Oral Surgery":{img:"https://images.pexels.com/photos/3845941/pexels-photo-3845941.jpeg?auto=compress&cs=tinysrgb&w=640",en:{"what": "Simple and surgical extractions, wisdom tooth removal and minor surgical procedures inside the mouth, according to case assessment.", "when": "Teeth that cannot be restored, problematic wisdom teeth, retained roots, or as part of a wider treatment plan.", "how": "After examination and any needed X-ray, the area is numbed and the procedure is performed with sterile technique, with stitches when needed.", "pain": "The procedure is done under local anesthesia; soreness and swelling for a few days afterward are expected and managed with medication and instructions.", "sessions": "Usually one visit, plus a review or stitch removal if needed.", "after": "Bite on gauze as instructed, avoid smoking and straws in the first days, choose soft cold food, and keep the area gently clean."},ar:{"what": "الخلع العادي والجراحي وخلع ضرس العقل والإجراءات الجراحية البسيطة داخل الفم، حسب تقييم الحالة.", "when": "الأسنان غير القابلة للإصلاح، أو ضروس العقل المسببة لمشاكل، أو الجذور المتبقية، أو كجزء من خطة علاج أوسع.", "how": "بعد الفحص وأي أشعة لازمة يُخدر المكان ويُجرى الإجراء بتقنية معقمة، مع غرز عند الحاجة.", "pain": "الإجراء يتم تحت التخدير الموضعي؛ وألم وتورم لأيام قليلة بعده متوقع ويُدار بالأدوية والتعليمات.", "sessions": "غالبًا جلسة واحدة، مع مراجعة أو إزالة غرز عند الحاجة.", "after": "اضغط على الشاش كما يُوصى، وتجنب التدخين والشفاطات في الأيام الأولى، وتناول طعامًا لينًا باردًا، ونظف المنطقة برفق."}},
};
let curDet="";
function fillSvc(){const g=services.find(x=>x.name_en===curDet&&!x.parent),d=SVC_DETAILS[curDet];if(!g||!d)return;const D=d[lang]||d.en;$("#svcm-img").src=d.img;$("#svcm-img").alt=L(g,"name");$("#svcm-t").textContent=L(g,"name");$("#svcm-body").innerHTML=SVC_HEADS.map(h=>'<div class="svcm-sec"><h4>'+esc(h[lang])+'</h4><p>'+esc(D[h.k])+'</p></div>').join("");$("#svcm-procs").innerHTML=services.filter(x=>x.parent===curDet).map(x=>'<a href="#book" data-svc="'+esc(x.name_en)+'">'+esc(L(x,"name"))+'</a>').join("");const bk=$("#svcm-book");bk.textContent=t("s_book");bk.dataset.svc=curDet;$("#svcm-x").setAttribute("aria-label",lang==="ar"?"إغلاق":"Close")}
function openSvc(id){curDet=id;fillSvc();$("#svcm").hidden=false;document.body.style.overflow="hidden"}
function closeSvc(){const m=$("#svcm");if(m&&!m.hidden){m.hidden=true;document.body.style.overflow=""}}
function renderServices(){
 const groups=services.filter(s=>!s.parent);
 $("#svc").innerHTML=groups.map(s=>{const d=SVC_DETAILS[s.name_en];return '<article class="s">'+(d?'<img class="sph" src="'+d.img+'" alt="'+esc(L(s,"name"))+'" loading="lazy" decoding="async">':TOOTH)+'<h3>'+esc(L(s,"name"))+'</h3><p>'+esc(L(s,"descr"))+'</p><ul class="procedures">'+services.filter(x=>x.parent===s.name_en).map(x=>'<li><a href="#book" data-svc="'+esc(x.name_en)+'"><span>'+esc(L(x,"name"))+'</span><span aria-hidden="true">↗</span></a></li>').join("")+'</ul><div class="pr">'+esc(t("s_price"))+'</div><div class="row">'+(d?'<button class="btn btn-line" data-det="'+esc(s.name_en)+'">'+esc(t("s_det"))+'</button>':"")+'<a class="btn btn-gold" href="#book" data-svc="'+esc(s.name_en)+'">'+esc(t("s_book"))+'</a></div></article>'}).join("");
 if(!$("#svcm").hidden&&curDet)fillSvc();
}

function cmp(c){return '<div><div class="cmp" style="--p:50%"><img src="'+esc(SB.photoUrl(c.before_url))+'" alt="'+t("before")+'" loading="lazy"><img class="aft" src="'+esc(SB.photoUrl(c.after_url))+'" alt="'+t("after")+'" loading="lazy"><span class="bar"></span><span class="t b">'+t("before")+'</span><span class="t a">'+t("after")+'</span><input type="range" min="0" max="100" value="50" aria-label="'+t("before")+" / "+t("after")+'"></div></div>'}
function wireCmp(root){root.querySelectorAll(".cmp").forEach(el=>{const a=el.querySelector(".aft"),b=el.querySelector(".bar");el.querySelector("input").addEventListener("input",e=>{const v=e.target.value;a.style.clipPath="inset(0 0 0 "+v+"%)";b.style.left=v+"%"})})}
function renderGallery(){
 const g=cases.filter(c=>c.before_url&&c.after_url);
 $("#gal").innerHTML=g.length?g.map(c=>cmp(c).replace(/<\/div><\/div>$/,'<div class="gcap">'+esc(c.title)+'</div></div></div>')).join(""):'<div class="empty" style="grid-column:1/-1">'+esc(t("g_empty"))+'</div>';
 wireCmp($("#gal"));
}
function renderReviews(){const s=$("#reviews");s.hidden=!reviews.length;$("#rv").innerHTML=reviews.map(r=>'<blockquote>'+(r.rating?'<div class="st">'+"&#9733;".repeat(r.rating)+'</div>':"")+'<p>'+esc(r.body)+'</p><cite>'+esc(r.author)+'</cite></blockquote>').join("")}
function renderContact(){
 const o=[];
 o.push(["k_wa",'<a href="'+wa()+'" target="_blank" rel="noopener">+'+esc(String(S.whatsapp).replace(/\D/g,""))+'</a>']);
 if(S.phone)o.push(["k_phone",'<a href="tel:'+esc(S.phone)+'">'+esc(S.phone)+'</a>']);
 if(S.email)o.push(["k_email",'<a href="mailto:'+esc(S.email)+'">'+esc(S.email)+'</a>']);
 const loc=[L(S,"city"),L(S,"address")].filter(Boolean).join("\n");
 o.push(["k_loc",esc(loc)+(S.map_url?'\n<a href="'+esc(S.map_url)+'" target="_blank" rel="noopener">'+esc(t("k_map"))+'</a>':"")]);
 o.push(["k_hours",esc(L(S,"hours"))]);
 const soc=[["Instagram",S.instagram],["Facebook",S.facebook],["TikTok",S.tiktok],["LinkedIn",S.linkedin]].filter(x=>/^https?:\/\//.test(x[1]||""));
 if(soc.length)o.push(["k_soc",soc.map(x=>'<a href="'+esc(x[1])+'" target="_blank" rel="noopener">'+x[0]+'</a>').join(" &middot; ")]);
 $("#ct").innerHTML=o.map(x=>'<div class="ct"><h3>'+esc(t(x[0]))+'</h3><p>'+x[1]+'</p></div>').join("");
}
function cairoToday(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
function cairoTime(){return new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Cairo',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())}
function fillForm(){
 const sel=$("#f_service"),cur=pre||sel.value;
 sel.innerHTML='<option value="">'+esc(t("f_pick"))+'</option>'+services.filter(s=>!s.parent).map(s=>'<optgroup label="'+esc(L(s,"name"))+'"><option value="'+esc(s.name_en)+'">'+esc(L(s,"name"))+'</option>'+services.filter(x=>x.parent===s.name_en).map(x=>'<option value="'+esc(x.name_en)+'">'+esc(L(x,"name"))+'</option>').join("")+'</optgroup>').join("");
 if(cur)sel.value=cur;
 $("#f_day").min=cairoToday(); updateTimes();
}
function updateTimes(){
 const emergency=$("#f_kind").value==='emergency',tm=$("#f_time"),cur=tm.value,day=$("#f_day").value;
 $("#f_day").required=!emergency;tm.required=!emergency;tm.disabled=emergency;
 $("#kind-note").textContent=t(emergency?'kind_emergency_note':'kind_routine_note');
 let h='<option value="">'+esc(t(emergency?'time_arranged':'f_pickt'))+'</option>';
 if(!emergency)for(let m=17*60;m<=21*60+30;m+=30){const v=String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0'),end=String(Math.floor((m+30)/60)).padStart(2,'0')+':'+String((m+30)%60).padStart(2,'0');if(day===cairoToday()&&v<=cairoTime())continue;h+='<option value="'+v+'">'+v+' – '+end+'</option>'}
 tm.innerHTML=h;if(cur&&!emergency)tm.value=cur;
}
$("#f_kind").addEventListener('change',updateTimes);$("#f_day").addEventListener('change',updateTimes);
/* case detail */
function route(){
 const m=location.hash.match(/^#\/case\/(.+)$/);const ov=$("#ov");
 if(!m){ov.classList.remove("on");document.body.style.overflow="";return}
 const c=cases.find(x=>x.id===m[1]);if(!c){return}
 const box=(k,v)=>v?'<div class="box"><h3>'+esc(t(k))+'</h3><p>'+esc(v)+'</p></div>':"";
 $("#cd").innerHTML='<div class="eyebrow">'+esc(T[lang].cat[c.specialty]||c.specialty)+'</div><h1>'+esc(c.title)+'</h1>'+((c.before_url&&c.after_url)?cmp(c):"")+box("cd_desc",c.summary)+box("cd_diag",c.diagnosis)+box("cd_plan",c.plan)+box("cd_steps",c.steps)+box("cd_res",c.result);
 wireCmp($("#cd"));ov.classList.add("on");ov.scrollTop=0;document.body.style.overflow="hidden";
}
/* data */
async function load(){
 try{
  const [st,sv,cs,rv]=await Promise.all([SB.rest("settings?select=key,value&key=eq.site"),SB.rest("services?select=*&published=eq.true&order=sort"),SB.rest("cases?select=*&order=sort,created_at.desc"),SB.rest("reviews?select=*&order=sort")]);
  if(st&&st[0]&&st[0].value)S=Object.assign({},DEFAULT_SITE,st[0].value);
  if(sv&&sv.length)services=sv;
  cases=cs||[];reviews=rv||[];
 }catch(e){}
 render();
}
/* events */
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-c]");if(b){flt=b.dataset.c;renderCases();return}
 const s=e.target.closest("[data-svc]");if(s){closeSvc();pre=s.dataset.svc;$("#f_service").value=pre;if(/Emergency/i.test(pre)){$("#f_kind").value="emergency";updateTimes()}return}
 const d=e.target.closest("[data-det]");if(d){openSvc(d.dataset.det);return}
 const c=e.target.closest(".card");if(c){location.hash="#/case/"+c.dataset.id}
});
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.classList.contains("card"))location.hash="#/case/"+e.target.dataset.id;if(e.key==="Escape"){closeCase();closeSvc()}});
function closeCase(){if(location.hash.startsWith("#/case/"))location.hash="#cases"}
$("#ovx").onclick=closeCase;$("#svcm-x").onclick=closeSvc;$("#svcm").addEventListener("click",e=>{if(e.target.id==="svcm")closeSvc()});window.addEventListener("hashchange",route);
$("#lang").onclick=()=>{lang=lang==="ar"?"en":"ar";localStorage.setItem("lang",lang);render()};
$("#burger").onclick=()=>$("#menu").classList.toggle("open");
$("#menu").addEventListener("click",()=>$("#menu").classList.remove("open"));
const nav=$("#nav");addEventListener("scroll",()=>nav.classList.toggle("solid",scrollY>30),{passive:true});
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12});$$(".rev").forEach(r=>io.observe(r))}else $$(".rev").forEach(r=>r.classList.add("in"));
/* booking */
$("#bform").addEventListener("submit",async e=>{
 e.preventDefault();const f=e.target,box=$("#bmsg"),btn=$("#bsub");const show=(c,m)=>{box.className="full msg "+c;box.textContent=m};
 if(f.website.value)return;
 const name=f.elements.name.value.trim(),phone=f.phone.value.trim(),service=f.service.value,day=f.day.value,time=f.time.value,note=f.note.value.trim(),kind=f.kind.value,emergency=kind==="emergency";
 if(!name||name.length<2||!phone||!service||(!emergency&&(!day||!time)))return show("err",t("e_fill"));
 if(!/^[+0-9 ()-]{7,20}$/.test(phone)||phone.replace(/\D/g,"").length<7)return show("err",t("e_phone"));
 if(!$("#f_ok").checked)return show("err",t("e_consent"));
 const dd=new Date(day+"T12:00:00");if(!emergency&&dd.getDay()===5)return show("err",t("e_fri"));
 if(day&&day<f_min())return show("err",t("e_past"));
 btn.disabled=true;
 try{
  await SB.rest("appointments",{method:"POST",headers:{Prefer:"return=minimal"},body:{name,phone,service,preferred_day:day||null,preferred_time:emergency?null:time,request_kind:kind,note:note||null}});
  const sv=services.find(s=>s.name_en===service);
  const txt=(lang==="ar"?"طلب حجز: ":"Booking request: ")+name+" | "+(sv?L(sv,"name"):service)+" | "+(day||t("time_arranged"))+" "+(emergency?t("kind_emergency"):time);
  box.className="full msg ok";box.innerHTML=esc(t("ok"))+' <a href="'+wa(txt)+'" target="_blank" rel="noopener" style="font-weight:600">'+esc(t("ok_wa"))+'</a>';f.reset();pre="";fillForm();
 }catch(err){
  if(err.status===409||err.code==="23505")show("err",t("e_dup"));
  else if(err.status===400||err.status===422)show("err",t("e_fill"));
  else{box.className="full msg err";box.innerHTML=esc(t("e_net"))+' <a href="'+wa(t("wa_msg"))+'" target="_blank" rel="noopener" style="font-weight:600">WhatsApp</a>'}
 }finally{btn.disabled=false}
});
function f_min(){return $("#f_day").min}
render();load();
})();
