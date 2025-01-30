import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import { MainStyles } from "./main.styles";
import Thumbnail from "../../components/UI/thumbnail";
import { FoodData } from "./foodData";

export const enum ETutorialStep {
  NONE,
  AVATAR,
  PLAYER_NAME,
  WALLET,
  PLAYER_GAME_DATA,
  POPULAR_GAMES,
  NAVIGATION,
}

const getContainerPosition = (
  container: View,
  callback: (h: number, px: number, py: number) => void
) => {
  // **NOTE**: collapsable property should be set to false on the elements that need to be measured to avoid received undefined values
  container.measure((x, y, w, h, px, py) => {
    callback && callback(h, px, py);
  });
};

export default function MainScreen() {
  const { rootContainer, search, searchIcon, textInput } = MainStyles;
  return (
    <SafeAreaView style={rootContainer}>
      <ScrollView>
        <View style={search}>
          <TextInput
            style={textInput}
            placeholder="what are you cooking today?"
          />
          <Image
            style={searchIcon}
            source={require("../../assets/images/search.png")}
          />
        </View>
        {FoodData.map((food, index) => (
          <Thumbnail
            key={index}
            foodImage={food.image}
            foodTitle={food.title}
            favorite={food.favorite}
            time={food.time}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
