import React from "react";
import { View, StyleSheet } from "react-native";
import RegisterForm from "../organisms/RegisterForm";

const RegisterTemplate = () => (
    <View style={styles.container}>
        <RegisterForm />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
});

export default RegisterTemplate;
