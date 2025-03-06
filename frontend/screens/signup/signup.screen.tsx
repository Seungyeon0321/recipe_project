import React from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { useEffect } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  main: undefined;
};

export default function SignupScreen() {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.loading);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user) {
      navigation.navigate("main");
    }
  }, [user]);

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <>
      <AuthContent login={false} />
    </>
  );
}
