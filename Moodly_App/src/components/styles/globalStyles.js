import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const loadFonts = async () => {
    await Font.loadAsync({
        'Rubik': require('../../../assets/fonts/Rubik-Regular.ttf'),
        'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf'),
    });
};

const globalStyles = StyleSheet.create({
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
    button: {
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { globalStyles, loadFonts };
