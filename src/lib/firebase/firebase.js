// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatify-5b839.firebaseapp.com",
  projectId: "chatify-5b839",
  storageBucket: "chatify-5b839.appspot.com",
  messagingSenderId: "429990699767",
  appId: "1:429990699767:web:b3d861ce5cc6ca67ebe9f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
export const storage = getStorage();
