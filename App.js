import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './main/navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-italic': require('./assets/fonts/Raleway-Italic.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
  });

  return fontsLoaded ? (
    <>
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
    </>
  ) : null;
}
