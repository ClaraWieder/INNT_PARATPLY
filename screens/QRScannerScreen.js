import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
// Vi bruger Legacy Camera API, da det er den eneste der virker i dette projekt. Den ny Camera API virker kun med Typescript
import { Camera, CameraType } from 'expo-camera/legacy';
import { useNavigation, useRoute } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import { async } from "@firebase/util";

const QRScannerScreen = () => {
    const [hasPermission, setHasPermission] = useState(null); // Kamera-tilladelse
    const [scanned, setScanned] = useState(false); // Status for scanning
    const navigation = useNavigation();
    const route = useRoute();

    // Tjek om umbrellaId findes i route.params
    const umbrellaId = route.params?.umbrellaId || null;

    // Anmod om kamera-tilladelse
    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    // Håndter scanning af QR-kode
    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        Alert.alert("QR Code Scanned", `QR Code: ${data}`, [
            {
                text: "Reserve Umbrella",
                onPress: () => 
                    navigation.navigate("Reservation", { umbrellaId, qrData: data }),
            },
            {
                text: "Cancel",
                onPress: () => setScanned(false),
                style: "cancel",
            },
        ]);
    };

    // Håndter kamera-tilladelse
    if (hasPermission === null) {
        // Hvis ingen tilladelse er anmodet endnu
        return (
            <View style={globalStyles.container}>
                <Text style={globalStyles.sectionTitle}>Requesting Camera Permission...</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        // Hvis tilladelse er nægtet
        return (
            <View style={globalStyles.container}>
                <Text style={globalStyles.sectionTitle}>No access to camera</Text>
            </View>
        );
    }

    // QR-scanner visning
    return (
        <View style={globalStyles.container}>
            <Camera
                style={{ flex: 1, width: "100%" }}
                type={CameraType.back} // Brug bagkameraet
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: ["qr"], // Kun QR-koder
                }}
            />
            {scanned && (
                <TouchableOpacity style={globalStyles.button} onPress={() => setScanned(false)}>
                    <Text style={globalStyles.buttonText}>Tap to Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default QRScannerScreen;