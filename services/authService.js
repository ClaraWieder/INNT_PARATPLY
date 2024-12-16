import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


// Opretter en ny bruger med email og password via Firebase Authentication
export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user); // Logger den oprettede bruger
        return userCredential.user; // Returnerer brugeroplysninger
    } catch (error) {
        console.error("Sign up error:", error.message); // Logger fejlbeskeden
        throw error; // Sender fejlen videre
    }
};

// Logger en eksisterende bruger ind med email og password
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user); // Logger brugeroplysninger efter login
        return userCredential.user; // Returnerer brugeroplysninger
    } catch (error) {
        console.error("Sign in error:", error.message); // Logger fejlbeskeden
        throw error; // Sender fejlen videre
    }
};