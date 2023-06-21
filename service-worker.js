const cacheName = 'purnorup-cache-v2.5';
const filesToCache = [
  '/',
  'logo.png',
  'logo_icon.ico',
  'elegant-pixel.html',
  'challenging-bricks.html,
  'age-nexus.html',
  'dictionary.html',
  'case-flow.html',
  'cropify.html'
  'about.html',
  'data/dictionary_data.zip',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
