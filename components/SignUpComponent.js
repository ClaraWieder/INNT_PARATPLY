import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { signUp } from "../services/authService"; // Importerer signUp-funktion
import { globalStyles } from "../styles/globalStyles";

// Komponent til at oprette en bruger
const SignUpComponent = () => {
    const [email, setEmail] = useState(""); // State til email
    const [password, setPassword] = useState(""); // State til password
    const [errorMessage, setErrorMessage] = useState(""); // State til fejlbeskeder

    const handleSignUp = async () => {
        // Validerer input
        if (!email || !password) {
            setErrorMessage("Email and password are required");
            return;
        }
        try {
            await signUp(email, password); // Kalder signUp-funktionen
            console.log("Sign-up successful!");
            setErrorMessage(""); // Nulstiller fejlbesked
        } catch (error) {
            setErrorMessage(error.message); // Viser fejlbesked til bruger
        }
    };

    return (
        <View style={globalStyles.card}>
            <Text style={globalStyles.sectionTitle}>Sign Up</Text>
            <TextInput 
                style={globalStyles.input}
                placeholder="Email" 
                value={email} 
                onChangeText={(text) => setEmail(text)} // Opdaterer email state
                autoCapitalize="none" 
            />
            <TextInput 
                style={globalStyles.input}
                placeholder="Password" 
                value={password} 
                onChangeText={(text) => setPassword(text)} // Opdaterer password state 
                secureTextEntry 
            />
            {errorMessage ? (
                <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
            ) : null}
            {/* Kalder handleSignUp */}
            <TouchableOpacity style={globalStyles.button} onPress={handleSignUp}>
                <Text style={globalStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpComponent;