import { sendEmailToResetPassword } from "./global.js";

const resetPasswordBtn = document.getElementById("reset-password-btn");
document.addEventListener("DOMContentLoaded", () => {
  resetPasswordBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    sendEmailToResetPassword(email.trim())
      .then(() => {
        alert("Se envio un correo para poder cambiar la contraseña");
      })
      .catch((error) => {
        alert(error);
      });
  });
});
