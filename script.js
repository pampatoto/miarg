function verificarPin() {
    const pin = document.getElementById('pin-input').value;
    if (pin === "1234") { 
        document.getElementById('pantalla-pin').style.display = 'none';
        document.getElementById('pantalla-app').style.display = 'flex';
        cargarDatos();
    } else {
        alert("PIN incorrecto. Usá 1234");
    }
}

document.getElementById('input-foto').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('foto-perfil').src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

function guardarLocal() {
    const nombre = document.getElementById('campo-nombre').innerText;
    const profesion = document.getElementById('campo-profesion').innerText;
    const foto = document.getElementById('foto-perfil').src;

    localStorage.setItem('user_nombre', nombre);
    localStorage.setItem('user_profesion', profesion);
    localStorage.setItem('user_foto', foto);

    alert("¡Guardado en tu iPhone!");
}

function cargarDatos() {
    if(localStorage.getItem('user_nombre')) {
        document.getElementById('campo-nombre').innerText = localStorage.getItem('user_nombre');
        document.getElementById('campo-profesion').innerText = localStorage.getItem('user_profesion');
        document.getElementById('foto-perfil').src = localStorage.getItem('user_foto');
    }
}

function cerrarSesion() {
    location.reload();
}
