import {
  getData,
  getDataAsAdmin,
  deleteDocument,
  updateData,
  searchUserByCedula,
} from "./database.js";
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
            userData.innerHTML += `
              <br><button type="button" class="button bg-black w-20" id="create-account-btn">Crear Usuario</button>
              <br>
              <div class="input-group flex-nowrap">
                <input type="text" id="user-cedula-input" class="form-control" placeholder="Cedula de usuario" aria-label="Cedula de usuario" aria-describedby="addon-wrapping">
                <button type="button" id="search-user" class="btn btn-secondary">Buscar Usuario</button>
              </div>
            `;

            const createAccountBtn =
              document.getElementById("create-account-btn");

            createAccountBtn.addEventListener("click", () => {
              window.location.href = "./signup.html";
            });

            document
              .getElementById("search-user")
              .addEventListener("click", async () => {
                const cc =
                  document.getElementById("user-cedula-input").value;
                const userDoc = await searchUserByCedula(cc);
                if (userDoc.exists) {
                  displaySearchedUser(userDoc.data());
                } else {
                  alert("Usuario no encontrado");
                }
              });

            function displaySearchedUser(userData) {
              const searchSection = document.getElementById("search-section");
              let tableHTML = `
                <h1>Usuario Encontrado</h1>
                <table id="searched-user">
                  <tr>
                    <th>Nombre</th>
                    <th>Cedula</th>
                    <th>Celular</th>
                    <th>Rol</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>${userData.fullName}</td>
                    <td>${userData.cc}</td>
                    <td>${userData.phone}</td>
                    <td>${userData.rol}</td>
                    <td>
                      <button type="button" class="delete-btn button bg-red txt-white w-20" data-id="${userData.id}">Eliminar</button>
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${userData.id}">Actualizar</button>
                    </td>
                  </tr>
                </table>
              `;
              searchSection.innerHTML += tableHTML;
            }

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
                    <td>
                      <button type="button" class="delete-btn button bg-red txt-white w-20" data-id="${docData["id"]}">Eliminar</button>
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${docData["id"]}">Actualizar</button>
                    </td>
                  </tr>`;
              });
              tableHTML += `</table>`;
              content.innerHTML += tableHTML;
            });

            const exampleModal = document.getElementById("exampleModal");
            if (exampleModal) {
              exampleModal.addEventListener("show.bs.modal", async (event) => {
                const button = event.relatedTarget;
                const userId = button.getAttribute("data-bs-whatever");
                const modalTitle = exampleModal.querySelector(".modal-title");
                const saveDataBtn = document.getElementById("save-data-btn");
                const userName = document.getElementById("name-text");
                const cc = document.getElementById("cc-text");
                const address = document.getElementById("address-text");
                const phone = document.getElementById("phone-text");
                const email = document.getElementById("email-text");
                const bornDate = document.getElementById("born-date-text");

                const modalBodyInput =
                  exampleModal.querySelector(".modal-body input");
                await getData(userId).then((d) => {
                  const userD = d.data();
                  userName.value = userD.fullName;
                  cc.value = userD.cc;
                  address.value = userD.address;
                  phone.value = userD.phone;
                  email.value = userD.email;
                  bornDate.value = userD.bornDate;
                  modalTitle.textContent = `Editar a ${userName.value}`;

                  saveDataBtn.addEventListener("click", async () => {
                    await updateData(
                      userId,
                      userD.rol,
                      cc.value,
                      userName.value,
                      address.value,
                      phone.value,
                      email.value,
                      bornDate.value
                    ).then(() => {
                      alert("Se actualizaron los datos");
                      window.location.reload();
                    });
                  });
                });
              });
            }
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
      if (id === currentUser.uid) {
        alert(
          "Esa es tu cuenta, para borrarla debes darle al boton de eliminar cuenta que sale al comienzo de la pagina"
        );
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
