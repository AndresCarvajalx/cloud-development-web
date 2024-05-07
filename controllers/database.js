import { app } from "./global.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const db = getFirestore(app);
export const addData = async (id, cc, fullName, address, phone, email, bornDate) =>
  await setDoc(doc(collection(db, "users"), id), {
    id: id,
    cc: cc,
    fullName: fullName, 
    address: address, 
    phone: phone, 
    email: email,
    bornDate: bornDate
  });

export const getData = async (id) => await getDoc(doc(db, "users", id));
