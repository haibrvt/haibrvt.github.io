// Service Worker tự dọn dẹp cache và luôn lấy code mới nhất từ mạng
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // Xóa toàn bộ cache cũ lưu trên máy
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Network-first: Luôn tải mới từ máy chủ GitHub, không lưu cache đè lên file HTML
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
