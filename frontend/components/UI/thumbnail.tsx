import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThumbnailStyles } from "./thumbnail.styles";
import { useNavigation } from "@react-navigation/native";

export default function Thumbnail({ foodImage, foodTitle, favorite, time }) {
  const {
    container,
    image,
    iconContainer,
    titleContainer,
    title,
    iconRow,
    iconFont,
    icon,
  } = ThumbnailStyles;

  const navigation = useNavigation<any>();

  const pageHandler = () => {
    navigation.navigate("PostDetails", {
      post: {
        foodImage,
        foodTitle,
        favorite,
        time,
      },
    });
  };

  return (
    <View style={container}>
      <TouchableOpacity onPress={pageHandler}>
        <Image style={image} source={foodImage} />
        <View style={iconContainer}>
          <View style={iconRow}>
            <Image
              style={icon}
              source={require("../../assets/images/favorite_filled.png")}
            />
            <Text style={iconFont}>{favorite}</Text>
          </View>
          <View style={iconRow}>
            <Image
              style={icon}
              source={require("../../assets/images/time.png")}
            />
            <Text style={iconFont}>{time}</Text>
          </View>
        </View>
        <View style={titleContainer}>
          <Text style={title}>{foodTitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
