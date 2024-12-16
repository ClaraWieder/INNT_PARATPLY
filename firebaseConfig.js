// Importér de nødvendige Firebase funktioner
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Authentication
import { getFirestore } from "firebase/firestore" // Firestore Database

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYWJAIWNMDGXzshPi9zLZcEt_ynb4QkzM",
  authDomain: "innt-paratply.firebaseapp.com",
  projectId: "innt-paratply",
  storageBucket: "innt-paratply.firebasestorage.app",
  messagingSenderId: "515540427091",
  appId: "1:515540427091:web:f55cf2a776b988da8381a6"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firebase Authentication og Firestore Database
export const auth = getAuth(app); // Eksporter auth for brug i authentication
export const db = getFirestore(app); // Eksporter db for brug i Firestore

export default app;