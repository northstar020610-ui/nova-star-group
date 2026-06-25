// ===== PWA: service worker + pop-up de instalare propriu =====

// 1) Inregistreaza service worker-ul (instalabil + offline) + detecteaza actualizari
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then((reg) => {
      // exista deja o versiune noua in asteptare?
      if (reg.waiting && navigator.serviceWorker.controller) showUpdateBar(reg);

      // s-a gasit o versiune noua in timp ce stai pe site
      reg.addEventListener("updatefound", () => {
        const nou = reg.installing;
        if (!nou) return;
        nou.addEventListener("statechange", () => {
          if (nou.state === "installed" && navigator.serviceWorker.controller) {
            showUpdateBar(reg);
          }
        });
      });

      // verifica periodic daca a aparut o actualizare
      setInterval(() => reg.update().catch(() => {}), 60000);
    }).catch(() => {});
  });

  // cand noua versiune preia controlul -> reincarcam o singura data
  let pwaRefreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (pwaRefreshing) return;
    pwaRefreshing = true;
    window.location.reload();
  });
}

// Pop-up "Actualizeaza" (apare cand exista o versiune noua)
function showUpdateBar(reg) {
  if (document.getElementById("pwa-update")) return;
  pwaInjectStyles();
  const bar = document.createElement("div");
  bar.id = "pwa-update";
  bar.innerHTML =
    '<span class="pwa-txt">🔔 A apărut o versiune nouă!</span>' +
    '<button class="pwa-go pwa-upd">Actualizează</button>' +
    '<button class="pwa-x" aria-label="Mai târziu">×</button>';
  document.body.appendChild(bar);
  bar.querySelector(".pwa-upd").addEventListener("click", () => {
    bar.querySelector(".pwa-upd").textContent = "Se actualizează…";
    if (reg.waiting) reg.waiting.postMessage("SKIP_WAITING");
  });
  bar.querySelector(".pwa-x").addEventListener("click", () => bar.remove());
}

// 2) Stiluri pentru banner
function pwaInjectStyles() {
  if (document.getElementById("pwa-style")) return;
  const s = document.createElement("style");
  s.id = "pwa-style";
  s.textContent = `
    #pwa-install{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:99999;
      display:flex;align-items:center;gap:10px;background:#3b63c4;color:#fff;
      padding:12px 14px 12px 18px;border-radius:999px;box-shadow:0 14px 36px -8px rgba(0,0,0,.55);
      font-family:'Segoe UI',Arial,sans-serif;font-size:14px;font-weight:600;max-width:94vw;
      animation:pwaUp .35s ease;}
    @keyframes pwaUp{from{opacity:0;transform:translate(-50%,24px)}to{opacity:1;transform:translate(-50%,0)}}
    #pwa-install img{width:26px;height:26px;border-radius:7px;}
    #pwa-install .pwa-txt{line-height:1.25;}
    #pwa-install button{border:none;cursor:pointer;font-family:inherit;font-weight:700;}
    #pwa-install .pwa-go{background:#fff;color:#3b63c4;border-radius:999px;padding:9px 18px;font-size:14px;white-space:nowrap;}
    #pwa-install .pwa-go:hover{background:#eef2ff;}
    #pwa-install .pwa-x{background:rgba(255,255,255,.22);color:#fff;width:26px;height:26px;border-radius:50%;font-size:16px;line-height:1;}

    #pwa-update{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:99999;
      display:flex;align-items:center;gap:10px;background:#1f9d57;color:#fff;
      padding:12px 14px 12px 18px;border-radius:999px;box-shadow:0 14px 36px -8px rgba(0,0,0,.55);
      font-family:'Segoe UI',Arial,sans-serif;font-size:14px;font-weight:600;max-width:94vw;
      animation:pwaUp .35s ease;}
    #pwa-update .pwa-txt{line-height:1.25;}
    #pwa-update button{border:none;cursor:pointer;font-family:inherit;font-weight:700;}
    #pwa-update .pwa-go{background:#fff;color:#1f9d57;border-radius:999px;padding:9px 18px;font-size:14px;white-space:nowrap;}
    #pwa-update .pwa-go:hover{background:#e9fbf1;}
    #pwa-update .pwa-x{background:rgba(255,255,255,.22);color:#fff;width:26px;height:26px;border-radius:50%;font-size:16px;line-height:1;}
  `;
  document.head.appendChild(s);
}

let deferredPrompt = null;

// 3) Banner cu buton (Android / Chrome / Edge - cand se poate instala)
function showInstallButton() {
  if (document.getElementById("pwa-install")) return;
  pwaInjectStyles();
  const bar = document.createElement("div");
  bar.id = "pwa-install";
  bar.innerHTML =
    '<img src="icon-192.png" alt="">' +
    '<span class="pwa-txt">Instalează aplicația<br>Nova-Star Group</span>' +
    '<button class="pwa-go">Instalează</button>' +
    '<button class="pwa-x" aria-label="Închide">×</button>';
  document.body.appendChild(bar);
  bar.querySelector(".pwa-go").addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch (e) {}
    deferredPrompt = null;
    bar.remove();
  });
  bar.querySelector(".pwa-x").addEventListener("click", () => {
    bar.remove();
    sessionStorage.setItem("pwa_dismissed", "1");
  });
}

// 4) Banner cu instructiuni (iPhone / Safari - nu suporta install automat)
function showIosHint() {
  if (document.getElementById("pwa-install")) return;
  pwaInjectStyles();
  const bar = document.createElement("div");
  bar.id = "pwa-install";
  bar.innerHTML =
    '<img src="icon-192.png" alt="">' +
    '<span class="pwa-txt">Instalează: apasă <b>Partajează</b> ⬆️<br>apoi „Adaugă pe ecranul de start"</span>' +
    '<button class="pwa-x" aria-label="Închide">×</button>';
  document.body.appendChild(bar);
  bar.querySelector(".pwa-x").addEventListener("click", () => {
    bar.remove();
    sessionStorage.setItem("pwa_dismissed", "1");
  });
}

const pwaStandalone =
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const pwaIsIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

// Android/desktop: prindem evenimentul si aratam butonul
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (!sessionStorage.getItem("pwa_dismissed")) {
    setTimeout(showInstallButton, 1200);
  }
});

// iPhone: aratam instructiunile (daca nu e deja instalata)
if (pwaIsIOS && !pwaStandalone && !sessionStorage.getItem("pwa_dismissed")) {
  window.addEventListener("load", () => setTimeout(showIosHint, 1500));
}

window.addEventListener("appinstalled", () => {
  const b = document.getElementById("pwa-install");
  if (b) b.remove();
  deferredPrompt = null;
});
