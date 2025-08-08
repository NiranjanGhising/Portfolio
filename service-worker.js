const CACHE = 'ng-portfolio-v2';
const ASSETS = [
  './',
  './index.html',
  './404.html',
  './style.css',
  './script.js',
  './images/NG_logo.png',
  './images/normalNiranjan.jpg',
  './images/NiranjanGhising_DataAnalystInter_Resume.pdf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  // Provide an offline fallback for navigations
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./404.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request)
          .then((response) => {
            const clone = response.clone();
            caches
              .open(CACHE)
              .then((cache) => cache.put(event.request, clone))
              .catch(() => {});
            return response;
          })
          .catch(() => cached)
      );
    })
  );
});
