import React from "react";
import { View, Alert, StyleSheet, Text } from "react-native"; // Importer Text depuis react-native
import Svg, { Rect, Text as SvgText, Pattern, Line } from "react-native-svg"; // Renommer Text en SvgText
import { treemap, hierarchy } from "d3-hierarchy";
import Header from "../../components/molecules/TopBar";
import Button from "../atoms/BottomButton";
import { useNavigation } from "@react-navigation/native";




// Préparer les données pour le TreeMap : Emotion > Dates
function prepareData(data) {
    const today = new Date().toISOString().split("T")[0]; // Format de la date actuelle (YYYY-MM-DD)
    const groupedByMood = data.reduce((acc, curr) => {
        // Vérifier si l'émotion existe déjà dans l'accumulateur
        if (!acc[curr.Mood]) {
            acc[curr.Mood] = { name: curr.Mood, children: [] };
        }

        const day = curr.Date.split(" ")[0]; // Prendre uniquement la date (sans heure)

        if (day === today) {
            // Si c'est aujourd'hui, l'ajouter directement
            const dateIndex = acc[curr.Mood].children.findIndex(
                (d) => d.name === today
            );

            if (dateIndex > -1) {
                if (curr.Personal) {
                    acc[curr.Mood].children[dateIndex].personalValue += 1;
                } else {
                    acc[curr.Mood].children[dateIndex].nonPersonalValue += 1;
                }
                acc[curr.Mood].children[dateIndex].value += 1;
            } else {
                acc[curr.Mood].children.push({
                    name: today,
                    value: 1,
                    personalValue: curr.Personal ? 1 : 0,
                    nonPersonalValue: curr.Personal ? 0 : 1,
                });
            }
        } else {
            const otherIndex = acc[curr.Mood].children.findIndex(
                (d) => d.name === "Autres jours"
            );

            if (otherIndex > -1) {
                // Mise à jour pour inclure la distinction de Personal
                if (curr.Personal) {
                    acc[curr.Mood].children[otherIndex].personalValue += 1;
                } else {
                    acc[curr.Mood].children[otherIndex].nonPersonalValue += 1;
                }
                acc[curr.Mood].children[otherIndex].value += 1;
            } else {
                acc[curr.Mood].children.push({
                    name: "Autres jours",
                    value: 1,
                    personalValue: curr.Personal ? 1 : 0,
                    nonPersonalValue: curr.Personal ? 0 : 1,
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
        Joie: "#FFDD30",
        Motivation: "#FF94BD",
        Neutre: "#B0B0B0",
        Tristesse: "#42A8FD",
        Stress: "#F68A37",
        Colère: "#FF4545",
        Fatigue: "#9E76D6",
        Frustration: "#2EBB6E",
    };

    // Fonction pour gérer le clic sur un rectangle
    const handlePress = (mood, date, value, isPersonal) => {
        const personalText = isPersonal ? "Personnel" : "Non personnel";
        Alert.alert(
            `${date}`,
            `Sentiment : ${mood}\nNombre d'employés: ${value}\nType: ${personalText}`,
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

            <Svg width={width} height={height}>
                {/* Définir un motif pour les hachures */}
                <Pattern
                    id="hachures"
                    patternUnits="userSpaceOnUse"
                    width="10"
                    height="10"
                >
                    <Line
                        x1="0"
                        y1="0"
                        x2="10"
                        y2="10"
                        stroke="black"
                        strokeWidth="1"
                    />
                </Pattern>
                {root.leaves().map((leaf, index) => {
                    const total = leaf.data.value;
                    const personalValue = leaf.data.personalValue || 0;
                    const nonPersonalValue = leaf.data.nonPersonalValue || 0;

                    // Calculer les dimensions des subdivisions
                    const height = leaf.y1 - leaf.y0;
                    const personalHeight = (personalValue / total) * height;
                    const nonPersonalHeight =
                        (nonPersonalValue / total) * height;

                    // Coordonnées Y pour chaque subdivision
                    const nonPersonalY = leaf.y0;
                    const personalY = leaf.y0 + nonPersonalHeight;

                    // Couleur de fond pour les hachures
                    const fillColor = emotionColors[leaf.parent.data.name];

                    return (
                        <React.Fragment key={index}>
                            {/* Case pour non-personal */}
                            <Rect
                                x={leaf.x0}
                                y={nonPersonalY}
                                width={leaf.x1 - leaf.x0}
                                height={nonPersonalHeight}
                                fill={fillColor}
                                stroke="white"
                                onPress={() =>
                                    handlePress(
                                        leaf.parent.data.name,
                                        leaf.data.name,
                                        nonPersonalValue,
                                        false // Non personnel
                                    )
                                }
                            />
                            {/* Texte centré pour la section non personnelle */}
                            {nonPersonalValue > 0 && (
                                <SvgText
                                    x={leaf.x0 + (leaf.x1 - leaf.x0) / 2}
                                    y={nonPersonalY + nonPersonalHeight / 2}
                                    fontSize="10"
                                    fill="black"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                >
                                    {leaf.parent.data.name}
                                </SvgText>
                            )}

                            {/* Case pour personal avec hachures superposées */}
                            <Rect
                                x={leaf.x0}
                                y={personalY}
                                width={leaf.x1 - leaf.x0}
                                height={personalHeight}
                                fill={fillColor} // Remplir avec la couleur de base
                                stroke="white"
                                onPress={() =>
                                    handlePress(
                                        leaf.parent.data.name,
                                        leaf.data.name,
                                        personalValue,
                                        true // Personnel
                                    )
                                }
                            />
                            {/* Superposition des hachures */}
                            {personalValue > 0 && (
                                <Rect
                                    x={leaf.x0}
                                    y={personalY}
                                    width={leaf.x1 - leaf.x0}
                                    height={personalHeight}
                                    fill="url(#hachures)" // Superposer avec des hachures
                                    pointerEvents="none" // Ignorer les clics sur cette superposition
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </Svg>
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
});

export default TreeMapChart;
