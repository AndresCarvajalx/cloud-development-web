import {
  facebookProvider,
  googleProvider,
  signInPopup,
  signinEmailPassword,
} from "./global.js";

const form = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
const loginGoogleBtn = document.getElementById("google-login-btn");
const loginFacebookBtn = document.getElementById("facebook-login-btn");

async function loginWithInputs() {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;
  signinEmailPassword(email, password)
    .then((userCredential) => {
      if (userCredential.user.emailVerified) {
        window.location.replace("../templates/home.html");
      } else {
        alert("Para iniciar sesion debes de verificar el correo");
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loginBtn.addEventListener("click", loginWithInputs);
  loginGoogleBtn.addEventListener("click", () => {
    signInPopup(googleProvider).then(() => {
      window.location.replace("../templates/home.html");
    });
  });
  loginFacebookBtn.addEventListener("click", () =>
    signInPopup(googleProvider).then(() => {
      window.location.replace("../templates/home.html");
    })
  );
});
