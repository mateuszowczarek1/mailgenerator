const cacheName = 'mailgeneratorappcache';
const staticAssets = [
    'clipboard.mjs',
    'conversion_time.js',
    'index.html',
    'links.js',
    'links.json',
    'notes.js',
    'refresh.js',
    'script.js',
    'src/favicon.ico',
    'src/pdfs/imagrmagick.md',
    'src/pdfs/regexp.md',
    'src/icons/512.png',
];

self.addEventListener('install', async (e) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    self.clients.claim();
});

self.addEventListener('fetch', async (e) => {
    const req = e.request;
    const url = new URL(req.url);
    
    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);

    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);

    try {
        const fresh = await fetch(req);

        if (staticAssets.includes(req.url)) {
            // Clone the response before caching it
            await cache.put(req, fresh.clone());
        }

        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}