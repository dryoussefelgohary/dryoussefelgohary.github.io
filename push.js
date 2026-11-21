(function(){
"use strict";
/* Phone notifications for new booking requests. Only the PUBLIC application-server key lives here; the private VAPID key stays server-side in Supabase secrets. */
var VAPID_PUBLIC = "BMJRCskfo_-ZTfVgvy9Wrv9MuuLsEsO73GJ-ZedXaUnQ059_0xtxcEba9veUgg53J0Ob_I2SnAu6u_gnhwUvoc0";
function b64ToU8(b){
  var p = "=".repeat((4 - b.length % 4) % 4);
  var s = atob((b + p).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(s, function(c){ return c.charCodeAt(0); });
}
async function enable(btn){
  btn.disabled = true;
  try{
    if(!("serviceWorker" in navigator) || !("PushManager" in window)){ btn.textContent = "Not supported on this browser / غير مدعوم على هذا المتصفح"; return; }
    var perm = await Notification.requestPermission();
    if(perm !== "granted"){ btn.disabled = false; btn.textContent = "Permission needed / الإذن مطلوب"; return; }
    var reg = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    var sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(VAPID_PUBLIC) });
    var j = sub.toJSON();
    await SB.rest("push_subscriptions?on_conflict=endpoint", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: { endpoint: j.endpoint, keys: j.keys } });
    btn.textContent = "Phone notifications on / الإشعارات مفعّلة ✓";
  }catch(e){ btn.disabled = false; btn.textContent = "Retry notifications / إعادة المحاولة"; }
}
window.addEventListener("load", function(){
  var host = document.querySelector("#app .top .wrap span");
  if(!host) return;
  var b = document.createElement("button");
  b.className = "sm"; b.id = "pushbtn";
  b.textContent = "Enable phone notifications / تفعيل إشعارات الموبايل";
  b.onclick = function(){ enable(b); };
  host.insertBefore(b, host.firstChild);
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js").then(async function(reg){
      var sub = await reg.pushManager.getSubscription();
      if(sub) b.textContent = "Phone notifications on / الإشعارات مفعّلة ✓";
    }).catch(function(){});
  }
});
})();
