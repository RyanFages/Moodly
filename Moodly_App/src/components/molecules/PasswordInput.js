import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const PasswordInput = ({ value, onChangeText, placeholder }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}   
                secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                    source={isPasswordVisible ? require('../../../assets/images/eye.png') : require('../../../assets/images/eye-off.png')}
                    style={styles.icon}
                />
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PasswordInput;
