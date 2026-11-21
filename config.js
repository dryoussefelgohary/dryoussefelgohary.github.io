/* Dr Youssef Elgohary - shared config and tiny Supabase client. The key below is a public (publishable) key; row-level security protects the data. */
window.CFG = {
  url: "https://wslxnsfhjluzxdtzsxnz.supabase.co",
  key: "sb_publishable_JROGwHI4PKEUBLF9g2SNDQ_kGMLw70Z",
  bucket: "case-photos"
};
/* Defaults shown if the database is empty or unreachable. Edit them in the admin dashboard (Website settings). */
window.DEFAULT_SITE = {
  whatsapp: "201019771417", phone: "", email: "dr.youssef.ashraff@gmail.com",
  instagram: "", facebook: "", linkedin: "",
  city_en: "Zagazig, Sharqia", city_ar: "الزقازيق، الشرقية",
  address_en: "", address_ar: "", map_url: "",
  hours_en: "Saturday to Thursday, 5:00 PM to 10:00 PM (Cairo time)\nFriday: emergency cases only",
  hours_ar: "من السبت إلى الخميس، من ٥ مساءً إلى ١٠ مساءً (بتوقيت القاهرة)\nالجمعة: حالات الطوارئ فقط",
  bio_en: "I believe dentistry is more than treating teeth. It is about restoring confidence, improving quality of life, and creating healthy smiles that people feel proud of.\n\nMy approach is built on attention to detail, continuous learning, and understanding each patient's individual needs. I aim to provide a comfortable and reassuring experience, with proper diagnosis, personalized treatment planning, and preservation of natural tooth structure whenever possible.\n\nMy clinical interests are oral surgery, endodontics and pediatric dentistry, along with cosmetic restorations and veneers. I am committed to developing my clinical skills and staying up to date with modern dental techniques.\n\nEvery smile is unique, and my goal is to help every patient achieve a healthier smile with confidence, comfort, and trust.",
  bio_ar: "أؤمن أن طب الأسنان أكبر من علاج الأسنان. هو استعادة الثقة وتحسين جودة الحياة وصناعة ابتسامات صحية يفخر بها أصحابها.\n\nيقوم أسلوبي على الاهتمام بالتفاصيل والتعلم المستمر وفهم احتياج كل مريض. أحرص على أن تكون التجربة مريحة ومطمئنة، مع تشخيص سليم وخطة علاج مخصصة والحفاظ على بنية السن الطبيعية قدر الإمكان.\n\nاهتماماتي السريرية هي جراحة الفم وعلاج الجذور وطب أسنان الأطفال، إلى جانب الحشوات التجميلية والفينير. أعمل على تطوير مهاراتي الإكلينيكية ومواكبة التقنيات الحديثة في طب الأسنان.\n\nكل ابتسامة فريدة، وهدفي أن أساعد كل مريض على ابتسامة أصح بثقة وراحة وطمأنينة.",
  timeline_en: "Dental internship | Zagazig General Hospital\nDental internship | Al-Azhar University\nDental studies | Al-Azhar University, Cairo. Graduated 2026\nClinical experience | Worked in clinics alongside experienced dentists",
  timeline_ar: "امتياز طب الأسنان | مستشفى الزقازيق العام\nامتياز طب الأسنان | جامعة الأزهر\nدراسة طب الأسنان | جامعة الأزهر بالقاهرة. تخرج 2026\nالخبرة العملية | عملت في عيادات إلى جانب أطباء أسنان ذوي خبرة",
  courses_en: "", courses_ar: ""
};
window.DEFAULT_SERVICES = [
 ["Preventive Dentistry","طب الأسنان الوقائي","Check-ups, professional cleaning and guidance to keep teeth and gums healthy.","فحوصات وتنظيف احترافي وإرشادات للحفاظ على صحة الأسنان واللثة."],
 ["Restorative Dentistry","طب الأسنان الترميمي","Fillings and restorations to repair damaged teeth and restore function.","حشوات وترميمات لإصلاح الأسنان التالفة واستعادة وظيفتها."],
 ["Endodontics","علاج الجذور","Root canal care to relieve pain and save natural teeth when possible.","علاج قنوات الجذور لتخفيف الألم والحفاظ على السن الطبيعي متى أمكن."],
 ["Cosmetic Dentistry","طب الأسنان التجميلي","Aesthetic improvements designed to complement your natural smile.","تحسينات جمالية مصممة لتتناسب مع ابتسامتك الطبيعية."],
 ["Prosthodontics","التركيبات السنية","Crowns, bridges and dentures to restore damaged or missing teeth.","تيجان وجسور وأطقم لتعويض الأسنان التالفة أو المفقودة."],
 ["Oral Surgery","جراحة الفم","Oral surgical procedures according to case assessment.","إجراءات جراحية بالفم حسب تقييم الحالة."]
].map((s,i)=>({id:"d"+i,name_en:s[0],name_ar:s[1],descr_en:s[2],descr_ar:s[3],price:"",sort:i+1,published:true}));

window.SB = {
  token: null,
  h(extra){ const t = this.token || CFG.key; return Object.assign({apikey:CFG.key, Authorization:"Bearer "+t, "Content-Type":"application/json"}, extra||{}); },
  async rest(path, opt){ opt=opt||{}; const r = await fetch(CFG.url+"/rest/v1/"+path, {method:opt.method||"GET", headers:this.h(opt.headers), body:opt.body?JSON.stringify(opt.body):undefined});
    const txt = await r.text(); let data=null; try{data=txt?JSON.parse(txt):null}catch(e){}
    if(!r.ok){ const e=new Error((data&&data.message)||("HTTP "+r.status)); e.status=r.status; e.code=data&&data.code; throw e; } return data; },
  async login(email,password){ const r = await fetch(CFG.url+"/auth/v1/token?grant_type=password",{method:"POST",headers:{apikey:CFG.key,"Content-Type":"application/json"},body:JSON.stringify({email,password})});
    const d = await r.json(); if(!r.ok) throw new Error(d.error_description||d.msg||"Login failed"); this.token=d.access_token; sessionStorage.setItem("sbtok",d.access_token); sessionStorage.setItem("sbexp",String(Date.now()+d.expires_in*1000-60000)); return d; },
  restore(){ const t=sessionStorage.getItem("sbtok"), e=+sessionStorage.getItem("sbexp"); if(t&&e>Date.now()){this.token=t;return true} return false },
  logout(){ this.token=null; sessionStorage.removeItem("sbtok"); sessionStorage.removeItem("sbexp"); },
  photoUrl(p){ return p ? (/^https?:/.test(p)?p:CFG.url+"/storage/v1/object/public/"+CFG.bucket+"/"+p) : ""; },
  async upload(file){ const ext=(file.type==="image/png")?"png":(file.type==="image/webp"?"webp":"jpg"); const name=Date.now().toString(36)+Math.random().toString(36).slice(2,7)+"."+ext;
    const r = await fetch(CFG.url+"/storage/v1/object/"+CFG.bucket+"/"+name,{method:"POST",headers:{apikey:CFG.key,Authorization:"Bearer "+this.token,"Content-Type":file.type,"x-upsert":"false"},body:file});
    if(!r.ok){ const d=await r.json().catch(()=>({})); throw new Error(d.message||("Upload failed "+r.status)); } return name; }
};
