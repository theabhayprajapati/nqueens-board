var CACHE_NAME = 'cache-v13';
var DYNAMIC_CACHE_NAME = 'dynamic-cache-v13';
// cache index.html file for offline use
var urlsToCache = [
    '/',
    '/index.html',
    '/assets/favicon.ico',
    '/assets/maze.png',
    '/src/index.js',
    'manifest.json',
    '/src/utils/utils.js',
    '/assets/style/style.css',
    '/offline.html',
]

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}



// install event pwa
self.addEventListener('install', function (event) {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});


// activate event pwa
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME
                    && key !== DYNAMIC_CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
    console.log('deleted old cache');
});



self.addEventListener('fetch', function (event) {
    console.log('Service Worker: Fetching')

    // show cache  data if available
    event.respondWith(
        caches.match(event.request).then(cache => {
            return cache || fetch(event.request).then(fetchRes => {
                return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    limitCacheSize(DYNAMIC_CACHE_NAME, 3);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (event.request.url.indexOf('.html') > -1) {
                return caches.match('/offline.html');
            }
        })

    );
}
);