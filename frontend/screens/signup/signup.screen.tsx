import React from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { useEffect } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  AppNavigator: undefined;
};

export default function SignupScreen() {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => ({
    isAuthenticated: state.user.isAuthenticated,
    isLoading: state.user.loading,
  }));

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigation.navigate("AppNavigator");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <>
      <AuthContent login={false} />
    </>
  );
}
