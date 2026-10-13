const C='tawjihi-v2',A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.open(C).then(async c=>{
const m=await c.match(e.request,{ignoreSearch:true});
const n=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(e.request,r.clone());return r}).catch(()=>null);
if(m)return m;
const r=await n;if(r)return r;
if(e.request.mode==='navigate')return (await c.match('index.html'))||(await c.match('./'))||Response.error();
return Response.error()}))});
