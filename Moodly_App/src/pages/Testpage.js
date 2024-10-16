import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const radius = width / 2 - 40; // Rayon de la roue

// Liste des émotions
const emotions = [
  { label: 'Heureux', color: '#FFDD30' },
  { label: 'Motivé', color: '#FF94BD' },
  { label: 'Neutre', color: '#B0B0B0' },
  { label: 'Triste', color: '#42A8FD' },
  { label: 'Stressé', color: '#F68A37' },
  { label: 'En Colère', color: '#FF2E2E' },
  { label: 'Fatigué', color: '#9E76D6' },
  { label: 'Frustré', color: '#936E32' },
];

// Calcul de l'angle pour chaque segment (360° / 8 émotions)
const anglePerEmotion = (2 * Math.PI) / emotions.length;

const EmotionWheel = () => {

  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // Fonction pour gérer la sélection de l'émotion
  const handleEmotionPress = (emotion) => {
    setSelectedEmotion(emotion.label); // Met à jour l'émotion sélectionnée
  };

  const renderEmotionSegment = (emotion, index) => {
    const startAngle = index * anglePerEmotion;
    const endAngle = (index + 1) * anglePerEmotion;

    // Calcul des coordonnées pour les arcs
    const x1 = radius * Math.cos(startAngle);
    const y1 = radius * Math.sin(startAngle);
    const x2 = radius * Math.cos(endAngle);
    const y2 = radius * Math.sin(endAngle);

    const pathData = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

    return (
      <G key={index}>
        {/* Utilisation de onPressIn directement sur le Path pour gérer le clic */}
        <Path
          d={pathData}
          fill={emotion.color}
          stroke="white"
          strokeWidth={2}
          onPressIn={() => handleEmotionPress(emotion)} // Appel lorsque l'on presse le segment
        />
        <SvgText
          x={(radius / 2) * Math.cos(startAngle + anglePerEmotion / 2)}
          y={(radius / 2) * Math.sin(startAngle + anglePerEmotion / 2)}
          fill="black"
          fontSize={16}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {emotion.label}
        </SvgText>
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quelle est votre émotion ?</Text>

      <Svg width={width - 40} height={width - 40} viewBox={`-${radius} -${radius} ${2 * radius} ${2 * radius}`}>
        {emotions.map((emotion, index) => renderEmotionSegment(emotion, index))}
      </Svg>

       {/* Affichage de l'émotion sélectionnée */}
       {selectedEmotion && (
        <Text style={styles.selectedEmotionText}>Émotion sélectionnée : {selectedEmotion}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  selectedEmotionText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EmotionWheel;
