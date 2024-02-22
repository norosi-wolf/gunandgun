
var SW_VERSION = '1.0.15';

// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja
// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = `pwa-gunnagun-caches ${SW_VERSION}`;
var urlsToCache = [
    '/gunnagun/',
    '/gunnagun/index.html',
    '/gunnagun/sw.js',
    '/gunnagun/manifest.json',
    '/gunnagun/js/app.js',
    '/gunnagun/js/jquery-3.7.1.min.js',
    '/gunnagun/css/all.min.css',
    '/gunnagun/css/sanitize.css',
    '/gunnagun/css/style.css',
    '/gunnagun/webfonts/fa-solid-900.ttf',
    '/gunnagun/webfonts/fa-solid-900.woff2',
    '/gunnagun/webfonts/RocknRollOne-Regular.ttf',
    '/gunnagun/img/icon_72x72.png',
    '/gunnagun/img/icon_96x96.png',
    '/gunnagun/img/icon_128x128.png',
    '/gunnagun/img/icon_144x144.png',
    '/gunnagun/img/icon_152x152.png',
    '/gunnagun/img/icon_192x192.png',
    '/gunnagun/img/icon_384x384.png',
    '/gunnagun/img/icon_512x512.png',
];

const CACHE_KEYS = [
    CACHE_NAME
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});

// 前バージョンの不要なキャッシュを削除
self.addEventListener('activate', event => {
    event.waitUntil(
      caches
        .keys()
        .then(keys => {
            return Promise.all(
                keys.filter(key => {
                    return !CACHE_KEYS.includes(key);
                }).map(key => {
                    return caches.delete(key);
                })
            );
        })
    );
});
