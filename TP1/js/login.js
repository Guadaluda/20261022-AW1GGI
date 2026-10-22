let userName = document.getElementById('name')
let userApellido = document.getElementById('apellido')
let email = document.getElementById('email')
let password = document.getElementById('password')
let fechaNacimiento = document.getElementById('fecha_nacimiento')
let ingresar = document.getElementById('ingresar')

ingresar.addEventListener('click', (e) => {
    e.preventDefault();
    if(userName.value === '' || userApellido.value === '' || email.value === '' || password.value === '' || fechaNacimiento.value ==='' ){
        alert("Formulario incompleto. Por favor completá todos los campos.");
    }
    else {
        window.location.href="../index.html";
    }
})