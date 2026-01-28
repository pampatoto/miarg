import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDntkOBeYnBVBE0DLZ0vPkO2LrLdG-WqUQ",
  authDomain: "miarg-proyecto.firebaseapp.com",
  projectId: "miarg-proyecto",
  storageBucket: "miarg-proyecto.firebasestorage.app",
  messagingSenderId: "883813445397",
  appId: "1:883813445397:web:53f323a000aeb41695431c",
  measurementId: "G-F0L8ZJVFKX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// FUNCIONES PARA CAMBIAR DE PÁGINA (CAPAS)
window.mostrarRegistro = function() {
    document.getElementById('pantalla-login').style.display = 'none';
    document.getElementById('pantalla-registro').style.display = 'flex';
}

window.mostrarLogin = function() {
    document.getElementById('pantalla-registro').style.display = 'none';
    document.getElementById('pantalla-login').style.display = 'flex';
}

// LÓGICA DE REGISTRO
window.crearCuenta = async function() {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pin').value;

    if(pass.length < 6) {
        alert("Google exige que el PIN sea de al menos 6 números.");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("¡Cuenta creada! Ahora logueate.");
        window.mostrarLogin();
    } catch (e) {
        alert("Error al registrar: " + e.message);
    }
}

// LÓGICA DE ENTRAR
window.intentarEntrar = async function() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        document.getElementById('pantalla-login').style.display = 'none';
        document.getElementById('pantalla-app').style.display = 'block';
    } catch (e) {
        alert("Email o PIN incorrectos.");
    }
}

// LÓGICA DE FOTO
const inputFoto = document.getElementById('input-foto');
if(inputFoto) {
    inputFoto.addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => document.getElementById('foto-mostrada').src = reader.result;
        reader.readAsAsDataURL(e.target.files[0]);
    });
}
