var CACHE_NAME = 'cache-v3';

// install event pwa
self.addEventListener('install', function (event) {
    console.log('Service Worker: Installed');

}
);
// activate event pwa
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
});


// cache index.html file for offline use
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
self.addEventListener('fet  ch', function (event) {
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