// ============================================================
// nova-auth.js — "creierul" comun de autentificare
// Se include pe TOATE paginile (ca modul).
// Ce face:
//   1. urmareste cine e logat;
//   2. schimba linkul din bara: Conectare <-> Deconectare (+ salut);
//   3. blocheaza butoanele de descarcat daca nu esti logat.
// ============================================================
import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Tinem minte cine e logat acum (null = nimeni)
let currentUser = null;

// Se declanseaza automat la incarcare si la fiecare login/logout
onAuthStateChanged(auth, (user) => {
    currentUser = user;

    const link = document.getElementById("auth-link");
    if (!link) return;

    if (user) {
        // numele afisat: numele din Google daca exista, altfel partea dinaintea lui @
        const nume = user.displayName || (user.email ? user.email.split("@")[0] : "cont");

        if (user.photoURL) {
            // are poza (cont Google) -> aratam poza rotunda + "Ieși"
            link.innerHTML =
                '<img class="nav-avatar" src="' + user.photoURL + '" alt="" referrerpolicy="no-referrer"> Ieși';
        } else {
            // fara poza (email/parola) -> cerc cu prima litera din nume
            const initiala = nume.charAt(0).toUpperCase();
            link.innerHTML =
                '<span class="nav-avatar nav-avatar-litera">' + initiala + '</span> Ieși';
        }

        link.title = nume;          // numele apare cand stai cu mouse-ul pe poza
        link.href = "#";
        link.onclick = (e) => {
            e.preventDefault();
            signOut(auth);
        };
    } else {
        link.textContent = "Conectare";
        link.href = "login.html";
        link.onclick = null;
    }
});

// Blocheaza descarcarea daca nu esti logat
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".download-btn");
    if (!btn) return;

    if (!currentUser) {
        e.preventDefault();
        alert("Trebuie să ai cont pentru a descărca jocurile. Te ducem la pagina de conectare.");
        window.location.href = "login.html";
    }
});
