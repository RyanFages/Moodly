import React from "react";
import { Text, StyleSheet } from "react-native"; 

const PageName = ({ Name}) => {
    return <Text style={styles.Header}>{Name}</Text>;
}

const styles = StyleSheet.create({
    Header: {
        fontSize: 24,
        marginBottom: 20,
        color: "black",
        alignSelf: "center",
        paddingTop: 20
    }
});


export default PageName;