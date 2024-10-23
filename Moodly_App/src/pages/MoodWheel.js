import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, Image } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg'; // Importer le composant SVG pour l'image
import BottomButton from "../components/atoms/BottomButton";
import Header from "../components/molecules/TopBar";

// import ArrowIcon from '../components/atoms/arrow.png'; // Importer l'icône de flèche
import ArrowIcon from '../../assets/images/arrow.png'; // Importer l'icône de flèche

const { width } = Dimensions.get('window');
const outerRadius = width; // Rayon de la roue
const innerRadius = outerRadius / 3; // Rayon intérieur de la roue
const centerX = 0;
const centerY = 0;

//Importation des PNG
// import Heureux from '../components/atoms/Mood/Heureux.png'
import Heureux from '../../assets/images/MoodHeureux.png'
// import Motivé from '../components/atoms/Mood/Motivé.png'
import Motivé from '../../assets/images/MoodMotive.png'
// import Neutre from '../components/atoms/Mood/Neutre.png'
import Neutre from '../../assets/images/MoodNeutre.png'
// import Triste from '../components/atoms/Mood/Triste.png'
import Triste from '../../assets/images/MoodTriste.png'
// import Stressé from '../components/atoms/Mood/Stressé.png'
import Stressé from '../../assets/images/MoodStresse.png'
// import Énervé from '../components/atoms/Mood/Colère.png'
import Énervé from '../../assets/images/MoodEnerve.png'
// import Fatigué from '../components/atoms/Mood/Fatigué.png'
import Fatigué from '../../assets/images/MoodFatigue.png'
// import Frustré from '../components/atoms/Mood/Frustré.png'
import Frustré from '../../assets/images/MoodFrustre.png'

// Liste des émotions
const emotions = [
  { label: 'Fatigué', color: '#9E76D6', icon : Fatigué },
  { label: 'Frustré', color: '#2EBB6E', icon : Frustré },
  { label: 'Stressé', color: '#F68A37', icon : Stressé },
  { label: 'Énervé', color: '#FF4545', icon : Énervé },
  { label: 'Motivé', color: '#FF94BD', icon : Motivé },
  { label: 'Heureux', color: '#FFDD30', icon : Heureux },
  { label: 'Neutre', color: '#B0B0B0', icon : Neutre },
  { label: 'Triste', color: '#42A8FD', icon : Triste },
];

// Calcul de l'angle pour chaque segment (360° / 8 émotions)
const anglePerEmotion = (2 * Math.PI) / emotions.length;

const EmotionWheel = ({navigation}) => {
// Fonction pour la zone du haut (inverse l'angle)
const calculateAngleTop = (x, y) => {
  const angle = Math.atan2(y - centerY, x - centerX);
  return -angle; // Inverser l'angle pour la zone du haut
};

// Fonction pour la zone du bas (conserve l'angle normal)
const calculateAngleBottom = (x, y) => {
  const angle = Math.atan2(y - centerY, x - centerX);
  return angle; // Pas de changement pour la zone du bas
};

const normalizeAngleAndSetEmotion = () => {
  const normalizedAngle = (currentAngle.current % (2 * Math.PI)) + (currentAngle.current < 0 ? 2 * Math.PI : 0);
  const adjustedAngle = normalizedAngle + Math.PI / 2;
  const index = Math.floor(((2 * Math.PI) - adjustedAngle) / anglePerEmotion) % emotions.length;
  const adjustedIndex = (index + emotions.length) % emotions.length;

  setSelectedEmotion(emotions[adjustedIndex].label);
  setSelectedColor(emotions[adjustedIndex].color);
};

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#000'); // Couleur de l'émotion sélectionnée

  const initialRotation = 22.5 * (Math.PI / 180); // Convertir 22.5° en radians
  const rotateAnim = useRef(new Animated.Value(initialRotation)).current; // Valeur animée pour la rotation
  const currentAngle = useRef(initialRotation); // Initialiser avec l'angle de départ
  const lastAngle = useRef(0); // Angle lors de la dernière interaction

  // Calculer l'émotion en fonction de la rotation initiale
  useEffect(() => {
    normalizeAngleAndSetEmotion(initialRotation, setSelectedEmotion, setSelectedColor);
  }, []);

  // PanResponder pour gérer les mouvements de glissement
  const panResponderTop = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { pageX, pageY } = evt.nativeEvent;
        lastAngle.current = calculateAngleTop(pageX - width / 2, pageY - width / 2); // Utiliser calculateAngleTop pour la zone du haut
      },
      onPanResponderMove: (evt, gestureState) => {
        const { pageX, pageY } = evt.nativeEvent;
        const currentTouchAngle = calculateAngleTop(pageX - width / 2, pageY - width / 2);
        const angleDelta = currentTouchAngle - lastAngle.current;
  
        currentAngle.current += angleDelta;
        lastAngle.current = currentTouchAngle;
  
        rotateAnim.setValue(currentAngle.current);
      },
      onPanResponderRelease: () => {
        normalizeAngleAndSetEmotion(); // Appel à la nouvelle fonction
      },
    })
  ).current;
  
  const panResponderBottom = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { pageX, pageY } = evt.nativeEvent;
        lastAngle.current = calculateAngleBottom(pageX - width / 2, pageY - width / 2); // Utiliser calculateAngleBottom pour la zone du bas
      },
      onPanResponderMove: (evt, gestureState) => {
        const { pageX, pageY } = evt.nativeEvent;
        const currentTouchAngle = calculateAngleBottom(pageX - width / 2, pageY - width / 2);
        const angleDelta = currentTouchAngle - lastAngle.current;
  
        currentAngle.current += angleDelta;
        lastAngle.current = currentTouchAngle;
  
        rotateAnim.setValue(currentAngle.current);
      },
      onPanResponderRelease: () => {
        normalizeAngleAndSetEmotion(); // Appel à la nouvelle fonction
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

    // Calculer le centre de chaque segment
    const centerAngle = (startAngle + endAngle) / 2;
    const iconRadius = (outerRadius + innerRadius) / 2; // Rayon moyen pour centrer l'icône
    const iconSize = Math.min(innerRadius, outerRadius) * 1.5; // Taille maximale de l'icône
    const iconX = iconRadius * Math.cos(centerAngle) - iconSize / 2; // Centrer l'icône
    const iconY = iconRadius * Math.sin(centerAngle) - iconSize / 2; // Centrer l'icône

    // Ajustement pour que l'icône soit perpendiculaire
    const iconRotation = centerAngle + Math.PI / 2; // Ajoute 90 degrés pour orienter l'icône vers le centre

    return (
      <G key={index}>
        <Path
          d={pathData}
          fill={emotion.color}
          stroke="white"
          strokeWidth={2}
        />
        <G
          transform={`translate(${iconX + iconSize / 2}, ${iconY + iconSize / 2}) rotate(${iconRotation * (180 / Math.PI)})`}
        >
          {/* Affichage de l'icône PNG */}
          <SvgImage
            href={emotion.icon}
            x={-iconSize / 2} // Ajuster la position de l'icône
            y={-iconSize / 2} // Ajuster la position de l'icône
            width={iconSize}
            height={iconSize}
            preserveAspectRatio="xMidYMid meet"
          />
        </G>
      </G>
    );
  };

  const renderArrow = () => {
    return (
      <Image
        source={ArrowIcon}
        style={{
          position: 'absolute',
          zIndex: 1,
          alignSelf: 'center',
          top: '2%', // Centrer verticalement
          width:'14%',
          height:'18%',
        }}
      />
    );
  };
  const handleConfirm = () => {
    navigation.navigate("EmotionPage",{ selectedEmotion });
  };
  return (
<View style={styles.container}>
  <Header />
  <View style={styles.container}>
    <Text style={styles.text}>Aujourd'hui je me sens</Text>
    <Text style={[styles.centeredEmotionText, { color: selectedColor }]}>
      {selectedEmotion}
    </Text>

    {/* Afficher la roue des émotions sur toute la hauteur */}
    <View style={styles.wheelContainer}>
      {renderArrow()}
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

      {/* Zones transparentes pour les interactions tactiles */}
      <View style={styles.touchZonesContainer}>
        <View style={styles.touchZoneTop} {...panResponderTop.panHandlers} />
        <View style={styles.touchZoneBottom} {...panResponderBottom.panHandlers} />
      </View>
    </View>

    <BottomButton title="Valider" onPress={handleConfirm} />
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
  centeredEmotionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  wheelContainer: {
    position: 'relative', // Pour que les zones tactiles se superposent
    width: '100%',
    height: '70%', // Ajuster la hauteur pour l'affichage de la roue
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchZonesContainer: {
    position: 'absolute', // Superposer les zones de glissement par-dessus la roue
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  touchZoneTop: {
    flex: 1,
  },
  touchZoneBottom: {
    flex: 1,
  },
});



export default EmotionWheel;
