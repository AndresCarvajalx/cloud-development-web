import { signOut, auth, URL } from "./global.js";
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

const btnLogout = document.getElementById('logout-btn');
const userEmail = document.getElementById('user-email');

function logout() {
    signOut();
    window.location.href = URL + 'index.html';
}

window.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email);
            userEmail.innerHTML = user.email;
            btnLogout.addEventListener('click', logout);
        } else {
            window.location.href = URL + 'index.html';
        }
    });
    btnLogout.addEventListener('click', logout);
});