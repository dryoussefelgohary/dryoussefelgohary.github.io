(function(){
"use strict";
/* Phone notifications for new booking requests. Only the PUBLIC application-server key lives here; the private VAPID key stays server-side in Supabase secrets. */
var VAPID_PUBLIC = "BMJRCskfo_-ZTfVgvy9Wrv9MuuLsEsO73GJ-ZedXaUnQ059_0xtxcEba9veUgg53J0Ob_I2SnAu6u_gnhwUvoc0";
var PV = "v4";
var ERR_KEY = "push_err";
function b64ToU8(b){
  var p = "=".repeat((4 - b.length % 4) % 4);
  var s = atob((b + p).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(s, function(c){ return c.charCodeAt(0); });
}
function fail(btn, step, e){
  btn.disabled = false;
  var m = String((e && e.message) || e).slice(0, 80);
  var label = "Error " + step + ": " + m + " \u00B7 " + PV;
  btn.textContent = label;
  try{ localStorage.setItem(ERR_KEY, label); }catch(x){}
}
function ok(btn){
  btn.textContent = "Phone notifications on / \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0645\u0641\u0639\u0651\u0644\u0629 \u2713 \u00B7 " + PV;
  try{ localStorage.removeItem(ERR_KEY); }catch(x){}
}
async function saveSub(sub){
  var j = sub.toJSON();
  await SB.rest("push_subscriptions?on_conflict=endpoint", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: { endpoint: j.endpoint, keys: j.keys } });
}
async function enable(btn){
  btn.disabled = true;
  try{
    if(!("serviceWorker" in navigator) || !("PushManager" in window)){ btn.disabled = false; btn.textContent = "Not supported on this browser / \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u00B7 " + PV; return; }
    var perm;
    try{ perm = await Notification.requestPermission(); }catch(e){ fail(btn, "perm", e); return; }
    if(perm !== "granted"){ btn.disabled = false; btn.textContent = "Permission needed / \u0627\u0644\u0625\u0630\u0646 \u0645\u0637\u0644\u0648\u0628 \u00B7 " + PV; return; }
    var reg;
    try{
      reg = await navigator.serviceWorker.register("/sw.js");
      await Promise.race([navigator.serviceWorker.ready, new Promise(function(res){ setTimeout(res, 8000); })]);
    }catch(e){ fail(btn, "sw", e); return; }
    var sub;
    try{
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(VAPID_PUBLIC) });
    }catch(e){
      var old = null;
      try{ old = await reg.pushManager.getSubscription(); }catch(x){}
      if(old){
        try{ await old.unsubscribe(); sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(VAPID_PUBLIC) }); }
        catch(e2){ fail(btn, "subscribe", e2); return; }
      }else{ fail(btn, "subscribe", e); return; }
    }
    try{ await saveSub(sub); }catch(e){ fail(btn, "save", e); return; }
    btn.disabled = false;
    ok(btn);
  }catch(e){
    fail(btn, "unknown", e);
  }
}
window.addEventListener("load", function(){
  var host = document.querySelector("#app .top .wrap span");
  if(!host) return;
  var b = document.createElement("button");
  b.className = "sm"; b.id = "pushbtn";
  b.textContent = "Enable phone notifications / \u062A\u0641\u0639\u064A\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0648\u0628\u0627\u064A\u0644 \u00B7 " + PV;
  b.onclick = function(){ enable(b); };
  host.insertBefore(b, host.firstChild);
  if("Notification" in window && Notification.permission === "denied"){
    b.textContent = "Notifications blocked in browser settings / \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0645\u062D\u0638\u0648\u0631\u0629 \u0645\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u00B7 " + PV;
  } else if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js").then(async function(reg){
      var sub = null;
      try{ sub = await reg.pushManager.getSubscription(); }catch(e){}
      if(sub){
        try{ await saveSub(sub); ok(b); }
        catch(e){ fail(b, "save", e); }
      }else{
        var last = null;
        try{ last = localStorage.getItem(ERR_KEY); }catch(x){}
        if(last) b.textContent = last;
      }
    }).catch(function(e){
      var last = null;
      try{ last = localStorage.getItem(ERR_KEY); }catch(x){}
      if(last) b.textContent = last;
    });
  }
});
})();
