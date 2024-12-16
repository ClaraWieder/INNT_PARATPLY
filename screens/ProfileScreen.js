import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null); // State til brugerens info
    
    // Lyt til Firebase for brugerens tilstand
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Sæt brugerdata
            } else {
                setUser(null); // Ingen bruger
            }
        });
        return unsubscribe; // Afmeld listener ved unmount
    }, []);

    // Log ud funktion
    const handleLogOut = async () => {
        try {
            await signOut(auth); // Firebase log-ud funktion
            Alert.alert("Logged Out", "You have been logged out successfully.");
            navigation.replace("Auth"); // Navigér til AuthScreen
        } catch (error) {
            console.log("Log out error:", error.message);
            Alert.alert("Error", "Failes to log out.");
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.sectionTitle}>Your Profile</Text>

            {/* Viser brugerens oplysninger */}
            {user ? (
                <View style={globalStyles.card}>
                    <Text style={styles.infoText}>Email: {user.email}</Text>
                    <Text style={styles.infoText}>
                        User ID: {user.uid}
                    </Text>
                    {/* Tilføj flere informationer her */}
                    <TouchableOpacity style={globalStyles.button} onPress={handleLogOut}>
                        <Text style={globalStyles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.infoText}>No user data available</Text>
            )}

            {/* Placeholder for betalingsinfo */}
            <Text style={globalStyles.sectionTitle}>Payment Info</Text>
            <View style={globalStyles.card}>
                <Text style={styles.infoText}>Card: **** **** **** 1234</Text>
                <Text style={styles.infoText}>Expiry: 12/25</Text>
                <TouchableOpacity style={globalStyles.button} onPress={() => Alert.alert("Edit Payment", "Feature coming soon!")}>
                    <Text style={globalStyles.buttonText}>Edit Payment Info</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
});

export default ProfileScreen;