import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CAROUSEL_WIDTH = width * 0.9;
const CAROUSEL_HEIGHT = 300;

interface CarouselComponentProps {
  media: { MediaURL: string }[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ media }) => {
  const progress = useSharedValue<number>(0);
  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        autoPlay={true}
        width={width}
        height={300}
        data={media}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={{ uri: item.MediaURL }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: CAROUSEL_WIDTH,
    alignSelf: "center",
    height: CAROUSEL_HEIGHT, // Set fixed height
    overflow: "hidden",
  },
  carouselItem: {
    width: CAROUSEL_WIDTH,
    height: CAROUSEL_HEIGHT, // Set fixed height
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: CAROUSEL_WIDTH,
    height: CAROUSEL_HEIGHT, // Set fixed height
    resizeMode: "cover", // Changed to "cover" to fill the space consistently
  },
});



export default CarouselComponent;
