// Bobo — oflayn ishlash uchun service worker
const CACHE='bobo-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png',
  './vendor/firebase-app-compat.js','./vendor/firebase-auth-compat.js','./vendor/firebase-firestore-compat.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  // Firebase/Google API so'rovlari keshlanmaydi
  if(/googleapis\.com|firebaseio|identitytoolkit|securetoken/.test(u.host))return;
  e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request);
    const net=fetch(e.request).then(r=>{if(r&&r.ok&&(u.origin===location.origin||/gstatic|fonts\.g/.test(u.host)))c.put(e.request,r.clone());return r}).catch(()=>hit);
    return hit||net}))});
