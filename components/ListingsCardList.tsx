import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Listing } from "@/interfaces/Listing";
import AlternateCard from "./AlternateCard";
import CarouselComponent from "./Carousel";

interface ListingCardListProps {
  listings: Listing[];
  loadingMore: boolean;
  noResults: boolean;
  handleEndReached: () => void;
}

const ListingsCardList: React.FC<ListingCardListProps> = ({
  listings,
  loadingMore,
  noResults,
  handleEndReached
}) => {
  

  return (
    <FlatList
      data={listings}
      keyExtractor={(item, index) => `${item.PostalCode}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.Media?.length > 0 ? (
            <CarouselComponent media={item.Media} />
          ) : (
            <Text>No Images Available</Text>
          )}

          {/* top line - heading */}
          <View style={[styles.displayFlexRow, styles.topLine]}>
            <Text style={styles.mainText}>
              {item.ArchitecturalStyle && item.ArchitecturalStyle.length > 0
                ? item.ArchitecturalStyle.join(", ") // Join the array into a string if it has values
                : "Standard"}
            </Text>
          </View>

          {/* middle line - details */}
          <View style={[styles.displayFlexRow, styles.midLine]}>
            <View style={styles.leftContainer}>
              <Text style={styles.text}>
                ${item.ListPrice ? item.ListPrice.toLocaleString() : "0"}
              </Text>
            </View>

            {/* right container */}
            <View style={[styles.displayFlexRow, styles.rightContainer]}>
              {/* beds */}
              <View style={[styles.displayFlexRow, styles.iconAndText]}>
                <FontAwesome name="bed" style={styles.icon} />
                <Text style={styles.text}>{item.BedroomsTotal}</Text>
              </View>
              {/* baths */}
              <View style={[styles.displayFlexRow, styles.iconAndText]}>
                <FontAwesome name="bath" style={styles.icon} />
                <Text style={styles.text}>{item.BathroomsTotalInteger}</Text>
              </View>
            </View>
          </View>
          {/* end of top line */}

          {/* bottom line - address */}
          <View style={[styles.displayFlexRow, styles.bottomLine]}>
            <FontAwesome6 name="location-dot" style={styles.icon} />
            <Text style={styles.addressText}>
              {item.City}, {item.PostalCode}
            </Text>
          </View>
        </View>
      )}
      onEndReached={handleEndReached} // Fetch more data when end is reached
      onEndReachedThreshold={0.95} // Trigger when 95% of the list is visible
      ListFooterComponent={() =>
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : noResults ? (
          <AlternateCard />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  mainText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  displayFlexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  topLine: {
    justifyContent: "space-between",
    marginTop: 8,
  },
  midLine: {
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 8,
  },
  leftContainer: {},
  rightContainer: {
    gap: 10,
  },
  iconAndText: {
    gap: 2,
  },
  icon: {
    fontSize: 16,
    color: "black",
  },
  text: {
    fontSize: 16,
  },
  bottomLine: {
    gap: 3,
    marginBottom: 10,
  },
  addressText: {
    fontSize: 14,
    color: "grey",
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default ListingsCardList;
