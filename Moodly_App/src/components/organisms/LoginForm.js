import React, { useState } from "react";
import { View, Alert, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import InputField from "../molecules/InputField";
import Button from "../atoms/Button";
import LabeledPasswordInput from "../molecules/LabeledPasswordInput";
import { globalStyles } from '../styles/globalStyles'; // Importez les styles globaux

const LoginForm = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === "123" && password === "123") {
            navigation.navigate("Home");
        } else {
            Alert.alert("Login Failed", "Invalid email or password.");
            setPassword("");
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://st2.depositphotos.com/3096625/7785/v/380/depositphotos_77856480-stock-illustration-letter-m-logo.jpg' }}
                style={styles.image}
            />
            <Text style={globalStyles.title}>Login</Text>
            <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                style={globalStyles.text}
            />
            <LabeledPasswordInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                style={globalStyles.text}
            />
            <Button title="Login" onPress={handleLogin} style={globalStyles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
        alignSelf: 'center',
    },
});

export default LoginForm;
