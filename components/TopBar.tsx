import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface FilterProps {
  openFilters: () => void;
}

const TopBar: React.FC<FilterProps> = ({openFilters}) => {
    return (
        <View style={styles.topBar}>
            <View style={styles.topBarLeft}>
                <Text style={styles.title}>Listings</Text>
            </View>
            <View style={styles.topBarRight}>
                <TouchableOpacity onPress={openFilters} style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Filters</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopBar;


const styles = StyleSheet.create({
  topBar: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  topBarLeft: {
    padding: 10,
  },
  topBarRight: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "flex-end",
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});