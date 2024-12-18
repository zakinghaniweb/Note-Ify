// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlBP-7vXuI5rYbIh89EZNaCVX49aWSYrc",
  authDomain: "notes-6ebe1.firebaseapp.com",
  projectId: "notes-6ebe1",
  storageBucket: "notes-6ebe1.firebasestorage.app",
  messagingSenderId: "843760074342",
  appId: "1:843760074342:web:8de3c310da8ecd4cc6b7a7",
  measurementId: "G-0G4HL2DW95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app