const CACHE_NAME = 'mailgeneratorappcache';
const urlsToCache = [
    'clipboard.mjs',
    'conversion_time.js',
    'index.html',
    'links.js',
    'links.json',
    'notes.js',
    'refresh.js',
    'script.js',
    '/src/'
  ];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(urlsToCache);
        })
    );
  });


  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {

          if (response) {
            return response;
          }
  
          return fetch(event.request).then((response) => {
            
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
  
            const responseToCache = response.clone();
  
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
  
            return response;
          });
        })
    );
  });