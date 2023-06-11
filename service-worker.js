const cacheName = 'purnorup-cache';
const filesToCache = [
  '/',
  'background.png',
  'logo.png',
  'logo_icon.ico',
  'case converter.html',
  'image cropper.html',
  'challenging bricks.html',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

