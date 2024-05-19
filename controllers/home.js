import { getData, getDataAsAdmin, deleteDocument } from "./database.js";
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
const content = document.getElementById("content");

document.addEventListener("DOMContentLoaded", () => {
  let currentUser;

  onAuthChanged((user) => {
    if (!user) {
      window.location.href = "../index.html";
    } else {
      currentUser = user;
      getData(user.uid)
        .then((e) => {
          let data = e.data();
          let rol = data["rol"];
          userData.innerHTML = `
            <h3>Cedula:</h3> ${data["cc"]} 
            <h3>Rol:</h3> ${data["rol"]} 
            <h3>Nombre:</h3> ${data["fullName"]} 
            <h3>Direccion:</h3> ${data["address"]} 
            <h3>Telefono:</h3> ${data["phone"]} 
            <h3>Correo:</h3> ${data["email"]} 
            <h3>Fecha De Naciemiento:</h3> ${data["bornDate"]} 
          `;
          if (rol === "admin") {
            userData.innerHTML += `<br><button type="button" class="button bg-black w-20" id="create-account-btn">Crear Usuario</button>`;
            const createAccountBtn =
              document.getElementById("create-account-btn");
            createAccountBtn.addEventListener("click", () => {
              window.location.href = "/signup.html";
            });
            getDataAsAdmin().then((userData) => {
              let tableHTML = `
              <h1>Usuarios Registrados</h1>
              <table id="reg-users">
                <tr>
                  <th>Nombre</th>
                  <th>Cedula</th>
                  <th>Celular</th>
                  <th>Rol</th>
                  <th></th>
                </tr>
            `;
              userData.forEach((doc) => {
                let docData = doc.data();
                console.log(docData);
                tableHTML += `
                <tr>
                  <td>${docData["fullName"]}</td>
                  <td>${docData["cc"]}</td>
                  <td>${docData["phone"]}</td>
                  <td>${docData["rol"]}</td>
                  <td><button type="button" class="delete-btn button bg-red txt-white w-20" data-id="${docData["id"]}"">Eliminar</button></td>
                </tr>`;
              });
              tableHTML += `</table>`;
              content.innerHTML += tableHTML;
            });
          }
        })
        .catch((e) => {
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

  content.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;
      if(id === currentUser.uid) {
        alert("Esa es tu cuenta, para borrarla debes darle al boton de eliminar cuenta que sale al comienzo de la pagina");
        return;
      }
      deleteDocument(id).then(() => {
        const rowToRemove = content
          .querySelector(`[data-id="${id}"]`)
          .closest("tr");
        rowToRemove.remove();
      });
    }
  });
});
