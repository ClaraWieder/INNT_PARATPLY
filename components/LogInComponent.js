import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { signIn } from "../services/authService"; // Importerer signIn-funktion
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";

// Komponent til at logge en bruger ind
const LogInComponent = () => {
    const [email, setEmail] = useState(""); // State til email
    const [password, setPassword] = useState(""); // State til password
    const [errorMessage, setErrorMessage] = useState(""); // State til fejlbeskeder

    const navigation = useNavigation(); // Navigation for at skifte skærme

    const handleSignIn = async () => {
        try {
            const user = await signIn(email, password); // Kalder signIn-funktion
            console.log("Login successful!", user); // Logger brugeroplysninger
            Alert.alert("Success", "Login Successful!") // Viser en bekræftelse
            navigation.navigate("Main"); // Navigerer til MainScreen
        } catch (error) {
            setErrorMessage(error.message); // Viser fejlbesked
        }
    };

    return (
        <View style={globalStyles.card}>
            <Text style={globalStyles.sectionTitle}>Log In</Text>
            <TextInput 
                style={globalStyles.input}
                placeholder="Email" 
                value={email} 
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none" 
            />
            <TextInput 
                style={globalStyles.input}
                placeholder="Password" 
                value={password} 
                onChangeText={(text) => setPassword(text)} 
                secureTextEntry 
            />
            {errorMessage ? (
                <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
            ) : null}
            {/* Kalder handleSignIn */}
            <TouchableOpacity style={globalStyles.button} onPress={handleSignIn}>
                <Text style={globalStyles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LogInComponent;