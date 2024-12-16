import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import LogInComponent from "../components/LogInComponent";
import SignUpComponent from "../components/SignUpComponent";
import { globalStyles } from "../styles/globalStyles";

// Overordnet Auth-screen med login og sign-up
const AuthScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false); // State til at skifte mellem login og sign-up

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.sectionTitle}>Welcome to ParatPly!</Text>

            {/* Viser enten LogIn eller SignUp component */}
            <View style={globalStyles.card}>
                {isSignUp ? <SignUpComponent /> : <LogInComponent />}
            </View>

            {/* Knap til at skifte mellem LogIn og SignUp */}
            <TouchableOpacity style={globalStyles.button} onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={globalStyles.buttonText}>
                    {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"} 
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthScreen;