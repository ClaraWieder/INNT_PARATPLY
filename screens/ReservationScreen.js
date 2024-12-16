import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { collection, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { async } from "@firebase/util";

const ReservationScreen = ({ route, navigation }) => {
    const { umbrellaId } = route.params; // Paraply ID fra QR-scanneren
    const [umbrella, setUmbrella] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hent paraplyinfo fra Firestore
    useEffect(() => {
        const fetchUmbrella = async () => {
            try {
                const umbrellaDoc = await getDoc(doc(db, "umbrella_stations", umbrellaId));
                if (umbrellaDoc.exists()) {
                    setUmbrella(umbrellaDoc.data());
                } else {
                    Alert.alert("Error", "Umbrella not found.");
                    navigation.goBack();
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching umbrella:", error);
                Alert.alert("Error", "Could not fetch umbrella information.");
                setLoading(false);
            }
        };

        fetchUmbrella();
    }, [umbrellaId]);

    // Funktion til at reservere paraply
    const handleReserve = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return Alert.alert("Error", "You need to be logged in.");

            // Opdater paraplystationens antal
            const umbrellaRef = doc(db, "umbrella_stations", umbrellaId);
            await updateDoc(umbrellaRef, {
                availableUmbrellas: umbrella.availableUmbrellas - 1,
            });

            // Tilføj reservation i Firestore
            await addDoc(collection(db, "reservations"), {
                userId: user.uid,
                qrData: umbrellaId,
                location: umbrella.location,
                reservedAt: new Date(),
                status: "active",
            });

            Alert.alert("Success", "Umbrella reserved successfully!");
            navigation.navigate("Main");
        } catch (error) {
            console.error("Error reserving umbrella:", error);
            Alert.alert("Error", "Could not reserve umbrella.");
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#000" />;
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.sectionTitle}>Reserve Umbrella</Text>
            <View style={globalStyles.card}>
                <Text style={globalStyles.cardTitle}>Location: {umbrella.location}</Text>
                <Text>Available Umbrellas: {umbrella.availableUmbrellas}</Text>
            </View>
            <TouchableOpacity style={globalStyles.button} onPress={handleReserve}>
                <Text style={globalStyles.buttonText}>Reserve Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReservationScreen;