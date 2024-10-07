import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, SafeAreaView, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignupStyles } from "./signup.styles";

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');

  const navigation = useNavigation();

  const handleLogInPress = () => {
    navigation.navigate('Login');
  };

  const { container, logo, paragraph, createButton, createText, input, icons, clickableText, goToLoginText } = SignupStyles;

  return (
    <SafeAreaView style={container}>
      <Image source={require('../../assets/images/greeting/logo.png')} style={logo} />

      <TextInput
        style={input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <TextInput
        style={input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TextInput
        style={input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />

      <TextInput
        style={input}
        placeholder="Username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />

      <TouchableOpacity
        style={createButton}
        onPress={handleLogInPress}
      >
        <Text style={createText}>Create an account</Text>
      </TouchableOpacity>

      <Text style={paragraph}>
        OR
      </Text>

      <View style={icons}>
        <Image source={require('../../assets/images/greeting/facebook.png')} />
        <Image source={require('../../assets/images/greeting/google.png')} />
      </View>

      <TouchableOpacity
        style={clickableText}
        onPress={handleLogInPress}
      >
        <Text style={goToLoginText}>I already have an account</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}