import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { ThumbnailStyles } from "./thumbnail.styles";

export default function Thumbnail({ foodImage, foodTitle, favorite, time }) {
  const {
    container,
    image,
    iconContainer,
    titleContainer,
    title,
    row,
    iconFont,
    icon,
  } = styles;

  return (
    <View style={container}>
      <Image style={image} source={foodImage} />
      <View style={iconContainer}>
        <View style={row}>
          <Image
            style={icon}
            source={require("../../images/favorite_filled.png")}
          />
          <Text style={iconFont}>{favorite}</Text>
        </View>
        <View style={row}>
          <Image style={icon} source={require("../../images/time.png")} />
          <Text style={iconFont}>{time}</Text>
        </View>
      </View>
      <View style={titleContainer}>
        <Text style={title}>{foodTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: "100%",
    opacity: 0.7,
  },
  titleContainer: {
    backgroundColor: "#FDBF50",
    paddingVertical: 10,
    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontFamily: "raleway-bold",
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  iconFont: {
    fontFamily: "raleway-bold",
    fontSize: 20,
  },
  icon: {
    marginRight: 5,
  },
});
