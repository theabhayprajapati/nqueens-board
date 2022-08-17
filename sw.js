// install event pwa
self.addEventListener('install', function (event) {
    console.log('Service Worker: Installed');

}
);
// activate event pwa
self.addEventListener('activate', function (event) {
    console.log('Service Worker: Activated');
}

);

// fetch event pwa

// cache index.html file for offline use
var CACHE_NAME = 'cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/assets/favicon.ico',
    '/assets/maze.png',

]
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
}

);
self.addEventListener('fetch', function (event) {
    console.log('Service Worker: Fetching')
    console.log(event);
    // show cache  data if available
    event.respondWith(
        caches.match(event.request).then(cache => {
            return cache || fetch(event.request);
        })
    );

}
)