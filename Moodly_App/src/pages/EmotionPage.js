import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import MoodDisplayText from '../components/atoms/MoodDisplayText';
import BottomButton from "../components/atoms/BottomButton";
import Header from "../components/molecules/TopBar";


const MoodTrackerPage = ({ navigation , route}) => {
  // Choisis ici l'émotion que tu veux afficher
  const { selectedEmotion } = route.params; // 

  const emotionData = {
    'Heureux': {
      color: '#FFDD30',
      textColor: '#BC9D03',
      text: 'Heureux',
      image: require('../../assets/images/MoodHeureux.png'),
    },
    'Motivé': {
      color: '#FF94BD',
      textColor: '#FF307F', 
      text: 'Motivé',
      image: require('../../assets/images/MoodMotive.png'),
    },
    'Neutre': {
      color: '#B0B0B0',
      textColor: '#737373', 
      text: 'Neutre',
      image: require('../../assets/images/MoodNeutre.png'),
    },
    'Triste': {
      color: '#42A8FD',
      textColor: '#0968B8',
      text: 'Triste',
      image: require('../../assets/images/MoodTriste.png'),
    },
    'Énervé': {
      color: '#FF4545',
      textColor: '#A40000',
      text: 'Énervé',
      image: require('../../assets/images/MoodEnerve.png'),
    },
    'Stressé': {
      color: '#F68A37',
      textColor: '#B04C00',
      text: 'Stressé',
      image: require('../../assets/images/MoodStresse.png'),
    },
    'Fatigué': {
      color: '#9E76D6',
      textColor: '#692CBF',
      text: 'Fatigué',
      image: require('../../assets/images/MoodFatigue.png'),
    },
    'Frustré': {
      color: '#2EBB6E',
      textColor: '#156238',
      text: 'Frustré',
      image: require('../../assets/images/MoodFrustre.png'),
    },
  };

  // Utilisation de l'émotion actuelle
  // const currentEmotion = emotionData[selectedEmotion];
  const currentEmotion = emotionData[selectedEmotion]; // Convertir l'émotion en minuscules pour la clé


  const handleModify = () => {
    navigation.navigate("MoodWheel"); 
  };

  return (
    <View style={[styles.container, { backgroundColor: currentEmotion.color }]}>
      {/* Top bar stays at the top */}
      <Header />

      {/* Centered content (text + image) */}
      <View style={styles.centerContent}>
        <MoodDisplayText mainText="Aujourd'hui je me sens " emotion={currentEmotion.text} color={currentEmotion.textColor} />
        <Image source={currentEmotion.image} style={styles.image} />
        <BottomButton title="Modifier" onPress={handleModify} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -260,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 25,
  },

});

export default MoodTrackerPage;