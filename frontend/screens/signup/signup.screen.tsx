import React from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { Signup } from "../../components/util/auth";
import { useState, useEffect } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../../reducer/userSlice";
import { RootState } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const navigation = useNavigation();

  //만약 오류가 난다면 어떻게 될 것인가,
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigation.navigate("AppNavigator");
    }
  }, [isAuthenticated]);

  async function signupHandler(credentials: {
    email: string;
    password: string;
    username: string;
  }) {
    try {
      setIsLoading(true);
      const response = await Signup(credentials);

      if (response.data.status === "success") {
        setIsLoading(false);
        dispatch(setIsAuthenticated(true));
      } else {
        Alert.alert("Signup failed", response.data.message);
      }
    } catch (error) {
      console.info(error);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <>
      <AuthContent onAuthenticate={signupHandler} login={false} />
    </>
  );
}
