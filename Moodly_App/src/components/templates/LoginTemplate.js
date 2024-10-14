import React from "react";
import { View, StyleSheet } from "react-native";
import LoginForm from "../organisms/LoginForm";

const LoginTemplate = () => (
    <View style={styles.container}>
        <LoginForm />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
});

export default LoginTemplate;
