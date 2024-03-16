// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
//from "firebase/app";
//import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js'; 
//from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyD1PZVozE2REEdKZ3QaxwOXQ-SqnWuk96E",
  authDomain: "cloud-develoment-web.firebaseapp.com",
  projectId: "cloud-develoment-web",
  storageBucket: "cloud-develoment-web.appspot.com",
  messagingSenderId: "873738544421",
  appId: "1:873738544421:web:6c46ebf1708975834e66cc",
  measurementId: "G-JHN4LBYN5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const loginValidation = (email, password) => signInWithEmailAndPassword(auth, email, password).catch(() => {
  alert("Error al iniciar sesión, verifica tus datos");
});
export const signOut = () => auth.signOut();
export const getUser = () => auth.currentUser;