import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f8f4f3', // Couleur de l'intérieur du bouton
        borderColor: '#3b2414', // Couleur des contours du bouton
        borderWidth: 2, // Épaisseur des contours
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100, // Valeur par défaut pour les bords arrondis
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#3b2414',
        fontSize: 16,
    },
});

export default Button;
