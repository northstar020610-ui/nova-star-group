// Configurarea Firebase pentru Nova-Star Group
// (cheia "web API key" NU e secreta - e normal sa stea in cod)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDvwXsSLtUNKSkgu60uZ_rQI1MCPvrWhF4",
    authDomain: "nova-sta.firebaseapp.com",
    projectId: "nova-sta",
    storageBucket: "nova-sta.firebasestorage.app",
    messagingSenderId: "451957440799",
    appId: "1:451957440799:web:2a843b70ab4a870b5a702a",
    measurementId: "G-CD4FYVLM5E"
};

const app = initializeApp(firebaseConfig);

// auth = "biroul de carduri de acces" - il folosim peste tot
export const auth = getAuth(app);
