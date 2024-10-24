import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";

import TreeMapChart from "../organisms/TreeMapChart";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManagerDashboardTemplate = () => {
    const [data, setData] = useState(null);
    const apiUrl = "http://10.134.197.209:1337/api/feelings";
    async function fetchFeelings() {
        if (data === null) {
            try {
                // Récupération du token JWT depuis AsyncStorage
                const jwt = await AsyncStorage.getItem("token");

                if (!jwt) {
                    return;
                }

                // Appel de l'API avec axios
                const response = await axios.get(apiUrl, {
                    headers: { Authorization: `Bearer ${jwt}` },
                });

                // Récupération des données de la réponse
                const data = response.data;
                setData(data.data); // Stocker les données dans le state
                //
                return data; // Si tu veux retourner les données pour une utilisation ultérieure
            } catch (error) {
                // Gestion de l'erreur
                if (error.response && error.response.status === 403) {
                    console.error(
                        "Erreur 403 : Accès interdit. Vérifiez les permissions ou le token."
                    );
                } else {
                    console.error(
                        "Erreur lors de la récupération des données:",
                        error
                    );
                }
            }
        }
    }

    // Exemple d'appel de la fonction
    fetchFeelings();
    const { width, height } = Dimensions.get("window"); // Obtenir la taille de l'écran
    return (
        <SafeAreaView style={styles.ChartContainer}>
            {data === null ? (
                <Text style={styles.text}>Waiting data</Text>
            ) : (
                <TreeMapChart
                    data={data}
                    width={width - 5}
                    height={height / 1.5}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        marginBottom: 20,
        color: "red",
    },
    ChartContainer: {
        flex: 1,
        alignItems: "center",
    },
});

export default ManagerDashboardTemplate;
