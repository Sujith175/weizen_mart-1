import { initializeApp } from "firebase/app"; //object allows us to attach firebase app instance
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzwF2ZOfG0wmA7IePpdDjt_n47Xg7zs2E",
  authDomain: "donaauth.firebaseapp.com",
  projectId: "donaauth",
  storageBucket: "donaauth.appspot.com",
  messagingSenderId: "381340718758",
  appId: "1:381340718758:web:41e2beb9cad4a7ac608667",
  measurementId: "G-4QWSY7S0NP",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
