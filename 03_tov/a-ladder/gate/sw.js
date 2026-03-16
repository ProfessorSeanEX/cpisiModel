const CACHE_NAME = 'cpisi-gate-v1';
const ASSETS = [
  './',
  './index.html',
  './gate.css',
  './js/core.js',
  './js/auth.js',
  './js/navigation.js',
  './js/terminal.js',
  './js/chat.js',
  './flagship.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
