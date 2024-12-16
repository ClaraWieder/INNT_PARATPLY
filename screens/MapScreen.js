import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { globalStyles } from "../styles/globalStyles";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";

//const GOOGLE_MAPS_APIKEY = "AIzaSyBSVJLR-vb8B5xBR9ra2XVcyWSMSu5GNSE"; // Tilføj din API nøgle her
const GOOGLE_MAPS_APIKEY = "DIN_GOOGLE_MAPS_API_KEY"; // Tilføj din API nøgle her


const MapScreen = () => {
    const [stations, setStations] = useState([]); // State til paraplystationer
    const [loading, setLoading] = useState(true); // Loading-indikator
    const [userLocation, setUserLocation] = useState(null); // Brugerens lokation
    const [destination, setDestination] = useState(null); // Destination for vejvisning
    const navigation = useNavigation();

    // Hent paraplystationer fra Firestore
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "umbrella_stations"));
                const stationsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setStations(stationsList); // Gem data i state
            } catch (error) {
                console.error("Error fetching stations:", error);
            } finally {
                setLoading(false);
            }
        };

        // Hent brugerens lokation
        const getUserLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.error("Permission to access location was denied");
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        };

        fetchStations();
        getUserLocation();
    }, []);

    const handleMarkerPress = (stationId) => {
        navigation.navigate("QRScanner", { umbrellaId: stationId });
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.sectionTitle}>Umbrella Locations</Text>
            {loading || !userLocation ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <MapView 
                    style={{ flex: 1 }} 
                    initialRegion={{ 
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    showsUserLocation={true} // Viser brugerens position
                >
                    {/* Viser paraplystationer som Markers */}
                    {stations.map((station) => (
                        <Marker 
                            key={station.id}
                            coordinate={{
                                latitude: station.latitude,
                                longitude: station.longitude,
                            }}
                            title={station.location}
                            description={`Available Umbrellas: ${station.availableUmbrellas}`}
                            onPress={() => handleMarkerPress(station.id)}
                        >
                            {/* Custom sort paraply-ikon */}
                            <Image
                                source={require("../assets/umbrella-icon.png")}
                                style={{ width: 40, height: 40 }}
                            />
                        </Marker>
                    ))}

                    {/* Vis vej fra bruger til destination */}
                    {destination && (
                        <MapViewDirections
                            origin={userLocation} // Start position (brugerens lokation)
                            destination={destination} // Destination
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={5}
                            strokeColor="#4285F4"
                        />
                    )}
                </MapView>
            )}
        </View>
    );
};

export default MapScreen;