// Button.js
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
        backgroundColor: '#3b2414',
        alignSelf: 'stretch',
        paddingVertical: 12,
        // marginHorizontal: 24,
        marginLeft: '10%',
        borderRadius: 100, // Valeur par défaut pour les bords arrondis
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom:56,
        width:'80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Button;
