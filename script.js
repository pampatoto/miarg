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

// FUNCIÓN DE NAVEGACIÓN REFORZADA
const navegar = (id) => {
    console.log("Navegando a: " + id);
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    
    const headerInicio = document.getElementById('header-inicio');
    const headerRegistro = document.getElementById('header-registro');
    
    if(id === 'pantalla-login') {
        headerInicio.style.display = 'flex';
        headerRegistro.style.display = 'none';
    } else {
        headerInicio.style.display = 'none';
        headerRegistro.style.display = 'flex';
    }
    
    const destino = document.getElementById(id);
    if(destino) destino.classList.add('active');
};

// ASIGNACIÓN MANUAL DE BOTONES (Garantiza que funcione en cel)
document.addEventListener('DOMContentLoaded', () => {
    
    // Botón ir a Registro
    document.getElementById('link-ir-a-registro').addEventListener('click', (e) => {
        e.preventDefault();
        navegar('pantalla-registro');
    });

    // Botón volver a Login
    document.getElementById('btn-atras-manual').addEventListener('click', () => {
        navegar('pantalla-login');
    });

    // Actualización de datos en vivo
    const inputs = ['in-apellido', 'in-nombre', 'in-dni', 'in-nac', 'in-emi', 'in-sexo'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            document.getElementById('txt-apellido').innerText = document.getElementById('in-apellido').value || "APELLIDO";
            document.getElementById('txt-nombre').innerText = document.getElementById('in-nombre').value || "NOMBRE";
            document.getElementById('txt-dni').innerText = document.getElementById('in-dni').value || "00.000.000";
            document.getElementById('txt-nac').innerText = document.getElementById('in-nac').value || "01 ENE 2007";
            document.getElementById('txt-emi').innerText = document.getElementById('in-emi').value || "19 ENE 2021";
            document.getElementById('txt-sexo').innerText = document.getElementById('in-sexo').value;
        });
    });

    // Manejo de Foto
    document.getElementById('btn-trigger-foto').addEventListener('click', () => {
        document.getElementById('file-foto').click();
    });

    document.getElementById('file-foto').addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = () => document.getElementById('dni-foto-perfil').src = reader.result;
        reader.readAsDataURL(e.target.files[0]);
    });

    // Firma (Canvas)
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

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('touchstart', start);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', draw);

    document.getElementById('btn-limpiar-firma').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('img-firma-preview').src = "";
    });
});
