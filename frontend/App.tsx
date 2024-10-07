import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './main/navigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Greeting from "./screens/landing/greeting.screen";
import Signup from "./screens/signup/signup.screen";
import Login from "./screens/login/login.screen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-italic': require('./assets/fonts/Raleway-Italic.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
  });

  return fontsLoaded ? (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Greeting">
          <Stack.Screen name="Greeting" component={Greeting} options={{headerShown: false}} />
          <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="AppNavigator" component={AppNavigator} options={{headerShown: false}} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  ) : null;
};