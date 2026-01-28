function mostrarRegistro() {
    document.getElementById('pantalla-login').style.display = 'none';
    document.getElementById('pantalla-registro').style.display = 'flex';
}

function crearCuenta() {
    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const pin = document.getElementById('reg-pin').value;

    if(nombre && email && pin) {
        localStorage.setItem('usuario_registrado', email);
        localStorage.setItem('pin_seguridad', pin);
        localStorage.setItem('user_nombre', nombre);
        alert("Cuenta creada. Ahora inicia sesión.");
        location.reload();
    } else {
        alert("Completa todos los datos");
    }
}

function intentarEntrar() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    
    const emailGuardado = localStorage.getItem('usuario_registrado');
    const pinGuardado = localStorage.getItem('pin_seguridad');

    if (email === emailGuardado && pass === pinGuardado) {
        document.getElementById('pantalla-login').style.display = 'none';
        document.getElementById('pantalla-app').style.display = 'block';
    } else {
        alert("Email o contraseña (PIN) incorrectos");
    }
}
