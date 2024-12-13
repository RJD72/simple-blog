// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3d4ee.firebaseapp.com",
  projectId: "mern-blog-3d4ee",
  storageBucket: "mern-blog-3d4ee.firebasestorage.app",
  messagingSenderId: "1014764235445",
  appId: "1:1014764235445:web:8cba5415683cd5cca9acfc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
