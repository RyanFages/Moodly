import React from "react";
import { View, Alert, StyleSheet, Text } from "react-native"; // Importer Text depuis react-native
import Svg, { Rect, Text as SvgText, Pattern, Line } from "react-native-svg"; // Renommer Text en SvgText
import { treemap, hierarchy } from "d3-hierarchy";
import Header from "../../components/molecules/TopBar";
import Button from "../atoms/BottomButton";
import { useNavigation } from "@react-navigation/native";




// Préparer les données pour le TreeMap : Emotion > Dates
function prepareData(data) {
    // Utiliser le tableau directement
    const groupedByMood = data.reduce((acc, curr) => {
        const mood = curr.title_mood.trim(); // Retirer les espaces

        // Vérifier si l'émotion existe déjà dans l'accumulateur
        if (!acc[mood]) {
            acc[mood] = { name: mood, children: [] };
        }

        const day = new Date(curr.date).toISOString().split("T")[0]; // Format de la date (YYYY-MM-DD)

        const today = new Date().toISOString().split("T")[0]; // Date actuelle

        if (day === today) {
            // Si c'est aujourd'hui, l'ajouter directement
            const dateIndex = acc[mood].children.findIndex(
                (d) => d.name === today
            );

            if (dateIndex > -1) {
                acc[mood].children[dateIndex].value += 1;
            } else {
                acc[mood].children.push({
                    name: today,
                    value: 1,
                });
            }
        } else {
            const otherIndex = acc[mood].children.findIndex(
                (d) => d.name === "Autres jours"
            );

            if (otherIndex > -1) {
                acc[mood].children[otherIndex].value += 1;
            } else {
                acc[mood].children.push({
                    name: "Autres jours",
                    value: 1,
                });
            }
        }

        return acc;
    }, {});

    // Transformer l'objet en tableau
    return { name: "root", children: Object.values(groupedByMood) };
}

const TreeMapChart = ({ data, width, height }) => {
    const navigation = useNavigation();
    const treeData = prepareData(data);

    // Créer la hiérarchie du TreeMap
    const root = hierarchy(treeData)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);

    // Créer le layout du TreeMap
    treemap().size([width, height])(root);

    // Créer une échelle de couleur simple
    const emotionColors = {
        Heureux: "#FFDD30",
        Motivé: "#FF94BD",
        Neutre: "#B0B0B0",
        Triste: "#42A8FD",
        Stressé: "#F68A37",
        Enervé: "#FF4545",
        Fatigué: "#9E76D6",
        Frustré: "#2EBB6E",
    };

    // Fonction pour gérer le clic sur un rectangle
    const handlePress = (mood, date, value) => {
        Alert.alert(
            `${date}`,
            `Sentiment : ${mood}\nNombre d'entrées: ${value}`,
            [{ text: "OK" }]
        );
    };

    const Manager = () => {
        navigation.navigate("ManagerList");
    };

    return (
        <View style={styles.container}>
            <Header />

            <Text style={styles.title}>Mon Équipe</Text>
            <View style={styles.TreeMapContainer}><Svg width={width} height={height}>
                {root.leaves().map((leaf, index) => {
                    const total = leaf.data.value;

                    // Calculer les dimensions des subdivisions
                    const height = leaf.y1 - leaf.y0;

                    // Couleur de fond pour les hachures
                    const fillColor = emotionColors[leaf.parent.data.name];

                    return (
                        <React.Fragment key={index}>
                            <Rect
                                x={leaf.x0}
                                y={leaf.y0}
                                width={leaf.x1 - leaf.x0}
                                height={height}
                                fill={fillColor}
                                stroke="white"
                                onPress={() =>
                                    handlePress(
                                        leaf.parent.data.name,
                                        leaf.data.name,
                                        total
                                    )
                                }
                            />
                            {/* Texte centré pour la section */}
                            <SvgText
                                x={leaf.x0 + (leaf.x1 - leaf.x0) / 2}
                                y={leaf.y0 + height / 2}
                                fontSize="10"
                                fill="black"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {leaf.parent.data.name}
                            </SvgText>
                        </React.Fragment>
                    );
                })}
            </Svg></View>

            
            <View style={styles.buttonContainer}>
                <Button
                    title="Aller à la liste des employees"
                    onPress={(Manager)}
                />
            </View>
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonContainer: {
        marginLeft: '10%', // Décale le bouton de 20 unités vers la droite
        paddingHorizontal: 10,
        bottom: -90,
    },
    TreeMapContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TreeMapChart;
