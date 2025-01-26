import React from "react";
import { useState } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import AuthForm from "./AuthForm";
import { AuthStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function AuthContent({
  onAuthenticate,
  login,
}: {
  onAuthenticate: (credentials: {
    email: string;
    password: string;
    username: string;
  }) => void;
  login?: boolean;
}) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    username: false,
  });

  const {
    container,
    logo,
    paragraph,
    icons,
    clickableText,
    goToLoginText,
    logoWithMargin,
  } = AuthStyles;

  function submitHandler(credentials) {
    let { email, password, confirmPassword, username } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const usernameIsValid = username.length > 0;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !passwordsAreEqual ||
      !usernameIsValid
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        username: !usernameIsValid,
      });
      return;
    }
    onAuthenticate({ email, password, username });
  }

  function handleLogInPress() {
    navigation.navigate("Login");
  }

  function handleSignUpPress() {
    navigation.navigate("Signup");
  }

  return (
    <>
      <SafeAreaView style={container}>
        <Image
          source={require("../../assets/images/greeting/logo.png")}
          style={[logo, login && logoWithMargin]}
        />

        <AuthForm
          credentialsInvalid={credentialsInvalid}
          login={login}
          onSubmit={submitHandler}
        />

        <Text style={paragraph}>OR</Text>

        {!login ? (
          <>
            <View style={icons}>
              <Image
                source={require("../../assets/images/greeting/facebook.png")}
              />
              <Image
                source={require("../../assets/images/greeting/google.png")}
              />
            </View>

            <TouchableOpacity style={clickableText} onPress={handleLogInPress}>
              <Text style={goToLoginText}>I already have an account</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={AuthStyles.signupButton}
              onPress={handleSignUpPress}
            >
              <Text style={AuthStyles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </>
  );
}
