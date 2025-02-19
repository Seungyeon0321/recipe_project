import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { MainScreen } from "../screens/mainPage/main.screen";
import { SavedScreen } from "../screens/saved/saved.screen";
import { PostingScreen } from "../screens/posting/posting.screen"
import { FavoritedScreen } from "../screens/favorited/favorited.screen";
import { ProfileScreen } from "../screens/profile/profile.screen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case "Home":
              iconSource = focused
                ? require("../assets/images/home_active.png")
                : require("../assets/images/home_inactive.png");
              break;
            case "Saved":
              iconSource = focused
                ? require("../assets/images/saved_active.png")
                : require("../assets/images/saved_inactive.png");
              break;
            case "Posting":
              iconSource = focused
                ? require("../assets/images/posting_active.png")
                : require("../assets/images/posting_inactive.png");
              break;
            case "Favorited":
              iconSource = focused
                ? require("../assets/images/favorited_active.png")
                : require("../assets/images/favorited_inactive.png");
              break;
            case "Profile":
              iconSource = focused
                ? require("../assets/images/profile_active.png")
                : require("../assets/images/profile_inactive.png");
              break;
            default:
              break;
          }

          return (
            <Image
              source={iconSource}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          );
        },
        tabBarLabel: "",
        tabBarStyle: {
          backgroundColor: "#FDBF50",
          height: 60,
          paddingVertical: 15,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Posting"
        component={PostingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorited"
        component={FavoritedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
