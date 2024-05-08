import { getData } from "./database.js";
import {
  onAuthChanged,
  logOut,
  deleteCurrentUser,
  sendEmailToResetPassword,
} from "./global.js";
const logoutBtn = document.getElementById("logout-btn");
const deleteAccountBtn = document.getElementById("delete-account-btn");
const resetPasswordBtn = document.getElementById("reset-password-btn");
const userData = document.getElementById("user-data");

document.addEventListener("DOMContentLoaded", () => {
  let currentUser;

  onAuthChanged((user) => {
    if (!user) {
      window.location.href = "../index.html";
    } else {
      currentUser = user;
      getData(user.uid).then((e) => {
          let data = e.data();
          userData.innerHTML = 
          `
            <h3>Cedula:</h3> ${data["cc"]} 
            <h3>Nombre:</h3> ${data["fullName"]} 
            <h3>Direccion:</h3> ${data["address"]} 
            <h3>Telefono:</h3> ${data["phone"]} 
            <h3>Correo:</h3> ${data["email"]} 
            <h3>Fecha De Naciemiento:</h3> ${data["bornDate"]} 
          `
      }).catch((e)=> {
        window.location.href = "./register-userdata.html";
      });
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
