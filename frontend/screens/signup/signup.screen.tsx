import React from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { useState, useEffect } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UseSubmitHandler } from "../../components/util/submitHandler";

type RootStackParamList = {
  AppNavigator: undefined;
};

export default function SignupScreen() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigation.navigate("AppNavigator");
    }
  }, [isAuthenticated]);

  const { handleSubmit, isLoading } = UseSubmitHandler();

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <>
      <AuthContent
        onAuthenticate={(credentials) => handleSubmit(credentials, "signup")}
        login={false}
      />
    </>
  );
}
