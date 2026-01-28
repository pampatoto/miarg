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

// Lógica de colores en vivo (Rojo < 6, Verde >= 6)
const aplicarValidacion = (id, condicion) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
        if (condicion(el.value)) {
            el.style.border = "2px solid #4CAF50"; // Verde
        } else {
            el.style.border = "2px solid red"; // Rojo
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Valida email (formato básico) y contraseña (mínimo 6)
    aplicarValidacion('login-email', val => val.includes('@') && val.includes('.'));
    aplicarValidacion('login-pass', val => val.length >= 6);
    
    // También para la pantalla de registro si se carga
    if(document.getElementById('reg-email')) {
        aplicarValidacion('reg-email', val => val.includes('@') && val.includes('.'));
        aplicarValidacion('reg-pass', val => val.length >= 6);
    }
});

window.mostrarRegistro = () => { document.getElementById('pantalla-login').style.display = 'none'; document.getElementById('pantalla-registro').style.display = 'flex'; }
window.mostrarLogin = () => { document.getElementById('pantalla-registro').style.display = 'none'; document.getElementById('pantalla-login').style.display = 'flex'; }

window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    if(pass.length < 6) return alert("La contraseña debe tener al menos 6 caracteres");
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("¡Cuenta creada!");
        location.reload();
    } catch (e) { alert("Error al registrar: datos inválidos o ya existentes"); }
}

window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("¡Ingreso exitoso!");
    } catch (e) { alert("Email o contraseña incorrectos"); }
}
