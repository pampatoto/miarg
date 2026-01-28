import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDntkOBeYnBVBE0DLZ0vPkO2LrLdG-WqUQ",
  authDomain: "miarg-proyecto.firebaseapp.com",
  projectId: "miarg-proyecto",
  storageBucket: "miarg-proyecto.firebasestorage.app",
  messagingSenderId: "883813445397",
  appId: "1:883813445397:web:53f323a000aeb41695431c",
  measurementId: "G-F0L8ZJVFKX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// FUNCIONES DE NAVEGACIÓN
window.mostrarRegistro = () => {
    document.getElementById('pantalla-login').style.display = 'none';
    document.getElementById('pantalla-registro').style.display = 'flex';
}

window.mostrarLogin = () => {
    document.getElementById('pantalla-registro').style.display = 'none';
    document.getElementById('pantalla-login').style.display = 'flex';
}

// LÓGICA DE FIREBASE
window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pin').value;
    const nombre = document.getElementById('reg-nombre').value;

    if(pass.length < 6) {
        alert("El PIN debe tener al menos 6 números por seguridad de Google.");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("¡Cuenta creada para " + nombre + "! Ahora inicia sesión.");
        mostrarLogin();
    } catch (error) {
        alert("Error: " + error.message);
    }
};

window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        document.getElementById('pantalla-login').style.display = 'none';
        document.getElementById('pantalla-app').style.display = 'block';
    } catch (error) {
        alert("Correo o PIN incorrectos.");
    }
};

// MANEJO DE FOTO
document.getElementById('input-foto').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('foto-mostrada').src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});
