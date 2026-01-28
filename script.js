import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Configuración de tu Firebase
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

// --- UTILIDADES ---

// Función para cambiar de pantalla sin scroll
const navegar = (id) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const destino = document.getElementById(id);
    if (destino) destino.classList.add('active');
};

// Función para poner puntos al DNI automáticamente (Inspección: image_7acb61.png)
const formatearDNI = (val) => {
    return val.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// --- LÓGICA PRINCIPAL ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navegación inicial
    document.getElementById('link-ir-a-registro').addEventListener('click', (e) => {
        e.preventDefault();
        navegar('pantalla-registro');
    });

    // 2. Actualización de datos en vivo (DNI con puntos)
    document.getElementById('in-dni').addEventListener('input', (e) => {
        const conPuntos = formatearDNI(e.target.value);
        document.getElementById('txt-dni').innerText = conPuntos || "00.000.000";
    });

    document.getElementById('in-apellido').addEventListener('input', (e) => {
        document.getElementById('txt-apellido').innerText = e.target.value.toUpperCase() || "APELLIDO";
    });

    document.getElementById('in-nombre').addEventListener('input', (e) => {
        document.getElementById('txt-nombre').innerText = e.target.value.toUpperCase() || "NOMBRE";
    });

    // 3. Manejo de Foto de Perfil
    document.getElementById('btn-trigger-foto').addEventListener('click', () => {
        document.getElementById('file-foto').click();
    });

    document.getElementById('file-foto').addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('dni-foto-perfil').src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // 4. Firma en recuadro pequeño (Inspección: image_87fe60.png)
    const canvas = document.getElementById('canvas-firma');
    const ctx = canvas.getContext('2d');
    let dibujando = false;

    const obtenerPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX || (e.touches ? e.touches[0].clientX : 0)) - rect.left,
            y: (e.clientY || (e.touches ? e.touches[0].clientY : 0)) - rect.top
        };
    };

    const empezar = (e) => { e.preventDefault(); dibujando = true; ctx.beginPath(); };
    const terminar = () => { dibujando = false; };
    const mover = (e) => {
        if (!dibujando) return;
        const p = obtenerPos(e);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    };

    canvas.addEventListener('mousedown', empezar);
    canvas.addEventListener('touchstart', empezar);
    window.addEventListener('mouseup', terminar);
    window.addEventListener('touchend', terminar);
    canvas.addEventListener('mousemove', mover);
    canvas.addEventListener('touchmove', mover);

    document.getElementById('btn-limpiar-firma').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // 5. REGISTRO Y SALTO AL MENÚ PRINCIPAL
    document.getElementById('btn-crear-cuenta').addEventListener('click', async () => {
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        if (!email || !pass) {
            alert("Por favor completa email y contraseña");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, pass);
            
            // Pasamos los datos cargados a la pantalla de Inicio de la App
            document.getElementById('final-apellido').innerText = document.getElementById('in-apellido').value.toUpperCase();
            document.getElementById('final-nombre').innerText = document.getElementById('in-nombre').value.toUpperCase();
            document.getElementById('final-dni').innerText = formatearDNI(document.getElementById('in-dni').value);
            document.getElementById('final-foto').src = document.getElementById('dni-foto-perfil').src;

            alert("¡Registro Exitoso!");
            navegar('pantalla-inicio-app'); // Salto directo al Menú
            
        } catch (error) {
            alert("Error al registrar: " + error.message);
        }
    });

    // 6. Login Manual
    document.getElementById('btn-login-manual').addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            navegar('pantalla-inicio-app');
        } catch (error) {
            alert("Credenciales incorrectas");
        }
    });
});
