import React from "react";
import { View, Alert } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";
import { treemap, hierarchy } from "d3-hierarchy";
import { timeDay } from "d3-time";

// Fonction pour calculer le poids basé sur la récence (jours depuis aujourd'hui)
function calculateWeight(date) {
    const today = new Date();
    const entryDate = new Date(date);
    const diffDays = timeDay.count(entryDate, today);
    return Math.max(5 - diffDays, 1); // Plus récent = plus important, minimum 1
}

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
                acc[curr.Mood].children[dateIndex].value += 1;
            } else {
                acc[curr.Mood].children.push({
                    name: today,
                    value: 1,
                });
            }
        } else {
            // Regrouper les autres jours dans une case "Autres jours"
            const otherIndex = acc[curr.Mood].children.findIndex(
                (d) => d.name === "Autres jours"
            );

            if (otherIndex > -1) {
                acc[curr.Mood].children[otherIndex].value += 1;
            } else {
                acc[curr.Mood].children.push({
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
    const treeData = prepareData(data);
    const Today = new Date().toISOString().split("T")[0];

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
    const handlePress = (mood, date, value) => {
        Alert.alert(
            `${date}`,
            `Sentiment : ${mood}\nNombre d'employés: ${value}`,
            [{ text: "OK" }]
        );
    };

    return (
        <View>
            <Svg width={width} height={height}>
                {root.leaves().map((leaf, index) => {
                    const isOther = leaf.data.name === "Autres jours"; // Vérifier si c'est le groupe des autres jours

                    return (
                        <React.Fragment key={index}>
                            <Rect
                                x={leaf.x0}
                                y={leaf.y0}
                                width={leaf.x1 - leaf.x0}
                                height={leaf.y1 - leaf.y0}
                                fill={emotionColors[leaf.parent.data.name]}
                                stroke="white"
                                onPress={() =>
                                    handlePress(
                                        leaf.parent.data.name,
                                        leaf.data.name,
                                        leaf.value
                                    )
                                }
                            />
                            <SvgText
                                x={leaf.x0 + (leaf.x1 - leaf.x0) / 2}
                                y={leaf.y0 + (leaf.y1 - leaf.y0) / 2}
                                fontSize="10"
                                fill="black"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {leaf.parent.data.name}
                            </SvgText>
                            {/* Afficher "Autres jours" pour les jours regroupés */}
                            {isOther ? (
                                <SvgText
                                    x={leaf.x0 + (leaf.x1 - leaf.x0) / 2}
                                    y={leaf.y0 + (leaf.y1 - leaf.y0) / 2 + 10}
                                    fontSize="10"
                                    fill="black"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                >
                                    Autres jours
                                </SvgText>
                            ) : null}
                        </React.Fragment>
                    );
                })}
            </Svg>
        </View>
    );
};

export default TreeMapChart;
