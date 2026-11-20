const userName = document.getElementById('name');
const userApellido = document.getElementById('apellido');
const email = document.getElementById('email');
const password = document.getElementById('password');
const fechaNacimiento = document.getElementById('fecha-nacimiento');
const register = document.getElementById('register');

register.addEventListener('click', (e) => {
    e.preventDefault();
    if(userName.value === '' || userApellido.value === '' || email.value === '' || password.value === '' || fechaNacimiento.value ==='' ){
        Toastify({
            text: "Formulario incompleto. Por favor completá todos los campos.",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: { background: "#000000", color: "#ffffff" }
        }).showToast();
    }
    else {
        const usuario = {
            nombre: userName.value,
            apellido: userApellido.value,
            email: email.value,
            password: password.value,
            fechaNacimiento: fechaNacimiento.value
        };
        localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
    
        window.location.href="./login.html";
    }
});