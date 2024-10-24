import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const MoodDisplayText = ({ mainText, emotion, color }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{mainText}</Text>
      <Text style={[styles.emotionText, { color: color }]}>{emotion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 50,
    // position:'absolute',
    // top:20,

  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#3B2414',
  },
  emotionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MoodDisplayText;
