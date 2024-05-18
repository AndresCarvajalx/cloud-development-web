import { app } from "./global.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const db = getFirestore(app);
export const addData = async (id, cc, fullName, address, phone, email, bornDate) =>
  await setDoc(doc(collection(db, "users"), id), {
    id: id,
    rol: "user",
    cc: cc,
    fullName: fullName, 
    address: address, 
    phone: phone, 
    email: email,
    bornDate: bornDate
  });

export const getData = async (id) => await getDoc(doc(db, "users", id));
export const getDataAsAdmin = async () => await getDocs(query(collection(db, "users")));  
export const deleteDocument = async (id) => await deleteDoc(doc(db, "users", id));
