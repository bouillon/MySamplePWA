const CACHE_NAME = 'temperature-converter-v4';

console.log(CACHE_NAME);

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/converter.js',
      '/converter.css',
      '/main.js',
      
    ]).then(() => self.skipWaiting());

  })());
});

self.addEventListener('activate', event => {
  console.log("activate")
  event.waitUntil(self.clients.claim());
});


// This will also work...
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
        }
    }
  })());
});

// This will also work...
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.match(event.request, {ignoreSearch: true}))
//       .then(response => {
//       return response || fetch(event.request);
//     })
//   );
// });