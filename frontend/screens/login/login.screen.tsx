import React, { useState, useEffect } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  AppNavigator: undefined;
};

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { isAuthenticated, isLoading } = useSelector((state: RootState) => ({
    isAuthenticated: state.user.isAuthenticated,
    isLoading: state.user.loading,
  }));

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("AppNavigator");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return (
    <>
      <AuthContent login={true} />
    </>
  );
}
