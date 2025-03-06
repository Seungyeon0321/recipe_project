import react from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./profile.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user);

  const {
    rootContainer,
    profileContainer,
    imageContainer,
    optionContainer,
    box_style,
    box_style_text,
    profileText,
    iconContainer,
    textContainer,
  } = styles;

  return (
    <View style={rootContainer}>
      <View style={profileContainer}>
        <Text style={profileText}>Hello, {user.user.name}</Text>
        <Image
          style={imageContainer}
          source={require("../../assets/images/favorited_inactive.png")}
        />
      </View>
      <View style={optionContainer}>
        <TouchableOpacity style={[box_style, { backgroundColor: "#FF724C" }]}>
          <View style={iconContainer}>
            <Image
              source={require("../../assets/images/favorited_inactive.png")}
            />
          </View>
          <View style={textContainer}>
            <Text style={box_style_text}>Favorite Recipes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[box_style, { backgroundColor: "#FDBF50" }]}>
          <View style={iconContainer}>
            <Image source={require("../../assets/images/saved_active.png")} />
          </View>
          <View style={textContainer}>
            <Text style={box_style_text}>Saved Recipes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[box_style, { backgroundColor: "#242C41" }]}>
          <View style={iconContainer}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </View>
          <View style={textContainer}>
            <Text style={box_style_text}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
