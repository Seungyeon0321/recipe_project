import React, { useEffect, useState } from "react";
import AppNavigator from "./main/navigation";
import store from "./store/store";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import Greeting from "./screens/landing/greeting.screen";
import Signup from "./screens/saved/signup/signup.screen";
import Login from "./screens/login/login.screen";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import PostDetails from "./screens/postDetailPage/postDetails";
import { getUser } from "./reducer/userSlice";
import { AppDispatch } from "./store/store";
import { getToken } from "./components/util/storage";
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
    <Stack.Navigator>
      <Stack.Screen
        name="main"
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
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchUser() {
      const token = await getToken();
      if (token) {
        dispatch(getUser(token));
      }
    }
    fetchUser();
  }, []);

  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.loading);

  console.log("user", user);
  console.log("isLoading", isLoading);

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return user ? <AuthenticatedStack /> : <AuthStack />;
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
