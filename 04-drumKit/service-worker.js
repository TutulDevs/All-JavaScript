const FILES_TO_CACHE = [
    '/',
    './index.html',
    './style.css',
    './app.js',
    './sounds/boom.wav',
    './sounds/clap.wav',
    './sounds/hihat.wav',
    './sounds/kick.wav',
    './sounds/openhat.wav',
    './sounds/ride.wav',
    './sounds/snare.wav',
    './sounds/tink.wav',
    './sounds/tom.wav',
];
//UPDATE VERSION WHEN U UPDATE CODE
const CACHE_NAME = 'STATIC_CACHE_V2';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => (response ? response : fetch(event.request)))
    );
});
