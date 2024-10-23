import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import EmotionText from '../components/atoms/EmotionText';
import BottomButton from "../components/atoms/BottomButton";
import Header from "../components/molecules/TopBar";


const MoodTrackerPage = ({ navigation }) => {
  // Choisis ici l'émotion que tu veux afficher
  const selectedEmotion = 'heureux'; // Change cette valeur pour tester d'autres émotions

  const emotionData = {
    'heureux': {
      color: '#FFDD30',
      textColor: '#BC9D03',
      text: 'heureux',
      image: require('../../assets/images/MoodHeureux.png'),
    },
    'motivé': {
      color: '#FF94BD',
      textColor: '#FF307F', 
      text: 'motivé',
      image: require('../../assets/images/MoodMotive.png'),
    },
    'neutre': {
      color: '#B0B0B0',
      textColor: '#737373', 
      text: 'neutre',
      image: require('../../assets/images/MoodNeutre.png'),
    },
    'triste': {
      color: '#42A8FD',
      textColor: '#0968B8',
      text: 'triste',
      image: require('../../assets/images/MoodTriste.png'),
    },
    'énervé': {
      color: '#FF4545',
      textColor: '#A40000',
      text: 'énervé',
      image: require('../../assets/images/MoodEnerve.png'),
    },
    'stressé': {
      color: '#F68A37',
      textColor: '#B04C00',
      text: 'stressé',
      image: require('../../assets/images/MoodStresse.png'),
    },
    'fatigué': {
      color: '#9E76D6',
      textColor: '#692CBF',
      text: 'fatigué',
      image: require('../../assets/images/MoodFatigue.png'),
    },
    'frustré': {
      color: '#2EBB6E',
      textColor: '#156238',
      text: 'frustré',
      image: require('../../assets/images/MoodFrustre.png'),
    },
  };

  // Utilisation de l'émotion actuelle
  const currentEmotion = emotionData[selectedEmotion];

  const handleModify = () => {
    // Redirige l'utilisateur vers la page de choix de l'émotion
    navigation.navigate("Login"); //Changer "login" par le nom de la page de Kevin
  };

  return (
    <View style={[styles.container, { backgroundColor: currentEmotion.color }]}>
      <Header />
      <View style={[styles.smallContainer]}>
        <EmotionText emotion={currentEmotion.text} color={currentEmotion.textColor} />
        <Image source={currentEmotion.image} style={styles.image} />
        <BottomButton title="Modifier" onPress={handleModify}/>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-30,

  },
  image: {
    width: 300,  // Set appropriate width for the image
    height: 300, // Set appropriate height for the image
    resizeMode: 'contain', // Ensure the image fits inside the box
    marginTop:-30,
    // position: 'absolute',
  }
});

export default MoodTrackerPage;
