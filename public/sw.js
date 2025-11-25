// Service worker for instant loading - updated to fix routing issues
const CACHE_NAME = 'contwre-v4'
const CRITICAL_ASSETS = [
  '/',
  '/assets/contwre-logo-white.png',
  '/assets/engine-gif.gif',
  '/assets/founder-together.jpg'
]

// Install event - cache critical assets only
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CRITICAL_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => 
        Promise.all(
          cacheNames.map((cacheName) => 
            cacheName !== CACHE_NAME ? caches.delete(cacheName) : Promise.resolve()
          )
        )
      )
      .then(() => self.clients.claim())
  )
})

// Fetch event - network first for JS/CSS modules, cache for images
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  const pathname = url.pathname
  
  // Never cache JS/CSS modules - always fetch from network
  if (pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.includes('/assets/') && (pathname.endsWith('.js') || pathname.endsWith('.css'))) {
    event.respondWith(fetch(event.request))
    return
  }
  
  // For HTML and images, try cache first then network
  if (pathname.endsWith('.html') || pathname === '/' || /\.(png|jpg|jpeg|gif|svg|webp|avif|mp4)$/i.test(pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request).then((fetchResponse) => {
            // Only cache images, not HTML
            if (/\.(png|jpg|jpeg|gif|svg|webp|avif|mp4)$/i.test(pathname)) {
              const responseClone = fetchResponse.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone)
              })
            }
            return fetchResponse
          })
        })
    )
    return
  }
  
  // For everything else, network only
  event.respondWith(fetch(event.request))
})
