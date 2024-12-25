import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AlternateCard = () => {
    console.log("then comes here")
    return (
        <View style={styles.card}>
            <Text style={styles.text}>Nothing to show</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
});

export default AlternateCard;
