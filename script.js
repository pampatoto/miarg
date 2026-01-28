import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

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
const db = getFirestore(app);

window.mostrarRegistro = () => { document.getElementById('pantalla-login').style.display = 'none'; document.getElementById('pantalla-registro').style.display = 'flex'; }
window.mostrarLogin = () => { document.getElementById('pantalla-registro').style.display = 'none'; document.getElementById('pantalla-login').style.display = 'flex'; }

// REGISTRAR USUARIO Y GUARDAR DATOS DNI EN LA NUBE
window.crearCuenta = async () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pin').value;
    const nombre = document.getElementById('reg-nombre').value;
    const dni = document.getElementById('reg-dni').value;
    const cuil = document.getElementById('reg-cuil').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        // Guardar perfil en Firestore vinculado al usuario
        await setDoc(doc(db, "usuarios", user.uid), {
            nombre: nombre,
            dni: dni,
            cuil: cuil
        });

        alert("¡Cuenta y DNI creados con éxito!");
        location.reload();
    } catch (e) { alert("Error: " + e.message); }
}

// INICIAR SESIÓN Y CARGAR DNI DESDE LA NUBE
window.intentarEntrar = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        // Cargar datos desde Firestore
        const docSnap = await getDoc(doc(db, "usuarios", user.uid));
        if (docSnap.exists()) {
            document.getElementById('ver-nombre').innerText = docSnap.data().nombre;
            document.getElementById('ver-dni').innerText = docSnap.data().dni;
            document.getElementById('ver-cuil').innerText = docSnap.data().cuil;
        }

        document.getElementById('pantalla-login').style.display = 'none';
        document.getElementById('pantalla-app').style.display = 'block';
    } catch (e) { alert("PIN o Email incorrecto"); }
}

// MANEJO DE IMAGEN (Local por ahora)
document.getElementById('input-foto').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById('foto-mostrada').src = reader.result;
    reader.readAsDataURL(e.target.files[0]);
});
