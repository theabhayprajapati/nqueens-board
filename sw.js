// install event pwa
self.addEventListener('install', function (event) {
    console.log('Service Worker: Installed');

}
);
// activate event pwa
self.addEventListener('activate', function (event) {
    console.log('Service Worker: Activated');
    // remove old cache
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        }
        )
    );
}

);

// fetch event pwa

// cache index.html file for offline use
var CACHE_NAME = 'cache-v2';
var urlsToCache = [
    '/',
    '/index.html',
    '/assets/favicon.ico',
    '/assets/maze.png',
    'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    'https://cdn.worldvectorlogo.com/logos/twitter-3.svg',
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