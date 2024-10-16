import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const radius = width; // Rayon de la roue
const centerX = 0;
const centerY = 0;

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

// Fonction utilitaire pour calculer l'angle entre deux points (position du doigt et centre)
const calculateAngle = (x, y) => {
  const angle = Math.atan2(y - centerY, x - centerX);
  return angle;
};

const EmotionWheel = () => {

  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const rotateAnim = useRef(new Animated.Value(0)).current; // Valeur animée pour la rotation
  const currentAngle = useRef(0); // Stocke l'angle actuel de la roue
  const lastAngle = useRef(0); // Angle lors de la dernière interaction

  // PanResponder pour gérer les mouvements de glissement
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Sauvegarde l'angle au moment où le mouvement commence
        const { pageX, pageY } = evt.nativeEvent;
        lastAngle.current = calculateAngle(pageX - width / 2, pageY - width / 2);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Calculez l'angle en fonction du mouvement de l'utilisateur (basé sur la position du doigt)
        const { pageX, pageY } = evt.nativeEvent;
        const currentTouchAngle = calculateAngle(pageX - width / 2, pageY - width / 2);
        const angleDelta = currentTouchAngle - lastAngle.current;

        currentAngle.current += angleDelta;
        lastAngle.current = currentTouchAngle;

        // Appliquer la rotation à l'animation
        rotateAnim.setValue(currentAngle.current);
      },
      onPanResponderRelease: () => {
        // Normaliser l'angle pour qu'il soit entre 0 et 2*PI
        const normalizedAngle = (currentAngle.current % (2 * Math.PI)) + (currentAngle.current < 0 ? 2 * Math.PI : 0);
    
        // Ajustement pour que le sélecteur soit en haut (décalage de -π/2)
        const adjustedAngle = normalizedAngle + Math.PI / 2;
    
        // Calcul de l'émotion en haut de la roue (à 0° dans le référentiel du sélecteur fixe)
        const index = Math.floor(((2 * Math.PI) - adjustedAngle) / anglePerEmotion) % emotions.length;
    
        // S'assurer que l'index est toujours positif
        const adjustedIndex = (index + emotions.length) % emotions.length;
    
        // Met à jour l'émotion sélectionnée
        setSelectedEmotion(emotions[adjustedIndex].label);
      },
    })
  ).current;

  const renderEmotionSegment = (emotion, index) => {
    const startAngle = index * anglePerEmotion;
    const endAngle = (index + 1) * anglePerEmotion;

    // Calcul des coordonnées pour les arcs
    const x1 = radius * Math.cos(startAngle);
    const y1 = radius * Math.sin(startAngle);
    const x2 = radius * Math.cos(endAngle);
    const y2 = radius * Math.sin(endAngle);

    const pathData = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

    // Calculer l'angle central du segment
    const midAngle = startAngle + anglePerEmotion / 2;

    // Calculer la position du texte
    const textX = (radius / 2) * Math.cos(midAngle);
    const textY = (radius / 2) * Math.sin(midAngle);

    // Ajuster la rotation du texte pour qu'il soit perpendiculaire au centre
    const textRotation = (midAngle * 180) / Math.PI + 90; // Convertir les radians en degrés et ajuster

    return (
      <G key={index}>
        <Path
          d={pathData}
          fill={emotion.color}
          stroke="white"
          strokeWidth={2}
        />
        <SvgText
          x={textX}
          y={textY}
          fill="black"
          fontSize={16}
          textAnchor="middle"
          alignmentBaseline="middle"
          transform={`rotate(${textRotation} ${textX} ${textY})`} // Rotation du texte autour de son point de départ
        >
          {emotion.label}
        </SvgText>
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quelle est votre émotion ?</Text>

      <View {...panResponder.panHandlers}>
        <Animated.View
          style={{
            transform: [{ rotate: rotateAnim.interpolate({
              inputRange: [-2 * Math.PI, 2 * Math.PI],
              outputRange: ['-360deg', '360deg']
            }) }],
          }}
        >
          <Svg width={width - 40} height={width - 40} viewBox={`-${radius} -${radius} ${2 * radius} ${2 * radius}`}>
            {emotions.map((emotion, index) => renderEmotionSegment(emotion, index))}
          </Svg>
        </Animated.View>
      </View>

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
