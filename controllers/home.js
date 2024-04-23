import {
  onAuthChanged,
  logOut,
  deleteCurrentUser,
  sendEmailToResetPassword,
} from "./global.js";

const logoutBtn = document.getElementById("logout-btn");
const deleteAccountBtn = document.getElementById("delete-account-btn");
const resetPasswordBtn = document.getElementById("reset-password-btn");
let currentUser;

document.addEventListener("DOMContentLoaded", () => {
  onAuthChanged((user) => {
    if (!user) {
      window.location.href = "../index.html";
    } else {
      currentUser = user;
    }
  });

  logoutBtn.addEventListener("click", logOut);
  deleteAccountBtn.addEventListener("click", deleteCurrentUser);
  resetPasswordBtn.addEventListener("click", () => {
    console.log(currentUser);
    sendEmailToResetPassword(currentUser.email).then(() => {
      alert("Se envio un correo para poder cambiar la contraseña");
    });
  });
});
