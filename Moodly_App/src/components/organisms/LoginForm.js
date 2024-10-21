// import React, { useState } from "react";
// import { View, Alert, Text, Image, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import InputField from "../molecules/InputField";
// import Button from "../atoms/Button";
// import LabeledPasswordInput from "../molecules/LabeledPasswordInput";
// import { globalStyles } from '../styles/globalStyles'; // Importez les styles globaux

// const LoginForm = () => {
//     const navigation = useNavigation(); 

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleLogin = () => {
//         if (email === "123" && password === "123") {
//             navigation.navigate("Home");
//         } else {
//             Alert.alert("Login Failed", "Invalid email or password.");
//             setPassword("");
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Image
//                 source={{ uri: 'https://st2.depositphotos.com/3096625/7785/v/380/depositphotos_77856480-stock-illustration-letter-m-logo.jpg' }}
//                 style={styles.image}
//             />
//             <Text style={globalStyles.title}>Login</Text>
//             <InputField
//                 label="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter your email"
//                 style={globalStyles.text}
//             />
//             <LabeledPasswordInput
//                 label="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Enter your password"
//                 style={globalStyles.text}
//             />
//             <Button title="Login" onPress={handleLogin} style={globalStyles.button} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//     },
//     image: {
//         width: 100,
//         height: 100,
//         marginBottom: 20,
//         alignSelf: 'center',
//     },
// });

// export default LoginForm;


import React, { useState } from "react";
import { View, Alert, Text, Image, StyleSheet } from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

import InputField from "../molecules/InputField";
import Button from "../atoms/Button";
import LabeledPasswordInput from "../molecules/LabeledPasswordInput";
import { globalStyles } from '../styles/globalStyles'; // Importez les styles globaux

const LoginForm = () => {
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
            navigation.navigate("Home");

        } catch (error) {
            console.log('An error occurred:', error.response);
            Alert.alert("Login Failed", "Invalid email or password.");
            setPassword("");
        } finally {
            setLoading(false);
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
            <Button 
                title={loading ? "Logging in..." : "Login"} 
                onPress={handleLogin} 
                style={globalStyles.button} 
                disabled={loading} // Désactive le bouton pendant le chargement
            />
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
