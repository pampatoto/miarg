import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDntkOBeYnBVBE0DLZ0vPkO2LrLdG-WqUQ",
  authDomain: "miarg-proyecto.firebaseapp.com",
  projectId: "miarg-proyecto",
  storageBucket: "miarg-proyecto.firebasestorage.app",
  messagingSenderId: "883813445397",
  appId: "1:883813445397:web:53f323a000aeb41695431c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// VALIDACIÓN ROJO/VERDE
const validar = (id, condicion) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
        el.style.border = condicion(el.value) ? "2px solid #4CAF50" : "2px solid red";
    });
};

document.addEventListener('DOMContentLoaded', () => {
    validar('login-email', val => val.includes('@') && val.includes('.'));
    validar('login-pass', val => val.length >= 6);
    if(document.getElementById('reg-email')) {
        validar('reg-email', val => val.includes('@') && val.includes('.'));
        validar('reg-pass', val => val.length >= 6);
    }
});

window.mostrarRegistro = () => {
    document.getElementById('pantalla-login').style.display = 'none';
    document.getElementById('pantalla-registro').style.display = 'flex';
}

window.mostrarLogin = () => {
    document.getElementById('pantalla-registro').style.display = 'none';
    document.getElementById('pantalla-login').style.display = 'flex';
}

window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    if(pass.length < 6) return alert("Mínimo 6 caracteres");
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("¡Cuenta creada!");
        location.reload();
    } catch (e) { alert("Error al registrar"); }
}

window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("¡Ingreso exitoso!");
    } catch (e) { alert("Datos incorrectos"); }
}
