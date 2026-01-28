import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

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
    document.getElementById(id).classList.add('active');
};

document.addEventListener('DOMContentLoaded', (// Dentro del DOMContentLoaded agregar:
document.getElementById('btn-seccion-documentos').addEventListener('click', () => {
    navegar('pantalla-ver-dni');
});) => {
    // 1. Navegación
    document.getElementById('link-ir-a-registro').onclick = (e) => {
        e.preventDefault();
        navegar('pantalla-registro');
    };

    // 2. Formateo DNI
    const inDni = document.getElementById('in-dni');
    inDni.oninput = (e) => {
        let val = e.target.value.replace(/\D/g, "");
        document.getElementById('txt-dni').innerText = val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // 3. Firma (Ajuste para que aparezca)
    const canvas = document.getElementById('canvas-firma');
    const ctx = canvas.getContext('2d');
    let dib = false;

    const funcEmpezar = (e) => { e.preventDefault(); dib = true; ctx.beginPath(); };
    const funcMover = (e) => {
        if (!dib) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || (e.touches ? e.touches[0].clientX : 0)) - rect.left;
        const y = (e.clientY || (e.touches ? e.touches[0].clientY : 0)) - rect.top;
        ctx.lineWidth = 2; ctx.lineTo(x, y); ctx.stroke();
    };

    canvas.addEventListener('mousedown', funcEmpezar);
    canvas.addEventListener('touchstart', funcEmpezar);
    window.addEventListener('mouseup', () => dib = false);
    window.addEventListener('touchend', () => dib = false);
    canvas.addEventListener('mousemove', funcMover);
    canvas.addEventListener('touchmove', funcMover);

    // 4. EL BOTÓN QUE NO FUNCIONABA
    document.getElementById('btn-crear-cuenta').onclick = async () => {
        const mail = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        if(!mail || !pass) return alert("Completa los datos de la cuenta");

        try {
            await createUserWithEmailAndPassword(auth, mail, pass);
            alert("¡Registrado!");
            navegar('pantalla-inicio-app');
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    // Foto
    document.getElementById('btn-trigger-foto').onclick = () => document.getElementById('file-foto').click();
    document.getElementById('file-foto').onchange = (e) => {
        const reader = new FileReader();
        reader.onload = () => document.getElementById('dni-foto-perfil').src = reader.result;
        reader.readAsDataURL(e.target.files[0]);
    };
});
