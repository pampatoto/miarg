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

// Función para formatear DNI con puntos automáticamente
const formatearDNI = (num) => {
    return num.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const navegar = (id) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('header-inicio').style.display = (id === 'pantalla-login' ? 'flex' : 'none');
    document.getElementById('header-registro').style.display = (id === 'pantalla-registro' ? 'flex' : 'none');
    const destino = document.getElementById(id);
    if(destino) destino.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('link-ir-a-registro').addEventListener('click', (e) => {
        e.preventDefault(); navegar('pantalla-registro');
    });

    document.getElementById('btn-atras-manual').addEventListener('click', () => {
        navegar('pantalla-login');
    });

    const actualizar = () => {
        document.getElementById('txt-apellido').innerText = document.getElementById('in-apellido').value || "APELLIDO";
        document.getElementById('txt-nombre').innerText = document.getElementById('in-nombre').value || "NOMBRE";
        
        // Aplicar auto-puntos al mostrarlo en el carnet
        const dniCrudo = document.getElementById('in-dni').value;
        document.getElementById('txt-dni').innerText = formatearDNI(dniCrudo) || "00.000.000";
        
        document.getElementById('txt-nac').innerText = document.getElementById('in-nac').value || "01 ENE 2007";
        document.getElementById('txt-emi').innerText = document.getElementById('in-emi').value || "19 ENE 2021";
        document.getElementById('txt-ven').innerText = document.getElementById('in-ven').value || "19 ENE 2036";
        document.getElementById('txt-sexo').innerText = document.getElementById('in-sexo').value;
    };

    ['in-apellido', 'in-nombre', 'in-dni', 'in-nac', 'in-emi', 'in-ven', 'in-sexo'].forEach(id => {
        document.getElementById(id).addEventListener('input', actualizar);
    });

    // Resto de funciones (Foto y Firma) se mantienen igual...
    document.getElementById('btn-trigger-foto').addEventListener('click', () => document.getElementById('file-foto').click());
    document.getElementById('file-foto').addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = () => document.getElementById('dni-foto-perfil').src = reader.result;
        reader.readAsDataURL(e.target.files[0]);
    });
});
