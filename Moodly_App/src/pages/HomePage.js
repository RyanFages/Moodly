import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../components/atoms/Button";

const HomePage = ({ navigation }) => {
    const handleLogout = () => {
        // Redirige l'utilisateur vers la page de connexion
        navigation.navigate("Login");
    };
    const MoodWheel = () => {
        // Redirige l'utilisateur vers la page de connexion
        navigation.navigate("MoodWheel");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Home Page!</Text>
            <Button title="Logout" onPress={handleLogout} />
            <Button
                title="Emotion"
                onPress={() => navigation.navigate("EmotionPage")}
            />
            <Button
                title="Manager Dashboard"
                onPress={() => navigation.navigate("ManagerDashboard")}
            />
            <Button title="MoodWheel" onPress={MoodWheel} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default HomePage;
