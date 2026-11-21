self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) {}
  const title = d.title || 'New booking request / طلب حجز جديد';
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || '',
    data: { url: d.url || '/admin.html' },
    icon: '/emblem-gold.png',
    badge: 'https://wslxnsfhjluzxdtzsxnz.supabase.co/storage/v1/object/public/assets/7-notification-badge.png',
    dir: 'auto'
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/admin.html';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url.indexOf('admin.html') !== -1) return c.focus(); }
    return clients.openWindow(url);
  }));
});
