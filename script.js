// Importamos las herramientas de Google (Versión 12.8.0 como te dio Firebase)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Tu configuración original
const firebaseConfig = {
  apiKey: "AIzaSyDntkOBeYnBVBE0DLZ0vPkO2LrLdG-WqUQ",
  authDomain: "miarg-proyecto.firebaseapp.com",
  projectId: "miarg-proyecto",
  storageBucket: "miarg-proyecto.firebasestorage.app",
  messagingSenderId: "883813445397",
  appId: "1:883813445397:web:53f323a000aeb41695431c",
  measurementId: "G-F0L8ZJVFKX"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Hacemos las funciones visibles para los botones del HTML
window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        document.getElementById('pantalla-login').style.display = 'none';
        document.getElementById('pantalla-app').style.display = 'block';
        alert("¡Bienvenido!");
    } catch (error) {
        alert("Error: El usuario no existe o el PIN es incorrecto.");
    }
};

window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pin').value;

    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Cuenta creada con éxito. Ahora podés iniciar sesión.");
        location.reload(); // Recarga para ir al login
    } catch (error) {
        alert("No se pudo crear la cuenta: " + error.message);
    }
};
