const CACHE_NAME = 'cpisi-gate-v1.1'; // BUMP VERSION
const ASSETS = [
  './',
  './index.html',
  './gate.css?v=1.1',
  './js/core.js?v=1.1',
  './js/security.js?v=1.1',
  './js/social.js?v=1.1',
  './js/auth.js?v=1.1',
  './js/navigation.js?v=1.1',
  './js/terminal.js?v=1.1',
  './js/chat.js?v=1.1',
  './flagship.js?v=1.1',
  './manifest.json?v=1.1'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // FORCE ACTIVATION
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  // PURGE OLD CACHES
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
