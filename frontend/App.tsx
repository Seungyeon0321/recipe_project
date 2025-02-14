import React from "react";
import AppNavigator from "./main/navigation";
import store from "./store/store";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector } from "react-redux";
import { RootState } from "./store/store";
import Greeting from "./screens/landing/greeting.screen";
import Signup from "./screens/signup/signup.screen";
import Login from "./screens/login/login.screen";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import PostDetails from "./screens/postDetailPage/postDetails";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Greeting">
      <Stack.Screen
        name="Greeting"
        component={Greeting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="AppNavigator">
      <Stack.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return isAuthenticated ? <AuthenticatedStack /> : <AuthStack />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "raleway-regular": require("./assets/fonts/Raleway-Regular.ttf"),
    "raleway-italic": require("./assets/fonts/Raleway-Italic.ttf"),
    "raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingOverlay message="Loading fonts..." />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
