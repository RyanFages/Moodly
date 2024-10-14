import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import InputField from "../molecules/InputField";
import Button from "../atoms/Button";

const LoginForm = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === "test@example.com" && password === "password") {
            // Si les informations de connexion sont correctes, redirige vers la page d'accueil
            navigation.navigate("Home");
        } else {
            // Sinon, afficher un message d'erreur
            Alert.alert("Login Failed", "Invalid email or password.");
        }
    };

    return (
        <View>
            <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
            />
            <InputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginForm;
