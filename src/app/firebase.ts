// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBImiIXCkcT8WvTPshqyZ-pNd0-B0tqLvE",
  authDomain: "signer-ai.firebaseapp.com",
  projectId: "signer-ai",
  storageBucket: "signer-ai.appspot.com",
  messagingSenderId: "644854045223",
  appId: "1:644854045223:web:5fafd95c1dcd0b26f6cc02",
  measurementId: "G-JQRVC3ZZ5M"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };
