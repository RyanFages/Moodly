import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const loadFonts = async () => {
    await Font.loadAsync({
        'Rubik': from('Rubik-Regular.ttf'),
        'Rubik-Bold': from('Rubik-Bold.ttf'),
    });
};

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f4f3',
        padding: 20,
    },
    text: {
        fontFamily: 'Rubik',
    },
    title: {
        fontFamily: 'Rubik-Bold',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export { globalStyles, loadFonts };
