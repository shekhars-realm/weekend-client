// service-worker.js

// Flag for enabling cache in production
var CACHE_NAME = 'spinzer_v2';

const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/js/swiper.min.js'
]

//install service worker
self.addEventListener('install', event => {
  console.log('sw installed');
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    console.log('SW Caching Files');
    cache.addAll(CACHE_ASSETS)
  }).then(() => self.skipWaiting()))
});

// Delete old caches
self.addEventListener('activate', event => {
  console.log('sw activated');
  event.waitUntil(
    caches.keys().then(cachesNames => {
      return Promise.all(
        cachesNames.map(cache => {
          if(cache !== CACHE_NAME) {
            console.log('SW cleaning Old Cache');
            return caches.delete(cache)
          }
        })
      )
    })
  )
});


self.addEventListener('fetch', event => {
  console.log('sw fetched', event.request);
  event.respondWith(fromCache(event.request));
  evt.waitUntil(
    update(evt.request).then(refresh);

});

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        return response;
      });
    });
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      };
      client.postMessage(JSON.stringify(message));
    });
  });
}
