import React from 'react';
import { Text, StyleSheet } from 'react-native';

const EmotionText = ({ emotion, color }) => {
  return (
    <Text style={styles.text}>
      Aujourd'hui je me sens{' '}
      <Text style={[styles.emotion, { color }]}>
        {emotion}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginTop: 20,
    color: '#000000', // Couleur générale du texte, ajustable
  },
  emotion: {
    fontWeight: 'bold', // Pour accentuer l'émotion
  },
});

export default EmotionText;
