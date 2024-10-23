import React, { useState } from "react";
import { View, Alert, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import InputField from "../molecules/InputField";
import Button from "../atoms/Button";
import ButtonOr from "../atoms/ButtonOr";
import LabeledPasswordInput from "../molecules/LabeledPasswordInput";
import { globalStyles } from "../styles/globalStyles";

const RegisterPage = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        if (email === "123" && password === "123") {
            navigation.navigate("Home");
        } else {
            Alert.alert("Registration Failed", "Invalid email or password.");
            setPassword("");
        }
    };

    const goToLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={globalStyles.container}>
            <Image
                source={{
                    uri: "https://st2.depositphotos.com/3096625/7785/v/380/depositphotos_77856480-stock-illustration-letter-m-logo.jpg",
                }}
                style={styles.image}
            />
            <Text style={globalStyles.title}>Register</Text>
            <InputField
                label="Email / username"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email or your Username"
                style={globalStyles.text}
            />
            <LabeledPasswordInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                style={globalStyles.text}
            />
            <Button title="Create account" onPress={handleRegister} />
            <View style={styles.separatorContainer}>
                <View style={styles.separator} />
                <Text style={styles.separatorText}>or</Text>
                <View style={styles.separator} />
            </View>
            <ButtonOr title="Login" onPress={goToLogin} />
        </View>
    );
};

//Séparateur simple sans le or L.51/55 <Button title="Login" onPress={handleLogin} style={globalStyles.button} /> <Button title="Register" onPress={goToRegister} style={[globalStyles.button, { marginTop: 10 }]} />

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
        alignSelf: "center",
    },
    separatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: "#000",
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: "#000",
    },
});

export default RegisterPage;
