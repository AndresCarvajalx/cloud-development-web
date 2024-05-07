import { addData } from "./database.js";
import { createUserEmailPassword, sendEmail } from "./global.js";

document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.getElementById("signin-btn");
  const cc = document.getElementById("user-cc");
  const fullName = document.getElementById("user-fullname");
  const address = document.getElementById("user-address");
  const phone = document.getElementById("user-phone");
  const email = document.getElementById("user-email");
  const bornDate = document.getElementById("user-born-date");
  const password = document.getElementById("user-password");
  const passwordAlert = document.getElementById("password-alert");

  function validatePassword(e) {
    let value = e.target.value;
    if (value.length < 8) {
      passwordAlert.innerHTML = `La contraseña debe tener mas de 8 caracteres`;
    } else if (/[^a-zA-Z0-9\-\/]/.test(value)) {
      passwordAlert.innerHTML = `La contraseña no puede tener caracteres especiales`;
    } else {
      passwordAlert.innerHTML = ``;
    }
  }

  async function signIn() {
    let user = null;
    await createUserEmailPassword(email.value.trim(), password.value)
      .then((userCredential) => {
        user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

    await sendEmail(user)
      .then(() => {
        alert("Se envio un correo de verificacion");
      })
      .catch((error) => {
        alert(error);
      });

    await addData(
      user.uid,
      cc.value,
      fullName.value,
      address.value,
      phone.value,
      user.email,
      bornDate.value
    )
      .then(() => {
        alert("Los datos se guardaron en la base de datos");
      })
      .catch((e) => {
        alert("Error al guardar datos en la base de datos");
        alert(e);
      });
    window.location.href = "../index.html";
  }

  signInBtn.addEventListener("click", signIn);
  password.addEventListener("input", validatePassword);
});
