import { loginValidation } from "../controller/global.js";

const btnLogin = document.getElementById('login-btn');

const validate_inputs = (email, password) => {
    if (email === '' || password === '') {
        alert('Por favor llena todos los campos, no se permiten espacios en blanco');
        return false;
    }
    return true;
}

async function validate() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const validation = validate_inputs(email.trim(), password.trim()) ? loginValidation(email, password) : null;
    var res = await validation;
    if (res != null) {
        window.location.href = './templates/home.html'
    }
    else {
        alert('Error authentication not successful')
        console.log('sesion ' + email + ' no validation')
    }
}

window.addEventListener('DOMContentLoaded', () => {
    btnLogin.addEventListener('click', validate);
});
