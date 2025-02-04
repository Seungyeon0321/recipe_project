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
import { loginUser, signupUser } from "../../reducer/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

type ProfileNavigationProp = {
  navigate: (screen: string) => void;
};

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
  const navigation = useNavigation<ProfileNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

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

  async function submitHandler(credentials) {
    console.log("Click, submitHandler!");
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
      (!login && !passwordsAreEqual) ||
      (!login && !usernameIsValid)
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

    const action = login
      ? loginUser({ email, password })
      : signupUser({ email, password, username });
    console.log(action);

    const resultAction = await dispatch(action);

    if (loginUser.fulfilled.match(resultAction)) {
      navigation.navigate("Home");
    }
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
