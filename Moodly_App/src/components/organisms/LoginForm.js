import React, { useState } from "react";
import { View, Alert, Text, Image, StyleSheet } from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

import InputField from "../molecules/InputField";
import Button from "../atoms/Button";
import ButtonOr from "../atoms/ButtonOr";
import LabeledPasswordInput from "../molecules/LabeledPasswordInput";
import { globalStyles } from '../styles/globalStyles';

const LoginPage = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://10.134.197.209:1337/api/auth/local', {
                identifier: email,
                password: password,
            });

            // Stocker le token JWT et les informations utilisateur localement (AsyncStorage peut être utilisé ici pour stocker les données)
            console.log(response.data);
            const { jwt, user } = response.data;

            // Vous pouvez utiliser AsyncStorage pour stocker le JWT si vous voulez le réutiliser
            // await AsyncStorage.setItem("jwt", jwt);
            // await AsyncStorage.setItem("user", JSON.stringify(user));

            // Rediriger vers la page d'accueil après la connexion réussie
            navigation.navigate("MoodWheel");

        } catch (error) {
            console.log('An error occurred:', error.response);
            Alert.alert("Login Failed", "Invalid email or password.");
            setPassword("");
        } finally {
            setLoading(false);
        }
    };

    const goToRegister = () => {
        navigation.navigate("RegisterPage");
    };

    return (
        <View>
            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.image}
            />
            <Text style={globalStyles.title}>Login</Text>
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
            <Button
                title={loading ? "Logging in..." : "Login"}
                onPress={handleLogin}
                disabled={loading} // Désactive le bouton pendant le chargement
            />
            <View style={styles.separatorContainer}>
                <View style={styles.separator} />
                <Text style={styles.separatorText}>or</Text>
                <View style={styles.separator} />
            </View>
            <ButtonOr title="Register" onPress={goToRegister} />
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
        alignSelf: 'center',
        borderRadius:16,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#000',
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#000',
    },
});

export default LoginPage;
