import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PasswordInput from "../molecules/PasswordInput"; // Assurez-vous d'importer le composant PasswordInput

const LabeledPasswordInput = ({ label, value, onChangeText, placeholder }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <PasswordInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#000',
    },
});

export default LabeledPasswordInput;
