const cacheName = 'purnorup-cache-v2.2';
const filesToCache = [
  '/',
  'logo.png',
  'logo_icon.ico',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cache) {
          return cache.startsWith('purnorup-cache-v2') || cache.startsWith('purnorup-cache-v2.1') && cache !== cacheName;
        }).map(function(cache) {
          return caches.delete(cache);
        })
      );
    }).then(function() {
      return caches.open(cacheName);
    }).then(function(cache) {
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
