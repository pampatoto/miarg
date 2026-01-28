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

// VALIDACIÓN EN VIVO
const validarInput = (input, condicion) => {
    input.addEventListener('input', () => {
        if (condicion(input.value)) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    });
};

// Reglas: Email debe tener @ y . | Contraseña min 4
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
document.querySelectorAll('input[type="email"]').forEach(i => validarInput(i, val => emailRegex.test(val)));
document.querySelectorAll('input[type="password"]').forEach(i => validarInput(i, val => val.length >= 4));

window.mostrarRegistro = () => { document.getElementById('pantalla-login').style.display = 'none'; document.getElementById('pantalla-registro').style.display = 'flex'; }
window.mostrarLogin = () => { document.getElementById('pantalla-registro').style.display = 'none'; document.getElementById('pantalla-login').style.display = 'flex'; }

window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    if(pass.length < 4) return alert("La contraseña debe tener al menos 4 caracteres");
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("¡Cuenta creada!");
        location.reload();
    } catch (e) { alert("Error: Datos inválidos"); }
}

window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Entraste!");
    } catch (e) { alert("Email o contraseña incorrectos"); }
}
