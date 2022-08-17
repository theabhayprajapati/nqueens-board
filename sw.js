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
self.addEventListener('fetch', function (event) {
    console.log('Service Worker: Fetching')
    console.log(event);
    event.respondWith(fetch(event.request));
}
)
// cache index.html file for offline use
var CACHE_NAME = 'cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/db.js',
]
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                var msg = document.getElementById('winning-message')
                msg.innerHTML = 'Caching files...'
                return cache.addAll(urlsToCache);
            })
    );
}

);
