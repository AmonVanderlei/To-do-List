// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU2sZ7AnKKfKr8XE75rldB_4DhEamVLb4",
  authDomain: "habit-maker-fa27d.firebaseapp.com",
  projectId: "habit-maker-fa27d",
  storageBucket: "habit-maker-fa27d.firebasestorage.app",
  messagingSenderId: "727078660347",
  appId: "1:727078660347:web:fb4cc91359791017fca85e",
  measurementId: "G-662KXB1PFE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
