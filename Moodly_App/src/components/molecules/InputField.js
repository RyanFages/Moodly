import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const InputField = ({ label, value, onChangeText, placeholder }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 4,
    },
});

export default InputField;
