import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1PZVozE2REEdKZ3QaxwOXQ-SqnWuk96E",
  authDomain: "cloud-develoment-web.firebaseapp.com",
  projectId: "cloud-develoment-web",
  storageBucket: "cloud-develoment-web.appspot.com",
  messagingSenderId: "873738544421",
  appId: "1:873738544421:web:6c46ebf1708975834e66cc",
  measurementId: "G-JHN4LBYN5L",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const signInPopup = (provider) => signInWithPopup(auth, provider);

export const sendEmailToResetPassword = async (email) => sendPasswordResetEmail(auth, email)
export const sendEmail = async (user) => sendEmailVerification(user);
export const logOut = async () => signOut(auth);

export const signinEmailPassword = async (email, password) => signInWithEmailAndPassword(auth, email, password);


export const createUserEmailPassword = async (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = async (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginWithFacebook = async (email, password) =>createUserWithEmailAndPassword(auth, email, password);

export const onAuthChanged = (user) => onAuthStateChanged(auth, user);

export const deleteCurrentUser = async () => auth.currentUser.delete();

//export const currentUser = auth.currentUser