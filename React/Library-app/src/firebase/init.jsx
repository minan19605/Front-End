// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-8nNErbZSQOC8Kgq8kQMbih0jaGWl4rI",
  authDomain: "fir-practices-29044.firebaseapp.com",
  projectId: "fir-practices-29044",
  storageBucket: "fir-practices-29044.firebasestorage.app",
  messagingSenderId: "185862851443",
  appId: "1:185862851443:web:a511e4d32600c2c53e9306",
  measurementId: "G-PBTNNH86G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
