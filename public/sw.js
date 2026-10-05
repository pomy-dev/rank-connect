const CACHE_NAME = 'rankconnect-shell-v3'
const APP_SHELL = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(APP_SHELL.map((url) => cache.add(url)))
    }),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith('rankconnect-shell-') && key !== CACHE_NAME)
        .map((key) => caches.delete(key)),
    )),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          return caches.open(CACHE_NAME)
            .then((cache) => cache.put('/', response.clone()))
            .catch(() => undefined)
            .then(() => response)
        }
        return response
      }).catch(() => caches.match('/')),
    )
    return
  }

  if (url.pathname.startsWith('/_next/static/') || APP_SHELL.includes(url.pathname)) {
    event.respondWith(caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((response) => {
        if (response.ok) {
          return caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, response.clone()))
            .catch(() => undefined)
            .then(() => response)
        }
        return response
      })
    }))
  }
})
