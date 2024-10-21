import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const InputField = ({ label, value, onChangeText, placeholder }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input} // Ajout du style ici
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#000',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
});

export default InputField;
