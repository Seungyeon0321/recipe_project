import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './main/navigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Greeting from "./screens/landing/greeting.screen";
import { StyleSheet } from 'react-native';
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
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Greeting" style={styles.paragraph}>
        <Stack.Screen name="Greeting" component={Greeting} options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
