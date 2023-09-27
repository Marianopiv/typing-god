/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuuJNWpj6c4dVMewmLvggLOPSi4ZhU76U",
  authDomain: "typing-god.firebaseapp.com",
  projectId: "typing-god",
  storageBucket: "typing-god.appspot.com",
  messagingSenderId: "639868059919",
  appId: "1:639868059919:web:0972a5a090b01ef9e57e7a",
  measurementId: "G-W01R6TQLCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
