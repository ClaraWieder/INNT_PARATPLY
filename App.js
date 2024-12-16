import React from 'react';
//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AuthScreen from './screens/AuthScreen';
import MainScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import QRScannerScreen from './screens/QRScannerScreen';
import ReservationScreen from './screens/ReservationScreen';


// Opret stack navigator
const Stack = createNativeStackNavigator();

// Opret bottom tab navigator
const Tab = createBottomTabNavigator();

// Bottom Tab Navigation
function BottomTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false, // Skjul header for tabs
        tabBarStyle: {
          backgroundColor: "#000", // Sort baggrund
          height: 60,
        },
        tabBarActiveTintColor: "#fff", // Aktiv farve
        tabBarInactiveTintColor: "#aaa", // Inaktiv farve
      }}
      >
        {/* Home Tab */}
        <Tab.Screen
          name="Home"
          component={MainScreen}
          options={{ 
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ), 
          }}
        />
        {/* Map Tab */}
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{ 
            tabBarLabel: "Map",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map-outline" color={color} size={size} />
            ),
          }}
        />
        {/* Profile Tab */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

// Hovednavigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {/* Authentication Screen */}
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ title: "Authentication", headerShown: false }} // Skjul header
        />

        {/* Bottom Tabs */}
        <Stack.Screen 
          name="Main" 
          component={BottomTabs} // Navigerer til Bottom Tabs
          options={{ title: "ParatPly", headerShown: false }} // Skjul header
        />

        {/* QR Scanner Screen */}
        <Stack.Screen
          name="QRScanner"
          component={QRScannerScreen}
          options={{ title: "Scan QR Code" }}
        />

        {/* Reservation Screen */}
        <Stack.Screen
          name="Reservation"
          component={ReservationScreen}
          options={{ title: "Reservation" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
