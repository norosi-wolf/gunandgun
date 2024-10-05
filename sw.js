
var SW_VERSION = '1.0.26';

// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja
// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = `pwa-gunandgun-tool-caches;
var urlsToCache = [
    '/gunandgun/',
    '/gunandgun/index.html',
    '/gunandgun/sw.js',
    '/gunandgun/manifest.json',
    '/gunandgun/js/app.js',
    '/gunandgun/js/jquery-3.7.1.min.js',
    '/gunandgun/css/all.min.css',
    '/gunandgun/css/sanitize.css',
    '/gunandgun/css/style.css',
    '/gunandgun/webfonts/fa-solid-900.ttf',
    '/gunandgun/webfonts/fa-solid-900.woff2',
    '/gunandgun/webfonts/RocknRollOne-Regular.ttf',
    '/gunandgun/img/icon_72x72.png',
    '/gunandgun/img/icon_96x96.png',
    '/gunandgun/img/icon_128x128.png',
    '/gunandgun/img/icon_144x144.png',
    '/gunandgun/img/icon_152x152.png',
    '/gunandgun/img/icon_192x192.png',
    '/gunandgun/img/icon_384x384.png',
    '/gunandgun/img/icon_512x512.png',
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
