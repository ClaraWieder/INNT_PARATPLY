import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    // Generelle stilarter
    container: {
        flex: 1,
        backgroundColor: "#f0f8ff", // Lys blå baggrund
        padding: 20,
    },
    header: {
        backgroundColor: "#000", // Sort topbar
        padding: 15,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        color: "#fff", // Hvid tekst
        fontSize: 20,
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    card: {
        backgroundColor: "#fff", // Hvis kort baggrund
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    button: {
        backgroundColor: "#000", // Sort knap
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#e0f7ff",
        padding: 10,
    },
    // Specifikke stilarter til navigation bar
    navigationBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#000", // Sort bundmenu
        paddingVertical: 10,
    },
    navigationIcon: {
        color: "#fff",
        fontSize: 20,
    },
});