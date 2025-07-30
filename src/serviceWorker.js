/* eslint-disable no-restricted-globals */
// This file is registered in index.js for optional PWA/offline support.

const CACHE_NAME = 'evzone-core-v1';
const PRECACHE_URLS = ['/index.html', '/favicon.ico'];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  if (evt.request.mode === 'navigate') {
    evt.respondWith(
      fetch(evt.request).catch(() => caches.match('/index.html'))
    );
  }
});
