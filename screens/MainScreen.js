import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

// Simpel hovedskærm
const MainScreen = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.sectionTitle}>Welcome to ParatPly!</Text>
        </View>
    );
};

export default MainScreen;