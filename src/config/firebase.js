// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3k2PnmmeqycN0k9EfmDauLuJ_g_Og7Hg",
  authDomain: "project1-1666b.firebaseapp.com",
  projectId: "project1-1666b",
  storageBucket: "project1-1666b.firebasestorage.app",
  messagingSenderId: "458421374640",
  appId: "1:458421374640:web:69f1155db0f3f394a2b575",
  measurementId: "G-SR85YQQ9SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);

export { analytics, auth, fireStore };
