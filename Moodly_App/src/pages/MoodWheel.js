import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, Image } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg'; // Importer le composant SVG pour l'image
import BottomButton from "../components/atoms/BottomButton";
import Header from "../components/molecules/TopBar";
import axios from 'axios';  // Importer Axios
import AsyncStorage from '@react-native-async-storage/async-storage';  // Pour gérer les tokens JWT
import jwtDecode from 'jwt-decode';



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

// Liste des émotions, match des emotions 
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

// Fonction utilitaire pour calculer l'angle entre deux points (position du doigt et centre)
const calculateAngle = (x, y) => {
  const angle = Math.atan2(y - centerY, x - centerX);
  return angle;
};

const EmotionWheel = ({navigation}) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#000'); // Couleur de l'émotion sélectionnée

  const initialRotation = 22.5 * (Math.PI / 180); // Convertir 22.5° en radians
  const rotateAnim = useRef(new Animated.Value(initialRotation)).current; // Valeur animée pour la rotation
  const currentAngle = useRef(initialRotation); // Initialiser avec l'angle de départ
  const lastAngle = useRef(0); // Angle lors de la dernière interaction

  // Calculer l'émotion en fonction de la rotation initiale
  useEffect(() => {
   const normalizedAngle = (initialRotation % (2 * Math.PI)) + (initialRotation < 0 ? 2 * Math.PI : 0);
   const adjustedAngle = normalizedAngle + Math.PI / 2;
   const index = Math.floor(((2 * Math.PI) - adjustedAngle) / anglePerEmotion) % emotions.length;
   const adjustedIndex = (index + emotions.length) % emotions.length;

   setSelectedEmotion(emotions[adjustedIndex].label);
   setSelectedColor(emotions[adjustedIndex].color);
  }, []); // Ce useEffect se déclenche au chargement

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
          left: '39.25%', // Centrer horizontalement
          top: '-12%', // Centrer verticalement
          width:'11%',
          height:'20%',
        }}
      />
    );
  };
  
    
  const handleConfirm = async () => {
    try {
      // Récupérer le token JWT et l'utilisateur depuis le stockage (si l'utilisateur est connecté)
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);  // Convertir la chaîne JSON en objet

      // Créer un objet contenant les données à envoyer
      const moodData = {
        data: {
          title_mood: selectedEmotion,   // L'émotion sélectionnée
          date: new Date().toISOString(),  // Format ISO pour la date actuelle
          users_permissions_user: user.id  // Utiliser l'ID de l'utilisateur pour la relation
        }
      };
      
      // Afficher les données dans la console pour débogage
      console.log("Données envoyées :", JSON.stringify(moodData));
      
      // Configurer l'URL de votre API Strapi
      const apiUrl = 'http://10.134.197.209:1337/api/feelings'; 
      
      // Envoyer la requête POST à Strapi
      const response = await axios.post(apiUrl, moodData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Ajouter le token JWT dans les en-têtes
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200 || response.status === 201) {
        console.log('Données sauvegardées avec succès !');
        // Rediriger vers la page souhaitée après succès
        navigation.navigate("EmotionPage", { selectedEmotion });
      } else {
        console.error('Erreur lors de l\'enregistrement des données : ', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      // Gérer l'erreur ou rediriger même en cas d'erreur
      navigation.navigate("EmotionPage", { selectedEmotion });
    }
  };



  // const handleConfirm = async () => {
  //   try {
  //     // Récupérer le token JWT depuis le stockage (si l'utilisateur est connecté)
  //     const token = await AsyncStorage.getItem('token');
      
  //     // Créer un objet contenant les données à envoyer
  //     const moodData = {
  //       title_mood: selectedEmotion,   // L'émotion sélectionnée
  //       date: new Date(),              // La date actuelle
  //       user: 1,  // ID utilisateur - à ajuster selon la gestion de vos utilisateurs
  //     };
      
  //     // Configurer l'URL de votre API Strapi (assurez-vous que l'URL soit correcte)
  //     const apiUrl = 'http://10.134.197.209:1337/api/feelings'; 
      
  //     // Envoyer la requête POST à Strapi
  //     const response = await axios.post(apiUrl, moodData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,  // Ajouter le token JWT dans les en-têtes si nécessaire
  //         'Content-Type': 'application/json',
  //       },
  //     });
      
  //     if (response.status === 200 || response.status === 201) {
  //       console.log('Données sauvegardées avec succès !');
  //       navigation.navigate("EmotionPage", { selectedEmotion });
  //     } else {
  //       console.error('Erreur lors de l\'enregistrement des données : ', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la requête :', error);
  //     navigation.navigate("EmotionPage",{ selectedEmotion });
  //   }
  // };

  return (
    <View style={styles.container}>
      <Header />
    <View style={styles.container}>
      
      <Text style={styles.text}>Aujourd'hui je me sens</Text>
      <Text style={[styles.centeredEmotionText, { color: selectedColor }]}>
        {selectedEmotion}
      </Text>
      {/* Vue de la roue des émotions */}
      <View {...panResponder.panHandlers}>
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
