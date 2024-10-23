import React from "react";
import { SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";

import TreeMapChart from "../organisms/TreeMapChart";

const ManagerDashboardTemplate = () => {
    const data = [
        {
            UserID: 9,
            Mood: "Stress",
            Date: "2024-10-23 07:47:52",
            Personal: true,
        },
        {
            UserID: 12,
            Mood: "Tristesse",
            Date: "2024-10-23 07:47:52",
            Personal: false,
        },
        {
            UserID: 9,
            Mood: "Stress",
            Date: "2024-10-18 07:47:52",
            Personal: true,
        },
        {
            UserID: 17,
            Mood: "Neutre",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 20,
            Mood: "Joie",
            Date: "2024-10-20 07:47:52",
            Personal: true,
        },
        {
            UserID: 18,
            Mood: "Tristesse",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 12,
            Mood: "Fatigue",
            Date: "2024-10-17 07:47:52",
            Personal: true,
        },
        {
            UserID: 8,
            Mood: "Tristesse",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 13,
            Mood: "Frustration",
            Date: "2024-10-20 07:47:52",
            Personal: true,
        },
        {
            UserID: 16,
            Mood: "Fatigue",
            Date: "2024-10-20 07:47:52",
            Personal: true,
        },
        {
            UserID: 6,
            Mood: "Fatigue",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 4,
            Mood: "Frustration",
            Date: "2024-10-20 07:47:52",
            Personal: true,
        },
        {
            UserID: 1,
            Mood: "Motivation",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 6,
            Mood: "Motivation",
            Date: "2024-10-18 07:47:52",
            Personal: true,
        },
        {
            UserID: 11,
            Mood: "Tristesse",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 19,
            Mood: "Motivation",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 14,
            Mood: "Tristesse",
            Date: "2024-10-20 07:47:52",
            Personal: true,
        },
        {
            UserID: 5,
            Mood: "Neutre",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 10,
            Mood: "Neutre",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 3,
            Mood: "Motivation",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 14,
            Mood: "Motivation",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 12,
            Mood: "Tristesse",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 2,
            Mood: "Neutre",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 7,
            Mood: "Tristesse",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 3,
            Mood: "Stress",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 4,
            Mood: "Joie",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 12,
            Mood: "Frustration",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 19,
            Mood: "Neutre",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 15,
            Mood: "Joie",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 3,
            Mood: "Fatigue",
            Date: "2024-10-16 07:47:52",
            Personal: true,
        },
        {
            UserID: 3,
            Mood: "Tristesse",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 16,
            Mood: "Fatigue",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 3,
            Mood: "Tristesse",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 12,
            Mood: "Tristesse",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 16,
            Mood: "Tristesse",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 7,
            Mood: "Frustration",
            Date: "2024-10-18 07:47:52",
            Personal: true,
        },
        {
            UserID: 11,
            Mood: "Motivation",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 8,
            Mood: "Fatigue",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 11,
            Mood: "Fatigue",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 16,
            Mood: "Stress",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 13,
            Mood: "Stress",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 1,
            Mood: "Stress",
            Date: "2024-10-19 07:47:52",
            Personal: true,
        },
        {
            UserID: 14,
            Mood: "Joie",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 20,
            Mood: "Fatigue",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 11,
            Mood: "Frustration",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 12,
            Mood: "Joie",
            Date: "2024-10-19 07:47:52",
            Personal: true,
        },
        {
            UserID: 11,
            Mood: "Frustration",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 9,
            Mood: "Stress",
            Date: "2024-10-16 07:47:52",
            Personal: true,
        },
        {
            UserID: 15,
            Mood: "Frustration",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 2,
            Mood: "Fatigue",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 4,
            Mood: "Joie",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 16,
            Mood: "Motivation",
            Date: "2024-10-17 07:47:52",
            Personal: true,
        },
        {
            UserID: 7,
            Mood: "Motivation",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 9,
            Mood: "Frustration",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 16,
            Mood: "Frustration",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 14,
            Mood: "Fatigue",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 5,
            Mood: "Stress",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 4,
            Mood: "Frustration",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 2,
            Mood: "Joie",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 13,
            Mood: "Tristesse",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 13,
            Mood: "Stress",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 12,
            Mood: "Joie",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 20,
            Mood: "Fatigue",
            Date: "2024-10-21 07:47:52",
            Personal: true,
        },
        {
            UserID: 13,
            Mood: "Stress",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 2,
            Mood: "Neutre",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 8,
            Mood: "Fatigue",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 12,
            Mood: "Tristesse",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 10,
            Mood: "Joie",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 1,
            Mood: "Tristesse",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 16,
            Mood: "Frustration",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 2,
            Mood: "Joie",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 18,
            Mood: "Motivation",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 10,
            Mood: "Joie",
            Date: "2024-10-18 07:47:52",
            Personal: false,
        },
        {
            UserID: 9,
            Mood: "Colère",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 12,
            Mood: "Joie",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 2,
            Mood: "Neutre",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 14,
            Mood: "Stress",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 9,
            Mood: "Motivation",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 5,
            Mood: "Stress",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 20,
            Mood: "Stress",
            Date: "2024-10-17 07:47:52",
            Personal: false,
        },
        {
            UserID: 20,
            Mood: "Frustration",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 7,
            Mood: "Frustration",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 20,
            Mood: "Frustration",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 11,
            Mood: "Joie",
            Date: "2024-10-19 07:47:52",
            Personal: true,
        },
        {
            UserID: 7,
            Mood: "Neutre",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 20,
            Mood: "Tristesse",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 16,
            Mood: "Tristesse",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 15,
            Mood: "Stress",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 2,
            Mood: "Neutre",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 5,
            Mood: "Frustration",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 5,
            Mood: "Motivation",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 6,
            Mood: "Motivation",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 16,
            Mood: "Tristesse",
            Date: "2024-10-16 07:47:52",
            Personal: false,
        },
        {
            UserID: 5,
            Mood: "Colère",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 14,
            Mood: "Colère",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
        {
            UserID: 13,
            Mood: "Frustration",
            Date: "2024-10-19 07:47:52",
            Personal: false,
        },
        {
            UserID: 20,
            Mood: "Fatigue",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 18,
            Mood: "Tristesse",
            Date: "2024-10-21 07:47:52",
            Personal: false,
        },
        {
            UserID: 15,
            Mood: "Stress",
            Date: "2024-10-19 07:47:52",
            Personal: true,
        },
        {
            UserID: 13,
            Mood: "Joie",
            Date: "2024-10-20 07:47:52",
            Personal: false,
        },
    ];
    const { width, height } = Dimensions.get("window"); // Obtenir la taille de l'écran
    return (
        <SafeAreaView style={styles.ChartContainer}>
            {data[0] === null ? (
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
