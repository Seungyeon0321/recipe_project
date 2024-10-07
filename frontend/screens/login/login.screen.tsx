import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUpPress = () => {
    navigation.navigate("Signup");
  };

  const handleProceed = () => {
    navigation.navigate("AppNavigator");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/greeting/logo.png")}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="ID"
        value={userId}
        onChangeText={(text) => setUserId(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="PW"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={styles.forgetText}>forgot your ID/password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleProceed}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.paragraph}>OR</Text>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUpPress}>
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDBF50",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 206,
    height: 121,
    marginBottom: 16,
  },
  paragraph: {
    margin: 24,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "raleway-bold",
  },
  input: {
    width: 204,
    height: 63,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 22,
    paddingLeft: 13,
    fontSize: 24,
  },
  loginButton: {
    marginTop: 58,
    width: 204,
    height: 63,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF724C",
  },
  signupButton: {
    width: 204,
    height: 63,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242C41",
  },
  loginText: {
    color: "#242C41",
    fontFamily: "raleway-bold",
    fontSize: 24,
  },
  signupText: {
    color: "white",
    fontFamily: "raleway-bold",
    fontSize: 24,
  },
  forgetText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
