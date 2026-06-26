// Service worker Nova-Star Group (PWA)
const CACHE = "nsg-v5";

// fisierele de baza (mici) - le tinem pt functionare offline
const ASSETS = [
  "./",
  "./index.html",
  "./nova-play.html",
  "./nova-solutions.html",
  "./northstar.html",
  "./login.html",
  "./register.html",
  "./ghid-parinti.html",
  "./style.css",
  "./kids.css",
  "./nova-auth.js",
  "./pwa.js",
  "./page-flip.browser.js",
  "./NovaHubLogo.png",
  "./NovaPlayLearnLogo.jpeg",
  "./NovaSolutionsLogo.jpeg",
  "./NorthStarStudioLogo.jpeg",
  "./mindgames-logo.png",
  "./CopertaGhidPentruParinti.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {})
  );
  // NU mai facem skipWaiting automat: asteptam ca userul sa apese "Actualizeaza"
});

// pagina ne cere sa activam versiunea noua (dupa apasarea pe "Actualizeaza")
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// cache-first pentru fisierele cunoscute; restul din retea
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
