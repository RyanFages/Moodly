// import React from "react";
// import { View, Text, StyleSheet, SafeAreaView } from "react-native";

// import Button from "../components/atoms/Button";
// import EmotionTemplate from "../components/templates/EmotionTemplate";

// const EmotionPage = () => {
//   const Mood = "Heureux";
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <EmotionTemplate Mood={Mood} />
//     </SafeAreaView>
//   );
// };

// export default EmotionPage;


import React from 'react';
import { View, StyleSheet} from 'react-native';
import EmotionText from '../components/atoms/EmotionText';


const MoodTrackerPage = () => {
  // Choisis ici l'émotion que tu veux afficher
  const selectedEmotion = 'heureux'; // Change cette valeur pour tester d'autres émotions

  const emotionData = {
    'heureux': {
      color: '#FFDD30',
      textColor: '#BC9D03',
      text: 'heureux',

    },
    'motivé': {
      color: '#FF94BD',
      textColor: '#FF307F', 
      text: 'motivé'
    },
    'neutre': {
      color: '#B0B0B0',
      textColor: '#737373', 
      text: 'neutre'
    },
    'triste': {
      color: '#42A8FD',
      textColor: '#0968B8',
      text: 'triste'
    },
    'énervé': {
      color: '#FF4545',
      textColor: '#A40000',
      text: 'énervé'
    },
    'stressé': {
      color: '#F68A37',
      textColor: '#B04C00',
      text: 'stressé'
    },
    'fatigué': {
      color: '#9E76D6',
      textColor: '#692CBF',
      text: 'fatigué'
    },
    'frustré': {
      color: '#2EBB6E',
      textColor: '#156238',
      text: 'frustré'
    },
  };

  // Utilisation de l'émotion actuelle
  const currentEmotion = emotionData[selectedEmotion];

  return (
    <View style={[styles.container, { backgroundColor: currentEmotion.color }]}>
      <EmotionText emotion={currentEmotion.text} color={currentEmotion.textColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MoodTrackerPage;
