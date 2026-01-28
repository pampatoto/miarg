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

// NAVEGACIÓN Y HEADER
const navegarA = (idPantalla) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('header-inicio').style.display = idPantalla === 'pantalla-login' ? 'flex' : 'none';
    document.getElementById('header-registro').style.display = idPantalla === 'pantalla-registro' ? 'flex' : 'none';
    setTimeout(() => document.getElementById(idPantalla).classList.add('active'), 50);
};

window.irARegistro = () => navegarA('pantalla-registro');
window.irALogin = () => navegarA('pantalla-login');

// EDICIÓN EN VIVO DNI
window.actualizarDNI = () => {
    document.getElementById('prev-apellido').innerText = document.getElementById('reg-apellido').value || "APELLIDO";
    document.getElementById('prev-nombre').innerText = document.getElementById('reg-nombre').value || "NOMBRE";
    document.getElementById('prev-dni').innerText = document.getElementById('reg-dni').value || "00.000.000";
};

window.cargarFoto = (event) => {
    const reader = new FileReader();
    reader.onload = () => document.getElementById('dni-preview-foto').src = reader.result;
    reader.readAsDataURL(event.target.files[0]);
};

// LIENZO DE FIRMA
const canvas = document.getElementById('canvas-firma');
const ctx = canvas.getContext('2d');
let dibujando = false;

canvas.addEventListener('mousedown', () => dibujando = true);
window.addEventListener('mouseup', () => { dibujando = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', (e) => {
    if (!dibujando) return;
    ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.strokeStyle = '#000';
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
});

window.limpiarFirma = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

// REGISTRO CON VALIDACIÓN
window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const passConf = document.getElementById('reg-pass-conf').value;

    if (pass !== passConf) return alert("Las contraseñas no coinciden");
    if (pass.length < 6) return alert("Mínimo 6 caracteres");

    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("¡Cuenta y DNI guardados!");
        navegarA('pantalla-home');
    } catch (e) { alert("Error: " + e.message); }
};

window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        navegarA('pantalla-home');
    } catch (e) { alert("Datos incorrectos"); }
};
