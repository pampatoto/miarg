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

// FUNCIÓN PARA CAMBIAR DE PANTALLA CON TRANSICIÓN
const navegarA = (idPantalla) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    setTimeout(() => {
        document.getElementById(idPantalla).classList.add('active');
    }, 50);
};

// VALIDACIÓN VISUAL
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
});

// NAVEGACIÓN GLOBAL
window.irARegistro = () => navegarA('pantalla-registro');
window.irALogin = () => navegarA('pantalla-login');

window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    if(pass.length < 6) return alert("Contraseña mínima 6 caracteres");
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Cuenta creada!");
        irALogin();
    } catch (e) { alert("Error al registrar"); }
};

window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        // Aquí ocurre la magia: si entra, cambia a la home
        navegarA('pantalla-home');
    } catch (e) { alert("Datos incorrectos"); }
};
