import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonLogout from "../atoms/ButtonLogout";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
    const navigation = useNavigation();

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        // Supprimer le token et l'utilisateur de AsyncStorage
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
        // Redirige l'utilisateur vers la page de login (ou toute autre page)
        navigation.navigate("Login"); // Change "Login" selon le nom de ta page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Moodly</Text>
            <ButtonLogout title="Déconnexion" onPress={handleLogout}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        marginTop:56,
        paddingHorizontal:24,
        paddingBottom:16,
        flexDirection: 'row', // Permet de placer les éléments sur la même ligne
        justifyContent: 'space-between', // Espace entre le titre et le bouton
        alignItems: 'center', // Aligner les éléments au centre verticalement
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#3B2414' // Ligne sous le header pour le style
    },
    title: {
        fontSize: 32, // Taille de la police du titre
        fontWeight: 'bold', // Rendre le titre en gras
    },
});

export default Header;