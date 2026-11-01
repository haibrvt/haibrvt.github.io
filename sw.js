const CACHE_NAME = 'mt5-dashboard-v1';
const ASSETS = [
  './',
  './index.html',
  './favicon.png',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Bỏ qua các API Google Sheet, chỉ cache tài nguyên tĩnh
  if (e.request.url.includes('google.com') || e.request.url.includes('gviz')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
