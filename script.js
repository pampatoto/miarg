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

const navegar = (id) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('header-inicio').style.display = id === 'pantalla-login' ? 'flex' : 'none';
    document.getElementById('header-registro').style.display = id === 'pantalla-registro' ? 'flex' : 'none';
    setTimeout(() => document.getElementById(id).classList.add('active'), 50);
};

window.irARegistro = () => navegar('pantalla-registro');
window.irALogin = () => navegar('pantalla-login');

window.actualizar = () => {
    document.getElementById('txt-apellido').innerText = document.getElementById('in-apellido').value || "APELLIDO";
    document.getElementById('txt-nombre').innerText = document.getElementById('in-nombre').value || "NOMBRE";
    document.getElementById('txt-dni').innerText = document.getElementById('in-dni').value || "00.000.000";
    document.getElementById('txt-nac').innerText = document.getElementById('in-nac').value || "01 ENE 2007";
    document.getElementById('txt-emi').innerText = document.getElementById('in-emi').value || "19 ENE 2021";
    document.getElementById('txt-sexo').innerText = document.getElementById('in-sexo').value;
};

window.cargarFoto = (e) => {
    const reader = new FileReader();
    reader.onload = () => document.getElementById('dni-foto-perfil').src = reader.result;
    reader.readAsDataURL(e.target.files[0]);
};

const canvas = document.getElementById('canvas-firma');
const ctx = canvas.getContext('2d');
let dib = false;
const start = (e) => { e.preventDefault(); dib = true; draw(e); };
const stop = () => { dib = false; ctx.beginPath(); document.getElementById('img-firma-preview').src = canvas.toDataURL(); };
const draw = (e) => {
    if (!dib) return;
    ctx.lineWidth = 2; ctx.strokeStyle = '#000';
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches ? e.touches[0].clientX : 0)) - rect.left;
    const y = (e.clientY || (e.touches ? e.touches[0].clientY : 0)) - rect.top;
    ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y);
};
canvas.addEventListener('mousedown', start); canvas.addEventListener('touchstart', start);
window.addEventListener('mouseup', stop); window.addEventListener('touchend', stop);
canvas.addEventListener('mousemove', draw); canvas.addEventListener('touchmove', draw);

window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("¡Registro exitoso!");
        navegar('pantalla-home');
    } catch (e) { alert("Error al registrar"); }
};

window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        navegar('pantalla-home');
    } catch (e) { alert("Datos incorrectos"); }
};
