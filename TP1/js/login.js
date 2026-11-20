const email = document.getElementById('email-login')
const password = document.getElementById('password-login')
const ingresar = document.getElementById('login')

ingresar.addEventListener('click', (e) => {
    e.preventDefault();
    if(email.value === '' || password.value === ''){
        Toastify({
            text: "Formulario incompleto. Por favor completá todos los campos.",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: { background: "#000000", color: "#ffffff" }
        }).showToast();
    }
    else {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));
        if (usuarioGuardado && usuarioGuardado.email === email.value && usuarioGuardado.password === password.value) {
            sessionStorage.setItem("sesionActiva", JSON.stringify({
                nombre: usuarioGuardado.nombre,
                email: usuarioGuardado.email
            }));
            window.location.href = "../index.html";
        } else {
            Toastify({
                text: "Correo o contraseña incorrectos. Por favor revisá los datos.",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: { background: "#000000", color: "#ffffff" }
        }).showToast();
        }
    }
});