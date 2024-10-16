import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const outerRadius = width; // Rayon de la roue
const innerRadius = outerRadius / 3; // Rayon intérieur de la roue
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
  const [selectedColor, setSelectedColor] = useState('#000'); // Couleur de l'émotion sélectionnée

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
        setSelectedColor(emotions[adjustedIndex].color); // Mettez à jour la couleur de l'émotion sélectionnée
      },
    })
  ).current;

  const renderEmotionSegment = (emotion, index) => {
    const startAngle = index * anglePerEmotion;
    const endAngle = (index + 1) * anglePerEmotion;

    // Coordonnées pour les arcs extérieurs
    const x1_outer = outerRadius * Math.cos(startAngle);
    const y1_outer = outerRadius * Math.sin(startAngle);
    const x2_outer = outerRadius * Math.cos(endAngle);
    const y2_outer = outerRadius * Math.sin(endAngle);

    // Coordonnées pour les arcs intérieurs (pour créer l'espace vide au centre)
    const x1_inner = innerRadius * Math.cos(startAngle);
    const y1_inner = innerRadius * Math.sin(startAngle);
    const x2_inner = innerRadius * Math.cos(endAngle);
    const y2_inner = innerRadius * Math.sin(endAngle);

    const pathData = `M ${x1_inner} ${y1_inner} L ${x1_outer} ${y1_outer} A ${outerRadius} ${outerRadius} 0 0 1 ${x2_outer} ${y2_outer} L ${x2_inner} ${y2_inner} A ${innerRadius} ${innerRadius} 0 0 0 ${x1_inner} ${y1_inner} Z`;

    // Calculer l'angle central du segment
    const midAngle = startAngle + anglePerEmotion / 2;

    // Calculer la position du texte
    const textX = (innerRadius + (outerRadius - innerRadius) / 2) * Math.cos(midAngle);
    const textY = (innerRadius + (outerRadius - innerRadius) / 2) * Math.sin(midAngle);

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
      <Text style={styles.text}>Aujourd'hui je me sens</Text>
      <Text style={[styles.centeredEmotionText, { color: selectedColor }]}>
        {selectedEmotion}
      </Text>
      {/* Vue de la roue des émotions */}
      <View {...panResponder.panHandlers}>
        <Animated.View
          style={{
            transform: [{ rotate: rotateAnim.interpolate({
              inputRange: [-2 * Math.PI, 2 * Math.PI],
              outputRange: ['-360deg', '360deg']
            }) }],
          }}
        >
          <Svg width={width - 40} height={width - 40} viewBox={`-${outerRadius} -${outerRadius} ${2 * outerRadius} ${2 * outerRadius}`}>
            {emotions.map((emotion, index) => renderEmotionSegment(emotion, index))}
          </Svg>
        </Animated.View>
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  centeredEmotion: {
    position: 'absolute',
    top: '42%', // Ajuster la position pour être centré
    alignItems: 'center',
    justifyContent: 'center',
    width: 150, // Largeur ajustée pour contenir l'émotion
    height: 150, // Hauteur ajustée
  },
  centeredEmotionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  selectedEmotionText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EmotionWheel;
